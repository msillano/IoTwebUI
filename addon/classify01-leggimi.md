# CLASSIFY01 - x-device: device list by category

![](https://github.com/msillano/IoTwebUI/blob/main/pics/Schermata9-04.jpg?raw=true)

### Descrizione
Fornisce un elenco dei device presenti in un HOME o in tutte, suddivisi per categoria (is-a)<br>
Ha le proprietà visibili in figura.
- La proprietà `home` è RW: se viene cambiata, aggiorna automaticamente i device (null=tutte).
- La proprietà `mode` è RW, valori: 'all'|'online'|'offline'. Se viene cambiata, aggiorna i device.
- Le altre proprietà sono RO.
- Durante le fasi di elaborazione l'**x-device** risulta offline. 
- In modo esperto la lista contiene anche l'ID del device.

![image](https://github.com/user-attachments/assets/fc80ada6-afa0-47d9-9b82-1ab47e7b8c42)

Ver. 1.0 02/09/2024  (c)marco.sillano@gmail.com 

#### Pro
- semplicità d'uso, praticamente NON richiede interventi di customizzazione.
 
#### Contro
- può generare tooltip molto lunghi.

### Installazione
- Scegliere Home e Room (aggiornare il codice). Nel caso in figura si è usato 'ADMIN' e 'System'.
- Gli altri parametri (nome del device, home analizzata, modo) possono essere passati nell'attivazione della MACRO.
- (opzionale) cambiare nome, icona, colore a questa **x-device**.


