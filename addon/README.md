## IoTwebUI addon

Gli ADDON altro non sono che grandi MACRO (cioè funzioni js) con precisi obiettivi: in genere creano e gesticono x-dervice.
Il vantaggio è che sono contenuti in un singolo file, facilmente aggiornabile ed anche scambiabile tra utenti, contenente tutte le istruzioni per l'uso. <br>
Ogni utente può sceglie gli ADDON che ritiene più utili, o può creare i propri, magari modificando un addon pubblicato.
Un utente può sempre aggiungere un ADDON alla propria istanza di IoTwebUI (istruzioni dettagliate in ogni Addon):<br> 
- Il file deve essere nella dir addon/
- L'utente deve inserire una nuova riga nel file principale (IoTwebUI.html) 
- L'utente deve aggiungere la o le REGOLE  necessarie come indicato nella documentazione.

<hr>

Lista di ADDON da usare come sono o utilizzare come modelli per i propri addon: 
* **battery01.js** x-device: Presenta un elenco delle device con batterie scariche. Senza dipendenze e 
con poca customizzazione, usa auto-discovery per individuare i device.
* **battery02.js** x-device: Analoga alla precedente, ma con algoritmo più performante (e maggiore customizzazione: l'utente deve inserire la lista di device). Senza dipendenze.
* **classify02.js**  x-device:  Fornisce un elenco di tutti device presenti in un HOME (o in tutte), suddivisi per categoria (is-a). Senza dipendenze.
* **clone01.js**  x-device: crea e mantiene aggiornata una copia di un device reale tuya, più dettagliato di quello standard. Senza dipendenze.
* **testerbattery01.js** x-device: Applicazione completa comprensiva di interfaccia utente HTML. Richiede scheda HW TY-08Z, clone01, tester01.html. (vedi [TestBattery01_leggimi](https://github.com/msillano/IoTwebUI/blob/main/addon/TestBattery01_leggimi.pdf) )
             
