/**
 * @file ai_proxy.js
 * @description Libreria JavaScript per interagire con il server locale 'ai_server'.
 * Fornisce funzioni asincrone per semplificare le chiamate API a openAI.
 *  This file is part of IoTwebUI-AI project (https://github.com/msillano/IoTwebUI)
 * @version 1.0
 * @license MIT
 * @author Marco Sillano
 * @created 01/04/2025
 * (C)2025 marco.sillano@gmail.com
 */
/*
Gestione errori
Tutte le risposte sono oggetti, con un valore 'success': se TRUE, sono presenti altri campi specifici, se FALSE cè un campo 'error' con informazioni (in genete rimanda a console).
Unica eccezione: updateConfig() che torna true/false e gestisce in proprio un pop-up in caso di errore (è usabile in startup)
 */
// ====================== GLOBALS
// URL di accesso a server01.js
// cambiare PORT se occupata, vedi server02.js riga 43
const proxyURL = 'http://localhost:3035';

// IoTwebUI config: (see also server02).
const IOTwbUI_rest_URL = 'http://localhost:3031/IoTrest/';

// aggiornata allo startup da AIserver
var aiConfig = {};
/* @note configuration (default) (in server02.js):
provider:  'deepseek',
baseURL:   'https://api.deepseek.com',
apiKey:    process.env.API_KEY, // Key da variabile d'ambiente
model:     'deepseek-chat',
// model:  'deepseek-reasoner',  // no functions
// model:  'deepseek-code',
temperature: 0.7,  // parameter for AI
max_tokens: 3000,  // parametro per AI
timeoutAi: 90,     // attesa risposta block mode in secondi
enableTuyaTools:  true,
emableStreamMode: false
 */
// ====================== STARTUP

async function init_ai_proxy() {
  try {
    const isOnline = await testIoTwebUI();  // test REST => popup if bad
 	console.log("init_ai_proxy", isOnline);
    await updateConfig({                    // updates server02 & local aiConfig + IoTwebUIok
       IoTwebUIok: isOnline, 
  //    enableTuyaTools: isOnline 
    });
   } catch {} // Mangia tutti gli errori
}

// ====================== UTILITIES

// Popup per messaggi HTML (error, etc..)
function windowPopup(textHTML) {
    const popup = window.open('', '_blank', 'width=600,height=400, popup=true'); // Apre una nuova finestra
    if (popup) { //Verifica che la finestra popup sia stata aperta con successo
        popup.document.open();
        popup.document.write(textHTML); // Scrive l'HTML nel documento del popup
        popup.document.close();
    } else {
        console.log("ERROR: ai_proxy.windowPopup() ", (textHTML.length > 20) ? textHTML.slice(0, 20) + " more..." : textHTML);
    }
}

/**
 * Verifica se il server REST di IoTwebUI è attivo.
 * @returns {Promise<boolean>} Una Promise che si risolve con true se il server è attivo, false altrimenti + ALERT
 */
 async function testIoTwebUI() {
  try {
		const res = await fetch(IOTwbUI_rest_URL + 'home/list', { timeout: 2000 });
		if (!res.ok) throw new Error();
		return true;
  } catch {
		alert( '\nThe REST of IoTwebUI is offline.\nTuya TOOL are disabled.');
	  }
  return false;
 }

// ====================== PROXY API
/**
 * @async
 * @function updateConfig
 * @description Aggiorna la configurazione globale del server 'ai_server'. Se
 * necessario rilancia OpenAI
 * @param {object} configuration - Oggetto contenente la nuova configurazione, anche parziale, solo alcuni campi.
 * @returns {Promise<boolean>} - Promise che risolve con true, in caso di successo + echo in console, altrimenti false + ERROR in console + ALERT.
 */
async function updateConfig(configuration) {
    try {
	//	console.log('updateConfig in:',configuration); 

        if (typeof configuration != 'object')
            throw new Error("bad config");

        const response = await fetch(proxyURL + '/update-ai-settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sessionId,
                config: configuration,
            })
        });

        // Verifica se la risposta è OK (status 200-299)
        if (response.ok) {
            aiConfig = await response.json();
            console.log('Use configuration:', aiConfig);
            return true; // Restituisci true per indicare il successo
        } else {
            // ===== Gestione degli errori HTTP (400, 404, 500, ecc.) al di fuori del catch
            switch (response.status) {
            case 404:
                // runtime user error
                alert('\nIs the AIserver up and running?\nThen reload the Chat page.');
                return false;
            default:
                // debug: fix it!
                console.log(`ERROR ${response.status} in ai.proxy.updateConfig(): see AIserver console`);
                return false;
            }
        }
    } catch (error) {
        if (error.message == 'Failed to fetch') {
            // runtime user error
            alert(error.message + '\nIs the AIserver up and running?\nThen reload the Chat page.');
        } else
            console.log("ERROR in ai.proxy.updateConfig():", error);
        return false;
    }
};


/**
 * @async
 * @function proxyGetHistory
 * @description Recupera la cronologia delle conversazioni per una specifica sessione.
 * @param {string} responseID - ID della risposta. Ricerca la prima conversazione con ID uquale o minore di quello fornito  (default: last, ID <= 1: first).
 * @param {string} sessionId - ID della sessione per cui recuperare la cronologia.
 * @returns {Promise<Array<object>} - Promise che risolve con succes = true + {found, reply, answer, responseID }
 *  altrimenti success = false + error= info.
 */
async function proxyGetHistory(responseID, sessionId) {
    try {
        const response = await fetch(proxyURL + "/history/get?sessionId=" + sessionId + '&responseID=' + responseID, {
            method: 'GET',
        });
        if (response.ok) {
            return await response.json();
        } else {
            console.log(`ERROR ${response.status} in  ai_proxy.proxyGetHistory(): Fix it - see AIserver console`);
            return {
                success: false,
                error: "Server02 error: see console"
            };
        }

    } catch (error) {
        console.error("ERROR in ai_proxy.proxyGetHistory():", error);
        return {
            success: false,
            error: "Internal error: see console"
        };
    }
}


/**
 * @async
 * @function proxyForgetHistory
 * @description Rimuove (non cancella da storage) un certo numero di messaggi più vecchi dalla cronologia di una sessione.
 * @param {number} limit - indice del primo messaggio da NON rimuvere.
 * @param {string} sessionId - ID della sessione da cui rimuovere la cronologia.
 * @returns {Promise<Array<object>} - Promise che risolve con succes = true + { reply, currentStart, currentNext}
 *  altrimenti success = false + error= info.
 */
async function proxyForgetHistory(limit, sessionId) {
    try {
  	//	console.log('proxyForgetHistory in:',limit, sessionId); 
       const response = await fetch(proxyURL + "/history/forget?sessionId=" + sessionId + "&limit=" + limit, {
            method: 'GET',
        });
        if (response.ok) {
            const result = await response.json();
            result.reply = "Changed chat history start: " + result.currentStart;
            return {
                result
            };
        } else {
            console.log(`ERROR ${response.status} in  ai_proxy.proxyGetHistory(): see AIserver console`);
            return {
                success: false,
                error: "Server02 error: see console"
            };
        }

    } catch (error) {
        console.error("ERROR in ai_proxy.proxyGetHistory():", error);
        return {
            success: false,
            error: "Internal error: see console"
        };
    }
}

/**
 * @async
 * @function proxyResetHistory
 * @description Elimina completamente la cronologia delle conversazioni per una specifica sessione.
 * @param {string} sessionId - ID della sessione di cui resettare la cronologia.
 * @returns {Promise<Array<object>} - Promise che risolve con succes = true + { reply, currentStart, currentNext}
 *  altrimenti success = false + error= info.
 */
async function proxyResetHistory(sessionId) {
    try {
  	//	console.log('proxyResetHistory in:', sessionId); 
        const response = await fetch(proxyURL + "/history/reset?sessionId=" + sessionId, {
            method: 'GET',
        });
        if (response.ok) {
            return {
                ...(await response.json()),
                reply: "Chat history cleared."
            };
        } else {
            console.log(`ERROR ${response.status} in  ai_proxy.proxyResetHistory(): see AIserver console`);
            return {
                success: false,
                error: "Server02 error: see console"
            };
        }

    } catch (error) {
        console.error("ERROR in ai_proxy.proxyResetHistory():", error);
        return {
            success: false,
            error: "Internal error: see console"
        };
    }
}

/*
Structure of Context messages....
Builds and sends to server (/context/append) envelope, 'store' is the payload:{
store:       // this is ready to store
data:
content: "### Sei un assistente di..."
role:"system"
enabled:true
name:"CONX-Tink mode.txt"  // file or id

sessionId:"540cf4ae-111f-4045-b597-8c20adff2d59" }
 */

/**
 * @async
 * @function proxyAddContext
 * @description Aggiunge un messaggio di contesto alla memoria di contesto di una sessione.
 * @param {string} payload - il contenuto, e.g. stringa, buffer
 * @param {string} name - identificativo del documento/file
 * @param {string} sessionId - ID della sessione a cui aggiungere il contesto.
 * @returns {Promise<boolean>} - Promise che risolve con succes = true + {
reply, name, storageCount, enableCount}
 *  altrimenti success = false + error= info.

 */
async function proxyAddContext(payload, name, sessionId) {
    try {
   	//	console.log('proxyAddContext in:', payload, name, sessionId); 
       // as required by AIserver:
        const envelope = {
            store: {
                name,
                enabled: true,
                data: {
                    role: 'system',
                    //content: JSON.stringify(payload),
                    content: payload,
                },
            },
            sessionId,
        };
        const response = await fetch(proxyURL + '/context/append', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(envelope)
        });
        if (response.ok) {
            const result = await response.json();
            result.name = name;
            result.reply = 'Data <i>' + name + '</i> added to context [' + response.enableCount + '/' + response.storageCount + ']';
            return {
                result
            };
        } else {
            console.log(`ERROR ${response.status} in  ai_proxy.proxyAddContext(): see AIserver console`);
            return {
                success: false,
                error: "Server02 error: see console"
            };
        }

    } catch (error) {
        console.error("ERROR in ai_proxy.proxyAddContext():", error);
        return {
            success: false,
            error: "Internal error: see console"
        };

    }
}

/**
 * @async
 * @function proxyFileToContext
 * @description Carica il contenuto di un file e lo aggiunge come contesto a una sessione.
 * @param {File} file - L'oggetto File da leggere e aggiungere come contesto.
 * @param {string} sessionId - ID della sessione a cui aggiungere il contesto dal file.
 * @returns {Promise<boolean>} - Promise che risolve con{found, reply, storageCount, enableCount}
 */
async function proxyFileToContext(file, sessionId) {
    try {
    	//	console.log('proxyFileToContext in:', file.name, sessionId); 
       const result = await proxyExistsContext(file.name, sessionId);
        if (!result.success)
            return result;
        //      console.log(" proxyExistsContext: ", result);
        if (result.found) {
            return {
                ...result,
                name: file.name,
                reply: 'Context file <i>' + file.name + '</i> exists: enabled [' + result.enableCount + '/' + result.storageCount + ']'
            };
        }
        if (result.cache == 'hit') {
            return {
                ...result,
                name: file.name,
                reply: 'Context file <i>' + file.name + '</i> in cache: added [' + result.enableCount + '/' + result.storageCount + ']'
            };
        }
        return {
            ...(await proxyAddContext((await file.text()), file.name, sessionId)),
            found: false,
            chache: 'miss',
            reply: 'File <i>' + file.name + '</i> added to context [' + (result.enableCount + 1) + '/' + (result.storageCount + 1) + ']'
        }

    } catch (error) {
        console.error("ERROR in ai_proxy.proxyAddContext():", error);
        return {
            success: false,
            error: "Internal error: see console"
        };
    }
}

/**
 * @async
 * @function proxyExistsContextFile
 * @description Verifica se un file di contesto con un determinato nome esiste per una sessione.
 *  se esiste lo abilita, altrimenti cerca in cache, e, se trovato, crea una new entry.
 * @param {string} filename - Il nome del file da verificare.
 * @param {string} sessionId - ID della sessione in cui cercare il file.
 * @returns {Promise<boolean>} - Promise che risolve con
 * @returns {Promise<boolean>} - Promise che risolve con succes = true + {
found, storageCount, enableCount}
 *  altrimenti success = false + error= info.
 */
async function proxyExistsContext(name, sessionId) {
    try {
   	//	console.log('proxyExistsContext in:', name, sessionId); 
        const response = await fetch(proxyURL + "/context/check?sessionId=" + sessionId + "&name=" + name, {
            method: 'GET',
        });
        const result = await response.json();
        return result;

    } catch (error) {
        console.error("Errore in ai_proxy.proxyExistsContext():", error);
        return {
            success: false,
            error: "Internal error: see console"
        };
    }
}

/**
 * @async
 * @function proxyDisableContext
 * @description Disabilita uno specifico documento di contesto per una sessione.
 * @param {string} name - Il nome identificativo del documento.
 * @param {string} sessionId - ID della sessione in cui disabilitare il contesto.
 * @returns {Promise<boolean>} - Promise che risolve con succes = true + {
found, reply, storageCount, enableCount}
 *  altrimenti success = false + error= info.
 */
async function proxyDisableContext(name, sessionId) {
    try {
   	//	console.log('proxyDisableContext in:', name, sessionId); 
       const response = await fetch(proxyURL + "/context/delete", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sessionId,
                filename: name,
            })
        });
        const result = await response.json();
        return {
            ...result,
            reply: 'Context file <i>' + name + '</i> disabled [' + result.enableCount + '/' + result.storageCount + ']'
        };

    } catch (error) {
        console.error("Errore in ai_proxy.proxyDisableContext():", error);
        return {
            success: false,
            error: "Internal error: see console"
        };
    }
}

/**
 * @async
 * @function proxyClearContext
 * @description Elimina tutto il contesto memorizzato per una specifica sessione.
 * @param {string} sessionId - ID della sessione di cui eliminare il contesto.
 * @returns {Promise<boolean>} - Promise che risolve con succes = true + {
reply, storageCount, enableCount}
 *  altrimenti success = false + error= info.
 */
async function proxyClearContext(sessionId) {
    try {
		console.log('proxyClearContext in:',sessionId); 
        const response = await fetch(proxyURL + "/context/clear?sessionId=" + sessionId, {
            method: 'GET',
        });
        return {
            ...(await response.json()),
            reply: "Context cleared."
        };

    } catch (error) {
        console.error("Errore in ai_proxy.proxyClearContext():", error);
        return {
            success: false,
            error: "Internal error: see console"
        };
    }
}

/**
 * @async
 * @function proxyCallOpenai
 * @description Invia un messaggio all'API di OpenAI per ottenere una risposta - modo blocco.
 * @param {string} message - Il messaggio da inviare all'AI.  ( context+History + prompt)
 * @param {string} sessionId - ID della sessione corrente.
 * @returns {Promise<object|null>} - Promise che risolve con l'oggetto contenente la risposta dell'AI: {reply, responseId, model, usage }
 * o null in caso di errore.
 */
async function proxyCallOpenai(message, sessionId) {
    try {
        //       console.log("proxyCallOpenai in:", message, sessionId );
        const airesponse = await fetch(proxyURL + '/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message,
                sessionId
            })
        });
        if (!airesponse.ok) {
            const errorData = await airesponse.json();
            throw new Error(errorData.message || 'Errore nella richiesta');
        }
        const data = await airesponse.json();
        //      console.log("proxyCallOpenai: Risposta ", data );
        return data;

    } catch (error) {
        console.error("Errore in ai_proxy.proxyCallOpenai():", error);
        return {
            success: false,
            error: "Internal error: see console"
        };
    }
}

/**
 * @async
 * @function proxyCallStream
 * @description Invia un messaggio all'API di OpenAI per ottenere una risposta in streaming.
 * @param {string} message - Il messaggio da inviare all'AI.  ( context+History + prompt)
 * @param {string} sessionId - ID della sessione corrente.
 * @param {function(string)} onReasoning - Funzione di callback chiamata con i messaggi di "reasoning" (se disponibili).
 * @param {function(string)} onAnswer - Funzione di callback chiamata con i segmenti della risposta finale.
 * @returns {Promise<void>} - Promise che risolve quando lo streaming è completato o si verifica un errore. {reply,  responseId, model, usage }
 */

async function proxyCallStream(message, sessionId, onReasoning, onAnswer) {
    try {
        //       console.log("proxyCallStream in:", message, sessionId,  onReasoning, onAnswer );
       const response = await fetch(proxyURL + '/api/chat-stream', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message,
                sessionId
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Errore di streaming');
        }
        //
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        while (true) {
            const {
                done,
                value
            } = await reader.read();
            if (done)
                break;

            buffer += decoder.decode(value, {
                stream: true
            });

            // Processa i chunk SSE
            const chunks = buffer.split('\n\n');
            buffer = chunks.pop() || '';

            for (const chunk of chunks) {
                //		console.log("chunk", chunk);
                const[eventLine, dataLine] = chunk.split('\n');
                const event = eventLine.replace('event: ', '');
                const data = JSON.parse(dataLine.replace('data: ', ''));

                switch (event) {
                case 'reasoning':
                    if (data.chunk)
                        onReasoning(data.chunk);
                    break;
                case 'answer':
                    break;
                case 'final':
                    return {
                        data
                    };
                case 'error':
                    throw new Error("chunk " + event + " unexpected");
                }
            }
        }
        throw new Error('Stream interrotto');
    } catch (error) {
        console.error("Errore in ai_proxy.proxyCallStream():", error);
        return {
            success: false,
            error: "Internal error: see console"
        };
    }
}

// for debug only
function createFileObjectFromText(textContent, filename, mimeType = 'text/plain') {
    const blob = new Blob([textContent], {
        type: mimeType
    });
    return new File([blob], filename, {
        type: mimeType
    });
}
// for debug only
async function doTest(idx) {
    var result = "BAD: default";
    switch (idx) {
    case 1: // updateConfig
        result = await updateConfig({});
        console.log("1.A: Update OK? (see console) ", result);
        result = await updateConfig({
            pippo: "ok: Pippo added!"
        });
        console.log("1.B: Pippo in config? (see console) ", result);
        result = await updateConfig("bad config");
        console.log("1.C: ERROR - (see console) ", result);
        break;

    case 2: // proxyGetHistory
        // dopo start server, almeno 4 messaggi, il #2 può essere tool
        result = await proxyGetHistory(1, sessionId);
        console.log("2.A: Query #1 (see console) ", result);
        result = await proxyGetHistory(3, sessionId);
        console.log("2.A: Query #3 (see console) ", result);
        result = await proxyGetHistory(100, sessionId);
        console.log("2.A: Query #100 - last (see console) ", result);
        break;

    case 3: // proxyForgetHistory
        // enable test echo in AIserver.
        // dopo start server, almeno 3 messaggi
        result = await proxyForgetHistory(1, sessionId);
        console.log("3.A: limit 1 (see console) ", result);
        result = await proxyForgetHistory(2, sessionId);
        console.log("3.B: limit 2 (see console) ", result);
        result = await proxyForgetHistory(1000, sessionId);
        console.log("3.C: limit 1000 (see console) ", result);
        result = await proxyForgetHistory('bad', sessionId);
        console.log("3.D: limit 'bad' (see console) ", result);
        break;
    case 4: // proxyResetHistory
        // enable test echo in AIserver.
        // dopo start server, almeno 3 messaggi
        result = await proxyResetHistory(sessionId);
        console.log("4.A: Reset History (see console) ", result);
        break;
    case 5: // proxyAddContext
        // verificare inviando una domanda alla AI (con trace)
        result = await proxyAddContext("per test: aggiungi 'letto contesto' a tutte le risposte", "textcontext", sessionId);
        console.log("5.A: Add buffer context ", result);

        const testFile = createFileObjectFromText("per test: aggiungi 'letto file-context' a tutte le risposte", "provafile.txt");
        result = await proxyFileToContext(testFile, sessionId);
        console.log("5.B: Add file context ", result);
        break;

    } //  case
}
