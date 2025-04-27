# **IoTrest: Un ponte REST per i device Tuya**
[English version](https://github.com/msillano/IoTwebUI/blob/main/RESTserver/README.md)

**IoTrest** è un'estensione opzionale per **IoTwebUI** 2.2 che trasforma i tuoi dispositivi Tuya in un _**servizio web** accessibile tramite semplici richieste HTTP_. Oltre a leggere i dati dai tuoi dispositivi, IoTrest ti permette di interagire con essi in modo avanzato, attivando scene e regole e ricevendo avvisi in tempo reale.

### **Caratteristiche principali**

* **Accesso ai dati:** Leggi i valori correnti dei sensori (temperatura, umidità, ecc.) e lo stato degli attuatori (luci, prese, ecc.) con un URL.
* **Automazione:** Invia richieste REST per attivare `scene` e `regole` preconfigurate in Tuya _Smart/SmartLife_ e in _IoTwebUI_, ad esempio con un pulsante HTML.
* **Avvisi:** Controlla gli avvisi in tempo reale per gli eventi che si verificano sui tuoi dispositivi (allarmi, cambiamenti di stato, ecc.).
* **Facilità d'uso:** Interfaccia REST intuitiva e ben documentata. Per facilità d'uso, i risultati ricevuti sono array o oggetti js.

**NB:** _Se non sei interessato all'utilizzo della funzione REST, ignora completamente le fasi di "installazione e configurazione", potrai farle in seguito. **IoTwebUI 2.2** funzionerà perfettamente!_

### **Architettura**
![](https://github.com/msillano/IoTwebUI/blob/main/pics/rest01.png?raw=true)

_Una WEBAPP (come IoTwebUI) non può contenere un server HTTP, quindi IoTrest (un server REST-HTTP) è un'applicazione standalone in node-js, che comunica tramite WebSocket (il metodo più veloce) con IoTwebUI._

IoTrest si integra perfettamente con IoTwebUI e sfrutta le sue potenti funzionalità di gestione dei dispositivi Tuya. Le richieste REST-HTTP inviate a IoTrest vengono tradotte in comandi per IoTwebUI, che a sua volta interagisce con Tuya Cloud.<br>
La latenza media (ritardo) tra un evento e la sua segnalazione in un client WEB che utilizza IoTrest è la somma di 3 fattori: 0.5*(tempo tra due misurazioni del dispositivo in Tuya Cloud) + 0.5*(intervallo di polling di IoTwebUI) + 0.5*(intervallo tra due richieste REST del client WEB). Valori tipici: 3', 2', 30" => latenza media 2'65"

### **Installazione e configurazione**

1. **Prerequisiti:**
    * Node.js installato sul tuo sistema.
        * Windows, Linux, macOS: vedi [nodejs-installer](https://nodejs.org/en/download/prebuilt-installer).
        * Android: vedi [node-red in Android](https://nodered.org/docs/getting-started/android), fermandoti SENZA installare _node-red_, cioè non eseguendo il comando: `npm i -g --unsafe-perm node-red`<br>
        Oppure, se vuoi installare un server Android attivo 24 ore su 24, 7 giorni su 7, con vari strumenti (FTP, DB Maria, Apache, Autostart, ecc...) vedi qui: [Android deployment](https://github.com/msillano/tuyaDAEMON/wiki/80.-deployment:-android-server#2022-update)
    * IoTwebUI ver. 2.2 o superiore, configurato e funzionante: vedi https://github.com/msillano/IoTwebUI, versione 2.2 o superiore.
      
2. **Installazione:**
    * Aggiorna il tuo percorso di installazione nel file `install_server.bat`
    * Clicca su `install_server.bat`: installerà le dipendenze aggiornate nella directory 'node_modules'.
      
3. **Configurazione:**
    * Aggiorna il tuo percorso di installazione nel file `run_server.bat`
      
4. **Test e debug**
Ci sono tre file principali:
    * `server.js`: il file eseguibile con l'implementazione di IoTrest, da lanciare in un terminale o usando `run_server.bat`.
    * `MockIOTweb.html`: una WEBAPP (deve essere aperta in un browser) che può sostituire `IoTwebUI`: l'operazione _websocket_ è identica, solo che i dati utilizzati NON provengono dal 'Cloud' ma sono fittizi.
    * `client.html`: un'altra WEBAPP con funzione di _client REST per il test_: ti permette di inviare a `IoTwebUI` ogni possibile richiesta REST e di vedere la risposta.

Quindi l'insieme dei tre file è autosufficiente, non richiede `IoTwebUI` e può essere utilizzato come test. Quando tutto funziona come dovrebbe, chiudi **MockIOTweb** e apri **IoTwebUI** e inizia a lavorare con i veri dispositivi Tuya.<br>

`client.html` può essere utilizzato finché non hai uno o più client REST personalizzati (applicazioni o interfacce utente). Se vuoi creare interfacce WEB, il codice HTML/javascript di `client.html` può servire come modello.

## **Utilizzo**
1. Per prima cosa avvia `server.js` con `run_server.bat`: se OK compare il messaggio "Server HAPI running on http://localhost:3031"
2. Riduci a icona il terminale. Puoi riaprirlo per vedere i messaggi scambiati o i messaggi di errore. Chiudilo quando hai finito di usarlo.
3. Carica/ricarica **IoTwebUI** nel browser, con `run_me.bat` o direttamente. Se OK, comparirà immediatamente un pop-up che ti informa che la connessione via websocket con il server è stata stabilita. Nota: la connessione websocket avviene solo all'avvio di `IoTwebUI`.
4. Usa `IoTwebUI` normalmente. Per accedere a REST, usa applicazioni/interfacce personalizzate oppure apri `client.html` nel browser (anche più di una volta).

Nota: se non utilizzi REST, non eseguire `server.js`, ma avvia semplicemente **IoTwebUI** normalmente (con `run_me.bat` o direttamente): funzionerà perfettamente (senza il pop-up iniziale di conferma della connessione).

### Considerazioni finali

* **Sicurezza:** Per motivi di sicurezza, esegui _IOTrest_ su una rete locale e non esporlo direttamente a Internet.
* **Affidabilità:** _IoTrest_ e _IoTwebUI_ accedono a Tuya Cloud solo in modalità di lettura. **In NESSUN CASO i dati Tuya possono essere alterati.**
* **Limitazioni:** Le prestazioni di _IoTrest_ dipendono dalle risorse hardware del tuo sistema e dal numero di dispositivi Tuya connessi. L'uso di WEBsocket rende _IoTrest_ molto veloce.
* **Supporto:** _IoTrest_ supporta tutti i dispositivi Tuya compatibili, inclusi i dispositivi virtuali: tutti i dati principali disponibili in Tuya Cloud sono accessibili.
* **Errori:** _IoTrest_ gestisce gli errori in modo robusto, fornendo messaggi di errore semplici e chiari, non bloccanti.
* **Avvertenze:**
    - il valore `online` fornito da Tuya Cloud potrebbe differire dal valore effettivo mostrato in SmartLife.
    - Se un dispositivo è `online = false`, Tuya Cloud conserva gli ultimi valori, quindi la richiesta `device/_dev-name_/_code_` potrebbe fornire dati obsoleti.

### **Conclusioni**
**IoTrest** è lo strumento ideale per chi desidera creare rapidamente soluzioni personalizzate per la gestione dei propri dispositivi Tuya. Grazie alla sua flessibilità e facilità d'uso, REST ti permette di eseguire automazioni senza precedenti per le tue attività domestiche e creare esperienze utente uniche.
L'utente (o un'APP o una UI) può leggere tutti i dati dal Tuya Cloud filtrati, quando necessario, tramite decodifica o elaborazione. Tutte le possibili operazioni di configurazione e comando sono garantite dalla mediazione dei 'tap-to-run' di Tuya: massima libertà con totale sicurezza!
![](https://github.com/msillano/IoTwebUI/blob/main/pics/screen02.png?raw=true)

Interfacce utente come queste, con immagini, pulsanti, gadget, dati dei dispositivi, persino multi-pagina, sono realizzabili piuttosto facilmente in HTML e (un po') di js, e sono totalmente interattive tramite REST.

![](https://github.com/msillano/IoTwebUI/blob/main/pics/screen04.png?raw=true)

Esempio pronto: la versione 3.0 di [IoTwebUI](https://github.com/msillano/IoTwebUI/blob/main/README.md)

<hr style="height:2px;border-width:0;color:gray;background-color:gray">

## Endpoint URI

**Richiesta:** <br>
generale: `http://localhost:3031/IoTrest/` + path (vedi oltre) <br>

**Risposta:** <br>
Sempre un oggetto js, vedi i formati nei vari casi

*  **home/list** <br>
    Ricevuto:
 ```
            {homes:["ROMA",
                    "ADMIN"]}
```

* **device/list[/_home_[/_room_]]** (e.g.: device/list, device/list/ROMA, device/list/ROMA/Studio) <br>
  Ricevuto: (ROMA/Studio)
```
          {home:"ROMA",
           room:"Studio",
           devices:["Termo studio",
                    "USBswitch",
                    "Zigbee Gateway"]}
 ```
* **device/_dev-name_|_dev-id_/dinfo|dstatus|ddata|_code_** (e.g.: device/Temperatura studio/va_temperature, device/Temperatura studio/dinfo, device/Termo studio/dstatus ) <br>
  Ricevuto: (va_temperature)
```
           {name:"Temperatura studio",
            va_temperature: 28}
```
&nbsp;&nbsp;&nbsp;&nbsp;  Ricevuto: (dinfo) <br> 
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
&nbsp;&nbsp;&nbsp;&nbsp;Received (dstatus) 
``` 
           {name: "Termo studio",
            online: true,
            status: {switch: true,
                     temp_current: 306,
                     temp_set: 200 }}
            icon: long HTML fragment with icon+tooltip (URLescaped)
```
&nbsp;&nbsp;&nbsp;&nbsp;Received (ddata) 
``` 
           {name: "Termo studio",
            online: true,
            status: {switch: true,
                     temp_current: 306,
                     temp_set: 200 }}
```
note:<br>
      - `dinfo.sub` `true` se il device è sub-device (i.e. usa un  HUB) <br>
      - `dinfo.logged` _IoTwebUI extension_: Lista delle proprietà esportate da IoTwebUI su file.<br>
      - `dinfo.test` _IoTwebUI extension_: `true` Se esiste un allarme IoTwebUI collegato al device.<br>
      - `dinfo.category` : codice corrispondente a `is-a` (in pop-ups, EXPERT mode).<br>
      - `dstatus.icon` : frammento HTML per UI: icona e toolip del device.

* **set/_dev-name_|_dev-id_/_code_/_value_** (e.g.: set/Device list/home/ROMA )<br>
 Solo for x-devices! <br>

  Ricevuto:
```
          {done: "set"}
```


* **alert/list/_dev-name_|_dev-id_** ( e.g.: alert/list/tuya_bridge)<br>
  Ricevuto:
```
           {"name":"tuya_bridge",
            "alarms":[ {"code": "switch_1",
                        "trigger": true,
                        "condition": "equ",
                        "value": "true",
                        "message": "I'm closed forever",
                        "action":["pop", "beep", "voice" ]}
                         ]}
```
note:<br> 
      - `alarms[x].trigger`: `true` In caso di allarme attivo.<br>
      - `alarms[x].conditon` valori: "grt", "equ", "lst" per ">", "=", "<" <br>
      - `alarms[x].action[y]` valori: "beep", "pop", "sound", "voice" (URL e SCENE/RULE: auto, basate su `message`)

* **scene/list[/_room_]** (scene/list, scene/list/ROMA)<br>
    Ricevuto:
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
* **rule/list** (e.g.: rule/list)<br>
  Ricevuto:
```
          ["turn off light",
           "pippo",
           "call pippo"]
```

* **execute/_scene-name_|_rule-name_** (e.g.: execute/call pippo)<br>
  Ricevuto:
``` 
          {done: "rule"}
```

**Errors:**

TX: device/Living room temperature/_va\_humidità_ => **{error: "unknown"}**

TX: device/_Livingroom temperature_/va\_humidity => **{error: "unknown"}**

TX: device/Living room temperature/ => **{error: "malformed"}**

nota:
- La risposta è sempre un oggetto Js (anche in caso di errore).
- I dati sono così come provengono da Tuya Cloud: potrebbero necessitare di decodifica o scalatura (es. `'temp_current', value: 284` => 28.4 °C). [Vedi sotto](https://github.com/msillano/IoTwebUI/blob/main/RESTserver/LEGGIMI.md#customizzazioni).
- **"unknown"** in caso di nomi errati o non trovati (errori di battitura).
- **"malformed"** in caso di parti del percorso mancanti o fuori posto (errore di sintassi).
- I dispositivi sono identificati tramite il loro nome o ID: l'utilizzo dell'ID è indipendente dal nome che puoi cambiare liberamente. (nota: per gli x-device si deve usare il nome! L'ID e variabile).
<hr style="height:2px;border-width:0;color:gray;background-color:gray">

L'esempio seguente è presente nel file 'custom.js', creato appositamente per facilitare eventuali personalizzazioni dell'utente.

#### Il problema
Questo interruttore-misuratore (OPWTY-63), utilizzato con il nome "Main AC", presenta nel Cloud i dati in tempo reale (V, A, W, dispersione) non in chiaro, ma codificati in 'phase_a', come vediamo nel primo tooltip di IoTwebUI: {code: 'phase_a', value: 'CRAAArwAAJYACg=='}. La ragione di questa scelta progettuale è che i dati vengono inviati dal dispositivo ogni secondo, e quindi il throughput è ridotto.

#### Codice
È possibile avere i valori RT in chiaro sia nel tooltip di IoTwebUI che nei dati esportati da IoTrest, intervenendo nel file 'custom.js' come segue:

1) L'algoritmo di decodifica è noto: è implementato nella funzione `context.global.datadecode.STRUCTELERT` presente nel nodo `*ENCODE/DECODE user library` di **tuyaDAEMON.CORE_devices**. Purtroppo, la funzione è in _nodejs_ e deve essere riscritta per l'ambiente js del browser. La funzione è comunque abbastanza semplice:
```
   function datadecodeSTRUCTELERT(value) {
       let result = {};
   // versione javascript riscritta (Buffer non disponibile nel browser)
       const decod = atob(value); // stringa ASCII da code64
   // conversioni Int16BE, scalatura:
       result["V"]     = (decod.charCodeAt(1) + 256*decod.charCodeAt(0)) / 10.0;       // V
       result["Leack"] = (decod.charCodeAt(3) + 256*decod.charCodeAt(2)) / 1000.0;     // A
       result["A"]     = (decod.charCodeAt(5) + 256*decod.charCodeAt(4)) / 40000.0;    // A
       result["W"]     = (decod.charCodeAt(7) + 256*decod.charCodeAt(6)) ;             // W
       return (result);
   };
```

2) La funzione hook `filterDP(res, devData)` viene chiamata per ogni dispositivo letto dal Cloud e normalmente non fa nulla, ma è presente per inserire l'elaborazione personalizzata dei valori.
Il parametro `res` è l'oggetto con i dati completi del device, mentre `devData` è un oggetto `{code1:value1, code2:value2...}` con i valori predefiniti da visualizzare nel tooltip.
In questo caso avremo:
```
   if (res.name == "Main AC") {                               //Misuratore di potenza
     // la decodifica per il tooltip aggiunge valori extra a devData
         const vals = datadecodeSTRUCTELERT(devData.phase_a); // decodifica 'phase_a'
         devData['phase_a_V'] = vals.V.toFixed(1);            // esplode 'vals'
         devData['phase_a_Leack'] = vals.Leack.toFixed(3);
         devData['phase_a_A'] = vals.A.toFixed(3);
         devData['phase_a_W'] = vals.W.toString();
     // ALTRO: Per esportare tramite REST il valore decodificato, lo aggiungiamo anche a 'device.status'
         addToStatus("Main AC","phase_a_decoded", vals) ;
  }
```
nota: `addToStatus()` è un'utility che aggiorna i dati locali (utilizzati da REST), aggiungendo o aggiornando, in questo caso, il valore `phase_a_decoded`.


#### Risultati
Le modifiche apportate sono additive: non alterano i dati esistenti.

- Il tooltip ora mostra i dati RT in chiaro (ultimo tooltip nella figura).

- Come ulteriore vantaggio, i dati in tempo reale (V, A, W, dispersione), non utilizzabili con l'automazione Tuya/Smartlife, possono ora essere utilizzati come condizioni nelle REGOLE di IoTwebUI! Esempio: `GET("Main AC","phase_a_decoded").W`

- I dati possono essere esportati: la richiesta REST `device/Main AC/phase_a_decoded` restituisce:
```
         {name: "Main AC",
         phase_a_decoded: {V: 227,
                           Leack: 0.002,
                           A: 1.408,
                           W: 302 }
         }
````

_Le varie stranezze (quirk) dei dispositivi Tuya a volte richiedono interventi mirati: l'obiettivo nell'implementazione di IoTwebUI era rendere queste personalizzazioni il più semplici possibile._

L'esempio è presente nel file 'custom.js', creato appositamente per facilitare eventuali personalizzazioni dell'utente.

