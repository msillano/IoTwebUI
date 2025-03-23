
#  APPLICAZIONI Tuya 
[english version](https://github.com/msillano/IoTwebUI/blob/main/APP/README.md)

_Per APP-Tuya intendiamo una applicazione dotata di propria interfaccia utente, che utilizza Tuya e IoTwebUI con REST, per realizzare gli obiettivi più svariati._
_Sono normalmente composte di almeno due file:_
* _una MACRO (**x-device**) che fa da middleware tra i singoli device e l'interfaccia utente, implementando anche la 'businnes logic'_
* _una semplice interfaccia utente specializzata (in genere in HTML)_

_Per comodità di uso li abbiamo separati in questa dir: in fase di installazione i file vanno copiati nelle dir 'addon/' e 'html/' della vostra installazione._  

**Tutte le APP disponibili sono presentate in [questa pagina](https://github.com/msillano/IoTwebUI/blob/main/APP/Overviews.md).**


**Note di programmazione**<br>

* Dettagli sul [Pattern MVP](https://github.com/msillano/IoTwebUI/blob/main/html/clima01-leggimi.md#pattern-mvp) 
* "Vantaggi di questa architettura" e 'Processo di sviluppo' in [testBattery01](https://github.com/msillano/IoTwebUI/blob/main/addon/TestBattery01_leggimi.pdf)
* "Interazioni Tuya <=> IOTwebUI" in [questo documento](https://github.com/msillano/IoTwebUI/blob/main/APP/LEGGIMI.md#interazioni-tuya--iotwebui)

### Installazione e Uso
>>_nota: molte operazioni di installazione e configurazione richiedono da parte dell'utente l'editing di file source, a causa dei limiti delle WEBBAPP. Usare le solite avvertenze: Fare una copia del file prima di ogni modifica. Usare un editor UTF8 (io uso Notepad-plusplus). Attenzione a NON ALTERARE niente altro (soprattutto virgole ',' ed apici '"' e "`")._

Istruzioni comuni e generali. Per ulteriori dettagli vedere le singole APP.

1. **minima (senza UI)**

![image](https://github.com/user-attachments/assets/57662994-d2b9-43ac-ac72-2cb9101efbab)

   * installare **IoTwebUI** sul server scelto (vedi [IoTwebUI installazione](https://github.com/msillano/IoTwebUI/blob/main/LEGGIMI30.md#installazione))<br>
   _nota: inizialmente eliminare (file `config.js`) sia allarmi che Log, e porre `tuyaInterval = 180` (uso continuo) oppure  `tuyaInterval = 60` (uso saltuario, più pronto, min. 20s)._

   * copiare nella dir di **IoTwebUI** i file necessari: _da [Github APP](https://github.com/msillano/IoTwebUI/tree/main/APP) alle dir `/addon` e `/html` di **IoTwebUI** installato._

   * Installare in **IoTwebUI** l'**x-device** richiesta.<br> 
    _nota: istruzioni nel file stesso  `addon/xxxxx0y.js`: occorre modificare il file `IoTwebUI.html`._

   * Completare la configurazione di  `addon/xxxxx0y.js`<br>
   _In particolare controllare `xroom` (room: deve esistere), `xhome` (home: deve esistere) dove deve andare l'x-device, seguendo le istruzione nel file._<br>
   
   * Se richiesto dalla APP creare i 'tap-to-run' in SmartLife per agire sui device Tuya, ovvero quant'altro necessario fare in Tuya (e.g. _Thermostat_ richiede l'installazione di una specifica _device virtuale_).

  * Creare in  IoTwebUI le REGOLE necessarie, consiglio di modificare stabilmente `usrrules02.2.js`. Sono indicate nel file stesso `addon/xxxxx0y.js`:      

2. **Installazione completa** (User Inteface)
   _Alcune APP funzionano perfettamente senza UI (e.g. Thermostat) per altre l'UI è insispensabile_
   
![image](https://github.com/user-attachments/assets/b038e96c-012d-48d6-9c57-d0151aad58bc)

   * Oltre all'installazione 'minima', installare anche [RESTserver](https://github.com/msillano/IoTwebUI/blob/main/RESTserver/LEGGIMI-REST22.md#installazione-e-configurazione)
   
   * Completare la configurazione di  `html/xxxxxx0y.html`<br> _In particolare controllare x_name (nome del x-device, cioè `xname`) usato nella REGOLA di lancio. V. sopra. Controllare eventuali parametri e customizzazioni._
     
2. **Uso - fino a ver. 2.2**

   * Lanciare **RESTserver** (file `rest02.2\run_server.bat`), poi iconizzare la finestra  `cmd.exe` (NON chiudere!).
   * Lanciare **IoTwebUI** (file `run_me.bat`) 
       * premere OK per  _INFO: Connected to REST server!_
       * premere bottone: _PRONTO... premere per continuare_
   * Lanciare l'**interfaccia** cliccando sul file  `html\xxxxxx0y.html` (opzionale). Si aprirà nel browser preferito.   

3. **Uso - ver. 3.0 - panel menu**

    * Lanciare **IoTwebUI 3.0** (file `APP_me.bat` - richiede aggiornamento delle dir!) per IoTwebUI, REST e menu
       * premere OK per  _INFO: Connected to REST server!_
       * premere bottone: _PRONTO... premere per continuare_
    * Ora potete controllare le APP che avete installato sul vostro sistema dal menu.

Successivamente **IoTwebUI** e l'**interfaccia** possono essere chiusi e rilanciati come si vuole.

4. **Limits**
   * **IoTwebUI** una sola istanza
   * **interface** anche più istanze se specificato nele istruzioni.

5. **Troubleshooting** 
   * Sia con **IoTwebUI** che con l'**interfaccia** click mouse destro, scegliere 'ispeziona..'. Poi 'console': lì appaiono i messaggi di errore.
   * Per  **RESTserver**  i messaggi appaiono nella finestra di `cmd.exe`   
   *  vedi [issues](https://github.com/msillano/IoTwebUI/issues).

<hr>

### Interazioni Tuya <=> IOTwebUI
Facciamo alcune considerazioni utili nella fase di progetto di una APP, o, più in generale, nella organizzazione delle REGOLE di IoTwebUI.

_Come strategia generale, è opportuno che la logica sia implementata il più possibile nelle 'scene' Tuya, e meglio ancora con 'local linkage' per avere la massima affidabilità e robustezza!_ <br> I  menu e i panel, le APP, etc. sono però implementate in IOTwebUI, e quindi vediamo nella loro globalità le possibili interazioni **Tuya** <=> **IoTwbUI**.

1. **IoTwebUI** legge i dati di tutti i dati visibili (<sup>1</sup>) dei device **Tuya** in polling (ogni 120 secondi - min. 20s - vedi `tuyaInterval` in `config.js`).
2. Le 'REGOLE' **IoTwebUI** sono tutte eseguite subito dopo la lettura  dei dati, per usare rapidamente i dati aggiornati.
     * _Sono possibili dei run delle REGOLE extra, per avere risposte più pronte: quando una regola ne chiama un'altra (MACRO TRIGRULE(name)) oppure quando l'interfaccia utente di una APP aggiorna un valore di un **x_device** con REST, etc._
3. Gli **x-device** sono device virtuali a tutti gli effetti, ma NON sono visibili da **Tuya**, esitono solo per  **IoTwebUI**
4. _Funzionalità delle REGOLE di  **IoTwebUI**_: una **REGOLA** può:
    * LEGGERE in qualunque momento tutte le proprietà visibili (<sup>1</sup>) di un **device Tuya** (MACRO GET())
    * LEGGERE le proprietà estese (<sup>1</sup>) di un device Tuya tramite un **x-mirror**
    * LEGGERE E SCRIVERE tutte le proprietà di un **x_device** (MACRO GET(), MACRO SETXDEVICESTATUS()) 
    * ATTIVARE un `tap_to_run` **Tuya**  (MACRO SCENE())<br>
     _nota: Tramite un `tap_to_run`  **IoTwebUI** può ASSEGNARE un valore fisso ad una qualsiasi proprietà accessibile (<sup>1</sup>) dei **device Tuya**_.
5. _Funzionalità delle SCENE di  **Tuya**_: una **SCENA** può:
    * LEGGERE e SCRIVERE in qualunque momento le proprietà di un **device Tuya** limitatamente a quelle accessibili (<sup>1</sup>).
    * NON può accedere agli **x-device**
6. Da **Tuya** si può attivare un una REGOLA di **IoTwebUI** indirettamente, basandosi sui valori di  proprietà visibili (<sup>1</sup>) dei device Tuya (reali o virtuali), in tre modi <br>
   1. con una sola condizione sul valore di una proprietà usando gli ALARMI **IoTwebUI** e una REGOLA come azione.
   2. tramite una (o più) condizioni impostate in una REGOLA **IoTwebUI** ad hoc.<br>
   3. tramite una proprietà di un `device virtuale` (particolarmente indicato il `countdown` di un relay, non funzionale nei device virtuali, e non azzerato ai cambi di stato - purtroppo NON sempre presente. e.g. `BRIDGE-vdevo.countdown_1`) dedicata a fungere da 'BRIDGE'. <br> Questa tecnica deriva da tuyaDAEMON (vedi [tuyaTRIGGER](https://github.com/msillano/tuyaDAEMON/tree/main/tuyaTRIGGER)).
      * Lato **Tuya** si imposta un valore predefinito per `BRIDGE-vdevo.countdown_1` (per semplificare, uno tra 1440 valori diversi, da 00:00 a 24:00).<br> 
Inoltre esiste il tap-to-run BRIDGEACK, che esegue `BRIDGE-vdevo.countdown_1 = 0`, per evitare trigger multipli.
      * Lato **IoTwebUI** REGOLE abbiamo:
```
 var _trig = GET('BRIDGE-vdevo','countdown_1', false) ;
// case for RULE/action selector:
 if (_trig == 3600) SCENE('BRIDGEACK'),POP("Countdown","valore: "+_trig);  // 3600s = 01:00    
 if (_trig == 7200) SCENE('BRIDGEACK'),POP("Countdown","valore: "+_trig);  // 7200s = 02:00  
```  
    
(<sup>1</sup>) nota:
  _Si possono definire diversi insiemi differenti di  proprietà legate ad un **device Tuya**. In questo contesto ci interessano:_<br>
* _**visibili**: sono le proprietà che **IoTwebUI** legge ogni loop da TuyaCloud, sempre  disponibili: usate nei tooltip, leggibili nelle REGOLE con GET(), etc..._<br> _Sono le proprietà che mostra l'APP 'Explore device'-'IoTwebUI' in `status`._
* _**accessibili**: sono le proprietà leggibili in una `condizione` e scrivibili con una `azione` nelle **SCENE Tuya**. Sono predefinite dal produttore per ogni device. <br> _Appaiono in `SmartLife/Tuya Smart` quando si crea una AUTOMAZIONE._
* _**estese**: sono proprietà non visibili che l'addon `cloner01` può leggere da **TuyaCloud**, e copiare in un x-device 'mirror' (da usare solo se necessario, raddoppia gli accessi al Cloud ad ogni loop)_ <br> _Sono le proprietà che mostra l'APP 'Explore device'-'Tuya Schema'._

<hr>
  
Progetto OpenSource, Licenza MIT, (c)2024 marco sillano

IoTwebUI, Rest, addon, APP sono un work-in-progress: vengono forniti "così come sono", senza garanzie di alcun tipo, implicite o esplicite.
<hr>

