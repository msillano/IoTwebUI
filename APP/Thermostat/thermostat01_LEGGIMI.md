# WEB Termostato 

Questo è un cronotermostato completo SW che utilizza le misure di uno (o più) sonde di temperatura Tuya per controllare uno smart switch per il riscaldamento (raffrescamento).
E' l'unione di tre elementi:

1. Interfaccia SmarLife (locale/remota) ottenuta con un **device virtuale**
2. Un **x-device** che contiene tutta la logica di funzionamento
3. Un'interfaccia **WEB grafica** (opzionale) 

### Virtual device
L'interfaccia su SmartLife, di uso anche remoto, utilizza un [device virtuale](https://www.tuyaexpo.com/product/1104012), e permette le principali funzioni di controllo utente:

![](https://github.com/msillano/IoTwebUI/blob/main/pics/virtual%20thermo.png?raw=true)

_Switch:_ ON/OFF, agisce sul riscaldamento/raffrescamento <br>
_Mode:_ scelta tra Manual, ECO, Program: 
   * _Manual_: temperatura target (Setpoint) regolabile in step di 0.5 °C
   * _ECO_ è una bassa (alta) temperatura predefinita, ma tale da rendere rapido il ripristino (1h) della temperatura di regime. Usato in caso di assenze prolungate. e.g. 16.5° (30° in caso di raffrescamento).
   * _Program_:  temperatura target (Setpoint) programmata per fasce orarie definite per i 7 giorni. Per definire il profilo di temperatura non si usa l'interfaccia virtuale (limitata a 4 intervalli giornalieri), ma l'utente deve impostarlo in `addon/thermostat01.js`, senza limiti di intervalli.

_Setpoint:_  La temperatura desiderata (mode _Manual_) oppure una modifica temporanea alla temperatura programmata (mode _Program_).<br>
_ChildLoch_, _Weekly Program_, _Timer_ (tutti in impostazioni - _Settings_) NON sono disponibili nel 'device virtuale':  _Weekly Program_ e _Timer_ hanno implementazioni alternative.

_nota: le funzioni legate all'HW non sono, ovviamente, utilizzabili in un device virtuale! (Sono barrate nella figura). In particolare non è leggibile la temperatura attuale ('Room Temp'), che però è accessibile, in SmartLife, aprendo i device Tuya usati come termometri e in IoTwebUI nel tooltip del x-device, oppure nell'interfaccia utente._

### x_device 
Un'**x_device** (nome di default "WEB Thermostat") per **IoTwebUI** si occupa di:
   1. Connessione con i _sensori di temperatura_ (reali), uno o più di uno: è usata una media mobile per migliorare la sensibilità e ridurre il rumore.
   2. Connessione con il _device virtuale_ per leggere i valori impostati dall'utente.
   3. Logica di funzionamento del termostato:
       * Il funzionamento invernale (riscaldamento) o estivo (raffrescamento) è impostato in `addon/thermostat01.js`.
       * Alla temperatura letta dalle sonde è applicabile un `offset` di correzione (in `addon/thermostat01.js`).
       * Effettua i paragoni con +/- `delta` regolabile (in `addon/thermostat01.js`), è quindi un comparatore con isteresi. Consigliato `delta = 0.3`°C
       * In modo 'auto' (i.e. Program) una variazione manuale di `Setpoint` ha effetto fino al successivo intervallo programmato.
       * `TimeON` fornisce il tempo di accensione giornaliero (in ore). Il conteggio riparte ogni giorno alle 24:00
   4. Sono presenti _due uscite_: una per riscaldamento (`HOTout`) e una per raffrescamento (`COLDout`). Valori `true/false`.
  
  ![](https://github.com/msillano/IoTwebUI/blob/main/pics/IoTwebUI03.png?raw=true)
  
Tutti i dati sono visibili nel tooltip di IoTwebUI, quindi accessibili tramite 'RULE'.
In particolare servono due REGOLE (**IoTwebUI**) per agire sullo `swart switch` del riscaldamento (raffrescamento).

```  
// rules for HOT on/off - optional
  if(GET("WEB Thermostat","HOTout", false)) SCENE("HOTTURNON"); 
  if(!GET("WEB Thermostat","HOTout", false)) SCENE("HOTTURNOFF");

// rules for COLD on/off - optional
  if(GET("WEB Thermostat","COLDout", false)) SCENE("COLDTURNON"); 
  if(!GET("WEB Thermostat","COLDout", false)) SCENE("COLDTURNOFF"); 
```

_`HOTTURNON` e `HOTTURNOFF`(e `COLDTURNON` e `COLDTURNOFF`) sono 'tap-to-run' Tuya che accendono/spengono il riscaldamento: sono richiamate ad ogni loop (analogamente per il raffrescamento)._

TIMER: orario ON/OFF. Se il riscaldamento (raffreddamento) segue un orario predefinito (e.g. centralizzato), sono utili due 'automazioni' Tuya che accendano/spengano il device virtuale agli stessi orari:

```
## thermostatSTART:
Se 
 . Pianifica ore 7:00 (Ogni giorno)
Poi
 . HeatingThermostat-vdev0.Switch : ON

## thermostatSTOP
Se 
 . Pianifica ore 23:00 (Ogni giorno)
Poi
 . HeatingThermostat-vdev0.Switch : OFF
```

WEEKLY PROGRAM è implemetato in `addon/thermostat01.js` e deve essere modificato dall'utente, in questo modo:

```
 var Tprg = [
        DAYMAP(16, "08:00", 20, "18:00", 21, "23:00"), // domenica
        DAYMAP(16, "08:00", 20, "11:00", 16, "18:00", 21, "23:00"), // lunedì
        etcetera...
 ```

Dove per ogni intervallo è indicata una temperatura, seguita dall'orario di termine, in modo circolare. L'esempio precedente si legge:

```
domenica: dalle 23:00 alle  8:00 =>  16°
          dalle  8:00 alle 18:00 =>  20° 
          dalle 18:00 alle 23:00 =>  21°
 etcetera...
```

Un'altro aspetto interessante è che si può usare un solo device virtuale per più x-device (e.g. uno per stanza) ognuno con le sue sonde, i suoi profili e uno 'smart relay' o una elettrovalvola comandata! Unica avvertenza creare e includere più file `thermostatXX.js` e cambiare il nome (`function THERMOSTATXX`(...)) ad ogni istanza, per poter avere impostazioni differenti.

### Interfaccia utente
**WEB thermostat x-device** è completo ed autosufficiente. <br>
Se si desidera, **IoTwebUI** offre Allarmi e l'esportazione su file (Logging) dei dati per chi desidera conservarli od eseguire ulteriori elaborazioni.

E' disponibile comunque una interfaccia WEB ad hoc, che utilizza **RESTserver**,  per avere sott'occhio tutti dati!



_note_: 

 * _l'interfaccia è del tutto opzionale, non interviene sulla logica di funzionamento di **WEB thermostat**._
 * _il grafico copre 24 ore e si inizializza ogni giorno alle 00:00._

### Pro
- Estremamente configurabile, come un classico cronotermostato, con extra funzioni:
    - possibilità di utilizzare più sonde di temperatura, ed una media mobile, per migliorare sensibilità e prontezza.
    - conteggio del tempo ON della caldaia (condizionatore).
    - grafico aggiornato real time.
    - uso delle features generali di IoTwebUI; allarmi (anche vocali), Logging, etc...
    - usabile per riscaldamento o raffrescamento
    - Il progetto è OpenSource e scritto in js, quindi è possibile modificarlo per adattalo ad esigenze specifiche. 
    - Può anche essere usato come monitor di un impianto esistente (caldaia centrale, termovalvole smart etc.): occorre collegate solo le sonde ma NON gli output, e devono essere copiati i profili di temperatura e gli orari ON/OFF dell'impianto monitorizzato.

### Contro
- tempi di risposta non rapidi, a  causa dei limiti di polling di Tuya Cloud (180s).
- necessità di un server (telefonino, top-tv, tablet, PC...) per **IoTwebUI** in funzione 24/7.
- le temporizzazioni possono essere condizionate dal carico del server e del browser: il funzionamento migliore si ha con le finestre visibili.    

_Queste considerazioni ne consigliano l'uso non come sistema primario, ma come dispositivo ausiliario (e.g. extra riscaldamento con stufette elettriche, raffrescamento estivo, climatizzazione di serre o terrari o acquari, verifica del funzionamento di termovalvole smart, etc...)._ 

### Installazione e Uso

1. **minima (senza UI)**
   * installare **IoTwebUI** sul server scelto (vedi [IoTwebUI installazione](https://github.com/msillano/IoTwebUI/blob/main/LEGGIMI22.md#installazione))<br>
   _nota: inizialmente eliminare sia allarmi che Log, e porre `tuyaInterval = 180` (uso continuo) oppure  `tuyaInterval = 60` (uso saltuario, più pronto)._

   * copiare nella dir di **IoTwebUI** i file necessari: _da [Github](https://github.com/msillano/IoTwebUI/tree/main/APP/Thermostat) alle dir `/addon` e `/html` di **IoTwebUI** installato._

   * Quando **IoTwebUI** funziona correttamente, aggiungere a **SmartLife** il [device virtuale](https://www.tuyaexpo.com/product/1104012)<br>
    _nota. basta leggere il QCODE con SmartLife._

   * Installare in **IoTwebUI** l'**x-device** `addon/thermostat01.js`<br> 
    _nota: istruzioni nel file stesso: occorre modificare il file `IoTwebUI.html`._

   * Completare la configurazione di  `addon/thermostat01.js`<br>
   _In particolare controllare `xroom` (room: deve esistere), `xhome` (home: deve esistere) dove deve andare l'x-device, `nodeVirt` (nome del device virtuale), e `sonde` (nome, funzione e scala dei termometri Tuya usati). Tutti questi dati si possono leggere nei tooltip di **IoTwebUI**_<br>
 _La programmazione della temperatura può essere fatta in un secondo tempo, come anche le impostazioni di `isHotMode`, `ECOHtemperature`, `ECOCtemperature`, `delta` ed `offset`._

    * Creare i richiesti 'tap-to-run' in SmartLife (e.g. `HOTTURNON`, `HOTTUROFF`) che  accendono/spengono il riscaldamento/raffreddamento, usando uno 'smart switch'.

    * Creare in  IoTwebUI le REGOLE necessarie, consiglio di modificare stabilmente `usrrules02.2.js`. Esempio, con i nomi di default e in caso di solo riscaldamento:
      
```
   THERMOSTAT01();                     // esegue la MACRO ad ogni loop
   if(GET("WEB Thermostat","HOTout", false)) SCENE("HOTTURNON"); 
   if(!GET("WEB Thermostat","HOTout", false)) SCENE("HOTTURNOFF");
```

Alternativa (esempio: NON usa i defaults, stanza = 'Bagno', NON usa HOME)
```
   THERMOSTAT01("caldobagno", "Bagno", null);     
   if(GET("caldobagno","HOTout", false)) SCENE("HOTTURNON"); 
   if(!GET("caldobagno","HOTout", false)) SCENE("HOTTURNOFF");
```
    
_Al termine lanciare **IoTwebUI** (file `run_me.bat`) ed accedere con **SmartLife** al device virtuale (default: `HeatingThermostat-vdev0`)._

2. **Installazione completa**
   * Oltre all'installazione 'minima', installare [RESTserver](https://github.com/msillano/IoTwebUI/blob/main/RESTserver/LEGGIMI-REST22.md#installazione-e-configurazione)
   
   * Completare la configurazione di  `html/thermostat01.html`<br> _In particolare controllare x_term (nome del x-device, cioè `xname`, usato nella REGOLA di lancio. V. sopra 'caldobagno')._
     
3. **Uso**

   * Lanciare **RESTserver** (file `rest02.2\run_server.bat`), poi iconizzare la finestra  `cmd.exe` (NON chiudere!).
   * Lanciare **IoTwebUI** (file `run_me.bat`) 
      * premere OK per  _INFO: Connected to REST server!_
      * premere bottone: _PRONTO... premere per continuare_
   * Lanciare l'**interfaccia** cliccando sul file  `html\thermostat01.html` (opzionale). Si aprirà nel browser preferito.   
    
4. **Troubleshooting**
   * Sia con **IoTwebUI** che con l'**interfaccia** click mouse destro, scegliere 'ispeziona..'. Poi 'console': lì appaiono i messaggi di errore.
   * Per  **RESTserver**  i messaggi appaiono mella finestra `cmd.exe`   
   *  vedi [issues](https://github.com/msillano/IoTwebUI/issues).

<hr>

Progetto OpenSource, Licenza MIT, (c)2024 marco sillano

_Questo progetto è un work-in-progress: viene fornito "così com'è", senza garanzie di alcun tipo, implicite o esplicite._     
      

     
