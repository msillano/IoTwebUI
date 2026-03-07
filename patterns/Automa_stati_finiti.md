### Pattern 
_AUTOMI A STATI FINITI_

### Spiegazione del Pattern e Implementazioni

**Modello Concettuale**  
_Gli AUTOMI A STATI FINITI (ASF) permettono di descrivere con precisione e in maniera formale il comportamento di molti sistemi._
Possiamo rappresentare gli automi a stati finiti con una tabella (tabella di transizione). Alle righe associamo gli stati e alle colonne gli input. Gli elementi della matrice rappresentano il risultato dell'applicazione della funzione di transizione.

**Esempio**<br>
Prendiamo spunto dal post di un utente che poneva il seguente problema: <br>
  _"Ho una luce che può essere in tre stati (OFF, FULL, HALF) e che passa da uno stato al successivo con un impulso (come un relay passo passo). Come posso comandarla direttamente con 3 comandi: DOOFF, DOFULL, DOHALF ?"_

* **Modellazione**<br>
  Realizziamo un ASF che modella la funzionalità della luce in questione. Ogni riga rappresenta lo stato della luce, ogni colonna un possibile comando in ingresso, mentre nella casella è indicato l'output, cioè lo stato che deve assumere la luce.
  
  | | **DOOFF**|**DOFULL**|**DOHALF**|
  |:---|:---|:---|:---|
  |**OFF**|  _OFF_ | FULL | HALF|
  |**FULL**|  OFF | _FULL_ | HALF|
  |**HALF**|  OFF | FULL | _HALF_|


### Implementazione basic 

* **comandi per la lampada**<br> 
Sono necessari uno oppure due impulsi per la commutazione della lampada. Questi sono TTR di basso livello, usati quando necessario:
   * Se il relay utilizzato (nome LUCE) possiede la funzione 'inching', regolarla per un valore adatto (e.g. 1s) poi
   creare i Tap-to-Run:
   ```
   PULSE1:
     LUCE.switch1 = ON
   PULSE2:
     esegui PULSE1
     Delay 2 s
     esegui PULSE1
   ```
   * Se il relay utilizzato (nome LUCE) NON possiede la funzione 'inching', ma possiede la funzione 'countdown':
   ```
   PULSE1:
     LUCE.switch1 = ON
     LUCE.countdown1 = 1
   PULSE2:
     esegui PULSE1
     Delay 2 s
     esegui PULSE1
   ```

* **device virtuali** <br>
      
1. Occorrono 2 relay virtuali (oppure un relay virtuale a 2 gang) - vedi §E del post https://www.facebook.com/groups/tuyaitalia/permalink/1387395731894776/ - Costano 0€ e sono affidabili , non usando la rete!<br>
Chiamiamo i due relay virtuali **NOW** e **NEXT**.<br>
Utilizzeremo il 'countdown' dei due relay per memorizzare lo 'stato' della tua lampada: `NOW.countdown` sarà lo stato attuale, mentre `NEXT.countdown` sarà lo stato desiderato.<br>
**Nota:** _Normalmente countdown conta all'indietro, un'unità al secondo! Nei device 'virtuali' non c'è il processore del device, ovviamente, quindi countdown non varia: è semplicemente una memoria per un valore numerico - quindi DEVONO essere usati relè virtuali; questa soluzione NON funziona con smart relay REALI.
2. _ Potremmo codificare lo stato della lampada con numeri qualsiasi, ad esempio scegliamo 1, 2, 3 per OFF, FULL, HALF, nella sequenza di attivazione della lampada.

* **Comandi**
I comandi per cambiare luce alla lampada, saranno 3 tap-to-run, che si limiteranno a mettere il valore voluto in `NEXT.countdown`
Con tre bottoni l'utente (o un'altra scena) quindi modifica la sua luce, indipendentemente dallo 'stato' attuale della luce:
```
=========== DOOFF
NEXT.countdown = 1 // codice OFF
=========== DOFULL
NEXT.countdown = 2 // codice FULL
=========== DOHALF
NEXT.countdown = 3 // codice HALF
```

* **Automazioni per cambiare lo stato**

        U = f(S, I)  cioè l'uscita è funzione dello stato attuale e dell'input
        
Con Tuya, non è possibile passare valori ad una funzione: dobbiamo scrivere una funzione per ogni combinazione di S e I e usare le condizioni ('Se') per selezionare l'automazione da usare. <br>
Tutte le combinazioni possibili sono 9 (3x3) ma in tre casi NON si deve fare nulla (quando `NOW.countdown` e `NEXT.countdown` sono uguali: e.g. se la luce è spenta, il comando `DOOFF` non deve fare nulla. <br>
Quindi in totale 6 automazioni! Cosa devono fare queste automazioni? <br>
a) Dare il numero corretto di impulsi al relay della luce: <br>
Useremo i tap-to-run già visti, `PULSE1` e `PULSE2`. <br>
b) Aggiornare `NOW.countdown` con il nuovo stato (cioè con `NEXT.countdown`)

Ecco le sei automazioni:

```
================== A12 (i.e. da OFF a FULL)
Se (tutti = AND)
  NOW.countdown = 1
  NEXT.countdown = 2
Poi
  Esegui PULSE1
  NOW.countdown = 2
================== A13 (i.e. da OFF a HALF)
Se  (tutti = AND)
  NOW.countdown = 1
  NEXT.countdown = 3
Poi
  Esegui PULSE2
  NOW.countdown = 3
================== A21 (i.e. da FULL a OFF)
Se  (tutti = AND)
  NOW.countdown = 2
  NEXT.countdown = 1
Poi
  Esegui PULSE2
  NOW.countdown = 1
================== A23 (i.e. da FULL a HALF)
Se  (tutti = AND)
  NOW.countdown = 2
  NEXT.countdown = 3
Poi
  Esegui PULSE1
  NOW.countdown = 3
================== A31 (i.e. da HALF a OFF)
Se  (tutti = AND)
  NOW.countdown = 3
  NEXT.countdown = 1
Poi
  Esegui PULSE1
  NOW.countdown = 1
================== A32 (i.e. da HALF a FULL)
Se  (tutti = AND)
  NOW.countdown = 3
  NEXT.countdown = 2
Poi
  Esegui PULSE2
  NOW.countdown = 2 
```

Non è troppo complicato, è solo un po' noioso da scrivere...

### Problema 1 - Sincronizzazione luce e automa.
Sia inizialmente, sia durante l'uso, quando per esempio un'automazione non è eseguita correttamente per problemi di rete, si potrebbe perdere il sincronismo tra lo stato della lampada reale e lo stato dell'ASF.

* **Soluzione 1 - manuale** <br>
Un workaround semplice è un RESET (tap-to-run) da usare manualmente una, due o tre volte, finché non si vede la lampada spenta!
Ripristina le automazioni in uno stato corretto!
```
============ RESET
Esegui PULSE1
delay 2 s
NOW.countdown = 1
NEXT.countdown = 1
```
* **Soluzione 2 - automatica** <br>
È possibile anche una soluzione automatica, che però richiede dell'HW per esaminare lo stato della lampada:
 1. Uno smart luxmetro Tuya può, dalla luminosità misurata, individuare se la luce è OFF, HALF, FULL
 2. Meglio ancora, uno smart plug meter Tuya, tra la spina e la presa, può misurare la potenza assorbita e dedurre lo stato...
 3. Eccetera: potreste trovare altre soluzioni più adatte al caso specifico.

 Quello che serve è una condizione che sia VERA se la lampada è spenta, e FALSA negli altri casi! Chiamiamola `TESTOFF`
 Questa funzione ricorsiva controlla, ogni volta che ASF spegne la luce, che la lampada sia effettivamente spenta, risincronizzando se necessario.
 Nota: questa automazione utilizza l'AMBITO per avere una condizione extra, che però NON triggera l'avvio dell'automazione.
```
=========== LUCETEST
Se (tutti = AND)
  NOW.countdown = 1
  NEXT.countdown = 1
AMBITO  
  TESTOFF = false
Poi
  NEXT.countdown = 5  // fuori range
  Esegui RESET
-------
```

 ### Problema 2 - Race Condition
Ma uno sfasamento tra ASF e lampada può essere causato anche in un altro caso: quando l'utente invia un comando prima che sia stato completato il precedente!
Presenteremo qui una soluzione abbastanza complessa, per cui il mio consiglio è il seguente, che va però pesato con il contesto. Nell'esempio in esame la causa della race condition è l'utente.
1. Realizzare la semplice versione precedente, possibilmente con la sincronizzazione automatica.
2. Tarare i vari delay cercando di ridurli al minimo pur mantenendo un funzionamento stabile ed affidabile 
3. L'intervallo tra due comandi dovrebbe essere tra 6 e 10 secondi. Valutare l'usabilità di questa soluzione: provare a dare due comandi in sequenza. 
Solo se la vostra valutazione sull'usabilità è negativa, provate a implementare questa seconda soluzione. Oppure implementatela subito, se in un altro contesto eliminare la Race Condition è per voi importante!

La novità consiste in un semaforo che ignora nuovi comandi finché il precedente non ha terminato di essere processato! 
Utilizzeremo lo stato del relay `NOW`  come semaforo con questa logica: ON = BUSY,  OFF = READY: countdown e lo stato del relay sono indipendenti e, nel caso di device virtuali, non interferiscono.

Le scene di base precedenti vanno modificate per
1. Impostare il semaforo a BUSY prima possibile
2. Attivare un'automazione da un tap_tu_run, sfruttando un quirk di Tuya: se disabilito un'automazione con BUSY e la riabilito con READY, l'automazione (deve contenere la condizione NOW.switch = READY) parte SUBITO appena abilitata. Vedi post https://www.facebook.com/groups/tuyaitalia/permalink/1379224052711944/ 
ATTENZIONE: Questa logica sfrutta un comportamento non documentato del motore di regole Tuya. Potrebbe smettere di funzionare in futuri aggiornamenti del Cloud.
3. Garantire che il ripristino del semaforo READY sia l'ultima operazione effettuata dopo la disabilitazione: questo si può ottenere solo usando un Tap_to_run (DISABILITA) e NON disabilitando l'automazione dentro l'automazione stessa (la disabilitazione ha effetto, ma non sono eseguite le azioni successive!)
4. Le scene modificate hanno il nome con il suffisso 'new':  si possono così provare entrambe le soluzioni contemporaneamente.

**1. Tap_to_run di comando**
```
=========== DOOFFnew
NEXT.countdown = 1 // codice OFF
Abilita A21new
Abilita A31new
=========== DOFULLnew
NEXT.countdown = 2 // codice FULL
Abilita A12new
Abilita A32new
=========== DOHALFnew
NEXT.countdown = 3 // codice HALF
Abilita A13new
Abilita A23new
```
Notiamo che abilita le sole automazioni potenzialmente interessate al nuovo stato

* **Automazioni per cambiare lo stato**

```
================== A12new (i.e. da OFF a FULL)
Se (tutti = AND)
  NOW.switch = OFF   // i.e READY
  NOW.countdown = 1
  NEXT.countdown = 2
Poi
  NOW.switch = ON   // set BUSY
  Esegui PULSE1
  NOW.countdown = 2
  Esegui DISABILITA
================== A13new (i.e. da OFF a HALF)
Se  (tutti = AND)
  NOW.switch = OFF   // i.e READY
  NOW.countdown = 1
  NEXT.countdown = 3
Poi
  NOW.switch = ON   // set BUSY
  Esegui PULSE2
  NOW.countdown = 3
  Esegui DISABILITA
================== A21new (i.e. da FULL a OFF)
Se  (tutti = AND)
  NOW.switch = OFF   // i.e READY
  NOW.countdown = 2
  NEXT.countdown = 1
Poi
  NOW.switch = ON   // set BUSY
  Esegui PULSE2
  NOW.countdown = 1
  Esegui DISABILITA
================== A23new (i.e. da FULL a HALF)
Se  (tutti = AND)
  NOW.switch = OFF   // i.e READY
  NOW.countdown = 2
  NEXT.countdown = 3
Poi
  NOW.switch = ON   // set BUSY
  Esegui PULSE1
  NOW.countdown = 3
  Esegui DISABILITA
================== A31new (i.e. da HALF a OFF)
Se  (tutti = AND)
  NOW.switch = OFF   // i.e READY
  NOW.countdown = 3
  NEXT.countdown = 1
Poi
  NOW.switch = ON   // set BUSY
  Esegui PULSE1
  NOW.countdown = 1
  Esegui DISABILITA
================== A32new (i.e. da HALF a FULL)
Se  (tutti = AND)
  NOW.switch = OFF   // i.e READY
  NOW.countdown = 3
  NEXT.countdown = 2
Poi
  NOW.switch = ON   // set BUSY
  Esegui PULSE2
  NOW.countdown = 2
  Esegui DISABILITA
```

Serve un nuovo Tap_to_run, DISABILITA, che termina le operazioni per TUTTE le automazioni: le disabilita tutte (per quelle già disabilitate non cambia nulla) e poi cambia il semaforo in READY
```
============== DISABILITA:
disabilita A12new
disabilita A13new
disabilita A21new
disabilita A23new
disabilita A31new
disabilita A32new
NOW.switch = OFF   // set READY
```








