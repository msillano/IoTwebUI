### **IOTrest: Un ponte REST per i tuoi dispositivi Tuya**

#### **Introduzione**

**IOTrest** è un'estensione per **IoTwebUI** 2.2 che trasforma i tuoi dispositivi Tuya in _**servizi web** accessibili tramite semplici richieste HTTP_. Oltre a consentire la lettura dei dati dei tuoi dispositivi, IOTrest ti permette di interagire con essi in modo avanzato, attivando scene, regole e ricevendo avvisi in tempo reale.

#### **Funzionalità principali**

* **Accesso ai dati:** Leggi i valori attuali dei sensori (temperatura, umidità, ecc.) e lo stato degli attuatori (luci, prese, ecc.).
* **Automazione:** Invia richieste REST per attivare scene e regole preconfigurate in IoTwebUI e Tuya Smart/SmartLife.
* **Avvisi:** Verifica gli avvisi in tempo reale per gli eventi che si verificano sui tuoi dispositivi (allarmi, cambi di stato, ecc.).
* **Semplicità d'uso:** Interfaccia REST intuitiva e ben documentata. I risultati sono in formato testo oppure array od oggetti js.
* **Flessibilità:** Personalizza le tue interazioni con i dispositivi grazie alle numerose opzioni di configurazione.

#### **Architettura**
![](https://github.com/msillano/IoTwebUI/blob/main/pics/rest01.png?raw=true)

_Una WEBAPP (come IOTwebUI) non può contenere un server HTPP, per cui IOTrest (un server REST-HTPP) è un'applicazione autonoma in nodejs, che comunica via websocket (il metodo più rapido) con IOTwebUI._

IOTrest si integra perfettamente con IoTwebUI e sfrutta le sue potenti funzionalità di gestione dei dispositivi Tuya. Le richieste REST-HTTP inviate a IOTrest vengono tradotte in comandi per IoTwebUI, che a sua volta interagisce con Tuya Cloud.<br>
Il tempo di latenza (ritardo) medio tra un evento e la sua segnalazione in un cliente WEB che usa IOTrest è la somma di 3 fattori: 0.5*(tempo tra due misure del device in Tuya Cloud) + 0.5*(intervallo di polling di IOTwebUI) + 0.5*(intervallo tra due richieste REST del client WEB). Valori  tipici: 3', 2', 30"  => latenza media 2'65"

#### **Installazione e configurazione**

1. **Prerequisiti:**
   * Node.js installato sul tuo sistema.
       * Window, Linux, macOS: vedi [nodejs-installer](https://nodejs.org/en/download/prebuilt-installer).
       * Android: vedi [node-red in Android](https://nodered.org/docs/getting-started/android), fermandosi SENZA installare _node-red_, cioè non eseguendo il comando:  `npm i -g --unsafe-perm node-red`<br>
         Oppure se si vuole installare un server Android 24/7, con vari tool (FTP, DB Maria, Apache, Autostart, etc...) vedi qui: [deployment Android](https://github.com/msillano/tuyaDAEMON/wiki/80.-deployment:-android-server#2022-update)  
   * IoTwebUI ver. 2.2 o superiore, configurato e funzionante: vedi https://github.com/msillano/IoTwebUI, versione 2.2 o superiore.
2. **Installazione:**
   * Aggiorna il path della tua installazione nel file `install_server.bat`
   * Clikka su `install_server.bat`: installerà le dipendenze aggiornate nell dir 'node_modules'. 
3. **Configurazione:**
   * Aggiorna il path della tua installazione nel file `run_server.bat`
      
4. **Test e debug**
   Sono presenti tre file principali:
   * `server.js`: il file eseguibile con l'implementazione di IOTrest, da installare.
   * `MockIOTweb.html`: una WEBAPP (si deve aprire in un browser) che può sostituire IOTwebUI: il funzionamento del _websocket_ è identico, solo che i dati utilizzati NON vengono dal 'Cloud' ma sono fittizzi.
   * `client.html`: un'altra WEBAPP con funzione di _client REST per test_: permette di inviare a `IOTwebUI` ogni richiesta possibile, e di vederne la risposta.
     
Quindi l'insieme dei tre file è autosufficiente, non richiede `IOTwebUI`, e può essere usato come test. Quando tutto funziona come si deve, si chiude  **MockIOTweb** e si apre **IOTwebUI** e inizia il funzionamento con i device Tuya reali.<br>

client.html può essere usato fino a quando non si hanno uno o più client REST su misura (applicazioni od interfacce utente). Se si vogliono realizzare interfacce WEB, il codice HTML/javascript di `client.html` può servire da modello.

#### **Utilizzo**

4.  **Run**
   1.  Avviare prima `server.js`con `run_server.bat`: se OK appare il messaggio "Server HAPI running on http://localhost:3031"
   2.  Iconizzare il terminale. Apritelo per vedere i messaggi in caso di errore. Chiderlo al termine dell'uso.
   3. caricare/ricaricare `IOTwebUI` nel browser, con "run_me.bat". Se OK appare un pop-up che informa dell'avvenuto collegamento
   4. Usare IOTwebUI normalmente. Per accedere al REST usare o applicazioni/intefacce custom, oppure 'client.html' (anche più di uno).

nota: se non utilizzate il REST, lanciare normalmente **IOTwebUI** (con "run_me.bat" o direttamente): funzionerà perfettamente (senza pop-up iniziale di conferma di collegamento).

**Esempi di richieste:**
```
Richiesta di un valore:
  http://tuo_server/IOTrest/Temperatura soggiorno/va_humidity
```

**Risposta:** 

```
  44    (in 5.199999988079071 ms)
```

```
Richiesta dello stato:
  http://tuo_server/IOTrest/Temperatura soggiorno/dstatus
```

**Risposta:** 

```
js object:
{  "name":"Temperatura soggiorno",
   "online":true,
   "status":[{"code":"va_humidity","value":58},
             {"code":"va_battery","value":0},
             {"code":"va_temperature","value":32}]
} (in 4.199999988079071 ms)
```
**Errori:**

TX: device/Temperatura soggiorno/_va\_humidit_ => **unk** (in 4.699999988079071 ms)

TX: device/_Temperatura soggiorn_/va\_humidity  =>  **unk** (in 4.9000000059604645 ms)

TX: device/Temperatura soggiorno/  =>  **err** (in 4.899999976158142 ms)


note: 
- Se il path contiene '`list`' o '`dstatus`' oppure '`dinfo`', la risposta è un oggetto Js (anche in caso di errore), altrimenti la risposta è in puro testo (vedi esempi). 
- I dati sono come provengono da Tuya Cloud: possono aver bisogno di decodifica o di scaling (e.g. `'temp_current', value: 284` => 28.4 °C). In IOTwebUI scaling o decodifiche possono essere aggiunti come customizzazione, ma solo per la sua interfaccia utente, NON per il REST.
- **unk** o **[unk]** in caso di nomi errati o non trovati (errori di scrittura).
- **err** o **[err]** in caso di parti di path mancanti (errore di sintassi).
- I tempi indicati sono i minimi richiesti dalle comunicazioni: possono aumentare in concomitanza di altre attivita di IOTwebUI (accesso al Cloud, scrittura file, etc..).
- i device dono individuati dal nome o dall'ID: usando l'ID si è indipendenti dal nome che potete cambiare liberamente.

#### dizionario REST
generale: `http://localhost:3031/IOTrest/` + path <br>
path:
*  **device/list[/_home_[/_room_]]** (device/list, device/list/CASA,  device/list/CASA/stanza da pranzo) 
*  **device/_dev-name_|_dev-id_/dinfo|dstatus|_property_** (device/luce01/switch, device/luce01/dinfo, device/luce01/dstatus ) 
*  **alert/list/_dev-name_|_dev-id_** (alert/list/luce01)
*  **scene/list[/_room_]**  (scene/list, scene/list/CASA)
*  **rule/list**  (rule/list)
*  **execute/_scene-name_|_rule-name_** (execute/chiamata Pippo)

#### **Considerazioni importanti**

* **Sicurezza:** Per motivi di sicurezza, si consiglia di eseguire _IOTrest_ su una rete locale e di non esporlo direttamente a Internet.
* **Affidabilità:** _IOTrest_ e _IOTwebUI_ accedono  a Tuya Cloud solo in lettura. **In NESSUN CASO i dati Tuya possono essere alterati.**
* **Limiti:** Le prestazioni di _IOTrest_ dipendono dalle risorse hardware del tuo sistema e dal numero di dispositivi Tuya connessi. L'uso di WEBsocket rende _IOTrest_ molto veloce. Round Trip Time 5-6 ms.
* **Supporto:** _IOTrest_ supporta tutti i dispositivi Tuya compatibili: i dati principali disponibili in Tuya Cloud sono accessibili.
* **Errori:** _IOTrest_ gestisce gli errori in modo robusto, fornendo messaggi di errore demplici e chiari.

#### **Conclusioni**

**IOTrest** è lo strumento ideale per chi desidera creare rapidamente soluzioni personalizzate per la gestione dei propri dispositivi Tuya. Grazie alla sua flessibilità e alla sua facilità d'uso, TuyaREST ti permette ineguagliabili automatizioni per le tue attività domestiche e di creare esperienze utente uniche.


