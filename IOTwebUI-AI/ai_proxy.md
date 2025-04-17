# Documentazione Tecnica di `ai_proxy.js`

Questa documentazione descrive la libreria JavaScript `ai_proxy.js`, che fornisce la principale interfaccia per comunicare con il server locale `ai_server` ed OpenAI. <br>
Le funzioni in questa libreria sono asincrone e restituiscono Promises per gestire le operazioni in modo non bloccante.

## Funzioni Pubbliche

### `async function updateConfig(configuration)`

- **Descrizione:** Aggiorna la configurazione globale. Se necessario riavvia automaticamente OpenAI.
 Inoltre sincronizza le due copie di 'aiConfig': quella del server (default, definita in `server02.js`) e la sua copia nel client. E' eseguita automaticamente all'avvio, per avere una sincronizzazione iniziale.<br>
 La struttura di default è la seguente (definita in `server02.js`):
```
 *   provider:'deepseek',                      // 'openai' o altri
 *   baseURL: 'https://api.deepseek.com',      // dipende dal provider
 *   apiKey:  'sk-*************2876754fe',     // default from PC environment, OPENAI_API_KEY 
 *   model:   'deepseek-chat'                  // 'deepseek-code'...
 *   emableStremMode: false
 *   enableTuyaTools: true,                    // Attiva/disattiva i tool Tuya (richiesto da alcuni model)
```
- **Parametri:**
  - `{object} configuration`: Oggetto contenente la nuova configurazione da applicare al server. Può essere incompleta e contenere solo uno o due valori nuovi. Estensibile: accetta qualsiasi valore.
- **Ritorna:**
  - `{Promise<boolean>}`: Promise che risolve con true, in caso di successo + echo in console della configurazione aggiornata.
  -  altrimenti false + ERROR in console + ALERT.
  -   nota:_In caso di server non funzionante, un popup (ALERT) avverte l'utente di controllare il server e di ricaricare il chatbot._ 

### `async function proxyGetHistory(responseID, sessionId)`

- **Descrizione:** Recupera una coppia query/answer delle conversazioni per una specifica sessione utente.
- **Parametri:**
  - `{string} responseID`: ID della risposta specifica: ritorna la prima coppia  query/answer con indice uguale o minore a responseID.
  - `{string} sessionId`: L'identificatore univoco della sessione utente per cui si desidera recuperare la cronologia.
- **Ritorna:**
  - `{Promise<Array<object>|null>}`: Una Promise che risolve con una coppia query/answer come modello.
  ```js
  {
        query: user_prompt                       // tool messages are skipped
       answer: assistant_answer || tool_calls    // the _reasoning_ part is NOT stored in history
   responseID: <number>                          // index for this data: può essere < di responseID in input.
   }
 ```

### `async function proxyForgetHistory(limit, sessionId)`

- **Descrizione:** Rimuove un certo numero di messaggi più vecchi dalla cronologia di una sessione utente.
- **Parametri:**
  - `{number} limit`: Il numero di messaggi più vecchi da eliminare dalla cronologia.
  - `{string} sessionId`: L'identificatore univoco della sessione utente da cui rimuovere la cronologia.
- **Ritorna:**
  - `{Promise<boolean>}`: Una Promise che risolve con `true` se i messaggi sono stati rimossi con successo dalla cronologia della sessione, e `false` in caso di errore nella comunicazione con il server.

### `async function proxyResetHistory(sessionId)`

- **Descrizione:** Elimina completamente la cronologia delle conversazioni per una specifica sessione utente.
- **Parametri:**
  - `{string} sessionId`: L'identificatore univoco della sessione utente di cui si desidera resettare la cronologia.
- **Ritorna:**
  - `{Promise<boolean>}`: Una Promise che risolve con `true` se la cronologia della sessione è stata eliminata con successo, e `false` in caso di errore nella comunicazione con il server.

### `async function proxyAddContext(store, message, sessionId)`

- **Descrizione:** Aggiunge un messaggio di contesto a uno specifico store di contesto associato a una sessione utente.
- **Parametri:**
  - `{string} store`: Il nome dello store di contesto in cui aggiungere il messaggio (definito sul lato server).
  - `{string} message`: Il messaggio di contesto (stringa) da aggiungere.
  - `{string} sessionId`: L'identificatore univoco della sessione utente a cui aggiungere il contesto.
- **Ritorna:**
  - `{Promise<boolean>}`: Una Promise che risolve con `true` se il messaggio di contesto è stato aggiunto con successo allo store per la sessione, e `false` in caso di errore nella comunicazione con il server.

### `async function proxyFileToContext(file, message, sessionId)`

- **Descrizione:** Carica il contenuto di un oggetto `File` (tipicamente ottenuto da un input di tipo `file` in HTML) e lo aggiunge come contesto a una sessione utente.
- **Parametri:**
  - `{File} file`: L'oggetto `File` da leggere e inviare al server.
  - `{string} message`: Un messaggio opzionale (stringa) da associare al contenuto del file nel contesto.
  - `{string} sessionId`: L'identificatore univoco della sessione utente a cui aggiungere il contesto dal file.
- **Ritorna:**
  - `{Promise<boolean>}`: Una Promise che risolve con `true` se il file è stato caricato e il suo contenuto aggiunto come contesto con successo per la sessione, e `false` in caso di errore (es. errore di lettura del file, errore di comunicazione con il server).

### `async function proxyExistsContextFile(filename, sessionId)`

- **Descrizione:** Verifica se un file di contesto con un determinato nome esiste già per una specifica sessione utente.
- **Parametri:**
  - `{string} filename`: Il nome del file di contesto da verificare.
  - `{string} sessionId`: L'identificatore univoco della sessione utente in cui cercare il file.
- **Ritorna:**
  - `{Promise<boolean>}`: Una Promise che risolve con `true`****
