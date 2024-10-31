# clima01 - iotwidget01 - web page template
Un esempio di interfaccia utente WEB, implementata usando la prima libreria di widget per IoTwbUI.

![](https://github.com/msillano/IoTwebUI/blob/main/pics/clima01.png?raw=true)

Sono pagine costitute da uno sfondo e dei 'widget' (13 in questo caso) disposti liberamente in ogni punto della pagina.
Gli iotwidget sono aggiornati al runtime via REST da IoTwebUI ad intervalli regolari.<br>
**Clima01.html** è un template per creare pagine simili, semplicemente cambiando il file di sfondo ed i widget usati: senza dover modificare il codice `js` o `html`. 

## library iotwidget01
E' una collezione di widget da usare con **IOTrest** per avere pagine web dinamiche ed interattive.
Son disponibili 6 widget specializzati in questa collezione: icon, icotip,  value, bigvalue, bigbutton, imgbutton.

* **icon** Presenta l'icona di un device, la stessa usata in IoTwebUI. Con un tooltip limitato al nome del device. <br>
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

Trasforma un valore fornito dai device (e.g. 'va_temperature: 284') in una stringa usabile nell'interfaccia: "28,4°C".
Ovviamente è un esempio, da adattare ai device in uso.

<hr>
## Pattern MVP
Questo pattern è il più naturale per realizzare interfacce utente custom per Tuya utilizzando IoTwebUI + IoTrest, ed è usato negli esempi proposti:

![Screenshot 2024-10-31 174424](https://github.com/user-attachments/assets/d302ea3d-598f-4790-9457-cdd9485aa31d)

* **MODEL**: Tuya (smartLife) + device rappresentano l'orogine dei dati. Le 'scene' Tuya, eventualmente estese con REGOLE, implementano la business logic automatica necessaria al funzionamento.
* **PRESENTER**: (middleware) funge da 'adattatore di impedenza': si occupa della raccolta, trasformazione, formattazione dei dati. Inoltre distribuisce i comandi utente ai device, validandoli e mantenendo la sincronizzazione. Implementato da uno o più **x-device**
* **VIEW**: User interface stupida, si occupa solo della visualizzazione. Implementata usualmente in HTML + JavaScript

nota: l'interfaccia V-P è definita in P e coincide con la definizione dello 'status' (proprietà) di una o più **x-device**

_Negli esempi, quindi, un'interfaccia utente si compone di almeno due parti: una pagina WEB ed un x-device. La customizzazione più semplice consiste nell'adattamento del **x-device** ai device fisici Tuya disponibili, mentre il suo 'status' deve rimane inalterato._

