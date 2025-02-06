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
Alcuni problemi si presentano simili in contesti diversi. In questi casi, una robusta soluzione generale è chiamata 'pattern' e si presta a essere applicata più volte.
Questa è una collezione di pattern per scene Tuya, sviluppati e documentati con l'aiuto di varie AI.
Si prediligono le soluzioni Tuya (più portabili e diffuse) alle soluzioni IoTwebUI, ovviamente di più limitata applicazione.
