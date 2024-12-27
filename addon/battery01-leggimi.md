# BATTERY01 - x-device: battery status auto-test


![](https://github.com/msillano/IoTwebUI/blob/main/pics/battery01.png?raw=true)

### Descrizione
Auto-discovery dei device con batterie scariche, per ogni HOME. <br>
Ha le proprietà visibili in figura.
- La proprietà `home` è RW: se viene cambiata, aggiorna i device.
- La proprietà `low level` è anch'essa RW: se viene cambiata, aggiorna i device.
- Le altre proprietà sono RO.
- Funzionamento in _auto-discovery_ dei device Tuya, basato sulle proprietà dei device.
- Come esempio è fornito il codice di REGOLE per cambiare al RT  `home`.
- In Expert mode, oltre al nome fornisce anche gli id dei device.
- Il tooltip è exportabile ([CTRL]+click) con copia/incolla, formato CSV (usare ':' come separatore).

Ver. 1.2 23/12/2024 update
- Added control on the user's home
- Added metadata for "Explore Scene"

Ver. 1.1 03/11/2024 breaking update
- Added parameters to MACRO to allow multiple instances
- In EXPERT mode added device's IDs

Ver. 1.0 20/08/2024  (c)marco.sillano@gmail.com <br>
       28/10/24 - I also added a test for 'low' value.<br>
       
 ![](https://github.com/msillano/IoTwebUI/blob/main/pics/Screenshot%202024-12-27%20185538.png?raw=true)
Grafo sinottico di battery01.

#### Pro
- semplicità d'uso, praticamente NON richiede interventi di customizzazione

#### Contro
- Mancano dettagli sulle batterie necessarie
- auto-discovery può fare errori: in figura device `'low8'`  è virtuale, cioè senza batterie, ma il suo status riporta batteria a 0.

### Installazione
- Istruzioni dettagliate nel file BATTERY01.X.js
- Aggiornare la posizione dell'x-device: home, room, nome (e.g.:'ADMIN', 'maintenance', 'Battery test')
- Usare una vostra _'home'_ esistente come default (e.g. 'ROMA')
- (opzionale) Aggiungere altre _proprietà al test_, se richiesto dai vostri device
- (opzionale) Cambiare icona e/o colore a questa '**x-device**

