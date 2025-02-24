### Pattern 
_Toggle and counters_


### Spiegazione del Pattern e Implementazioni

**Modello Concettuale**  
L'operazione 'TOGGLE' equivale ad una inversione di stato (e.g. di un relay) se prima era ON diventa OFF e viceversa, se era OFF diventa ON.<br>
Attualmente (2025) in molti dispositivi Tuya è disponibile come opzione per il valore di un attributo (come 'toggle' o 'inverti stato'), anche se è implementato come nuova 'azione' globale (alla stregua di 'ritardo' - delay - etc..). Vedi screenshot:
![Screenshot_20250223-115539](https://github.com/user-attachments/assets/5f223434-b0f2-4e99-99ba-c380ac12b10a)

Questo aggiornamento rende superflue le 'automazioni' utilizzate per simulare questa funzionalità: attualmente è disponibile per tutti gli switch e relay.

Questa funzione è utile per implementare contatori binari (i.e. in base 2, quindi 2,4,8,16, 32...) e contatori in una base qualsiasi (leggermente più complessi).

Esempio: simulazione relay passo-passo Finder

I relay elettromeccanico ad impulsi (Finder) sono molto usati negli impianti domestici per controllare una o più luci con uno o più pulsanti. Il modello 26 permette di gestire due luci, con varie sequenze a seconda del tipo:

![finder01](https://github.com/user-attachments/assets/1fa05d9d-947a-4944-a6ed-d1b5cc226ee5)

Ovviamente le sequenze sono predefinite meccanicamente, e NON possoo essere cambiate senza cambiare il relat finder.

Da qui l'interesse ad usare smart relay al posto dei relay Finder.


Prendimo in caso con 2 luci (o gruppi di luci): Si possono avere in tutto 4 possibilità (0 = spento, 1 = acceso): 00, 01, 10, 11, che come si vede, rappresentano una sequenza di conteggio binario.
Questa è la sequenza più semplice da implementare per 1, 2, 3 etc. luci!



