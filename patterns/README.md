# Tuya patterns for scenes

La creazione di 'scene' Tuya è abbastanza semplice: una serie di interfacce e menu guidano l'utente alla creazione di "tap_to_run" ed automazioni. 

Non sono sempre rose e fiori: una serie di 'quirk' nell'implematazione di Tuya possono creare problemi all'utente nei casi più semplici, mentre i limiti imposti (mancanza di variabili, di ELSE, di operazioni aritmetiche, etc..) possono costringere a cercare workaround nei casi appena più complessi, o rendere indispensabile l'uso di IoTwebUI.

## principali Quirks

#### condizioni
1) Le 'condizioni' sono attivate una sola volta, appena la condizione è raggiunta (cioè quando passa da FALSO a VERO - edge triggering). Perchè altrimenti sarebbe impossibile la coesistenza tra comondi automatici e manuali. (vedi https://support.tuya.com/en/help/_detail/K9hutqbuwhik3)
2) Condizioni in AND: Attivano l'azione (trigger) appena sono TUTTE vere (cioè quando l'ultima passa da FALSO a VERO e tutte le altre sono già VERE)
3) Condizioni in OR: sono indipendenti (cioè si ha un trigger quando una passa da FALSO a VERO, a prescindere dalle altre). 

#### ambito
Vincoli logici aggiuntivi che non provocano azioni (non sono trigger) ma DEVONO essere VERI per avere un trigger dalle condizioni

#### disbilitare automazioni
Se si disabilita una automazione in corso di esecuzione, questa interrompe l'esecuzione prima del task successivo.
Qualche problema si crea nel caso di disabilitazione seguite da riabilitazione durante l'esecuzione di un delay. Una disabilitazione viene onorata al termine del delay in corso. Se però interviene una riabilitazione prima che termini il delay, il comportamento può variare: in alcuni casi l'esecuzione abortisce (Zigbee) in altri, invece, NON abortisce, ignorando completamente la disabilitazione! E' una situazione da evitare, perchè NON affidabile!

## workaround
Talora è necessario ovviare all'assenza di varibili o ad altri limiti del linguaggio utilizzando device (reali o virtuali) come semaforo (1 bit di memoria) o come timer (usando la funzione countdowb) etc.. e questo complica ovviamente la scene.

## pattern
Alcuni problemi si presentano simili in applicazioni diverse. In questi casi, una valida soluzione generale è chiamata 'pattern' e si presta a essere utilizzata più e più volte.
Questa è una collezione di pattern per scene Tuya, spesso nati e discussi nel [gruppo TuyaItalia](https://www.facebook.com/groups/tuyaitalia?locale=it_IT) poi sviluppati e documentati con l'aiuto di varie AI.

## contesti
Per i pattern sono presi in considerazione 3 contesti

1) "local linkage": scene Tuya che possono essere eseguite dirattamente dall'HUB e da device Zigbee, senza uso del WiFi e di TuyaCloud. Comporta alcuni limiti alle condizioni e azioni utilizzabili, oltre al vincolo di tutte device Zigbee e all'impossibilitòà di usare device virtuali ed ambito. 
Da preferire per un sistema affidabile e robusto.

2) "Cloud linkage": tutte le scene valide in Tuya, con uso del Cloud, etc. 
Poggiandosi sul Cloud, richiedono un WiFi affidabile 24/7

3) "REGOLE di IoTwebUI": le REGOLE sono l'equivalente delle 'scene' Tuya. Utilizzano, per semplificare, MACRO potenti, e sono scritte in un'dialetto' javascript. In certe APP sono indispensabili (e.g. Thermostat, pieno di operazioni aritmetiche!), nei pattern in genere rappresantono una semplice e potente alternativa. 
Dipendono dall'esecuzione di IoTwebUI su un server, sono qundi la soluxione meno robusta. 
