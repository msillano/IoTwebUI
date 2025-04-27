/**
 * Js function required by IOTwbUIAI.html: a standard chatbot interface for AI.
 * @file IOTwbUIAI.js
 * @description This file is part of IoTwebUI-AI project (https://github.com/msillano/IoTwebUI)
 * @dependencies:  ai_frmat.js, ai_proxy.js
 * @version 1.0
 * @license MIT
 * @author Marco Sillano
 * @created 01/04/2025
 * @lastModified 05/04/2025
 * (C)2025 marco.sillano@gmail.com
 */
// ==================== STARTUP


function atStartupInit(){
    init_ai_proxy();
    setTimeout(init_SimpleMenu, 50);  // updates menu after aiConfig
}	

// setTimeout(atStartupInit, 20);

// ==================================== UI Event Handlers

/**
 * Handles Enter key for message submission (Shift+Enter allows newlines)
 * @listens document#keypress
 */
function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}


// ====================== CALLBACK function for chatbot UI


/**
 * Deletes full session History from server
 * Session context is preserved
 */
async function resetHistory() {
    const result = await proxyResetHistory(sessionId);
    addMessageReply("Chatbot", result.reply);
}


async function cutHistory() {
	const limit = trovaUltimoIndiceVisibile();
	if (!limit) return;
    const result = await  proxyForgetHistory(limit-1, sessionId);
    addMessageReply("Server", "Cut history:  inizia da #" + limit);
	   // Visual feedback
    const btn = document.getElementById('cutHistory');
    btn.textContent = '✓';
    btn.style.backgroundColor = '   #2E7D32   ';
    setTimeout(() => {
        btn.textContent = 'Cut History';
        btn.style.backgroundColor = '#4CAF50';
    }, 2000);
}
/**
 * Uploads context file to server
 * Input from UI 'fileInput', result: stored in storage 
 * and added as context to all next messages
 * @async
 */
async function addContext() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) {
        alert('Seleziona un file di testo!');
        return;
    }
    const result = await proxyFileToContext(file, sessionId);
    addMessageReply("Server", result.reply);
}


// ======  floating-button: copy to clipboard last visiblr chat
/**
 * Trova l'ULTIMO elemento <div> figlio diretto di un contenitore
 * che è almeno parzialmente visibile all'interno dell'area di scroll
 * del contenitore stesso.
 *
 * @param {string} containerId L'ID dell'elemento contenitore scrollabile.
 * @returns {HTMLElement|null} L'ultimo elemento <div> figlio visibile,
 * o null se nessuno è visibile, il contenitore non esiste,
 * o non ha figli DIV.
 */
function trovaUltimaDivVisibile() {
    const container = document.getElementById("chat-container");
    // 1. Controlla se il contenitore esiste
    if (!container) {
        console.error(`Errore: Contenitore con ID "${containerId}" non trovato.`);
        return null;
    }
    // 2. Ottieni le coordinate dell'area visibile del contenitore
    const containerRect = container.getBoundingClientRect();
    // 3. Itera sui figli diretti del contenitore, PARTENDO DALL'ULTIMO
    const children = container.children;
    for (let i = children.length - 1; i >= 0; i--) { // <-- La modifica chiave è qui!
        const child = children[i];
        // 4. Assicurati che il figlio sia un DIV
        if (child.tagName !== 'DIV') {
            continue;
        }
        // 5. Ottieni le coordinate del figlio
        const childRect = child.getBoundingClientRect();
        // 6. Controlla la visibilità verticale (stessa logica di prima)
        const isVerticallyVisible =
            childRect.top < containerRect.bottom && childRect.bottom > containerRect.top;
        // Dato che stiamo iterando all'indietro, il primo che troviamo è l'ultimo visibile.
        // if (isVerticallyVisible && isHorizontallyVisible) {
        if (isVerticallyVisible) {
            return child; // Trovato l'ultimo DIV visibile
        }
    }
    // 9. Se il ciclo termina, nessun DIV figlio visibile è stato trovato
    return null;
}

function trovaUltimoIndiceVisibile() {
	const lastMsg = trovaUltimaDivVisibile();
    if (!lastMsg) return 0;
    var anode = lastMsg.querySelector('span.indx');
    if (!anode) 
			anode = lastMsg. previousSibling?.querySelector('span.indx');
    if (!anode) return 0;
    const idx = Number(anode.textContent);
    return idx;
}

/**
 * Handles copy button click: 
 * - Normal: Copies raw server response
 * - Shift+click: Copies rendered code blocks
 * @listens #copy-btn.click
 */
document.getElementById('copy-btn').addEventListener('click', (e) => {
    if (!e.shiftKey) {
        // no shift: copy all unprocessed from proxy server
        const lastMsg = trovaUltimaDivVisibile();
        if (!lastMsg)
            return;
        const anode = lastMsg.querySelector('span.indx');
        if (!anode)
            return;
        const idx = Number(anode.textContent);
        if (!idx)
            return;
        setTimeout(async() => {
            const data = await proxyGetHistory(idx, sessionId);
            navigator.clipboard.writeText(data.answer);
        }, 200);
    } else {
        // shift: copy only code, processed from screen
        const lastMsg = trovaUltimaDivVisibile();
        if (!lastMsg)
            return;
        var outCode = "";
        lastMsg.querySelectorAll('.code-container').forEach(nodeCode => {
            outCode += nodeCode.textContent + "\n\n";
        });
        if (outCode == "")
            return;
        navigator.clipboard.writeText(outCode)
    }
    // Feedback visivo temporaneo
    const btn = document.getElementById('copy-btn');
    btn.textContent = '✓';
    btn.style.backgroundColor = '#2E7D32';

    setTimeout(() => {
        btn.textContent = '⎘';
        btn.style.backgroundColor = '#4CAF50';
    }, 2000);
});


// ============================================= CHAT MESSAGES PROCESSING
/**
 * Simple visualization entrypoint: appends  reasonning as block
 *  output HTML: Upddates DOM directly
 **/
function addMessage(message) {
    //   		console.log("addMessage: ", message);
    // append to DOM
    const chatContainer = document.getElementById('chat-container');
    const reason = document.createElement('div');
    reason.id = "reasoning"; // <--- Usa ID invece della classe
    reason.style.color = '#666';
    reason.style.fontStyle = 'italic';
    reason.innerHTML = message.replace(/\n/g, '<br>') ;
    chatContainer.appendChild(reason );
	const mainContainer =document.getElementById('main');
    mainContainer.scrollTop = mainContainer.scrollHeight;
}
/**
 * Main chat visualization entrypoint: appends a message fron a sender,
 *  input markdown, processes markdown + mermaid!
 *  output HTML: Upddates DOM directly
 **/
function addMessageReply(sender, message, delay = null) {
 //	console.log("addMessageReply", sender, message, delay);
    const chatContainer = document.getElementById('chat-container');
    chatContainer.appendChild(toHTML(sender, message, delay));
    const mainContainer = document.getElementById('main');
    mainContainer.scrollTop = mainContainer.scrollHeight;
}

// ============================================= CHAT MESSAGES TX-RX
var lastMsgId = -1;

/**
MAIN 'send' action: Gets the user input from the UI textarea, sends it to openAI
Add the response to the chat container (uses addMessage).
 */
async function sendMessage() {
    if (aiConfig.emableStremMode)
        await sendMessageStream();
    else
        await sendMessageBlock();
}

async function sendMessageBlock() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    if (!message)
        return;
    addMessageReply("<span class='question'>" + (lastMsgId > 0? lastMsgId:'') + "</span> - User", message);
    userInput.value = '';
    userInput.style.height = 'auto';
    //  messaggio: chiamata a proxy
    const data = await proxyCallOpenai(message, sessionId);
    //	console.log (" POST: data ", data);
    if (data.reasoning)
        addMessage(data.reasoning + '<br>');
    addMessageReply("<span class='indx'>" + data.responseId + "</span> - " + data.model, data.reply, data.delay);
	lastMsgId = data.responseId + 1;
    if (data.usage)
         console.log("Usage: ", data.usage);
}

async function sendMessageStream() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    if (!message)
        return;
    addMessageReply("User", message);
    userInput.value = '';
    userInput.style.height = 'auto';
    //  messaggio: chiamata a proxy
    const chatContainer = document.getElementById('chat-container');
    const reason = document.createElement('div')
        reason.id = "reasoning"; // <--- Usa ID invece della classe
    reason.style.color = '#666';
    reason.style.fontStyle = 'italic';
    chatContainer.appendChild(reason)

    const data = await proxyCallStream(message, sessionId,
            (reasoning) => {
            // Aggiorna sezione ragionamento
            //  console.log("Reason_block", reasoning);
            reason.innerHTML += reasoning;
            chatContainer.scrollTop = chatContainer.scrollHeight;
        },
            (answer) => {
            // nothing to do
        })
        reason.innerHTML += '<br>';
    addMessageReply("<span class='indx'>" + data.data.responseId + "</span> - " + data.data.model, data.data.reply);
}


