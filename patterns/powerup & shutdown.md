### Pattern 
_powerup & shutdown_


### Spiegazione del Pattern e Implementazioni

**Modello Concettuale**  
Molte volte si è interessati a monitorare la rete a 2309V e si vogliono intraprendere azioni in caso di blackout.<br>
_Ovviamente una parte dei dispositivi Tuya (Router, HUB o gateway, qualche device) devono essere alimentati con un UPS per continuare a funzionare!_

**Esempi**<br>

* **Powerup**: Molti relay hanno un'opzione (spesso chiamata 'stato') che contolla il comportamento del device al ritono della 230: sono disponibili tre opzioni ON, OFF, memoria. Altri relay e altri device (e.g. luci smart) ne sono sprovvisti. Un evento che segnala il 'powerup' può essere utile in questi casi per un default razionale.

* **Shutdown**: Non tutto l'impianto elettrico è in genere sotto UPS. Quindi alcune azioni possono risultare ineseguibili per la mancanza della 230. Un seganale '230 assente' può essere utilizzato per condizionare alcune attività.

Circuito

![image](https://github.com/user-attachments/assets/c888d43a-6ab2-45e0-8d02-5c31ae7179bd)

---
### Implementazione Powerup  ('local linking', Switch Zigbee)
**Device**: _Switch Zigbee (STARTUP) con funzione `stato` e `inching`_.

* Il device è solo alimentato, come in figura
* La configurazione del device deve essere:
   * `stato` all'avvio = ON
   * `inching` = 2-10s (variabile)

**Logica**:  

1. **Ripristino 230V**:  
   il device STARTUP dispone il suo switch in ON (operazione locale, rapida) per l'impostazione `stato`.

2. **Termine impulso**
    dopo qualche secondo (tempo necessario all'avvio delgli altri device e alla connessione alla rete, da tarare caso per caso) l'`inching` termina lo stato ON di STARTUP (vedi Analyser).

3. **Evento powerup**
   La condizione di powerup è indicata univocamente da questa condizione, utilizzabile nelle automazioni per controllare l'avvio di altre device:
       `STARTUP.Switch = OFF`

Nota: _questa soluzione usa un 'quirk' di Tuya: nel controllo di un condizione, Tuya non prende in considerazione se il relay è 'online' oppure 'offline', quindi `STARTUP.Switch = OFF` può essere usato con tranquillità nelle condizioni, non dando mai 'esecuzione fallita'_.

### Implementazione Shoutdown  ('local linking', Switch Zigbee)
**Device**: 
**Device**: _Switch Zigbee (RETE230) con funzione `stato`_.


* Il device è solo alimentato (vedi figura)
* La configurazione del device deve essere:
   * `stato` all'avvio = ON

1. **funzionamento**:  
  L'uscitya del relay RETE230 è ON se è presente la 230, altrimenti è OFF

2. **Termine impulso**
    dopo qualche secondo (tempo necessario all'avvio delgli altri device e alla connessione alla rete, da tarare caso per caso) l'`inching` termina lo stato ON di STARTUP (vedi Analyser).

3. **Evento powerup**
   La condizione di powerup è indicata univocamente da questa condizione, utilizzabile nelle automazioni per controllare l'avvio di altre device:
       `STARTUP.Switch = OFF`

Nota: _questa soluzione usa un 'quirk' di Tuya: nel controllo di un condizione, Tuya non prende in considerazione se il relay è 'online' oppure 'offline', quindi `STARTUP.Switch = OFF` può essere usato con tranquillità nelle condizioni, non dando mai 'esecuzione fallita'_.

