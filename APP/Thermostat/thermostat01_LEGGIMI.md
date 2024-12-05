# WEB Termostato 

Questo è un termostato completo SW che utilizza le misure di uno (o più) sonde di temperatura Tuya per controllare uno smart switch per il riscaldamento (raffrescamento).

### Virtual 
Ha un'interfaccia su SmartLife di uso anche remoto, utilizzando un device virtuale (https://www.tuyaexpo.com/product/1104012), che permette le principali funzioni di controllo utente:

![](https://github.com/msillano/IoTwebUI/blob/main/pics/virtual%20thermo.png?raw=true)

_Switch_: ON/OFF, agisce sul riscaldamento/raffrescamento <br>
_Mode:_ scelta tra Manual, ECO, Program. 
   * Manual: temperatura target regolabile in step di 0.5 °C
   * ECO è una temperatura predefinita (configurabile).
   * Program: per definire il profilo di temperatura non si usa l'intefeccia virtuale (limitata a 4 fasce), ma è impostabile in configurazione, senza limiti di intervalli giornalieri.

_nota: le funzioni legate all'HW non sono, ovviamente, utilizzabili in un device virtuale! (Sono cancellate nella figura)_

### x_device 
Un'**x_device** (WEB Thermostat) si occopa di:
   1. Connessione con i sensori di temperatura (reali), uno o più di uno: è usata una media mobile per migliorare la sensibilità e ridurre il rumore.
   2. Connessione con il device virtuale per leggere i valori scelti dall'utente.
   3. Logica di funzionamento del termostato:
       * Alla temperatura letta dalle sonde è applicabile un offset di correzione (in config).
       * Effettua i paragoni con +/- un delta regolabile (in config), è quindi un comparatore conisteresi. Consigliato 0.3°C
       * In modo 'auto' una variazione manuale ha effetto fino alla successiva temperatura programmata.
       * `TimeON` fornisce il tempo di accensione giornaliero (in ore). Il conteggio riparte ogni giorno alle 24:00
   4. Sono presenti due uscite: una per riscaldamento (`HOTout`) e una per raffrescamento (`COLDout`). Valori `true/false`.
  
  ![](https://github.com/msillano/IoTwebUI/blob/main/pics/IoTwebUI03.png?raw=true)
  
Tutti i dati sono visibili nel tooltip di IoTwebUI, quindi accessibili tramite 'RULE'.
In particolare servono due REGOLE per agire sullo swart switch del riscaldamento (raffrescamento).
```  
    if(GET("WEB Thermostat","HOTout", false)) SCENE("HOTTURNON"); 
    if(!GET("WEB Thermostat","HOTout", false)) SCENE("HOTTURNOFF");
``` 
_`HOTTURNON` e `HOTTURNOFF` sono due 'tap-to-run' Tuya che accendono/spengono il riscaldamento: sono richiamate ad ogni loop._

Se il riscaldamento segue un orario predefinito, sono utili due 'autmazioni' che accendano/spengano il device virtuale agli stessi orari:
```
## thermostatSTART:
Se 
 . Pianifica ore 7:00 (Ogni giorno)
Poi
 . HeatingThermostat-vdev0.Switch : ON

## thermostatSTOP
Se 
 . Pianifica ore 23:00 (Ogni giorno)
Poi
 . HeatingThermostat-vdev0.Switch : OFF
```
Un'altro aspetto interessante è che si può usare un solo device virtuale per più x-device (e.g. uno per stanza) ognuno con le sue sonde, i suoi profili e lo 'smart relay' o una elettrovalvola comandata! Unica avvertenza cambiare il nome (function THERMOSTAT01(...)) ad ogni istanza.

### Interfaccia utente
**WEB thermostat** è completo per funzionare. Volendo, IoTwebUI offre Allarmi e l'esportazione su file dei dati per chi desidera conservarli od eseguire ulteriori elaborazioni.
E' anche disponibile una interfaccia WEB ad hoc, che utilizza RESTserver,  pertenere sott'occhio tutti dati!<bvr>
_nota: l'interfaccia è del tutto opzionale, non interviene sulla logica di funzionamento di Thermostat._
