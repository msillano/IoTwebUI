# Explore device

### Obiettivi
_Pur seguendo delle regole comuni, i device Tuya hanno caratteristiche che variano molto, dipendendo in ultima analisi dai costruttori e dai loro obiettivi commerciali.
Tramite `SmartLife` noi possimo accedere ad alcuni dati di un device: i principali sono presentati nella_ main page _del device, eventualmente con grafici, gli altri nelle pagine di_ configurazione _del device, inoltre durante la creazione di una_ automazione _troviamo quali_ condizioni _possiamo testare e quali_ azioni _possiamo eseguire. Nelle info poi troviamo il device Id, etc._

<table width = "100%"><tr><td>
Le informazioni accessibili con SmartLife non esauriscono le potenzialità di un device, e spesso, per ulilizzare un device al meglio sia con SmartLife che con l'aiuto di altre APP, occorrono maggiori informazioni: esempio la Key di accesso, altre informazioni sui dati, come il Dp (Data Point) di uso interno, etc... che non sono utilizzati o accessibili con SmartLife. Anche solo l'elenco completo dei dati RT di un device era un'informazione difficile da reperire un anno fà.</td><td   width="200pt">
<img src="https://github.com/msillano/IoTwebUI/blob/main/pics/app02.png?raw=true">
</td></tr></table>


### Risultati
Questa applicazione permette un rapido e semplice accesso alle principali strutture riguardanti un device, così come sono ottenute da tuyaAPI o da IoTwebUI:

1. **Tuya Info**
Fornisce una serie di **attributi** riguardanti il device: `category`, `is_online`, `sub`, `local_key` etc...
2. **Tuya standard set** 
Elenco (ridotto) di **dati RT**, associati ad una categoria (tipo). Divisi in 'status' (RO) e 'functions' (RW). Tuya usa questo modello quando mancano informazioni specifiche. Esempio, device Zigbee NON Tuya campatibili! Oppure per aggiornamenti rapidi.
3. **Tuya model**
Elenco specifico di dati RT, associati ad un device Tuya. In genere più ricco dello 'standard model'.
4. **Tuya schema**
Elenco dettagliato (segue 'Tuya model') dei dati RT specifici di un device, ma con info extra, e.g. l'indice DP (sostuito da 'code') e gli attuali valori. Questi dati sono utilizzati dalla MACRO CLONER01() per costruire/mantenere la copia di un device, quando interessa un dato RT presente 'schema' ma non in 'standard model'. 
5. **IoTwebUI**
Elenco completo (attributi e dati RT - segue 'standard model') dei dati presenti in IoTwebUI, con gli attuali valori. Questi valori sono tutti accessibili dall'utente e utilizzabili nelle REGOLE usando le MACRO GET() per i dati e GETATTRIBUTE() per gli altri attributi.


   




