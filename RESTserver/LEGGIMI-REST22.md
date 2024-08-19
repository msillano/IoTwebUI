### **IoTrest: Un ponte REST per i tuoi dispositivi Tuya**

#### **Introduzione**

**IoTrest** è un'estensione opzionale per **IoTwebUI** 2.2 che trasforma i tuoi dispositivi Tuya in _**servizi web** accessibili tramite semplici richieste HTTP_. Oltre a consentire la lettura dei dati dei tuoi dispositivi, IoTrest ti permette di interagire con essi in modo avanzato, attivando scene, regole e ricevendo avvisi in tempo reale.

#### **Funzionalità principali**

* **Accesso ai dati:** Leggi i valori attuali dei sensori (temperatura, umidità, ecc.) e lo stato degli attuatori (luci, prese, ecc.).
* **Automazione:** Invia richieste REST per attivare scene e regole preconfigurate in IoTwebUI e Tuya Smart/SmartLife.
* **Avvisi:** Verifica gli avvisi in tempo reale per gli eventi che si verificano sui tuoi dispositivi (allarmi, cambi di stato, ecc.).
* **Semplicità d'uso:** Interfaccia REST intuitiva e ben documentata. I risultati sono in formato testo oppure array od oggetti js.

**NB:** _Se non vi interessa utilizzare la funzione di REST, ignorate completamente 'installazione e configurazione', potrete farla in un secondo tempo. **IoTwebUI 2.2** funzionerà perfettamente!_

#### **Architettura**
![](https://github.com/msillano/IoTwebUI/blob/main/pics/rest01.png?raw=true)

_Una WEBAPP (come IoTwebUI) non può contenere un server HTPP, per cui IoTrest (un server REST-HTPP) è un'applicazione autonoma in nodejs, che comunica via websocket (il metodo più rapido) con IoTwebUI._

IoTrest si integra perfettamente con IoTwebUI e sfrutta le sue potenti funzionalità di gestione dei dispositivi Tuya. Le richieste REST-HTTP inviate a IOTrest vengono tradotte in comandi per IoTwebUI, che a sua volta interagisce con Tuya Cloud.<br>
Il tempo di latenza (ritardo) medio tra un evento e la sua segnalazione in un cliente WEB che usa IoTrest è la somma di 3 fattori: 0.5*(tempo tra due misure del device in Tuya Cloud) + 0.5*(intervallo di polling di IoTwebUI) + 0.5*(intervallo tra due richieste REST del client WEB). Valori  tipici: 3', 2', 30"  => latenza media 2'65"

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
   * `server.js`: il file eseguibile con l'implementazione di IOTrest, da lanciare in un terminale o usando `run_server.bat`.
   * `MockIOTweb.html`: una WEBAPP (si deve aprire in un browser) che può sostituire `IoTwebUI`: il funzionamento del _websocket_ è identico, solo che i dati utilizzati NON vengono dal 'Cloud' ma sono fittizzi.
   * `client.html`: un'altra WEBAPP con funzione di _client REST per test_: permette di inviare a `IoTwebUI` ogni possibile richiesta REST, e di vederne la risposta.
     
Quindi l'insieme dei tre file è autosufficiente, non richiede `IoTwebUI`, e può essere usato come test. Quando tutto funziona come si deve, si chiude  **MockIOTweb** e si apre **IoTwebUI** e inizia il funzionamento con i device Tuya reali.<br>

`client.html` può essere usato fino a quando non si hanno uno o più client REST su misura (applicazioni od interfacce utente). Se si vogliono realizzare interfacce WEB, il codice HTML/javascript di `client.html` può servire da modello.

#### **Utilizzo**
   1.  Avviare prima `server.js`con `run_server.bat`: se OK appare il messaggio "Server HAPI running on http://localhost:3031"
   2.  Iconizzare il terminale. Potete riaprirlo per vedere i messaggi scambiati o i messaggi di errore. Chiuderlo al termine dell'uso.
   3. caricare/ricaricare `IoTwebUI` nel browser, con "run_me.bat" oppure direttamente. Se OK appare immediatamente un pop-up che informa dell'avvenuto collegamento via websocket con il server. nota: il collegamento websocket avviene solo all'avvio di `IoTwebUI`.
   4. Usare `IoTwebUI` normalmente. Per accedere al REST usare o applicazioni/intefacce custom, oppure aprite 'client.html' nel browser (anche più di uno).

nota: se non utilizzate il REST, non eseguite `server.js`, ma solo lanciare normalmente **IoTwebUI** (con "run_me.bat" o direttamente): funzionerà perfettamente (senza il pop-up iniziale di conferma di collegamento).


#### dizionario REST
**Richiesta:**<br>
generale: `http://localhost:3031/IoTrest/` + path (vedi sotto) <br>

**Risposta:** <br>
 Sempre un oggetto js, vedi singoli casi:

*  **device/list[/_home_[/_room_]]** (e.g.: device/list,  device/list/ROMA,  device/list/ROMA/Studio) <br>
    Received (ROMA/Studio)
 ```
            {home:"ROMA",
             room:"Studio",
             devices:["Termo studio",
                        "USBswitch",
                        "Zigbee Gateway"]} 
```
*  **device/_dev-name_|_dev-id_/dinfo|dstatus|_code_** (e.g.: device/Temperatura studio/va_temperature, device/Temperatura studio/dinfo, device/Termo studio/dstatus ) <br>

  Received (va_temperature) 
```
            {name:"Temperatura studio",
             va_temperature: 28} 
```

  Received (dinfo) <br>
```
            {name: "Temperatura studio",
             id: "xxxxxxxxxxxxxxxxxxxx",
             product_name: "温湿度传感器",
             model: null,
             category: "wsdcg",
             sub: true,
             logged: ["va_temperature"],
             test: false}
```
 Received (dstatus)
```
             {name: "Termo studio",
              online: true,
              status: {switch: true,
                       temp_current: 306,
                       temp_set: 200}}
```
 note:<br>
    -  `dinfo.sub`  il device è un sub-device (i.e. usa un HUB) <br>
    -  `dinfo.logged` _estensione IoTwebUI_: lista delle proprietà esportate da IoTwebUI su file.<br>
    -  `dinfo.test` _estensione IoTwebUI_: `true` se esiste un allarme IoTwebUI collegato al device.<br>
    -  `dinfo.category` : codice corrispondente ad `isa` (nei pop-up, modo EXPERT)  _estensione IoTwebUI_.
        
*  **alert/list/_dev-name_|_dev-id_** ( e.g.: alert/list/tuya_bridge)<br>
   Received
```
           {"name":"tuya_bridge",
            "alarms":[
                 {"code": "switch_1",
                  "trigger": true,
                  "condition": "equ",
                  "value": "true",
                  "message": "Sono chiuso per sempre",
                  "action":["pop", "beep", "voice"]}
                    ]} 
 ```
  note:<br>
      - `alarms[x].trigger`: `true` in caso di allarme attivo.<br>
      - `alarms[x].conditon` valori: "grt", "equ", "lst" per ">", "=", "<"
      - `alarms[x].action[y]` valori: "beep", "pop", "sound", "voice" (URL e SCENA/RULE: auto, based on `message`)

*  **scene/list[/_room_]**  (scene/list, scene/list/ROMA)<br>
      Received 
```
             {home: "ROMA". 
              scenes: [{name: "ALARM OFF",
                        status: "enable",
                        running_mode: "cloud"},
                       {name: "ALARM ON",
                        status: "enable",
                        running_mode: "cloud"},
                          ...]
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

TX: device/Temperatura soggiorno/_va\_humidit_ =>  **{error: "unknown"}**

TX: device/_Temperatura soggiorn_/va_humidity => **{error: "unknown"}**

TX: device/Temperatura soggiorno/  =>   **{error: "malformed"}**  

note: 
- La risposta è sempre un oggetto Js (anche in caso di errore).
- I dati sono come provengono da Tuya Cloud: possono aver bisogno di decodifica o di scaling (e.g. `'temp_current', value: 284` => 28.4 °C). Vedi oltre .
- **unk** o **[unk]** in caso di nomi errati o non trovati (errori di scrittura).
- **err** o **[err]** in caso di parti di path mancanti o fuori posto (errore di sintassi).
- I device sono individuati dal nome o dall'ID: usando l'ID si è indipendenti dal nome che potete cambiare liberamente.


#### **Considerazioni importanti**

* **Sicurezza:** Per motivi di sicurezza, eseguire _IOTrest_ su una rete locale e di non esporlo direttamente a Internet.
* **Affidabilità:** _IoTrest_ e _IoTwebUI_ accedono  a Tuya Cloud solo in lettura. **In NESSUN CASO i dati Tuya possono essere alterati.**
* **Limiti:** Le prestazioni di _IoTrest_ dipendono dalle risorse hardware del tuo sistema e dal numero di dispositivi Tuya connessi. L'uso di WEBsocket rende _IoTrest_ molto veloce.
* **Supporto:**    _IoTrest_ supporta tutti i dispositivi Tuya compatibili, compresi i device virtuali: i dati principali disponibili in Tuya Cloud sono accessibili.
* **Errori:** _IoTrest_ gestisce gli errori in modo robusto, fornendo messaggi di errore semplici e chiari, non bloccanti.
* **Customizzazione:** Si possono trovare dati che necessitano di trasformazioni o decodifica.  Generalmente i dati codificati riguardano la configurazione, ma in qualche raro caso anche i dati real time. Se necessario è possibile intervenire in 'custom.js' con una decodifica custom, che può interessare sia il tooltip di IoTwebUI che i dati esportati via REST. Un esempio lo [trovate qui]()
* **Avvertenze:**
   - il valore `online` fornito da Tuya Cloud può differire dal valore attuale mostrato in SmartLife.
   - Se un device risulta `online = false`, Tuya Cloud mantiene gli ultimi valori, per cui la richiesta `device/_dev-name_/_code_` può fornire dati non aggiornati.

#### **Conclusioni**

**IoTrest** è lo strumento ideale per chi desidera creare rapidamente soluzioni personalizzate per la gestione dei propri dispositivi Tuya. Grazie alla sua flessibilità e alla sua facilità d'uso, TuyaREST ti permette ineguagliabili automatizioni per le tue attività domestiche e di creare esperienze utente uniche.

<hr>
### Customizzazioni
Il segente esenpio è presente nel file 'custom.js'.
#### Il problema
Questo breker-meter (


<table>
<tr>
<td>
 <img src="https://github.com/msillano/IoTwebUI/blob/main/pics/Screenshot_080106.png?raw=true">
</td>
</tr>
</table>
