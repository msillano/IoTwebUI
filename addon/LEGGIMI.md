## IoTwebUI addon 

Gli ADDON altro non sono che nuove user MACRO (cioè funzioni js): in genere creano e gesticono **x-dervice**, ma possono essere usate per librerie custom di MACRO specializzate etc. <br>
Il vantaggio è che sono contenuti in un singolo file, facilmente aggiornabile ed anche scambiabile tra utenti, file che contiene anche tutte le istruzioni per l'uso, permettondo l'estensione 'su misura' delle funzionalità di IoTwebUI. <br>
Ogni utente può sceglie gli ADDON che ritiene più utili, o può creare i propri, magari modificando un addon pubblicato.
Un utente può sempre aggiungere un ADDON alla propria istanza di IoTwebUI (istruzioni dettagliate in ogni Addon):<br> 
- Il file deve essere nella dir addon/
- L'opzione di installazione più semplice è inserire una nuova riga nel file principale (IoTwebUI.html) 
- L'utente deve aggiungere la/le REGOLE  necessarie per eseguire o interagire con l'ADDON.

<hr>

Lista di ADDON da usare come sono o utilizzare come modelli per i propri addon: 
* **battery01.js** _x-device_: Presenta un elenco dei device con batterie scariche. Senza dipendenze e 
con poca customizzazione, usa auto-discovery per individuare i device.
* **battery02.js** _x-device_: Analogo al precedente, ma con algoritmo più performante (e maggiore customizzazione: l'utente deve inserire la lista di device). Senza dipendenze.
* **classify02.js**  _x-device_:  Fornisce un elenco di tutti i device presenti in un HOME (o in tutte), suddivisi per categoria (is-a). Senza dipendenze.
* **clone01.js**  _x-device_: crea e mantiene aggiornata una copia di un device reale Tuya, più dettagliata della versione standard usata da IoTwebUI. Senza dipendenze.
* **testerbattery01.js** _x-device_: Applicazione completa comprensiva di interfaccia utente HTML. Richiede scheda HW TY-08Z, clone01, tester01.html. (vedi [TestBattery01_leggimi](https://github.com/msillano/IoTwebUI/blob/main/addon/TestBattery01_leggimi.pdf) )
             
