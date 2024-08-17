### **IOTrest: Un ponte REST per i tuoi dispositivi Tuya**

#### **Introduzione**

**IOTrest** è un'estensione opzionale per **IoTwebUI** 2.2 che trasforma i tuoi dispositivi Tuya in _**servizi web** accessibili tramite semplici richieste HTTP_. Oltre a consentire la lettura dei dati dei tuoi dispositivi, IOTrest ti permette di interagire con essi in modo avanzato, attivando scene, regole e ricevendo avvisi in tempo reale.

#### **Funzionalità principali**

* **Accesso ai dati:** Leggi i valori attuali dei sensori (temperatura, umidità, ecc.) e lo stato degli attuatori (luci, prese, ecc.).
* **Automazione:** Invia richieste REST per attivare scene e regole preconfigurate in IoTwebUI e Tuya Smart/SmartLife.
* **Avvisi:** Verifica gli avvisi in tempo reale per gli eventi che si verificano sui tuoi dispositivi (allarmi, cambi di stato, ecc.).
* **Semplicità d'uso:** Interfaccia REST intuitiva e ben documentata. I risultati sono in formato testo oppure array od oggetti js.

**NB:** _Se non vi interessa utilizzare la funzione di REST, ignorate completamente 'installazione e configurazione', potrete farla in un secondo tempo. **IoTwebUI 2.2** funzionerà perfettamente!_

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
   * `server.js`: il file eseguibile con l'implementazione di IOTrest, da lanciare in background.
   * `MockIOTweb.html`: una WEBAPP (si deve aprire in un browser) che può sostituire `IOTwebUI`: il funzionamento del _websocket_ è identico, solo che i dati utilizzati NON vengono dal 'Cloud' ma sono fittizzi.
   * `client.html`: un'altra WEBAPP con funzione di _client REST per test_: permette di inviare a `IOTwebUI` ogni richiesta possibile, e di vederne la risposta.
     
Quindi l'insieme dei tre file è autosufficiente, non richiede `IOTwebUI`, e può essere usato come test. Quando tutto funziona come si deve, si chiude  **MockIOTweb** e si apre **IOTwebUI** e inizia il funzionamento con i device Tuya reali.<br>

client.html può essere usato fino a quando non si hanno uno o più client REST su misura (applicazioni od interfacce utente). Se si vogliono realizzare interfacce WEB, il codice HTML/javascript di `client.html` può servire da modello.

#### **Utilizzo**
   1.  Avviare prima `server.js`con `run_server.bat`: se OK appare il messaggio "Server HAPI running on http://localhost:3031"
   2.  Iconizzare il terminale. Potete riaprirlo in seguito per vedere i messaggi scambiati. Chiuderlo al termine dell'uso.
   3. caricare/ricaricare `IOTwebUI` nel browser, con "run_me.bat" oppure direttamente. Se OK appare immediatamente un pop-up che informa dell'avvenuto collegamento via websocket con il server. nota: il collegamento websocket avviene solo all'avvio di `IOTwebUI`.
   4. Usare `IOTwebUI` normalmente. Per accedere al REST usare o applicazioni/intefacce custom, oppure aprite 'client.html' nel browser (anche più di uno).

nota: se non utilizzate il REST, non eseguite `server.js`, ma solo lanciare normalmente **IOTwebUI** (con "run_me.bat" o direttamente): funzionerà perfettamente (senza il pop-up iniziale di conferma di collegamento).


#### dizionario REST
generale: `http://localhost:3031/IOTrest/` + path <br>
path:

*  **device/list[/_home_[/_room_]]** (e.g.: device/list,  device/list/ROMA,  device/list/ROMA/Studio) <br>
    Received (ROMA/Studio)
 ```
            {"home":"ROMA",
             "room":"Studio",
             "devices":["Termo studio",
                        "USBswitch",
                        "Zigbee Gateway"]} 
```
*  **device/_dev-name_|_dev-id_/dinfo|dstatus|_code_** (e.g.:device/Temperatura studio/va_temperature, device/Temperatura studio/dinfo, device/Termo studio/dstatus ) <br>

  Received (va_temperature)  `"30"`    (unico caso testo) <br>

  Received (dinfo) <br>
```
            {"name":"Temperatura studio",
             "id":"bf542e7c64b816977796bc",
             "product_name":"温湿度传感器",
             "model":null,
             "category":"wsdcg",
             "sub":true,
             "test":false}
```
 Received (dstatus)
```
            {"name":"Termo studio",
             "online":true,
             "status":{"switch":true,
                       "temp_current":306,
                       "temp_set":200}}
```
 note:<br>
    -  `dinfo.sub`  il device è un sub-device (i.e. usa un HUB)
    -  `dinfo.test` _estensione IOTwebUI_: `true` se esiste un allarme IOTwebUI collegato al device.<br>
    -  `dinfo.category` : codice corrispondente ad `isa` (nei pop-up, modo EXPERT)  _estensione IOTwebUI_.
        
*  **alert/list/_dev-name_|_dev-id_** ( e.g.: alert/list/Temperatura soggiorno)<br>
   Received
```
             {"name":"Temperatura soggiorno",
              "alarms":[
                     {"code":"va_humidity",
                      "trigger":true,
                      "condition":"grt",
                      "value":"40",
                      "message":"",
                      "action":["beep"]},
                       ]}
 ```
  note:<br>
      - `alarms[x].trigger` _estensione IOTwebUI_: `true` in caso di allarme attivo.<br>
      - `alarms[x].conditon` valori: "grt", "equ", "lst" per ">", "=", "<"
      - `alarms[x].action[y]` valori: "beep", "pop", "sound", "voice" (URL e SCENA/RULE: auto)

*  **scene/list[/_room_]**  (scene/list, scene/list/ROMA)<br>
      Received 
```
             {"home":"ROMA". 
              "scenes":[{"name":"ALARM OFF",
                         "status":"enable",
                         "running_mode":"cloud"},
                        {"name":"ALARM ON",
                         "status":"enable",
                         "running_mode":"cloud"},
                          ...}]
               }
```
*  **rule/list**  (e.g.: rule/list)<br>
      Received
   ```
                ["spegni luce",
                 "pippo",
                 "chiamata pippo"]
   ```

*  **execute/_scene-name_|_rule-name_** (e.g.: execute/chiamata pippo)<br>
      Received `done rule`

   
 **Errori:**

TX: device/Temperatura soggiorno/_va\_humidit_ => **unk** 

TX: device/_Temperatura soggiorn_/va\_humidity  =>  **unk**

TX: device/Temperatura soggiorno/  =>  **err** 

note: 
- Se il path contiene '`list`' o '`dstatus`' oppure '`dinfo`', la risposta è un oggetto Js (anche in caso di errore), altrimenti la risposta è in puro testo (vedi esempi). 
- I dati sono come provengono da Tuya Cloud: possono aver bisogno di decodifica o di scaling (e.g. `'temp_current', value: 284` => 28.4 °C). In IOTwebUI scaling o decodifiche possono essere aggiunti come customizzazione, ma solo per la sua interfaccia utente, NON per il REST.
- **unk** o **[unk]** in caso di nomi errati o non trovati (errori di scrittura).
- **err** o **[err]** in caso di parti di path mancanti o fuori posto (errore di sintassi).
- I device sono individuati dal nome o dall'ID: usando l'ID si è indipendenti dal nome che potete cambiare liberamente.


#### **Considerazioni importanti**

* **Sicurezza:** Per motivi di sicurezza, eseguire _IOTrest_ su una rete locale e di non esporlo direttamente a Internet.
* **Affidabilità:** _IOTrest_ e _IOTwebUI_ accedono  a Tuya Cloud solo in lettura. **In NESSUN CASO i dati Tuya possono essere alterati.**
* **Limiti:** Le prestazioni di _IOTrest_ dipendono dalle risorse hardware del tuo sistema e dal numero di dispositivi Tuya connessi. L'uso di WEBsocket rende _IOTrest_ molto veloce.
* **Supporto:** _IOTrest_ supporta tutti i dispositivi Tuya compatibili: i dati principali disponibili in Tuya Cloud sono accessibili.
* **Errori:** _IOTrest_ gestisce gli errori in modo robusto, fornendo messaggi di errore demplici e chiari, non bloccanti.
* **Avvertenze:**
   - il valore `online` fornito da Tuya Cloud può differire dal valore attuale mostrato in SmartLife.
   - Se un device risulta `online = false`, Tuya Cloud mantiene gli ultimi valori, per cui la richiesta `device/_dev-name_/_code_` può fornire dati non aggiornati.

#### **Conclusioni**

**IOTrest** è lo strumento ideale per chi desidera creare rapidamente soluzioni personalizzate per la gestione dei propri dispositivi Tuya. Grazie alla sua flessibilità e alla sua facilità d'uso, TuyaREST ti permette ineguagliabili automatizioni per le tue attività domestiche e di creare esperienze utente uniche.


