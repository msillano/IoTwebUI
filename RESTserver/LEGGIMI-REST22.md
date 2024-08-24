# **IoTrest: Un ponte REST per i tuoi dispositivi Tuya**

**IoTrest** è un'estensione opzionale per **IoTwebUI** 2.2 che trasforma i tuoi dispositivi Tuya in _**servizi web** accessibili tramite semplici richieste HTTP_. Oltre a consentire la lettura dei dati dei tuoi dispositivi, IoTrest ti permette di interagire con essi in modo avanzato, attivando scene, regole e ricevendo avvisi in tempo reale.

### **Funzionalità principali**

* **Accesso ai dati:** Leggi i valori attuali dei sensori (temperatura, umidità, ecc.) e lo stato degli attuatori (luci, prese, ecc.) con un URL.
* **Automazione:** Invia richieste REST per attivare `scene` e `regole` preconfigurate in  Tuya _Smart/SmartLife_ e in _IoTwebUI_, per esempio con un bottone HTML.
* **Avvisi:** Verifica gli avvisi in tempo reale per gli eventi che si verificano sui tuoi dispositivi (allarmi, cambi di stato, ecc.).
* **Semplicità d'uso:** Interfaccia REST intuitiva e ben documentata. Per comodità d'uso i risultati ricevuti sono array od oggetti js.

**NB:** _Se non vi interessa utilizzare la funzione di REST, ignorate completamente le fasi 'installazione e configurazione', potrete farle in un secondo tempo. **IoTwebUI 2.2** funzionerà perfettamente!_

### **Architettura**
![](https://github.com/msillano/IoTwebUI/blob/main/pics/rest01.png?raw=true)

_Una WEBAPP (come IoTwebUI) non può contenere un server HTPP, per cui IoTrest (un server REST-HTPP) è un'applicazione autonoma in nodejs, che comunica via websocket (il metodo più rapido) con IoTwebUI._

IoTrest si integra perfettamente con IoTwebUI e sfrutta le sue potenti funzionalità di gestione dei dispositivi Tuya. Le richieste REST-HTTP inviate a IoTrest vengono tradotte in comandi per IoTwebUI, che a sua volta interagisce con Tuya Cloud.<br>
Il tempo di latenza (ritardo) medio tra un evento e la sua segnalazione in un cliente WEB che usa IoTrest è la somma di 3 fattori: 0.5*(tempo tra due misure del device in Tuya Cloud) + 0.5*(intervallo di polling di IoTwebUI) + 0.5*(intervallo tra due richieste REST del client WEB). Valori  tipici: 3', 2', 30"  => latenza media 2'65"

### **Installazione e configurazione**

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
   * `server.js`: il file eseguibile con l'implementazione di IoTrest, da lanciare in un terminale o usando `run_server.bat`.
   * `MockIOTweb.html`: una WEBAPP (si deve aprire in un browser) che può sostituire `IoTwebUI`: il funzionamento del _websocket_ è identico, solo che i dati utilizzati NON vengono dal 'Cloud' ma sono fittizzi.
   * `client.html`: un'altra WEBAPP con funzione di _client REST per test_: permette di inviare a `IoTwebUI` ogni possibile richiesta REST, e di vederne la risposta.
     
Quindi l'insieme dei tre file è autosufficiente, non richiede `IoTwebUI`, e può essere usato come test. Quando tutto funziona come si deve, si chiude  **MockIOTweb** e si apre **IoTwebUI** e inizia il funzionamento con i device Tuya reali.<br>

`client.html` può essere usato fino a quando non si hanno uno o più client REST su misura (applicazioni od interfacce utente). Se si vogliono realizzare interfacce WEB, il codice HTML/javascript di `client.html` può servire da modello.

## **Utilizzo**
   1.  Avviare prima `server.js`con `run_server.bat`: se OK appare il messaggio "Server HAPI running on http://localhost:3031"
   2.  Iconizzare il terminale. Potete riaprirlo per vedere i messaggi scambiati o i messaggi di errore. Chiuderlo al termine dell'uso.
   3.  Caricare/ricaricare `IoTwebUI` nel browser, con "run_me.bat" oppure direttamente. Se OK appare immediatamente un pop-up che informa dell'avvenuto collegamento via websocket con il server. nota: il collegamento websocket avviene solo all'avvio di `IoTwebUI`.
   4. Usare `IoTwebUI` normalmente. Per accedere al REST usare o applicazioni/intefacce custom, oppure aprite 'client.html' nel browser (anche più di uno).

nota: se non utilizzate il REST, non eseguite `server.js`, ma solo lanciare normalmente **IoTwebUI** (con "run_me.bat" o direttamente): funzionerà perfettamente (senza il pop-up iniziale di conferma di collegamento).

### **Considerazioni finali**

* **Sicurezza:** Per motivi di sicurezza, eseguire _IOTrest_ su una rete locale e di non esporlo direttamente a Internet.
* **Affidabilità:** _IoTrest_ e _IoTwebUI_ accedono  a Tuya Cloud solo in lettura. **In NESSUN CASO i dati Tuya possono essere alterati.**
* **Limiti:** Le prestazioni di _IoTrest_ dipendono dalle risorse hardware del tuo sistema e dal numero di dispositivi Tuya connessi. L'uso di WEBsocket rende _IoTrest_ molto veloce.
* **Supporto:**    _IoTrest_ supporta tutti i dispositivi Tuya compatibili, compresi i device virtuali: tutti i dati principali disponibili in Tuya Cloud sono accessibili.
* **Errori:** _IoTrest_ gestisce gli errori in modo robusto, fornendo messaggi di errore semplici e chiari, non bloccanti.
* **Avvertenze:**
   - il valore `online` fornito da Tuya Cloud può differire dal valore attuale mostrato in SmartLife.
   - Se un device risulta `online = false`, Tuya Cloud mantiene gli ultimi valori, per cui la richiesta `device/_dev-name_/_code_` può fornire dati non aggiornati.

### **Conclusioni**

**IoTrest** è lo strumento ideale per chi desidera creare rapidamente soluzioni personalizzate per la gestione dei propri dispositivi Tuya. Grazie alla sua flessibilità e alla sua facilità d'uso, REST ti permette ineguagliabili automatizioni per le tue attività domestiche e di creare esperienze utente uniche.
L'utente (o un'APP o una UI) può legge tutti i dati del Tuya Cloud filtrati, quando necessario, da decodifiche o elaborazioni. Tutte le operazioni possibili di configurazione e comando sono garantite dalla mediazione dei 'tap-to-run' Tuya: massima libertà con sicurezza totale!

![](https://github.com/msillano/IoTwebUI/blob/main/pics/screen02.png?raw=true)

Interfacce utente come queste, con immagini, bottoni, gadgets, dati dei device, anche multipagina, si realizzano abbastanza facilmente in HTML e (poco) js, e sono totalmente interattive via REST.

![](https://github.com/msillano/IoTwebUI/blob/main/pics/screen04.png?raw=true)

<hr style="height:2px;border-width:0;color:gray;background-color:gray">

## Endpoint URI

**Richiesta:** <br>
generale: `http://localhost:3031/IoTrest/` + path (vedi sotto) <br>

**Risposta:** <br>
 Sempre un oggetto js, vedi singoli casi.

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
    -  `dinfo.sub`  `true` se il device è un sub-device (i.e. usa un HUB) <br>
    -  `dinfo.logged` _estensione IoTwebUI_: lista delle proprietà esportate da IoTwebUI su file.<br>
    -  `dinfo.test` _estensione IoTwebUI_: `true` se esiste un allarme IoTwebUI collegato al device.<br>
    -  `dinfo.category` : codice corrispondente ad `is-a` (nei pop-up, modo ESPERTO).
        
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
      - `alarms[x].action[y]` valori: "beep", "pop", "sound", "voice" (URL e SCENA/RULE: auto, basati su `message`)

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

TX: device/_Temperatura soggiorn_/va\_humidity => **{error: "unknown"}**

TX: device/Temperatura soggiorno/  =>   **{error: "malformed"}**  

note: 
- La risposta è sempre un oggetto Js (anche in caso di errore).
- I dati sono come provengono da Tuya Cloud: possono aver bisogno di decodifica o di scaling (e.g. `'temp_current', value: 284` => 28.4 °C).  [Vedi oltre](https://github.com/msillano/IoTwebUI/blob/main/RESTserver/LEGGIMI-REST22.md#customizzazioni).
- **"unknown"** in caso di nomi errati o non trovati (errori di scrittura).
- **"malformed"** in caso di parti di path mancanti o fuori posto (errore di sintassi).
- I device sono individuati dal nome o dall'ID: usando l'ID si è indipendenti dal nome che potete cambiare liberamente.


<hr style="height:2px;border-width:0;color:gray;background-color:gray">

### Customizzazioni
Il seguente esempio è presente nel file 'custom.js', creato apposta per agevolare le eventuali customizzazioni utente.

#### Il problema
Questo breaker-meter ([OPWTY-63](https://github.com/msillano/tuyaDAEMON/blob/main/devices/BreakerDIN/device_BreakerDIN.pdf)), usato con il nome "Main AC", presenta nel Cloud i dati realtime (V, A, W, leack) non in chiaro, ma codificati in 'phase_a', come vediamo nel primo tooltip di IoTwebUI: `{code: 'phase_a', value: 'CRAAArwAAJYACg=='}`. Il motivo di questa scelta di progetto è che i dati sono inviati dal device ogni secondo, e così si riduce il throughput.
<table>
<tr>
<td>
<img src="https://github.com/msillano/tuyaDAEMON/blob/main/pics/BreakerDIN.jpg?raw=true" height ="200px">
<img src="https://github.com/msillano/IoTwebUI/blob/main/pics/Screenshot_080106.png?raw=true" height ="200px">
<img src="https://github.com/msillano/IoTwebUI/blob/main/pics/popup01.png?raw=true" width ="150px" valign="top">
<img src="https://github.com/msillano/IoTwebUI/blob/main/pics/popup002.png?raw=true" width ="150px" valign="top">
</td>
</tr>
</table>
Come risultato si hanno i valori  realtime (V, A, W, leack) presenti solo nell'interfaccia utente di SmartLife, ma NON nelle condizioni delle automazioni Smartlife !!
Senza interventi custom,  i valori  realtime (V, A, W, leack) NON sono presenti in IoTwebUI.

#### code
E' possibile avere i valori RT in chiaro sia nel tooltip di **IoTwebUI**  che nei dati esportati da **IoTrest**, intervenendo nel file 'custom.js' come segue:

1) L'algoritmo di decodifica è noto: è implementato nella funzione `context.global.datadecode.STRUCTELERT` presente nel nodo `*ENCODE/DECODE user library` di `tuyaDAEMON.CORE_devices`. Purtroppo, la funzione è in nodejs, e va riscritta per l'ambiente js del browser. La funzione è comunque abbastanza semplice:
```
 function datadecodeSTRUCTELERT(value) {
   let result = {};
// rewritten javascript version (Buffer not available in browser)
	const decod = atob(value);  // ASCII string from code64
// Int16BE conversions, scaling:
	result["V"] =     (decod.charCodeAt(1) + 256*decod.charCodeAt(0)) / 10.0;    // V
 	result["Leack"] = (decod.charCodeAt(3) + 256*decod.charCodeAt(2)) / 1000.0;  // A
 	result["A"] =     (decod.charCodeAt(5) + 256*decod.charCodeAt(4)) / 40000.0; // A
 	result["W"] =     (decod.charCodeAt(7) + 256*decod.charCodeAt(6)) ;  // W
  return (result);
};
```
2) La funzione hook `filterDP(res, devData)` è chiamata per ogni lettura dei dati dal Cloud, e normalmente non fa nulla, ma è presente proprio per inserire elaborazioni custom sui valori.
Il parametro `res` è l'oggetto con i dati completi del device, mentre `devData` è un oggetto `{code1:value1, code2:value2...}` con i valori di default da visualizzare nel tooltip.
In questo caso avremo:

```
 if (res.name == "Main AC") {   //Power meter 
// decode for tooltip, adds extra values to devData
      const vals = datadecodeSTRUCTELERT(devData.phase_a);   // decodes 'phase_a'
      devData['phase_a_V']     = vals.V.toFixed(1);          // explodes 'vals'
      devData['phase_a_Leack'] = vals.Leack.toFixed(3);
      devData['phase_a_A']     = vals.A.toFixed(3);
      devData['phase_a_W']     = vals.W.toString();
 // MORE: To Export via REST the decoded value, we add it to device.status 
      addToStatus("Main AC","phase_a_decoded", vals) ;      
  }
```
nota:  `addToStatus()` è un'utility che si occupa dell'aggiornamento dei dati locali (usati da REST), aggiungendo in questo caso il valore `phase_a_decoded`.

#### Risultati
Le modifiche effettuate sono addittive: non alterano i dati esistenti.

- Il tooltip ora riporta i dati RT in chiaro (ultimo tooltip in figura).

- Come ulteriore vantaggio i dati realtime (V, A, W, leack), non usabili con le automazioni Tuya/Smartlife, ora sono utilizzabili come condizioni nelle REGOLE IoTwebUI! Esempio:  `GET("Main AC","phase_a_decoded").W`

- I dati possono essere esportati: la richiesta REST `device/Main AC/phase_a_decoded` ha come risultato:
```
              {name: "Main AC",
               phase_a_decoded: {V: 227,
                                 Leack: 0.002,
                                 A: 1.408,
                                 W: 302
              }}
```

_I vari quirk dei device Tuya richiedono a volte interventi mirati: l'obiettivo nell'implementare IoTwebUI è stato quello di rendere più semplici possibili queste customizzazioni._
