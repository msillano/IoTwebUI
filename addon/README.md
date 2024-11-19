## IoTwebUI addon IT [EN]()

Gli ADDON altro non sono che grandi MACRO (cioè funzioni js): in genere creano e gesticono **x-dervice**, ma poswsono essere usate per librerie custom di MACRO specializzate etc. <br>
Il vantaggio è che sono contenuti in un singolo file, facilmente aggiornabile ed anche scambiabile tra utenti, contenente tutte le istruzioni per l'uso, permettondo l'estensione 'su misura' delle funzionalità di IoTwebUI. <br>
Ogni utente può sceglie gli ADDON che ritiene più utili, o può creare i propri, magari modificando un addon pubblicato.
Un utente può sempre aggiungere un ADDON alla propria istanza di IoTwebUI (istruzioni dettagliate in ogni Addon):<br> 
- Il file deve essere nella dir addon/
- L'utente deve inserire una nuova riga nel file principale (IoTwebUI.html) 
- L'utente deve aggiungere la o le REGOLE  necessarie eseguire o interagire con l'ADDON.

<hr>

Lista di ADDON da usare come sono o utilizzare come modelli per i propri addon: 
* **battery01.js** _x-device_: Presenta un elenco dei device con batterie scariche. Senza dipendenze e 
con poca customizzazione, usa auto-discovery per individuare i device.
* **battery02.js** _x-device_: Analoga alla precedente, ma con algoritmo più performante (e maggiore customizzazione: l'utente deve inserire la lista di device). Senza dipendenze.
* **classify02.js**  _x-device_:  Fornisce un elenco di tutti i device presenti in un HOME (o in tutte), suddivisi per categoria (is-a). Senza dipendenze.
* **clone01.js**  _x-device_: crea e mantiene aggiornata una copia di un device reale Tuya, più dettagliata della versione standard usata da IoTwebUI. Senza dipendenze.
* **testerbattery01.js** _x-device_: Applicazione completa comprensiva di interfaccia utente HTML. Richiede scheda HW TY-08Z, clone01, tester01.html. (vedi [TestBattery01_leggimi](https://github.com/msillano/IoTwebUI/blob/main/addon/TestBattery01_leggimi.pdf) )
             

## IoTwebUI addon

ADDONs are nothing more than large MACROs (i.e. js functions): they generally create and manage **x-dervice**, but they can be used for custom libraries of specialized MACROs, etc. <br>
The advantage is that they are contained in a single file, easily updatable and also exchangeable between users, containing all the instructions for use, allowing the 'tailor-made' extension of IoTwebUI functionality. <br>
Each user can choose the ADDONs that he/she considers most useful, or can create his/her own, perhaps by modifying a published addon.
A user can always add an ADDON to his/her IoTwebUI instance (detailed instructions in each Addon):<br>
- The file must be in the `addon/` dir
- The user must insert a new line in the main file (IoTwebUI.html)
- The user must add the RULE or RULES needed to execute or interact with the ADDON.

<hr>

List of ADDONs to use as they are or use as models for your own addons:
* **battery01.js** _x-device_: Shows a list of devices with low batteries. No dependencies and
with little customization, uses auto-discovery to identify devices.
* **battery02.js** _x-device_: Similar to the previous one, but with a more performing algorithm (and more customization: the user must enter the list of devices). No dependencies.
* **classify02.js** _x-device_: Shows a list of all devices present in a HOME (or in all), divided by category (is-a). No dependencies.
* **clone01.js** _x-device_: creates and keeps updated a copy of a real Tuya device, more detailed than the standard version used by IoTwebUI. No dependencies.
* **testerbattery01.js** _x-device_: Full application including HTML UI. Requires TY-08Z HW board, clone01, tester01.html. (see [TestBattery01_readme](https://github.com/msillano/IoTwebUI/blob/main/addon/TestBattery01_readme.pdf) )


