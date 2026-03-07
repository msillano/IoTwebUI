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
   PULSE1:
     LUCE.switch1 = ON
   PULSE2:
     esegui PULSE1
     Delay 2 s
     esegui PULSE1
   * Se il relay utilizzato (nome LUCE) NON possiede la funzione 'inching', ma possiede la funzione 'countdown':
   PULSE1:
     LUCE.switch1 = ON
     LUCE.countdown1 = 1
   PULSE2:
     esegui PULSE1
     Delay 2 s
     esegui PULSE1

* **device virtuali** <br>
      
1. Occorrono 2 relay virtuali (oppure un relay virtuale a 2 gang) - vedi §E del post https://www.facebook.com/groups/tuyaitalia/permalink/1387395731894776/ - Costano 0€ e sono affidabili , non usando la rete!<br>
Chiamiamo i due relay virtuali **NOW** e **NEXT**.<br>
Utilizzeremo il 'countdown' dei due relay per memorizzare lo 'stato' della tua lampada: `NOW.countdown` sarà lo stato attuale, mentre `NEXT.countdown` sarà lo stato desiderato.<br>
**Nota:** _Normalmente countdown conta all'indietro, un'unità al secondo! Nei device 'virtuali' non c'è il processore del device, ovviamente, quindi countdown non varia: è semplicemente una memoria per un valore numerico - quindi DEVONO essere usati relè virtuali; questa soluzione NON funziona con smart relay REALI.
2. _ Potremmo codificare lo stato della lampada con numeri qualsiasi, ad esempio scegliamo 1, 2, 3 per OFF, FULL, HALF, nella sequenza di attivazione della lampada.

* **Comandi**
I comandi per cambiare luce alla lampada, saranno 3 tap_to_run, che si limiteranno a mettere il valore voluto in `NEXT.countdown`
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

        _U = f(S, I)  cioè l'uscita è funzione dello stato attuale e dell'input_
        
Con Tuya, non è possibile passare valori ad una funzione: dobbiamo scrivere una funzione per ogni combinazione di S e I e usare le condizioni ('Se') per selezionare l'automazione da usare. <br>
Tutte le combinazioni possibili sono 9 (3x3) ma in tre casi NON si deve fare nulla (quando NOW e NEXT sono uguali: e.g. SPEGNERE quando è già spenta: non si deve fare nulla). <br>
Quindi in totale 6 automazioni! Cosa devono fare queste automazioni? <br>
a) Dare il numero corretto di impulsi al relay della luce: <br>
Useremo i tap-to-run già visti, PULSE1 e PULSE2. <br>
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

### Problema 1 - Sincronizzazione luce automa.








