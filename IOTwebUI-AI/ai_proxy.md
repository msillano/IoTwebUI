# Documentazione Tecnica di `ai_proxy.js`

Questa documentazione descrive la libreria JavaScript `ai_proxy.js`, che fornisce un'interfaccia semplificata per comunicare con il server locale `ai_server`. Le funzioni in questa libreria sono asincrone e restituiscono Promises per gestire le operazioni non bloccanti.

## Funzioni Pubbliche

### `async function updateConfig(configuration)`

- **Descrizione:** Aggiorna la configurazione globale del server `ai_server`.
- **Parametri:**
  - `{object} configuration`: Oggetto contenente la nuova configurazione da applicare al server. La struttura di questo oggetto dipende dalla configurazione supportata dal `ai_server`.
- **Ritorna:**
  - `{Promise<boolean>}`: Una Promise che risolve con `true` se la configurazione è stata aggiornata con successo dal server, e `false` in caso di errore nella comunicazione o se il server riporta un fallimento.

### `async function proxyGetHistory(responseID, sessionId)`

- **Descrizione:** Recupera la cronologia delle conversazioni per una specifica sessione utente.
- **Parametri:**
  - `{string} responseID`: ID della risposta specifica da cui iniziare a recuperare la cronologia. Può essere `null` o una stringa vuota se si desidera recuperare la cronologia completa o la cronologia più recente.
  - `{string} sessionId`: L'identificatore univoco della sessione utente per cui si desidera recuperare la cronologia.
- **Ritorna:**
  - `{Promise<Array<object>|null>}`: Una Promise che risolve con un array di oggetti. Ogni oggetto rappresenta un messaggio nella cronologia della conversazione. La struttura di questi oggetti dipende da come il `ai_server` memorizza la cronologia (es. `{ role: 'user', content: '...' }`). Risolve con `null` se si verifica un errore nella comunicazione con il server o se non viene trovata alcuna cronologia per la `sessionId` specificata.

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
