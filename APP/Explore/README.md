# Explore device

### Obiettivi
_Pur seguendo delle regole comuni, i device Tuya hanno carateristiche che variano molto, dipendendo in ultima analisi dai costruttori e dai loro obiettivi commerciali.
Tramite SmartLife noi possimo accedere ad alcuni dati di un device: i principali sono presentati nella pagina del device, eventualmente con grafici, e troviamo quali condizioni possono gestire e le azioni che possiamo fare durante la creazione di una 'automazione'. Nelle info troviamo il device Id, etc._
<table width = "100%"><tr><td>
Le informazioni accessibili con SmartLife non esauriscono le potenzialità di un device, e spesso, per ulilizzare un device al meglio sia con SmartLife che con l'aiuto di altre APP, occorrono maggiori informazioni: esempio Key di accesso, informazioni sui dati, come il Dp (Data Point) di uso interno, etc... che non sono utilizzati o accessibili con SmartLife. Anche solo l'elenco completo dei dati RT di un device era un'informazione difficile da reperire un anno fà.</td><td   width="300pt">
<img src="https://github.com/msillano/IoTwebUI/blob/main/pics/app02.png?raw=true">
</td></tr></table>


### Risultati
Questa applicazione permette un rapido e semplice accesso ai principali dati riguardanti un device, così come sono ottenuti da tuyaAPI:

1. **Tuya Info**
Una serie di 'attributi' riguardanti il device: `category`, `icon`, `is_online`, `sub`, etc...
2. **Tuya standard set** 
Elenco (ridotto) di dati RT, associati ad una categoria (tipo). Divisi in 'status' (RO) e 'functions' (RW). Tuya usa questo modello quando mancano informazioni specifiche. Esempio, device Zigbee NON Tuya campatibili! Oppure per aggiornamenti rapidi.
3. **Tuya model**
Elenco specifico di dati RT, associati ad un device Tuya. In genere più ricco dello 'standard model'.
4. **Tuya schema**
Elenco dettagliato (segue 'Tuya model') dei dati RT specifici di un device, ma con info extra, e.g. l'indice DP (sostuito da 'code') e gli attuali valori. Questi dati sono utilizzati da CLONE01() per costruire la copia di un device, quando interessa un dato RT presente 'schema' ma non in 'standard model'. 
5. **IoTwebUI**
Elenco completo (attributi e dati RT - segue 'standard model') dei dati presenti in IoTwebUI, con gli attuali valori. Questi valori sono tutti accessibili dall'utente e utilizzabili nelle REGOLE usando le MACRO GET() per i dati e GETATTRIBUTE() per gli altri attributi.
   




