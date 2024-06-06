# TuyaUIweb: Tuya WEBAPP User Interface #
[english version](https://github.com/msillano/TuyaUIweb/blob/main/README.md)

**TuyaUIweb, la mia nuova interfaccia web per Tuya, eleva il monitoraggio dei dispositivi Tuya a un livello superiore.** 
Questa soluzione completa e dinamica organizza tutti i tuoi dispositivi, stanze e case in una struttura ad albero intuitiva all'interno di un browser web. Ogni nodo dell'albero presenta un tooltip informativo con i valori aggiornati in tempo reale delle proprietà del dispositivo, offrendoti una panoramica completa e immediata del tuo ecosistema Tuya. 

**_Per garantire la massima sicurezza, **TuyaUIweb** opera esclusivamente in modalità di sola lettura, senza apportare alcuna modifica ai tuoi dati su Tuya Cloud._** <br>
Sviluppata utilizzando `vis-network` e l'API `TuyaCloud v2`, **TuyaUIweb** rappresenta un passo avanti significativo nel monitoraggio e nella gestione dei tuoi dispositivi Tuya.


### Prestazioni:

_In un solo colpo d'occhio si ha la situazione completa sotto controllo._

In fase iniziale tutti i dati necessari sono letti da Tuya Cloud e viene costruita una struttura locale contenente TUTTE le informazioni. Il grafo ad albero di visualizzazione è costruito in base a queste informazioni. 

Tutti i nodi (root, case, stanze e  device) sono rappresentati da icone (customizzabili), grigie quando il device è disconnesso, Il colore del link indica il tipo di device: se blu è WiFi, se rosso usa un HUB (subdevice). Ogni device ha un tooltip che visualizza lo 'status' attuale del device.

L'aggiornamento dei dati  avviene in polling: sono letti dal Cloud con frequenza regolabile dall'utente, da 30s a alcuni minuti, e i popup (customizzabili) sono aggiornati subito.<BR>
Se necessario è possibile ricaricare ed aggiornare tutta la struttura, e.g. in caso di aggiunte di nuovi device.

In **'expert mode'** (da VER 1.2) nel tooltip di ogni device è presente anche la categoria del device (in chiaro), il `device_id` (device.id) e `secret_key` (device.local_key).  Per gli utenti di TuyaDEAMON o di HUB similari come HA queste informazioni sono molto utili.


![](https://github.com/msillano/TuyaUIweb/blob/main/pics/UIlook01.png?raw=true)

### Logging ed esportazione dati
E' possibile esportare su un file alcuni dati: l'utente deve specificare `home`, `device` e `status` (proprietà) per identificare i dati che interessano e questi sono salvati ad intervalli regolari (minimo 1 minuto) in un buffer interno (max 5000 records - 80h@1 rec/min), esportato poi su file automaticamente o su comando utente.<br>
L'utente può scegliere tra due formati: `CVS` (indicato, per esempio, per DB e spreadsheet tipo Excel) oppure `JSON` (per elaborazioni più complesse con programmi ad hoc) con pochissimi interventi di editing sui file (vedi oltre i formati).

In modalità 'expert' è disponibile un comando per avere nella console l'intera struttura dati ottenuta da Tuya Cloud: può essere esplorata a ogni livello nel pad della console oppure può essere copiata con copy&paste in formato JSON.


### Note di implementazione

- TuyaUIweb deriva da un'interfaccia analoga progettata per [TuyaDAEMON](https://github.com/msillano/tuyaDEAMON-applications/tree/main/daemon.visUI.widget).
- La scelta della libreria di visualizzazione è caduta su [Vis-Network](https://visjs.github.io/vis-network/docs/network/) per la buona flessibilità unita a semplicità di uso.
- Nei tooltip, per default, sono presentate tutte le proprietà incluse nello 'status' del device, con i nomi e i valori usati da Tuya Cloud. Alcuni valori possono essere codificati.
- Un primo problema è il protocollo di sicurezza CORS, implementato sui moderni browser. Una applicazione (anche in js, node-red, etc)  non ha questo problema, ma una APP che gira in un browser sì. E' necessario disabilitare CORS al memento del lancio del browser - testato Chrome (Versione 125.0.6422.61  - 64 bit):<br>
   `chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security`<br>
  (vedi file `goTuyaUI.bat`). Vale solo per questa istanza, le altre resteranno protette.<br>
  Come alternativa al file 'bat', con alcuni browser si può usare l'estensione 'Cross Domains - CORS', vedi [ISSUE4](https://github.com/msillano/TuyaUIweb/issues/4).

- Tuya pone dei limiti alla frequenza degli accessi al cloud. _TuyaUIweb_ ne tiene conto, e la fase iniziale (quando legge tutti i dati dal Cloud) è bloccante e non brevissima. Come anche in SmartLife.
- Per ovviare all'impossibilità di creare file direttamente da una pagina HTML, sempre per motivi di sicurezza, per l'export dei dati sono ricorso ad una libreria di logging su file [debugout.js](https://github.com/inorganik/debugout.js). Per questo motivo il controllo sui file generati non è completo e sono necessari piccoli  interventi manuali sui file esportati.
- I file sono salvati nella dir `download`, con il nome  `tuyalog-hh-mm-ss.cvs|json`.
- Il funzionamento continua regolarmente anche con la finestra del browser iconizzata.

**NOTA sulla sicurezza**

_**Questa APP è totalmente aperta, priva di ogni protezione, e contiene nei file le vostre credenziali in chiaro!**_ <br>
_NON rendetela accessibile dall'esterno o da terzi, altrimenti tutti i vostri dati, credenziali Tuya incluse, sono esposti!_
<hr>

### Versioni
- 1.2  Aggiornamento funzionale.
  - Aggiunta in 'config' la possibilità di escludere alcune 'home'
  - Introdotti due modi: normale | expert
    1. Il DUMP dei dati Tuya in console è possibile solo in modo expert
    2. In modo 'expert' sono aggiunti al tooltip 3 nuovi dati (se disponibili):
       - `isa`:  nome del 'tipo' Tuya del device ( in codice è `device.category`). In totale circa 600 tipi.
       - `id`:  `device.id`, richiesto da alcuni HUB
       - `key`: `device.local_key`, richiesto da alcuni HUB 
        
- 1.1  Correzione bugs
- 1.0  Versione iniziale

### Installazione
1) Scaricare e dezippare il file `TuyaUIweb.x.x.zip`  in una dir (con le autorizzazioni richieste dal S.O.).
2) Eseguire le operazioni di configurazione
3) Il file principale è `tuyaui.html`.  NON è necessario un server WEB, in quanto il codice è tutto in javaScript, eseguito dal browser. Per lanciarlo vedi file `goTuyaUI.bat` (per Windows - Chrome). Per altri S.O. creare uno script analogo. (Ignorare il messaggio Chrome: "stai utilizzando una segnalazione della riga di comando non supportata: - disable-web-security...": non supportata ma funzionante). 
4) In fase di installazione e setup è utile la console (nel browser - strumenti per programmatori -, o menu contestuale 'ispeziona') perchè lì vanno i messaggi di informazione e di errore di TuyaUIweb.<BR>
Nelle immagini: a sinistra avvio OK (Chrome, CORS disattivato) a destra caso di errore CORS (Opera):

<div><img src="https://github.com/msillano/TuyaUIweb/blob/main/pics/console_use01.png?raw=true" alt="normal start" width="300" />
   <img src="https://github.com/msillano/TuyaUIweb/blob/main/pics/CORS_err01.png?raw=true" alt="CORS error" width="300" align="right" /></div>

### Configurazione
L'app **TuyaUIweb** è per utenti non alle prime armi, pertanto è accettabile che la configurazione avvenga direttamente editando un file (`config`.js). _Le solite avvertenze: fare una copia del file prima di ogni modifica, usare un editor UTF8 (io uso Notepad-plusplus), e attenzione a NON ALTERARE niente altro (soprattutto virgole  ','  ed  apici '"')._

 - I dati INDISPENSABILI da inserire sono le proprie `credenziali Tuya` per 'platform.tuya'. <BR> Gli utenti di HA ed altri hub simili dovrrebbero già averle, ma i nuovi utenti si devono iscrivere, ci sono molte guide nel web. [Questa](https://github.com/iRayanKhan/homebridge-tuya/wiki/Get-Local-Keys-for-your-devices) è una delle più chiare, altre sono [elencate qui](https://github.com/msillano/tuyaDAEMON/wiki/50.-Howto:-add-a-new-device-to-tuyaDAEMON#1-preconditions). Un vantaggio è che si ha accesso alla piattaforma Tuya, con molti dati sui propri device, ed alla documentazione tecnica.
 - Altre opzioni riguardano: timing (Cloud e log) e configurazione del log: il formato, l'autosave, i valori richiesti, oppure il look&feel, come la presenza dei bottoni di pan/zoom. <BR>Dalla versione 1.2 la possibilità di escludere alcune home.

- Aggiornare con i path del sistema ospite il file di lancio `goTuyaUI.bat`.

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

- https://visjs.github.io/vis-network/docs/network
- https://fontawesome.com/v4/icons/
- https://code.google.com/archive/p/crypto-js/
- https://github.com/inorganik/debugout.js 



