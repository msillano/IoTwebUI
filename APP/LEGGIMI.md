
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
* "

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

_Come strategia generale, è opportuno che la logica sia implementata il più possibile nelle 'scene' Tuya, e meglio ancora con 'local linkage' per avere la massima affidabilità e robustezza!_ I  menu e i panel, le APP, etc. sono però implementate in IOTwebUI, e quindi vediamo nella loro globalità le possibili interazioni **Tuya** <=> **IoTwbUI**.

1. **IoTwebUI** legge i dati di tutti i device **Tuya** in polling (ogni 120 secondi - min. 20s - vedi `tuyaInterval` in `config,js`).
2. Le 'REGOLE' **IoTwebUI** sono tutte eseguite subito dopo la lettura  dei dati, per usare rapidamente i dati aggiornati.
     * Sono possibili dei run delle REGOLE extra, per avere risposte più pronte: quando una regola ne chiama un'altra (MACRO TRIGRULE(name)) oppure quando l'interfaccia utente di una APP aggiorna un valore di un **x_device** con REST, etc.
3. Funzionalità delle REGOLE di  **IoTwebUI**: una **REGOLA** può:
    * LEGGERE in qualunque momento tutte le proprietà accessibili(<up>1</up>) di un **device Tuya** (MACRO GET())
    * LEGGERE E SCRIVERE tutte le proprietà di un **x_device** (MACRO GET(), MACRO SETXDEVICESTATUS()) 
    * ATTIVARE un `tap_to_run` **Tuya**  (MACRO SCENE())
     nota: Tramite un `tap_to_run` si può ASSEGNARE un valore fisso ad una qualsiasi proprietà modificabile dei **device Tuya**.
4. Funzionalità delle SCENE di  **Tuya**: una **SCENA** può:
    * LEGGERE e SCRIVERE in qualunque momento le proprietà di un **device Tuya** limitatamente a quelle accessibili .
    * NON può accedere agli **x-device**
    * Può attivare un una REGOLA indirettamente in due modi
            a) tramite una (o più) condizioni impostate nella REGOLA su valori di proprietà dei device.
            b) derivato da (a): usare una proprietà di un device (reale o virtuale, e.g. countdown) dedicata a fungere da 'bridge'.
      
(<up>1</up>) nota:
  _Abbiamo diversi insiemi di  proprietà legate ad un **device Tuya**:_<br>
* _**visibili**: sono quelle che **IoTwebUI** legge da Tuya Cloud, usate nei tooltip, leggibili nelle REGOLE con GET()_
* _**accessibili**: sono le proprietà leggibili in una `condizione` e scrivibili con una `azione` nelle **SCENE Tuya**_
* _**estese**: sono proprietà non visibili che l'addon `cloner01` può leggere da **TuyaCloud**, e copiare in un x-device 'mirror' (da usare solo se necessario, raddoppia gli accessi al Cloud a ogni loop)_ 

  <hr>
Progetto OpenSource, Licenza MIT, (c)2024 marco sillano

IoTwebUI, Rest, addon, APP sono un work-in-progress: vengono fornite "così come sono", senza garanzie di alcun tipo, implicite o esplicite.
<hr>

