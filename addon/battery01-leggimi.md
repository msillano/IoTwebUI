# BATTERY01 - x-device: battery status auto-test

### Descrizione
![](https://github.com/msillano/IoTwebUI/blob/main/pics/battery01.png?raw=true)
Ha le proprietà visibili in figura.
- La proprietà 'home' è RW: se viene cambiata, aggiorna i device.
- La proprietà 'low level' è anch'essa RW, è usata per tutti i valori letti.
- Le altre proprietà sono RO.
- Funzionamento in auto-discovery dei device Tuya, basato sulle loro proprietà.

Ver. 1.0 30/08/2024  (c)marco.sillano@gmail.com 

#### Pro
- semplicità d'uso, praticamente NON richiede interventi di customizzazione
#### Contro
- Mancano dettagli sulle batterie necessarie
- auto-discovery può fare errori: in figura device  è virtuale, cioè senza batterie, ma il suo status riporta batteria a 0.

### Customizzazioni
- aggiungere altre _proprietà al test_, se richiesto dai vostri device
- Usare la vostra _'home'_ come default
- (opzionale) cambiare nome, icone, colore all'**x-device**

