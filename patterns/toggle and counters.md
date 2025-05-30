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

I relay elettromeccanico ad impulsi (Finder) sono molto usati negli impianti domestici per controllare una o più luci con uno o più pulsanti. Il modello 26. ad esempio, permette di gestire due luci tramite pulsanti, con varie sequenze a seconda del tipo:

![finder01](https://github.com/user-attachments/assets/1fa05d9d-947a-4944-a6ed-d1b5cc226ee5)

Ovviamente le sequenze sono predefinite meccanicamente, e NON possono essere cambiate senza cambiare il relay Finder.

Da qui l'interesse ad usare smart relay al posto dei relay Finder.

---
### Implementazione 1: contatore binario up ('local linking' con Switch Zigbee)

**Device**:  _N Switch Zigbee (BIT0, BIT1,...) di cui uno con controllo da pulsante (reset rocker)_.

Prendimo in caso con 2 luci (o gruppi di luci): Si possono avere in tutto 4 possibilità (0 = spento, 1 = acceso): 00, 01, 10, 11, che come si vede, rappresentano una sequenza di conteggio binario.
Questa è la sequenza più semplice da implementare per 1, 2, 3 etc. luci: occorrono 1, 2, 3 etc. smart relay. Il primo (BIT0) è collegato sia ai pulsanti che ad una luce, gli altri sono collegati solo alle luci:

![fig001](https://github.com/user-attachments/assets/08601739-e811-4408-8b76-de448febe187)

**Codice**
```ruby
// comando di BIT0 da user, alternativa ai pulsanti 
     Se ( 
        trigger( test_dispositivo( "USER", "Switch_1", false)))
     Poi (
        set_device_status("BIT0","Switch_1","toggle"))

// per BIT1 - analogo per BIT2,...
 TU1:
     Se ( 
        trigger( test_dispositivo( "BIT0", "Switch_1", false)))
     Poi (
        set_device_status("BIT1","Switch_1","toggle"))
```
  ![image](https://github.com/user-attachments/assets/5107e6c2-f0ef-4927-b579-50bd101a3cd3)
Simulazione, usando 'loop' come ingresso.

---
### Implementazione 2: contatore binario down ('local linking' con Switch Zigbee)

**Device**:  _N Switch Zigbee (BIT0, BIT1,...)  con controllo da pulsante (reset rocker)_.

La sequenza inversa, cioè il conteggio all'indietro (11, 10, 01, 00), è altrettanto facile da realizzare:
**Codice**
```ruby
// comando di BIT0 da user, alternativa ai pulsanti
     Se ( 
        trigger( test_dispositivo( "USER", "Switch_1", false)))
     Poi (
        set_device_status("BIT0","Switch_1","toggle"))


TD1:                        // per BIT1 - analogo per BIT2,...
     Se ( 
        trigger( test_dispositivo( "BIT0", "Switch_1", true)))
     Poi (
        set_device_status("BIT1","Switch_1","toggle"))
```
![Screenshot 2025-02-25 082700](https://github.com/user-attachments/assets/923caad3-f436-4a5b-99cf-ff0faa399aa6)

---
### Implementazione 3: contatore up in una base qualsiasi ('local linking' con Switch Zigbee)

**Device**:  _N Switch Zigbee (BIT0, BIT1,...) con controllo da pulsante (reset rocker)_.

Per contare invece in una base qualsiasi (esempio, base 3, conteggio: 0, 1, 2, 0, 1... ovvero: 00, 01, 10, 00, 01..) 
occorrono N relay, con N  tale che  2<sup>N-1</sup> &lt; base &lt;= 2<sup>N</sup> con le automazione per avere un contatore binario 'up', ed aggiungere una 'automazione' di 'reset': che cioè porti a 00 una volta arrivati alla base (3 nell'esempio)<br>
nota: mentre il conteggio binario non presenta glitch, il contatore in una base qualsiasi, con funzionamentoo sequenziale, può presentare 'glitch' (come lampeggi spuri delle luci).

**Codice**
```ruby
// comando di BIT0 da user, alternativa ai pulsanti
     Se ( 
        trigger( test_dispositivo( "USER", "Switch_1", false)))
     Poi (
        set_device_status("BIT0","Switch_1","toggle"))

TU1:                   // per BIT1 - analogo per BIT2,...
     Se ( 
        trigger( test_dispositivo( "BIT0", "Switch_1", false)))
     Poi (
        set_device_status("BIT1","Switch_1","toggle"))

RST3:                  // per avere il reset a 3
     Se ( 
        trigger( test_dispositivo( "BIT0", "Switch_1", true)
              AND
                 test_dispositivo( "BIT1", "Switch_1", true)))
     Poi (
        set_device_status("BIT0","Switch_1",false))

```
![image](https://github.com/user-attachments/assets/4e232f17-dd66-4548-a147-53c95b8265d5)


---
### Implementazione 4: counter by 3, with master-slave (Cloud link)

Per evitare i glitch dell'implementazione 3, si può aggiungere un secondo relay ad ogni relay contatore, in funzione di 'slave', controllato dal master. 
**Codice**
```ruby
// comando di BIT0 da user, non direttamente con pulsanti!
     Se ( 
        trigger( test_dispositivo( "USER", "Switch_1", true )))  // nota: true!
     Poi (
        set_device_status("BIT0","Switch_1","toggle"))

// per BIT1 - analogo per BIT2,...
TU1:   // simile a Implementazione 3
     Se ( 
        trigger( test_dispositivo( "BIT0", "Switch_1", false)))
     Poi (
        set_device_status("BIT1","Switch_1","toggle"))

RST3:
     Se ( 
        trigger( test_dispositivo( "BIT0", "Switch_1", true)
              AND
                 test_dispositivo( "BIT1", "Switch_1", true)))
     Poi (
        set_device_status("BIT0","Switch_1",false))

// gestione dei relay slave: SL0 e SL1
 Se (
    trigger( test_dispositivo( "USER", "Switch_1", false ))  // nota: false!
 AND ambito(test_dispositivo( "BIT0", "Switch_1", true)))
 Poi (
     set_device_status("SL0","Switch_1",true))

 Se (
    trigger( test_dispositivo( "USER", "Switch_1", false ))  // nota: false!
 AND ambito(test_dispositivo( "BIT0", "Switch_1", false)))
 Poi (
     set_device_status("SL0","Switch_1", false))

 Se (
    trigger( test_dispositivo( "USER", "Switch_1", false ))  // nota: false!
 AND ambito(test_dispositivo( "BIT1", "Switch_1", true)))
 Poi (
     set_device_status("SL1","Switch_1",true))

 Se (
    trigger( test_dispositivo( "USER", "Switch_1", false ))  // nota: false!
 AND ambito(test_dispositivo( "BIT1", "Switch_1", false)))
 Poi (
     set_device_status("SL1","Switch_1", false))
```
![Screenshot 2025-02-25 173927](https://github.com/user-attachments/assets/0f7e4135-3520-4ded-9819-56285c1bd5b8)


note:<br>
* Poichè é necessario usare AMBITO, questa implementazione è solo per 'Cloud linkage'.
* I due relay MASTER possono quindi essere virtuali! I due SLAVE devono essere reali, perchè pilotano il carico.
* Notare come i master comutano sul fronte in salita dell'input, mentre gli slave sul fronte in discesa.
* L'uscita è 'pulita' (senza glitch) e sincrona: tutti i relay SLAVE commutano allo stesso tempo!

