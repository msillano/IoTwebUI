/**
 * OpenAI API Proxy (express) - Gestione AI chatbot con contesto/storico
 * - Chat UI block mode/stream mode (option)
 * - Storage and handling auto of History and Context files
 * - Direct access to IOTwebUI/Tuya device ad Tap_to_:run from AI.
 * @file server.js
 * @description This file is part of IoTwebUI-AI project (https://github.com/msillano/IoTwebUI)
 * @version 1.0
 * @license MIT
 * @author Marco Sillano
 * @created 01/04/2025
 * @lastModified 26/04/2025
 * (C)2025 marco.sillano@gmail.com
 */

// ===== MODULI =====
const express = require('express');
const cors = require('cors');
const OpenAI = require("openai");
const assert = require('assert');
// also requires (node-fetch) installed

// ===== INIZIALIZZAZIONE =====
const app = express();
app.use(cors());
app.use(express.json({
        limit: '5mb'
    })); // Supporta payload grandi (base64 files)

// ===== CONFIGURAZIONE AI =====
var aiClient;       // openAi point
const PORT = 3035; // see also file ai_proxy.js riga 14

// IoTwebUI config: (see also ai_proxy).
const IOTwbUI_rest_URL = 'http://localhost:3031/IoTrest/';

/**
 * Configurazione del server (per sessione):
 * @typedef {Object}  AIConfig
 * @property {string} provider - Nome provider ('openai'/'deepseek') (auto menu)
 * @property {string} model    - Modello linguistico (menu)
 * @property {string} baseURL  - Endpoint API (auto menu)
 * @property {string} apiKey   - Nome Chiave segreta, e.g. APY_KEY_OPENAI in environment (auto menu)
 * @property {number} temperature    - Parametro per AI (menu)
 * @property {int}    max_tokens  - Parametro per AI (menu)
 * @property {int}    timeoutAi   - Per risposta AI
 * @property {bool}   enableTuyaTools     - adds Tool capabilty (auto + menu)
 * @property {bool}   enableStreamMode    - stream mode exchanges (menu)
 * @property {bool}   enableDebugMode     - server echoes AI messages (menu)
 * @property {bool}   quirkMaxCompletion  - alcuni model vogliono Max_Completion_tokens invece di Max_tokens
 * @property (number) top_p: null, // top-p: 0,  //     0.5 parameter for AI
 * @property (number) top_k: null, // top-k: 0,  // e.g. 50 parameter for AI
 * @property (string) stop: null,  //  parameter for AI
 * @property (bool)   seed: false,      //  parameter for AI (a menu)
 * @property (bool)   IoTwebUIok: true, //  accessibilità REST Tuya (startup auto)
  
 
 
 
 */

let aiConfig = {
    // DEFAULT allo STARTUP (defalt anche per manu) interattivi (menu)
    provider: 'deepseek',
    baseURL: 'https://api.deepseek.com',
    apiKey: "API_KEY_DEEPSEEK", // Key da variabile d'ambiente al momento d'uso
    model: 'deepseek-chat',
    enableTuyaTools: true, // automatico, in base alla capacità del modello + REST connesso
    quirkMaxCompletion: false, // richiesto da alcuni models
    // non interattivo + usato
    enableStreamMode: false,
    enableDebugMode: false,
     max_tokens: 1024, // parametro per AI
    temperature: 0.6, // parameter for AI
    seed: false, //  parameter for AI
   //non interattivi(per ora) controllo fine output testuale
    timeoutAi: 90, // attesa risposta block mode in secondi
    top_p: null, // top-p: 0,  //     0.5 parameter for AI
    top_k: null, // top-k: 0,  // e.g. 50 parameter for AI
    stop: null,  //  parameter for AI
    frequency_penalty: null, // parameter for AI
};

var aiClient = null;
var _useKey = null;
var _useURL = null;

function storeConfig(sessionId) {
    serverStorage.set(sessionId + 'config', {
        config: {
            ...aiConfig
        },
        timestamp: Date.now() // auto cleanup
    });
    //  	   console.log(">> Set stored config", aiConfig);
}

function restoreConfig(sessionId) {
    const xConfig = serverStorage.get(sessionId + 'config');
    if (xConfig)
        aiConfig = xConfig.config;
    //  console.log("<< Get stored config", aiConfig);
}

function checkOpenAI() {
    if ((aiClient == null) || (_useKey != aiConfig.apiKey) || (_useURL != aiConfig.baseURL)) {
        _useKey = aiConfig.apiKey;
        _useURL = aiConfig.baseURL;
        aiClient = new OpenAI({ // API access point
            baseURL: _useURL,
            apiKey: process.env[_useKey],
        });
    }
};

// ===== COTANTI =====
const REASONINGSTART = '**Reasoning:**';
const ANSWERSTART = '**Answer:**';

// ===== UTILITIES =====
/**
 * Aggiorna la configurazione AI e reinizializza il client
 * @param {AIConfig} [newConfig={}] - Nuovi parametri (uno/tutti, opzionali)
 */
function updateAIClient(sessionId, newConfig = {}) {
    try {
        restoreConfig(sessionId);
        aiConfig = {
            ...aiConfig,
            ...newConfig
        };
        storeConfig(sessionId);
    } catch (error) {
        console.error('Server OpenAI config error:', error);
    }
}

// ===== GESTIONE DB CONTEXT & HISTORY =====
const serverStorage = new Map();
// Store history and context, to build 'messages' for the AI queries
// - Chiave: `sessionId + suffisso`:
//   * "U{id}": messaggi utente => role, content
//   * "_{id}": risposte AI     => role, content XOR tool_calls
//   * "T{id}": tool responses  => role, content (JSON), tool_call_id
//   * "X{idcnt}": extra file   => role, content
//   or sessionId + 'start'     => start session index
//   or sessionId + 'config'    => last session config
/*
 * note: the 'data' structure is pushed in the 'messages' array for the AI.
 * Timestamp used for 24h autocleanup.
 * MESSAGES record:
 * {
 *  data:
 *     content: "Sei un assistente di..." // or tool_calls:[ call,...]
 *     role:"user"                        // or 'assistant', "tool"
 *  timestamp: 123456789
 * }
 * CONTEXT (file) record:
 * {
 *  data:
 *     content: "File  di test..."
 *     role:"system"
 *
 *  enabled:true
 *  name:"CONX-Tink mode.txt"
 *  timestamp: 123456789
 * }
 * START
 * {
 *  limit: n
 *  timestamp: 123456789
 * }
 */
// used index for keys
let responseNumber = 1; // Contatore globale risposte
let contextNumber = 1; // Contatore contesti
// utility from https://stackoverflow.com/questions/30921283/how-to-get-a-last-element-of-es6-map-without-iterations
function lastItem(mapOrSet) {
    const iterator = mapOrSet.values();
    let i = 1;
    while (i++ < mapOrSet.size && iterator.next()) {}
    return iterator.next().value;
}

// utility for append to Map: adds timestamp for auto cleanup
function appendMap(data, key) {
    if (!serverStorage.has(key)) {
        const payload = data;
        payload["timestamp"] = Date.now();
        serverStorage.set(key, payload); // appends
        return
    };
    console.log("ERROR: appendList collision!!");
    assert(true, "server02.appendList() collision");
}

// utility: cleanUP for the AI responses (eliminates '[RX]' extra ref
function cleanAnswer(testo) {
    let cleanText = testo;
    // 1° pass
    const startRef = testo.indexOf("[");
    if (startRef == -1)
        return cleanText; // ok
    const endRef = testo.indexOf("]");
    if ((endRef !== -1) && (2 < (endRef - startRef) < 6) && (startRef < 15))
        cleanText = testo.slice(0, startRef) + testo.slice(endRef + 1);
    // 2° pass
    const startRef2 = cleanText.indexOf("[");
    if (startRef2 == -1)
        return cleanText; // ok
    // just in case of double ref
    const endRef2 = cleanText.indexOf("]");
    if ((endRef2 !== -1) && (2 < (endRef2 - startRef2) < 6) && (startRef < 15))
        cleanText = cleanText.slice(0, startRef2) + cleanText.slice(endRef2 + 1);
    return cleanText;
}

// utility: adds any payload to storage...
// the 'data' wrapper contains payload: it is added if required
// the 'short' format is used in '/api/chat'...
// the [data.]role is mandatory!
function storageAppend(sessionId, payload) {
    let store = payload;
    if (payload?.role)
        store = {
            data: payload
        };
    //   console.log("in Append", store.data.role, contextNumber, responseNumber, store);
    switch (store?.data?.role) {
    case "user":
        appendMap(store, sessionId + "U" + responseNumber);
        break;
    case "tool":
        appendMap(store, sessionId + "T" + responseNumber);
        responseNumber++;
        break;
    case "system":
        appendMap(store, sessionId + "X" + contextNumber);
        contextNumber++;
        break;
    case "assistant":
        appendMap(store, sessionId + "_" + responseNumber);
        responseNumber++;
        break;
    default:
        console.log(" WARNING: storage 'role' unknown:", store);
    }
}
/**
 *  auto: Elimina sessioni più vecchie di 24h ogni ora
 */
setInterval(() => {
    const now = Date.now();
    let ntot = 0;
    let ndel = 0;
    serverStorage.forEach((value, key) => {
        ntot++;
        if (value?.timestamp && (now - value.timestamp > 86400000)) {
            serverStorage.delete(key);
            ndel++;
        }
    });
    console.log("Cleanup at " + (new Date().toLocaleTimeString()) + ": deleted " + ndel + "/" + ntot);
}, 3600000);

// ===== ENDPOINTS =====

// --- Configurazione ---
/**
 * Aggiorna dinamicamente i parametri AI
 * @route POST /update-ai-settings
 * @param {string} [req.body.sessionId='default'] - ID sessione
 * @param {AIConfig} req.body.config - Nuova configurazione
 * @returns {Object} Conferma modifica
 */
app.post('/update-ai-settings', (req, res) => {
    const {
        sessionId = 'default',
        config
    } = req.body;
    //   console.log("udConf",sessionId, config);
    updateAIClient(sessionId, config);
    //   console.log("return", aiConfig);
    res.json(aiConfig);
});

// --- Storico ---

/**
 * Recupera un elemento dello storico
 * @route POST /history/get
 * @param {number} req.query.responseID - ID conversazione
 * @param {string} [req.query.sessionId='default'] - ID sessione
 * @returns {Object} success + found: Coppia query/risposta, la prima con id <= index
 *      or success + !found: then all ""
 *      ot !success: error message
 */
app.get('/history/get', (req, res) => {
    try {
        var {
            responseID,
            sessionId = 'default'
        } = req.query;
        // normalize
        if (isNaN(responseID) || (responseID >= responseNumber))
            responseID = responseNumber - 1;
        if (responseID < 1)
            responseID = 1;
        // main: finds back valid query and answer
        var answer = '';
        var query = '';
        responseID++;
        do {
            const rec = serverStorage.get(sessionId + '_' + (--responseID));
            answer = rec?.data?.content || rec?.data?.tool_calls || '';
        } while ((answer == '') && (responseID > 1))
        let k = responseID;
        do {
            const rec = serverStorage.get(sessionId + 'U' + (k--));
            query = rec?.data?.content || '';
        } while ((query == '' || query == 'continue') && (k > 1));
        // done
        //     console.log("/history/get our", { query, answer, responseID});
        res.json({
            success: true,
            found: (query != '') || (answer != ''),
            query,
            answer,
            responseID
        });
    } catch (error) {
        console.error('Server /get error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * limita lo storico inviato a OpenApi. Se limit 0, non cambia nulla, si limita a leggere e tornare i valori attuali.
 * @route POST /history/forget
 * @param {number} req.body.limit - ID prima conversazione
 * @param {string} [req.body.sessionId='default'] - ID sessione
 * @returns {Object} success + infos
or !succes: error message*
 */
app.get('/history/forget', (req, res) => {
    try {
        const {
            limit,
            sessionId = 'default'
        } = req.query;
        // normalisze
        let uselimit = limit;
        if (isNaN(limit) || (limit < 1))
            uselimit = 0;
        if (limit > responseNumber)
            uselimit = responseNumber;
        // process
        if (uselimit > 0) {
            serverStorage.set(sessionId + 'start', {
                limit: uselimit,
                timestamp: Date.now() // auto cleanup for start
            });
        } else
            uselimit = serverStorage.get(sessionId + 'start').limit || 1;

        // only for test:
        //    console.log('TEST limit = '+limit, buildContext(sessionId));
        //    if (limit == 'bad') console.log("verifica map:", serverStorage);
        // done
        res.json({
            success: true,
            currentStart: uselimit,
            currentNext: responseNumber,
        });
    } catch (error) {
        console.error('Server /history/forget error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * Cancella lo storico da storage.
 * @route POST /history/reset
 * @param {string} [req.query.sessionId='default'] - ID sessione
 * @returns {Object} success + infos else error
 */
app.get('/history/reset', (req, res) => {
    try {
        const sessionId = req.query.sessionId || 'default';
        // spazza tutto il DB
        for (i = 1; i < responseNumber; i++) {
            serverStorage.delete(sessionId + 'U' + i);
            serverStorage.delete(sessionId + '_' + i);
            serverStorage.delete(sessionId + 'T' + i);
        }
        serverStorage.set(sessionId + 'start', {
            limit: responseNumber, // dalla prossima conversazione
            timestamp: Date.now() //  autocleanup 24h
        });

        // only for test:
        //      console.log("verifica map:", serverStorage);
        // done
        res.json({
            success: true,
            currentStart: responseNumber,
            currentNext: responseNumber,
        });
    } catch (error) {
        console.error('Server /history/reset error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// utility: gets context total and enabled, sets enable  for a name (optional)
function contextStats(sessionId, enName = null, enable = true) {
    // envelop process
    let storageCount = 0;
    let enableCount = 0;
    let found = false;
    // normalize
    const xenable = !!enable;
    for (i = 1; i <= contextNumber; i++) {
        const ctx = serverStorage.get(sessionId + "X" + i);
        if (ctx) {
            //			  console.log('contx',ctx);
            storageCount++;
            if (ctx.name === enName) {
                ctx.enabled = xenable;
                ctx.timestamp = Date.now(); //refresh
                found = true;
            }
            if (ctx.enabled)
                enableCount++;
        }
    }
    if (enName)
        return {
            found,
            storageCount,
            enableCount
        };
    return {
        found: true,
        storageCount,
        enableCount
    };
}
/**
 * test context for douoment existence as disabled or chached
 * @route POST /context/check'
 * @param {string} [req.body.filename] - resorce name
 * @param {string} [req.body.sessionId='default'] - ID sessione
 * @returns {Object} success + infos else error
 */

app.get('/context/check', (req, res) => {
    const {
        name,
        sessionId = 'default'
    } = req.query;
    const test = contextStats(sessionId, name);
    if (test.found) {
        test["success"] = true;
        res.json(test);
        return;
    }
    const tmp = Array.from(serverStorage.values());
    const cached = tmp.find((x) => x.name == name);
    if (cached) {
        const store = {
            data: {
                content: cached.data.content,
                role: "system"
            },
            enabled: true,
            name,
        };
        storageAppend(sessionId, store);
        test["success"] = true;
        test["cache"] = 'hit';
        test.enableCount++;
        test.storageCount++;
        res.json(test);
        return
    }
    test["success"] = true;
    test["cache"] = 'miss';
    res.json(test);
});

/**
 * Adds new file to context.
 * @route POST /context/append
 * @param {string} [req.body.store] -  content structure
 * @param {string} [req.body.sessionId='default'] - ID sessione
 * @returns {Object} succes:  stats
 * or !success: error message
 */
/*
 * Message (evelope + payload-store) from proxy
 * {
 * store:
 *    {
 *    data:
 *        content:JSON.stringify( "### Sei un assistente di...")
 *        role:"system"
 *
 *    enabled:true
 *    name:"CONX-Tink mode.txt"
 *    }
 * sessionId: "540cf4ae-111f-4045-b597-8c20adff2d59"
 * }
 */
app.post('/context/append', (req, res) => {
    //	console.log("context/append in ",req.body);
    try {
        const {
            store, // the data struc to be stored -complete
            sessionId = 'default'
        } = req.body;
        //  appends the data content
        store["enabled"] = true; // just in case
        storageAppend(sessionId, store);
        // envelop process
        const test = contextStats(sessionId);
        //  	console.log("Storage added: ",  serverStorage,nTot,nOK);
        test["success"] = true;
        res.json(test);
    } catch (error) {
        console.error('Server /context/append error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * Cancella context da storage. (not deleted, restored by '/context/check'
 * @route POST /context/clear
 * @param {string} [req.body.sessionId='default'] - ID sessione
 * @param {string} [req.body.filename] - key name
 * @returns {Object} succes: found,  stats
 * or !success: error message
 */
app.post('/context/delete', (req, res) => {
    const {
        filename,
        sessionId = 'default'
    } = req.body;
    const test = contextStats(sessionId, filename, false);
    test["success"] = true;
    res.json(test);
});

/**
 * Cancella fisicamente l'intero context da storage.
 * @route POST /context/clear
 * @param {string} [req.body.sessionId='default'] - ID sessione
 * @returns {Object} success + infos
 */
app.get('/context/clear', (req, res) => {
    const sessionId = req.query.sessionId || 'default';
    for (i = 1; i <= contextNumber; i++) {
        serverStorage.delete(sessionId + 'X' + i);
    }
    res.json({
        success: true,
        storageCount: 0,
        enableCount: 0,
    });
});

// ======================== chat
// utility:  clean AI response text for reason-answer correct processing
function cleanRef(testo) {
    let cleanText = testo;
    // 1° pass
    const startRef = testo.indexOf("[");
    const endRef = testo.indexOf("]");
    if ((startRef !== -1) && (endRef !== -1) && (2 < (endRef - startRef) < 6))
        cleanText = testo.slice(0, startRef) + testo.slice(endRef + 1);
    // 2° pass
    const startRef2 = cleanText.indexOf("[");
    const endRef2 = cleanText.indexOf("]");
    if ((startRef2 !== -1) && (endRef2 !== -1) && (2 < (endRef2 - startRef2) < 6))
        cleanText = cleanText.slice(0, startRef2) + cleanText.slice(endRef2 + 1);

    // se manca ANSWERSTART, elimina REASONINGSTART
    if (cleanText.indexOf(ANSWERSTART) === -1) {
        cleanText.replace(REASONINGSTART, "");
        return cleanText
    }
    // con ANSWERSTART, aggiunge REASONINGSTART se manca
    if (cleanText.indexOf(REASONINGSTART) === -1)
        return REASONINGSTART + cleanText;
    return cleanText;
}

/**
 * utility: Crea i messaggi contesto e storici da aggiungere alla domanda utente
 * @param {sessionId} SesssionID
 * @returns [Object] messages[], formato richiesto da openAI
 */

function buildContext(sessionId) {
    // NB: Context, si perde al cambio sessione, non si può cancellare
    // NB: storico: si perde al cambio sessione, si puo accorciare, sostituendo un riassunto
    //     delle vecchie sessioni in context (system) e eliminando storico! " contesto storico:  \ n - bla bla "
    // added to first context:"\n today: data"
    const messages = [];
    // 1. Costruzione contesto
    let first = true;
    for (let i = 1; i <= contextNumber; i++) {
        const ctx = serverStorage.get(sessionId + "X" + i);
        // adding today date to first content
        if (ctx?.enabled) {
            if (first) {
                let content2 = ctx.data.content + "\n Today: " + (new Date().toString()) + "\n";
                first = false;
                messages.push({
                    ...ctx.data,
                    content: content2
                })
            } else
                messages.push(
                    ctx.data // i.e. system, content
                );
        }
    }
    //   console.log("buildContext A", 0, contextNumber, messages);
    // 2. Aggiunta storico conversazione
    const startHistory = serverStorage.get(sessionId + 'start')?.limit || 1;
    for (let i = startHistory; i <= responseNumber; i++) {
        const userMsg = serverStorage.get(sessionId + 'U' + i);
        const aiMsg = serverStorage.get(sessionId + '_' + i);
        const toolMsg = serverStorage.get(sessionId + 'T' + i);
        if (toolMsg?.data?.role == 'tool')
            messages.push(toolMsg.data);

        if (userMsg) // adds reference id to content
            messages.push({
                role: 'user', //: user
                content: `[Q${i}] ${userMsg.data.content}`
            });
        if (aiMsg?.data?.content) // addsreference id to content
            messages.push({
                role: aiMsg.data.role, // assistant
                content: `[R${i}] ${aiMsg.data.content}`
            });

        if (aiMsg?.data?.tool_calls)
            messages.push({
                role: aiMsg.data.role, // assistant
                tool_calls: aiMsg.data.tool_calls
            });

    }
    //   console.log("buildContext: ", startHistory, responseNumber, messages);
    return messages;
}

// --- Chat principale ---
/**
 * Endpoint di chat con gestione contesto/storico
 * @route POST /api/chat
 * @param {string} req.body.message - Messaggio utente
 * @param {string} [req.body.sessionId='default'] - ID sessione
 * @returns {Object} Risposta AI + metadati
 */
//test: curl -N -X POST -H " Content - Type: application / json " -d '{" message ":" Spiegami la teoria della relatività "}' http://localhost:3030/api/chat
var startTime = 0;

app.post('/api/chat', async(req, res) => {
    let secondResponse = "";
    let finalResponse = "";

    try {
        // 1.sends user request message:
        const {
            message,
            sessionId = 'default'
        } = req.body;
        restoreConfig(sessionId);
        checkOpenAI();
        req.setTimeout(aiConfig.timeoutAi * 1000, () => {
            res.status(408);
            res.send("Request timeout " + aiConfig.timeoutAi + "s.");
        });

        var messages = buildContext(sessionId);
        // Aggiungi nuovo messaggio utente
        storageAppend(sessionId, {
            role: "user",
            content: message
        });
        var messages = buildContext(sessionId);
        let response = null;
        // optional
        let base = {
            model: aiConfig.model
        }
		if (aiConfig.max_tokens !== null){
			if (aiConfig.quirkMaxCompletion)
				base["max_completion_tokens"] = aiConfig.max_tokens;
			else
				base["max_tokens"] = aiConfig.max_tokens;
		}
        if (aiConfig.top_p !== null)
            base.top_p = aiConfig.top_p;
        if (aiConfig.top_k !== null)
            base.top_k = aiConfig.top_k;
        if (aiConfig.stop !== null)
            base.stop = aiConfig.stop;
        if (aiConfig.seed)
            base.seed = 126;                // non importa il valore
        if (aiConfig.frequency_penalty !== null)
            base.frequency_penalty = aiConfig.frequency_penalty;
        if (aiConfig.temperature !== null)
            base.temperature = aiConfig.temperature;

        if (aiConfig.enableTuyaTools  && aiConfig.IoTwebUIok) {
            const tools = Array.from(toolsRegistry).map(([name, tool]) => ({
                        type: "function",
                        function : {
                            name,
                            description: tool.description,
                            parameters: tool.parameters
                        }
                    }));

            // log Prima chiamata API
            if (aiConfig.enableDebugMode)
                console.log(">>> to AI: ", {
                    ...base,
                    messages: messages.slice(-3),
                    tools,
                    tool_choice: "auto"
                });

            startTime = Date.now();
            //  Prima chiamata API
            try {
                response = await aiClient.chat.completions.create({
                    ...base,
                    messages,
                    tools,
                    tool_choice: "auto",
                });
            } catch (error) {
                response = {
                    choices: [{
                            message: {
                                role: 'assistant',
                                content: "<b>ERROR " + error.code + "</b>: <font color=red>" + error.message + "</font>"
                            }
                        }
                    ]
                };
            }
        } // tool case ends
        else {
            // log Prima chiamata API
            if (aiConfig.enableDebugMode)
                console.log(">>> to AI: ", {
                    ...base,
                    messages: messages.slice(-3)
                });
            startTime = Date.now();
            //  Prima chiamata API
            try {
                response = await aiClient.chat.completions.create({
                    ...base,
                    messages,
                });
            } catch (error) {
                response = {
                    choices: [{
                            message: {
                                role: 'assistant',
                                content: "<b>ERROR " + error.code + "</b>: <font color=red>" + error.message + "</font>"
                            }
                        }
                    ]
                };
            }

        } // notool case ends
        // 2. AI response processing
        const aiResponse = response?.choices[0]?.message; // primo messaggio
        if (aiConfig.enableDebugMode)
            console.log("<<< from AI: ", aiResponse);
        // to storage:
        if (aiResponse?.tool_calls && Array.isArray(aiResponse.tool_calls))
            storageAppend(sessionId, {
                role: aiResponse.role,
                tool_calls: aiResponse.tool_calls
            });
        else
            storageAppend(sessionId, {
                role: 'assistant',
                content: cleanAnswer(aiResponse.content)
            });

        finalReply = aiResponse.content || "";
        // TOOL processing if tool_calls[]
        if (aiResponse.tool_calls && Array.isArray(aiResponse.tool_calls)) {
            // 3. option: process custom tool calls
            await processTools(sessionId, aiResponse.tool_calls);
            //
            let messages2 = buildContext(sessionId);

            if (aiConfig.enableDebugMode)
                console.log(">>> to AI: ", {
                    ...base,
                    messages: messages2.slice(-4),
                });
            /* see */
            storageAppend(sessionId, {
                ...base,
                messages: messages2,
                role: "user"
            }); // role serve per il corretto archivo
            // Seconda chiamata API solo se ci sono tool_calls
            try {
                response = await aiClient.chat.completions.create({
                    ...base,
                    messages: messages2
                })
            } catch (error) {
                response = {
                    choices: [{
                            message: {
                                role: 'assistant',
                                content: "<b>ERROR " + error.code + "</b>: <font color=red>" + error.message + "</font>"
                            }
                        }
                    ]
                };
            }

            secondResponse = response?.choices[0]?.message;
            storageAppend(sessionId, secondResponse);
            if (aiConfig.enableDebugMode)
                console.log("<<< from AI: ", secondResponse);
            // responses cleanup for screen
            finalReply = finalReply.replace(ANSWERSTART, "");
            finalReply = (finalReply ? (finalReply + '<hr>') : "") + secondResponse.content.replace(REASONINGSTART, "");

        } // ends if tool_calls
        // 4. general AI response process
        finalReply = cleanRef(finalReply); // after: or naked or with REASONINGSTART  ANSWERSTART
        // cuts finalReply => reasoning + finalReply, or only finalReply
        var reasoning = "";
        const reasoningEndIndex = finalReply.indexOf(ANSWERSTART);
        if (reasoningEndIndex !== -1) {
            reasoning = finalReply.slice(0, reasoningEndIndex);
            reasoning = reasoning.replace(REASONINGSTART, "");
            //           reasoning = reasoning.replace('\n', "<br/>"); // minimal reasoning HTML format
            finalReply = finalReply.slice(reasoningEndIndex + ANSWERSTART.length);
        }
        res.json({
            success: true,
            reply: finalReply,
            reasoning: reasoning, //  .replace(/\n/g, '<br>'),
            //      toolCalls: aiResponse.tool_calls ? toolResults : null,
            model: aiConfig.model,
            responseId: responseNumber - 1,
            usage: response.usage,
            delay: new Date(Date.now() - startTime).toLocaleTimeString('sv-SE', {
                timeZone: 'UTC'
            })
        });

    } catch (error) {
        console.error('Server /api/chat error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// --- Chat stream ---
/**
 * Endpoint di chat con gestione contesto/storico ottimizzata per streams di deepssk-reasoning
 * @route POST /api/chat-stream
 * @param {string} req.body.message - Messaggio utente
 * @param {string} [req.body.sessionId='default'] - ID sessione
 * @returns {Object} Risposta AI + metadati
 */
// note: not update to tool processing
//test: curl -N -X POST -H " Content - Type: application / json " -d '{" message ":" Spiegami la teoria della relatività "}' http://localhost:3030/api/chat-stream

app.post('/api/chat-stream', async(req, res) => {
    try {
        const {
            message,
            sessionId = 'default'
        } = req.body;

        restoreConfig(sessionId);
        checkOpenAI();

        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders();

        const messages = buildContext(sessionId);
        messages.push({
            role: "user",
            content: message
        });
        storageAppend(sessionId, {
            role: "user",
            content: message
        });
        let tools = [];
        if (aiConfig.enableTuyaTools  && aiConfig.IoTwebUIok) {
            tools = Array.from(toolsRegistry).map(([name, tool]) => ({
                        type: "function",
                        function : {
                            name,
                            description: tool.description,
                            parameters: tool.parameters
                        }
                    }));
        }
        // Prima chiamata API
        if (aiConfig.enableDebugMode)
            console.log(">>> to AI-stream: ", {
                model: aiConfig.model,
                messages: messages.slice(-3),
                tools,
                tool_choice: "auto", // <--- MODIFICBILE
            });

        let buffer = '';
        let hasSentReasoning = false;
        let answerBuffer = '';
        startTime = Date.now();

        const stream = await aiClient.chat.completions.create({
            model: aiConfig.model,
            messages,
            temperature: aiConfig.temperature,
            max_tokens: aiConfig.max_tokens,
            stream: true
        });
        // NOTA: TOOL processing NON COMPATIBILE con STREAM MODE?
        let aiResponse = null;
        if (stream?.choices && Array.isArray(stream?.choices))
            aiResponse = stream?.choices[0]?.message; // primo messaggio
        if (aiResponse?.tool_calls && Array.isArray(aiResponse?.tool_calls)) {
            hasSentReasoning = true; // false, to continue
        } else
            // 2. AI response processing
            for await(const chunk of stream) {
                const content = chunk.choices[0]?.delta?.content || '';
                buffer += content // .replace(/\n/g, '<br>');

                // Fase 1: Rileva Reasoning
                if (!hasSentReasoning) {
                    const reasoningIndex = buffer.indexOf(REASONINGSTART);
                    if (reasoningIndex !== -1) {
                        // Estrai e invia tutto il reasoning in un unico blocco
                        const reasoningEndIndex = buffer.indexOf(ANSWERSTART);
                        if (reasoningEndIndex !== -1) {
                            const reasoningContent = buffer.slice(
                                    reasoningIndex + REASONINGSTART.length,
                                    reasoningEndIndex);

                            res.write(`event: reasoning\ndata: ${JSON.stringify({
                                    chunk: reasoningContent 
                                })}\n\n`);

                            buffer = buffer.slice(reasoningEndIndex + ANSWERSTART.length);
                            hasSentReasoning = true;
                        }
                    }
                }

                // Fase 2: Accumula answer
                if (hasSentReasoning) {
                    answerBuffer += buffer;
                    buffer = '';
                }
            } // end for

        if (!hasSentReasoning) {
            answerBuffer += buffer
        }

        // 3. processing answer answerBuffer
        if (aiResponse?.tool_calls && Array.isArray(aiResponse?.tool_calls))
            storageAppend(sessionId, {
                role: aiResponse?.role,
                tool_calls: aiResponse?.tool_calls
            });
        else
            storageAppend(sessionId, {
                role: 'assistant',
                content: cleanAnswer(answerBuffer)
            });

        let finalReply = answerBuffer || "";
        if (aiResponse?.tool_calls && Array.isArray(aiResponse?.tool_calls)) {
            // 3. option: process custom tool calls
            await processTools(sessionId, aiResponse?.tool_calls);
            //
            let messages2 = buildContext(sessionId);
            let usrmsg2 = {
                role: "user",
                content: "continue",
                model: aiConfig.model,
                messages: messages2,
                temperature: aiConfig.temperature
            }
            // 4. Richiedi all'AI di elaborare i risultati
            if (aiConfig.enableDebugMode)
                console.log(">>> to AI: ", {
                    role: "user",
                    content: "continue",
                    model: aiConfig.model,
                    messages: messages2.slice(-3),
                    temperature: aiConfig.temperature
                });
            /* see */
            storageAppend(sessionId, usrmsg2);
            // Seconda chiamata API solo se ci sono tool_calls
            const response = await aiClient.chat.completions.create(usrmsg2);
            const secondResponse = response.choices[0]?.message;
            storageAppend(sessionId, secondResponse);
            if (aiConfig.enableDebugMode)
                console.log("<<< from AI: ", secondResponse);
            // responses cleanup for screen
            finalReply = finalReply.replace(ANSWERSTART, "") + '<hr>' + secondResponse.content.replace(REASONINGSTART, "");

        } // ends if tool_calls

        // 4. general AI response
        finalReply = cleanRef(finalReply); // after: or naked or with REASONINGSTART  ANSWERSTART
        // cuts finalReply => reasoning + finalReply, or only finalReply
        var reasoning = "";
        const reasoningEndIndex = finalReply.indexOf(ANSWERSTART);
        if (reasoningEndIndex !== -1) {
            reasoning = finalReply.slice(0, reasoningEndIndex);
            reasoning = reasoning.replace(REASONINGSTART, "");
            reasoning = reasoning.replace("\n", "<br/>"); // minimal reasoning HTML format
            finalReply = finalReply.slice(reasoningEndIndex + ANSWERSTART.length);
        }

        // Invia la risposta finale completa
        res.write(`event: final\ndata: ${JSON.stringify({
        responseId: responseNumber - 1,
        success: true,
		reasoning,
        model: aiConfig.model,
        usage: {},
        reply: finalReply,
		delay : new Date(Date.now() - startTime).toLocaleTimeString('sv-SE', { timeZone: 'UTC', hour12: false }) 
        })}\n\n`);

    } catch (error) {
        console.error('Server api/chat-stream error:', error);
        res.write(`event: error\ndata: ${JSON.stringify({
        error: error.message,
        success: false,
        })}\n\n`);
    }
    finally {
        res.end();
    }
});

// ===== VERIFICA INIT =====
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}\n` +
`- Provider: ${aiConfig.provider}\n- Modello: ${aiConfig.model}`);
});

// Gestione errori globali
process.on('uncaughtException', (err) => {
    console.error('⚠ Critical error:', err);
    process.exit(1);
});

// ======================================= EXSTENSION TOOLS

// ===== TOOLS REGISTRY =====
const toolsRegistry = new Map(); // {name: {desc, params, endpoint}}

// ===== TOOLS PREDEFINITI =====
// static definition of TOOLS
const TUYA_TOOLS = {
    GetTuyaValue: {
        name: "GetTuyaValue",
        description: "Recupera, legge il valore di un attributo di un dispositivo Tuya o IoTwebUI. Esempio per sensori, interruttori o stati di tutti i device disponibili.",
        parameters: {
            type: "object",
            properties: {
                device: {
                    type: "string",
                    description: "nome unico del dispositivo target, il NOME deve essere presente nella tabella 'Tuya DEVICE' "
                },
                attribute: {
                    type: "string",
                    description: "Attributo o variabile di stato da leggere. Se si usa un attributo che non esiste, e.g.'probe', ma esiste il device, ritorna un warning e tutti gli attributi del device con il loro valore sono nel campo debug."
                }
            },
            required: ["device", "attribute"]
        },
        // (alternative implementation)     endpoint:'/internal/IOTwebUI/get "
    },
    SetTuyaValue: {
        name: "SetTuyaValue",
        description: "aggiorna, cambia, scrive un nuovo valore di un  x-device. Esempio per aggiornare lo stato dei x-device disponibili.",
        parameters: {
            type: "object",
            properties: {
                device: {
                    type: "string",
                    description: "nome unico del dispositivo target, il NOME deve essere presente nella tabella 'Tuya DEVICE' e DEVE appartenere alla CATEGORIA 'x-dev' oppure 'x-device custom', NON ad altre CATEGORIE."
                },
                attribute: {
                    type: "string",
                    description: "Attributo da cambiare, DEVE essere presente nel device chiamato NOME nella tabella 'Tuya DEVICE' "
                },
                value: {
                    type: "string",
                    description: "Il valore da scrivere, o modificare, sempre in formato stringa "
                }

            },
            required: ["device", "attribute", "value"]
        },
        // (alternative implementation)     endpoint:'/internal/IOTwebUI/set'
    },
    RunTuyaTTR: {
        name: "RunTuyaTTR",
        description: "Esegue un TTR(Tap To Run), che implementa dei comandi predefiniti in ambiente Tuya e IOTwbUI ",
        parameters: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                    description: "Identificativo del comando, deve essere presente nella LISTA 'Tuya TAP_TO_RUN', eg 'smoke alarm OFF', 'sirena2', 'frigoData' "
                }
            },
            required: ["name"]
        },
        // (alternative implementation)     endpoint:'/internal/IOTwebUI/execute'
    }
};

// ===== INIZIALIZZAZIONE TOOLS =====
// Aggiungi questa parte dopo l'inizializzazione di aiConfig
setTimeout(() => {
    if (aiConfig.enableTuyaTools) { // Flag configurabile
        for (let key in TUYA_TOOLS) {
            toolsRegistry.set(TUYA_TOOLS[key].name, TUYA_TOOLS[key])
        };
        console.log(`[Init] Registred Tuya tools: ${toolsRegistry.size}`);
    }
}, 1000);

/**
 * Utility processes tools request
 * @param {sessionId} SesssionID
 * @param {array} tool_calls Da assistant: elenco richeste
 * @note  IOTwbUI REST info: https://github.com/msillano/IoTwebUI/tree/main/RESTserver
 * @returns nothing. Push result in the historical storage as message
 */
async function processTools(sessionId, tool_calls) {

    let tool_responses = [];
    for (const toolCall of tool_calls) {
        //	1) data
        let toolResult = '';
        const toolName = toolCall.function.name;
        // verifica la presenza nel registry!
        const tool = toolsRegistry.get(toolName);

        if (!tool) {
            console.log("ERROR: tuyaTOLL NOT found in Registy:", toolName);
            toolResult = {
                status: "error",
                message: `Tool ${toolName} non registrato`
            };
        } else {
            const params = JSON.parse(toolCall.function.arguments);
            // ================= 2) LOCAL CALL
            // tool RunTuyaTTR
            if (toolName == "RunTuyaTTR") {
                const ttrName = params.name; // Es.'SuonaSirena'
                try {
                    let result = await RESTget(IOTwbUI_rest_URL + 'execute/' + ttrName);
                    //                console.log('REST run(' + ttrName + ') => ', result);
                    let more = "\n(debug:" + JSON.stringify(result) + ")";
                    if (result.done) {
                        toolResult = {
                            status: 'success',
                            message: "REST Tap_to_run(" + ttrName + ") play ok " + more,
                        }
                    } else {
                        toolResult = {
                            status: "error",
                            message: "REST Tap_to_run(" + ttrName + ") is " + (result.error || 'offline') + more,
                        }
                    };

                } catch (error) {
                    console.error('TOOL stream error:', error);
                    toolResult = {
                        status: "error",
                        message: "REST error: " + error
                    }
                };

            };
            // tool GetTuyaValue
            if (toolName == "GetTuyaValue") {
                const deviceName = params.device; // Es. " SuonaSirena "
                const valueCode = params.attribute;
                // ==== here custom code
                // using stotus to get online + value!
                try {
                    let result = await RESTget(IOTwbUI_rest_URL + 'device/' + deviceName + '/ddata');
                    /* e.g.	    {name:'Termo studio',
                    online: true,
                    status: {switch: true,
                    temp_current: 306,
                    temp_set: 200 }} */
                    let more = '\n(debug:' + JSON.stringify(result) + ')';
                    if (!result.online) {
                        toolResult = {
                            status: 'error',
                            value: 'unknown',
                            message: 'REST(set(' + deviceName + '.' + valueCode + ")) returns " + (result.error || 'offline') + more,
                        };

                    } else {
                        const online = (result.online === true) || (result.online == 'true');
                        const xvalue = result.status[valueCode] || 'unknow';
                        if (online) {
                            toolResult = {
                                status: "success",
                                value: xvalue,
                                message: "REST ok, " + deviceName + '.' + valueCode + ' = ' + xvalue + more,
                            }
                        } else {
                            toolResult = {
                                status: "warning",
                                value: 'unknown',
                                message: 'Device ' + deviceName + ' is now offline, last ' + valueCode + ' = ' + xvalue + more,
                            }
                        };
                    };
                } catch (error) {
                    console.error('TOOL stream error:', error);
                    toolResult = {
                        status: "error",
                        message: "REST error: " + error
                    }
                };
            };
            // tool SetTuyaValue
            if (toolName == "SetTuyaValue") {
                const deviceName = params.device; // Es. " SuonaSirena "
                const valueCode = params.attribute;
                const newValue = params.value;
                try {
                    let result = await RESTget(IOTwbUI_rest_URL + 'set/' + deviceName + '/' + valueCode + '/' + newValue);
                    let more = "\n(debug: " + JSON.stringify(result) + ")";

                    if (result.done) {
                        toolResult = {
                            status: "success",
                            message: "REST set()ok, " + deviceName + '.' + valueCode + ' aggiornato' + more,
                        }
                    } else {
                        toolResult = {
                            status: 'error',
                            message: "REST(set(" + deviceName + '.' + valueCode + "))returns " + (result.error || 'offline') + more,
                        }
                    };

                } catch (error) {
                    console.error('TOOL stream error:', error);
                    toolResult = {
                        status: "error",
                        message: "REST error: " + error
                    }
                };
            } // if SetTuyaValue
            // ===================== LOCAL TOOLS ENDS
        } // if tool ok
        // final result
        storageAppend(sessionId, {
            //           index: toolCall.index,
            tool_call_id: toolCall.id,
            role: 'tool',
            name: toolName,
            content: JSON.stringify(toolResult)
        });
    } // for tool
}

// utility: REST implementation for nodej requires node-fetch
async function RESTget(url) {
    try {
        const {
        default:
            fetch
        } = await import('node-fetch');
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 404) {
                response.status = 200;
                console.log("ERROR *** REST result: 'unfound' on " + url);
                return {
                    error: "unfound"
                };
            } else {
                throw new Error('Network response was not ok. Status: ' + response.status);
            }
        }
        const data = await response.json();
        if (data && data.error) {
            console.log("ERROR *** REST result: '" + data.error + "' on " + url);
        }
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return {
            error: error.message || error
        }; // Restituisci un oggetto errore coerente
    }
}

// Helper: Lista tools registrati - not used
app.get('/tools/list', (req, res) => {
    res.json(Array.from(toolsRegistry).map(([name, data]) => ({
                name,
                description: data.description,
                parameters: data.parameters,
                endpoint: data.endpoint
            })));
});
