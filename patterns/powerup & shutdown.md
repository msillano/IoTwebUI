### Pattern 
_powerup & shutdown_


### Spiegazione del Pattern e Implementazioni

**Modello Concettuale**  
Molte volte si è interessati a monitorare la rete a 2309V e si vogliono intraprendere azioni in caso di blackout.<br>
_Ovviamente una parte dei dispositivi Tuya (Router, HUB o gateway, qualche device) devono essere alimentati con un UPS per continuare a funzionare!_

**Esempi**<br>

* **Powerup**: Molti relay hanno un'opzione (spesso chiamata 'stato') che contolla il comportamento del device al ritono della 230: sono disponibili tre opzioni ON, OFF, memoria. Altri relay e altri device (e.g. luci smart) ne sono sprovvisti. Un evento che segnala il 'powerup' può essere utile in questi casi per un default razionale.

* **Shutdown**: Non tutto l'impianto elettrico è in genere sotto UPS. Quindi alcune azioni possono risultare ineseguibili per la mancanza della 230. Un seganale '230 assente' può essere utilizzato per condizionare alcune attività.

---
### Powerup  ('local linking', Switch Zigbee)
**Device**: _Switch Zigbee (SWITCH) con funzione `stato` e `inching`_.

![image](https://github.com/user-attachments/assets/c888d43a-6ab2-45e0-8d02-5c31ae7179bd)

* Il device è solo alimentato
* La configurazione del device deve essere:
   * `stato` all'avvio = ON
   * `inching` = 2-10s (variabile)

![image](https://github.com/user-attachments/assets/1957a83d-8e63-42c9-a5da-c30df3282f49)

