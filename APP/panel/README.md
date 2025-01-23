# Menu and Panels
La versione **IoTebUI 3.0** si caratterizza per un IFRAME dedicato ad un menu personalizzato.
Le pagine HTML usate con IoTwebUI possono essere di tre tipi:
* **panel**: pagine menu più curate graficamente, anche con extra widgets.
* **IoTmenu**: nenu più semplici, senza widget, per UI di APP, pagine menu di servizio, etc..
* **IoTpage**: alcune APP utilizzano front-end in un popup, soprattutto se richiedono dimensini più grandi di quelle disponibili nella IFRAME menu. 

### Panel
<table><tr><td>
  I _panel_ sono altamente customizzabili, per rispecchiare gli obiettivi dell'utente. <br>
Un _panel_ può contenere:
  
* Bottoni per il lancio di _Tap-o-Run_ Tuya e _REGOLE_ IoTwebUI (e.g. rule 'Pippo')
* Informazioni dinamiche ottenute dai device (`IoTwidget01`: e.g. temperatura)
* Interruttori, spie ed altri controlli dinamici (`IoTwidget02`: e.g. interruttore caldaia)
* Widget di terze parti con informazioni utili (e.g meteo)
* Link interni (per la navigazione nell'albero menu custom) o esterni
* Bottoni per l'apertura di Interfacce per APP (_IoTpage_, e.g. THERMOSTAT02)
* etc...
</td><td width="330" style="white-space:nowrap; vertical-align:top;">
  <img width="138"  src="https://github.com/user-attachments/assets/c8186b88-2cb0-47b1-acda-95e654b01ef3"/> <img width="150"  src="https://github.com/user-attachments/assets/e0df29eb-f45f-46b0-9bbb-f5c97a49c54d"/>  
</td></tr></table>


**ESEMPI**

`index.html`: il _panel di default di IoTwebUI 3.0_, senza dipendenze<br>
`panel_empty_template.html`: per creare nuovi _panel_ custom.<br>
`panel_for_addon.html`: un panel che contiene i controlli per TUTTi gli ADDON e APP. Quando un utente aggiunge un'addon o una APP alla sua istanza di IoTwebUI, può copiare da qui i controlli per il suo menu personalizzato.

### IoTmenu
<table><tr><td>
Questi menu HTML sono più sobri dei <i>panel</i>. Sono nati come semplici <i>Interfacce Utente</i> testuali per le APP, configurazioni, menu interni etc... e presentano il vantaggio della rapidità di implementazione.<br>
Un _IoTmenu_ può contenere:
  
* Campi 'input' per l'ingresso di dati utente, oppure select
* Bottoni per il lancio di _Tap-o-Run_ Tuya e _RULE_ IoYwebUI
* Bottoni per SET di valori per **x-device** (NON per i device Tuya: per sicurezza si deve usare un _tap-to-run_).
* Link interni (per la navigazione del menu custom) o esterni
* etc..
  
</td><td width="330" style="white-space:nowrap; vertical-align:top;">
  <img  width="140" src="https://github.com/user-attachments/assets/037dc0c9-23ab-4404-8528-60e7e305bd49"/> <img width="140" src="https://github.com/user-attachments/assets/97b622af-95ae-4e32-9a7c-fc90960883d7" />
</td></tr></table>

**ESEMPI**

Le seguenti APP hanno **IoTpage** usabili in IFRAME come menu (attualmente, se una APP ha una IoTpage NON ha un Panel): <br>
Scene: (`APP/Scene/html/scene01.html`) User interface. Vedi [APP/Scene](https://github.com/msillano/IoTwebUI/blob/main/APP/Scene/LEGGIMI.md) <br>
Explore devices: (`APP/Explore/html/explore01.htm`) User interface. Vedi [APP/Explore](https://github.com/msillano/IoTwebUI/tree/main/APP/Explore) <br>
Inoltre: <br>
`menu_apps.html`: Un menu interno per lanciare tutte le APP<br>

### IoTpage

Quando le dimensioni dell'IFRAME menu non possono contenere l'interfaccia utente di una APP, si può usare una pagina HTML, costruita con le stesse tecniche degli altri artefatti HTML (iotwidget, librerie etc...) e presentata in un pop-up flottante agendo su un bottone con il codice seguente (v. menu_apps.html):
```
  onClick="openMyWind('thermostat01.html', 650, 300, false);">
```
 e `openMyWind(url, width, height, resizable)`  è definito in `inc/iotmenu.js` 

**ESEMPI**

Thermostat:  `APP/Thermostat/html/thermostat01.html`, usato da 'menu_apps.html'. Vedi anche: [APP/Thermostat](https://github.com/msillano/IoTwebUI/blob/main/APP/Thermostat/README.md)  <br>
Battery tester: `APP/Battery tester/html/tester01.html`,  usato da 'menu_apps.html'. Vedi anche:  [APP/Battery tester](https://github.com/msillano/IoTwebUI/blob/main/APP/Battyery%20tester/Ba)

<hr>

### note di programmazione
* cominciare utilizzando e modificando gli esempi forniti.

**Pagine HTML**

Per i prototipi delle pagine HTML usate come IoTmemu, ho trovato comodo usare ""Dynamic HTML Editor v.6.8" (http://www.hexagora.com).

**Bottoni**

Sono presenti (png) di bottoni 'vuoti' 1x1, 1x2, 1x3, 0.5x3, ed alcuni bottoni con label (e.g. `online84.png` )
Ho usato 'Button shop 4-26' (https://www.kristanixsoftware.com/) e per comodità dell'utente il file `IoTwebUI_button01.bsx` contiene tutti i bottoni usati: l'utente può aggiungere labels, cambiare colore, creare altri bottoni della serie etc...  



