## IoTwebUI addon 
[english version](https://github.com/msillano/IoTwebUI/blob/main/addon/README.md)

Gli ADDON altro non sono che nuove user MACRO (cioè funzioni js): in genere creano e gesticono **x-dervice**, ma possono essere usate per librerie custom di MACRO specializzate etc. <br>
Il vantaggio è che sono contenuti in un singolo file, facilmente aggiornabile ed anche scambiabile tra utenti, file che contiene anche tutte le istruzioni per l'uso, permettondo l'estensione 'su misura' delle funzionalità di IoTwebUI. <br>
Ogni utente può sceglie gli ADDON che ritiene più utili, o può creare i propri, magari modificando un addon pubblicato.
Un utente può sempre aggiungere un ADDON alla propria istanza di IoTwebUI (istruzioni dettagliate in ogni Addon):<br> 
- Il file deve essere nella dir addon/
- L'opzione di installazione più semplice è inserire una nuova riga nel file principale (IoTwebUI.html) 
- L'utente deve aggiungere la/le REGOLE  necessarie per eseguire o interagire con l'ADDON.
- Gli **addon** possono formare, quando forniti di _interfaccia utente_, vere e proprie [APP Tuya](https://github.com/msillano/IoTwebUI/tree/main/APP).

<hr>

Lista di ADDON da usare come sono o utilizzare come modelli per i propri addon: 
* **battery01.js** _x-device_: Presenta un elenco dei device con batterie scariche. Senza dipendenze e 
con poca customizzazione, usa auto-discovery per individuare i device.
* **battery02.js** _x-device_: Analogo al precedente, ma con algoritmo più performante (e maggiore customizzazione: l'utente deve inserire la lista di device). Senza dipendenze.
* **classify02.js**  _x-device_:  Fornisce un elenco di tutti i device presenti in un HOME (o in tutte), suddivisi per categoria (is-a). Senza dipendenze.
* **clone01.js**  _x-device_: crea e mantiene aggiornata una copia di un device reale Tuya, più dettagliata della versione standard usata da IoTwebUI. Senza dipendenze.
  
<hr>

### APP, x-device, addon: note di programmazione
* Una [**APP**](https://github.com/msillano/IoTwebUI/tree/main/APP) è dotata di un'interfaccia utente (in genere WEB) per accettare comandi e presentare risultati.
* Una **APP** utilizza un **x-device** come _middleware_: logica di funzionamento e formattazione dei dati ([pattern MVP](https://github.com/msillano/IoTwebUI/blob/main/html/clima01-leggimi.md#pattern-mvp)).

* Un **x-device** può essere implementato coma 'addon' nei casi più complessi, ma nei casi semplici un può anche essere realizzato con poche REGOLE.

Esempio:<br>
Si desidera formattare il valore di temperatura fornito da un sensore in un valore  visualizzato in un 'panel' di interfaccia:
  da `termometro.va_temperature` (212) a `tempData.scr_temperature` ("21.2 °C")
Bastano due rige nelle REGOLE:
```
if (!GETATTRIBUTE("tempData", "name", false))
     ADDXDEVICE('ROMA', "Tools", "tempData"),SETXDEVICEONLINE("tempData", true);

SETXDEVICESTATUS("tempData",  "scr_temperature",
     ROUND(GET("termometro", "va_temperature")/10, 1)+" °C");
```


             
