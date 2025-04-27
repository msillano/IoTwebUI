/*
Prende sessionID dai parametri dell'URL (xxx?sessionId=yyyy)oppure la genera,
Disponibile nella var globale sessionId
 */
 /**
 * Utility function: creates/handles sessionid in mani HTML pages using URL 
 * @file ai_session.js
 * @description This file is part of IoTwebUI-AI project (https://github.com/msillano/IoTwebUI)
 * @version 1.0
 * @license MIT
 * @author Marco Sillano
 * @created 01/04/2025
 * @lastModified 05/04/2025
 * (C)2025 marco.sillano@gmail.com
 */

// utility
function generaSessionId() {
    return crypto.randomUUID();
}
/**
 * Eseguita allo startup, questa funzione legge la sessione dall'URL (http://xxxx?sessionId=ABCDEFG 
 * @param {sessionId} SesssionID
 * @use Inserire il file nella pagina HTML.
 * @returns nothing; message in console
 */
function getSessionId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const oldID = urlParams.get('sessionId') || null;
    return oldID;
}
//
const sessionId = getSessionId() || generaSessionId();
console.log("sessionID: " + sessionId);
