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

### SmartLife - standard installation ###
La soluzione più semplice consiste nell'usare SmartLife sul Tablet, associandolo alla versione principale come 'membro comune'. 
Nella versione attuale di SmarLife (6.9.0) è molto migliorata la possibilità di configurazione della 'home page' di ciascuna `CASA`(home).
 1. L'opzione menu `'Me' => Configurazione => Impostazioni Smart control` abilita le customizzazioni.
 1. L'opzione menu `'Me' => Configurazione => modalità Tablet`, permette di passare da un layout verticale (standard) a uno orizzontale. Nota: un layout ottimizzato in un modo NON funziona nell'altro, occorre riorganizzarlo!
 2. Nella home page è ora presente un nuovo menu (3 punti in un cerchio) con 3 opzioni: `Tutti i dispositivi`, `Elenco stanze` e `Gestisci la 'Home page'`, che abilita le modifiche.
3. In modalità 'gestione' è possibile spostare i widdet trascinandoli
4. con il bottone `'aggiungi scheda'` (widget) si possono aggiungere/eliminare 3 tipi di widget:
   - **Domotica**, i.e.  widget (12) gestionali e miniAPP più tutte le stanze
   - **Dispositivi**: tutti i device con widget tipizzati che mostrano stato e principali comandi
   - **Esegui con un clic** (tap-to-run): per scegliere i comandi presenti nella home page.

E' quindi presente una completa flessibilità funzionale per la home page, equiparabile a quella degi 'smart panels', con ancora alcuni limiti di carattere estetico:
    - non esistono nè separatori nè box
    - non è possibile cambiare il numero di colonne dell'impaginazione nè le icone o le dimensioni dei widget
    - Perfino il colore dei bottoni dei tap-to-run è definito una tantum tramite l'APP del proprietario!

Nonostante la persistenza di questi limiti, questa è una soluzione semplice, funzionalmente completa, che vale la pena almeno provare.
E devo dire che usare SmrtLife con uno schermo da 10" è veramente molto gradevole, con finalmente una tastiera su schermo di adeguate dimensioni!

**Installazione di una APP smart**
Per il già enunciato principio 'minimalista' non voglio usare Google Play per il download delle APP, evitando così ogni iscrizione ed interferenza da parte di Google. Userò quindi store alternativi.

1. Scaricare ed installare **APKpure APP** dalla  sua pagina WEB ( https://apkpure.com/ ).
2. Cercare e scaricare **Smart Life** (o **Tuya Smart**, o anche **Moes APP** - che presenta il grande vantaggio di icone custom) ma ATTENZIONE deve essere la stessa APP usata dal Proprietario, altrimenti non potete aggiungere un nuovo utente!
3. Installate sul tablet l'APP (e.g. SmartLife). A volte dovete aprire APKpure e scegliere il menu `Me => APK/XAPK` per installare il file scaricato se l'installazione non è automatica. 
4. Ho creato un indirizzo di email solo per questo uso (uno free: Libero, Gmail ecc.) e scelto un nome utente qualsiasi, ad es. 'tablet', per la registrazione con Tuya (n.b. scrivete in un posto sicuro questi due dati di accesso!).
5. Ora sull'APP (SmartLife) del proprietario, tramite il menu `Me => Gestione casa` scegliere una casa,  poi `Aggiungi membri, condividi Account dell'app`, poi inserire il nome (tablet) e l'indirizzo di email usato.
6. Solo dopo aver accettato, il Tablet diventa un membro della famiglia e visualizzerà i device della casa scelta.
7. Per più case, ripetere i passi 5 e 6 per ogni casa.
8. Ultima cosa, Tablet: `Impostazioni => Batteria => 3 punti verticali => ottimizzaBatteria`. Nella videata clicca su `Senza ottimizzazione` e poi `Tutte le app`.
Cercare nell'elenco **SmartLife**, cliccare su `SmartLife` e scegliere `Non ottimizzare`!

### SmartLife - extreme installation ###

_Per cercare di ottenere le massime prestazioni, la strada migliore è ridurre le attivita in backgraund, riducendo drasticamente applicazioni, iscrizioni etc. <br>
E' destinato agli utenti più esperti, ma i risultati valgono lo sforzo._

I passi da effettuare sono indicati un po' sommariamente: fatevi aiutare da un'AI per i dettagli e per superare le eventuali difficoltà, come ho fatto anch'io!

1. **Pulizia iniziale del sistema** (eliminare tutto ciò che NON serve):
   - Tablet: Andare in Impostazioni > App > Tutte le app.
   - Per ogni APP, cliccare su Disabilita o Disinstalla. Questo impedirà loro di eseguire qualsiasi operazione (Alcune APP non permettono nè Disabilita o Disinstalla: lasciatele).
2. **Eliminazione di Google play** tramite ADB, richiede un PC WIND, complesso ma è indispensabile per evitare alcune incompatibilità con APKpure.
   
   1.Tablet: Abilitare il debug USB:
        - Andare in `Impostazioni > Informazioni sul tablet > Build number` e toccare per 7 volte per sbloccare le Opzioni sviluppatore.
         - Indietro, scegliere `Opzioni sviluppatore` ed abilitare _Debug USB_.
   2. Tablet, eliminare i diritti di amministrazione:
         - `Andare su Sicurezza => Amministratori dispositivo`, e togliere la spunta a tutte le APP

   3. PC: Preparare il computer:
         - Scaricare e installare _Android SDK Platform-Tools_ (che contengono adb). [Download diretto da Google per Windows/Mac/Linux](https://developer.android.com/tools/releases/platform-tools?hl=it) 
         - Collegare il tablet al PC via USB. Quando apparirà una richiesta di autorizzazione sul tablet, concedere i permessi.
    
   4. PC: comandi di disinstallazione
Eseguire i comandi di disinstallazione:
        - Aprire un terminale (Prompt dei comandi, PowerShell o Terminale) nella cartella dove hai installato adb. (Se si è installato l'intero _Android Studio_ si trovano invece in `C:\Users\(utente)\AppData\Local\Android\Sdk\platform-tools\adb.exe` )
       - Eseguire questi comandi uno dopo l'altro:

```
            ./adb.exe shell pm uninstall --user 0 com.google.android.gms
            ./adb.exe shell pm uninstall --user 0 com.google.android.gsf
            ./adb.exe shell pm uninstall --user 0 com.android.vending
```

 Questi comandi rimuovono i pacchetti per l'utente corrente (0) senza eliminarli definitivamente dal sistema. Lo "disinstalla" efficacemente.
 
     - `com.google.android.gms`: Il pacchetto principale di Google Play Services.
     - `com.google.android.gsf`: Google Services Framework (un componente di supporto).
     - `com.android.vending`: Google Play Store (se presente).

Nota: Questa operazione è reversibile solo tramite un reset completo di fabbrica del tablet.

3. installare SmartLife
   1. Scaricare ed installare **APKpure APP** dalla  sua pagina WEB ( https://apkpure.com/ ).
   2. Cercare e scaricare **Smart Life** (o **Tuya Smart**, o anche **Moes APP** - che presenta il grande vantaggio di icone custom) ma ATTENZIONE deve essere la stessa APP usata dal Proprietario, altrimenti non potete aggiungere un nuovo utente!
   3. Installate sul tablet l'APP (e.g. SmartLife). A volte dovete aprire APKpure e scegliere il menu `Me => APK/XAPK` per installare il file scaricato se l'installazione non è automatica. 
   4. Ho creato un indirizzo di email solo per questo uso (uno free: Libero, Gmail ecc.) e scelto un nome utente qualsiasi, ad es. 'tablet', per la registrazione con Tuya (n.b. scrivete in un posto sicuro questi due dati di accesso!).
   5. Ora sull'APP (SmartLife) del proprietario, tramite il menu `Me => Gestione casa` scegliere una casa,  poi `Aggiungi membri, condividi Account dell'app`, poi inserire il nome (tablet) e l'indirizzo di email usato.
   6. Solo dopo aver accettato, il Tablet diventa un membro della famiglia e visualizzerà i device della casa scelta.
  7. Per più case, ripetere i passi 5 e 6 per ogni casa.
  8. Ultima cosa, Tablet: `Impostazioni => Batteria => 3 punti verticali => ottimizzaBatteria`. Nella videata clicca su `Senza ottimizzazione` e poi `Tutte le app`.
Cercare nell'elenco **SmartLife**, cliccare su `SmartLife` e scegliere `Non ottimizzare`!


###IoTwebUI###
