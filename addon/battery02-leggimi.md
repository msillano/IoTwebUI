# BATTERY02 - x-device: deep battery status test

![](https://github.com/msillano/IoTwebUI/blob/main/pics/battery021.png?raw=true)

### Descrizione
Questo test è preciso e fornirnisce informazioni anche sulle batterie necessarie.<br>
Ha le proprietà visibili in figura.
- La proprietà `home` è RO: è predefinita nel codice.
- Le altre proprietà sono dinamicamente calcolate (RO).
- Funzionamento: utilizza un elenco aggiornato dei device.

Ver. 1.0 20/08/2024  (c)marco.sillano@gmail.com <br>
 28/10/24 - I also added a test for equal to a text value (e.g. 'low')
          - The numerical test is now  'device.status.code <= min%'

#### Pro
- Assenza di errori nell'individuare i device
- Informazioni aggiuntive sulle batterie necessarie
- Livello minimo ottimizzabile per ogni device

#### Contro
- Senza Auto-discovery, c'è la necessità di creare/mantenere un elenco di TUTTI i device da testare
- La 'Home' non è definita al rum-time, ma nel codice: è quella a cui si riferisce l'elenco.
- Ho provato alternative più efficienti, ad esempio usare le 'category' per raggruppare i device, nell'ipotesi che 'category' uguali comportino le stesse proprietà, ma purtroppo così non è, come ho controllato usando CLASSIFY01.  

### Installazione
- Aggiornare dove creare l'x-device: home, room, nome (e.g.:'ADMIN', 'maintenance', 'Battery test2')
- Aggiornare la vostra _'home'_ nel codice
- Creare/mantenere un elenco di TUTTI i device da testare.
- (opzionale) cambiare nome, icona, colore a questa **x-device**

