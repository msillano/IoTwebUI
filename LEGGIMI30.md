# IoTwebUI 3.1: Tuya WEBAPP open extension #
[english version](https://github.com/msillano/IoTwebUI/blob/main/README30.md)<br>

**_Stanco delle limitazioni di SmartLife?  IoTwebUI 3.0 è arrivato per dare nuova linfa alla tua casa intelligente, con un arsenale di funzionalità che ti faranno dire "finalmente!". <br> La filosofia 'open' è nel DNA di questa APP, che esalta la customizzazione ed il controllo da parte dell'utente._** 

## _Che cosa puoi fare?_
👀 Controlla tutto: Interfaccia intuitiva e personalizzabile, dati sempre a portata di mano, visualizzazione flessibile.<br>
🔬 Esportazione dati: Salva le serie storiche per le tue analisi, nel formato più utile<br>
⚡️ Automazioni potenti: Crea automazioni complesse con tap-to-run e REGOLE, impossibili con SmartLife!<br>
⏱️ Alert personalizzati: Monitora ogni aspetto della tua domotica e ricevi avvisi realtime, anche vocali.<br>
🎙  Comandi vocali: integrati con tap-to-run e REGOLE, in un'unica APP<br>
👌 Integrazione perfetta: Combina device, proprietà, voce, REGOLE e Tuya tap-to-run per un'automazione fluida, completa ed affidabile. <br>
🏚  E' un ponte tra le HOME: può leggere i dati dei device in qualsiasi HOME e può usarli nelle REGOLE e attivare tap-to-run in tutte le HOME. Le 'scene' Tuya agiscono solo sui device dell'HOME in cui sono definite. 

**NUOVO _versione 3.1_**
* _IoTwebUI AI_:  un **chatbot** general purpose integrato con [l'ecosistema Tuya](https://github.com/msillano/IoTwebUI/blob/main/IoTwebUI%20AI/LEGGIMI.md).

**_versione 2.2_**
* _Interfaccia REST (server)_: webservice per il semplice collegamento con applicazioni od interfacce custom (documento [LEGGIMI-REST22](https://github.com/msillano/IoTwebUI/blob/main/RESTserver/LEGGIMI-REST22.md)).<br>
* _x-device_: device virtuali IoTwebUI, ricorsive, e meccanismo di cooperazione [addon](https://github.com/msillano/IoTwebUI/tree/main/addon).
* Esempi di pagine custom html, librerie di widget: vedi dir [html](https://github.com/msillano/IoTwebUI/tree/main/html).
* _x-device_ +_ WEB interface_ => _APP_  Alcuni esempi di APP sono [qui](https://github.com/msillano/IoTwebUI/blob/main/APP/Overviews.md).
* _Internazionalizzazione_: versioni multilingua dell'interfaccia utente e del modulo 'voce'.

 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![](https://github.com/msillano/IoTwebUI/blob/main/pics/useschema.png?raw=true)

**_versione 3.0_**
* versione per tablet: integrazione di menu totalmente customizzabili (panel e IoTmenu) con IoTwebUI, per una migliore esperienza d'uso con sforzo minimo. 

![vers30](https://github.com/user-attachments/assets/5d8b9565-37bc-41af-86de-91a46d73b732)

nota: nella prima pagina menu di default (`index.html`) son presenti alcuni widget _senza dipendenze_. Widget per tutte le APP sono invece presenti, insieme ad altri esempi, nella pagina `panel_for_addon.html`. Comporre le proprie pagine, partendo da `panel_empty_template.html` è poco più di un copia-incolla di widgets (frammenti HTML) per le APP esitenti. Anche la creazione di nuove widget dinamiche è semplificata, con due librerie di IoTwidget interattive.

nota: _Portabile, può essere installato ovunque: su uno _smartphone_ o _tablet_, come interfaccia alternativa a SmartLife, per voi e per gli altri componenti della famiglia. Su un _PC_ (Windows, Apple, Linux...) per avere Tuya anche su questi computer. Su un _top-box Android_, per usare la TV come interfaccia Tuya!_.

 ![aspetto della versione 2.1](https://github.com/msillano/IoTwebUI/blob/main/pics/ver22.jpg?raw=true)

#### Interfaccia: un piacere per gli occhi e per il controllo

 - Scegli tra il tema chiaro o scuro, a seconda dei tuoi gusti.
 - Naviga tra i tuoi dispositivi e le 'home' con un albero trascinabile e zoommabile, perfetto per tenere tutto sotto controllo.
 - Popup informativi con nuove icone ti terranno aggiornato sullo stato di ogni proprietà di un device, senza perderti neanche un dettaglio.
 - Un menu a scomparsa con informazioni sulla configurazione e opzioni dinamiche ti darà accesso rapido a tutto ciò che ti serve.
 - Comandi vocale e Navigazione vocale tra le varie pagine.
 - E se vuoi personalizzare ancora di più, libera la tua creatività con icone, colori e popup informativi a tua scelta.
 - Tutti i testi usati sono raggruppati in un unico file, semplificando traduzioni e personalizzazioni.

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

#### Allarmi: mai più un evento perso

 - puoi attivare una funzione di controllo su qualsiasi proprietà dei dispositivi e scegliere i test "maggiore", "uguale" o "minore" per monitorare ogni aspetto della tua domotica.
 - Stessa logica delle condizioni Tuya, per un linguaggio comune ed affidabile.
 - Scegli tra diverse azioni conseguenziali: silente, beep, frase registrata, pop-up, messaggio vocale, lancio di URL o  RULE|tap-to-run Tuya.
 - Real Time, con un ritardo medio pari al 50% del periodo di campionamento Tuya, per un equilibrio perfetto tra rapidità e precisione: gli Allarmi sempre visualizzati, con pop-up o finestra.
 - Definizione degli Allarmi al runtime: controllo totale in tempo reale

#### REGOLE: Domanda di automazioni più potenti? IoTwebUI 2.2 ha la risposta!

 - Effettuare operazioni logiche ed aritmetiche e utilizzare variabili per una flessibilità senza limiti.
 - Confrontare i valori di due proprietà diverse, per automazioni ancora più libere.
 - Eseguire azioni complesse, come realizzare controlli PID, schedulare annualmente, o ricevere dati da altre applicazioni via REST.
 - Attivate in base a condizioni (come le 'Automazioni' Tuya) oppure su comando (come i 'tap-to-run' Tuya).
 - Per i casi più semplici (una sola condizione) si possono usare gli 'Allarmi' (che possono attivare 'tap-to-run').
 - Il linguaggio delle REGOLE soddisfa le condizioni Bohm/Jacopini e quindi è 'Turing completo'. Più potenza espressiva vuol dire per l'utente concentrarsi su 'che cosa si vuol fare' e non 'su come farlo' (pensiamo alle acrobazie a cui ci costringono talora le automazioni Tuya).
 - Così potente da poter creare ricorsivamente nuove **x-device** in _IoTwebUI_,
 - Come funziona?
    1. Crea le REGOLE al runtime con un'interfaccia user-friendly, anche se non sei un programmatore esperto.
    2. Utilizza MACRO predefinite per i compiti comuni e ripetitivi, risparmiando tempo e fatica.
    3. Prova le tue REGOLE in tempo reale per assicurarti che funzionino perfettamente.
    4. In caso di errore durante il test, un popup ti indicherà la riga e il tipo di errore per una risoluzione rapida e precisa.
    5. Esporta le tue REGOLE per inserirle nel file di configurazione e renderle permanenti.

#### Voice recognition: comandi vocali customizzabili

 - Attiva ogni tap-to-run o REGOLA con "Ehi Tuya, esegui ... "
 - Controlla la navigazione nell'APP IoTwebUI: "Ehi Tuya, vai alle scene"
 - Controlla la voce con la voce: puoi attivare il riconoscimento continuo oppure disattivarlo del tutto.
 - moduli ottimizzati per le varie lingue 

#### Modalità ESPERTO: per controllare tutto il controllabile

La modalità ESPERTO offre un controllo totale sulla personalizzazione di IoTwebUI.
   - Accedi alle interfacce di configurazione e apporta modifiche che saranno valide solo per quel run.
   - Copia i dati dal "pad" di esportazione nei file di configurazione per rendere stabili le tue scelte.
   - Puoi disattivare la modalità ESPERTO nella configurazione quando hai finito di personalizzare.

#### Interfaccia REST: accesso semplice e standard a IoTwebUI

Un'interfaccia _REST server_ in **IoTwebUI** offre un modo potente, flessibile e standardizzato per interagire con i tuoi dispositivi IoT, semplificando lo sviluppo e l'integrazione con applicazioni ed interfacce WEB. Vedi [installazione e dettagli](https://github.com/msillano/IoTwebUI/blob/main/RESTserver/LEGGIMI-REST22.md).
* Semplicità: L'architettura REST è progettata per essere intuitiva
* Flessibilità: Puoi accedere ai tuoi dispositivi IoT da qualsiasi dispositivo connesso a internet, utilizzando qualsiasi linguaggio di programmazione che supporti le richieste HTTP.
* Standard: REST è uno standard ampiamente adottato, il che significa che ci sono molte librerie e strumenti disponibili per semplificare lo sviluppo.
* Indipendenza: L'interfaccia REST separa l'interfaccia utente dal backend, permettendoti di aggiornare o modificare l'uno senza influenzare l'altro.
  
#### APP-Tuya: l'impensabile realizzato con Tuya

L'uso sinergico di 'x-device' e di UI custom permette la realizzazione di APP-Tuya inpensabili: per esempio un 'logic analyzer a 5 canali' per la visualizzazione di eventi dei device, oppure un 'termostato SW completo', o un 'tester per batterie al NiMH', etc... Un campo dove ogni utente può espandere la propria progettualità.

#### Interfaccia con Panel: tutto a portata di dito

Un menu ad albero personalizzabile secondo le esigenze ed i gusti di ciascuno!
Il pannello è così un 'abito su misura' ottimizzato 

#### Modding e device DIY Tuya con ESP3266

Non è possibile usare device custom con Tuya, non le riconoscerebbe!
Dedicato agli appassionati di DIY, si sono esplorate alcune possibilità di 'modding' dei device Tuyta standard, per ottenere semplicemente nuovi device e nuove funzionalità custom, ma Tuya compatibili.<br>
E' possibile aggiungere un ESP01 con uno 'sketch' realizzato con Arduino ad uno _smart relay Tuya_.


#### Unica APP, una valanga di funzioni 

* Open e customizzabile come vocazione: ogni scelta sarà solo vostra!
* Singolo punto di controllo: Con un'unica APP, hai un solo punto da monitorare e gestire. Ciò semplifica la risoluzione di problemi e riduce il rischio di conflitti tra diverse applicazioni.
* Minor dipendenza da terzi: Eliminando la dipendenza da più fornitori, riduci il rischio di interruzioni del servizio causate da problemi esterni, come malfunzionamenti dei cloud o modifiche delle strategie commerciali dei provider.
* Maggiore prontezza: riducendo i passaggi tra APP, i tempi di latenza si riducono.
* Stabilità a lungo termine: Un'unica APP offre una soluzione più stabile nel lungo periodo, poiché non sei soggetto a cambiamenti nelle politiche dei fornitori o a interruzioni del servizio dovute a migrazioni o aggiornamenti. Inoltre essendo OpenSource hai la garanzia di manutenzione a vita.
  
_In sintesi, un'unica APP offre un livello di affidabilità superiore grazie alla sua semplicità, al minor numero di dipendenze esterne e al maggiore controllo sui dati._

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
- Sempre per problemi di sicurezza, può venire richiesta ogni volta l'autorizzazione all'uso del microfono: dipende dal browser e dalla configurazione; ma l'uso di `run-me.bat` può evitare l'inconveniente.
- **IoTwebUI** accede ai dati del Cloud ESCLUSIVAMENTE in lettura, per evitare qualunque rischio di operazioni errate. Ma questo non limita le funzionalità di **IoTwebUI** (e di IoTrest e delle applicazioni utente): è possibile infatti effettuare qualsiasi aggiornamento della configurazione dei device in _maniera controllata_, cioè attraverso un 'tap-to-run'. Con questa strategia si ha la massima libertà in totale sicurezza!
- Usare una sola istanza dell'APP, altrimenti si hanno problemi con i token Tuya.


### Interfaccia utente
![](https://github.com/msillano/IoTwebUI/blob/main/pics/tootip20.png?raw=true)

Nei tooltip, che si aprono al passaggio del mouse sull'icona di un device, sono presenti tutte le proprietà incluse nello 'status' del device, con i nomi ed i valori usati da Tuya Cloud. Alcuni valori possono essere codificati. <br>
Alcune piccole icone forniscono ulteriori informazioni all'utente. Esempi (vedi figure sopra):
   - `tuya_bridge.switch_1` è sotto osservazione per un 'Allarme'
   - `tuya_bridge.switch_inching` è un esempio di valore codificato ('`AAAC`'). Decodificato è un oggetto:
      ````
      {
      "inching": false,
      "delay": 2
      }
      ````
       _nota: Se siete interessati alla decodifica dei valori Tuya, vedi un [esempio completo](https://github.com/msillano/IoTwebUI/blob/main/RESTserver/LEGGIMI-REST22.md#customizzazioni)._ 
   - `temperatura studio.va_temperature` è salvato sul datafile, insieme agli altri dati in `logList`.
   -  Per il device `temperatura soggiorno` è scattato l'Allarme (icona speciale)
   - `temperatura soggiorno.va _humidity`  è la causa dell'Allarme, ed è anche indicata la condizione (>40) che lo ha causato.
   - Il tooltip `termo studio` è customizzato,  per presentare le temperature con i corretti decimali e unità.
   - In modo EXPERT sono aggiunti nei tooltip i seguenti valori:
       - `is-a`:  nome del 'tipo' Tuya del device (in codice corrispondente è `device.category`). In totale circa 600 tipi.
       - `id`:  `device.id`, richiesto da alcuni HUB (e.g. TuyaDAEMON, Homebridge, HA, etc..) per accedere al Cloud.
       - `key`: `device.local_key`, richiesto da alcuni HUB che usano MQTT localmente.

**[da ver. 2.2.2] Tootip aggiornati**:
- Aggiunto il nome del device a tutti i tooltip.
- E' possibile 'esportare' i tooltip con [Ctrl] + [click] in un pop-up facilmente copiabile con copia-incolla.
- Il formato dei tooltip è CSV compatibile, usando ':' come separatore di campi. Quindi i dati di un tooltip sono facilmente importabili in uno spreadsheet (e.g. Excel) per ulteriori usi. 
- Le versioni aggiornate dei x-device di esempio (in GitHub, /addon) sono ottimizzate anche per l'esportazione.

### Logging ed esportazione dati
E' possibile esportare su un file alcuni dati: l'utente deve specificare solo `device` e `status` (proprietà) per identificare i dati che interessano e questi sono salvati ad intervalli regolari (minimo 1 minuto) in un buffer interno (max 5000 records - pari a 80h @1 rec/min), esportato poi su file automaticamente o su comando utente.<br>
L'utente può scegliere in configurazione tra due formati: `CSV` (indicato, per esempio, per DB e spreadsheet tipo Excel) oppure `JSON` (per elaborazioni più complesse con programmi ad hoc) con pochissimi interventi di editing sui file (vedi [oltre i formati](#formato-csv)).
<TABLE width = "100%" >
 <TR>
  <TD>
  In modo ESPERTO cliccando su un device si apre un dialogo, nella parte superiore interessa l'export dei dati su file:
   <ul>  
    <li>  <b> log + </b>- aggiunge al log (solo per il run corrente)
    <li>  <b> log - </b>-  elimina il device dal log, (tutte le proprietà)
    <li>  <b> esporta </b>- apre pop-up per vedere le definizioni del log attuale <br>
        <i> I 'log' permanenti sono nel file `config.js`: possono essere editati direttamente oppure copiati da questo pop-up.</i>
    <li>  <b> cancella </b>- chiude il dialogo.</ul>
  </TD>
  <TD>
   <img src="https://github.com/msillano/IoTwebUI/blob/main/pics/alert22.png?raw=true" />
  </TD>
 </TR>
</TABLE>

extra: In modalità ESPERTO è disponibile nel menu un comando per avere nella console l'intera struttura dati ottenuta da Tuya Cloud ('Oggetto-dati in console'): può essere esplorata a ogni livello nel pad della console oppure può essere copiata con copy&paste in formato JSON.

### Allarmi ed avvisi
In modo ESPERTO cliccando su un device si apre un dialogo che nella parte inferiore permette la definizione degli 'Allarmi':
<TABLE width = "100%" >
 <TR>
  <TD  width = "200px">
   <img src="https://github.com/msillano/IoTwebUI/blob/main/pics/alert23.png?raw=true" />
  </TD>
  <TD><ol>
        <li>  Scelta della condizione: 'maggiore', 'uguale' o 'minore'
        <li>  Il valore di confronto, un numero (24) o una stringa (e.g. true) senza apici (").
        <li>  Messaggio associato, che ha vari usi: <ul>
             <li> è un URL a un file MP3 o WAV nel caso 'suono'
             <li> oppure è un URL ed allora è aperto nel browser
             <li> oppure è il nome di un 'tap-to-run' o 'RULE' che viene eseguito 
             <li> oppure appare come testo in un 'pop-up'
             <li> oppure è il testo letto nel caso 'voce'
            </ul>
         <li>  Azione: una o più a scelta tra 'beep', 'pop', 'suono' e 'voce' (URL e tap-to-run|RULE sono automatici) </li></ol>
  </TD>
 </TR>
</TABLE>

 _note:_
 
 - _Se non si sceglie nessuna azione e si lascia vuoto 'message', l'azione di default è il cambio dell'icona del device e l'aggiornamento del tooltip, sempre eseguiti._
 - _Gli 'Allarmi' non hanno, per semplicità, un filtro a tempo: se definiti sono attivi 24/7. Se occorre qualche condizionamento, è possibile creare REGOLE ad hoc ed attivarle dall'alert (nota: un 'Allarme' può attivare una REGOLA, e le REGOLE possono attivare le stesse azioni dagli 'Allarmi')._ 
 - _Notare che 'connected' non è mai incluso nelle proprietà Tuya, e quindi non si possono definire 'Allarmi'. Ma è disponibile come MACRO nelle REGOLE._
 - _Avendo un solo messaggio, le regole di precedenza sono: SUONO e URL (auto) sono esaminati per primi, poi Tap-to-run e RULE (auto), e solo per ultimo POP e VOCE (compatibili: lo stesso messaggio può essere usato per entrambi); BEEP è sempre utilizzabile._
 - _E' possibile definire contemporaneamente più azioni compatibili, e.g. 'beep' e 'pop-up' (con messaggio)._
 - _Invece, per avere sia 'pop-up' che 'tap-to-run', occorre creare due Allarmi con le stesse condizioni: in uno 'message' sarà il testo per il 'pop-up', nell'altro il nome del 'tap-to-run' (auto)._
 - _La visualizzazione dei pop-up può dipendere dalla configurazione del browser: usando 'run_me.bat' si ha un aggiornamento automatico della configurazione per la nuova istanza del browser. Azioni utente (e.g. bottoni) possono abilitare momentaneamente i pop-up._ <br>
 _Comunque, per non perdere informazioni, se i pop-up sono disabilitati per qualche motivo, il messaggio è presentato lo stesso in una finestra dell'APP: la differenza è che i pop-up possono essere molti, mentre la finestra è unica e viene riusata con un contatore._
- _Gli **Allarmi** sono controllati ad ogni Tuya Cloud polling: gli eventi di breve durata, inferiore a `tuyaInterval` non possono essere rilevati._
- _Tutti gli Allarmi sono memorizzati e visibili nel 'registro Allarmi', dal menu principale._

**Comandi:**
 <ul>  
    <li>  <b> test + </b>- aggiunge un nuovo Allarme (solo per il  run corrente)
    <li>  <b> test - </b>- elimina tutti gli Allarmi del device (solo per il run corrente)
    <li>  <b> esporta </b>- apre pop-up per vedere le definizioni di tutti Allarmi attuali. <br>
        <i> Gli 'Allarmi' permanenti sono nel file `config.js`: possono essere editati direttamente oppure copiati da questo pop-up.</i>
    <li>  <b> cancella </b>- chiude il dialogo.</ul>

### tap-to_run Tuya
 I 'tap-to-run'( 'scene' che iniziano con 'Esegui') sono presentati suddivisi per 'home' nella apposita pagina (max 100) , e poi in ordine alfabetico, come una serie di bottoni.
 I nomi dei 'tap-to-run' possono avere i seguenti vincoli:
  - Limite di 3 parole se usati con i comandi vocali di IoTwebUI.
  - Utilizare prefissi per raggruppare in IoTwebUI i comandi correlati.
  - Essere facili da ricordare e da riconosere (se si usano i comandi vocali).<br>
  
 Un pad è dedicato alle 'user RULE' (REGOLE) identificate con un nome: sono trattate come i 'tap-to-run': possono essere usate negli Allarmi, oppure attivate con bottoni o tramite comando vocale, oppure lanciate da un'altra REGOLA.<br>
_Naturalmente 'REGOLE' e 'tap-to-run' devono avere nomi unici per poter essere identificati._
    
 
### REGOLE 
  In modo ESPERTO il menu presenta l'opzione "nuove REGOLE" che apre una pagina dedicata alla [gestione delle REGOLE](#regole---sintassi): 
<TABLE width = "100%" >
 <TR>
  <TD>
   Una parte importante è dedicata ad un pad di editing delle REGOLE (o RULE) (per dettagli vedi oltre).<br>
<i>Nota: se preferite usare un editor esterno più performante, potete certamente farlo, con copia-incolla.</i><br>
Si possono gestire due insiemi di REGOLE: quelle in <i>uso</i>, inizialmente lette dal file `usrrulesXX.X.js`, e quelle nuove, <i>in Edit</i> nel pad.
<br>
  
   I comandi presenti offrono le seguenti funzionalità;
   <ul>  
    <li>  <b> Pulisci </b>- pulisce l'area di edit
    <li>  <b> Carica </b>- copia in Edit le REGOLE attualmente in uso
    <li>  <b> Sostituisci </b>- le REGOLE attualmente in uso sono sostitute da quelle in edit.
    <li>  <b> Esporta </b>- Crea un pop-up per vedere le definizioni delle  REGOLE in uso. <i>Le REGOLE permanenti sono nel file 'usrrulesXX.X.js': possono essere editate direttamente o copiate dal pop-up.</i>
    <li>  <b> Test Start </b>- Start test delle REGOLE in Edit: le REGOLE in uso sono sospese.
    <li>  <b> Test End</b>- Termina il Test e ripristina le REGOLE precedenti (auto in caso di errore)
    </ul>
 </TD>
  <TD>
   <img src="https://github.com/msillano/IoTwebUI/blob/main/pics/rule01.png?raw=true" />
  </TD>
 </TR>
</TABLE>

### VoiceRecognition (Italiano)

- La disponibilità di questa funzione dipende dal browser usato.
- Non è facile raggiungere l'efficienza che si ha con HW specializzato (smart speakers: Google, Alexa), perché il risultato dipende da vari fattori, tra cui qualità del microfono usato, le relative regolazioni, la riduzione dei rumori di fondo, etc... Nelle prove sono passato da oltre il 90% di riconoscimenti ad un pessimo 20%! 
- Molto importante è altresì la scelta delle parole chiave e dei nomi per 'tap-to-run' e 'RULE': per esempio 'nome tre parole' è di difficile riconoscimento, mentre 'accendi la luce' è facilmente riconosciuto.<br> Ritengo che questo dipenda dai modelli linguistici usati: sono più riconoscibili frasi corrette, con un significato comune, rispetto a parole isolate. Per esempio 'Tuya' è spesso confuso con 'Giulia'.
- La presenza di articoli e/o preposizioni facilita il riconoscimento.
- Il comando vocale è opzionale, e può essere disabilitato nella configurazione.
- Se abilitato, voiceRecognition può essere usata in due modi, o continuo oppure premendo un pulsante. Il modo di default è impostato in configurazione, ma può essere cambiato con comandi vocali.
- la grammatica (italiana) di default è la seguente - tra parentesi `(alle)`: parole opzionali; barra verticale `a|su`: parole alternative-:

    - _'Ehi Tuya, esegui|attiva (la|un*) xxx ((la|un*) xxx ((la|un*) xxx))'_ => lancia 'tap-to-run' o RULE, nome max 3 parole
        nota sui nomi: parlando si possono aggiungere articoli o preposizioni (*) alle 3 parole, che quindi NON fanno parte del'nome' del 'tap-to-run' o 'RULE'. Esempio: "Hey Tuya, esegui accendi una luce" => nome: "ACCENDI LUCE"   
    - _'Ehi Tuya, (in|al) modo esperto'_ => apre EXPERT mode
    - _'Ehi Tuya, (in|al) modo utente'_ => torna in USER mode
    - _'Ehi Tuya, vai (alle*) scene'_    => navigazione alla pagina dei 'tap-to-run' e RULE
    - _'Ehi Tuya, vai (alle*) regole'_   =>  navigazione alla pagina edit RULE (se in EXPERT mode)
    - _'Ehi Tuya, vai (alla*) home'_  =>  navigazione alla pagina con albero device
    - _'Ehi Tuya, ritorna|home'_  =>  navigazione alla pagina con albero device
    - _'Ehi Tuya, modo (della*) voce continuo'_ => start del modo riconoscimento senza soste.
    - _'Ehi Tuya, modo (della*) voce a|su richiesta|domanda'_ => start del modo riconoscimento con bottone.
    - _'Ehi Tuya, basta voce'_ => stop del modo riconoscimento senza soste.
   

 (*) nota: _la lista di preposizioni ed articoli accettati ed ignorati  in quarta e successive posizioni  è molto lunga_: `'il', 'lo', 'la', 'le', 'i', 'gli', 'un', 'uno', 'una', 'a', 'ad', 'ai', 'al', 'all', 'allo', 'alla', 'alle', 'agli', 'da', 'dal', 'dallo', 'dalla', 'dalle', 'dai', 'dagli', 'di', 'del', 'dello', 'della', 'delle', 'dei', 'degli', 'con', 'col', 'coi', 'colla', 'in', 'nel', 'nello','nella', 'nei', 'negli', 'nelle', 'su', 'sul', 'sui', 'sullo', 'sulla', 'sulle', 'sugli', 'per', 'tra', 'fra'`: _scegliete quelle che facilitano il riconoscimento_. 
 
- _nota: L'implementazione tollera anche qualche imprecisione nel riconoscimento (e.g. 'Giulia' invece di 'Tuya', etc..): questo può essere facilmente customizzato. Vedi file i18n/speechX.X.it.js._
 
 - nota: Per una migliore comprensione, le frasi possono essere divise in due: "Ehi Tuya" + pausa: appare il feedback 'Ehi Tuya...' che conferma la comprensione della prima parte; ora può essere detta la seconda parte.
     
_nota: la richiesta di consenso all'uso del microfono dipende dal browser e dalla configurazione: usando 'run_me.bat' non dovrebbero esserci richieste._

### REST: client e server
In IoTwebUI esistono 2 interfacce REST:

1. _REST client_, implementato come MACRO in due versioni: TXT e JSON, permette di importare dati esterni nelle REGOLE, da webservice o anche da device di terze parti o device DIY che implementino un'interfaccia REST. _E' quindi possibile far interagire Tuya con device custom_: per creare device DIY con Arduino o ESP8266 vedi [esempio](https://github.com/msillano/tuyaDEAMON-applications/wiki/note-5:-Watchdog-for-IOT#watchdog03-esp01-relay--arduino).
2. _REST server_, per l'esportazione dei dati dei device Tuya e per il controllo su automazioni e allarmi, verso client in applicazioni o interfacce custom. Per dettagli [vedi documentazione IoTrest](https://github.com/msillano/IoTwebUI/blob/main/RESTserver/LEGGIMI-REST22.md).

_Queste due strade permettono finalmente l'integrazione di Tuya in progetti verticali, senza alterare il funzionamento base di Tuya/Smartlife, ma arricchendolo di nuove potenzialità, con una strategia più semplice delle alternative preesistenti (e.g. tuyaDAEMON, HA, etc...) Vedi [clima01](https://github.com/msillano/IoTwebUI/blob/main/html/clima01-leggimi.md), esempio di semplice UI WEB custom.

### Panel: menu realmente customizzabili (v. 3.0)

Realizzati in HTML, le pagine 'Panel' si possono pensare suddivise in strisce orizzontali. Ogni striscia può contenere un titolo oppure 1, 2, o 3 bottoni, che a loro volta possono contenere icone, widget, informazioni. L'utente può limitarsi al copia e incolla delle varie 'striscie'. L'uso di librerie e css renda semplice l'operazione!

<hr style="height:2px;border-width:0;color:gray;background-color:gray">

## Versioni
- 3.1  introduzione Intelligenza artificiale
  - IoTwebUI AI: **chatbot** integrato
  - Aggiunto comando REST per AI
  - Aggiunto buttone 'download' in alcuni popup.

- 3.0  Interfaccia **IoTwebUI** con pannello di comando/controllo, che supporta un sistema gerarchico di menu custom.
  - Essenzialmente sviluppo HTML esterno: cambiato il file di lancio (l'attivazione del REST è auto)
  - Create due serie di pagine: i 'panel' con interfaccia grafica, e i 'menu' più semplici, usati come controllo per alcune APP.
  - Tutti gli **addon** aggiornati per essere compatibili con i grafici creati da _Explore scene_ (`sceneo1.js`)
  - Il nuovo look ed il panel di default (`index.html` - senza dipendenze) sono distribuiti con _IoTwebUI_, gli altri come  APP (vedi [APP/panel](https://github.com/msillano/IoTwebUI/tree/main/APP/panel) ) da aggiungere in seguito.
  - La versione distribuita `IoTwebUI3.0.zip` ora contiene tutto il necessario: `IoTwebUI 3.0`, `REST3.0`, e il Panel `index.html`. La dir /html con il panel di default è reinserita nello ZIP.

- 2.2.3  correzione Bugs
  - Aggiornate alcune macro
    
- 2.2.2  correzione Bugs
  - Aggiunta funzione di export dei tooltip con [Ctrl]+[Click], formato CSV (':' separatore)
  - Dir  `html/` e `addon/` tolte dallo Zip: usare le ultime versioni direttamente da GitHub!

- 2.2.1  correzione Bugs
  - Aggiunti widget per interfacce web: iotwidget01 e iotwidget02 in html/inc/
  - User interface web (esempi) clima01.html e tes02.html in html/

- 2.2  Aggiunto server REST [IoTrest](https://github.com/msillano/IoTwebUI/tree/main/RESTserver)
  - [Internazionalizzazione](#internazionalizzazione) (IT, EN) per interfaccia utente e modulo speech.
  - Modificate voci menu
  - Evidenziati nell'albero i device 'virtuali' e gli 'x-device'
  - [nuove MACRO per]() _x-device_ , device list etc.
 
- 2.1.1 Correzione bugs [ISSUE10](https://github.com/msillano/IoTwebUI/issues/10): Token scaduto. [ISSUE11](https://github.com/msillano/IoTwebUI/issues/11): refuso.

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

<hr style="height:2px;border-width:0;color:gray;background-color:gray">
  
### NOTE sulla sicurezza

**_Per garantire la massima sicurezza, IoTwebUI opera esclusivamente in modalità di sola lettura, senza apportare alcuna modifica ai tuoi dati su Tuya Cloud._** <br>

_**Questa APP è totalmente aperta, priva di ogni protezione, e contiene nei file le vostre credenziali in chiaro!**_ <br>
_NON rendetela accessibile dall'esterno o da terzi, altrimenti tutti i vostri dati, credenziali Tuya incluse, sono esposti!_

<hr style="height:2px;border-width:0;color:gray;background-color:gray">

## Installazione

1. Scaricare e dezippare il file `IoTwebUI.x.x.zip`  in una dir (con le autorizzazioni richieste dal S.O.).
2. Eseguire le operazioni di configurazione (vedi oltre).
3. Per l'installazione del server REST (opzionale), vedi [dettagli qui](https://github.com/msillano/IoTwebUI/blob/main/RESTserver/LEGGIMI-REST22.md).
4. Il file principale è `IoTwebUI.html`.  NON è necessario un server WEB, in quanto il codice è tutto in javaScript, eseguito dal browser, ovviamente con JavaScript abilitato. Per lanciarlo vedi il file `run_me.bat` (per Windows - Chrome). Per altri S.O. creare uno script analogo. (Ignorare il messaggio Chrome: "stai utilizzando una segnalazione della riga di comando non supportata: - disable-web-security...": non supportata ma funzionante).
5. Con un Mac (IOS 10.11.6) ha funzionato la seguente riga di comando:
`xxx:~ yyyy$ open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security  --disable-popup-blocking --auto-accept-camera-and-microphone-capture --app=file:///Applications/IoTwebUI/IoTwebUI.html ` <br> nota: L'addon "Cross Domain - CORS" sembra risolvere il problema CORS senza file BAT, vedi [ISSUE4](https://github.com/msillano/IoTwebUI/issues/4).
6. In fase di installazione e setup è utile la console (nel browser - strumenti per programmatori -, o menu contestuale 'ispeziona') perchè lì vanno i messaggi di informazione e di errore di IoTwebUI.<BR>
Nelle immagini: a sinistra avvio OK (Chrome, CORS disattivato) a destra in caso di errore CORS (Opera):

<div><img src="https://github.com/msillano/IoTwebUI/blob/main/pics/okconsole.png?raw=true" alt="normal start" width="300" />
   <img src="https://github.com/msillano/IoTwebUI/blob/main/pics/CORSerror.png?raw=true" alt="CORS error" width="400" align="right" /></div>

### Note ver.3.0

Installare come descritto e separatamente sia **IoTwebUI** che **IoTrest**. Solo una volta che funzionano bene, utilizzare il nuovo file bat `APP_me.bat`, che attiva il look della versione 3.0 (aggiornare le DIR in `APP_me.bat`). Vedi anche le [istruzioni per le APP](https://github.com/msillano/IoTwebUI/blob/main/APP/LEGGIMI.md#installazione-e-uso).

### Configurazione

L'app **IoTwebUI** non è per utenti alle prime armi, pertanto è accettabile che la configurazione avvenga direttamente editando un file (`config`.js). _Le solite avvertenze: fare una copia del file prima di ogni modifica, usare un editor UTF8 (io uso Notepad-plusplus), e attenzione a NON ALTERARE niente altro (soprattutto virgole  ','  ed  apici '"' e "`")._

 - Che usiate l'app "Tuya smart" oppure l'app "SmartLIfe" non importa: ì dati INDISPENSABILI da inserire sono le proprie `credenziali Tuya` per la 'platform.tuya'.<BR> Sono indicate come _Access ID_ e _Access secret_ nella pagina 'overview' del Vostro progetto Tuya!
![image](https://github.com/user-attachments/assets/856c0db6-737b-4f85-8e69-a09e055936bc)
 <BR> Gli utenti di tuyaDAEMON, Homebridge, HA ed altri hub simili dovrebbero già averle, ma i nuovi utenti si devono iscrivere, ci sono molte guide nel web. [Questa](https://github.com/iRayanKhan/homebridge-tuya/wiki/Get-Local-Keys-for-your-devices) oppure [questa](https://github.com/azerty9971/xtend_tuya/blob/main/docs/cloud_credentials.md) sono molto chiare, altre sono [elencate qui](https://github.com/msillano/tuyaDAEMON/wiki/50.-Howto:-add-a-new-device-to-tuyaDAEMON#1-preconditions). Un vantaggio è che così si ha accesso alla piattaforma Tuya, con molti dati sui propri device, ed alla documentazione tecnica.

- E' altresì INDISPENSABILE aggiornare la var 'data_center' in funzione di quello usato al momento di installazione di Tuya/SmatLife.  Su 'SmartLife/me/Configurare/Account e sicurezza' trovate la Regione (e.g, Italia), e in questa guida: [https://github.com/tuya/tuya-home-assistant/wiki/Countries-Regions-and-Tuya-Data-Center](https://github.com/tuya/tuya-home-assistant/wiki/Countries-Regions-and-Tuya-Data-Center) trovate l'URL corrispondente.
Come alternativa potete accedere su `platform.tuya.com`, selezionare 'Cloud' e 'open project'. Ora selezionare il tab 'devices' e in alto a dx trovate il data-center che avete usato. Poi in: 'Tuya documentation' - 'Cloud Development > API Request > Request Structure': trovate l'elenco degli 'endpoints' (URLs).

- Altre opzioni riguardano: timing (Cloud e log) e configurazione del log: il formato, l'autosave, i valori richiesti, oppure il look&feel, come la presenza dei bottoni di pan/zoom. <BR>Dalla versione 1.2 la possibilità di escludere alcune home (`hide_homes` array), e dalla versione 2.0 quella di escludere alcuni tap-to-run (`hide_scenes` array). 

- Le opzioni disponibili per il riconoscimento vocale sono (sempre in config.js):
   1) se con il vostro HW funziona male, potete disabilitarlo del tutto: `SpeechRecognitionEnabled = false;`
   2) se invece vi funziona bene, potete eliminare la necessità di premere il pulsante ogni volta: `SpeechRecognitionNeverEnds = true;`.

- Ancora in `config.js`, la variabile  `expertModeEnabled = false` permette di disabilitare del tutto il modo 'EXPERT'.

- Dalla versione 2.0 le definizioni per 'dataLog' (`logList`  in `config.js`), ALLARMI (`testList` in `config.js`) e REGOLE (`usrRules` in  `usrrulesXX.X.js`) possono essere create nella APP, con semplici interfacce utente, e poi esportate per essere copiate nei rispettivi file.

- IMPORTANTE! Aggiornare con i path del sistema ospite il file di lancio `run_me.bat`, (e poi anche il file  `APP_me.bat`) per lanciare Chrome con una configurazione ottimizzata.
  
### Internazionalizzazione

* Interfaccia utente:  i file, uno per lingua, nome `text02.2.xx.js` sono situati nella dir 'i18n': il file in uso è `text02.2.js`. Sostituirlo con il file della lingua desiderata._<br>
* moduli 'speech':  i file, uno per lingua, nome `speech02.2.xx.js` sono situati nella dir 'i18n': il file in uso è `speech02.2.js`. Sostituirlo con il file della lingua desiderata._<br>
Se realizzate dei file per una nuova lingua, inviatemelo (https://github.com/msillano/IoTwebUI/issues): sarà  aggiunto!

## Customizzazioni

Il **IoTwebUI** è OpenSource, in HTML+Javascript, è abbastanza documentato e modulare. Quindi è possibile ogni intervento. 
Alcune aree sono state privilegiate e le rispettive funzioni poste per semplicità in file separati -`custom.js`, `usrrulesXX.X.js`,  "i18n/speech0X.X.js",  "i18n/text0X.X.js" con dettagliate istruzioni ed esempi:

 - _Tuya non permette più di cambiare le icone, per una opinabile  interpretazione dei suoi consulenti legali delle attuali leggi sul copyright._  
Per questa APP, invece, ho scelto le icone `awesome4`, con un'[ampissima scelta](https://fontawesome.com/v4/cheatsheet/) e  di libero uso. Di default tutti i device hanno la stessa icona, un cubo.<br>
Ma sono facilmente personalizzabili dall'utente: basta fornire un criterio di selezione dei device e l'indicazione dell'icona `awesome4` da usare. Come esempio, hanno icone speciali (vedi immagini e file `custom.js` ):
   - i Termometri (device con nome 'Temp...').
   - le Valvole termostatiche (device con nome 'Termo...').
   - i Gateway (device con 'Gateway' nel nome).
   - gli **x-device**  

Anche l'icona speciale che indica un'alert è customizzabile: vedi `alertIcon` in 'config.js'.
     
 - Il contenuto dei **tooltip**, varia a seconda del device. E' un settore dove è utile la possibilità di personalizzazioni, il metodo scelto (un filtro) permette ogni libertà: <br>
    - Alcuni valori sono criptati: si può scegliere di non farli vedere  - oppure di decodificarli. In alcuni casi la decodifica è opportuna: vedi un [esempio completo](https://github.com/msillano/IoTwebUI/blob/main/RESTserver/LEGGIMI-REST22.md#customizzazioni). 
    - In altri casi occorre dividere per 10 o 100 per avere il valore in unità SI.   
    - Come sviluppatore preferisco avere i nomi delle proprietà originali Tuya, ma si possono rendere più frendly traducendoli. N.B. nelle REGOLE usare i nomi Tuya originali, non eventuali traduzioni!
    - Se si desidera si possono anche aggiungere nuove informazioni per esempio derivandole da quelle del device (e.g. temperatura sia in °C che in °F).

- Per i 'tap-to-run' Tuya, è possibile personalizzare il colore dei pulsanti modificando `sceneColor(scene)` in `custom.js`.

- Per le REGOLE (RULE), i più avventurosi possono aggiungere le loro MACRO personali nel file `usrrulesXX.X.js`.

- Tutti i testi usati nell'interfaccia utente sono nei file "i18n/text0X.X.js".
- Per VoiceRecognition, nel file "i18n/speech0X.X.js" è semplice modificare le parole della grammatica proposta: esempio sostituire 'vai' con 'raggiungi'. L'obiettivo deve essere sempre quello di migliorare la comprensione dei comandi.
- L'adattamento del riconoscimento vocale ad altre lingue è complesso, e richiede profonda competenza della lingua sia nella grammatica che nel vocabolario.  Mi affido alla collaborazione di utenti volenterosi. 
- Un po' più complesso è aggiungere nuovi comandi vocali, non tanto per la definizione della grammatica (il codice attuale  può servire da esempio) quanto per l'implementazione delle azioni, che spesso dipendono dal codice esitente.<br>
Direi che per nuovi comandi vocali, la strada migliore è fare una proposta di implementazione nelle ['issue'](https://github.com/msillano/IoTwebUI/issues), e, in base al consenso ed alla fattibibilità, potrebbe essere implementata nella release successiva.
  
Queste customizzazioni NON SONO NECESSARIE, ma sono opzioni che redono più utile e personalizzato l'uso di TuyaUIweb.

<hr style="height:2px;border-width:0;color:gray;background-color:gray">

## formato CSV

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
## formato JSON
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
   
Il risultato JSON corretto è il seguente, utilizzabile con parser JSON (e.g. Notepad++ + JSON Viewer) per ricreare gli oggetti:
```
[
[{"home":"ROMA","device":"TF_frigo","status":"va_temperature","result":70,"day":"2024-05-17","time":"19:37:51"},
 {"home":"ROMA","device":"Temperatura studio","status":"va_temperature","result":25,"day":"2024-05-17","time":"19:37:51"}],
[{"home":"ROMA","device":"TF_frigo","status":"va_temperature","result":70,"day":"2024-05-17","time":"19:39:51"},
 {"home":"ROMA","device":"Temperatura studio","status":"va_temperature","result":25,"day":"2024-05-17","time":"19:39:51"}],
]
```
E' un array di array contenenti le singole misure (oggetti).

<hr style="height:2px;border-width:0;color:gray;background-color:gray">

## REGOLE - sintassi
Le 'REGOLE' sono codificate in `JavaScript`. Il particolare ambiente in cui sono valutate le REGOLE comporta qualche limite alla sintassi JavaScript (js) standard, come veremo in queste note. Le REGOLE sono esegute ciclicamente, dopo ogni pollig di dati dal Cloud Tuya, quindi ogni `TuyaInterval` (vedi `config.js`). Talora si hanno delle esecuzione extra, per esempio in occasione di attivazioni per nome delle REGOLE.

- **importante**: il codice è eseguito una riga alla volta, non è possibile scrivere blocchi js che occuppino più righe!  Per contenere la lunghezza delle righe, usare delle variabili volatili intermedie (vedi esempi).
- Definire le variabili volatili (valide per un solo run delle REGOLE) sempre con la sintassi: **var** `_tizio` **=**... , poi possono essere usate liberamente.
- Per definire variabili permanenti (valide per tutti i run) usare le MACRO: VSET(name, value) e VGET(name). Si consiglia la convenzione '$variabile' per i nomi, così sono immediatamente riconoscibili.
- Usare sempre un underscore **"_"** come primo carattere nel _nome delle variabili_: si evitano così interferenze con altre variabili del programma. Non usare caratteri 'strani' nei nomi delle variabili: meglio limitarsi a [A..Za..z0..9] e '_'.
- JavaScript è un linguaggio 'case sensitive', cioè distingue tra MAIUSCOLE e minuscole, quindi attenzione a scrivere le variabili sempre nello stesso modo (consiglio tutte minuscole, oppure la tecnica 'camel' per i nomi compositi: **`_variabilePocoUsata`**) per distinguerle a colpo d'occhio dalle MACRO (sempre MAIUSCOLE).
- Il 'punto e virgola' **";"** a fine riga è opzionale, ma consiglio vivamente di usarlo sempre.
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

nota: le condizioni delle automazioni/routine (tutte: Alexa, Google, Tuya etc...) sono SEMPRE confronti con valori costanti predefiniti. Nelle REGOLE questo vincolo cade completamente: si possono paragonare due misure, oppure paragonare il risultato di calcoli (e.g. medie etc..), o con una variabile memorizzata etc. Libertà e semplicità.

 - importante è anche l'uso delle parentesi, "()", sempre a coppie. Parentesi sono obbligatorie dopo ogni MACRO - nota, anche se non ci sino parametri, e.g. `BEEP()` - e dopo un `if()`, per racchiudere la condizione. Comunque usatele liberamente per raggruppare i risultati intermedi nelle espressioni e.g. `if((_a > 10) && (_b/2 == 0))...`
-  Molte MACRO devono conservare lo stato tra un run ed il successivo, (e.g AVG(), MAX() etc...) e sono individuate con (*). 
- Il costrutto js più utile nelle REGOLE è l'**if()** (esecuzione condizionale), che assume varie forme:<br>
   **if(** `condizione` **)** `azione;`    // `azione` _è eseguita solo se `condizione` è vera_ <br>
   **if(** `condizione` **)** `azione1`**,** `azione2;` // _due (o più) azioni, separate da_ ',' _virgola._<br>
   **if(** `condiz1 && condiz2 && ...` **)** `azione;` //  _AND: 'tutte',_  `condiz1` _e_ `condiz2` _e_ ... _devono essere vere contemporaneamente._<br>
   **if(** `condiz1 || condiz2 || ...` **)** `azione;` //  _OR: 'almeno una',_  `condiz1` _oppure_ `condiz2`, _oppure_ ... _deve essere vera._<br>
   **if (** `condizione` **)** `azione1` **else** `azione2;`  // _esegue `azione1` (se vero) oppure `azione2` (se falso)._ <br>
nota: Le automazioni Tuya (una o più condizioni, AND/OR), Google (un test + comando vocale, OR), Alexa (una sola condizione!) etc... nelle condizioni hanno pesanti vincoli. Le REGOLE sono veramente più elastiche: si possono avere quante condizioni si vuole in AND o OR, ma anche condizioni più complesse usando con cura le parentesi per indicare l'ordine di calcolo!
esempio:  `if ( (condiz1 || condiz2) && (condiz3 || condiz4) )`  - a parole: "deve essere vera almeno una tra (condiz1, condiz2) ED anche almeno una tra (condiz3, condiz4)".

 - Se una `condizione` è vera a lungo (livello), un `if()` sarà eseguito più volte, ad ogni ciclo. Per evitare questo le macro TRIGGER sono vere per un solo ciclo, la PRIMA volta che la condizione è vera, e poi sono false.

 - nota sui messaggi di errore: Non sempre i messaggi di errore identificano la VERA causa del problema. Esempio, una variabile mal scritta è trovata subito come 'non definita', ma una parentesi non chiusa, può portare a messaggi poco chiari righe dopo, quando il compilatore trova un problema! Quindi attenzione! 

- **importante**: per come sono implementate, le MACRO che usano memoria (\*) devono essere eseguite ad ogni run: quindi NON possono essere presenti nella parte `azione` di un **if()**. Per ragioni analoghe non sono ammessi **if  nidificati** (un **if()** nella zona azione di un altro **if()**: non potrebbe usare le MACRO (\*)). Sono vincoli che non pongono, però, serie limitazioni.
  <hr>
  
**ESEMPIO** - Un caso concreto di controllo del riscaldamento <br>
_Ho il riscaldamento centralizzato, con valvole termostatiche su ogni radiatore: ogni stanza ha il suo profilo di temperatura desiderato (Ttarget). Tutto funziona molto bene, tranne in casi eccezionali (esempio, impianto spento per manutezione)._ <br>
Vorrei implementare con Tuya una strategia di questo tipo: _se la temperatura ambiente è minore di un 'tot' rispetto al Ttarget, accendere il condizionatore come pompa di calore impostando come temperatura proprio Ttarget._ Cioè:

   <code>`Se  (( Ttarget - Tambiente ) > tot) => clima.warm( Ttarget )` </code>
 
_Questa strategia NON è realizzabile con le 'automazioni' di Smartlife_, nè con Alexa o Google o HomeKit..., per diversi motivi:
   - nelle automazioni non si possono usare operazioni aritmetiche: `( Ttarget - Tambiente )`
   - i confronti, nelle automazioni, si possono fare solo con valori predefiniti costanti: `( Tambiente < Ttarget - tot )`
   - non esistono tap-to-run parametrici od almeno con nomi dinamici:  `clima.warm( Ttarget )`.
 
Chiedo troppo? Un sistema 'open' dovrebbe permettere queste automazioni. O no? Infatti con **IoTwebUI** e le REGOLE _si può fare!_ <br>
Vediamo come l'ho realizzata. Alcune precondizioni: la mia termovalvola ('Termo letto')  ha le proprietà 'temp_set' e 'temp_current'.
Per ovviare alla mancanza di 'tap-to-run' parametrici, cioè con un valore definito dall'esterno al runtime, uso 'tap-to-run' con il nome dinamico: per semplicità ho utilizzato come temperatura Target solo i valori 16, 20, 21 °C: in questo modo mi occorrono solo 3 tap-to-run chiamati Tletto16, Tletto20 e Tletto21, per accendere ed impostare il climatizzatore alle temperature volute, in altre parole, il parametro è nel nome!
Ecco le REGOLE necessarie, dove uso alcune variabili intermedie per ridurre la complessità. La macro ISTRIGGERH() è vera una sola volta, quando la condizione passa da falso a vero (vedi oltre), ROUND() arrotonda un numero e lo trasforma in testo, per formare le stringhe "TLetto16","TLetto20",... cioè il nome del 'tap-to-run', che così ora dipende da Ttarget. L'accensione è anche memorizzata nel 'registro degli Alert'.
```
var _tot = 2.3;                                        // da tarare il prossimo inverno
var _Ttarget =  GET("Termo letto", "temp_set") ;       // varia a seconda dell'orario
var _nowClima = ISTRIGGERH( ( _Ttarget -  GET("Termo letto", "temp_current") ) > _tot);           // condizione
if (_nowClima) SCENE("TLetto" + ROUND( _Ttarget, 0) ), ALERTLOG("RULE Tletto", "acceso clima") ;  // esecuzione
```

nota: i nomi dei tap-to-run come 'TLetto16' sono impossibili da usare con il riconoscimento vocale, ma servono così per poterli gestire dinamicamente. Se utile, basta creare dei 'tap-to-run' con nomi semplici come alias, tipo 'riscaldamento camera letto', che si limitano a utilizzare quelli con i nomi irriconoscibili.

_Tutto sommato semplice, nevvero? Secondo i progettisti di APP per domotica (tutti: si copiano l'un l'altro le prestazioni) noi utenti siamo solo in grado di gestire " Se ....  Poi ....". Che mancanza di fantasia e di fiducia!._ 
_Che poi, avere a disposizione strumenti sofisticati, non vuol dire essere obbligati ad usarli! Se non si devono usare, meglio. Ma quando servono le REGOLE sono lì, pronte a risolvere i nostri problemi._

### REGOLE - Primi passi
Volete fare delle prove ma non sapete da dove cominciare? Ecco tre REGOLE che non richiedono device, ma sono utili per fare le prime prove.
1) copiare le seguenti 3 REGOLE nell'area di edit delle RULE (modo ESPERTO), e poi premere TEST.
2) Nella pagina tap-to-run, tab 'user RULE' trovate tre nuovi bottoni: 'spegni luce'. 'Pippo' e 'chiamata Pippo': potete verificare il funzionamento delle tre REGOLE.
3) Attivate il 'comando vocale', e provate _"Ehi Tuya, esegui Pippo"_,  _"Ehi Tuya, esegui spegni la luce"_ _"Ehi Tuya, esegui una chiamata per Pippo"_...
```
   if (TRIGBYNAME('spegni luce')) VOICE ("Fatto: 'spegni la luce'");
   if (TRIGBYNAME("Pippo")) POP ("Test", "Trovato Pippo");
   if (TRIGBYNAME("chiamata Pippo")) TRIGRULE("Pippo"), VOICE("chiamo Pippo");
```

### REGOLE - MACRO
le MACRO rispondono a varie esigenze:
 1. Fornire accesso alle risorse e funzionalità di **IoTwebUI**, per poterle usare nelle REGOLE
 2. L'ambiente (run ripetuti ad intervalli regolari) e i suoi limiti (codice in una sola riga) rendono più ardua la scrittura di funzioni complesse: le MACRO semplificano il compito dell'utente. 
 3. Alcune operazioni richiedono la memorizzazione di informazioni tra un run ed il successivo, e le MACRO (*) risolvono questo problema, senza ricorrere esplicitamente a VSET() o VGET().
 4. Con gli eventi è importante la distinzione tra un **livello** - lo stesso valore (e.g. true) uguale per più run, generato, per esempio, da un confronto - e un **TRIGGER** - vero per un solo run, quando inizia o finisce un evento -: _Le macro con 'TRIG' nel nome generano TRIGGER, le altre generano LIVELLI_.<br>
  
  _nota: questa selezione iniziale di MACRO è naturalmente condizionata dalle mie abitudini ed interessi: in questo settore il contributo di altri utenti è prezioso._

_nota: per identificare un device potete usare indifferentemente il nome o l'ID (non mi piace imporre limiti non necessari!). Usare l'ID è un poco più complesso (potete trovarlo nei tooltip di IoTwebUI in modo ESPERTO) ma offre il vantaggio che potete rinominare il device in ogni momento!_

Possiamo dividere le MACRO in due gruppi: il primo che gestisce le interazioni con le risorse disponibili in **IoTwebUI** (una sorta di API interna). Il secondo gruppo di MACRO sono invece più generali, modificando in qualche modo utile i dati in input o fornendo utili output.<br>
_nota: obiettivo delle MACRO non è quello di duplicare le funzionalità delle automazioni Tuya (anche se a volte c'è sovrapposizione), quanto quello di fornire strumenti più avanzati di calcolo, per ottenere 'automazioni' fin'ora impossibili.   L'uso di device virtuali e di tap-to-run permette di suddividere i compiti tra scene Tuya (automazioni e tap-to-run) e RULE nel modo più efficiente._ <br>
Ovviamente si possono sempre aggiungere nuove MACRO, o come customizzazione (se create nuove MACRO comunicatemelo) oppure in nuove release di **IoTwebUI** (segnalatemi le vostre esigenze su GitHub,  nelle [ISSUE](https://github.com/msillano/IoTwebUI/issues)).<

#### MACRO - x-device

A partire dalla ver. 2.2 si possono create e gestire, tramite MACRO e REGOLE le **x-device**, cioè dei 'device virtuali' per **IoTwebUI**. Il grande vantaggio è che hanno prestazioni anologhe ai device reali Tuya: appaiono nell'alberto dei device, nella casa e stanza assegnata, hanno tooltip aggiornati, log, alarm etc...<br>

Gli **x-device** introducono in  **IoTwebUI** un concetto di _composizione ricorsiva_: un _x-device_ può essere un device di base (primo livello, come i device Tuya) ma anche un device 'astratto' di livello superiore, che riunisce e sintetizza i dati e le azioni di più device di livello inferiore, come fanno, ad esempio, i 'Gruppi' Tuya.<br>
A differenza dei 'Gruppi' (unica possibilità di aggregazione con Tuya) gli _x-device_ sono, a tutti gli effetti, ancora dei device, e quindi la composizione è ricorsiva. Inoltre le funzioni di aggregazione sono libere, sotto controllo dell'utente e non stereotipate in 'ON/OFF'. Ancora, essendo gli **x-device** dei device, si possono definire Alert e Automazioni basate selle loro proprietà, cosa NON possibile con i 'Gruppi'!<br>
Gli **x-device**, oltre alla presentazione dei dati, possono anche gestire 'azioni', che trasferiscono al livello inferiore utilizzando REGOLE (e Automazioni o REST-client).

**_Scenari d'uso per x-device:_**

1. Ho un device 'non Tuya' che riesco a controllare via REST (client): associando a questo device un _x-device_ 'alias', ed aggornandone i valori a specchio, ho il device visibile ed utilizzabile  in _IoTwebUI_ come un device Tuya nativo!
2. Varie device contribuiscono a formare dei 'sistemi', e.g. Riscaldamento, antifurto, consumi etc... Una _x-device_ 'di sistema' che presenta i dati elaborati consuntivi del sistema stesso, è utile e facilmente consultabile.
3. Pagine HTML possono fare da interfaccia: chiedono i dati aggiornati a varie device via REST-server. Usando un _x-device_, 'di sintesi' che riunisca tutti i dati necessari alla interfaccia HTML, si deve semplicemente consultare un'unico device. Inoltre si ha la possibilità di monitorare il sistema da _IoTwebUI_ e si separa l'elaborazione dati dalla interfaccia di visualizzazione,  semplificandone la realizzazione._
4. In sintesi gli _x-device_ costituiscono un strato di middleware OOP tra i device Tuya atomici e le applicazioni/UI.

**_Limiti per x-device_**

1. Attenzione all'uso di multiple istanze di un **x-device**. E' possibile solo se l'**x-device** è implementato come una funzione (MACRO). Se invece è implementato come REGOLA, occorre ripetere il codice per ogni istanza, ed allora é possibile cambiare i valori assegnati.  
2. Contrariamente ai _device Tuya_, identificati univocamente dall'ID, gli **x-device** devono essere identificati esclusivamente dal _nome_, perchè l'ID cambia ad ogni run.

#### MACRO - APP-Tuya
Per APP-Tuya intendiamo una applicazione dotata di propria interfaccia utente, che utilizza Tuya e IoTwebUI con REST, per realizzare gli obiettivi più svariati. Sono normalmente composte di almeno due file:

* una MACRO (x-device) che fa da middleware tra i singoli device e l'interfaccia utente, implementando anche la 'businnes logic'
* una semplice interfaccia utente specializzata (in genere in HTML)

Per dettagli sulle APP finora implementate vedi la [dir dedicata.](https://github.com/msillano/IoTwebUI/blob/main/APP/Overviews.md)

<hr>

#### ref. MACRO per risorse
<dl>

<dt>GET(device, property)</dt>
<dt>GET(device, property, strict)</dt>
<dd>Ritorna il valore di una 'property' (usare i nomi originali mostrati nei tooltip) presente nello 'status' del device (nome o ID)<br>
Se non trova 'device' o 'property' dà errore se <code>strict == true</code> (default), altrimenti torna "null". <br>
 <i>Esempio:</i> <code>var _tf = GET("TF_frigo","va_temperature");</code> </dd>

<dt>GETATTRIBUTE(device, attribute)</dt>
<dt>GETATTRIBUTE(device, attribute, strict)</dt>
<dd>Ritorna il valore di un 'attributo' del device (nome o ID). I più utili sono 'name', 'id', 'online', etc... <br>
Se non trova 'device' o 'property' dà errore se <code>strict == true</code> (default), altrimenti torna "null". <br>
 <i>Esempio:</i> <code>var _name = GETATTRIBUTE(_devid, 'name');</code> </dd>
 
<dt>ISCONNECTED(device)</dt>
<dd>Ritorna 'true' se il device (nome o ID) è connesso. Equivalente a <code>GETATTRIBUTE(device, 'onlime', false)</code> <br>
<i>nota: il dato proviene dal Cloud, può differire dal valore locale mostrato da SmartLife.</i><br>
<i>Esempio:</i> <code>if (! ISCONNECTED("Tuya bridge")) VOICE ("Attenzione! 'tuya bridge' attualmente disconnesso"); </code>  </dd>

<dt>GETHOMELIST()</dt>
<dd>Ritorna un array con i nomi di tutte le HOME.<br>
<i>Esempio:</i> <code></code> </dd>

<dt>GETIDLIST()</dt>
<dt>GETIDLIST(home)</dt>
<dt>GETIDLIST(home, room)</dt>
<dd>Ritorna un array di device ID.<br>
 <i>Esempio:</i> <code> GETIDLIST('ROMA').forEach((devid) => {...}); </code> </dd>

<dt>ADDXDEVICE(home, room|null, name)</dt>
<dt>ADDXDEVICE(home, room|null, name, init)</dt>
<dt>ADDXDEVICE(home, room|null, name, init, category)</dt>
 <dd> Aggiunge un nuovo <i>x-device</i> in <b>IotwebUI</b>, visualizzato nell'albero e con le stesse funzioni dei device Tuya: 'Allarmi', 'Esportazione', 'REST' etc.<br>
nota: init: (default = []) array di valori iniziali come oggetti. e.g.: <code>[{code: 'brightness_max_1', value: 891}, ...]</code>.
nota: la categoria di default è 'x-dev', con <code>is-a</code> => 'x-device custom'. Si può specificare una diversa categoria (tra le esistenti), per esempio per usare un'icona speciale, se così è previsto da customizzazioni basate su <code>category</code>.<br>
nota: <code>room == null</code> associa il device alla 'home' indicata.<br>
nota: se il x-device esiste, ADDXDEVICE() re-inizializza con la sostituzione dei dati in 'status' con 'init'.<br>
nota: ADDXDEVICE() inizia 'online' con false: solo dopo aver completato tutti i calcoli (possono richiedere tempo) può essere messo a 'true' con SETXDEVICEONLINE(), per avere un feedback visivo dello stato dell'x-device.<br>
 <i>Esempio:</i>
<pre>
     // singleton run: adds a x-device after the existence test
     if(!GETATTRIBUTE("Temperatura media","name",false)) ADDXDEVICE('ROMA', "Studio", "Temperatura media");
</pre>
</dd>
 
<dt>SETXDEVICESTATUS(device, code, value)</dt>
<dd> Permette l'aggiunta di nuovi valori od il loro aggiornamento nello 'status' di un _x-device_.<br>
<i>Esempio:</i> 
<pre>
    //updates the x-device doing a 2 devices average and then a mobile average over the last 10 results
    var _tm = ( GET("Temperatura studio","va_temperature") + ( GET("Termo studio","temp_current") / 10)) /2;
    SETDEVICESTATUS( "Temperatura media", "media", AVG(_tm, 10));
</pre>
</dd>

<dt>SETXDEVICEONLINE(device)</dt>
<dt>SETXDEVICEONLINE(device, online)</dt>
<dd> Permette il controllo dell'attributo 'online' (default 'true') per gli x-device<br>
</dd>



<dt>REST(url)</dt>
<dd> Client REST, per servizi web API REST (GET) o device che tornano come risposta un testo semplice.<br>
 <i>Esempio:</i>  <code>
  // see https://www.ipify.org/ <br>
 if(TRIGBYNAME("my IP"))  POP( "My IP", REST("https://api.ipify.org/?format=txt"));   </code>

 Note _**MacroDroid** è usato spesso per processare le `notifiche` provenienti da SmartLife ( vedi [post](https://www.facebook.com/groups/tuyaitalia/permalink/1613512135949800/)). Una caratteristica interessante è che `MacroDroid` può essere comandato via REST! Ovvero tramite REST **IoTwebUI** può esegure una qualunque MACRO  di MacroDroid, associandola a qualsiasi evento (non solo `notifiche`)_.
 </dd>
 
<dt>RESTJSON(url)</dt>
<dd> Client REST, per servizi web API REST (GET) o device che forniscono la risposta in formato JSON (la maggior parte). Questa funzione restituisce, per semplificare l'uso, direttamente un oggetto.<br>
 <i>Esempio:</i>  <code>
  // see https://open-meteo.com/<br>
 var _meteo, _urlm ="https://api.open-meteo.com/v1/forecast?latitude=41.9030&longitude=12.4663&amp;current=temperature_2m"; <br>
 if(TRIGBYNAME("meteo")) _meteo = RESTJSON(_urlm), POP("ROMA", "temperatura = " + _meteo.current.temperature_2m );  </code> <br>
<i> nota: questa è la struttura completa dell'oggetto-risposta (<code>_meteo</code>) REST, che si può vedere in console con <code>'console.log(_meteo)'</code>. Si è utilizzata in POP() solo la temperatura ( <code>_meteo.current.temperature_2m </code>): </i> <pre>
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
timezone_abbreviation: "GMT"
utc_offset_seconds: 0
</pre></dd>

<dt>DATALOG(name, value) (*)</dt>
<dd>Aggiunge un nuovo 'value' al file di log dati, con il 'name' indicato. Utile per salvare risultati di elaborazioni (e.g. medie). Questa MACRO 'prenota' il salvataggio di un valore, ma il salvataggio avviene con i tempi e i modi impostati in config per il file log dati.<br>
<i>nota: il salvataggio dati durante un test inizia subito, ma, nel formato CSV, la prima riga con i nomi è già stata creata e non è aggiornata. Eventualmente salvare il file di log per avere un nuovo file aggiornato. Questo solo in fase di test: con le REGOLE  in</i> uso <i>dall'avvio non c'è problema.</i><br> 
 <i>Esempio:</i> <code>DATALOG("Temperatura Frigo", GET("TF_frigo","va_temperature")/10);</code>
</dd>

<dt>SAVELOG() </dt>
<dd>Causa il salvataggio su file del log attuale, e l'inizion di un nuovo file di log.<br></dd>

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

<dt>XURL(url)<br>
 XURL(url, target)</dt>
<dd>Apre un URL nel browser.<br>
`target`: `_self`, `_blank` (default), `_parent`, `_top` (see `window:open` ) <br>
 nota: _self, _parent, _top possono terminare IoTwebUI.<br>
<i>Esempio:</i>  <code>if (TRIGBYNAME("client REST")) XURL("rest02.2/client.html")</code> <br>
Usando REST, questa MACRO può essere usata per attivare specifiche pagine WEB, come UI tematiche. <br>
<i>Esempio:</i>  <code>if (GET("ALLARME", 'status') == 'Allarme') XURL("mypages/alarmmap.html")</code>
</dd>

<dt>VOICE(message)</dt>
<dd>Segnale di avviso.<br>
<i>Esempio:</i> <code>if (! ISCONNECTED("Tuya bridge")) VOICE ("Attenzione! 'tuya bridge' attualmente disconnesso") </code>
</dd>

<dt>SOUND(url)</dt>
<dd>Riproduce un file di musica o con messaggio audio: formato MP3 o WAV.<br>
Locale o remoto.
 _Esempio:_  <code>SOUND("https://assets.mixkit.co/active_storage/sfx/918/918.wav"); </code>     
</dd>

<dt>SCENE(scenaNome) </dt>
<dd>Esegue un 'tap-to-Run', presente nell'elenco letto dal Cloud.<br>
 <i>Esempio:</i> <code> if(ISTRIGGERH(_alarm)) SCENE('sirena suona'); </code></dd>
 
<dt>TRIGBYNAME(name) </dt>
<dd> Associa un 'nome' (max 3 parole) ad un RULE, permettendo di attivarlo con un comando utente (bottone o comando vocale) o in caso di 'Alert', oppure con TRIGRULE(name) da un'altra RULE (analogo ai 'tap-to-run' Tuya).<br>
Torna true quando deve essere eseguita. <br>
nota: name deve essere unico (può essere usato una sola volta) ma l'azione può applicarsi su più REGOLE usando una var ausiliaria.
<i>Esempio:</i> <code>if (TRIGBYNAME('spegni la luce')) VOICE (" Hai attivato: 'spegni la luce'") </code> </dd>

<dt>TRIGRULE(name)</dt>
<dt>TRIGRULE(name, parameter)</dt>
<dd>Esegue un RULE individuato da un nome (vedi TRIGBYNAME()). <br>
<code>parameter</code> (opzionale) è reso disponibile nella var <code>_ruleParam`</code> (altrimenti `null`). Potendo essere 'parameter' un oggetto, non ci sono limiti ai dati passati con questo meccanismo.
 nota: TRIGRULE non è ricorsiva; max 1 'parameter' attivo per non sovrascrivere _ruleParam (statico). <br>
 nota: Se la definizione TRIGBYNAME(name) precede l'uso di TRIGRULE(name), l'esecuzione non è immediata, ma avviene subito dopo il termine del run attuale delle RULE, in un run EXTRA. <br>                                             
 <i>Esempio:</i> <code>  if (TRIGBYNAME("pippo")) VOICE (" Trovato pippo"); <br>  // RULE 'pippo'
     if (TRIGBYNAME("chiama pippo")) TRIGRULE("pippo"), VOICE("chiamo pippo")    // RULE 'chiama pippo' 
</code> </dd>

<dt>REFRESH(deviceName) </dt>
<dt>REFRESH() </dt>
<dt>REFRESH('cloud'|deviceName) </dt>
<dd>Molte operazioni sono sincronizzate sul loop di polling: questo può rallentare troppo la risposta alle azioni utente.<br>
 * REFRESH(deviceName) solo per _x-device_, causa un immediato rinfresco dell'interfaccia del device (immediato aggiornamento di online, tooltip).
 * REFRESH() causa un extra ciclo di analisi di tutte le REGOLE (fa avanzare eventuali automi a stati)
 * REFRESH('cloud') causa un extra polling dei dati e rinfresco globale della UI.

 N.B. NON usare in REGOLE processate ad ogni loop: si potrebbe creare una 'race condition' bloccante! Usare solo in REGOLE processate una tantum, in risposta ad azioni utente, e solo se veramente necessario!
</dd>
</dl>
<hr>

#### ref. MACRO funzionali
<dl>

![TRIGGERS](https://github.com/msillano/IoTwebUI/blob/main/pics/MACRO_01.png?raw=true)<br>
<i> input ed output di: <code>ISTRIGGERH(evento), ISTRIGGERL(evento), CONFIRMH(evento, T), CONFIRML(evento, T)</code></i>

<dt>ISTRIGGERH(condition) (*) </dt>
<dd> Ritorna 'true' solo al passaggio della "condizione" da 'false a true', evita che la "condizione" 'true' agisca ad ogni run. Ovvero trasforma un livello true in TRIGGER (vedi figura). <br>
<i>Esempio:</i> <code>if(ISTRIGGERH(GET("TF_frigo","va_temperature") > 100)) POP("Frigo", "TEMPERATURA oltre 10°C" );</code> <br>
nota: A differenza di Tuya, all'avvio, se `condition` è true ritorna true (anche se manca un 'false' precedente).
nota: l'implementazione Tuya di più <i>condizioni (livelli) in AND (tutte)</i> in una automazione è come se fosse scritta così:<br> <code>if( ISTRIGGERH(condiz1 && condiz2 && ...) ... </code> <br> cioè un'automazione Tuya scatta nel momento in cui TUTTE le condizioni diventano true. Con più condizioni in OR, basta UN solo trigger:<br> <code>if( ISTRIGGERH(condiz1) || ISTRIGGERH(condiz2) || ...) ... </code>.<BR> 
Nota: più <i>condizioni (livelli) + ambito (livello) + abilitazione </i> delle automazioni Tuya, può essere implementato nelle RULE così:<br> <code>if( (ISTRIGGERH(condiz1...) ...) && (ambito...) && abilitata)...</code>. <br> Si vede come <i>Ambito</i> NON intervenga nel TRIGGER ma che comunque DEVE essere vero!
</dd>
 
<dt>ISTRIGGERL(condition) (*)</dt>
<dd> Ritorna 'true' solo al passaggio della "condizione" da 'true a false'  (inverso  di ISTRIGGERH):  trasforma un livello false in TRIGGER. <br>Nota: l'uscita è invertita rispetto a 'condizione'  (vedi figura).<br>
<i>Esempio:</i> <code>if(ISTRIGGERL(GET("tuya_bridge", "switch_1"))) ALERTLOG("tuya_bridge", "Aperto adesso"); </code>  </dd>

<dt>CONFIRMH(condition, time) (*) </dt>
<dd> Ritorna 'true' solo se la "condizione" rimane 'true' per almeno il tempo 'time'. Poi resta 'true' fino a quando la 'condizione' è 'true'. Caso tipico una porta aperta. Serve a filtrare 'livelli' true di breve durata che non interessano  (vedi figura).<BR>
time = costante nei formati "hh:mm:ss" oppure "mm:ss" oppure "ss". Limite inferiore: TuyaInterval.<br>
<i>Esempio:</i> <br>
   <code>var _doorev = GET("Sensore porta", "doorcontact_state") ; </code>   // true a porta aperta
   <code>if(ISTRIGGERH( CONFIRMH(_doorev, "01:20"))) VOICE("chiudere la porta, grazie"); </code> </dd>
 
<dt>CONFIRML(condition, time) (*) </dt>
<dd> Ritorna 'true' solo se la "condizione" rimane 'false' per almeno il tempo 'time'  (inverso  di CONFIRMH): Serve a filtrare 'livelli' false di breve durata che non interessano.<br>Nota: l'uscita è invertita rispetto a 'condizione'  (vedi figura).<br>
<i>Esempio:</i> <code>if(ISTRIGGERH(CONFIRML(ISCONNECTED("relay"), "02:30"))) VOICE("Allarme disconnessione");</code> </dd>

<dt>TRIGCHANGED(value) (*) </dt>
<dd> ritorna 'true' ogni volta che 'value' cambia rispetto al valore immediatamente precedente.<br>
nota: il primo valore NON genera trigger.
<i>Esempio:</i> <pre> 
      var _tf = GET("TF_frigo","va_temperature"); 
      var _annonce = "Alle ore " + TIME(hrs)+" la temperatura è cambiata. Il frigo è a " + ROUND(_tf/10, 1) + " gradi";
      if(TRIGCHANGED(_tf)) VOICE(_annonce); 
</pre></dd>

<dt>TRIGEVERY(n) (*)</dt>
<dd>  Semplice timer: ritorna 'true' solo dopo "n" esecuzioni, ciclico. <br>
  E' garantito un singolo valore 'true' per ogni n-simo loop, 'n' è in numero di loop, in tempo: t <= n x tuyaInterval (definito in 'config.js' file).<br>
<i>Esempio:</i> <code>if(TRIGEVERY(8)) POP( "FRIGO", "Temperatura interna: "+ ROUND(_tf/10, 1) + "°C");</code> </dd>
   
<dt>VSET(name, value)</dt>
<dd>SET di una variabile permanente - conservata per tutti i run delle RULE.<br>
<i>Esempio:</i> <code>if( TRIGEVERY(10) ) VSET('prova', VGET('prova') + 2);</code>  </dd>

<dt>VGET(name) </dt>
<dd>GET di una variabile permanente - conservata per tutti i run delle RULE.<br> 
 Se la variabile <code>name</code> NON è stata inizializzata con un VSET, ritorna <code>null</code>. <br>
<i>Esempio:</i> <code>if( VGET('inizio') == null ) VSET('inizio', TIME(hrs)); </code>  </dd>

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
Restart: n = 0 provoca la cancellazione della cache interna.<br>
 <i>Esempio:</i> <code>DATALOG("Temperatura media Frigo", AVG(GET("TF_frigo","va_temperature")/10, 20)); </code> </dd>

<dt>MAX(value, n) (*) </dt>
<dd>Ritorna il più grande  degli ultimi 'n' valori.<br>
'n' è in numero di loop, in tempo: t = n x tuyaInterval (definito in config.js file).<br>
Restart: n = 0 provoca la pulizia della cache.<br>
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
restart: Se limite < di ogni possibile valore (anche negativo).<br>
<i>nota: E' possibile usare <code>INTEGRAL</code> per creare timer più precisi di <code>TRIGEVERY()</code> che si basa sul conteggio dei cicli. <br> L'integrale di una costante è una retta crescente: usando 1 come costante, e un <code>limite</code> in secondi, si ha un'andamento a denti di sega. L'integrale vale 0 all'avvio e poi ogni <code>limite</code> secondi (errore: 0..+TuyaInterval) con ottima precisione. Questo esempio è un timer periodico di durata 1h:</i> <pre>
           var _integ = INTEGRAL(1, 3600); 
           if (_integ == 0) ...more...</pre>
</dd>

<dt>TIME(wath) </dt>
<dd>  ritorna una stringa, "hh:mm:ss" oppure "mm:ss" oppure "ss" calcolata dall'ora attuale, a seconda di 'wath'.
  'wath': una delle costanti così definite: <i>hrs</i> = 11, <i>min</i> = 14, <i>sec</i> = 17 (senza apici, non sono stringhe, ma costanti numeriche).<br>
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

#### (\*) - IMPORTANTE
Il simbolo (\*) identifica le MACRO che fanno uso di memoria per salvare lo stato: per come sono implementate, **DEVONO essere eseguite ad ogni RUN** delle regole!<br>
  1. _NON usarle quindi nella parte _azione_ di un IF_: <code> if(condizione){ qui_NO }  </code><br>
  2. _NON usarle nemmeno come seconda condizione di un IF, dopo || o &&_: <code>if(cond1 &&  qui_NO){azione}</code><br>
  3. _NON usarle in sezioni di codice che in alcuni casi NON vengono eseguite (vedi esempio in `battery01.2.js`)_

 Workaround: se possibile, usate una var di appoggio prima dell'IF:  <code> var _test2 = MACRO(*); if(cond1 && _test2){azione}</code>
 
IMPORTANTE: _non osservare questa regola porta a bug di non facile interpretazione_! Per un verifica, ponete come ultima riga delle regole;

         console.log("## Check RULEs idxMax:"+useStore.idx);
Questo riga stampa in console un numero ogni loop, che corrisponde al numero di MACRO(\*) eseguite in TUTTE le regole precedenti. Il numero deve essere costante **dal primo loop e per tutti i loop successivi**; se varia c'è un errore nel codice delle regole o degli addon riguardo l'uso delle MACRO(*).

## Riconoscimenti
      
Progetto OpenSource, Licenza MIT, (c)2024 marco sillano

_Questo progetto è un work-in-progress: viene fornito "così com'è", senza garanzie di alcun tipo, implicite o esplicite._

- _Se sviluppate qualche estensione o applicazione interessante con IoTwebUI o IoTrest fatemelo sapere: possiamo inserirla qui, o nella prossima release._
- _Per problemi riguardanti il codice ed il funzionamento di IoTwebUI, aprite un 'issue' qui ([github](https://github.com/msillano/IoTwebUI/issues))._
- _Per problemi più generali riguardanti  Tuya, SmartLife (Tuya smart) e IoTwebUI, che possono interessare anche altri utenti, postate pure nel gruppo [Tuya e Smart Life Italia](https://www.facebook.com/groups/tuyaitalia)_

Grazie per l'interesse <br>
m.s.

<hr>
Tutti i marchi riportati appartengono ai legittimi proprietari.<br>
- https://www.tuya.com/ <br>
- https://getbootstrap.com/docs/5.3/getting-started/introduction/ <br>
- https://visjs.github.io/vis-network/docs/network <br>
- https://fontawesome.com/v4/icons/ <br>
- https://code.google.com/archive/p/crypto-js/ <br>
- https://github.com/inorganik/debugout.js <br>
- https://nodejs.org/en <br>
- https://hapi.dev/ <br>
- https://github.com/rigon/hapi-url <br>
- https://github.com/websockets/ws/blob/master/doc/ws.md <br>
- https://api.open-meteo.com <br>
- https://www.drogbaster.it <br>
- https://sharpweather.com <br>
- http://www.hexagora.com <br>
- https://www.kristanixsoftware.com/ <br>

