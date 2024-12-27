# Explore scene

### Obiettivi
_Questa APP ha come obiettivo agevolare lo sviluppo e la documentazione delle scene (Automazioni e Tap-to-run) di Tuya (SmartLife o Tuya Smart APPs) in modo semplice ed automatico._ <br>
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

_nota: Tuya non 'conosce' gli **x-device**, che pertanto NON compariranno mai nel grapho. 
Idem per le **regole** di IoTwebUI, che hanno una sintassi totalmente diversa dalle 'scene' Tuya!_

Legenda: Con i defaults abbiamo:

   * In verde le _automazioni_
   * In grigio i _Tap-to-run_
   * In box3d i sottoinsiemi e _miniAPP Tuya_: Allarmi, geolocalizzazione, timer per schedulig, etc
   * In ellissi i _device Tuya_.

**nota:** e'facile cambiare sia le forme (shape) che i colori dei nodi. Vedi source `addon/scene01`.js.
 <hr>
 
**IMPORTANTE:**  _le API usate (da IOT base) purtroppo NON forniscono alcune informazioni, che quindi mancano in tutti gli artefatti._ <br> Mentre sto cercando API alternative, la situazione attuale è questa:

   * Non sono accessibili i dati e le funzioni gestiti da miniAPP. In particolare:
      * tutti gli _eventi_ dell'antifurto (braccio), degli allarmi e delle emergenze NON sono differenziati e si riferiscono tutti ibdistintamente ad "armed state".
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

1. Usare **Plain list**, quarta opzione del menu: si ottengono due liste (_automazioni_ e _tap-to-run_) già formattate.
2. Copiare gli elenchi nel file  sorgente (`/addon/scene01.js`) nei due array (di default vuoti: `[]`):

        const excludeAutomation = [
                                 "automation01",
                                 "automation02",
        //                       "thermostatSTART",
                                 . . . 
                                ];

        const excludeTapToRun = [
                                ];
4. commentare (con '//' a inizio riga) o cancellare le scene che si VOGLIONO processare.
5. Riavviare **IoTwebUI** (`run_me.bat`).
   
_Il grapho di esempio è ottenuto commentando solo le due automazioni: `thermostatSTART` e `thermostatSTOP`._

</td></tr></table>
<hr>

### Grapho di x-device

I dati necessari per i grafi sono estratti automaticamente dalle 'scene' e dai 'device' Tuya.<br> 
Per includere **x-device** nei grafi, ad esempio per documentazione, come in questo esempio, che illustra sinotticamente il funzionamento di "Explore Scene", occorre inserire esplicitamente dei metadati in **x-device**. 

![](https://github.com/msillano/IoTwebUI/blob/main/pics/Screenshot%202024-12-27%20194833.png?raw=true)

I mondi Tuya e IoTwebUI hanno limitati punti di contatto:

* un _x-device_ (o una _REGOLA_ di IoTwebUI) può leggere dati da _device Tuya_
* un _x_device_ (o una _REGOLA_ di IoTwebUI) può attivare un _Tap_to_run Tuya_ per scatenare azioni o aggiornare device.
* un _x-device_ appare nei grafi di **Explore Scene** solo se ha metadati. 
* una _REGOLA_(IoTwebUI) non può avere metadati, ed appare nei grafi di **Explore Scene** solo se è presente nei metadati di un _x-device_.

La struttura (opzionale) per i metadati di un **x-device** è la seguente (esempio):
```
details: = {
            input: [
                   {entity_type: "UI\\nscene01",       //extra, from UI
                    expr: {extra_code: "action.set" }},
                    ...
                  ],
            output: [
                  {action_executor: "SVG graph",        // extra, artifact
                   executor_property: {extra_code: "popup"}}
                   ...
                 ]};
```
nell''input array' (i.e. condizioni) si può inserire
 <table width = "100%", border = 1><tr><th>entity_type</th><th>expr</th> <th><i>note</i></th></tr>
 
 <tr><td> <b>device_report</b><br> entity_id:<i>name</i>|<i>id</i></td><td>{extra_code: <i>'trigger'</i>} or <br>{comparator: <i>'>'</i>, status_code: <i>'countdown_1</i>', status_value: <i>25606</i>} </td><td><i>device & x-device data test</i></td></tr>
 
<tr><td><b>weather</b></td><td>{comparator: <i>'>'</i>, weather_code: <i>'humidity'</i>, weather_value: <i>'comfort'</i>}</td><td><i>weather data test</i></td></tr>

<tr><td><b>rule</b><br>entity_name:<i>taptorun</i> </td><td>{extra_code: <i>'trigger'</i>} or<br>{comparator: <i>'='</i>, status_code: <i>'countdown_1</i>', status_value: <i>25606</i>}</td><td><i> X-RULE (tap-to-run) definition && action for this x-device</i></td></tr>

<tr><td><b>timer</b> </td><td>{extra_code: <i>'schedule'</i>}</td><td><i>internal timer, scheduling, data-driven etc.</i></td></tr>

<tr><td><b>&lt;any&gt;</b> (extra)</td><td>{extra_code: <i>'action push'</i>}</td><td><i>external data, miniAPP.. note: box node, special color for all "UI\\nxxxx"</i></td></tr> <table>

Invece nell''output array' (i.e. azioni) si può inserire:
<table width = "100%", border = 1><tr><th>action_executor</th><th>executor_property</th> <th>note</th></tr>
 
 <tr><td> <b>device_issue</b><br> entity_id:<i>name</i>|<i>id</i></td><td>{ function_code: <i>'switch_1</i>', function_value: <i>true</i>} </td><td><i>device data set</i></td></tr>

 <tr><td> <b>rule_trigger</b><br> entity_name:<i>name</i></td><td><i>none</i> </td><td><i> tap_to_run && X-RULE (tap_to_run) trigger action </i></td></tr>

<tr><td><b>xrule</b><br>entity_name:<i>name</i> </td><td>{extra_code: <i>'trigger'</i>} or<br>{comparator: <i>'='</i>, status_code: <i>'countdown_1</i>', status_value: <i>25606</i>}</td><td><i> X-RULE (automation) definition && condition push from this x-device</i></td></tr>

<tr><td><b>&lt;any&gt;</b> (extra)</td><td>{extra_code: <i>'popup'</i>}</td><td><i>tooltip, artifacts, miniAPP.. note: box node, special color for all "UI\\nxxxx"</i></td></tr> <table>

Esempi si possono trovare nei source in molti addon o APP. (`batterry01.2.js`, `scene01.js` etc.)


