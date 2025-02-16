### Pattern 
_Loop con inizio e fine_


### Spiegazione del Pattern e Implementazioni

**Modello Concettuale**  
Un ciclo esegue una serie di operazioni (es. accensione/spegnimento di un dispositivo) in modo ripetuto. Il loop viene avviato da una condizione iniziale e terminato da una condizione finale. Una logica di ripresa garantisce che il ciclo si riavvii automaticamente dopo ogni completamento.

**Esempio**
*  irrigazione: da un orario di inizio ad uno di fine, viene ripetuto un periodo di irrigazione seguito da un periodo di pausa.
---

### Implementazione 1 ('local linkage' e Switch Zigbee)
**Device**: _Switch Zigbee (SWITCH) con funzione di master e timer_. 

**Codice**

```
A1. Automazione (trigger iniziale)
SE (giorno_orario_definito("06:00", "tutti i giorni"))  // condixzione start - esempio
POI (
   set_device_status("irrigatore", "attivo", false)  
   set_device_status("SWITCH", "stato", true),       // set ON master SWITCH
   set_device_status("SWITCH", "countdown", 50400)   // Countdown fino al tramonto
                                                     // 20:00 - 06:00 = 14h →  14 * 3600s
  )

E2. tap-to-run (azioni cicliche)
SE (esegui())
POI (
    set_ritardo(0:58:00), // Fase OFF: 58 minuti
    set_device_status("irrigatore", "attivo", true), // Accensione irrigatore - esempio
    set_ritardo(0:02:00), // Fase ON: 2 minuti
    set_device_status("irrigatore", "attivo", false) // Spegnimento irrigatore - esempio
  )
     
A3. Automazione (riavvio loop)
SE (
    test_dispositivo("SWITCH", "stato", "==", true)       // se master SWIRCH ON
  AND                                                     // AND (tutte le condizioni...)
    test_dispositivo("irrigatore", "attivo", "==", false) // Ciclo precedente completato
  )
POI (
   start_tap_to_run("E2") // Riavvio immediato del ciclo
  )

A4. Automazione (opzionale - backup fine al tramonto)
SE (giorno_orario_definito("20:00", "tutti i giorni"))  
POI (
   set_device_status("SWITCH", "stato", false)          // Blocco Master
   )

```


**Logica**:  
A1. **Avvio**:  
   - Lo switch viene attivato e imposta un countdown fino al tramonto (14h nell'esempio).
   - La combinazione di switch ON e irrigatore OFF attiva A3: Automazione di Ripresa → parte il primo ciclo

E2. **Ciclo**
 - 58 minuti di irrigatore spento (ritardo iniziale).
 - 2 minuti di irrigatore acceso.

A3. **Riavvio loop**
 - Al termine di E2, l'irrigatore è OFF → Automazione di Ripresa riavvia il ciclo solo se lo SWITCH è ancora ON. IMPORTANTE: è necessaria una condizione univoca di fine ciclo.

XX. **Fine**
  - Il countdown dello switch raggiunge zero → SWITCH si spegne automaticamente.
  - Automazione di Ripresa non parte più (SWITCH OFF).

A4. **Backup** 
    - Questa automazione spegne comunque SWITCH alle 20:00.

**Vantaggi**:  
- **Loop flessibile**: Azioni e durata del loop sono definite in modo indipendente in E2.  
- **Spegnimento garantito**: Doppia sicurezza (countdown + automazione A4).
- **Switch come master**: Può essere disattivato manualmente in emergenza o esteso con altre condizioni (e.g. sensore pioggia). 
- **output**: master SWITCH ON ha il significato 'loop in corso' e può essere usato come evento, e.g. pilotare una spia. 

**Modello**<br>
Può essere semplificato come un _black-box_, con tre ingressi (`start`, `stop`, `done-loop`) e due uscite (`run-loop`, `status`).

![image](https://github.com/user-attachments/assets/a1f6d7aa-a4cc-4528-a816-6a550c72761e)



---

### Implementazione 2 (Cloud linkage)

**Device**: _Non richiede device dedicate_. 

**Codice**

```
A1) Automazione (trigger iniziale)
Se (cambio_condizione_meteo("sole", "alba", "0"))  // condizione 'alba' dal Cloud
Poi (
   automazione_abilita("A3"),     // Abilita la ripresa dei cicli
   start_tap_to_run("E2")         // Avvia il primo ciclo
  )   

E2. tap-to-run (azioni cicliche)
Se (esegui())
Poi (
   set_ritardo(0:58:00), // Fase OFF: 58 minuti
   set_device_status("irrigatore", "attivo", true),  // Fase ON: accensione
   set_ritardo(0:02:00), // Fase ON: 2 minuti
   set_device_status("irrigatore", "attivo", false)  // Trigger per riavvio
  )

A3. Automazione (riavvio loop)
Se (test_dispositivo("irrigatore", "attivo", "==", false))
Poi (
   start_tap_to_run("E2") // Riavvio del ciclo
   )

A4. Automazione (fine al tramonto)
Se (cambio_condizione_meteo("sole", "tramonto", "0")) // condizione 'tramonto' dal Cloud
Poi (
    automazione_disabilita("A3"),                     // Disabilita la ripresa
    set_device_status("irrigatore", "attivo", false)  // OFF device - opzionale
)
```
```mermaid
sequenceDiagram
 @actor U as userstart
 A1
 @control E2
 A3
 A4
 @entity O as OUTPUT

 U -> A1: "orario = 06:00" {
   A1-> E2. "start_tap_to_run(E2)"{
        E2: ritardo(58m) 
        O: status => ON 
        E2: ritardo(2m)
        O: status => OFF 
        }
    }
 O -> A3: test_dispositivo(OFF)
 A3 -> E2: start_tap_to_run("E2") 
 U -> A4: "orario = 20:00"
 A4 -> A3: disabilita(A3)
```
---

### Raccomandazioni
- **Preferire Implementazione 1** (Zigbee) se possibile: più robusta e immediata.  
