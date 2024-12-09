## IoTwebUI HTML stuff
[english version](https://github.com/msillano/IoTwebUI/blob/main/html/README.md)

Usando il [RESTserver](https://github.com/msillano/IoTwebUI/blob/main/RESTserver/LEGGIMI-REST22.md) un client può:
1. _Accedere ai dati dei device Tuya e x-device in IoTwebUI_
2. _Lanciare una scena ('tap-tro-run) o una REGOLA (con nome)._
   
La più semplice applicazione di queste funzionalità è la realizzazione di interfacce utente in HTML (WEB).<br>
Qui abbiamo una collezione di esempi:

a) **Librerie di Widget**: hanno la particolarità che basta posizionare un widget con due numeri (x, y) in una pagina web con sfondo: 
l'aggiornamento ed il funzionamento è automatico. Tutte le pagine di esempio sono realizzate con questa tecnica, veramente rapida e semplice.<br>
Risiedono nella dir `html/inc/`:
* **iotwidget01.js** offre 6 widget: icon, icotip, value, bigvalue, bigbutton, imgbutton
* **iotwidget02.js** altri 6 widget: signal, switch, gauge, linechart, multichart, areachart.
* _iotwidget01.css_  required by `iotwidget01.js`
* _restget.js_  required by  `iotwidget01.js` and `iotwidget02.js`

b) **Esempi d'uso** ( dir `html/`)
* **clima01.html** usa solo  `iotwidget01.js` e, come backend, l'x-device `clima01-xdevice.js`.  Utilizza device reali come fonte dati (richiede customizzazione).
Per dettagli vedi [clima01-leggimi](https://github.com/msillano/IoTwebUI/blob/main/html/clima01-leggimi.md) con informazioni sul pattern MPV utilizzato!
* **test02.html** usa solo  `iotwidget02.js` e utilizza device reali come fonte dati (richiede customizzazione).
Per dettagli vedi [test02-leggimi](https://github.com/msillano/IoTwebUI/blob/main/html/test02-leggimi.md) 

Inoltre nella dir si trovano alcuni file grafici richiesti dagli esempi.

<hr>

**APPLICAZIONI** (dir `APP/`)<br>
Queste sono applicazioni complete che utilizzano **x-device** + **html**, e sono raggruppate in una dir a parte con la loro documentazione.<br>
Vedi [elenco delle APP](https://github.com/msillano/IoTwebUI/tree/main/APP) con Tuya + IoTwebUI + UI
