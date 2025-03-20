
**Introduzione:**

 Volevo esplorare le possibilità di modifica (modding) degli interruttori smart Tuya, partendo dalla [constatazione](https://www.facebook.com/groups/tuyaitalia/permalink/1601909300443417/) che la tensione ai capi dell'interruttore fisico di controllo è tipicamente una tensione continua a bassa tensione (3.3V o 5V), isolata galvanicamente dal circuito di potenza a 230V. Questa caratteristica apre scenari interessanti per l'integrazione di sensori e microcontrollori, permettendo di creare 'device Tuya custom'.

### Analisi di un Interruttore Smart

* **Dispositivo di Test:** Un interruttore smart [Zigbee economico](https://it.aliexpress.com/item/1005005875932568.html) è stato utilizzato come piattaforma di test.

![full001](https://github.com/user-attachments/assets/5526c2b4-8f3b-400d-9d63-45ec7e69cd55)

* **Identificazione dei Punti di Alimentazione:** L'analisi del circuito ha rivelato la felice presenza sia di tensione a 5V (per l'alimentazione del relè) che a 3.3V (per l'elettronica di controllo), entrambe isolate dalla rete elettrica. I condensatori elettrolitici più grandi sono stati identificati come punti di prelievo comodi per queste tensioni (vedi frecce nella figura ingrandita).
* **Caratteristiche del Pin di Input:** Il pin di input dell'interruttore è collegato a un resistore da 6.8K verso +3.3V, con una soglia di attivazione di circa 1.4V.
* **Warning:** Una serie ravvicinata di ON/OFF (chattering, contatto instabile...) mette lo switch in una condizione di 'pairing' (luce blu lempeggiante) da cui si esce solo riassociandolo all'HUB (con cambio di nome automatico).


## Esempio 1: Rivelatore di Fiamma DIY

![smartodiy](https://github.com/user-attachments/assets/aa2f31be-f7fe-4c35-86f4-c6d47d3bf05e)

Da una [serie di post](https://www.facebook.com/groups/tuyaitalia/permalink/1543046892996325/), è risultato che NON esistono sul mercato allarmi Tuya per fiamme libere! Buona occasione per un dispositivo Tuya compatibile DIY.

![image](https://github.com/user-attachments/assets/bfd57a5a-3507-4ab2-805d-2bc537dfc0cd)

 * È stato realizzato un prototipo di rivelatore di fiamma utilizzando un sensore IR ad alta sensibilità e un comparatore con soglia regolabile utilizzando un [modulo per Ardiuno](https://it.aliexpress.com/item/1005007581633099.html).
 * _nota: questo modulo fa parte di una serie di [37 sensori per Arduino](https://it.aliexpress.com/w/wholesale-37-arduino-sensor.html) molto diffusa_.
 * Il modulo è alimentato a 3.3V e il suo output digitale è collegato al pin di input dell'interruttore smart.
 * Il collegamento è molto semplice, in tutto tre fili: GND, +3.3V, DO/IN: in pratica una sola saldatura (+3.3V).
 * Il sistema ha dimostrato un'elevata sensibilità, rilevando la fiamma di un accendino a distanze di 50-70 cm.

![definitivo](https://github.com/user-attachments/assets/f4bbe185-4abd-4b20-b782-9afa9a90b78f)

 * Versione definitiva. E' collegato internamente un solo filo, a +3.3V. Massa ed input sono presi dai morsetti esterni! _Nota: l'uso di 3 connettori permette di sostituire il modulo 'fire' con [altri moduli della serie](https://www.adrirobot.it/37_in_1_sensor_module_board_set_kit_for_arduino/)_!
 
<hr> 

## Esempio 2:  BLINK-ESP01, integrazione Tuya + ESP3266

![esp-01s-esp8266-pinout-mischianti](https://github.com/user-attachments/assets/7e756b2f-d20e-42cf-ace9-d15ed1fb66f8)

Questo progetto usa il microcontrollore ESP01S per implementare un semplice 'blink' a relay. <br>
_Per una introduzione generale a ESP01 [vedi qui](https://www.ariat-tech.it/blog/esp-01-functional-features,pin-configuration,applications-and-relationship-with-esp-01s-and-esp8266.html)_.<br>
_Invece una introduzione generale all'uso di ESP3266 in device custom si trova in [questo articolo](https://github.com/msillano/tuyaDEAMON-applications/wiki/note-5:-Watchdog-for-IOT#note-esp-01-programming)_.

![esp01-02](https://github.com/user-attachments/assets/ea6eaf65-409b-411d-b6c5-6f81525e3bfc)
Sinistra: programmazione dell'ESP01S con adattatore via USB.  Destra: finito.

Per rimanere sul semplice, come è il caso per un _proof of concept_, prendiamo la demo Arduino 'blink' forse il programmino più semplice e famoso, solo lo implementiamo con un timer. In pratica trasformiamo lo smart relay in un lampeggiatore.

### Hardware

Modding smart switch: si usano gli stessi 3 collegamenti usati in Esempio 1: uno interno (3.3V) e  due sui morsetti: S1 (GND) e S2 (IN).

### Firmware

Sia l'installazione che l'uso di Arduino per programmare un ESP01s sono molto semplici: occorre solo un adattatore USB. Per dettagli vedi il progetto [Watchdog03](https://github.com/msillano/tuyaDEAMON-applications/wiki/note-5:-Watchdog-for-IOT#watchdog03-esp01-relay--arduino).

nota: Il cambio di modo (run/programmazione) avviene allo startup dell'ESP01 e il modo programmazione richiede il PIN IN0 a massa all'avvio. Ho quindi aggiunto un piccolo switch al programmatore (in alcuni modelli è già presente) e quindi la procedura è la seguente:
* switch con IN0 a GND (programmazione)
* infilare il programmatore nella presa USB
* programmazione con Arduino
* estrarre il programmatore dalla presa USB
* switch con IN0 aperto (run)
* Aprire su Arduino il terminale seriale a 9600 baud.
* infilare il programmatore nella presa USB: il programma parte automaticamente
* debug del programma con l'aiuto degli echo sul seriale

_ATTENZIONE: alcuni programmatori hanno ponticelli per scegliere 5V o 3.3V. ESP01S richiede 3.3V!_

Nella dir [modding test](https://github.com/msillano/IoTwebUI/tree/main/DIY%20ESP3266/Modding%20switch) sono presenti due file; 
* `modding-ESP.ino` il codice completo per **ESP01S** di questo **blink-esp**.
* `ESP3266-template01.ino` il codice delle comunicazioni HTTP, ma esclusa la parte specifica relativa al blinking, da usare come punto di partenza per progetti **ESP3266 custom**

### controllo HTTP
Dobbiano aggiungere qualche funzionalità di controllo: ON/OFF e la possibilità di cambiare il periodo. Non possiamo utilizzare in alcun modo il relay, già usato come device di output.<br> 
Per  gestire questi parametri 'extra' sfruttiamo le capacità di ESP3266 per implementare due interfacce WiFi-HTTP alternative:

**Interfaccia WEB: URL `http://192.168.1.23/`**

 ![Screenshot 2025-03-17 211306](https://github.com/user-attachments/assets/7a8d1dd8-a853-4e5d-a81a-ba102655fd23)
 
   Chiamando da un browser l'indirizzo associato a ESP01 (custom, definito nel codice) ci si collega ad un server WEB (port 80) creato da ESP01. La risposta del server è una pagina WEB con una semplice interfaccia interattiva che presenta informazioni sullo stato e permette gli aggiornamenti.

**Interfaccia HTTP GET e REST**

   Per maggiore comodità è presente una seconda interfaccia, sempre via server WEB, ma che utilizza il protocollo REST ed il protocollo GET+ parametri (lo stesso dei 'form' HTML). URL usate: 

* `http://192.168.1.23/ON`   // REST
* `http://192.168.1.23/OFF`  // REST
* `http://192.168.1.23/ESPtuya?loop=xxxx` (xxx = periodo in ms)  // GET + prams

La risposta è TESTO e contiene 'OK' o 'BAD'. (Alternativa: usare risposte JSON, quando devono essere forniti più dati).
Si posono provare anche con un browser, scrivendo direttamente gli URL precedenti.<br>
Queste interfacce sono pensate non per usi interattivi ma per usi programmatici in qualsiasi APP o linguaggio in grado di inviare richieste HTPP (in particolare, da IoTwebUI).

_Volendo si potrebbe usare anche un'interfaccia MQTT, ma è più complessa e richiede un broker MQTT esterno._

**Esempi di uso con IOTwebUI**

* La strada più semplice sono due 'REGOLE con nome' (equivalenti ai tap-to-run Tuya) che appariranno nella pagina _'tap-to-run'/'user RULES' _ di **IoTwebUI**:
```
if (TRIGBYNAME("BLINK on"))   REST("http://192.168.1.23/ON"), BEEP();
if (TRIGBYNAME("BLINK off"))  REST("http://192.168.1.23/OFF"), BEEP();
```
![image](https://github.com/user-attachments/assets/930ff85a-4096-465b-8727-6ac591d3dfff)

* E' comodo usare uno _smart switch virtual Tuya_ per implementare un 'proxy' per controllore lo stato ON/OFF di ESP3266: quando il proxy è ON, BLINK-ESP01S lampeggia, altrimenti no. Fatto questo, si può controllare il proxy nelle 'scene' Tuya standard!

![image](https://github.com/user-attachments/assets/5de0a999-f4a5-4636-b084-b8167fcea8fa)
In rosso: uscita di BLINK-ESP01S  In blu: stato del 'proxy' di controllo.
 
Queste due regole di IoTwebUI copiano lo stato di 'blink-proxy.switch_1' su ESP3266, via rest, usando il comando apposito (in questo caso la risposta è TEXT - non JSON - e quindi usiamo la MACRO `REST()`).
```
if(ISTRIGGERH(!!GET("blink-proxy", "switch_1", false))) REST("http://192.168.1.23/ON"), BEEP();
if(ISTRIGGERL(!!GET("blink-proxy", "switch_1", false))) REST("http://192.168.1.23/OFF"), BEEP();
```
nota: questi comandi presentano una latenza dovuta ai loop di TuyaCloud!


<hr>

**Considerazioni Generali:**

* L'isolamento galvanico tra il circuito di controllo a bassa tensione e il circuito di potenza a 230V è un aspetto cruciale per la sicurezza e la possibilità di effettuare modifiche.
* La conoscenza delle caratteristiche elettriche del pin di input (tensione, corrente, soglia di attivazione) è fondamentale per l'integrazione di sensori e microcontrollori.
* L'utilizzo di un microcontrollore ESP32 apre la strada a funzionalità più avanzate, come l'elaborazione di segnali complessi e la comunicazione wireless.
