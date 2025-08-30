### intro ###  
Una categoria di dispositivi solleva molto interesse ultimamente, gli _**smart control panel**_ (https://it.aliexpress.com/w/wholesale-tuya-smart-control-panel-10-inch.html) perché è comodo avere un pannello fisso, accessibile a tutti i familiari, senza dover usare sempre lo smartphone, con una grafica molto accattivante!
<img width="664" height="375" alt="2025-08-30 10_03_00-10 Inchtuya Touch Control Panel, Smart Home ,smart Switch,smart Touch Screen Pan" src="https://github.com/user-attachments/assets/8279bc14-3bbf-43e9-8467-df502a575bfa" />
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

**Specifiche del costruttore**
- CPU:10 core
- RAM: 16GB
- ROM: 1TB
- Screen size: 10.36 inch (21.5 x 13.5 cm)
- Screen resolution:2560*1600
- Camera type: Dual cameras (one front one rear)
   - Front camera: 16.0MP
   - Rear camera: 32.0MP
- WiFi: 802.11 a/b/g/n/ac wireless internet
- Bluetooth: Yes
- External Memory: TF card up to 128GB (not included)
- Support network: 2G/3G/4G/5G
- SIM:2 Nano SIM 
- OTG: Support
- Type-C Slot: Yes
- 3.5mm Headphone Jack: Yes
- Battery type:Li-ion battery, 12000mAh
- Sensor: G-sensor
- Languages:Android OS 13 multi-language.

**Commento**
a. La strategia per questo progetto è volutamente 'minimalista': ho scelto il modello più economico, non uso SIM nè TF, etc...
b. Il tablet consegnato (rapidamente, da un deposito europeo) rispetta le specifiche. Una piacevole sorpresa.
c. Nonostate il 'core 10' il tablet risulta MOLTO lento, al limite dell'usabilità in un impiego standard. Appaiono spesso i pop-up "L'applicazione non risponde" (scegliere 'attendi').
Per gli obiettivi del progetto ho deciso di proseguire comunque, e di valutare i risultati alla fine.
d. Anche se i 12000 mA di batteria permettono 2 ore di uso continuato a schermo illuminato, questo non è un problema, essendo i 'control panel' con alimentazione fissa.
c. Un particolare non presente nel manuale: il bordo superiore è removibile, offrendo accesso a SIM e TF.


###SmartLife###

###IoTwebUI###
