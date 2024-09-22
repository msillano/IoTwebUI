# test02 - iotwidget02 - docuentation
test02.html presenta la seconda libreria di widget per IoTwbUI.

![](https://github.com/msillano/IoTwebUI/blob/main/pics/test02.png?raw=true)

Gli iotwidget sono aggiornati al runtime via REST da IoTwebUI ad intervalli regolari.<br>
**test02.html** è un odello di uso dei nuovi widget02. 

## library iotwidget02
E' una collezione di widget da usare con **IOTrest** per avere pagine web dinamiche ed interattive.
Son disponibili 5 widget specializzati in questa collezione: signal, switch,  gauge, linechart, areachart.

* **signal** Presenta una spia a due colori, verde/rosso (OFF/ON). <br>
_parametri_: device ID (o nome nel caso di x-device)

* **icotip** Presenta l'icona di un device, la stessa usata in IoTwebUI. Nel tooltip oltre al nome del device, sono presenti tutti i dati come nei Tooltip di IoTwebUI. <br>
_parametri_: device ID (o nome nel caso di x-device)

* **value** Presenta un valore letto da un device. <br>
_parametri_: device ID (o nome nel caso di x-device), code, color (opzionale)

* **bigvalue** Come _**value**_, usando un font di dimensioni maggiori. <br>
_parametri_: device ID (o nome nel caso di x-device), code, color (opzionale)

* **bigbutton** Bottone totalmente parametrico, lancia un **'tap-to-run**' Tuya oppure una **REGOLA** IoTwebUI. <br>
_parametri_: text, scenerule, background (opzionale), color (opzionale)

* **imgbutton** Bottone con sfondo grafico. <br>
_parametri_: image, text, scenerule, background (opzionale), color (opzionale)

_L'utente crea un array di oggetti con le caratteristiche desiderate, e il SW gestisce i widget._ 
_Occorre solo un po' di pazienza e qualche tentativo per ottimizzare la posizione di ogni widget nella pagina._

## x-device clima01
Per rendere l'interfaccia utente indipendente dai dati forniti dai device Tuya, si è utilizzata un **x-device**
con funzione di middleware.
