# Explore scene

### Obiettivi
_Questa APP ha come obiettivo agevolare lo sviluppo e la documentazione delle scene (Automazioni e Tap-to-run) di Tuya (SmartLife o Tuya Smart APPs) e IoTwebUI in modo semplice ed automatico._ <br>
Sostanzialmente sono prodotti due artefatti: elenchi di tutte le scene con le principali caratteristiche, formattati in una tavola, ed un grafo con le relazioni tra  scene e device coinvolte.

_Le tabelle testuali possono servire come archivio, da usare, per esempio, in caso di necessità di reinserimento delle scene se un device ha cambiato ID._ <br>
_Il grafo è utile sia come verifica della logica implementata che come chiara documentazione del funzionamento._
 

<table width = "100%"><tr><td>
Il menu offre queste scelte:
 
* **Automation** genera una tabella (per la stampa meglio il foglio A4 orizzontale) con tutte le automazioni presenti 
* **Tap-to-run** genera un tabella con tutti i tap-to-run
* **Tuya grapho** genere un grapho con le automazioni, i tap-to-run e i device coinvolti, con le relazioni che li legano.

_Inserire la HOME desiderata nel campo superiore, e cliccare fuori dal campo (deselezionare il campo): parte l'aggiornamento dei dati, che può durare un certo tempo. Un messaggio vocale segnala la fine._

* **Clear** pulisce i dati in memoria, quindi occorre reinserire l'HOME. <br>
 Utile se si è fatta qualche modifica in ambiente Tuya e si vuole aggiornare.
</td><td   width="200pt">
<img src= "https://github.com/msillano/IoTwebUI/blob/main/pics/scene01d.png?raw=true">
</td></tr></table>

### Risultati

![](https://github.com/msillano/IoTwebUI/blob/main/pics/Scene01b.png?raw=true)
![](https://github.com/msillano/IoTwebUI/blob/main/pics/scene01a.png?raw=true)


Legenda: Con i defaults abbiamo:

   * In verde le _automazioni_
   * In grigio i _Tap-to-run_
   * In box3d i sottoinsiemi esterni e _miniAPP Tuya_: Allarmi, geolocalizzazione, timer per schedulig, etc
   * In ellissi i _device_.

**nota:** e'facile cambiare sia le forme (shape) che i colori dei nodi. Occorre modificare `addon/scene01.js`
  Vedi [https://graphviz.org/doc/info/shapes.html](https://graphviz.org/doc/info/shapes.html).<hr>
 
**IMPORTANTE:**  _le API usate (da IOT base) purtroppo NON forniscono alcune informazioni, che quindi mancano in tutti gli artefatti._ <br> Mentre sto cercando API alternative, la situazione attuale è questa:

   * Non sono accessibili i dati e le funzioni gestiti da miniAPP. In particolare:
      * tutti gli _eventi_ dell'antifurto (braccio), degli allarmi e delle emergenze NON sono differenziati e si riferiscono tutti indistintamente ad "armed state".
      * analogamente anche le _azioni_ NON sono differenziate e si riferiscono sempre ad "armed state" (mini APP 'protenzione intelligente')
      * le funzioni di temporizzazione (anche mensile ed annuale) impostate con le 'regole' nella mini APP 'Casa Accogliente'.

  * Anche le seguenti informazioni risultano assenti:
      * i gruppi compaiono solo con il loro ID (e  non con il nome) nè si hanno dettagli.
      * le condizioni definite dall'utente in _ambito di validità_ (preconditions)
      * la _logica_ impostata  per gestire le precondizioni di validità o le condizioni di trigger (cioè AND / OR)
      * i periodi (girno/notte/orario) di validità temporate.
      * la _durata_ dei ritardi (delay)<br>
_Sono tutte informazioni facilmente visibili in SmartLife, ma attualmente NON leggibili via tuyaAPI._

<hr>

### Customizzazioni

<table width = "100%"><tr><td width="200pt">
<img src="https://github.com/msillano/IoTwebUI/blob/main/pics/scene01c.png?raw=true">
</td><td>
Per scopo di docunentazione può essere utile un grafo parziale e non totale.
Questo è facilmente ottenibile con i passi seguenti:

1. Usare **Plain list**, quarta opzione del menu: si ottengono tre liste (_automazioni_, _tap-to-run_, _x-device_) già formattate.
2. Copiare gli elenchi nel file  sorgente (`/addon/scene01.js`) negli array (di default vuoti: `[]`):

        const excludeAutomation = [
                                 "automation01",
                                 "automation02",
        //                       "thermostatSTART",
                                 . . . 
                                ];

        const excludeTapToRun = [
                                ];
        const excludeXDevice  = [
                                ];

4. commentare (con '//' a inizio riga) o cancellare le `scene` o le `x-device` che si VOGLIONO processare.
Default: array vuoti []: nei grafici appare tutto!
5. Riavviare **IoTwebUI** (`run_me.bat`).
   
_Il grapho di esempio è ottenuto commentando solo le due automazioni: `thermostatSTART` e `thermostatSTOP`; il device è aggiunto automaticamente perchè è usato dalle automazioni._

</td></tr></table>
<hr>

### Grapho di x-device

I dati necessari per i grafi sono estratti automaticamente dalle 'scene' e dai 'device' Tuya.<br> 
Per includere gli **x-device** nei grafi, ad esempio per documentazione, come in questo esempio, che illustra sinotticamente il funzionamento di "Explore Scene", occorre inserire esplicitamente dei metadati nelle **x-device**. 

![](https://github.com/msillano/IoTwebUI/blob/main/pics/Screenshot%202024-12-27%20194833.png?raw=true)

I mondi Tuya e IoTwebUI hanno limitati punti di contatto:

* un _x-device_ (o una _REGOLA_ di IoTwebUI) può leggere dati da _device Tuya_
* un _x_device_ (o una _REGOLA_ di IoTwebUI) può attivare un _Tap_to_run Tuya_ per scatenare azioni o aggiornare device.
* un _x-device_ appare nei grafi di **Explore Scene** solo se ha metadati. 
* una _REGOLA_(IoTwebUI) non può avere metadati, ed appare nei grafi di **Explore Scene** solo se è presente nei metadati di un _x-device_.

In pratica i metadati definiscono solo gli archi del grapho, e (implicitamente) i nodi di arrivo e partenza.
La struttura (opzionale) per i metadati di un **x-device** è la seguente (esempio):
```
x-device.details: = [
                   { from: { type: "type",
                               id: "name"},
                       to: { type: "type",
                               id: "name"},
                   action: "label" 
		    	            }, ...];
```

_note:_
* **from** e/o **to** sono opzionali, quando mancano come default è usato il nodo dell'_x-device_. (e.g. {data-driven}
* **type** è obbligatorio e deve assumere uno dei seguenti valori:  **device, auto, tap, extra, xdevice, xauto, xtap, xextra.**:
	- **device**: _device Tuya_ sorgente (from) o arrivo (to) di un freccia
	- **auto**: _automazione_, in (to) se è un evento trigger, in (from) se è un'azione
	- **tap**: _Tap-To-Run_,  in (to) se è un evento trigger, in (from) se è un'azione
	- **extra**: _risorse esterne_: alarm, miniAPP, Tuya data, UI etc...<br>
        - I valori che iniziano la x (e.g. _xdevice_) si riferiscono a elementi di `IoTwebUI`, gli altri a `Tuya`.
        - Ad ogni _type_ corrisponde un nodo di aspetto diverso, in tutto 8.
* **id**, obbligatorio, è il nome di un elemento e compare al centro del nodo. Se non esiste ancora è creato: questo è il modo per inserire nel grafo le _ROUTINE di_ _IoTwebUI_, che altrimenti non comparirebbero.
* **action** è la label dell'arco che unisce _from_ a _to_.

Esempi si possono trovare nei source in molti addon o APP. (`battery01.2.js`, `scene01.js` etc.)
