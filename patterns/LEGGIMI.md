# Tuya patterns for scenes
[English version](https://github.com/msillano/IoTwebUI/blob/main/patterns/README.md)


La creazione di **`scene`** Tuya è abbastanza semplice: una serie di interfacce e menu guidano l'utente alla creazione di **`tap_to_run`** (attivate da comando manuale o da altre `scene`, senza condizioni)   ed **`automazioni`** (attivate - triggerate - da condizioni su eventi). 

Ma non sono sempre rose e fiori: una serie di `quirk` nell'implematazione di Tuya possono creare problemi all'utente nei casi più semplici, mentre i limiti imposti da scelte di progetto (mancanza di funzioni con parametri, di ELSE, di variabili, di operazioni aritmetiche, etc..) possono costringere a cercare soluzioni non lineari nei casi appena più complessi, oppure possono rendere indispensabile l'uso di altri ambienti come **IoTwebUI**, oppure tuyaDAEMON o HA, etc..

## principali Tuya quirk

#### condizioni
1) Le **condizioni** attivano le azioni collegate una sola volta, appena la condizione è raggiunta (cioè quando la condizione passa da FALSO a VERO - edge triggering). Perchè altrimenti sarebbe impossibile la coesistenza tra comandi automatici e manuali. (vedi https://support.tuya.com/en/help/_detail/K9hutqbuwhik3)
2) Condizioni in **AND**: (= tutte) attivano l'azione (trigger) quando diventano TUTTE vere (cioè quando l'ultima condizione passa da FALSO a VERO e tutte le altre sono già VERE)
3) Condizioni in **OR**: (= almeno una) sono indipendenti (cioè si ha un trigger ogni volta che una condizione passa da FALSO a VERO, a prescindere dalle altre). 

#### ambito
L'**ambito** è presente solo nelle `automazioni`, ed è formato de vincoli logici aggiuntivi che non provocano attivazioni (non sono trigger) ma DEVONO essere VERI (level) per avere un trigger dalle condizioni, e quindi per attivare l'automazione.
In altre parole 'quando' una automazione si attiva è deciso dalle condizioni (SE...) ma l'autorizzazione è data da _abilitazione + condizioni + ambito_ !

#### disabilitare automazioni
Una `automazione disabilitata` ovviamente NON si avvia, a prescindere dalle condizioni e dall'ambito.<br>
Se si disabilita una `automazione` in corso di esecuzione, questa interrompe l'esecuzione prima del task successivo.<br>
Qualche problema si crea nel caso di una disabilitazione seguite da riabilitazione durante l'esecuzione di un delay. Una disabilitazione viene onorata al termine del delay in corso. Se però interviene una riabilitazione prima del termine del delay, il comportamento può variare: in alcuni casi l'esecuzione abortisce (Zigbee) correttamente in altri, invece, _NON abortisce, ignorando completamente la disabilitazione_! E' quindi una situazione da evitare, perchè NON affidabile!

#### HW workaround
Talora è necessario ovviare all'assenza di varibili o ad altri limiti del linguaggio utilizzando device (reali o virtuali) come semaforo (1 bit di memoria) o come timer (usando la funzione countdown) etc.. e questo complica ovviamente la scene.

## Tuya pattern
Alcuni problemi si presentano simili in applicazioni diverse. In questi casi, una valida soluzione generale è chiamata 'pattern' e si presta a essere utilizzata più e più volte.
Questa è una collezione di pattern per scene Tuya, spesso nati e discussi nel [gruppo TuyaItalia](https://www.facebook.com/groups/tuyaitalia?locale=it_IT) poi sviluppati e documentati con l'aiuto di varie AI.


#### contesti
Per i pattern si sono presi in considerazione 3 contesti

1) **Local linkage**: Scene Tuya che possono essere eseguite dirattamente dall'HUB e da device Zigbee, senza uso del WiFi e di TuyaCloud. Usare questo contesto comporta alcuni limiti alle condizioni e azioni utilizzabili, oltre al vincolo di tutte device Zigbee e all'impossibilitòà di usare device virtuali ed ambito. _LAN linkage_ è analogo come vincoli e prestazioni ma coinvolge più HUB Zigbee e richiede il WiFi.<br>
Da preferire per un sistema affidabile e robusto.<br>
nota: nulla vieta di usare questi pattern con device WiFI (_Cloud linkage_): si perde il vantaggio del funzionamento locale, ma la logica resta valida!


2) **Cloud linkage**: Tutte le scene valide in Tuya, con uso del Cloud, etc. <br>
Poggiandosi sul Cloud, richiedono un WiFi affidabile 24/7. In genere più semplici dei pattern equivalenti _local linkage_.

3) **REGOLE di IoTwebUI**: Le [REGOLE](https://github.com/msillano/IoTwebUI/blob/main/LEGGIMI30.md#regole---sintassi) sono l'equivalente delle 'scene' Tuya. Utilizzano [MACRO](https://github.com/msillano/IoTwebUI/blob/main/LEGGIMI30.md#regole---macro) potenti, che semplificano la loro definizione, e sono scritte dall'utente in un'dialetto' javascript. Sono 'Turing complete' ovvero posso implementare qualsiasi algoritmo.<br>
Per realizzare alcune APP sono indispensabili (e.g. Thermostat, pieno di operazioni aritmetiche!), per i pattern rappresantono talora una semplice e potente alternativa. <br>
Dipendono dall'esecuzione di **IoTwebUI** su un server, sono qundi la soluzione meno robusta. 

