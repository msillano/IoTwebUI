# Menu and Panels
La versione IoTebUI 3.0 si caratterizza per una IFRAME dedicata ad un menu personalizzato.
Le pagine HTML usate possono essere di tre tipi:
* panel: pagine menu più curate graficamente, anche con extra widgets.
* IoTmenu: più semplici, senza widget, per UI di APP, pagine menu di servizio, etc..
* IoTpage: Alcune APP utilizzano front-end in un popup, soprattutto perchè richiedono dimensini più grandi di quelle disponibili nella IFRAME menu. (e.g. NiMH Battery tester)

### Panels
I panel sono altamente customizzabili, per rispecchiare gli obiettivi dell'utente.
Un panel può contenere:
* Bottoni per il lancio di Tap-o-Run Tuya e RULE IoYwebUI (e.g. rule 'Pippo')
* Bottoni per l'apertura di Interfacce per APP (e.g. THERMOSTAT02)
* Informazioni dinamiche ottenute dai device (IoTwidget01: e.g. temperatura)
* Interruttori, spie ed altri controlli dinamici (IoTwidget02: e.g. interruttore caldaia)
* Widget di terze parti con informazioni utili (e.g meteo)
* Link per la navigazione in altre pagine del menu custom

**ESEMPI**

`index.html`: il Panel di default di IoTwebUI 3.0, senza dipendenze<br>
`panel_empty_template.html`: per creare nuovi Panel custom.<br>
`panel_for_addon.html`: un Panel che contiene i controlli per TUTTi gli ADDON e APP. Quando un utente aggiunge un'addon o una APP alla sua istanza di IoTwebUI, può copiare da qui i contreolli per il suo menu personalizzato.

### IoTmenu
Questi menu HTML sono più sobri dei Panel. Sono nati come semplici Interfacce Utente testuali per le APP, configurazioni, menu interni etc... e presentano il vantaggio della rapidità di implementazione.

**ESEMPI**
Le seguenti APP hanno IoTpage (attualmente, se una APP ha una IoTpage NON ha un Panel) 
