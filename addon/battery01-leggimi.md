# BATTERY01 - x-device: battery status auto-test


![](https://github.com/msillano/IoTwebUI/blob/main/pics/battery01.png?raw=true)

### Descrizione
Auto-discovery dei device con batterie scariche, per ogni HOME. <br>
Per risparmiare risorse, la verifica è effettuata solo all'avvio oppure RT al cambio di una delle proprietà.<br>
Ha le proprietà visibili in figura.
- La proprietà `home` è RW: se viene cambiata, aggiorna i device.
- La proprietà `low level` è anch'essa RW: se viene cambiata, aggiorna i device.
- Le altre proprietà sono RO.
- Funzionamento in _auto-discovery_ dei device Tuya, basato sulle proprietà dei device.
- Come esempio è fornito il codice di REGOLE per cambiare al RT sia  `home` che `low level`.

Ver. 1.0 20/08/2024  (c)marco.sillano@gmail.com 
       28/10/24 - I also added a test for 'low' value.

#### Pro
- semplicità d'uso, praticamente NON richiede interventi di customizzazione

#### Contro
- Mancano dettagli sulle batterie necessarie
- auto-discovery può fare errori: in figura device `'low8'`  è virtuale, cioè senza batterie, ma il suo status riporta batteria a 0.

### Installazione
- Aggiungere altre _proprietà al test_, se richiesto dai vostri device
- Aggiornare dove creare l'x-device: home, room, nome (e.g.:'ADMIN', 'maintenance', 'Battery test')
- Usare una vostra _'home'_ esistente come default
- (opzionale) cambiare icona, colore a questa '**x-device**

