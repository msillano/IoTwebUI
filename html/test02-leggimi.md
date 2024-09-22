# test02 - iotwidget02 - documentation
test02.html presenta la seconda libreria di widget per IoTwbUI.

![](https://github.com/msillano/IoTwebUI/blob/main/pics/test02.png?raw=true)

Gli iotwidget sono aggiornati al runtime via REST da IoTwebUI ad intervalli regolari.<br>
**test02.html** è un modello di uso dei nuovi widget02. 

## library iotwidget02
E' una collezione di widget da usare con **IOTrest** per avere pagine WEB dinamiche ed interattive.
Sono disponibili 5 widget specializzati in questa collezione: signal, switch,  gauge, linechart, areachart.

* **signal** Presenta una spia a due colori, verde/rosso (OFF/ON). <br>
nota: in questo widget è seplice cambiare il look usando due immagini custom.<br> 
_parametri_: device ID (o nome nel caso di x-device), code, images.

* **switch** Presenta uno switch, nelle due posizioni ON/OFF ed attiva due scene/regole.<br>
L'azione è immediata, ma l'immagine si aggiorna con un certo ritardo (LOOPINTERVAL).<br>
 nota: in questo widget è semplice cambiare il look usando due immagini custom.<br>
_parametri_: device ID (o nome nel caso di x-device), code, scene/regole, images.

I widget seguenti sono ricavati dalla libreria [Google grafici](https://developers.google.com/chart/interactive/docs?hl=it), che contiene decine di ottimi grafici parametrici.<br>
Usarli con giudizio perchè sono pesanti e richiedono molte risorse (usare RESTINTERVAL di almeno 5 secondi).<br>
nota: in funzione della visibilità della pagina e del carico, il browser può ridurre i loop di aggiornamento, quindi non sono garantite tutte le letture. 

* **gauge** Presenta uno strumento di misura grafico realtime con un valore letto da un device. <br>
nota. la struttura 'options' contiene i valori per customizzare il grafico: vedi documentazione Google.<br>
_parametri_: device ID (o nome nel caso di x-device), code, options.

* **linechart** Presenta il grafico realtime di un valore letto da un device. <br>
nota. la struttura 'options' contiene i valori per customizzare il grafico: vedi documentazione Google.<br>
_parametri_: device ID (o nome nel caso di x-device), code, options.

* **areachart** Presenta due valori, in un grafico ad area. <br>
nota. la struttura 'options' contiene i valori per customizzare il grafico: vedi documentazione Google.<br>
_parametri_: due x device ID (o nome nel caso di x-device), code, options.

_L'utente crea un array di oggetti con le caratteristiche desiderate, e il SW gestisce i widget._ 
_Occorre solo un po' di pazienza e qualche tentativo per ottimizzare la posizione di ogni widget nella pagina._

## x-device clima01
Per rendere l'interfaccia utente indipendente dai dati forniti dai device Tuya, si è utilizzata un **x-device**
con funzione di middleware.
