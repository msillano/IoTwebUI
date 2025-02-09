# Tuya patterns for scenes

La creazione di **`scene`** Tuya è abbastanza semplice: una serie di interfacce e menu guidano l'utente alla creazione di **`tap_to_run`** (attivate da comando manuale o da altre `scene`, senza condizioni)   ed **`automazioni`** (attivate - triggerate - da condizioni su eventi). 

Non sono sempre rose e fiori: una serie di `quirk` nell'implematazione di Tuya possono creare problemi all'utente nei casi più semplici, mentre i limiti imposti (mancanza di ELSE, di variabili, di operazioni aritmetiche, etc..) possono costringere a cercare soluzioni alternative nei casi appena più complessi, oppure possono rendere indispensabile l'uso di **IoTwebUI**.

## principali quirk

#### condizioni
1) Le **condizioni** attivano le azioni collegate una sola volta, appena la condizione è raggiunta (cioè quando la condizione passa da FALSO a VERO - edge triggering). Perchè altrimenti sarebbe impossibile la coesistenza tra comandi automatici e manuali. (vedi https://support.tuya.com/en/help/_detail/K9hutqbuwhik3)
2) Condizioni in **AND**: (= tutte) attivano l'azione (trigger) quando diventano TUTTE vere (cioè quando l'ultima condizione passa da FALSO a VERO e tutte le altre sono già VERE)
3) Condizioni in **OR**: (= almeno una) sono indipendenti (cioè si ha un trigger ogni volta che una condizione passa da FALSO a VERO, a prescindere dalle altre). 

#### ambito
Vincoli logici aggiuntivi che non provocano azioni (non sono trigger) ma DEVONO essere VERI (level) per avere un trigger dalle condizioni

#### disabilitare automazioni
Una `automazione disabilitata`  ovviamente NON si avvia, a prescindere dalle condizioni + ambito.<br>
Se si disabilita una `automazione` in corso di esecuzione, questa interrompe l'esecuzione prima del task successivo.<br>
Qualche problema si crea nel caso di una disabilitazione seguite da riabilitazione durante l'esecuzione di un delay. Una disabilitazione viene onorata al termine del delay in corso. Se però interviene una riabilitazione prima del termine del delay, il comportamento può variare: in alcuni casi l'esecuzione abortisce (Zigbee) correttamente in altri, invece, _NON abortisce, ignorando completamente la disabilitazione_! E' quindi una situazione da evitare, perchè NON affidabile!

## HW workaround
Talora è necessario ovviare all'assenza di varibili o ad altri limiti del linguaggio utilizzando device (reali o virtuali) come semaforo (1 bit di memoria) o come timer (usando la funzione countdown) etc.. e questo complica ovviamente la scene.

## Tuya pattern
Alcuni problemi si presentano simili in applicazioni diverse. In questi casi, una valida soluzione generale è chiamata 'pattern' e si presta a essere utilizzata più e più volte.
Questa è una collezione di pattern per scene Tuya, spesso nati e discussi nel [gruppo TuyaItalia](https://www.facebook.com/groups/tuyaitalia?locale=it_IT) poi sviluppati e documentati con l'aiuto di varie AI.

#### contesti
Per i pattern sono presi in considerazione 3 contesti

1) **local linkage**: scene Tuya che possono essere eseguite dirattamente dall'HUB e da device Zigbee, senza uso del WiFi e di TuyaCloud. Comporta alcuni limiti alle condizioni e azioni utilizzabili, oltre al vincolo di tutte device Zigbee e all'impossibilitòà di usare device virtuali ed ambito. _LAN linkage_ è analogo come vincoli e prestazioni ma coinvolge più HUB Zigbee e richiede il WiFi.<br>
Da preferire per un sistema affidabile e robusto.

2) **Cloud linkage**: tutte le scene valide in Tuya, con uso del Cloud, etc. <br>
Poggiandosi sul Cloud, richiedono un WiFi affidabile 24/7

3) **REGOLE di IoTwebUI**: le REGOLE sono l'equivalente delle 'scene' Tuya. Utilizzano, per semplificare, MACRO potenti, e sono scritte in un'dialetto' javascript. Sono 'Turing complete'. In certe APP sono indispensabili (e.g. Thermostat, pieno di operazioni aritmetiche!), nei pattern in 

```graphviz
digraph Tuya { fontname="Helvetica,Arial,sans-serif" fontsize=16 node [fontname="Helvetica,Arial,sans-serif", color = black] edge [fontname="Helvetica,Arial,sans-serif"] rankdir=LR;  node [shape=ellipse, style=""]; "switch caldaia";"TY-08Z";"Sirena";"Smoke Detector";"Sensore porta";"Motion Sensor";"Wireless scene switch";"TF_frigo";"HeatingThermostat-vdevo";  node [shape=box, style=filled, fillcolor=GreenYellow, color=black]; "A1";"invia notifica";"A2";"AL_setGiorno";"AL_testGiorno (zona1)";"AL_testNotte (zona2)";"AL_setNotte";"AL_setOff";"campanello";"t2";"thermostatSTOP";"ty08";"t3";"thermostatSTART";  node [shape=box, style=filled, fillcolor=lightgrey, color=black]; "ALARM OFF";"ALARM ON";"E1";"HOTTURNOFF";"HOTTURNON";"PIR off";"PIR on";"ty08z01";"sirena suona";"sirena1";"sirena2";"smoke alarm OFF";  node [shape=ellipse, style="diagonals", color=red]; "Devices BattTest2";  node [shape=box3d, style="", color=black]; "IoTwebUI\ntuyaData";"tooltip\nbatteries02";"armed_state";"Message center";"campanello effective";"t2 effective";"location_fence";"t3 effective"; "IoTwebUI\ntuyaData" -> "Devices BattTest2" [label = "get"]; "Devices BattTest2" -> "tooltip\nbatteries02" [label = "result"]; "Devices BattTest2" -> "Devices BattTest2" [label = <<I>refresh</I>>]; "ALARM OFF" -> "armed_state" [label = action]; "ALARM ON" -> "armed_state" [label = action]; "E1" -> "E1" [label = delay]; "E1" -> "A1" [label = enable]; "HOTTURNOFF" -> "switch caldaia" [label = "switch_1:false"]; "HOTTURNON" -> "switch caldaia" [label = "switch_1:true"]; "PIR off" -> "invia notifica" [label = disable]; "PIR on" -> "invia notifica" [label = enable]; "ty08z01" -> "TY-08Z" [label = toggle]; "sirena suona" -> "Sirena" [label = "AlarmSwitch:true"]; "sirena1" -> "Sirena" [label = "Alarmtype:6"]; "sirena1" -> "Sirena" [label = "AlarmPeriod:4"]; "sirena1" -> "Sirena" [label = "AlarmSwitch:true"]; "sirena2" -> "Sirena" [label = "Alarmtype:3"]; "sirena2" -> "Sirena" [label = "AlarmPeriod:3"]; "sirena2" -> "Sirena" [label = "AlarmSwitch:true"]; "smoke alarm OFF" -> "Smoke Detector" [label = "muffling:true"]; "A1" -> "A1" [label = delay]; "A1" -> "sirena suona" [label = run]; "switch caldaia" -> "A1" [label = "switch_1==true"]; "A2" -> "A1" [label = disable]; "A2" -> "E1" [label = run]; "switch caldaia" -> "A2" [label = "switch_1==false"]; "AL_setGiorno" -> "AL_testGiorno (zona1)" [label = enable]; "AL_setGiorno" -> "AL_testNotte (zona2)" [label = disable]; "armed_state" -> "AL_setGiorno" [label = trigger]; "AL_setNotte" -> "AL_testGiorno (zona1)" [label = enable]; "AL_setNotte" -> "AL_testNotte (zona2)" [label = enable]; "armed_state" -> "AL_setNotte" [label = trigger]; "AL_setOff" -> "AL_testGiorno (zona1)" [label = disable]; "AL_setOff" -> "AL_testNotte (zona2)" [label = disable]; "armed_state" -> "AL_setOff" [label = trigger]; "AL_testGiorno (zona1)" -> "sirena1" [label = run]; "AL_testGiorno (zona1)" -> "Message center" [label = notification]; "Sensore porta" -> "AL_testGiorno (zona1)" [label = "status==open"]; "AL_testNotte (zona2)" -> "sirena1" [label = run]; "Motion Sensor" -> "AL_testNotte (zona2)" [label = "pir_state==pir"]; "campanello" -> "sirena2" [label = run]; "campanello effective" -> "campanello" [label = start]; "campanello effective" -> "campanello effective" [label = loop]; "Wireless scene switch" -> "campanello" [label = "switch_type_1==single_click"]; "invia notifica" -> "Message center" [label = notification]; "Motion Sensor" -> "invia notifica" [label = "pir_state==pir"]; "t2" -> "thermostatSTOP" [label = enable]; "t2" -> "t2" [label = delay]; "t2" -> "ty08" [label = disable]; "t2 effective" -> "t2" [label = start]; "t2 effective" -> "t2 effective" [label = loop]; "armed_state" -> "t2" [label = trigger]; "location_fence" -> "t2" [label = trigger]; "TF_frigo" -> "t2" [label = "temp_current>45"]; "t3" -> "HeatingThermostat-vdevo" [label = "mode:Manual"]; "t3" -> "t3" [label = delay]; "t3" -> "PIR on" [label = run]; "t3 effective" -> "t3" [label = start]; "t3 effective" -> "t3 effective" [label = loop]; "t3" -> "t3" [label = schedule]; "armed_state" -> "t3" [label = trigger]; "thermostatSTART" -> "HeatingThermostat-vdevo" [label = "switch:true"]; "thermostatSTART" -> "thermostatSTART" [label = schedule]; "thermostatSTOP" -> "HeatingThermostat-vdevo" [label = "switch:false"]; "thermostatSTOP" -> "thermostatSTOP" [label = schedule]; "ty08" -> "sirena suona" [label = run]; "TY-08Z" -> "ty08" [label = "switch_3==true"]; } 
```
genere rappresantono una semplice e potente alternativa. <br>
Dipendono dall'esecuzione di **IoTwebUI** su un server, sono qundi la soluzione meno robusta. 
