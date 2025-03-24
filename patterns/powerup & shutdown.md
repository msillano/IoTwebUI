### Pattern 
_powerup & shutdown_


### Spiegazione del Pattern e Implementazioni

**Modello Concettuale**  
 Molte volte si è interessati a monitorare e si vogliono intraprendere azioni in caso di blachout.

**Esempi**<br>

* **Powerup**: Molti relay hanno un'opzione (spesso chiamata 'stato') che contolla il comportamento del device al ritono della 230: sono disponibili tre opzioni ON, OFF, memoria. Altri relay e altre device (e.g. luci smart) ne sono sprovvisti. Un evento che segnala il 'powerup' può essere utile in questi casi per un default razionale.

* **Shutdown**: Non tutto l'impianto elettrico è in genere sotto UPS. Quindi alcune azioni possono risultare ineseguibili per la mancanza della 230. Un seganale '230 assente' può essere utilizzato per condizionare alcune attività.

& Shutdown
