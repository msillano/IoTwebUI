# IoTwebUI 2.0: Tuya WEBAPP open extension #
[english version](https://github.com/msillano/IoTwebUI/blob/main/README20.md)

**_Stanco delle limitazioni di SmartLife?  IoTwebUI 2.0 è arrivato per dare nuova linfa alla tua casa intelligente, con un arsenale di funzionalità che ti faranno dire "finalmente!". <br> La filosofia 'open' è nel DNA di questa APP, che esalta la customizzazione ed il controllo da parte dell'utente._** 

_Cosa puoi fare?_<br>
👀 Controlla tutto: Interfaccia intuitiva e personalizzabile, dati sempre a portata di mano, gestione flessibile.<br>
🔬 Esportazione dati: Salva le serie storiche per le tue analisi, nel formato più utile<br>
⚡️ Automazioni potenti: Crea automazioni complesse e personalizzate con le RULE, impossibili con SmartLife!<br>
⏱️ Alert personalizzati: Monitora ogni aspetto della tua domotica e ricevi avvisi realtime. <br>
👌 Integrazione perfetta: Combina device, proprietà, RULE e Tuya tap-to-run per un'automazione fluida e completa.

 ![aspetto della versione 2.0](https://github.com/msillano/IoTwebUI/blob/main/pics/ver20-look.png?raw=true)

#### Interfaccia: un piacere per gli occhi e per il controllo

 - Scegli tra il tema chiaro o scuro, a seconda dei tuoi gusti.
 - Naviga tra i tuoi dispositivi e le 'home' con un albero trascinabile e zoommabile, perfetto per tenere tutto sotto controllo.
 - Popup informativi con nuove icone ti terranno aggiornato sullo stato di ogni proprietà di un device, senza perderti neanche un dettaglio.
 - Un menu a scomparsa con informazioni sulla configurazione e opzioni dinamiche ti darà accesso rapido a tutto ciò che ti serve.
 - E se vuoi personalizzare ancora di più, libera la tua creatività con icone, colori e popup informativi a tua scelta.

#### Dati: al sicuro e sempre a portata di mano

 - Registra i dati delle proprietà che ti interessano su file, così avrai sempre un archivio completo della tua domotica.
 - Calcola medie mobili, valori decodificati o normalizzati per un'analisi ancora più approfondita.
 - Scegli il salvataggio automatico o manuale, con opzioni di formato dati (CSV o JSON), periodo di campionamento e cadenza  di salvataggio per adattarsi alle tue esigenze.
 - Gestione al runtime: flessibilità senza limiti

#### Tap-to-run Tuya: il potere a portata di dito

 - Una pagina dedicata con un tab per ogni "home" ti permette di avere tutto sotto controllo.
 - Caricamento automatico all'avvio per una domotica sempre pronta all'azione.
 - Lancia i tap-to-run Tuya con un semplice click e personalizza i colori dei pulsanti per un'esperienza ancora più intuitiva.
 - Escludi i tap-to-run che non ti servono per avere un'interfaccia pulita e ordinata.

#### Alert: mai più un evento perso

 - puoi attivare una funzione di controllo su qualsiasi proprietà dei dispositivi e sceglere i test "maggiore, uguale" o "minore" per monitorare ogni aspetto della tua domotica.
 - Stessa logica delle condizioni Tuya, per un linguaggio comune ed affidabile.
 - Scegli tra diverse azioni conseguenziali: beep, pop-up, messaggio vocale, lancio di URL o tap-to-run Tuya.
 - Real Time, con un ritardo medio garantito pari al 50% del periodo di campionamento Tuya, per un equilibrio perfetto tra rapidità e precisione.
 - Definizione degli Alert al runtime: controllo totale in tempo reale

#### RULE: Domanda di automazioni più potenti? IoTwebUI 2.0 ha la risposta!

 - Effettuare operazioni aritmetiche e utilizzare variabili per una flessibilità senza limiti.
 - Confrontare i valori di due proprietà diverse, per automazioni ancora più libere.
 - Eseguire azioni complesse, come attivare tap-to-run Tuya o inviare comandi ad altre applicazioni via REST.
 - Come funziona?
    1. Crea le RULE al runtime con un'interfaccia user-friendly, anche se non sei un programmatore esperto.
    2. Utilizza MACRO predefinite per i compiti comuni e ripetitivi, risparmiando tempo e fatica.
    3. Testa le tue RULE in tempo reale per assicurarti che funzionino perfettamente.
    4. In caso di errore durante il test, un popup ti indicherà la riga e il tipo di errore per una risoluzione rapida e precisa.
    5. Esporta le tue RULE per inserirle nel file di configurazione e renderle permanenti.

#### Modalità EXPERT: per controllare tutto il controllabile

La modalità EXPERT offre un controllo totale sulla personalizzazione di IoTwebUI.
   - Accedi alle interfacce di configurazione e apporta modifiche che saranno valide solo per quel run.
   - Copia i dati dal "pad" di esportazione nei file di configurazione per rendere stabili le tue scelte.
   - Puoi disattivare la modalità EXPERT nella configurazione quando hai finito di personalizzare.

<hr>

## Note di implementazione

- IoTwebUI deriva da un'interfaccia analoga progettata per [TuyaDAEMON](https://github.com/msillano/tuyaDEAMON-applications/tree/main/daemon.visUI.widget).
- La scelta della libreria di visualizzazione è caduta su [Vis-Network](https://visjs.github.io/vis-network/docs/network/) per la buona flessibilità unita a semplicità di uso.
- Un primo problema è il protocollo di sicurezza CORS, implementato sui moderni browser. Una applicazione (anche in js, node-red, etc)  non ha questo problema, ma una APP che gira in un browser sì. E' necessario disabilitare CORS al memento del lancio del browser - testato Chrome (Versione 125.0.6422.61  - 64 bit):<br>
   `chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security`<br>
  (vedi file `run-me.bat`). Vale solo per questa istanza, le altre resteranno protette.<br>
  Come alternativa al file 'bat', con alcuni browser si può usare l'estensione 'Cross Domains - CORS', vedi [ISSUE4](https://github.com/msillano/IoTwebUI/issues/4).

- Tuya pone dei limiti alla frequenza degli accessi al cloud. _IoTwebUI_ ne tiene conto, e la fase iniziale (quando legge tutti i dati dal Cloud) è bloccante e non brevissima (3-5 s, in funzione del numero di device). Come anche in SmartLife.

- Un secondo problema è l'impossibilità di creare file direttamente da una pagina HTML, sempre per motivi di sicurezza. Per l'export dei dati sono ricorso ad una libreria di logging su file [debugout.js](https://github.com/inorganik/debugout.js). Per questo motivo il controllo sui file generati non è completo e sono necessari piccoli  interventi manuali sui file esportati.
- I file di datalog sono salvati nella dir `download`, con il nome  `tuyalog-hh-mm-ss.cvs|json`.
- Per lo stesso motivo non è possibile aggiornare dall'APP i file di configurazione. Ho scelto una soluzione di compromesso, che prevede l'intervento dell'utente con un copia-incolla.
 
- Il funzionamento continua regolarmente anche con la finestra del browser iconizzata.

### Interfaccia utente
![](https://github.com/msillano/IoTwebUI/blob/main/pics/tootip20.png?raw=true)

Nei tooltip, per default, sono presentate tutte le proprietà incluse nello 'status' del device, con i nomi e i valori usati da Tuya Cloud. Alcuni valori possono essere codificati. Vedi figure sopra.
   - `tuya_bridge.switch_1` è interessato da un 'alert'. tuya_bridge.switch_inching è codificato (AAAC)
   - `temperatura studio.va_temperature` è salvato sul datafile
   - Per `temperatura soggiorno.va _humidity` è scattato l'Alert, ed è indicata la condizione (>40)
   - Il tooltip `termo studio` è customizzato,  per presentare la temperatra con i corretti decimali.
   - In modo EXPERT sono aggiunti nei tooltip i seguenti valori:
       - `isa`:  nome del 'tipo' Tuya del device ( in codice è `device.category`). In totale circa 600 tipi.
       - `id`:  `device.id`, richiesto da alcuni HUB (e.g. TuyaDAEMON, HA, etc..).
       - `key`: `device.local_key`, richiesto da alcuni HUB 

### Logging ed esportazione dati

E' possibile esportare su un file alcuni dati: l'utente deve specificare solo `device` e `status` (proprietà) per identificare i dati che interessano e questi sono salvati ad intervalli regolari (minimo 1 minuto) in un buffer interno (max 5000 records - pari a 80h @1 rec/min), esportato poi su file automaticamente o su comando utente.<br>
L'utente può scegliere in configurazione tra due formati: `CVS` (indicato, per esempio, per DB e spreadsheet tipo Excel) oppure `JSON` (per elaborazioni più complesse con programmi ad hoc) con pochissimi interventi di editing sui file (vedi oltre i formati).
<TABLE width = "100%" >
 <TR>
  <TD>
  In modo EXPERT cliccando su un device si apre un dialogo, nella parte superiore interessa l'export dei dati su file:
   <ul>  
    <li>  <b> newLog </b>- aggiunge al log (solo per il run corrente)
    <li>  <b>clear dev </b>-  elimina il device dal log, (tutte le proprietà)
    <li>  <b> config </b>- apre pop-up per vedere le definizioni del log attuale
    <li>  <b> cancel </b>b- chiude il dialogo.</ul>
  </TD>
  <TD>
   <img src="https://github.com/msillano/IoTwebUI/blob/main/pics/alert20.png?raw=true" />
  </TD>
 </TR>
</TABLE>


In modalità EXPERT è disponibile nel menu un comando per avere nella console l'intera struttura dati ottenuta da Tuya Cloud ('Dump data'): può essere esplorata a ogni livello nel pad della console oppure può essere copiata con copy&paste in formato JSON.


### Alert ed avvisi
In modo EXPERT cliccando su un device si apre un dialogo che nella parte inferiore permette la definizione degli 'Alert':
<TABLE width = "100%" >
 <TR>
  <TD  width = "200px">
   <img src="https://github.com/msillano/IoTwebUI/blob/main/pics/alert21.png?raw=true" />
  </TD>
  <TD><ol>
        <li>  Scelta della condizione: 'maggiore', 'uguale' o 'minore'
        <li>  Il valore di confronto, un numero (24) o una stringa (true)
        <li>  Messaggio associato: è usato <ul>
             <li> negli Alert con 'pop-up'
             <li> è il testo letto nel caso 'voice'
             <li> oppure è un URL ed allore è aperta nel browser
             <li> oppure è il nome di un 'tap-to-run' che è eseguito </ul>
         <li>  Azione: una o più a scelta tra 'beep' 'pop' e 'voice' (URL e tap-to-run sono automatiche) </li></ol>
 <i> nota: per avere, ad esempio, sia 'pop' che 'tap-to-run', creare due Alert con le stesse condizioni: in uno 'message' sarà il testo per il 'pop-up', nell'altro il nome del 'tap-to-run'.</i>
  </TD>
 </TR>
</TABLE>
Bottoni:
 <ul>  
    <li>  <b> newTest </b>- aggiunge un nuovo Alert (solo  run corrente)
    <li>  <b>clear dev </b>- elimina tutti gli Alert del device (solo  run corrente)
    <li>  <b> config </b>- apre pop-up per vedere le definizioni  degli alert attuali
    <li>  <b> cancel </b>b- chiude il dialogo.</ul>


### RULE: automazioni no limits.
  In modo EXPERT il menu presenta l'opzione "RULE page" che apre una pagina dedicata alla gestione delle RULE: 
<TABLE width = "100%" >
 <TR>
  <TD>
   Una parte importante è dedicata ad un pad di editing delle RULE (per dettagli vedi oltre).<br>
_Nota: se preferite usare un editor esterno più performante, potete certamente farlo, con copia-incolla._<br>
Si possono gestire due insiemi di RULE: quelle in _uso_, inizialmente lette dal file `usrrulesXX.X.js`, e quelle nuove, _in Edit_ nel nel pad.
<br>
  
   I bottoni presenti offrono le seguenti funzionalità;
   <ul>  
    <li>  <b> Clear </b>- pulisce l'area di edit
    <li>  <b> Load </b>- copia in Edit le RULE attualmente in uso
    <li>  <b> Replace </b>- le RULE attualmente in uso sono sostitute da quelle in edit.
    <li>  <b> Export </b>- Crea un pop-up da cui copiare le RULE per renderle permanenti.
    <li>  <b> Test Start </b>- Start test delle RULE in Edit: le RULE in uso sono sospese.
    <li>  <b> Test End</b>- Termina il Test e ripristina le ROULE precedenti (auto in caso di errore)
    </ul>
 </TD>
  <TD>
   <img src="https://github.com/msillano/IoTwebUI/blob/main/pics/rules20.png?raw=true" />
  </TD>
 </TR>
</TABLE>

<HR>
**NOTE sulla sicurezza**

**_Per garantire la massima sicurezza, **IoTwebUI** opera esclusivamente in modalità di sola lettura, senza apportare alcuna modifica ai tuoi dati su Tuya Cloud._** <br>

_**Questa APP è totalmente aperta, priva di ogni protezione, e contiene nei file le vostre credenziali in chiaro!**_ <br>
_NON rendetela accessibile dall'esterno o da terzi, altrimenti tutti i vostri dati, credenziali Tuya incluse, sono esposti!_

<hr>

### Versioni

- 2.0 Importante aggiornamento funzionale.
  - Aggiunta la possibiltà di attivare le scene "Tap-to-Run" di Tuya da questa APP.
  - Aggiunto 'Avvisi' (Alertt): controlla valori ed eseguire azioni (opzioni): segnale acustico, pop-up, messaggio vocale, apertura URL, esecuzione 'Tap-to-Run'
  - Aggiunte "REGOLE utente" (RULE) per automazioni utente senza limiti (richiede competenze js di base)
  - Aggiunto "Registro avvisi" (Alert register) per avvisi e regole
  - Aggiunta interfaccia per la definizione dei dati da registrare sul file dataLog, con esportazione nella configurazione, per una facile manutenzione
  - Aggiunta interfaccia per la definizione degli avvisi, con esportazione nella configurazione, per una facile manutenzione
  - Aggiunta interfaccia per l'editing e il test delle regole al run-time, con esportazione nella configurazione, per una facile manutenzione
  - Interfaccia ridisegnata con Bootstrap 5.3, fluida e con modalità chiara/scura, per una migliore esperienza utente
  - Menu dinamico a scomparsa, per avere il massimo spazio a disposizione del grafo.
    
- 1.2  Aggiornamento funzionale.
  - Aggiunta in 'config' la possibilità di escludere alcune 'home'
  - Introdotti due modi: normale | expert
    1. Il DUMP dei dati Tuya in console è possibile solo in modo expert
    2. In modo 'expert' sono aggiunti al tooltip 3 nuovi dati (se disponibili)
         
- 1.1  Correzione bugs

- 1.0  Versione iniziale

### Installazione

1) Scaricare e dezippare il file `IoTwebUI.x.x.zip`  in una dir (con le autorizzazioni richieste dal S.O.).
2) Eseguire le operazioni di configurazione
3) Il file principale è `tuyaui.html`.  NON è necessario un server WEB, in quanto il codice è tutto in javaScript, eseguito dal browser. Per lanciarlo vedi file `run_me.bat` (per Windows - Chrome). Per altri S.O. creare uno script analogo. (Ignorare il messaggio Chrome: "stai utilizzando una segnalazione della riga di comando non supportata: - disable-web-security...": non supportata ma funzionante).<br>
nota: L'addon "Cross Domain - CORS" sembra ridolvere il problema senza file BAT, vedi [ISSUE4](https://github.com/msillano/IoTwebUI/issues/4).
5) In fase di installazione e setup è utile la console (nel browser - strumenti per programmatori -, o menu contestuale 'ispeziona') perchè lì vanno i messaggi di informazione e di errore di IoTwebUI.<BR>
Nelle immagini: a sinistra avvio OK (Chrome, CORS disattivato) a destra caso di errore CORS (Opera):

<div><img src="https://github.com/msillano/IoTwebUI/blob/main/pics/okconsole.png?raw=true" alt="normal start" width="300" />
   <img src="https://github.com/msillano/IoTwebUI/blob/main/pics/CORSerror.png?raw=true" alt="CORS error" width="400" align="right" /></div>

### Configurazione

L'app **TuyaUIweb** non è per utenti alle prime armi, pertanto è accettabile che la configurazione avvenga direttamente editando un file (`config`.js). _Le solite avvertenze: fare una copia del file prima di ogni modifica, usare un editor UTF8 (io uso Notepad-plusplus), e attenzione a NON ALTERARE niente altro (soprattutto virgole  ','  ed  apici '"')._

 - I dati INDISPENSABILI da inserire sono le proprie `credenziali Tuya` per la 'platform.tuya'. <BR> Gli utenti di HA ed altri hub simili dovrrebbero già averle, ma i nuovi utenti si devono iscrivere, ci sono molte guide nel web. [Questa](https://github.com/iRayanKhan/homebridge-tuya/wiki/Get-Local-Keys-for-your-devices) è una delle più chiare, altre sono [elencate qui](https://github.com/msillano/tuyaDAEMON/wiki/50.-Howto:-add-a-new-device-to-tuyaDAEMON#1-preconditions). Un vantaggio è che si ha accesso alla piattaforma Tuya, con molti dati sui propri device, ed alla documentazione tecnica.

- Altre opzioni riguardano: timing (Cloud e log) e configurazione del log: il formato, l'autosave, i valori richiesti, oppure il look&feel, come la presenza dei bottoni di pan/zoom. <BR>Dalla versione 1.2 la possibilità di escludere alcune home.

- Aggiornare con i path del sistema ospite il file di lancio `run-me.bat`.
- 
 

## Customizzazioni

Il **TuyaUIweb** è OpenSource, in HTML+Javascript, è abbastanza documentato e modulare. Quindi è possibile ogni intervento. 
Due aree sono state privilegiate e le rispettive funzioni poste per semplicità in un file separato (`custom.js`) con dettagliate istruzioni ed esempi:

 - _Tuya non permette più di cambiare le icone, per una opinabile  interpretazione dei suoi consulenti legali delle attuali leggi sul copyright._  
Per questa APP, invece, ho scelto le icone `awesome4`, con un'[ampissima scelta](https://fontawesome.com/v4/cheatsheet/) e  di libero uso. Di default tutti i device hanno la stessa icona, un cubo.<br>
Ma sono facilmente personalizzabili dall'utente: basta fornire un criterio di selezione dei device e l'indicazione dell'icona `awesome4` da usare. Come esempio, hanno icone speciali (vedi immagini):
   - i Termometri (device con nome 'Temp...')
   - le Valvole termostatiche (device con nome 'Termo...')
   - i Gateway (device con 'Gateway' nel nome)
     
 - Il contenuto dei tooltip, varia a seconda del device. E' un settore dove è utile la possibilità di personalizzazioni, il metodo scelto (un filtro) permette ogni libertà: <br>
    - Alcuni valori sono criptati: si può scegliere di non farli vedere  - oppure di decodificarli, il codice necessario è disponibile in TuyaDAEMON, ma ho scartato questa opzione per non avere tooltip troppo grandi (vedi immagine 2)
    - In altri casi occorre dividere per 10 o 100 per avere il valore in unità SI, (vedi immagine 1)   
    - Come sviluppatore preferisco avere i nomi delle proprietà originali Tuya, ma si possono rendere più frendly traducendoli in Italiano.
    - Se si desidera si possono anche aggiungere nuove informazioni per esempio derivandole da quelle del device (e.g. temperatura in °C ed anche in °F).

Queste customizzazioni NON sono necessarie, ma redono più utile e gradevole l'uso di TuyaUIweb.
<hr>

### formato CSV

Questo è un esempio di file di log in formato CVS:
```
[date, time, ROMA.TF_frigo.va_temperature, ROMA.Temperatura studio.va_temperature]
[2024-05-17, 06:35:28, 71, 22]
[2024-05-17, 06:37:28, 71, 22]
... more ...
```
La prima riga contiene l'intestazione delle colonne, le righe succesive i dati.
Le operazioni da fare sono le seguenti (in un editor ASCII, ad esempio Notepad++, con 'global find&replace'):
1) Eliminare la parentesi quadra '[' all'inizio di ogni riga.
2) Sostituire la parentesi quadra finale con un punto e virgola ';'.
   
Il risultato CVS corretto è il seguente, importabile in molti DB e spreadsheet:
```
date, time, ROMA.TF_frigo.va_temperature, ROMA.Temperatura studio.va_temperature;
2024-05-17, 06:35:28, 71, 22;
2024-05-17, 06:37:28, 71, 22;
... more ...
```
### formato JSON
Questo è un esempio di file di log in formato JSON:
```
[{"home":"ROMA","device":"TF_frigo","status":"va_temperature","result":70,"day":"2024-05-17","time":"19:37:51"},
 {"home":"ROMA","device":"Temperatura studio","status":"va_temperature","result":25,"day":"2024-05-17","time":"19:37:51"}],
[{"home":"ROMA","device":"TF_frigo","status":"va_temperature","result":70,"day":"2024-05-17","time":"19:39:51"},
 {"home":"ROMA","device":"Temperatura studio","status":"va_temperature","result":25,"day":"2024-05-17","time":"19:39:51"}],
```
Notare che tutti i dati identificativi sono aggiunti ad ogni misura, ottenendo un risultato più verboso del caso CVS.
L'operazioni da fare è la seguente (in un editor ASCII, ad esempio Notepad++):
1) Aggiungere una coppia di parentesi quadre '[]' per racchiudere tutto il contenuto.
   
Il risultato JSON corretto è il seguente, utilizzabile con parser JSON per ricreare gli oggetti:
```
[
[{"home":"ROMA","device":"TF_frigo","status":"va_temperature","result":70,"day":"2024-05-17","time":"19:37:51"},
 {"home":"ROMA","device":"Temperatura studio","status":"va_temperature","result":25,"day":"2024-05-17","time":"19:37:51"}],
[{"home":"ROMA","device":"TF_frigo","status":"va_temperature","result":70,"day":"2024-05-17","time":"19:39:51"},
 {"home":"ROMA","device":"Temperatura studio","status":"va_temperature","result":25,"day":"2024-05-17","time":"19:39:51"}],
]
```
E' un array di array contenenti le singole misure (oggetti).

### RULE - sintassi
Il particolare ambiente in cui sono valutate le RULE comporta qualche limite alla sintassi js standard:
- importante: il codice è eseguito una riga alla volta, non è possibile scrivere blocchi js che occuppino più righe!
  Per contenere la lunghezza delle righe, usare delle variabili intermedie.
- definire le variabili sempre con la sintassi var \_pippo =...
- usare un underscore '\_' come primo carattere nel nome delle variabili: si evitano così interferenze con altre variabili.
- le RULE sono eseguite immediatamente dopo un aggiornamente dei dati Tuya. Molte funzioni devono quindi conservare lo stato tra un run ed il successivo. Le MACRO si occupano di ciò e semplificano la scrittura di RULE complesse.
<hr>

ESEMPIO 1: usato per testare le MACRO, funziona con i miei device (deve essere modificato per i vostri). <BR>

```
// -- various temperature calculations with popup and logging:
// using variables, and MACROS: GET() AVG() ROUND() EVERY() POP() DATALOG()
 var _tf = GET("TF_frigo","va_temperature");
 var _tm = AVG(_tf, 12);
 var _tr = ROUND( _tm/10,  -1);  // I only get tens
 if(EVERY(8)) POP( "FRIGO", "Frigo: "+ _tf/10 + "°C, media: "+_tm/10 +"°C, round " + _tr +"°C");
 DATALOG("frigo.media", _tm/10);
 
// using again _tf, and MACROS: ISCONNECTED() ISCHANGED()  TIME() VOICE() ROUND()
// note: the delay is a function of the Tuya polling interval and device data period. In strings, ROUND can be used to cut a number. 

 var _annonce = "Alle ore " + TIME(hrs)+" la temperatura è cambiata. Il frigo è a " + ROUND(_tf/10, 1) + " gradi";
 if(ISCONNECTED("TF_frigo") && ISCHANGED(_tf)) VOICE(_annonce);    

// -- more functions (testing purpose):
// using MACROS: WEEKMAP() BEEP()

 if ( WEEKMAP("DLMM-VS")) BEEP();

// using variables, and MACROS: ISTRIGGERL() DAYMAP() SCENA()

 var _trgl = ISTRIGGERL(GET("tuya_bridge", "switch_1"));
 if(DAYMAP(false,"08:30", true, "22:00") && _trgl) SCENA('sirena2');

// Voice message if someone keeps the door open
// using variables and MACROS: CONFIRMH() ALERTLOG()
// note: this example shows how to debug RULES, using single functions and 'console.log()'
// note: after an if()  you can use a comma ',' to execute more than one MACRO 

var _doorev = GET("Sensore porta", "doorcontact_state") ;   //event: true if door open
var _doorok = CONFIRMH(_doorev, "01:20");         // true only after 1:20
if(ISTRIGGERH(_doorok)) VOICE("chiudere la porta, grazie"), ALERTLOG("ingresso", "porta aperta") ;
console.log("DOOR", _doorev, _doorok);
```
ESEMPIO 2 - Un caso concreto di controllo del riscaldamento
Ho il riscaldamento centralizzato, con valvole termostatiche su ogni radiatore: ogni stanza ha il suo profilo di temperatura desiderato (Ttarget). Tutto funziona molto bene, tranne in casi eccezionali (esempio, impianto spento per manutezione). <br>
 Vorrei implementare con Tuya una strategia di questo tipo: se la temperatura ambiente è minore di un 'tot' rispetto a Ttarget, accendere il condizionatore come pompa di calore con lo stesso Ttarget. Cioè:

   `Se  (( Ttarget - Tambiente ) > tot) => clima.warm( Ttarget )` 
 
_Questa automaziono non è realizzabile con Smartlife_, nè con Alexa o Google, perchè non si possono usare operazioni aritmetiche,  perchè si possono fare confronti solo con costanti, e perchè non esistono tap-to-run parametrici od almeno con nomi dinamici.
 
Chiedo troppo? Un sistema 'open' deve permetterlo: infatti con le RULE _si può fare_! <br>
_Alcune precondizioni: la mia termovalvola ('Termo letto')  ha le proprietà 'temp_set' e 'temp_current'.
Per semplicità ho utilizzato come temperatura Target solo i valori 16, 20, 21 °C: in questo modo mi occorrono solo 3 tap-to-run chiamati Tletto16, Tletto20 e Tletto21, per accendere ed impostare il clima._
```
var _tot = 2.3;  // da tarare 
var _Ttarget =  GET("Termo letto", "temp_set") ;
var _nowClima = ISTRIGGERH( ( _Ttarget -  GET("Termo letto", "temp_set")) > _tot)
if (_nowClima) SCENA("TLetto" + ROUND(_Ttarget. 0) ), ALERTLOG("RULE Tletto", "acceso clima") ;
```

### RULE - MACRO
Possiamo dividerle in due gruppi: il primo che gestisce le interazioni con le risorse disponibili in IoTwebUI (una sorta di API interna). il secondo gruppo di MACRO sono invece generali, modificando in qualche modo utile  i dati forniti dai device. <dl>
<dt>  ISTRIGGERH(condition) </dt>
<dd> Ritorna <pre>true</pre> solo al passaggio della "condizione" da <i>false a true</i> (come le condizioni delle automazioni Tuya). </dd>
<dt>  ISTRIGGERL(condition) </dt>
<dd> Ritorna <pre>true</pre> solo al passaggio della "condizione" da <i>true a false</i>  (inverso  di ISTRIGGERH) </dd>
<dt>  CONFIRMH(condition, time) </dt>
<dd> Ritorna <pre>true</pre> solo se la "condizione" rimane <pre>true</pre> per almeno <pre>time</pre> tempo.<BR>
time = "hh:mm:ss" oppure "mm:ss" oppure "ss"</dd>
<dt>  CONFIRML(condition, time) </dt>
<dd> Ritorna <pre>true</pre> solo se la "condizione" rimane <pre>false</pre> per almeno <pre>time</pre> tempo  (inverso  di CONFIRMH).<BR>
`time` = costante nei formati "hh:mm:ss" oppure "mm:ss" oppure "ss"</dd>
<dt>  EVERY(n)</dt>
<dd>  Semplice timer: ritorna <pre>true</pre> solo dopo <pre>n</pre> esecuzioni, ciclico </dd>
<dt>  TIME(wath) </dt>
<dd>  ritorna  "hh:mm:ss" oppure "mm:ss" oppure "ss" calcolati dall'ora attuale, a seconda di 'wath'.
  `whath`: una delle costanti così definite: _hrs_ = 11, _min_ = 14, _sec_ = 17. (senza apici). </dd>
<dt>  DAYMAP(val1, time1, val2, time2, ... more) </dt>
<dd> Ritorna: fino a <pre>time1</pre> l'ourput è <pre>val1</pre>, da  <pre>time1</pre> a  <pre>time2</pre>  l'output è <pre>val2</pre>... avanti così fino  all'ultimo <pre>time</pre> dopo di che  l'output è di nuovo <pre>val1</pre>`.<br>
Naturalmente i valori<pre>val</pre> + <pre>time</pre> devono essere presenti a coppie, quanti ne servono. Tutti i <pre>time</pre> in formato "hh:mm:ss".<br>
Usi: profili di temperatura giornalieri, eventi ad orario o abilitazione per intervalli di tempo, etc.
 </dd>
<dt>  WEEKMAP(map) </dt>
<dd> <pre>map</pre> è una stringa di sette caratteri qualsiasi, uno per giorno partendo dalla Domenica. Solo se il carattere è '-' (trattino) ritorna <pre>false</pre> altrimenti torna <pre>true</pre>. Esempio: "DLMM-VS" è falso solo il Giovedì. </dd>
 <dt> AVG(value, n) </dt>
<dd> Media mobile degli ultimi <pre>n</pre> valori: torna una stringa con 2 decimali.<br>
<pre>n</pre> è in numero di loop, in tempo t = n x tuyaInterval (definito in config.js file)</dd>

 <dt> MAX(value, n) </dt>
<dd>Il più grande  degli ultimi <pre>n</pre> valori.<br>
<pre>n</pre> è in numero di loop, in tempo t = n x tuyaInterval (definito in config.js file)</dd>

 <dt> ZEROMAX() </dt>
<dd>Azzera tutti i MAX() presenti in caso di lunghi periodi, e.g. 24h.<br>
_nota: deve essere posizionato dopo tutti i MAX() presenti._
 _esempio_: `if(ISTRIGGERH(DAYMAP(false, '00:00:00', true, '00:20:00'))) ZEROMAX();`<br>

 </dd>
<dt>ISCHANGED(value) </dt>
<dd> ritorna  <pre>true</pre>` ogni volta che   <pre>value</pre> cambia rispetto al valore precedente.</dd>

<dt>ROUND(number, pos)</dt>
<dd> Torna una stringa con pos cifre decimali (se pos >0) <br>
     oppure un numero intero (pos = 0) <br>
     oppure un numero intero con zeri (pos < 0) <br>
     _esempi:_ ROUND (123.567, 2) = "123.57";  ROUND(123.567, 0)  = "124";  ROUND(123.567, -2)  = "100"; 
 
</dd>


</dl>
<hr>
Progetto OpenSource, Licenza MIT, (c)2024 marco sillano

_Questo progetto è un work-in-progress: viene fornito "così com'è", senza garanzie di alcun tipo, implicite o esplicite._

- _Se sviluppate qualche estensione o applicazione interessante con TuyaUIweb fatemelo sapere: possiamo inserirla qui._
- _Per problemi riguardanti il codice ed il funzionamento di TuyaUIweb, aprite un 'issue' qui ([github](https://github.com/msillano/TuyaUIweb/issues))._
- _Per problemi più generali riguardanti  Tuya, SmartLife (Tuya smart) e TuyaUIweb, che possono interessare anche altri utenti, postate pure nel gruppo [Tuya e Smart Life Italia](https://www.facebook.com/groups/tuyaitalia)_

Grazie per l'interesse <ms>
m.s.

<hr>

### Riconoscimenti
Tutti i marchi riportati appartengono ai legittimi proprietari.
- https://getbootstrap.com/docs/5.3/getting-started/introduction/
- https://visjs.github.io/vis-network/docs/network
- https://fontawesome.com/v4/icons/
- https://code.google.com/archive/p/crypto-js/
- https://github.com/inorganik/debugout.js 




