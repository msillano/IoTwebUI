# WEB Termostato 

Questo è un termostato completo SW che utilizza le misure di uno (o più) sonde di temperatura Tuya per controllare uno smart switch per il riscaldamento (raffrescamento).
E' l'unione di tre elementi:

1. Interfaccia SmarLife (locale/remota) ottenuta con un **device virtuale**
2. Un **x-device** che contiene tutta la logica di funzionamento
3. Un'interfaccia **WEB grafica** (opzionale) 

### Virtual 
L'interfaccia su SmartLife di uso anche remoto, utilizza un [device virtuale](https://www.tuyaexpo.com/product/1104012), e permette le principali funzioni di controllo utente:

![](https://github.com/msillano/IoTwebUI/blob/main/pics/virtual%20thermo.png?raw=true)

_Switch:_ ON/OFF, agisce sul riscaldamento/raffrescamento <br>
_Mode:_ scelta tra Manual, ECO, Program. 
   * Manual: temperatura target regolabile in step di 0.5 °C
   * ECO è una temperatura predefinita (configurabile).
   * Program: per definire il profilo di temperatura non si usa l'intefeccia virtuale (limitata a 4 fasce giornaliere), ma è impostabile in `addon/thermostat01.js`, senza limiti di intervalli giornalieri.<br>
_Setpoint:_  La temperatura desiderata (mode _Manual_) oppure una modifica temporanea alla temperatura programmata (mode _Program_).<br>
_ChildLoch_, _Weekly Program_, _Timer_ (tutte in impostazioni) NON sono disponibili nel 'device virtuale':  _Weekly Program_ e _Timer_ hanno implementazioni alternative in **x-device**.

_nota: le funzioni legate all'HW non sono, ovviamente, utilizzabili in un device virtuale! (Sono cancellate nella figura)_

### x_device 
Un'**x_device** (WEB Thermostat) si occopa di:
   1. Connessione con i _sensori di temperatura_ (reali), uno o più di uno: è usata una media mobile per migliorare la sensibilità e ridurre il rumore.
   2. Connessione con il _device virtuale_ per leggere i valori scelti dall'utente.
   3. Logica di funzionamento del termostato:
       * Alla temperatura letta dalle sonde è applicabile un `offset` di correzione (in `thermostat01.js`).
       * Effettua i paragoni con +/- `delta` regolabile (in `thermostat01.js`), è quindi un comparatore con isteresi. Consigliato 0.3°C
       * In modo 'auto' (i.e. Program) una variazione manuale di `Setpoint` ha effetto fino alla successiva temperatura programmata.
       * `TimeON` fornisce il tempo di accensione giornaliero (in ore). Il conteggio riparte ogni giorno alle 24:00
   4. Sono presenti _due uscite_: una per riscaldamento (`HOTout`) e una per raffrescamento (`COLDout`). Valori `true/false`.
  
  ![](https://github.com/msillano/IoTwebUI/blob/main/pics/IoTwebUI03.png?raw=true)
  
Tutti i dati sono visibili nel tooltip di IoTwebUI, quindi accessibili tramite 'RULE'.
In particolare servono due REGOLE (**IoTwebUI**) per agire sullo `swart switch` del riscaldamento (raffrescamento).
```  
    if(GET("WEB Thermostat","HOTout", false)) SCENE("HOTTURNON"); 
    if(!GET("WEB Thermostat","HOTout", false)) SCENE("HOTTURNOFF");
``` 
_`HOTTURNON` e `HOTTURNOFF` sono due 'tap-to-run' Tuya che accendono/spengono il riscaldamento: sono richiamate ad ogni loop (analogamente per il raffrescamento, se usato)._

TIMER: orario ON/OFF. Se il riscaldamento segue un orario predefinito, sono utili due 'automazioni' Tuya che accendano/spengano il device virtuale agli stessi orari:
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

WEEKLY PROGRAM è implemetato in `addon/thermostat01.js` in questo modo:
````
 var Tprg = [
        DAYMAP(16, "08:00", 20.5, "11:00", 16, "18:00", 21, "23:00"), // domenica
        DAYMAP(16, "08:00", 20, "11:00", 16, "18:00", 21, "23:00"), // lunedì
        <..etcetera..>
 ```
Dove è indicata una temperatura, seguita dall'orario di termine, circolare. Si legge:
```
domenica: dalle 23:00 alle  8:00 =>  16°
          dalle  8:00 alle 11:00 =>  20.5° 
          dalle 11:00 alle 18:00 =>  16°
          dalle 18:00 alle 23:00 =>  21°
 <..etcetera..>
```

Un'altro aspetto interessante è che si può usare un solo device virtuale per più x-device (e.g. uno per stanza) ognuno con le sue sonde, i suoi profili e uno 'smart relay' o una elettrovalvola comandata! Unica avvertenza creare e includere più file `thermostatXX.js` e cambiare il nome (`function THERMOSTATXX`(...)) ad ogni istanza.

### Interfaccia utente
**WEB thermostat x-device** è completo per funzionare. <br>
Se si desidera, **IoTwebUI** offre Allarmi e l'esportazione su file dei dati per chi desidera conservarli od eseguire ulteriori elaborazioni.<br>
E' disponibile una interfaccia WEB ad hoc, che utilizza **RESTserver**,  per avere sott'occhio tutti dati!<br>
_nota: l'interfaccia è del tutto opzionale, non interviene sulla logica di funzionamento di **WEB thermostat**._

_note: il grafico copre 24 ore e si inizializza ogni giorno alle 00:00._

### Pro
- Estremamente configurabile, come un classico termostato, con extra funzioni:
    - possibilità di utilizzare più sonde di temperatura, ed una media mobile, per migliorare sensibilità e prontezza.
    - conteggio del tempo ON della caldaia (condizionatore).
    - grafico aggiornato real time.
    - uso delle features generali di IoTwebUI; allarmi (anche vocali), Logging, etc...
    - usabile per riscaldamento o raffrescamento
- Può anche essere usato come monitor di un impianto esistente (caldaia centrale, termovalvole smart etc.): occorre collegate solo le sonde ma NON gli output, e devono essere copiati i profili di temperatura e gli orari ON/OFF.

### Contro
- tempi di risposta non rapidi, a  causa dei limiti di polling di Tuya Cloud (180s).
- necessità di un server (telefonino, top-tv, tablet, PC...) IoTwebUI in funzione 24/7.
- le temporizzazioni sono condizionate dal carico del server e del browser: il funzionamento migliore si ha con le finestre visibili.    

_Queste considerazioni ne consigliano l'uso non come sistema primario, ma come dispositivo ausiliario (e.g. extra riscaldamento con stufette elettriche, raffrescamento estivo, climatizzazione di serre o terrari o acquari, verifica del funzionamento di termovalvole smart, etc...)._ 

### Installazione
1. **minima (senza UI)**
   * installare **IoTwebUI** sul server scelto (vedi [IoTwebUI installazione](https://github.com/msillano/IoTwebUI/blob/main/LEGGIMI22.md#installazione)<br>
   _nota: inizialmente eliminare sia allarmi che Log, e porre `tuyaInterval = 180` (uso continuo) oppure  `tuyaInterval = 60` (uso saltuario, più pronto)._

   * copiare nella dir di **IoTwebUI** i file necessari: da [Github](https://github.com/msillano/IoTwebUI/tree/main/APP/Thermostat) alle dir `/addon` e `/html` di **IoTwebUI** installato.

   * Quando IoTwebUI funziona correttamente, aggiungere a **SmartLife** il [device virtuale](https://www.tuyaexpo.com/product/1104012)<br>
    _nota. basta leggere il QCODE con SmartLife._

   * Installare in **IoTwebUI** l'**x-device** `addon/thermostat01.js`<br> 
    _nota: istruzioni nel file stesso: occorre modificare il file `IoTwebUI.html`._

   * Completare la configurazione di  `addon/thermostat01.js`<br>
   _In particolare controllare `xroom` (room: deve esistere), `xhome` (home: deve esistere), `nodeVirt` (nome del device virtuale), e `sonde` (nome, funzione e scala dei termometri TYuya usati). Tutti questi dati si possono leggere nei tooltip di **IoTwebUI**_<br>
 _La programmazione della temperatura può essere fatta in un secondo tempo, come anche la taratura di `ECOtemperature`, `delta` ed `offset`._

    * Creare in  IoTwebUI le REGOLE necessarie, consiglio di modificare stabilmente `usrrules02.2.js`. Esempio, in caso di solo riscaldamento:
```
   THERMOSTAT01();
   if(GET("WEB Thermostat","HOTout", false)) SCENE("HOTTURNON"); 
   if(!GET("WEB Thermostat","HOTout", false)) SCENE("HOTTURNOFF");
```
    * Creare i richiesti 'tap-to-run' in SmartLife (e.g. `HOTTURNON`, `HOTTUROFF`) che  accendono/spengono il riscaldamento/raffreddamento, usando uno 'smart switch'.
    
    *  lanciare **IoTwebUI** (file `run_me.bat`) ed accedere con **SmartLife** al device virtuale (

2. **Completa**
   * Installare [RESTserver](https://github.com/msillano/IoTwebUI/blob/main/RESTserver/LEGGIMI-REST22.md#installazione-e-configurazione)
   
   * Completare la configurazione di  `html/thermostat01.html`<br> _In particolare controllare x_term (nome del x-device, cioè `xname`, usato nella REGOLA di lancio),  `HOTdevId`  e `HOTcode` (sono i dati dello smart switch di riscaldamento, default usare `x_term` e `HOTout`) e `COLDdevId`, `COLDcode`  (sono i dati dello smart switch di raffrescamento, default usare `x_term` e `COLDout`)._
     
   * Lanciare **RESTserver** (file `rest02.2/run_server.bat`), lanciare **IoTwebUI** (file `run_me.bat`) ed aprire `html/thermostat01.html` in un browser.
   
     
     
     
      

     
