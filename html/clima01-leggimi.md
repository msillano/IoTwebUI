# clima01 - iotwidget01 - web page template
Un esempio di interfaccia utente WEB, implementata usando la prima libreria di widget per IoTwbUI.

![](https://github.com/msillano/IoTwebUI/blob/main/pics/clima01.png?raw=true)

Sono pagine costitute da uno sfondo e dei 'widget' (13 in questo caso) disposti liberamente in ogni punto della pagina.
Alcuni widget sono aggiornati al runtime via REST da IoTwebUI.<br>
**Clima01.html** è un template per creare pagine simili, semplicemente cambiando il file di sfondo ed i widget usati: senza dover modificare il codice `js` o `html`. 

## library iotwidget01
E' una collezione di widget da usare con **IOTrest** per avere pagine web dinamiche ed interattive.
Son disponibili 6 widget specializzati in questa collezione: icon, icotip,  value, bigvalue, bigbutton, imgbutton.<br>
* **icon** Presenta l'icona di un device, la stessa usata in IoTwebUI. Con un tooltip limitato al nome del device. <br>
* **icotip** Presenta l'icona di un device, la stessa usata in IoTwebUI. Nel tooltip oltre al nome del device, sono presenti tutti i dati come nei Tooltip di IoTwebUI. <br>
* **value** Presenta un valore letto da un device. <br>
* **bigvalue** Come _**value**_, usando un font di dimensioni maggiori. <br>
* **bigbutton** Bottone totalmente parametrico, lancia un **'tap-to-run**' Tuya oppure una **REGOLA** IoTwebUI. <br>
* **imgbutton** Bottone con sfondo grafico. <br>

_L'utente crea un array di oggetti con le caratteristiche desiderate, e il SW gestisce i widget._ 
_Occorre solo un po' di pazienza e qualche tentativo per ottimizzare la posizione di ogni widget nella pagina._

## x-device clima01
Per rendere l'interfaccia utente indipendente dai dati forniti dai device Tuya, si è utilizzata un **x-device**
con funzione di middleware.

Trasforma un valore fornito dai device (e.g. 'va_temperature: 284') in una stringa usabile nell'interfaccia: "28,4°C".
Ovviamente è un esempio, da adattare ai device in uso.
