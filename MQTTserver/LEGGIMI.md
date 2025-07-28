<h1>Metodi di integrazione di sub-device Zigbee di terze parti nell'ecosistema Tuya</h1>

[English version](https://github.com/msillano/IoTwebUI/blob/main/MQTTserver/README.md)

_Attualente (luglio 2025) Tuya accetta device Zigbee di terze parti ( con alcuni limiti, vedi https://www.tuyaos.com/viewtopic.php?t=2688 ) mentre rifiuta completamente il "pairing" ai device Tuya "non autorizzati" - Cioè i device Tuya Zigbee con chip non Tuya originali (notizie ancora incerte, vedi post https://www.facebook.com/groups/tuyaitalia/permalink/1678413936126286/ )._

Se un utente ha un parco importante di device Zigbee, con molte scene di controllo, la soluzione zero dovrebbe consistere nel ricomprare i device 'non autorizzati', ma questa volta di marche note ed affidabili!

Rimane però il problema di come utilizzare i device Zigbee 'bannati' ed i device Zigbee di terze parti non compatibili Tuya. Ho provato diverse soluzioni, alcune presentate qui in ordine crescente di complessità e prestazioni. Ogni utente può individuare la soluzione che meglio risponde alle sue esigenze!

_**Nota generale**: Le automazioni essenziali è oppurtuno siano implementate usando solo Tuya, magari con 'local linkage'! Ogni applicazione aggiunta riduce l'affidabilità ed aumenta la latenza!<br> 
Quindi i device Zigbee di cui parliamo qui, con le relative soluzioni, saranno meglio utilizzati in applicazioni accessorie, di uso sporadico e non in ruoli chiave nella domotica stabile!_


<h3>SOLUZIONE 1: SLZB-06 (zigbee Hub) stand-alone</h3>

Ho preso e testato come adapter Zigbee, non Tuya compatibile, il modello **SLZB-06p7** di progettazione Ukraina - sono disponibili vari modelli vedi http://smlight.tech/manual/slzb-06/guide/slzb-models-overview/ ) - che ha caratteristiche molto interessanti!   
Ha vari modi di funzionamento, è pronto all'uso con zigbee2mqtt (non occorre flashare FW),  e possiede un linguaggio di programmazione per cui può eseguire script custom di controllo (vedi https://github.com/smlight-tech/slzb-os-scripts )<br>
In particolare ha un modo di funzionamento chiamato **zigbee Hub** totalmente autonomo ( vedi https://github.com/smlight-tech/slzb-os-zigbee-hub/tree/main) con una sua interfaccia web!. 
<br>
<table><tr>
<img  height="230"  alt="image" src="https://github.com/user-attachments/assets/084a0eb6-a901-4602-bf85-43377ab70c65" />
 <img width="700" height="230" alt="image" src="https://github.com/user-attachments/assets/31bfd295-1a1c-41b9-b771-d39a348cfd65" />
</tr></table>

PRO:
 - "`Zigbee Hub` è una modalità che consente l'elaborazione di tutto il traffico Zigbee all'interno del sistema SLZB-OS senza la necessità di utilizzare ZHA o Z2M."
 - "Questo garantisce un'eccellente stabilità, poiché non è più necessario inviare pacchetti Zigbee grezzi sulla rete, ma vengono invece inviati messaggi già elaborati.
La perdita di un messaggio pronto non causerà un guasto nell'hub (come accade con ZHA/Z2M)."
- "L'integrazione MQTT consente di garantire l'integrità del traffico (con QOS > 0)."

CONTRO:
 - "Lo svantaggio di questa soluzione è la limitata potenza di calcolo della CPU del controller SLZB-06, che limita il numero massimo di dispositivi ZigBee che può elaborare." (circa una decina)
-  "Inoltre, il supporto per le funzionalità dei dispositivi ZigBee è limitato (sarà ampliato nel tempo)."  
 (fonte  https://github.com/smlight-tech/slzb-os-zigbee-hub/tree/main).

![514352507_10228789887283300_8876190228529040627_n](https://github.com/user-attachments/assets/24348a01-c471-4853-adf7-815f9527281d)
![516749877_10228789885683260_7727836866700025590_n](https://github.com/user-attachments/assets/0c145c4a-37dd-4772-97fd-51674b4ebb1e) 

<h4>Note d'uso (SLZB-06P7)</h4> 

- collegare LAN al router e USB per alimentazione. 
- Se necessario, impostare con il pulsante (scomodo) il modo LAN (vedi  https://smlight.tech/manual/slzb-06/guide/configuration/#configuring-with-button) - LED blu acceso.
- Cercare IP di SLZB-06P7 via modem/scan WiFi (oppure usate direttamente `http://slzb-06p7.local/` ) per accedere con un browser alle pagine di configurazione - (vedi https://smlight.tech/manual/slzb-06/guide/configuration/#configuring-with-web-interface)
- Aggiornare via OTA il FW - Provata la versione 2.9.4 e 20240316 (vedi http://smlight.tech/manual/slzb-06/guide/flashing-and-updating/updating-zigbee.html) 
- Configurazione: mode => zigbee Hub, Network => Ethernet/WiFi a scelta,  MQTT => off.
- Hard reset (se perdete la pagina di configurazione): "turn on the device with the button pressed, when the LEDs start to flash, release the button".

<h4>Conclusione 1</h4>

Una soluzione veramente semplice (richiede solo un adapter SLZB-06). Le pagine WEB di configurazione presentano i device in due modi: sotto forma di lista e come dashboard (vedi figure).
E' così possibile leggere i valori dei sensori Zigbee e dare comandi manuali ai device, con i limiti del SLZB-06 indicati dal costruttore!<br> 
Ottima soluzione se si vogliono riutilizzare solo alcuni device Zigbee 'bannati' da Tuya!


<h3>SOLUZIONE 2: SLZB-06 (zigbee Hub) + mosquitto + MQTT Explorer </h3>
Per elaborare ulteriorente i dati dei device occorre raccoglierli ed inviarli ad una APP di elaborazione!
La soluzione più semplice è usare un _Broker MQTT_ (e.g. mosquitto - http://mosquitto.org/ )  per ricevere i dati da SLZB-06 e una semplice _APP client_ che permetta di visualizzare i dati  MQTT in vari modi (e.g. MQTT Explorer - http://mqtt-explorer.com/)! 

_Come si vede dallo screenshot di MQTT Explorer, in alto si hanno tutti i messaggi MQTT ricevuti (i codici numerici sono tipici dei device Zigbee e definiti in ZCL - Zigbee Cluster Library), a destra i dati rappresentati come oggetto, e sotto i grafici di alcuni valori scelti dall'utente. Nell'esempio il topic è "zhub/data/a4c13849baf0f06c/1/0402/0000" e il grafico presenta i valori di "data.val' (temperature). Ogni punto rappresenta una misura inviata dal device!_


<img width="1025" height="617" alt="Schermata 2025-07-19 alle 19 33 18" src="https://github.com/user-attachments/assets/54bf88ee-b08c-4557-a836-095cbbef6595" />

<h4>Note d'uso (mosquitto)</h4> 

- Installare mosquitto da (https://mosquitto.org/download/) In Win può essere installato come APP o come servizio: https://cedalo.com/blog/how-to-install-mosquitto-mqtt-broker-on-windows/ 
- Configurazione. Questi due valori devono essere aggiunti in `mosquitto.conf`  per poter accedere facilmente al Broker: 

                    listener  1883  0.0.0.0
                    allow_anonymanonyous true
                   
<h4>Note d'uso (MQTT Explorer)</h4> 

- Installare 'MQTT Explorer' da [MQTT Explorer](http://mqtt-explorer.com/)
- Fornire i dati per la connessione al Broker mosquitto.

<h4>Conclusione 2</h4>

Una soluzione ancora molto semplice perchè **mosquitto** e **MQTT Explorer** sono facili da installare, anche su un unico PC, e richiedono poca configurazione! Naturalente su SLZB-06 rimane il modo "zigbee Hub" con i suoi limiti, e deve essere abilitato l'output MQTT! <br>
Le funzionalità aggiunte sono la memorizzazione di serie storiche e la visulazzione in grafici! Non è però disponibile in 'MQTT Explorer' l'esportazione di serie di dati.<br>
Può essere utile anche come semplice ambiente di test per nuove device Tuya, per ottenere grafici ed informazioni (e.g. frequenza di aggiornamento dei termometri etc..).

<h3>SOLUZIONE 3: SLZB-06 (zigbee Hub) + mosquitto + IoTwebUI </h3>

_Uno dei limiti gravi delle due soluzioni precedenti è l'impossibilità di usare i device Zigbee gestiti da SLZB-06p7 in automazioni! Sia tra di loro, sia includendo le 'scene' ed i device controllati da Tuya!_

Per rendere questo realizzabile, occorre usare **IoTwebUI**, e creare degli **'x-device' custom** con i dati aggiornati automaticaente: gli 'x-device' possono essere usati insieme ai device standard Tuya nelle REGOLE di IotwebUI (più potenti delle 'scene' Tuya), e possono attivare 'Tap-to-run' Tuya! 

<table><tr>
<img width="489" height="238" alt="Schermata 2025-07-20 alle 09 04 53" src="https://github.com/user-attachments/assets/e02adab1-5475-436e-b00b-a385275982f7" />
<img width="404" height="187" alt="Schermata 2025-07-21 alle 13 09 25" src="https://github.com/user-attachments/assets/19263121-02d2-49df-82be-79d9b4f3ea37" />
</tr></table>

Questo screenshot mostra come appare in IoTwebUI un x-device per un sensore teperatura/pressione. A DX un device Tuya analogo.

Note:
 - Gli x-device, con icona ad ingranaggi, possono essere inseriti in ogni stanza creata con Tuya (nella figura, la 'stanza' MQTT).
 - Mancano alcuni dati, ad esempio l'opzione °C/°F per la temperatura. Questo perchè non sono implementati in "SLZB-06 zigbee Hub" (vedi https://github.com/smlight-tech/slzb-os-zigbee-hub/tree/main?tab=readme-ov-file#what-is-currently-supported)
 - Poichè l'x-device è implementata dall'utente, si possono scalare/formattare i dati, utilizzare attributi in ogni lingua, oppure aggiungere altri dati disponibili (in questo caso ho aggiunto `lqi`, indice di qualità del collegamento ZIgbee).
 - Nelle Automazioni (REGOLE) di IoTwebUI si possono mescolare `device Tuya` e `x-device` e lanciare 'tap-to-run' Tuya. Semplice esempio (vedi https://github.com/msillano/IoTwebUI/blob/main/LEGGIMI30.md#ref-macro-per-risorse ):

              if (  (GET("x-clima-sala", "Temperatura")  > 22.0 ) || 
                    ((GET("Temperature letto", "va_temperature")/10 ) > 22.0) ) SCENE("Spegni riscaldamento")

<h4>Note d'uso (IoTwebUI)</h4> 
- Installare IoTwebUI (ver > 3.0) e REST (ver. > 3.0) come da istruzioni (vedi https://github.com/msillano/IoTwebUI/blob/main/APP/LEGGIMI.md#installazione-e-uso )
- Configurazione: La mappatura tra i topic MQTT e REST (device, attributo, valore) è a carico dell'utente e deve essere fatta per ogni device. A differenza dei 'tipi' questa implementazione offre la massima libertà all'utente, perchè permette l'ottimizzazione per ogni device. 
- Pertanto va aggiornato il file `'server.js'` per ogni device usata. Vedi esempi all'inizio del file! I topic usati per ogni device si possono vedere con 'MQTT Explorer' Esempio:

       "zhub/data/a4c13849baf0f06c/1/0402/0000": {           // topic MQTT - temperatura
              description: "Temperatura - x-clima-sala",   
              lastValue: null,                    // default
              handler: (data, thisMap) => {       //  funzione di crezione REST qui 
                  if (data.data.val === thisMap.lastValue)   // skips duplicates
                        return null;
                  thisMap.lastValue = data.data.val;
                  return (baseREST + "set/x-clima-sala/Temperatura/" + data.data.val + "°C");   
                         // REST: set/<x-device-name>/<attribute>/<value>
                },
            },

- Per ogni virtual device che volete usare, dovete aggiungere una riga di definizione (singleton) nelle REGOLE (file `usrrules03.x.js` ), come il seguente esempio (home: 'ROMA'; room: 'mqtt'; nome: 'x-clima-sala';):

            if (!GETATTRIBUTE('x-clima-sala', "name", false)) ADDXDEVICE('ROMA', 'mqtt', 'x-clima-sala'), SETXDEVICEONLINE('x-clima-sala');
  
- Ordine di lancio:
   1. "mosquitto" per primo (se è un servizio l'avvio è automatico). Sulle pagine di SLZB-06 si vede se la connessione è avvenuta!
   2. `APP_me.bat` lancia sia il server REST + MQTT (server.js), ma solo se necessario, poi l'interfaccia utente (IoTwebUI)!.
   3. Per debug, è possibile lanciare il server REST + MQTT (server.js) in una finestra cmd: `node  server.js` poi si può usare `APP_me.bat`: in questo modo si vede il log delle operazioni effettuate da   REST + MQTT
 
 <img width="727" height="452" alt="Schermata 2025-07-22 alle 20 16 36" src="https://github.com/user-attachments/assets/09896242-222d-4244-bcb9-0e52c765d0c1" />
 

<h4>Conclusione 3</h4>

Una soluzione tutto sommato completa, a costo di un aggiornamento per ogni device aggiunta! L'utente ha pertanto una completa libertà di customizzazione per ogni device.<br> 
Permette quindi il riuso dei device Tuya 'bannati' in automazioni interagenti con Tuya. <br>
Sono sempre validi i limiti del modo _zigbee Hub di SLZB-06_: poche device e funzioni limitate! <br>
Adatto, secondo me, allo sviluppo di APP e tools complessi, per i quali non sono sufficienti le 'scene' Tuya, sul genere di questi esempi: https://github.com/msillano/IoTwebUI/blob/main/APP/Overviews.md   

<h3>SOLUZIONE 4: SLZB-06 + zigbee2mqtt + mosquitto + ( MQTT Explorer | IoTwebUI ) </h3>

_Per poter elaborare più device, la soluzione è usare un SW di decodifica esterno all'adapter SLZB-06, con a disposizione le risorse del sistema ospite!_ 
Il SW in questione è **zigbee2mqtt**, che in coppia con **SLZB-06P7** permette di gestire fino a **300** device Zigbee, purchè appartenenti al set delle  **4464** devices 'note' a zigbee2mqtt, (vedi https://www.zigbee2mqtt.io/supported-devices/ ). 

<img width="1808" height="605" alt="image" src="https://github.com/user-attachments/assets/bae275e5-f074-4e3d-8361-162571e6a84c" />


nota: è comunque possibile aggiungere device Zigbee Tuya 'sconosciute' a `zigbee2mqtt`, vedi https://medium.com/@dzegarra/zigbee2mqtt-how-to-add-support-for-a-new-tuya-based-device-part-1-b20227251d46  

L'interfaccia web di `zigbee2mqtt` presenta numerose pagine, alcune simili a quelle già viste con `zigbee Hub` (lista, dasboard) altre nuove: Mappa, Gruppi, etc.

![ScreenShot_20250725194703](https://github.com/user-attachments/assets/9dd59e9b-085a-40ea-a4ea-49504f4a7253)
![ScreenShot_20250725194808](https://github.com/user-attachments/assets/1218d458-e45b-4bb4-bf08-7a5bfd2fbb14)
![ScreenShot_20250725194931](https://github.com/user-attachments/assets/af00f0b1-937a-42a5-ac20-963ac35b7dd0)


I topic usati da `zigbee2mqtt` sono più sintetici, quindi di più seplice gestione e uso, come fa vedere bene  MQTT Explorer: 

![ScreenShot_20250726123726](https://github.com/user-attachments/assets/3f8ba1ae-f9c8-427f-a65c-ed2af3da817d)

In uesto caso viene usato un solo 'topic' per device!

<h4>Note d'uso (SLZB-06P7)</h4> 

Per l'uso con `zigbee2mqtt`, l'adapter SLZB-06 può essere configurato in vari modi. In particolare ho scelto USB + Ethernet, e modo 'coordinator'. Ovviamente sono stati aggiornati i FW zigbee via OTA. 

<img width="1144" height="405" alt="Schermata 2025-07-25 alle 20 41 50" src="https://github.com/user-attachments/assets/813a6810-85f1-4088-9f93-f168837ae4d0" />

<h4>Note d'uso (zigbee2mqtt)</h4> 

L'installazione non è seplicissima. Seguire le istruzioni https://www.zigbee2mqtt.io/guide/installation/ <br>
La configurazione si può fare aggiornando anualente il file `zigbee2mqtt/data/configuration.yaml` Vedi https://www.zigbee2mqtt.io/guide/configuration/ , oppure al primo 'run' di zigbee2mqtt (cmd: `pnpm start` nella dir di installazione) 
L'obiettivo è un colloquio seriale via USB tra `SLZB-06P7` e `zigbee2mqtt`.
 Esempio, sto usando questo:

                 version: 4
                 mqtt:
                    base_topic: zigbee2mqtt
                    server:  mqtt://localhost:1883
                 serial:
                    port: COM3 
                    baudrate: 115200
                    rtscts: false
                 advanced:
                    transmit_power: 20
                    log_level: info
                  ........  
      
<h4>Note d'uso APP </h4> 

Una volta che i dati raggiungono il broker mosquitto possono poi essere utilizzati nei modi già visti, in base alle esigenze ed alle preferenze dell'utente.

 - **MQTT Explorer** è  la soluzione più semplice, sempre utile per vedere i dettagli dei topic e payload MQTT, inoltre permette grafici di tutte le misure!

 - **IoTwebUI** è la soluzione che offre più opportunità di customizzazione, mantenendo l'integrazione con Tuya, e ha la massima libertà di interfacce e di APP custom! ( vedi https://github.com/msillano/IoTwebUI/blob/main/APP/Overviews.md ). Ovviamente la mia soluzione preferita.

<h4>Note d'uso (IoTwebUI)</h4> 

 -  `zigbee2mqtt` raggruppa i dati in un unico messaggio per device. Pertanto il file `'server.js'` deve essere aggiornato per ogni device usata in modo diverso dal caso `Zigbee Hub`. Vedi esempi all'inizio del file! I topic usati per ogni device si possono vedere con 'MQTT Explorer' - Possono convivere entrambe le definizioni, avendo 'topic' differenti!. Esempio:

           "zigbee2mqtt/0xa4c13849baf0f06c": {            //  device-id
                 description: "Temperatura - x-clima-sala",
                 lastValue: null,
           // {"battery":100,"humidity":63.84,"linkquality":102,"temperature":27.13,"voltage":3000}
                 handler: (data, thisMap) => {
                    if (data.linkquality === thisMap.lastValue)
                        return null;
                    thisMap.lastValue = data.linkquality;
           // now set all dPs.
                    addToRestBuffer(baseREST + "set/x-clima-sala/batteria/" + data.battery + "%");
                    addToRestBuffer(baseREST + "set/x-clima-sala/lqi/" + data.linkquality );
                    addToRestBuffer(baseREST + "set/x-clima-sala/Umidità/" + data.humidity + "%" );
                    return (baseREST + "set/x-clima-sala/Temperatura/" + data.temperature +  "°C");
                    },
              },

<h4>Conclusione 4</h4>
Utilizzare `zigbee2mqtt` ha vantaggi ed inconvenienti.

PRO
 - Massimizzazione dei device Zigbeee utilizzabili: fino a **300** device Zigbee, e un set di  **4464** device 'note'. 
 - Uno standard MQTT 'pulito' compatibile con una infinità di APP domotiche (vedi soluzione 5) tra cui l'utente può scegliere.  

CONTRO
 - Una maggiore complessità generale: installazione, configurazione, manutenzione (mi sono serviti due giorni per farlo funzionare !)
 - Aumento dei rischi legati all'affidabilità (usando più  blocchi logici le probabilità di 'guasti' aumentano) 
 - Diventa sempre più necessario utilizzare un server dedicato 24/7: un top-box Android  (la soluzione che preferisco, vedi https://github.com/msillano/tuyaDAEMON/wiki/80.-deployment:-android-server ), un Raspberry, un mini PC etc... 

Valutare quindi bene il bilancio vantaggio/svantaggi di questa soluzione.


<h3>SOLUZIONE 5: SLZB-06 + zigbee2mqtt (+ mosquitto) + APP </h3>

zigbee2mqtt ha una posizione di standard di fatto nel campo dei device Zigbee, pertanto molte applicazioni di domotica prevedono l'integrazione con `zigbee2mqtt`. Per utilizzare Zigbee2MQTT con altri sistemi non è obbligatorio disporre di un'integrazione nativa, ma è necessario il supporto per MQTT. Un'integrazione nativa rende le cose più semplici e "cliccabili".

"Zigbee2MQTT integrates well with (almost) every home automation solution because it uses MQTT. However the following integrations are worth mentioning:" (https://github.com/Koenkk/zigbee2mqtt/blob/master/README.md#integrations )

<img align="left" height="100px" width="100px" src="https://user-images.githubusercontent.com/7738048/40914297-49e6e560-6800-11e8-8904-36cce896e5a8.png">

### [Home Assistant](https://www.home-assistant.io/)

- [Home Assistant OS](https://www.home-assistant.io/installation/): Using [the official addon](https://github.com/zigbee2mqtt/hassio-zigbee2mqtt)
- Other installation: using instructions [here](https://www.zigbee2mqtt.io/guide/usage/integrations/home_assistant.html)

<br>

<img align="left" height="100px" width="100px" src="https://etc.athom.com/logo/white/256.png">

### [Homey](https://homey.app/)

- Integration implemented in the [Homey App](https://homey.app/nl-nl/app/com.gruijter.zigbee2mqtt/)
- Documentation and support in the [Homey Forum](https://community.homey.app/t/83214)

<br>

<img align="left" height="100px" width="100px" src="https://user-images.githubusercontent.com/2734836/47615848-b8dd8700-dabd-11e8-9d77-175002dd8987.png">

### [Domoticz](https://www.domoticz.com/)

- Integration implemented in Domoticz ([documentation](https://www.domoticz.com/wiki/Zigbee2MQTT)).

<br>

<img align="left" height="100px" width="100px" src="https://github.com/user-attachments/assets/5acd77fb-1cbe-40b6-9515-935fd21dd3b4" />


### [Gladys Assistant](https://gladysassistant.com/)

- Integration implemented natively in Gladys Assistant ([documentation](https://gladysassistant.com/docs/integrations/zigbee2mqtt/)).

<br>

<img align="left" height="100px" width="100px" src="https://forum.iobroker.net/assets/uploads/system/site-logo.png">

### [IoBroker](https://www.iobroker.net/)

- Integration implemented in IoBroker ([documentation](https://github.com/o0shojo0o/ioBroker.zigbee2mqtt)).

<br>
_Inoltre anche queste applicazioni sono state integrate (vedi https://www.zigbee2mqtt.io/guide/usage/integrations.html#integrations ):_

- **Majordomo** (Russian)
- Mozilla IoT **WebThings** Gateway via Zigbee2MQTT adapter
- **openHAB**
- **Homebridge** plugin (Apple HomeKit)
- **Symcon Automation** Solutions
- **HomeSeer**
- Matterbridge Zigbee2MQTT Plugin (**Apple HomeKit** and Google Home)
- Zigbee2MQTT **Automations**
- **node-red-contrib-zigbee2mqtt** per applicazioni custom in node-red

Tutte queste applicazioni di domotica presentano differenti look and feel, e diversi modi per creare automazioni, nonchè maggiore o minore compatibilità e semplicità di installazione ed uso.
**Consiglio di provarne più di una prima di fare una scelta!**

_Tutte queste ottime applicazioni di domotica però presentano un problema comune, che dal mio punto di vista ne sconsiglia l'adozione generalizzata: nessuna permette l'integrazione con le 'scene' e tutti i device gestiti direttamente da Tuya!_  

<h4>Conclusione 5</h4>
Se c'è l'esigenza di un sottoinsieme costituito da device Zigbee, autonomo dal sistema Tuya, queste APP possono velocizzare l'implementazione! 
Se però si desidera avere sistemi più interconnessi, come è l'ideale domotico, o dovete rinunciare a Tuya ed al suo ecosistema, oppure dovete utilizzare soluzioni come IoTwebUI oppure soluzioni custom che consentano counicazioni bidirezionali con Tuya! 

_Se implementate una di queste soluzioni, fatemi conoscere i vostri pro e contro per aggiornare questa guida._

Cordialmente
