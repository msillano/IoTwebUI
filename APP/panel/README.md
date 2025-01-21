# Menu and Panels
La versione IoTebUI 3.0 si caratterizza per una IFRAME dedicata ad un menu personalizzato.
Le pagine HTML usate possono essere di tre tipi:
* panel: pagine menu più curate graficamente, anche con extra widgets.
* IoTmenu: più semplici, senza widget, per UI di APP, pagine menu di servizio, etc..
* IoTpage: Alcune APP utilizzano front-end in un popup, soprattutto perchè richiedono dimensini più grandi di quelle disponibili nella IFRAME menu. (e.g. NiMH Battery tester)

### Panels
<table><tr><td>
  I panel sono altamente customizzabili, per rispecchiare gli obiettivi dell'utente. <br>
Un panel può contenere:
  
* Bottoni per il lancio di Tap-o-Run Tuya e RULE IoYwebUI (e.g. rule 'Pippo')
* Bottoni per l'apertura di Interfacce per APP (e.g. THERMOSTAT02)
* Informazioni dinamiche ottenute dai device (IoTwidget01: e.g. temperatura)
* Interruttori, spie ed altri controlli dinamici (IoTwidget02: e.g. interruttore caldaia)
* Widget di terze parti con informazioni utili (e.g meteo)
* Link interni (per la navigazione del menu custom) o esterni
* etc...
</td><td>
  <img width="400"  src="https://github.com/user-attachments/assets/e0df29eb-f45f-46b0-9bbb-f5c97a49c54d"/>
</td></tr></table>


**ESEMPI**

`index.html`: il Panel di default di IoTwebUI 3.0, senza dipendenze<br>
`panel_empty_template.html`: per creare nuovi Panel custom.<br>
`panel_for_addon.html`: un Panel che contiene i controlli per TUTTi gli ADDON e APP. Quando un utente aggiunge un'addon o una APP alla sua istanza di IoTwebUI, può copiare da qui i contreolli per il suo menu personalizzato.

### IoTmenu
<table><tr><td>
Questi menu HTML sono più sobri dei Panel. Sono nati come semplici Interfacce Utente testuali per le APP, configurazioni, menu interni etc... e presentano il vantaggio della rapidità di implementazione.<br>
Un IoTmenu può contenere:
  
* Campi 'input' per l'ingresso di dati utente, o select
* Bottoni per il lancio di Tap-o-Run Tuya e RULE IoYwebUI
* Bottoni per SET di valori per x-device
* Link interni (per la navigazione del menu custom) o esterni
* etc..
  
</td><td>
<img width="600" src="https://github.com/user-attachments/assets/97b622af-95ae-4e32-9a7c-fc90960883d7" />
</td></tr></table>

**ESEMPI**
Le seguenti APP hanno IoTpage usabili nel menu (attualmente, se una APP ha una IoTpage NON ha un Panel) 
