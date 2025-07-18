<h1>Method of Third-party Zigbee Subdevices Integration into Tuya Ecosystem</h1>

Attualente (luglio 2025) Tuya accetta device Zigbee di terze parti ( con alcuni limiti, vedi https://www.tuyaos.com/viewtopic.php?t=2688 ) mentre rifiuta completamente il "pairing" ai device Tuya "non autorizzati" - Cioè i device Tuya Zigbee di produttori 'insolventi'! (vedi post https://www.facebook.com/groups/tuyaitalia/permalink/1678413936126286/ ).

Se un utente ha un parco importante di device Zigbee, con molte scene di controllo, la soluzione zero consiste nel ricomprare i device 'non autorizzati', ma questa volta di marche note e paganti!

Ciò non ostante è interessante affrontare le alternati possibili, per utilizzare ancora i device 'bannati' ed altri device Zigbee  non compatibili Tuya.

<h3>Soluzione 1: SLZB-06 (zigbee Hub) stand-alone</h3>
Ho preso e testato come coordinator Zigbee, non Tuya compatibile, il modello SLZB-06p7 - per altri modelli vedi http://smlight.tech/manual/slzb-06/guide/slzb-models-overview/ ) - ha caratteristiche molto interessanti!   
In particolare ha un modo di funzionamento chiamato "zigbee Hub" autonomo ( vedi https://github.com/smlight-tech/slzb-os-zigbee-hub/tree/main). 
Inoltre ha un linguaggio di programmazione per cui può eseguire script custom di controllo ( vedi https://github.com/smlight-tech/slzb-os-scripts )

 ![516850804_10228789882683185_8445870067712513088_n](https://github.com/user-attachments/assets/084a0eb6-a901-4602-bf85-43377ab70c65) 

PRO:
 - "Zigbee Hub è una modalità che consente l'elaborazione di tutto il traffico Zigbee all'interno del sistema SLZB-OS senza la necessità di utilizzare ZHA o Z2M."
 - "Questo garantisce un'eccellente stabilità, poiché non è più necessario inviare pacchetti Zigbee grezzi sulla rete, ma vengono invece inviati messaggi già elaborati.
La perdita di un messaggio pronto non causerà un guasto nell'hub (come accade con ZHA/Z2M)."
- "L'integrazione MQTT consente di garantire l'integrità del traffico (con QOS > 0)."

CONTRO:
 - "Lo svantaggio di questa soluzione è la limitata potenza di calcolo della CPU del controller SLZB-06, che limita il numero massimo di dispositivi ZigBee che può elaborare."
-  "Inoltre, il supporto per le funzionalità dei dispositivi ZigBee è limitato (sarà ampliato nel tempo)."  
 (fonte  https://github.com/smlight-tech/slzb-os-zigbee-hub/tree/main).

![514352507_10228789887283300_8876190228529040627_n](https://github.com/user-attachments/assets/24348a01-c471-4853-adf7-815f9527281d)
![516749877_10228789885683260_7727836866700025590_n](https://github.com/user-attachments/assets/0c145c4a-37dd-4772-97fd-51674b4ebb1e)

<h4>Conclusione 1</h4>

Una soluzione veramente semplice (richiede solo il coordinator SLZB-06). Le pagine WEB di configurazione presentano i device in due modi: sotto forma di lista e come dashboard (vedi figure).
E' così possibile leggere i valori dei sensori Zigbee e dare comandi manuali ai device, con i limiti del SLZB-06 indicati dal costruttore!


<h3>Soluzione 2: SLZB-06 (zigbee Hub) + mosquitto + MQTT Explorer </h3>
Per elaborare ulteriorente i dati dei device occorre raccoglierli ed inviarli ad un SW di elaborazione!
La soluzione più semplice è usare un Broker MQTT (e.g. mosquitto)  per ricevere i dati da SLZB-06 e una seplice APP che permetta di visualizzare i dati  MQTT in vari modi (e.g. MQTT Explorer)!

Come si vede dallo screenshot, in alto si hanno tutti i messaggi MQTT ricevuti (i codici nuerici sono tipici dei device Zigbee e definiti in ZCL - Zigbee Cluster Library), a destra i dati rappresentati come oggetto, e sotto i grafici di alcuni valori scelti dall'utente. Nell'esepio il topic è "zhub/data/a4c13849baf0f06c/1/0402/0000" e il grafico presenta i valori di "data.val' (temperature). Ogni punto rappresenta una misura inviata dal device!


<img width="1025" height="617" alt="Schermata 2025-07-19 alle 19 33 18" src="https://github.com/user-attachments/assets/54bf88ee-b08c-4557-a836-095cbbef6595" />



(vedi https://www.facebook.com/groups/tuyaitalia/permalink/1690721174895562/ )

<h4>Conclusione 2</h4>

Una soluzione ancora molto semplice perchè mosquitto e MQTT Explorer sono facili da installare, anche su un unico PC, e richiedono poca configurazione! Naturalente su SLZB-06 rimane il modo "zigbee Hub" con i suoi limiti, e deve esserev abilitato l'output MQTT! Le funzionalità aggiunte sono la memorizzazione di serie storiche e la visulazzione in grafici! Non è disponibile l'esportazione dei dati.
