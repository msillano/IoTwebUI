
#  APPLICAZIONI Tuya 
[english version](https://github.com/msillano/IoTwebUI/blob/main/APP/README.md)

_Per APP intendiamo una applicazione dotata di propria interfaccia utente, che utilizza Tuya e IoTwebUI con REST, per realizzare gli obiettivi più svariati._
_Sono normalmente composte di almeno due file:_
* _una MACRO (**x-device**) che fa da middleware tra i singoli device e l'interfaccia utente, implementando anche la 'businnes logic'_
* _una semplice interfaccia utente specializzata (in genere in HTML)_

_Per comodità di uso li abbiamo separati in questa dir: in fase di installazione i file vanno copiati nelle dir 'addon/' e 'html/' della vostra installazione._  

**Note di programmazione**<br>

* Dettagli sul [Pattern MVP](https://github.com/msillano/IoTwebUI/blob/main/html/clima01-leggimi.md#pattern-mvp) 
* "Vantaggi di questa architettura" e 'Processo di sviluppo' in [testBattery01](https://github.com/msillano/IoTwebUI/blob/main/addon/TestBattery01_leggimi.pdf)

### Installazione e Uso
>>_nota: molte operazioni di installazione e configurazione richiedono da parte dell'utente l'editing di file source, a causa dei limiti delle WEBBAPP. Usare le solite avvertenze: Fare una copia del file prima di ogni modifica. Usare un editor UTF8 (io uso Notepad-plusplus). Attenzione a NON ALTERARE niente altro (soprattutto virgole ',' ed apici '"' e "`")._

Istruzioni comuni e generali. Per ulteriori dettagli vedere le singole APP.

1. **minima (senza UI)**
   * installare **IoTwebUI** sul server scelto (vedi [IoTwebUI installazione](https://github.com/msillano/IoTwebUI/blob/main/LEGGIMI22.md#installazione))<br>
   _nota: inizialmente eliminare (file `config.js`) sia allarmi che Log, e porre `tuyaInterval = 180` (uso continuo) oppure  `tuyaInterval = 60` (uso saltuario, più pronto)._

   * copiare nella dir di **IoTwebUI** i file necessari: _da [Github APP](https://github.com/msillano/IoTwebUI/tree/main/APP) alle dir `/addon` e `/html` di **IoTwebUI** installato._

   * Installare in **IoTwebUI** l'**x-device** richiesta.<br> 
    _nota: istruzioni nel file stesso  `addon/xxxxx0y.js`: occorre modificare il file `IoTwebUI.html`._

   * Completare la configurazione di  `addon/xxxxx0y.js`<br>
   _In particolare controllare `xroom` (room: deve esistere), `xhome` (home: deve esistere) dove deve andare l'x-device, seguendo le istruzione nel file._<br>
   
    * Se richiesto dalla APP creare i 'tap-to-run' in SmartLife per agire sui device Tuya, ovvero quant'altro necessario fare in Tuya (e.g. _Thermostat_ richiede l'installazione di una specifica _device virtuale_).

    * Creare in  IoTwebUI le REGOLE necessarie, consiglio di modificare stabilmente `usrrules02.2.js`. Sono indicate nel file stesso `addon/xxxxx0y.js`:      

2. **Installazione completa** (User Inteface)
   _Alcune APP funzionano perfettamente senza UI (e.g. Thermostat) per altre l'UI è insispensabile_
   
   * Oltre all'installazione 'minima', installare [RESTserver](https://github.com/msillano/IoTwebUI/blob/main/RESTserver/LEGGIMI-REST22.md#installazione-e-configurazione)
   
   * Completare la configurazione di  `html/xxxxxx0y.html`<br> _In particolare controllare x_term (nome del x-device, cioè `xname`, usato nella REGOLA di lancio. V. sopra ed eventuali parametri e customizzazioni._
     
4. **Uso**

   * Lanciare **RESTserver** (file `rest02.2\run_server.bat`), poi iconizzare la finestra  `cmd.exe` (NON chiudere!).
   * Lanciare **IoTwebUI** (file `run_me.bat`) 
      * premere OK per  _INFO: Connected to REST server!_
      * premere bottone: _PRONTO... premere per continuare_
   * Lanciare l'**interfaccia** cliccando sul file  `html\xxxxxx0y.html` (opzionale). Si aprirà nel browser preferito.   

Successivamente **IoTwebUI** e l'**interfaccia** possono essere chiusi e rilanciati come si vuole.

5. **Limiti:**
   * **IoTwebUI** una sola istanza.
   * **interfaccia** anche più istanze se specificato nelle istruzioni specifiche.
    
6. **Troubleshooting**
   * Sia con **IoTwebUI** che con l'**interfaccia** click mouse destro, scegliere 'ispeziona..'. Poi 'console': lì appaiono i messaggi di errore.
   * Per  **RESTserver**  i messaggi appaiono nella finestra di `cmd.exe`   
   *  vedi [issues](https://github.com/msillano/IoTwebUI/issues).

<hr>

