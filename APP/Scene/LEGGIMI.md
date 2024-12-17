# Explore scene

### Obiettivi
_Questa APP ha come obiettivo agevolare lo sviluppo e la documentazione delle scene (Automazioni e Tap-to-run) di Tuya (SmartLife o Tuya Smart APPs)._
Sostanzialmente sono prodotti due ertefatti: un elenco di tutte le scene con le principali caratteristiche, ed un grafo con le relazioni tra le scene e le device coinvolte. 

<table width = "100%"><tr><td>
Una visione d'insieme permette di valutare meglio le relazioni tra i vari elementi,

Il menu offre quqttro scelte:<br>
* **Automation** genera una tabella (per la stampa meglio ilfoglio orizzontale) con tutte le automazioni presenti 
* **Tap-to-run** genera un tabella con tutti i tap-to-run
* **Tuya grapho** genere un grapho con tutte le automazioni, i tap-to-run e le device coinvolte.

</td><td   width="200pt">
<img src="https://github.com/msillano/IoTwebUI/blob/main/pics/scene01d.png?raw=true">
</td></tr></table>

![](https://github.com/msillano/IoTwebUI/blob/main/pics/Scene01b.png?raw=true)
![](https://github.com/msillano/IoTwebUI/blob/main/pics/scene01a.png?raw=true)
### Risultati

1. **Tuya Info**
Fornisce una serie di **attributi** riguardanti il device: `id`, `local_key`, `category`, `is_online`, `sub` etc...
2. **Tuya standard set** 
Descrizione dei **dati RT**, associati ad una categoria (tipo). Divisi in 'status' (RO) e 'functions' (RW). Tuya usa questo modello quando mancano informazioni specifiche. Esempio, device Zigbee NON Tuya campatibili! Oppure per aggiornamenti rapidi.
3. **Tuya model**
Descrizione specifica dei dati RT, associati ad un device Tuya. In genere più ricca dello 'standard model'.
4. **Tuya schema**
Elenco dettagliato (segue 'Tuya model') dei dati RT specifici di un device, ma con info extra, e.g. l'indice DP (sostuito da 'code') e gli attuali valori. Questi dati sono utilizzati dalla MACRO [CLONER01()](sillano/IoTwebUI/blob/main/addon/cloner01-leggimi.md) per costruire/mantenere la copia di un device, quando interessa un dato RT presente 'schema' ma non in 'standard model'. 
5. **IoTwebUI**
Elenco completo (attributi e dati RT - segue 'standard model') dei dati presenti in [IoTwebUI](https://github.com/msillano/IoTwebUI), con gli attuali valori. Questi valori sono tutti accessibili dall'utente e utilizzabili nelle REGOLE usando le MACRO GET() per i dati e GETATTRIBUTE() per gli altri attributi.


   




