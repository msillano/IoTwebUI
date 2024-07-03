# IoTwebUI 2.1: Tuya WEBAPP open extension #
[english version](https://github.com/msillano/IoTwebUI/blob/main/README21.md)

**_Stanco delle limitazioni di SmartLife?  IoTwebUI 2.1 è arrivato per dare nuova linfa alla tua casa intelligente, con un arsenale di funzionalità che ti faranno dire "finalmente!". <br> La filosofia 'open' è nel DNA di questa APP, che esalta la customizzazione ed il controllo da parte dell'utente._** 

_Cosa puoi fare?_<br>
👀 Controlla tutto: Interfaccia intuitiva e personalizzabile, dati sempre a portata di mano, visualizzazione flessibile.<br>
🔬 Esportazione dati: Salva le serie storiche per le tue analisi, nel formato più utile<br>
⚡️ Automazioni potenti: Crea automazioni complesse con tap-to-run e RULE, impossibili con SmartLife!<br>
⏱️ Alert personalizzati: Monitora ogni aspetto della tua domotica e ricevi avvisi realtime, anche vocali.<br>
🎙  Comandi vocali: integrati con tap-to-run e RULE, in un'unica APP<br>
👌 Integrazione perfetta: Combina device, proprietà, voce, RULE e Tuya tap-to-run per un'automazione fluida e completa.

 ![aspetto della versione 2.1](https://github.com/msillano/IoTwebUI/blob/main/pics/wer21.png?raw=true)

#### Interfaccia: un piacere per gli occhi e per il controllo

 - Scegli tra il tema chiaro o scuro, a seconda dei tuoi gusti.
 - Naviga tra i tuoi dispositivi e le 'home' con un albero trascinabile e zoommabile, perfetto per tenere tutto sotto controllo.
 - Popup informativi con nuove icone ti terranno aggiornato sullo stato di ogni proprietà di un device, senza perderti neanche un dettaglio.
 - Un menu a scomparsa con informazioni sulla configurazione e opzioni dinamiche ti darà accesso rapido a tutto ciò che ti serve.
 - Comandi vocale e Navigazione vocale tra le varie pagine.
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
 - Un tab è dedicato alle RULE per poterle lanciare quando serve. 

#### Alert: mai più un evento perso

 - puoi attivare una funzione di controllo su qualsiasi proprietà dei dispositivi e scegliere i test "maggiore", "uguale" o "minore" per monitorare ogni aspetto della tua domotica.
 - Stessa logica delle condizioni Tuya, per un linguaggio comune ed affidabile.
 - Scegli tra diverse azioni conseguenziali: silente, beep, frase registrata, pop-up, messaggio vocale, lancio di URL o  RULE|tap-to-run Tuya.
 - Real Time, con un ritardo medio pari al 50% del periodo di campionamento Tuya, per un equilibrio perfetto tra rapidità e precisione: gli alert sempre visualizzati con pop-up o finestra.
 - Definizione degli Alert al runtime: controllo totale in tempo reale

#### RULE: Domanda di automazioni più potenti? IoTwebUI 2.1 ha la risposta!

 - Effettuare operazioni logiche ed aritmetiche e utilizzare variabili per una flessibilità senza limiti.
 - Confrontare i valori di due proprietà diverse, per automazioni ancora più libere.
 - Eseguire azioni complesse, come realizzare controlli PID, schedulare annualmente, o inviare comandi ad altre applicazioni via REST.
 - Attivate in base a condizioni (come le 'Automazioni' Tuya, ma più flessibile) oppure su comando (come i 'tap-to-run' Tuya).
 - Per i casi più semplici (una sola condizione) si possono usare gli 'alert' (che possono attivare 'tap-to-run').
 - Il linguaggio delle RULE soddisfa le condizioni Bohm/Jacopini e quindi è 'Turing completo'. Più potenza espressiva vuol dire per l'utente concentrarsi su 'che cosa si vuol fare' e non 'su come farlo'!
 - Come funziona?
    1. Crea le RULE al runtime con un'interfaccia user-friendly, anche se non sei un programmatore esperto.
    2. Utilizza MACRO predefinite per i compiti comuni e ripetitivi, risparmiando tempo e fatica.
    3. Provare le tue RULE in tempo reale per assicurarti che funzionino perfettamente.
    4. In caso di errore durante il test, un popup ti indicherà la riga e il tipo di errore per una risoluzione rapida e precisa.
    5. Esporta le tue RULE per inserirle nel file di configurazione e renderle permanenti.

#### Voice recognition: comandi vocali customizzabili

 - Attiva ogni tap-to-run o RULE con "Ehi Tuya, esegui ... "
 - Controlla la navigazione nell'APP IoTwebUI: "Ehi Tuya, vai alle scene"
 - Controlla la voce con la voce: puoi attivare il riconoscimento continuo oppure disattivarlo del tutto. 

#### Modalità EXPERT: per controllare tutto il controllabile

La modalità EXPERT offre un controllo totale sulla personalizzazione di IoTwebUI.
   - Accedi alle interfacce di configurazione e apporta modifiche che saranno valide solo per quel run.
   - Copia i dati dal "pad" di esportazione nei file di configurazione per rendere stabili le tue scelte.
   - Puoi disattivare la modalità EXPERT nella configurazione quando hai finito di personalizzare.

<hr>

## Note di implementazione ed uso

- IoTwebUI deriva da un'interfaccia analoga progettata per [TuyaDAEMON](https://github.com/msillano/tuyaDEAMON-applications/tree/main/daemon.visUI.widget).
- La scelta della libreria di visualizzazione è caduta su [Vis-Network](https://visjs.github.io/vis-network/docs/network/) per la buona flessibilità unita a semplicità di uso.
- Un primo problema è il protocollo di sicurezza CORS, implementato sui moderni browser. Una applicazione (anche in js, node-red, etc)  non ha questo problema, ma una APP che gira in un browser sì. E' necessario disabilitare CORS al memento del lancio del browser - testato Chrome (Versione 125.0.6422.61  - 64 bit):<br>
   `chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security`<br>
  (vedi file `run-me.bat`). Vale solo per questa istanza, le altre resteranno protette.<br>
  Come alternativa al file 'bat', con alcuni browser si può usare l'estensione 'Cross Domains - CORS', vedi [ISSUE4](https://github.com/msillano/IoTwebUI/issues/4).

- Tuya pone dei limiti alla frequenza degli accessi al cloud. _IoTwebUI_ ne tiene conto, e la fase iniziale (quando legge tutti i dati dal Cloud) è bloccante e non brevissima (3-5 s, in funzione del numero di device). Come anche in SmartLife.

- Un secondo problema è l'impossibilità di creare file direttamente da una pagina HTML, sempre per motivi di sicurezza. Per l'export dei dati sono ricorso ad una libreria di logging su file [debugout.js](https://github.com/inorganik/debugout.js). Per questo motivo il controllo sui file generati non è completo e sono necessari piccoli  interventi manuali sui file esportati.
- I file di datalog sono salvati nella dir `download`, con il nome  `tuyalogDYYYYMMGGThhmmss.csv|json.txt`.
  
- Per lo stesso motivo non è possibile aggiornare dall'APP i file di configurazione. Ho scelto una soluzione di compromesso, che prevede l'intervento dell'utente con un semplice copia-incolla.
- Sempre per problemi di sicurezza, può venire richiesta ogni volta l'autorizzazione all'uso del microfono: dipende dal browser e dalla configurazione; ma `run-me.bat` evita l'inconveniente.
- Il funzionamento continua regolarmente anche con la finestra del browser iconizzata.
- Usare una sola istanza dell'APP, altrimenti si hanno problemi con i token Tuya.

### Interfaccia utente
![](https://github.com/msillano/IoTwebUI/blob/main/pics/tootip20.png?raw=true)

Nei tooltip, che si aprono al passaggio del mouse su un'icona di device, sono presenti tutte le proprietà incluse nello 'status' del device, con i nomi ed i valori usati da Tuya Cloud. Alcuni valori possono essere codificati. <br>
Alcune piccole icone forniscono ulteriori informazioni all'utente.Esempi (vedi figure sopra):
   - `tuya_bridge.switch_1` è sotto osservazione per un 'alert'
   - `tuya_bridge.switch_inching` è un esempio di valore codificato ('`AAAC`'). Decodificato è un oggetto:
      ````
      {
      "inching": false,
      "delay": 2
      }
      ````
       _nota: Se siete interessati alla decodifica dei valori Tuya, molte funzioni sono state sviluppate per tuyaDAEMON (vedi 'core_device', nodo 'ENCODE/DECODE user library')._ 
   - `temperatura studio.va_temperature` è salvato sul datafile, insieme agli altri dati in `logList`.
   -  Per il device `temperatura soggiorno` è scattato l'Alert (icona speciale)
   - `temperatura soggiorno.va _humidity`  è la causa dell'Alert, ed è anche indicata la condizione (>40) che lo ha causato.
   - Il tooltip `termo studio` è customizzato,  per presentare le temperature con i corretti decimali e unità. (nota: solo nel tooltip: Alert e RULE usano sempre il valore fornito da Tuya Cloud, i.e. 222 e 190).
   - In modo EXPERT sono aggiunti nei tooltip i seguenti valori:
       - `isa`:  nome del 'tipo' Tuya del device (in codice è `device.category`). In totale circa 600 tipi.
       - `id`:  `device.id`, richiesto da alcuni HUB (e.g. TuyaDAEMON, Homebridge, HA, etc..).
       - `key`: `device.local_key`, richiesto da alcuni HUB
         
### tap-to_run Tuya

 I 'tap-to-run sono presentati per 'home' (max 100) nella apposita pagina, e poi in ordine alfabetico, come una serie di bottoni.
 I nomi dei 'tap-to-run' possono avere i seguenti vincoli:
  - Limite di 3 parole se usati con i comandi vocali
  - Utilizare prefissi per raggruppare in IoTwebUI i comandi correlati.
  - Essere facili da ricordare e da riconosere (se si usano i comandi vocali).<br>
  
 Un pad è dedicato alle 'user RULE' identificate con un nome: sono trattate come i 'tap-to-run': possono essere usate negli alert, oppure attivate con bottoni o tramite comando vocale, oppure lanciate da un altro RULE.<br>
_Naturalmente 'RULE' e 'tap-to-run' devono avere nomi unici per poter essere identificati._

### Logging ed esportazione dati

E' possibile esportare su un file alcuni dati: l'utente deve specificare solo `device` e `status` (proprietà) per identificare i dati che interessano e questi sono salvati ad intervalli regolari (minimo 1 minuto) in un buffer interno (max 5000 records - pari a 80h @1 rec/min), esportato poi su file automaticamente o su comando utente.<br>
L'utente può scegliere in configurazione tra due formati: `CSV` (indicato, per esempio, per DB e spreadsheet tipo Excel) oppure `JSON` (per elaborazioni più complesse con programmi ad hoc) con pochissimi interventi di editing sui file (vedi [oltre i formati](#formato-csv)).
<TABLE width = "100%" >
 <TR>
  <TD>
  In modo EXPERT cliccando su un device si apre un dialogo, nella parte superiore interessa l'export dei dati su file:
   <ul>  
    <li>  <b> newLog </b>- aggiunge al log (solo per il run corrente)
    <li>  <b>clear dev </b>-  elimina il device dal log, (tutte le proprietà)
    <li>  <b> config </b>- apre pop-up per vedere le definizioni del log attuale <br>
        <i> I 'log' permanenti sono nel file `config.js`: possono essere editati direttamente oppure copiati da questo pop-up.</i>
    <li>  <b> cancel </b>- chiude il dialogo.</ul>
  </TD>
  <TD>
   <img src="https://github.com/msillano/IoTwebUI/blob/main/pics/alert20.png?raw=true" />
  </TD>
 </TR>
</TABLE>

extra: In modalità EXPERT è disponibile nel menu un comando per avere nella console l'intera struttura dati ottenuta da Tuya Cloud ('Dump data'): può essere esplorata a ogni livello nel pad della console oppure può essere copiata con copy&paste in formato JSON.

### Alert ed avvisi
In modo EXPERT cliccando su un device si apre un dialogo che nella parte inferiore permette la definizione degli 'Alert':
<TABLE width = "100%" >
 <TR>
  <TD  width = "200px">
   <img src="https://github.com/msillano/IoTwebUI/blob/main/pics/alert21.png?raw=true" />
  </TD>
  <TD><ol>
        <li>  Scelta della condizione: 'maggiore', 'uguale' o 'minore'
        <li>  Il valore di confronto, un numero (24) o una stringa (e.g. true) senza apici (").
        <li>  Messaggio associato, che ha vari usi: <ul>
             <li> è un URL a un file MP3 o WAV nel caso 'sound'
             <li> oppure è un URL ed allora è aperto nel browser
             <li> oppure è il nome di un 'tap-to-run' o 'RULE' che viene eseguito 
             <li> oppure appare come testo in un 'pop-up'
             <li> oppure è il testo letto nel caso 'voice'
            </ul>
         <li>  Azione: una o più a scelta tra 'beep', 'pop', 'sound' e 'voice' (URL e tap-to-run|RULE sono automatici) </li></ol>
  </TD>
 </TR>
</TABLE>

 _note:_
 
 - _Se non si sceglie nessuna azione e si lascia vuoto 'message', l'azione di default è il cambio dell'icona del device e l'aggiornamento del tooltip, sempre eseguiti._
 - _Gli 'alert' non hanno, per semplicità, un filtro a tempo: se definiti sono attivi 24/7. Se occorre qualche condizionamento, è possibile creare RULE ad hoc ed attivarle dall'alert (nota: le RULE possono attivare le stesse azioni attivate dagli 'alert')._ 
 - _Notare che 'connected' non è mai incluso nelle proprietà Tuya, e quindi non si possono definire 'Alert'. Ma è disponibile come MACRO nelle RULE._
 - _Avendo un solo messaggio, le regole di precedenza sono: SOUND() e URL (auto) sono esaminati per primi, poi Tap-to-run e RULE (auto), e solo per ultimo POP e VOICE (compatibili: lo stesso messaggio può essere usato per entranbi); Beep è sempre utilizzabile._
 - _Quindi, per avere sia 'pop' che 'tap-to-run', occerre creare due Alert con le stesse condizioni: in uno 'message' sarà il testo per il 'pop-up', nell'altro il nome del 'tap-to-run'._
 - _La visualizzazione dei pop-up può dipendere dalla configurazione del browser: usando 'run_me.bat' si ha un aggiornamento automatico della configurazione per la nuova istanza del browser. Azioni utente (e.g. bottoni) possono abilitare momentaneamente i pop-up._ <br>
 _Comunque, per non perdere informazioni, se i pop-up sono disabilitati per qualche motivo, il messaggio è presentato lo stesso in una finestra dell'APP: la differenza è che i pop-up possono essere molti, mentre la finestra è unica e viene riusata con un contatore._
- _Tutti gli Alert sono memorizzati e visibili nel 'registro Alert', dal menu principale._

**Comandi:**
 <ul>  
    <li>  <b> newTest </b>- aggiunge un nuovo Alert (solo per il  run corrente)
    <li>  <b> clear dev </b>- elimina tutti gli Alert del device (solo per il run corrente)
    <li>  <b> config </b>- apre pop-up per vedere le definizioni di tutti alert attuali. <br>
        <i> Gli 'Alert' permanenti sono nel file `config.js`: possono essere editati direttamente oppure copiati da questo pop-up.</i>
    <li>  <b> cancel </b>- chiude il dialogo.</ul>
 
### RULE: automazioni no limits.
  In modo EXPERT il menu presenta l'opzione "RULE page" che apre una pagina dedicata alla [gestione delle RULE](#rule---sintassi): 
<TABLE width = "100%" >
 <TR>
  <TD>
   Una parte importante è dedicata ad un pad di editing delle RULE (per dettagli vedi oltre).<br>
<i>Nota: se preferite usare un editor esterno più performante, potete certamente farlo, con copia-incolla.</i><br>
Si possono gestire due insiemi di RULE: quelle in <i>uso</i>, inizialmente lette dal file `usrrulesXX.X.js`, e quelle nuove, <i>in Edit</i> nel pad.
<br>
  
   I comandi presenti offrono le seguenti funzionalità;
   <ul>  
    <li>  <b> Clear </b>- pulisce l'area di edit
    <li>  <b> Load </b>- copia in Edit le RULE attualmente in uso
    <li>  <b> Replace </b>- le RULE attualmente in uso sono sostitute da quelle in edit.
    <li>  <b> Export </b>- Crea un pop-up per vedere le definizioni delle  RULE in uso. <i>Le RULE permanenti sono nel file 'usrrulesXX.X.js': possono essere editate direttamente o copiate dal pop-up.</i>
    <li>  <b> Test Start </b>- Start test delle RULE in Edit: le RULE in uso sono sospese.
    <li>  <b> Test End</b>- Termina il Test e ripristina le RULE precedenti (auto in caso di errore)
    </ul>
 </TD>
  <TD>
   <img src="https://github.com/msillano/IoTwebUI/blob/main/pics/rules20.png?raw=true" />
  </TD>
 </TR>
</TABLE>

### VoiceRecognition: maggiore libertà

- La disponibilità di questa funzione dipende dal browser usato.
- Non è facile raggiungere l'efficienza che si ha con HW specializzato (smart speakers: Google, Alexa), perché il risultato dipende da vari fattori, tra cui il microfono usato, le relative regolazioni, la riduzione dei rumori di fondo, etc... Nelle prove sono passato da oltre il 90% di riconoscimenti ad un pessimo 20%! 
- Molto importante è altresì la scelta delle parole chiave e dei nomi per 'tap-to-run' e 'RULE': per esempio 'nome tre parole' è di difficile riconoscimento, mentre 'accendi la luce' è facilmente riconosciuto.<br> Ritengo che questo dipenda dai modelli linguistici usati: sono più riconoscibili frasi italiane corrette, con un significato comune, rispetto a parole isolate. Per esempio 'Tuya' è spesso confuso con 'Giulia'.
- La presenza di articoli e/o preposizioni facilita il riconoscimento.
- Il comando vocale è opzionale, e può essere disabilitato nella configurazione.
- Se abilitato, voiceRecognition può essere usata in due modi, o continuo oppure premendo un pulsante. Il modo di default è impostato in configurazione, ma può essere cambiato con comandi vocali.
- la grammatica di default è la seguente - tra parentesi (alle): parole opzionali; barra verticale a|su: parole alternative-:
    - _'Hey Tuya, esegui|attiva (la|un*) xxx (xxx (xxx))'_ => lancia 'tap-to-run' o RULE, nome max 3 parole

    - _'Hey Tuya, (in|al) modo esperto'_ => apre EXPERT mode
    - _'Hey Tuya, (in|al) modo utente'_ => torna in USER mode
    - _'Hey Tuya, vai (alle*) scene'_    => navigazione alla pagina dei 'tap-to-run' e RULE
    - _'Hey Tuya, vai (alle*) regole'_   =>  navigazione alla pagina edit RULE (se in EXPERT mode)
    - _'Hey Tuya, vai (alla*) home'_  =>  navigazione alla pagina con albero device
    - _'Hey Tuya, ritorna|home'_  =>  navigazione alla pagina con albero device

    - _'Hey Tuya, modo (della*) voce continuo'_ => start del modo riconoscimento senza soste.
    - _'Hey Tuya, modo (della*) voce a|su richiesta|domanda'_ => start del modo riconoscimento con bottone.
    - _'Hey Tuya, basta voce'_ => stop del modo riconoscimento senza soste.
   

 (*) nota: _la lista di preposizioni ed articoli accettati in terza posizione è molto lunga_: `'il','lo','la', 'le', 'a', 'ad', 'ai', 'al', 'all', 'allo', 'alla', 'alle', 'di', 'del', 'della', 'dei','un', 'una', 'con', 'colla'`: _scegliete quelle che facilitano il riconoscimento_. 
 
- _nota: L'implementazione tollera anche qualche imprecisione nel riconoscimento (e.g. 'Giulia' invece di 'Tuya', etc..): questo può essere facilmente customizzato. Vedi file speech21.js._
 
 - nota: Per una migliore comprensione, le frasi possono essere divise in due: "Ehi Tuya" + pausa: appare il feedback 'Ehi Tuya...' che conferma la comprensione della prima parte; ora può essere detta la seconda parte.
 
- _nota: la navigazione tra pagine è analoga al menu: dalla 'home' si può  andare alle pagine 'tap-to-run' o 'edit RULE' (in modo EXPERT), ma da queste si può solo tornare alla 'home'._
     
_nota: la richiesta di consenso all'uso del microfono dipende dal browser e dalla configurazione: usando 'run_me.bat' non dovrebbero esserci richieste._

<HR>

**NOTE sulla sicurezza**<br>

**_Per garantire la massima sicurezza, IoTwebUI opera esclusivamente in modalità di sola lettura, senza apportare alcuna modifica ai tuoi dati su Tuya Cloud._** <br>

_**Questa APP è totalmente aperta, priva di ogni protezione, e contiene nei file le vostre credenziali in chiaro!**_ <br>
_NON rendetela accessibile dall'esterno o da terzi, altrimenti tutti i vostri dati, credenziali Tuya incluse, sono esposti!_

<hr>

### Versioni
- 2.1.1 Correzione [ISSUE10](https://github.com/msillano/IoTwebUI/issues/10): Token scaduto.

- 2.1 Miglioramento dell'esperienza utente:
  - Aggiunto SpeechRecognition (file speech21.js) customizzabile
  - Aggiunte RULE con 'nome', attivabili con bottoni e comandi vocali
  - Aggiunte nuove MACRO
  - Migliorata la funzione 'test': al termine ripristina il contesto in uso.
  - Fallback: se i pop-up sono bloccati, gli avvisi sono mostrati in una finestra. Nessun messaggio perso.
  - Aggiunta data al nome dei file di datalog.
  
- 2.0 Importante aggiornamento funzionale.
  - Aggiunta la possibilità di attivare le scene "Tap-to-Run" di Tuya da questa APP.
  - Aggiunto 'Avvisi' (Alert): controlla valori ed eseguire azioni (opzioni): segnale acustico, pop-up, messaggio vocale, apertura URL, esecuzione 'Tap-to-Run'
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
2) Eseguire le operazioni di configurazione (vedi oltre).
3) Il file principale è `IoTwebUI.html`.  NON è necessario un server WEB, in quanto il codice è tutto in javaScript, eseguito dal browser. Per lanciarlo vedi file `run_me.bat` (per Windows - Chrome). Per altri S.O. creare uno script analogo. (Ignorare il messaggio Chrome: "stai utilizzando una segnalazione della riga di comando non supportata: - disable-web-security...": non supportata ma funzionante).<br>
nota: L'addon "Cross Domain - CORS" sembra risolvere il problema CORS senza file BAT, vedi [ISSUE4](https://github.com/msillano/IoTwebUI/issues/4).
5) In fase di installazione e setup è utile la console (nel browser - strumenti per programmatori -, o menu contestuale 'ispeziona') perchè lì vanno i messaggi di informazione e di errore di IoTwebUI.<BR>
Nelle immagini: a sinistra avvio OK (Chrome, CORS disattivato) a destra in caso di errore CORS (Opera):

<div><img src="https://github.com/msillano/IoTwebUI/blob/main/pics/okconsole.png?raw=true" alt="normal start" width="300" />
   <img src="https://github.com/msillano/IoTwebUI/blob/main/pics/CORSerror.png?raw=true" alt="CORS error" width="400" align="right" /></div>

### Configurazione

L'app **IoTwebUI** non è per utenti alle prime armi, pertanto è accettabile che la configurazione avvenga direttamente editando un file (`config`.js). _Le solite avvertenze: fare una copia del file prima di ogni modifica, usare un editor UTF8 (io uso Notepad-plusplus), e attenzione a NON ALTERARE niente altro (soprattutto virgole  ','  ed  apici '"' e "`")._

 - I dati INDISPENSABILI da inserire sono le proprie `credenziali Tuya` per la 'platform.tuya'. <BR> Gli utenti di tuyaDAEMON, Homebridge, HA ed altri hub simili dovrebbero già averle, ma i nuovi utenti si devono iscrivere, ci sono molte guide nel web. [Questa](https://github.com/iRayanKhan/homebridge-tuya/wiki/Get-Local-Keys-for-your-devices) è una delle più chiare, altre sono [elencate qui](https://github.com/msillano/tuyaDAEMON/wiki/50.-Howto:-add-a-new-device-to-tuyaDAEMON#1-preconditions). Un vantaggio è che così si ha accesso alla piattaforma Tuya, con molti dati sui propri device, ed alla documentazione tecnica.

- Altre opzioni riguardano: timing (Cloud e log) e configurazione del log: il formato, l'autosave, i valori richiesti, oppure il look&feel, come la presenza dei bottoni di pan/zoom. <BR>Dalla versione 1.2 la possibilità di escludere alcune home (`hide_homes` array), e dalla versione 2.0 quella di escludere alcuni tap-to-run (`hide_scenes` array). 

- Le opzioni disponibili per il riconoscimento vocale sono (sempre in config.js):
   1) se con il vostro HW funziona male, potete disabilitarlo del tutto: `SpeechRecognitionEnabled = false;`
   2) se invece vi funziona bene, potete eliminare la necessità di premere il pulsante ogni volta: `SpeechRecognitionNeverEnds = true;`.

- Ancora in `config.js`, la variabile  `expertModeEnabled = false` permette di disabilitare del tutto il modo 'EXPERT'.

- Dalla versione 2.0 le definizioni per 'dataLog' (`logList`  in `config.js`), 'Alert'(`testList` in `config.js`) e RULE (`usrRules` in  `usrrulesXX.X.js`) possono essere create nella APP, con semplici interfacce utente, e poi esportate per essere copiate nei rispettivi file.

- Aggiornare con i path del sistema ospite il file di lancio `run_me.bat`, per lanciare Chrome con una configurazione ottimizzata. 

## Customizzazioni

Il **IoTwebUI** è OpenSource, in HTML+Javascript, è abbastanza documentato e modulare. Quindi è possibile ogni intervento. 
Alcune aree sono state privilegiate e le rispettive funzioni poste per semplicità in file separati -`custom.js` e `usrrulesXX.X.js` con dettagliate istruzioni ed esempi:

 - _Tuya non permette più di cambiare le icone, per una opinabile  interpretazione dei suoi consulenti legali delle attuali leggi sul copyright._  
Per questa APP, invece, ho scelto le icone `awesome4`, con un'[ampissima scelta](https://fontawesome.com/v4/cheatsheet/) e  di libero uso. Di default tutti i device hanno la stessa icona, un cubo.<br>
Ma sono facilmente personalizzabili dall'utente: basta fornire un criterio di selezione dei device e l'indicazione dell'icona `awesome4` da usare. Come esempio, hanno icone speciali (vedi immagini):
   - i Termometri (device con nome 'Temp...').
   - le Valvole termostatiche (device con nome 'Termo...').
   - i Gateway (device con 'Gateway' nel nome).

Anche l'icona speciale che indica un'alert è customizzabile: vedi `alertIcon` in 'config.js'.
     
 - Il contenuto dei tooltip, varia a seconda del device. E' un settore dove è utile la possibilità di personalizzazioni, il metodo scelto (un filtro) permette ogni libertà: <br>
    - Alcuni valori sono criptati: si può scegliere di non farli vedere  - oppure di decodificarli; il codice necessario è disponibile in TuyaDAEMON, ma ho scartato questa opzione sia perchè sono di solito dati di configurazione gestiti da SmartLife, sia per non avere tooltip troppo grandi.
    - In altri casi occorre dividere per 10 o 100 per avere il valore in unità SI.   
    - Come sviluppatore preferisco avere i nomi delle proprietà originali Tuya, ma si possono rendere più frendly traducendoli.
    - Se si desidera si possono anche aggiungere nuove informazioni per esempio derivandole da quelle del device (e.g. temperatura sia in °C che in °F).

- Per i 'tap-to-run' Tuya, è possibile personalizzare il colore dei pulsanti modificando `sceneColor(scene)` in `custom.js`.

- Per le RULE, i più avventurosi possono aggiungere le loro MACRO personali nel file `usrrulesXX.X.js`.

- Per VoiceRecognition, nel file "speech0X.X.js" è semplice modificare le parole della grammatica proposta: esempio sostituire 'vai' con 'raggiungi'. L'obiettivo deve essere sempre quello di migliorare la comprensione dei comandi.<br>
- L'adattamento del riconoscimento vocale ad altre lingue è complesso, e richiede profonda competenza della lingua sia nella grammatica che nel vocabolario.  Mi affido alla collaborazione di utenti volenterosi. Da parte mia  completerò l'intornazionalizzazione delle varie pagine dell'APP asap (ver. 2.2).
- Un po' più complesso è aggiungere nuovi comandi vocali, non tanto per la definizione della grammatica (il codice attuale  può servire da esempio) quanto l'implementazione delle azioni, che spesso dipendono dal codice esitente.<br>
Direi che per nuovi comandi vocali, la strada migliore è fare una proposta di implementazione nelle ['issue'](https://github.com/msillano/IoTwebUI/issues), e, in base al consenso ed alla fattibibilità, potrebbe essere implementata nella release successiva.
  
Queste customizzazioni NON sono necessarie, ma redono più utile e gradevole l'uso di TuyaUIweb.
<hr>

### formato CSV

Questo è un esempio di file di log in formato CSV:
```
[date, time, ROMA.TF_frigo.va_temperature, ROMA.Temperatura studio.va_temperature]
[2024-05-17, 06:35:28, 71, 22]
[2024-05-17, 06:37:28, 71, 22]
... more ...
```
La prima riga contiene l'intestazione delle colonne, le righe succesive i dati.
Le operazioni da fare sono le seguenti (in un editor ASCII, ad esempio Notepad++, con 'global find&replace'):
1) Eliminare la parentesi quadra '[' all'inizio di ogni riga.
2) Sostituire la parentesi quadra finale di ogni riga con un punto e virgola ';'.
   
Il risultato CSV corretto è il seguente, importabile in molti DB e spreadsheet:
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
Notare che tutti i dati identificativi sono aggiunti ad ogni misura, ottenendo un risultato più verboso del caso CSV.
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
Il particolare ambiente in cui sono valutate le RULE comporta qualche limite alla sintassi JavaScript (js) standard:

- Le RULE sono esegute ciclicamente, dopo ogni pollig di dati dal Cloud Tuya, quindi ogni `TuyaInterval` (vedi config.js). Talora si hanno delle esecuzione extra, per esempio in occasione di attivazioni per nome delle RULE.
- **importante**: il codice è eseguito una riga alla volta, non è possibile scrivere blocchi js che occuppino più righe!  Per contenere la lunghezza delle righe, usare delle variabili volatili intermedie (vedi esempi).
- Definire le variabili volatili (valide per un solo run delle RULE) sempre con la sintassi: **var** `_tizio` **=**... , poi possono essere usate liberamente.
- E' anche possibile definire più variabili contemporaneamente, Esempio `var _var1, _var2 = 0;`: sia `_var1` che `_var2` sono inizializzate a 0.
- Per definire variabili permanenti (valide per tutti i run) usare le MACRO: VSET(name, value) e VGET(name).
- Usare sempre un underscore **"_"** come primo carattere nel _nome delle variabili_: si evitano così interferenze con altre variabili del programma. Non usare caratteri 'strani' nei nomi delle variabili: meglio limitarsi a [A..Za..z0..9] e '_'.
- Il 'punto e virgola' **";"** a fine riga è opzionale, ma consiglio vivamente di usarlo sempre.
- JavaScript è 'case sensitive', cioè distingue tra Maiuscole e minuscole, quindi attenzione a scrivere le variabili sempre nello stesso modo (consiglio tutte minuscole, oppure la tecnica 'camel' per i nomi compositi: **`_variabilePocoUsata`**) per distinguerle a colpo d'occhio dalle MACRO (sempre MAIUSCOLE).
- _Valori predefiniti:_ **`true`** (vero) e **`false`** (falso) per le condizioni; le costanti numeriche sono con il punto, all'inglese (**`3.14`**). Tutte le stringhe vogliono gli apici (**`"oggi "`** oppure **`'domani '`**). Un apice può essere inserito in una stringa se si usa l'altro tipo di apice per tutta la stringa. Esempio: `"All'alba "` OK , `'Disse: "sono stanco"'` OK, ma NON `'All'alba'` !.
- Usare **//** per i commenti, continuano fino a fine riga
- Le operazioni js più utili sono quelle aritmetiche (**+, -, *, /**), quelle logiche per le condizioni: (**&&** -and, **||** -or, **!** -negazione) e le operazioni di confronto ( **&gt;**, **==**, **!=**, **&lt;**, **&gt;=**, **&lt;=**); la concatenazione delle stringhe è fatta semplicemente con il **+** ("ore " **+** "10:30").
- Non confondere **'='** (assegnazione - effetto: il contenuto della variabile a sx è modificata), con **'=='** (confronto - risultato: true (uguali) o false (diversi)).   _Esempio:_ `var _pippo = 32;` e `if (_pippo == 32)...` ( NB: `if(_pippo = 32)` è un errore comune ma insidioso, difficile da trovare e correggere) <br>
- Nota:  La condizione opposta (negata) di 'uguale' `(a == b)` è 'diverso' `(a != b)`. La condizione opposta (negata) di 'maggiore' `(a > b)` NON è 'minore' `(a < b)` bensì è 'minore o uguale' `(a <= b)`! Analogamente l'opposto di `(a < b)` è `(a >= b)`.
- **Attenzione al '+'**. In `a + b`, se `a` e `b` sono numeri, fa la somma, ma se uno dei due è una stringa non convertibile in numero, automaticamente anche l'altro è convertito in stringa. E la conversione 'numero => stringa' può portare a sorprese (cioè a molte cifre decimali) quando non sono numeri interi! Usare sempre ROUND() quando dovete aggiungere dei numeri con la virgola nelle stringhe Esempio:
```
 var _tf = GET("TF_frigo","va_temperature");  // read temperature sensor, saves it in _tf (number)
 var _tm = AVG(_tf, 12);                      // get average from last 12 values (_tm is a string, see AVG())
 var _tr = ROUND( _tm/10,  -1);               // round to the nearest ten, _tr is a string 
 if(TRIGEVERY(8)) POP( "FRIGO", "Frigo: "+ ROUND(_tf/10, 1) + "°C, media: "+ ROUND(_tm/10, 2) +"°C, round: " + _tr +"°C");
                                              // note: using ROUND() to convert to string, also for _tm/10 (again number)
 DATALOG("frigo.media", _tm/10);              // saves average on file (saved as number).
 ```
 - Come già detto, JavaScript è elastico a proposito delle conversioni dei valori: numeri in formato 'stringa' (cioè "3.14" invece di 3.14 o Math.PI) sono convertiti automaticamente in numeri in caso di operazioni aritmetiche. Ancora, numeri e stringhe sono convertiti in valori logici quando serve (ad esempio se usati come condizione in un `if()` ). Regole: zero (0) vale `false`, qualsiasi altro numero: `true`. Una stringa vuota ("") o `null`, o `undefined` valgono `false`, qualunque altra stringa vale `true`. Esempi: `if ("caio")...` è true.  `var _test = null; if(_test)...` è false. (nota. Meglio non abusare di questi automatismi del linguaggio, è preferibile scrivere sempre le condizioni estese, più chiare: `if (_test != null)`...)
 - importante è anche l'uso delle parentesi, "()", sempre a coppie. Parentesi sono obbligatorie dopo ogni MACRO - nota, anche se non ci sino parametri, e.g. `BEEP()` - e dopo un `if()`, per racchiudere la condizione. Comunque usatele liberamente per raggruppare i risultati intermedi nelle espressioni e.g. `if((_a > 10) && (_b/2 == 0))...`
-  Molte MACRO devono conservare lo stato tra un run ed il successivo, (e.g AVG(), MAX() etc...) e sono individuate con (*). 
- Il costrutto js più utile nelle RULE è l'**if()** (esecuzione condizionale), che assume varie forme:<br>
   **if(** `condizione` **)** `azione;`    // `azione` _è eseguita solo se `condizione` è vera_ <br>
   **if(** `condizione` **)** `azione1`**,** `azione2;` // _due (o più) azioni, separate da_ ',' _virgola._<br>
   **if(** `condiz1 && condiz2 && ...` **)** `azione;` //  _AND: 'tutte',_  `condiz1` _e_ `condiz2` _e_ ... _devono essere vere contemporaneamente._<br>
   **if(** `condiz1 || condiz2 || ...` **)** `azione;` //  _OR: 'almeno una',_  `condiz1` _oppure_ `condiz2`, _oppure_ ... _deve essere vera._<br>
   **if (** `condizione` **)** `azione1` **else** `azione2;`  // _esegue `azione1` (se vero) oppure `azione2` (se falso)._ <br>
nota: contrariamente alle automazioni Tuya, Google, Alexa,  che nelle condizioni permettono o solo AND (tutte) o solo OR (basta una) (e poi cercano di mitigare questo limite aggiungendo l'extra condizione 'ambito' - e.g. Tuya) nelle RULE si possono avere condizioni più complesse (miste) usando con cura le parentesi per indicare l'ordine di calcolo:
esempio:  if ( (condiz1 || condiz2) && (condiz3 || condiz4) )  - a parole: "deve essere vera almeno una tra (condiz1, condiz2) ED anche almeno una tra (condiz3, condiz4)".

 - Se una `condizione` è vera a lungo (livello), un `if()` sarà eseguito più volte, ad ogni ciclo. Per evitare questo le macro TRIGGER sono vere per un solo ciclo, il primo, e poi sono false.

 - nota sui messaggi di errore: Non sempre i messaggi di errore identificano la VERA causa del problema. Esempio, una variabile mal scritta è trovata subito come 'non definita', ma una parentesi non chiusa, può portare a messaggi poco chiari righe dopo, quando il compilatore trova un problema! Quindi attenzione! 

- **importante**: per come sono implementate, le MACRO che usano memoria (\*) devono essere eseguite ad ogni run: quindi NON possono essere presenti nella parte `azione` di un **if()**. Per ragioni analoghe non sono ammessi **if  nidificati** (un **if()** nella zona azione di un altro **if()**: non potrebbe usare le MACRO (*)). Sono vincoli che non pongono, però, serie limitazioni.
  <hr>
  
**ESEMPIO** - Un caso concreto di controllo del riscaldamento <br>
_Ho il riscaldamento centralizzato, con valvole termostatiche su ogni radiatore: ogni stanza ha il suo profilo di temperatura desiderato (Ttarget). Tutto funziona molto bene, tranne in casi eccezionali (esempio, impianto spento per manutezione)._ <br>
Vorrei implementare con Tuya una strategia di questo tipo: _se la temperatura ambiente è minore di un 'tot' rispetto al Ttarget, accendere il condizionatore come pompa di calore impostando come temperatura proprio Ttarget._ Cioè:

   <code>`Se  (( Ttarget - Tambiente ) > tot) => clima.warm( Ttarget )` </code>
 
_Questa strategia NON è realizzabile con le 'automazioni' di Smartlife_, nè con Alexa o Google o HomeKit..., per diversi motivi:
   - nelle automazioni non si possono usare operazioni aritmetiche,
   - i confronti, nelle automazioni, si possono fare solo con valori costanti,
   - non esistono tap-to-run parametrici od almeno con nomi dinamici.
 
Chiedo troppo? Un sistema 'open' dovrebbe permettere queste automazioni. O no? Infatti con **IoTwebUI** e le RULE _si può fare!_ <br>
Vediamo come l'ho realizzata. Alcune precondizioni: la mia termovalvola ('Termo letto')  ha le proprietà 'temp_set' e 'temp_current'.
Per semplicità ho utilizzato come temperatura Target solo i valori 16, 20, 21 °C: in questo modo mi occorrono solo 3 tap-to-run chiamati Tletto16, Tletto20 e Tletto21, per accendere ed impostare il climatizzatore alle temperature volute.
Ecco le RULE necessarie, dove uso alcune variabili intermedie per ridurre la complessità. La macro ISTRIGGERH() è vera una sola volta, quando la condizione passa da falso a vero (vedi oltre), ROUND() arrotonda un numero e lo trasforma in testo, per formare le stringhe "TLetto16","TLetto20",... cioè il nome del 'tap-to-run', che così ora dipende da Ttarget. L'accensione è anche memorizzata nel 'registro degli Alert'.
```
var _tot = 2.3;                                        // da tarare il prossimo inverno
var _Ttarget =  GET("Termo letto", "temp_set") ;       // varia a seconda dell'orario
var _nowClima = ISTRIGGERH( ( _Ttarget -  GET("Termo letto", "temp_current") ) > _tot);           // condizione
if (_nowClima) SCENA("TLetto" + ROUND( _Ttarget, 0) ), ALERTLOG("RULE Tletto", "acceso clima") ;  // esecuzione
```

nota: i nomi dei tap-to-run come 'TLetto16' sono impossibili da usare con il riconoscimento vocale, ma servono così per poterli gestire dinamicamente. Se utile, basta creare dei 'tap-to-run' con nomi semplici come alias, tipo 'riscaldamento camera letto', che si limitano a utilizzare quelli con i nomi irriconoscibili.

_Tutto sommato semplice, nevvero? Secondo i progettisti di APP per domotica (tutti: si copiano l'un l'altro le prestazioni) noi utenti siamo solo in grado di gestire " Se ....  Poi ....". Che mancanza di fantasia e fiducia!._ 
_Che poi, avere a disposizione strumenti sofisticati, non vuol dire essere obbligati ad usarli! Se non si devono usare, meglio. Ma quando servono le RULE sono lì, pronte a risolvere i nostri problemi._

<br>

#### RULE - Primi passi
Volete fare delle prove ma non sapete da dove cominciare?
Consiglio di copiare le seguenti 3 RULE nell'area di edit delle RULE (modo EXPERT), e poi premere TEST.
1) Nella pagina tap-to-run, tab 'user RULE' trovate tre nuovi bottoni: 'spegni la luce'. 'pippo' e 'chiamata per pippo': potete verificare il funzionamento delle tre RULE.
2) Attivate il 'comando vocale', e provate _"Ehi Tuya, esegui Pippo"_...
```
   if (TRIGBYNAME('spegni la luce')) VOICE ("Fatto: 'spegni la luce'");
   if (TRIGBYNAME("Pippo")) POP ("Test", "Trovato Pippo");
   if (TRIGBYNAME("chiamata per Pippo")) TRIGRULE("pippo"), VOICE("chiamo Pippo");
```

### RULE - MACRO
le MACRO rispondono a varie esigenze:
 1. Fornire accesso alle risorse e funzionalità di IoTwebUI, per poterle usare nelle RULE
 2. L'ambiente (run ripetuti ad intervalli regolari) e i suoi limiti (codice in una sola riga) rendono più ardua la scrittura di funzioni complesse: le MACRO semplificano il compito dell'utente. 
 3. Alcune operazioni richiedono la memorizzazione di informazioni tra un run ed il successivo, e le MACRO (*) risolvono questo problema, senza ricorrere esplicitamente a VSET() VGET().
 4. Importante è la distinzione tra un **livello** - lo stesso valore (e.g. true) uguale per più run, generato, per esempio, da un confronto - e un **TRIGGER** - vero per un solo run, quando inizia o finisce un evento -: _Le macro con TRIG nel nome generano TRIGGER, le altre generano LIVELLI_.<br>
  
  _nota: questa selezione iniziale di MACRO è naturalmente condizionata dalle mie abitudini ed interessi: in questo settore il contributo di altri utenti è prezioso._

Possiamo dividere le MACRO in due gruppi: il primo che gestisce le interazioni con le risorse disponibili in **IoTwebUI** (una sorta di API interna). Il secondo gruppo di MACRO sono invece generali, modificando in qualche modo utile i dati in input o fornendo utili output.<br>
_nota: obiettivo delle MACRO non è quello di duplicare le funzionalità delle automazioni Tuya (anche se a volte c'è sovrapposizione), quanto quello di fornire strumenti più avanzati di calcolo, per ottenere 'automazioni' fin'ora impossibili.   L'uso di device virtuali e di tap-to-run permette di suddividere i compiti tra scene Tuya (automazioni e tap-to-run) e RULE nel modo più efficiente._ <br>
Ovviamente si possono sempre aggiungere nuove MACRO, o come customizzazione (se create nuove MACRO comunicatemelo) oppure in nuove release di **IoTwebUI** (segnalatemi le vostre esigenze su GitHub,  nelle [ISSUE](https://github.com/msillano/IoTwebUI/issues)).
<hr>

#### MACRO per risorse
<dl>
<dt>ISCONNECTED(device)</dt>
<dd>Ritorna 'true' se il device (nome o ID) è connesso. <br>
<i>nota: il dato proviene dal Cloud, può differire dal valore locale mostrato da SmartLife.</i><br>
<i>Esempio:</i> <code>if (! ISCONNECTED("Tuya bridge")) VOICE ("Attenzione! 'tuya bridge' attualmente disconnesso"); </code>  </dd>

<dt>GET(device, property)</dt>
<dd>Ritorna il valore di 'property' (usare i nomi originali mostrati nei tooltip) del device (nome o ID)<br> <i>Esempio:</i> <code>var _tf = GET("TF_frigo","va_temperature");</code> </dd>

<dt>DATALOG(name, value) (*)</dt>
<dd>Aggiunge un nuovo 'value' al file di log dati, con il 'name' indicato. Utile per salvare risultati di elaborazioni (e.g. medie). Questa MACRO 'prenota' il salvataggio di un valore, ma il salvataggio avviene con i tempi e i modi impostati in config per il file log dati.<br>
<i>nota: il salvataggio dati durante un test inizia subito, ma, nel formato CSV, la prima riga con i nomi è già stata creata e non è aggiornata. Eventualmente salvare il file di log per avere un nuovo file aggiornato. Questo solo in fase di test: con le RULE  in </i>uso <i> dall'avvio non c'è problema.</i><br> 
 <i>Esempio:</i> <code>DATALOG("Temperatura Frigo", GET("TF_frigo","va_temperature")/10);</code>
</dd>

<dt>ALERTLOG(name, message) </dt>
<dd>Aggiunge il 'message' al registro degli avvisi, identificato da 'name'.<br>
<i>Esempio:</i> <code>if(ISTRIGGERL(GET("tuya_bridge", "switch_1"))) ALERTLOG("tuya_bridge", "Aperto adesso");</code>></dd>

<dt>BEEP()</dt>
<dd>Segnale di avviso.<br>
<i>Esempio:</i> <code>if(GET("TF_frigo","va_temperature") > 100) BEEP(); </code>
</dd>

<dt> POP(device, message)</dt>
<dd>Segnale di avviso.<br>
<i>Esempio:</i> <code>if(ISTRIGGERH(GET("TF_frigo","va_temperature") > 100)) POP("Frigo", "TEMPERATURA oltre 10°C" ); </code> </dd>

<dt>XURL(url)</dt>
<dd>Apre un URL nel browser.<br>
<i>Esempio:</i>  <code>XURL("https://www.google.com/"); </code> </dd>

<dt>REST(url)</dt>
<dd> Per servizi web API REST (GET) che tornano come risposta un testo semplice.<br>
 <i>Esempio:</i>  <code>
  // see https://www.ipify.org/ <br>
 if(TRIGBYNAME("my IP"))  POP( "My IP", REST("https://api.ipify.org/?format=txt"));   </code> </dd>
 
<dt>RESTJSON(url)</dt>
<dd> Per servizi web API REST (GET), che forniscono la risposta in formato JSON (la maggior parte). Questa funzione restituisce, per semplificare l'uso, direttamente un oggetto.<br>
 <i>Esempio:</i>  <code>
  // see https://open-meteo.com/<br>
 var _meteo, _urlm ="https://api.open-meteo.com/v1/forecast?latitude=41.9030&longitude=12.4663&current=temperature_2m"; <br>
 if(TRIGBYNAME("meteo")) _meteo = RESTJSON(_urlm), POP("ROMA", "temperatura = " + _meteo .current.temperature_2m );  </code> <br>
<i> nota: questa è la struttura completa dell'oggetto-risposta (<code>_meteo</code>), che si può vedere in console con <code>'console.log(_meteo)'</code>. Si è utilizzata in POP() solo la temperatura ( <code>_meteo.current.temperature_2m </code>): </i> <pre>
current: 
    interval: 900
    temperature_2m: 33.7
    time: "2024-06-20T17:00"
current_units: 
    interval: "seconds"
    temperature_2m: "°C"
    time: "iso8601"
elevation: 15
generationtime_ms: 0.01800060272216797
latitude: 41.9
longitude: 12.469999
timezone: "GMT"
timezone_abbreviation:"GMT"
utc_offset_seconds: 0
</pre></dd>

<dt>VOICE(message)</dt>
<dd>Segnale di avviso.<br>
<i>Esempio:</i> <code>if (! ISCONNECTED("Tuya bridge")) VOICE ("Attenzione! 'tuya bridge' attualmente disconnesso") </code>
</dd>

<dt>SOUND(url)</dt>
<dd>Riproduce musica o messaggio audio: formato MP3 o WAV.<br>
 _Esempio:_  <code>SOUND("https://assets.mixkit.co/active_storage/sfx/918/918.wav"); </code>     
</dd>

<dt>SCENA(scenaNome) </dt>
<dd>Esegue un 'tap-to-Run', presente nell'elenco letto dal Cloud.<br>
 <i>Esempio:</i> <code> if(ISTRIGGERH(_alarm)) SCENA('sirena suona'); </code></dd>

<dt>TRIGRULE(name)</dt>
<dd>Esegue un RULE individuato da un nome. <br>
 nota: Se la definizione TRIGBYNAME(name) precede l'uso di TRIGRULE(name), l'esecuzione non è immediata, ma avviene subito dopo il termine del run attuale delle RULE, in un run EXTRA. <br>                                              
 <i>Esempio:</i> <code>  if (TRIGBYNAME("pippo")) VOICE (" Trovato pippo"); <br>  // RULE 'pippo'
     if (TRIGBYNAME("chiama pippo")) TRIGRULE("pippo"), VOICE("chiamo pippo")    // RULE 'chiama pippo'
 </code> </dd>
</dl>
<hr>

#### MACRO funzionali
<dl>

![TRIGGERS](https://github.com/msillano/IoTwebUI/blob/main/pics/MACRO_01.png?raw=true)<br>
<i> input ed output di: <code>ISTRIGGERH(evento), ISTRIGGERL(evento), CONFIRMH(evento, T), CONFIRML(evento, T)</code></i>

<dt>ISTRIGGERH(condition) (*) </dt>
<dd> Ritorna 'true' solo al passaggio della "condizione" da 'false a true', evita che la "condizione" 'true' agisca ad ogni run. Ovvero trasforma un livello true in TRIGGER (vedi figura). <br>
<i>Esempio:</i> <code>if(ISTRIGGERH(GET("TF_frigo","va_temperature") > 100)) POP("Frigo", "TEMPERATURA oltre 10°C" );</code> <br>
Nota: l'implementazione Tuya di più <i>condizioni (livelli) in AND (tutte)</i> in una automazione è come se fosse scritta così:<br> <code>if( ISTRIGGERH(condiz1 && condiz2 && ...) ... </code> <br> cioè un'automazione Tuya scatta nel momento in cui TUTTE le condizioni diventano true. Con più condizioni in OR, basta UN trigger:<br> <code>if( ISTRIGGERH(condiz1) || ISTRIGGERH(condiz2) || ...) ... </code>.<BR> 
Nota: più <i>condizioni (livelli) + ambito (livello) + abilitazione </i> delle automazioni Tuya, può essere implementato nelle RULE così:<br> <code>if( (ISTRIGGERH(condiz1...) ...) && (ambito...) && abilitata)...</code>. <br> Si vede come <i>Ambito</i> NON intervenga nel TRIGGER ma che comunque DEVE essere vero!
</dd>
 
<dt>ISTRIGGERL(condition) (*)</dt>
<dd> Ritorna 'true' solo al passaggio della "condizione" da 'true a false'  (inverso  di ISTRIGGERH):  trasforma un livello false in TRIGGER. <br>Nota: l'uscita è invertita rispetto a 'condizione'  (vedi figura).<br>
<i>Esempio:</i> <code>if(ISTRIGGERL(GET("tuya_bridge", "switch_1"))) ALERTLOG("tuya_bridge", "Aperto adesso"); </code>  </dd>

<dt>CONFIRMH(condition, time) (*) </dt>
<dd> Ritorna 'true' solo se la "condizione" rimane 'true' per almeno il tempo 'time'. Poi resta 'true' fino a quando la 'condizione' è 'true'. Caso tipico una porta aperta. Serve a filtrare 'livelli' true di breve durata che non interessano  (vedi figura).<BR>
time = costante nei formati "hh:mm:ss" oppure "mm:ss" oppure "ss". Lmite inferiore: TuyaInterval.<br>
<i>Esempio:</i> <br>
   <code>var _doorev = GET("Sensore porta", "doorcontact_state") ; </code>   // true a porta aperta
   <code>if(ISTRIGGERH( CONFIRMH(_doorev, "01:20"))) VOICE("chiudere la porta, grazie"); </code> </dd>
 
<dt>CONFIRML(condition, time) (*) </dt>
<dd> Ritorna 'true' solo se la "condizione" rimane 'false' per almeno il tempo 'time'  (inverso  di CONFIRMH): Serve a filtrare 'livelli' false di breve durata che non interessano.<br>Nota: l'uscita è invertita rispetto a 'condizione'  (vedi figura).<br>
<i>Esempio:</i> <code>if(ISTRIGGERH(CONFIRML(ISCONNECTED("relay"), "02:30"))) VOICE("Allarme disconnessione");</code> </dd>

<dt>TRIGCHANGED(value) (*) </dt>
<dd> ritorna 'true' ogni volta che 'value' cambia rispetto al valore precedente.<br>
<i>Esempio:</i> <code> var _tf = GET("TF_frigo","va_temperature"); <br>
 var _annonce = "Alle ore " + TIME(hrs)+" la temperatura è cambiata. Il frigo è a " + ROUND(_tf/10, 1) + " gradi";<br>
 if(TRIGCHANGED(_tf)) VOICE(_annonce); </code></dd>

<dt>TRIGEVERY(n) (*)</dt>
<dd>  Semplice timer: ritorna 'true' solo dopo "n" esecuzioni, ciclico. <br>
  E' garantito un singolo valore 'true' per ogni n-simo loop, 'n' è in numero di loop, in tempo: t <= n x tuyaInterval (definito in 'config.js' file).<br>
<i>Esempio:</i> <code>if(TRIGEVERY(8)) POP( "FRIGO", "Temperatura interna: "+ ROUND(_tf/10, 1) + "°C");</code> </dd>
   
<dt>TRIGBYNAME(name) </dt>
<dd> Associa un 'nome' (max 3 parole) ad un RULE, permettendo di attivarlo con un comando utente (bottone o comando vocale) o in caso di 'Alert', oppure con TRIGRULE(name) da un'altra RULE (analogo ai 'tap-to-run' Tuya).<br>
Torna true quando deve essere eseguita. <br>
<i>Esempio:</i> <code>if (TRIGBYNAME('spegni la luce')) VOICE (" Hai attivato: 'spegni la luce'") </code> </dd>

<dt>VGET(name) </dt>
<dd>GET di una variabile permanente - conservata per tutti i run delle RULE.<br> 
 Se la variabile <code>name</code> NON è stata inizializzata con un VSET, ritorna <code>null</code>. <br>
<i>Esempio:</i> <code>if( VGET('inizio') == null ) VSET('inizio', TIME(hrs)); </code>  </dd>

<dt>VSET(name, value)</dt>
<dd>SET di una variabile permanente - conservata per tutti i run delle RULE.<br>
<i>Esempio:</i> <code>if( TRIGEVERY(10) ) VSET('prova', VGET('prova') + 2);</code>  </dd>

<dt>ROUND(number, pos)</dt>
<dd> Torna una stringa con 'pos' cifre decimali (se 'pos' >0) <br>
     oppure un numero intero ('pos' = 0) <br>
     oppure un numero intero con zeri ('pos' < 0) <br>
  <i>Esempi:</i> <code>'ROUND (123.567, 2)' => "123.57";  'ROUND(123.567, 0)'  => "124";  'ROUND(123.567, -2)'  => "100";</code> 
</dd>
      
<dt>ADDCOUNT(event, restart) (*) </dt>
<dd>  Quando restart è true ritorna il totale di volte che event è stato true, altrimenti torna <code>null</code>,
Può  essere usato in due modi: se 'event' è un TRIGGER conta il numero di volte. Altrimenti, se è un 'livello' valuta
la durata dello stato vero (come il duty cycle).
 <i>Esempio:</i> 
 <code>var _tot = ADDCOUNT(ISCONNECTED("HUB_zigbee"), TRIGEVERY(100));</code> <br>
 <code>if (_tot) POP("Affidabilità", "L'HUB Zigbee è stato connesso il "+ _tot +"% del tempo"); </code> </dd>

<dt>HYSTERESIS (value, test, delta)  (*)</dt>
 <dd> Confronta 'value' con 'test', usando come intervallo di isteresi 'delta'. L'output diventa 'true' se 'value &gt; test + delta/2',  oppure 'false' se 'value &lt; test - delta/2'.<br>
 <i>Esempio:</i> <code>if(ISTRIGGERH(HYSTERESIS(GET("T_letto","va_temperature"), 320, 10))) SCENA("Condizionatore ON"); </code> </dd>
 
<dt>AVG(value, n) (*) </dt>
<dd> Media mobile degli ultimi 'n' valori: torna una stringa con 2 decimali.<br>
'n' è in numero di loop, in tempo: t = n x tuyaInterval (definito in 'config.js' file).<br>
 <i>Esempio:</i> <code>DATALOG("Temperatura media Frigo", AVG(GET("TF_frigo","va_temperature")/10, 20)); </code> </dd>

<dt>MAX(value, n) (*) </dt>
<dd>Ritorna il più grande  degli ultimi 'n' valori.<br>
'n' è in numero di loop, in tempo: t = n x tuyaInterval (definito in config.js file).<br>
<i>Esempio:</i> <code>var _Tmax = MAX(GET("TF_frigo","va_temperature")/10, 1440);</code>  (24h = 1440 min) </dd>

<dt>DERIVATIVE(value) (*) </dt>
<dd>Ritorna la derivata (meglio: il rapporto incrementale) di value.<br>
<i>Esempio:</i> <code>if (DERIVATIVE(GET("TF_frigo","va_temperature")) > 0) VOICE("Temperatura Frigo crescente");</code> <br>
<i>Esempio: per valutare la bontà dei calcoli</i> <pre>
  var _integ = INTEGRAL(1,  300); 
  var _deriv = DERIVATIVE(_integ); 
  console.log ( _integ , _deriv); </pre>
</dd>

<dt>INTEGRAL(value, limite) o INTEGRAL(value)(*) </dt>
<dd>Ritorna l'integrale (meglio: la somma integrale) di value. Limite è opzionale, e riporta a 0 l'integrale quando è raggiunto.<br>
<i>nota: E' possibile usare <code>INTEGRAL</code> per creare timer più precisi di <code>TRIGEVERY()</code> che si basa sul conteggio dei cicli. <br> L'integrale di una costante è una retta crescente: usando 1 come costante, e un <code>limite</code> in secondi, si ha un'andamento a denti di sega. L'integrale vale 0 all'avvio e poi ogni <code>limite</code> secondi (errore: 0..+TuyaInterval) con ottima precisione. Questo esempio è un timer periodico di durata 1h:</i> <pre>
           var _integ = INTEGRAL(1, 3600); 
           if (_integ == 0) ...more...</pre>
</dd>

<dt>TIME(wath) </dt>
<dd>  ritorna una stringa, "hh:mm:ss" oppure "mm:ss" oppure "ss" calcolata dall'ora attuale, a seconda di 'wath'.
  'wath': una delle costanti così definite: <i>hrs</i> = 11, <i>min</i> = 14, <i>sec</i> = 17 (senza apici, non sono stringhe).<br>
  <i>Esempio:</i> <code>var _message = "Alle ore " + TIME(hrs); </code> </dd>
 
<dt>  DAYMAP(val1, time1, val2, time2, ... <i>more</i>) </dt>
<dd> Programmazione giornaliera, ritorna un valore che varia nel tempo: fino a 'time1' l'output è 'val1', da  'time1' a  'time2'  l'output è 'val2'... avanti così fino  all'ultimo 'time' dopo di che  l'output è di nuovo 'val1'.<br>
Naturalmente i valori 'val' e 'time' devono essere presenti a coppie, tanti quanti ne servono. Tutti i 'time' in formato "hh:mm:ss".<br>
Usi: profili di temperatura giornalieri, eventi ad orario o abilitazione per intervalli di tempo, etc., a seconda se 'val' sono temperature, oppure 'buongiorno'/'buonasera', oppure true/false, etc..<br>
 <i>Esempio:</i> <code>if(DAYMAP(false,"12:30", true, "14:00")) BEEP(); </code>
 </dd>
 
<dt>WEEKMAP(map) </dt>
<dd>Programmazione settimanale: 'map' è una stringa di sette caratteri qualsiasi, uno per giorno della settimana, partendo dalla Domenica (e.g.: 'DLMMGVS' o 'SMTWTFS' o '1234567'). Solo se il carattere corrispondente ad oggi è '-' (trattino) ritorna 'false' altrimenti torna 'true'. <br>
 <i>Esempio:</i>  <code>WEEKMAP("DLMM-VS") </code> è falso solo ogni Giovedì. </dd>

<dt>YEARMAP(mese, giorno) </dt>
<dd>Programmazione annuale: 'mese' e 'giorno' sono due stringhe di 12 e 31 caratteri qualsiasi, per identificare mesi e giorni (e.g.: 'GFMAMGLASOND' e '1234567890123456789012345678901'). Solo se il mese e il giorno di oggi sono '-' (trattino) ritorna 'false' (per 24h) altrimenti torna 'true'. <br>
 <i>Esempio:</i>  <code>YEARMAP( 'GFMAMGLASON-', '12345678901234567890123-5678901') </code> è falso solo a Natale.
  </dd>
 
</dl>

(*): identifica le MACRO che fanno uso di memoria per salvare lo stato: NON usarle nella parte _azione_ di un if())
      
<hr>
      
Progetto OpenSource, Licenza MIT, (c)2024 marco sillano

_Questo progetto è un work-in-progress: viene fornito "così com'è", senza garanzie di alcun tipo, implicite o esplicite._

- _Se sviluppate qualche estensione o applicazione interessante con IoTwebUI fatemelo sapere: possiamo inserirla qui, o nella prossima release._
- _Per problemi riguardanti il codice ed il funzionamento di IoTwebUI, aprite un 'issue' qui ([github](https://github.com/msillano/IoTwebUI/issues))._
- _Per problemi più generali riguardanti  Tuya, SmartLife (Tuya smart) e IoTwebUI, che possono interessare anche altri utenti, postate pure nel gruppo [Tuya e Smart Life Italia](https://www.facebook.com/groups/tuyaitalia)_

Grazie per l'interesse <br>
m.s.

<hr>

### Riconoscimenti
Tutti i marchi riportati appartengono ai legittimi proprietari.

- https://getbootstrap.com/docs/5.3/getting-started/introduction/
- https://visjs.github.io/vis-network/docs/network
- https://fontawesome.com/v4/icons/
- https://code.google.com/archive/p/crypto-js/
- https://github.com/inorganik/debugout.js 




