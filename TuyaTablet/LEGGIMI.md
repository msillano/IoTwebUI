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
3. Nonostante il 'core 10' il tablet risulta MOLTO lento, al limite dell'usabilità in un impiego standard. Appaiono spesso i pop-up ANR: "L'applicazione xxxx non risponde" (scegliere 'attendi').
Per gli obiettivi del progetto ho deciso di proseguire comunque e di valutare i risultati alla fine.<br>
AVVISO:  per questo motivo, in alcune fasi dell'installazione, occorre molta, ma MOLTA pazienza!
4. Anche se i 12000 mA di batteria permettono solo 2 ore di uso continuato a schermo illuminato, questo non è un problema: a regime i 'control panel' hanno l'alimentazione fissa.
5. Un particolare non presente nel manuale: il bordo superiore è removibile, offrendo accesso alle due SIM e TF (non usate in questo progetto)."Removing the top cover in one of the corners, there is a small notch to pull it with your fingernail so the cover comes off and there are the 3 slots for the cards."

### A. Installazione iniziale ###
_Se il tablet o lo smartphone che volte usare non è nuovo,potete riportarlo alle condizioni di fabbrica con `Impostazioni > Backup e ripristino > Ripristino dati di fabbrica`: tornerà come nuovo!_

Le operazioni preliminari da effettuare sono:
- impostare linguaggio 'italiano'
- impostare fuso orario 
- impostare accesso WiFi

### B. SmartLife ###

_La soluzione più semplice consiste nell'usare SmartLife sul Tablet, associandolo alla versione principale come 'membro comune'._<br> 
Dico **Smart Life** perchè è su questo che ho fatto le prove, ma può essere **Tuya Smart**, o anche **Moes APP** - che presenta il grande vantaggio di icone custom - ma in ogni caso deve essere la stessa APP usata dal Proprietario, altrimenti non potete aggiungere un nuovo utente!

Nella versione attuale di SmarLife (6.9.0) è molto migliorata la possibilità di configurazione della 'home page' di ciascuna `CASA`(home).
 1. L'opzione menu `'Me' => Configurazione => Impostazioni Smart control` abilita le customizzazioni.
 2. L'opzione menu `'Me' => Configurazione => modalità Tablet`, permette di passare da un layout verticale (standard) a uno orizzontale. <br> Nota: un layout ottimizzato in un modo NON funziona nell'altro, occorre riorganizzarlo!
 3. Nella home page è ora presente un nuovo menu (3 punti in un cerchio) con 3 opzioni: `Tutti i dispositivi`, `Elenco stanze` e `Gestisci la 'Home page'`, che abilita le modifiche.
4. In modalità 'gestione' è possibile spostare i widget trascinandoli
5. con il bottone `'aggiungi scheda'` (widget) si possono aggiungere/eliminare 3 tipi di widget:
   - **Domotica**, i.e.  widget (12) gestionali e miniAPP più tutte le stanze
   - **Dispositivi**: tutti i device con widget tipizzati che mostrano stato e principali comandi
   - **Esegui con un clic** (tap-to-run): per scegliere i comandi presenti nella home page.

E' quindi presente una completa flessibilità funzionale per la home page, equiparabile a quella degi 'smart panels', con ancora alcuni limiti di carattere estetico:
    - non esistono nè separatori nè box
    - non è possibile cambiare il numero di colonne dell'impaginazione nè le icone o le dimensioni dei widget
    - Perfino il colore dei bottoni dei tap-to-run è definito una tantum tramite l'APP del proprietario!
    
<img width="3000" height="663" alt="3viste" src="https://github.com/user-attachments/assets/fbeaed08-a77e-429a-b1e4-ddb45550b192" />

Nonostante la persistenza di questi limiti, questa è una soluzione semplice, funzionalmente completa, che vale la pena almeno provare.
E devo dire che usare SmrtLife con uno schermo da 10" è veramente molto gradevole, con finalmente una tastiera su schermo di adeguate dimensioni!

### C. SmartLife - installazione standard ###

_Questa procedura è la soluzione più semplice e consigliata per la maggior parte degli utenti. Configurando correttamente i servizi Google si evita la causa principale degli errori e si ottiene un sistema stabile, anche a fronte di un carico aggiuntivo di background._

I passaggi seguenti guidano attraverso un reset di fabbrica e una configurazione corretta per evitare i fastidiosi messaggi "L'applicazione non risponde".

#### **Fase 1: Configurazione Iniziale**
L'obiettivo è configurare un account Google per placare i servizi di sistema.

1.  **Configurazione Guidata (Setup Wizard) - Il Passaggio Fondamentale:**
    *   Seguire la procedura guidata di Android per impostare la lingua, la rete Wi-Fi, ecc.
    *   **Fondamentale:** Quando richiesto, **accedere con un account Google esistente o crearne uno nuovo**. Questo step è cruciale per fornire un'identità ai servizi Google e prevenire gli stati di errore che causano gli crash.
    *   *Consiglio: Creare un account Google dedicato (ad es., tablet.casa@gmail.com) per questo scopo specifico. Registrare le credenziali in un posto sicuro.*

#### **Fase 2: Installazione delle App e Ottimizzazione**
1.  **Installare le App dal Play Store:**
    *   Aprire l'app **Google Play Store**.
    *   Cercare e installare **Smart Life**. **Importante:** Deve essere la stessa versione dell'app utilizzata dal proprietario della casa.
    *   Cercare e installare **MacroDroid** (opzionale: per l'automazione dell'avvio).

2.  **Condividere l'Accesso alla Casa:**
    *   Sull'APP Smart Life del **proprietario**, andare in `Me > Gestione casa`, selezionare una casa e poi `Aggiungi membri > Condividi Account dell'app`.
    *   Inserire l'indirizzo email dell'account Google dedicato creato durante il setup ("tablet.casa@gmail.com"). Il tablet, una volta accettato l'invito, visualizzerà i device.
    *   Ripetere l'operazione per ogni casa da condividere.

3.  **Configurare MacroDroid per l'Avvio Automatico:**
    *   Aprire MacroDroid.
    *   Creare una nuova macro:
        *   **Trigger:** `Avvio dispositivo` (Device Boot).
        *   **Azione:** `Avvia applicazione` (Launch Application) > Selezionare **Smart Life**.
    *   Concedere all'app i permessi richiesti.

4.  **Disabilitare l'Ottimizzazione della Batteria per Smart Life:**
    *   Sul tablet, andare in `Impostazioni > Batteria > Risparmio batteria` (o simili).
    *   Trovare l'opzione per gestire l'ottimizzazione (spesso tramite il menu dei tre punti o "Opzioni avanzate").
    *   Selezionare `Tutte le app`, cercare **Smart Life** e impostare l'opzione su **Non ottimizzare**. Questo garantisce che l'app rimanga sempre in esecuzione in background.

#### **Prestazioni e Considerazioni Finali**
La configurazione standard con **Smart Life, MacroDroid e i servizi Google attivi** risulta stabile e senza i messaggi di errore "ANR". Le prestazioni sono ottime per l'uso come pannello di controllo, con un utilizzo della CPU accettabile.

*   **Vantaggio:** Procedura semplice e guidata, adatta a tutti. Massima compatibilità.
*   **Svantaggio:** I servizi Google funzioneranno in background, consumando una certa quantità di risorse (RAM, CPU, batteria) per sincronizzazioni e aggiornamenti.

Questa soluzione rappresenta il miglior compromesso tra semplicità di setup e stabilità di funzionamento per la maggior parte degli utenti.

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

### D. SmartLife - extreme installation ###

_Per ottenere le massime prestazioni da un tablet utilizzato esclusivamente come pannello di controllo, la strategia vincente è eliminare ogni attività in background superflua. Questa guida, destinata a utenti esperti, richiede un po' di impegno ma garantisce un dispositivo reattivo e stabile._

I passaggi sono illustrati in sintesi. Per i dettagli operativi e per superare eventuali difficoltà, non esitate a consultare un'assistente AI, come ho fatto io stesso.

#### **Fase 1: Pulizia Iniziale del Sistema**
L'obiettivo è disinstallare o disabilitare tutto ciò che non è strettamente necessario.
*   Sul tablet, andare in **Impostazioni > App > Tutte le app**.
*   Per ogni applicazione, selezionare **Disinstalla** o **Disabilita**. Questo impedirà loro di funzionare in background.
*   *Nota: Alcune app di sistema potrebbero non permettere queste operazioni. È normale, vanno semplicemente ignorate e lasciate così come sono.*

#### **Fase 2: Rimozione dei Servizi Google tramite ADB**
Questo passaggio, sebbene complesso, è cruciale per eliminare conflitti e messaggi di errore derivanti da servizi non utilizzati. Richiede un PC Windows.

1.  **Preparare il Tablet:**
    *   Abilitare le **Opzioni Sviluppatore**: Andare in `Impostazioni > Informazioni sul tablet > Numero build` e toccare 7 volte.
    *   Attivare il **Debug USB**: Tornare indietro, entrare in `Opzioni sviluppatore` e attivare l'opzione _Debug USB_.
    *   Rimuovere i diritti di amministrazione: Andare in `Sicurezza > Amministratori dispositivo` e rimuovere la spunta da tutte le app presenti.

2.  **Preparare il PC:**
    *   Scaricare **Android SDK Platform-Tools** (contiene `adb`) dal [sito ufficiale per Windows](https://developer.android.com/tools/releases/platform-tools?hl=it).
    *   Collegare il tablet al PC via USB e concedere i permessi di debug quando richiesto sul dispositivo.

3.  **Eseguire la Rimozione:**
    *   Aprire un terminale (Prompt dei comandi o PowerShell) nella cartella contenente `adb.exe` (es. `C:\platform-tools`). Se avete installato Android Studio, si trova in `C:\Users\[Utente]\AppData\Local\Android\Sdk\platform-tools\`.
    *   Eseguire questi comandi in sequenza:
        ```bash
        adb shell pm uninstall --user 0 com.google.android.gms
        adb shell pm uninstall --user 0 com.google.android.gsf
        adb shell pm uninstall --user 0 com.android.vending
        ```
    *   **Spiegazione comandi:**
        *   `com.google.android.gms`: Pacchetto principale di Google Play Services.
        *   `com.google.android.gsf`: Google Services Framework (componente di supporto).
        *   `com.android.vending`: Google Play Store.
    *   Questi comandi disinstallano i pacchetti solo per l'utente corrente, senza eliminarli fisicamente dal sistema.
    *   **Attenzione:** Questa operazione è reversibile solo con un **reset completo di fabbrica** del tablet.

#### **Fase 3: Installazione e Configurazione di Smart Life**
1.  **Installare APKPure e Smart Life:**
    *   Dal browser del tablet, scaricare e installare **APKPure** dal suo sito web ufficiale (`https://apkpure.com`).
    *   Cercare e scaricare **Smart Life** (o Tuya Smart/Moes App) tramite APKPure. **Cruciale:** deve essere la stessa app utilizzata dal proprietario degli dispositivi per gestire la casa.
    *   A volte l'installazione non parte automaticamente. In tal caso, aprire l'app APKPure, andare nella sezione `Me > I miei APK/XAPK` e installare manualmente il file scaricato.

2.  **Condividere l'Accesso alla Casa:**
    *   Creare un indirizzo email dedicato (es. su Libero o Gmail) e un nome utente (es. "tablet") per registrarsi a Tuya. *Consiglio: conservare queste credenziali in un posto sicuro.*
    *   Sull'APP Smart Life del **proprietario**, andare in `Me > Gestione casa`, selezionare una casa e poi `Aggiungi membri > Condividi Account dell'app`.
    *   Inserire l'indirizzo email e il nome utente ("tablet") creati. Il tablet, una volta accettato l'invito, diventerà un membro della famiglia e visualizzerà i device di quella casa.
    *   Ripetere l'operazione per ogni casa da condividere.

3.  **Disabilitare l'Ottimizzazione della Batteria per Smart Life:**
    *   Sul tablet, andare in `Impostazioni > Batteria > Risparmio batteria` (o simili, il percorso può variare).
    *   Trovare l'opzione per gestire l'ottimizzazione (spesso tramite il menu dei tre punti).
    *   Selezionare `Tutte le app`, cercare **Smart Life** e impostare l'opzione su **Non ottimizzare**. Questo impedisce al sistema di uccidere il processo in background, mantenendo la connessione sempre attiva.

#### **Prestazioni Finali**
La configurazione finale con le sole tre app **Smart Life, MacroDroid (per l'avvio automatico) e un monitor di sistema (es. Simple System Monitor)** garantisce un utilizzo della CPU quasi sempre **inferiore al 30%**, valore eccellente per un funzionamento fluido e senza lag. Il tablet si trasformerà in un pannello di controllo reattivo e affidabile.


###IoTwebUI###
