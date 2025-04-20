# `ai_proxy.js`

Questa documentazione descrive la libreria JavaScript `ai_proxy.js`, che fornisce _la principale astrazione per comunicare, via server locale `ai_server`, con OpenAI._ <br>
Le aree gestite da `ai_proxy + ai_server` sono le seguenti: 
- configurazione base, indipendente dalla sessione
- gestione di più sessioni concorrenti (più interfacce: ai_server e configurazione sono globali)
- storage e gestione dei dialoghi precedenti con l'AI, da inviare come `history`  ad ogni conversazione (`role` = 'assistant'|'user'|'tool')
- storage e gestione dei documenti da inviare all'AI come `context` ad ogni conversazione (`role` = 'system')
- gestione completa di una conversazione, sia in `block mode` che in `stream mode`  (`role` = 'assistant'|'user')
- definizione ed esecuzione via REST dei TOOL di integrazione con **IoTwebUI**  (`role` = 'tool')

_L'obiettivo di questa interfaccia è quella di abilitare la costruzione di chatbot custom,  offrendo accesso semplice e robusto ai servizi AI, con limitazioni minime._

**risultati e gestione errori**<br>
Le funzioni in questa libreria sono asincrone e restituiscono Promises per gestire le operazioni in modo non bloccante. Salvo poche poche eccezioni, tutte le funzioni tornano una promessa che risolve in una strutture contenente i seguenti campi:
   - `success: false`: in caso di errore, è presente solo il campo `error` con un messaggio (dettagli in console)
   - `success: true`: nessun errore 
   - `found`:  opzionale - indica un fallimento possibile, e.g. cancellazione di un `context` non esistente
   - `query`:  opzionale - una stringa per UI: o inviata come 'message' nella richiesta, o creata ad hoc da ai_proxy.
   -  altri dati specifici della funzione chiamata.

## Funzioni Pubbliche

### `async function updateConfig(configuration)`

- **Descrizione:** Aggiorna la configurazione globale, indipendente dalla sessione. <br>Se necessario riavvia automaticamente OpenAI.<br>
 Inoltre sincronizza le due copie di 'aiConfig': quella del server (default, definita in `server02.js`) e la sua copia nel client (in `ai_proxy.js`). E' eseguita automaticamente all'avvio, per avere la sincronizzazione iniziale, e successivamente, ad ogni richiesta utente.<br>
 La struttura (estensibile) di default è la seguente (definita in `server02.js`):
```javascript
 *   provider:'deepseek',                      // 'openai' o altri
 *   baseURL: 'https://api.deepseek.com',      // dipende dal provider
 *   apiKey:  'sk-*************2876754fe',     // default from PC environment, OPENAI_API_KEY 
 *   model:   'deepseek-chat',                 // 'deepseek-code'...
 *   temperature: 0.7,                         // parametro per AI
 *   max_tokens: 3000,                         // parametro per AI
 *   timeoutAi: 90,                            // per server02, chiamata ad AI, in secondi
 *   emableStremMode: false                    // block mode / stream mode
 *   enableTuyaTools: true,                    // Attiva/disattiva i tool Tuya (richiesto da alcuni model)
```

**_note: Temperature_**<br>
 _Parametro che controlla la "creatività" o la "casualità" della risposta generata dal modello._
   - Generazione di codice: 0 - 0.2. Per un codice funzionante e preciso, non divagazioni creative.
   - Traduzione: 0 - 0.3. L'accuratezza è fondamentale.
   - Risposte a domande fattuali: 0 - 0.4. Per la risposta più corretta e diretta.
   - Riassunti: 0.2 - 0.5. Un po' di flessibilità per riformulare, ma mantenendo la coerenza.
   - Scrittura creativa (storie, poesie): 0.7 - 1. Incoraggia la creatività e l'originalità.
   - Brainstorming: 0.6 - 0.9. Utile per esplorare diverse idee e prospettive.
   - Conversazioni informali: 0.5 - 0.8. Un buon equilibrio tra coerenza e spontaneità.

**_note: max_tokens_** <br>
_Il numero massimo di "token" che la risposta del modello può generare._
   - Risposte brevi e dirette: 50 - 150 token.
   - Riassunti: 100 - 300 token (a seconda della lunghezza del testo originale).
   - Generazione di codice (snippet): 50 - 500 token (a seconda della complessità).
   - Scrittura creativa (frasi, brevi paragrafi): 100 - 500 token.
   - Conversazioni: 50 - 250 token per turno.
   - Generazione di articoli o storie più lunghe: 500 - 2000 o più token (tieni presente i costi).

- **Parametri:**
  - `{object} configuration`: Oggetto contenente la nuova configurazione da applicare al server. Può essere incompleta e contenere solo uno o due valori nuovi. Estensibile: accetta qualsiasi valore.
- **Ritorna:**
  - `{Promise<boolean>}`: Promise che risolve in true, in caso di successo + echo in console della configurazione aggiornata.
  -  altrimenti false + ERROR in console + ALERT.
  -   nota: _In caso di server non funzionante, un popup (ALERT) avverte l'utente allo startup per controllare il server e ricaricare il chatbot._
   <hr>
## _History_

### `async function proxyGetHistory(responseID, sessionId)`

- **Descrizione:** Recupera una coppia query/answer delle conversazioni per una specifica sessione utente.
- **Parametri:**
  - `{string} responseID`: ID della risposta specifica: ritorna la prima coppia  query/answer con indice uguale o minore a responseID.
  - `{string} sessionId`: L'identificatore univoco della sessione utente per cui si desidera recuperare la cronologia.
- **Ritorna:**
  - `{Promise<object>}`: Una Promise che risolve con una coppia query/answer:
  ```javascript
  {   success: true|false                        // se false, si ha {succes, error}
        query: user_prompt                       // _tool messages_ are skipped
       answer: assistant_answer || tool_calls    // the _reasoning_ part is NOT stored in history
   responseID: <number>                          // index for this data: può essere < di responseID in input.
   }
  ```
 _nota: l'ID nella risposta può essere diverso dal valore in fornito input, e si riferisce all'answer trovata (query può avere un ID uguale o minore)._
  
### `async function proxyForgetHistory(limit, sessionId)`

- **Descrizione:** definisce la conversazione con cui inizia la History inviata all'AI. Le conversazioni NON sono cancellate, perciò si può varare a volontà, permettendo un buon controllo.<br> e.g. Far fare all'AI un riassunto di tutte le conversazioni, poi iniziare l'history dal riassunto, tralasciando tutte le risposte precedenti: aumenta la prontezza e si riducono i costi.
- **Parametri:**
  - `{number} limit`: L'indice del primo messaggio da inviare nella cronologia. 
    * Se maggiore dell'ultimo messaggio, azzera la History. 
    * Se è 0 o una stringa, non altera la situazione, ma ritorna nella risposta gli indici attuali.<br>
    _Nota: L'indice. che è visibile a video, è globale: cresce sempre, è azzerato solo da un restart del server02._
  - `{string} sessionId`: L'identificatore univoco della sessione utente da cui rimuovere la cronologia.
- **Ritorna:**
  - `{Promise<object>}`: Una Promise che risolve in una struttura con due indici:
   ```javascript
  {
          success: true|false           // se false, si ha {succes, error}
     currentStart: <number>             // indice della prima conversazione inviata all'AI        
      currentNext: <number>             // indice della prossima conversazione
  }
  ```

### `async function proxyResetHistory(sessionId)`

- **Descrizione:** Elimina (cancella) completamente la cronologia delle conversazioni per una specifica sessione utente.
- **Parametri:**
  - `{string} sessionId`: L'identificatore univoco della sessione utente di cui si desidera resettare la cronologia.
- **Ritorna:**
   - `{Promise<object>}`: Una Promise che risolve in una struttura con due indici:
   ```javascript
  {
          success: true|false           // se false, si ha {succes, error}
     currentStart: <number>             // indice della prima conversazione inviata alla AI     
      currentNext: <number>             // indice della prossima conversazione
  }
  ```
   <hr> 
## _Context_

### `async function proxyAddContext(payload, name, message, sessionId)`

- **Descrizione:** Low level, aggiunge incondizionatamente un buffer al contesto associato ad una sessione utente.
- **Parametri:**
  - `{string} payload`: buffer dati da salvare (text, markdown...).
  - `{string} name`:  nome unico, identificativo di payload.
  - `{string} message`: un messaggio per UI, ritorna  modificato (+' added')
  - `{string} sessionId`: l'identificatore univoco della sessione utente a cui aggiungere il contesto.
- **Ritorna:**
  - `{Promise<object>}`: Una Promise che risolve in una struttura:
   ```javascript
   {
          success: true|false           // se false, si ha {succes, error}
            reply: <string>             // il 'messaggio' fornito + ' added'
     storageCount: <number>             // totale
      enableCount: <number>             // attualmente in uso
   }
  ```
### `async function proxyFileToContext(file, message, sessionId)`

- **Descrizione:** Carica il contenuto di un oggetto `File` (tipicamente ottenuto da un input di tipo `file` in HTML) e lo aggiunge come contesto a una sessione utente. Agisce in due step: cvontrolla se il file esiste, e se esiste lo abilita. Altrimenti legge il file  e lo carica in storage!
- **Parametri:**
  - `{File} file`: L'oggetto `File` da leggere e inviare al server.
  - `{string} message`: Un messaggio opzionale (stringa) da associare al contenuto del file nel contesto.
  - `{string} sessionId`: L'identificatore univoco della sessione utente a cui aggiungere il contesto dal file.
- **Ritorna:**
- **Ritorna:**
  - `{Promise<object>}`: Una Promise che risolve in una struttura:
   ```javascript
   {
          success: true|false           // se false, si ha {succes, error}
            found: true|false           // solo se esistente
            reply: <string>             // il 'messaggio' fornito + ' added'
     storageCount: <number>             // totale
      enableCount: <number>             // attualmente in uso
   }
  ```

### `async function proxyExistsContext(name, sessionId)`

- **Descrizione:** Verifica se un file di contesto con un determinato nome esiste già per una specifica sessione utente. Se lo trova lo abilita.
- **Parametri:**
  - `{string} name`: Il nome del contesto da verificare.
  - `{string} sessionId`: L'identificatore univoco della sessione utente in cui cercare il file.
- **Ritorna:**
   - `{Promise<object>}`: Una Promise che risolve in una struttura:
   ```javascript
   {
          success: true|false           // se false, si ha {succes, error}
            found: true|false           // solo se trovato (e abilitato)
     storageCount: <number>             // totale
      enableCount: <number>             // attualmente in uso
   }
  ```
 ### `async function proxyDisableContext(name, sessionId)`

- **Descrizione:** Disabilita il documento identificato da '`nome`' nel contesto  per una specifica sessione utente. Se disabilitato rimane nello storage, ma non è inviato all'AI.<br>
 Per riabilitarlo usare  proxyExistsContext().
- **Parametri:**
  - `{string} name`: Il nome del contesto da verificare.
  - `{string} sessionId`: L'identificatore univoco della sessione utente in cui cercare il file.
- **Ritorna:**
   - `{Promise<object>}`: Una Promise che risolve in una struttura:
   ```javascript
   {
          success: true|false           // se false, si ha {succes, error}
            found: true|false           // solo se trovato (e disabilitato)
     storageCount: <number>             // totale
      enableCount: <number>             // attualmente in uso
   }
  ```
 ### `async function proxyClearContext( sessionId)`

- **Descrizione:** Elimina tutti i documenti nel contesto  per una specifica sessione utente. 
- **Parametri:**
  - `{string} sessionId`: L'identificatore univoco della sessione utente da distruggere.
- **Ritorna:**
   - `{Promise<object>}`: Una Promise che risolve in una struttura:
   ```javascript
   {
          success: true|false           // se false, si ha {succes, error}
     storageCount: <number>             // totale (i.e. 0)
      enableCount: <number>             // attualmente in uso (i.e. 0)
   }
  ```
   <hr>
## _Chat_

### `async function proxyCallOpenai(message, sessionId)`

- **Descrizione:** gestisce uno scambio query/reply con L'AI
   - Oltre al testo della query utente, invia all'AI automatiacamente l'History (precedenti messaggi) e i documenti di contesto (solo gli abilitati)
   - Risponde alla eventuali richeste di eseguire funzioni (tool Tuya) da parte dell'AI
   - Elabora la risposta dall'AI suddividendola in due parti: 'reasoning' (opzionale, usualmente solo presentata a video) ed 'reply'
   - aggiunge allo storage 'Historical' la query utente, la prima risposta dell'AI (solo reply oppure richiesta Tool), le risposte dei tool (opzionali), la richiesta utente 'relay' da protocollo dopo i tool, la risposta finale (solo reply - opzionale).
   - il timeout  è fissato a 60 secondi
     
- **Parametri:**
  - `{string} message`:  Il testo della domanda, usualmente inserita dall'utente nel chatbot
  - `{string} sessionId`: L'identificatore univoco della sessione utente 
- **Ritorna:**
   - `{Promise<object>}`: Una Promise che risolve in una struttura:
   ```javascript
   {
       success: true|false      // se false, si ha {succes, error}
         reply: <text>          //risposta (formato default: markdown + mermaid)
     reasoning: <text>|''       // ragionamento opzionale (formato default: HTML) 
         model:                 // come in config
    responseId:                 // ID progressivo univoco della risposta nello storage
         usage:                 // dati sul 'costo' (tokens) della conversazione (in console)
     }
  ```
### `async function proxyCallStream(message, sessionId, onReasoning, onAnswer) {

- **Descrizione:** Versione Stream di proxyCallOpenai() (a blocco). La logica e le prestazioni sono identiche, con la differenza che la comunicazione con OpenAI è a stream, protocollo SSE. Il risultato è maggior prontezza, anche se non è un modo supportata da tutti i modelli.
I chunck sono accumulati in buffer di `server02`, ed inviati alle funzioni di callback `onReasoning`, `onAnswer`...
    
- **Parametri:**
  - `{string} message`:    Il testo della domanda, usualmente inserita dall'utente nel chatbot
  - `{string} sessionId`:   L'identificatore univoco della sessione utente 
  - `{function} onReasoning`:   Callback per la visualizzazione di reasoning text (HTML)
  - `{function} onAnswer`:      Callback per la visualizzazione di reply text (markdown + mermaid) 
  ```
