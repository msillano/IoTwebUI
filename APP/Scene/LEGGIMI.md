# Explore scene

### Obiettivi
_Questa APP ha come obiettivo agevolare lo sviluppo e la documentazione delle scene (Automazioni e Tap-to-run) di Tuya (SmartLife o Tuya Smart APPs)._ <br>
Sostanzialmente sono prodotti due ertefatti: elenchi di tutte le scene con le principali caratteristiche, formattati in una tavola, ed un grafo con le relazioni tra tutte le scene e le device coinvolte. 

<table width = "100%"><tr><td>
Una visione d'insieme che permette di valutare meglio le relazioni tra i vari elementi.

Il menu offre quattro scelte:<br>
* **Automation** genera una tabella (per la stampa meglio il foglio A4 orizzontale) con tutte le automazioni presenti 
* **Tap-to-run** genera un tabella con tutti i tap-to-run
* **Tuya grapho** genere un grapho con tutte le automazioni, i tap-to-run e i device coinvolti.

</td><td   width="200pt">
<img src="https://github.com/msillano/IoTwebUI/blob/main/pics/scene01d.png?raw=true">
</td></tr></table>

![](https://github.com/msillano/IoTwebUI/blob/main/pics/Scene01b.png?raw=true)
![](https://github.com/msillano/IoTwebUI/blob/main/pics/scene01a.png?raw=true)

### Risultati

1. **Tuya grapho**
Legenda: Con i defaults abbiamo:
   * In verde le _automazioni_
   * In grigio i _Tap-to-run_
   * In box3d i sottoinsiemi e _miniAPP Tuya_: Allarmi, geolocalizzazione, timer per schedulig, etc
   * In ellissi i _device Tuya_.

 <hr>
nota importante: le API usate (da IOT base) NON forniscono alcune informazioni, che quindi mancano in tutti artefatti. Mentre sto cercando API alternative e facilmente abilitabili, la situazione attuale è questa:
   * Non sono accessibili i dati e le funzioni gestiti da miniAPP. In particolare:
      * tutti gli eventi dell'antifurto (braccio), degli allarmi e delle emergenze NON sono differenziati e si riferiscono tutti ad "armed state"
      * analogamente anche le azioni NON sono differenziate e si riferiscono tutte ad "armed state" (mini APP 'protenzione intelligente')
      * le funzioni di temporizzazione (anche mensile ed annuale) impostate con le 'regole' nella mini APP 'Casa Accogliente'.

   * i gruppi compaiono solo con il loro ID (e  non con il nome) nè si hanno dettagli.
   * le condizioni definite dall'utente in _ambito di validità_ (preconditions)
   * la _regola_ impostata  per gestire più condizioni di trigger (ANR / OR)
   * la _durata_ dei ritardi (delay)
_Sono tutte informazioni facilmente visibili in SmartLife._

<hr>
### Customizzazioni
<table width = "100%"><tr><td>
<img src="https://github.com/msillano/IoTwebUI/blob/main/pics/scene01c.png?raw=true">
</td><td   width="200pt">
Per scopo di docunentazione puù essere utile un grafo parziale e non totale.
Questo è facilmente ottenibile con i passi seguenti:

1. Usare **Plain list**, quarta opzione del menu: si ottengono due liste (_automazioni_ e _tap-to-run_) già formattate.
2. Copiare gli elenchi nel file  sorgente (`/addon/scene01.js`) nei due array (di default vuoti: `[]`):

        const excludeAutomation = [
                                ];

        const excludeTapToRun = [
                                ];
3. commentare (con '//' a inizio riga) o cancellare le scene che si VOGLIONO processare.
4. Riavviare **IoTwebUI** (`run_me.bat`).
La figura di esempio l'ho ottenuta commentando solo le due automazioni: `thermostatSTART` e `thermostatSTOP`.

</td></tr></table>
