### intro ###  
Una categoria di dispositivi solleva molto interesse ultimamente, gli _**smart control panel**_ (https://it.aliexpress.com/w/wholesale-tuya-smart-control-panel-10-inch.html) perché è comodo avere un pannello fisso, accessibile a tutti i familiari, senza dover usare sempre lo smartphone, con una grafica molto accattivante!<br/>
<img width="664" height="375" alt="2025-08-30 10_03_00-10 Inchtuya Touch Control Panel, Smart Home ,smart Switch,smart Touch Screen Pan" src="https://github.com/user-attachments/assets/8279bc14-3bbf-43e9-8467-df502a575bfa" /> <br/>
Esaminando in dettaglio l'esempio commerciale in figura, troviamo una serie di widget posizionati su un dashboard. Dall'alto si riconoscono: orologio, meteo e un controllo per la riproduzione di musica;  i comandi dell'antifurto; seconda riga: due bottoni (uno forse collegato a un 'tap-to-run', l'altro per applicazioni vocali), un controllo per tende, un termostato ambiente e un dimmer per la luce.<br>
In generale, analizzando questo tipo di prodotti troviamo:

 **funzionalità**

 - alcuni gadget extra: orologio, meteo, musica, controllo vocale Alexa etc...
 - controllo diretto di alcuni  device (dimmer, termostato, serrande...)
 - lancio di 'tap-to-run'

**look and feel**

  - Un dashboard che presenta una scelta di widget graficamente molto curati ed omogenei 
 - Troviamo widget specializzati solo per i gadget e per alcuni device (in genere pochi) 
 - Oppure widget universali per 'tap-to-run'
  - La scelta dei widget visualizzati e la disposizione nel dashboard sono sotto controllo utente.
  - Nessuna possibilità di personalizzare/creare widget custom, e.g. per particolari device.

  Risulta evidente la limitatezza delle funzioni offerte da device di questo tipo, che ha portato più di uno a cercare soluzioni diverse (e più economiche) utilizzando tablet.

_Questo progetto vuole analizzare le opzioni a disposizione di un utente per utilizzare un **tablet** come **smart panel control Tuya**, fornendo una guida passo passo._

### HW: Tablet ###
L'idea di questo progetto mi è nata trovando su AliExpress l'interssante offerta di questo tablet (ref: https://it.aliexpress.com/item/1005008843917320.html ) da 10".<hr/>
<img width="1125" height="453" alt="image" src="https://github.com/user-attachments/assets/59f253f3-8661-46f3-8506-169023585748" /><hr/>
<table><tr><<td>
<b>Specifiche del costruttore</b><br/>
<li> CPU:10 core
<li> RAM: 16GB
<li> ROM: 1TB
<li> Screen size: 10.36 inch (21.5 x 13.5 cm)
<li> Screen resolution:2560*1600
<li> Camera type: Dual cameras - Front camera: 16.0MP - Rear camera: 32.0MP
<li> WiFi: 802.11 a/b/g/n/ac wireless internet
<li> Bluetooth: Yes
<li> External Memory: TF card up to 128GB (not included)
<li> Support network: 2G/3G/4G/5G
<li> SIM:2 Nano SIM 
<li> OTG: Support
<li> Type-C Slot: Yes
<li> 3.5mm Headphone Jack: Yes
<li> Battery type:Li-ion battery, 12000mAh
<li> Sensor: G-sensor
<li> Languages:Android OS 13 multi-language.
</td>
<td width='25%'>
<img src='https://github.com/user-attachments/assets/e207085e-f01d-40df-bcfe-663ab924bfa8'><br/>APP  preinstallate 
<img src='https://github.com/user-attachments/assets/cb043885-d5c0-4bcb-ba9b-9831fdd7d81d'><br/>Cornice superiore aperta
</td>
</tr>
</table>



**Commento**

1. La strategia per questo progetto è volutamente 'minimalista': ho scelto il modello più economico (12G/256G), non uso SIM nè TF, etc...
2. Il tablet consegnato (rapidamente, da un deposito europeo) rispetta le specifiche. Una piacevole sorpresa.
3. Nonostante il 'core 10' il tablet risulta MOLTO lento, al limite dell'usabilità in un impiego standard. Appaiono spesso i pop-up "L'applicazione non risponde" (scegliere 'attendi').
Per gli obiettivi del progetto ho deciso di proseguire comunque e di valutare i risultati alla fine.<br>
AVVISO:  per questo motivo, in alcune fasi dell'installazione, occorre molta, ma MOLTA pazienza!
4. Anche se i 12000 mA di batteria permettono solo 2 ore di uso continuato a schermo illuminato, questo non è un problema: a regime i 'control panel' hanno l'alimentazione fissa.
5. Un particolare non presente nel manuale: il bordo superiore è removibile, offrendo accesso alle due SIM e TF (non usate in questo progetto)."Removing the top cover in one of the corners, there is a small notch to pull it with your fingernail so the cover comes off and there are the 3 slots for the cards."

**Installazione**

Le operazioni preliminari effettuate sono state:
- impostare linguaggio 'italiano'
- impostare fuso orario 
- impostare accesso WiFi

###SmartLife###

La soluzione più semplice consiste nell'usare SmartLife sul Tablet.

###IoTwebUI###
