# `ai_proxy.js`

Questa documentazione descrive la libreria JavaScript `ai_proxy.js`, che fornisce _la principale interfaccia per comunicare con il server locale `ai_server` ed OpenAI._ <br>
Le aree gestite da `server02 + ai_proxy` sono: 
- conigurazione base, indipendente dalla sessione
- storage e gestione dei documenti da inviare all'AI come `context` ad ogni conversazione
- storage e gestione dei dialoghi con l'AI, da inviare come `history`  ad ogni conversazione
- gestione completa di una conversazione, sia in `block mode` che in `stream mode`
- definizione ed esecuzione via REST dei TOOL di integrazione di con **IoTwebUI**
Le funzioni in questa libreria sono asincrone e restituiscono Promises per gestire le operazioni in modo non bloccante.<br>
**riusultati e gestione**<br>
Salvo poche poche eccezzioni, tutte le funzioni tornano una strutture che contien i segunti campi:
   - `success: false`: in caso di errore, ed è presente solo il campo `error` con un messagio (dattagli in console)
   - `success: true`: nessun errore 
   - `found`:  opzionale - indica un fallimento possibile, e.g. cancellazione di un `context` non esistente
   - `query`:  opzionale - una stringa per UI: o inviata come 'message' nella richiesta, o creata ad hoc da ai_proxy.
   -  altri dati specifici della funzione chiamata.

## Funzioni Pubbliche

### `async function updateConfig(configuration)`

- **Descrizione:** Aggiorna la configurazione globale, indipendente dalla sessione. <br>Se necessario riavvia automaticamente OpenAI.
 Inoltre sincronizza le due copie di 'aiConfig': quella del server (default, definita in `server02.js`) e la sua copia nel client (in `ai_proxy.js`). E' eseguita automaticamente all'avvio, per avere la sincronizzazione iniziale, e successivamente, ad ogni richiesta utente.<br>
 La struttura (estensibile) di default è la seguente (definita in `server02.js`):
```javascript
 *   provider:'deepseek',                      // 'openai' o altri
 *   baseURL: 'https://api.deepseek.com',      // dipende dal provider
 *   apiKey:  'sk-*************2876754fe',     // default from PC environment, OPENAI_API_KEY 
 *   model:   'deepseek-chat'                  // 'deepseek-code'...
 *   emableStremMode: false                    // block mode / stream mode
 *   enableTuyaTools: true,                    // Attiva/disattiva i tool Tuya (richiesto da alcuni model)
```
- **Parametri:**
  - `{object} configuration`: Oggetto contenente la nuova configurazione da applicare al server. Può essere incompleta e contenere solo uno o due valori nuovi. Estensibile: accetta qualsiasi valore.
- **Ritorna:**
  - `{Promise<boolean>}`: Promise che risolve con true, in caso di successo + echo in console della configurazione aggiornata.
  -  altrimenti false + ERROR in console + ALERT.
  -   nota: _In caso di server non funzionante, un popup (ALERT) avverte l'utente allo startup di controllare il server e di ricaricare il chatbot._ 

### `async function proxyGetHistory(responseID, sessionId)`

- **Descrizione:** Recupera una coppia query/answer delle conversazioni per una specifica sessione utente.
- **Parametri:**
  - `{string} responseID`: ID della risposta specifica: ritorna la prima coppia  query/answer con indice uguale o minore a responseID.
  - `{string} sessionId`: L'identificatore univoco della sessione utente per cui si desidera recuperare la cronologia.
- **Ritorna:**
  - `{Promise<object>|null>}`: Una Promise che risolve con una coppia query/answer:
  ```javascript
  {
        query: user_prompt                       // tool messages are skipped
       answer: assistant_answer || tool_calls    // the _reasoning_ part is NOT stored in history
   responseID: <number>                          // index for this data: può essere < di responseID in input.
   }
  ```
  
### `async function proxyForgetHistory(limit, sessionId)`

- **Descrizione:** definisce la conversazione con cui inizia la History inviata all'AI. Le conversazioni NON sono cancellate, perciò si può varare a volontà, permettendo un buon controllo. e.g. Far fare all'AI un riassunto di tutte le conversazioni, poi iniziare l'history dal riassunto, tralsciando tutte le risposte precedenti: aumenta la prontezza e si riducono i costi.
- **Parametri:**
  - `{number} limit`: L'indice del primo messaggio da inviare nella cronologia. 
    * Se maggiore dell'ultimo messaggio, azzera la History. 
    * Se è 0 o una stringa, non altera la situazione, ma ritorna nella risposta gli indici attuali.<br>
    _Nota: L'indice. che è visibile a video, non cambia al cambio sessione: cresce sempre, è azzerato solo da un restart del server02._
  - `{string} sessionId`: L'identificatore univoco della sessione utente da cui rimuovere la cronologia.
- **Ritorna:**
  - `{Promise<object>}`: Una Promise che risolve in una struttura con due indici:
   ```javascript
  {
          success: true|false         
     currentStart: <number>             // indice della prima conversazione nella History        
      currentNext: <number>             // indice della prossima conversazione

   }
  ```

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
