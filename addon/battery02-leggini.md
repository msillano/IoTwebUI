# BATTERY02 - x-device: battery status test

### Descrizione
![](https://github.com/msillano/IoTwebUI/blob/main/pics/battery02.png?raw=true)

Questo test è preciso e fornirnisce informazioni anche sulle batterie necessarie.<br>
Ha le proprietà visibili in figura.
- La proprietà `home` è RO: è predefinita nel codice.
- Le altre proprietà sono RO.
- Funzionamento: utilizza un elenco aggiornato dei device.

Ver. 1.0 20/08/2024  (c)marco.sillano@gmail.com 

#### Pro
- Assenza di errori nell'individuare i device
- Informazioni aggiuntive sulle batterie necessarie
- Livello minimo ottimizzabile per ogni device

#### Contro
- Senza Auto-discovery, c'è la necessità di creare/mantenere un elenco di TUTTI i device da testare
- La 'Home' è definita nel codice: quella a cui si riferisce l'elenco.

### Installazione
- Aggiornare la vostra _'home'_ nel codice
- Creare/mantenere un elenco di TUTTI i device da testare.
- (opzionale) cambiare nome, icona, colore a questa **x-device**

