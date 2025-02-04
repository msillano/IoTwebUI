### Pattern 
_Loop con inizio e fine_


### Spiegazione del Pattern e Implementazioni

**Modello Concettuale**  
Un ciclo esegue una serie di operazioni (es. accensione/spegnimento di un dispositivo) in modo ripetuto. Il loop viene avviato da un trigger iniziale e terminato da un trigger finale. Una logica di ripresa garantisce che il ciclo si riavvii automaticamente dopo ogni completamento.

**Esempi**
*  irrigazione: da un orario di inizio ad uno di fine, viene ripetuto un periodo di irrigazione segito da un periodo di pausa.

---
### Implementazione 1 ('local linking' con Switch Zigbee)
**Device**: Switch Zigbee (SWITCH) con funzione di flag e timer. 

**Codice**

```
A1. Automazione (trigger iniziale)
SE (giorno_orario_definito("06:00", "ogni_giorno"))
POI (
   set_device_status("irrigatore", "attivo", false)  // condizione iniziale
   set_device_status("SWITCH", "stato", true),       // Abilita i cicli
   set_device_status("SWITCH", "countdown", 50400)   // Countdown fino al tramonto (14h * 3600s))

E2. tap-to-run (azioni cicliche)
SE (esegui())
POI (
    set_ritardo(0:58:00), // Fase OFF: 58 minuti
    set_device_status("irrigatore", "attivo", true), // Accensione irrigatore
    set_ritardo(0:02:00), // Fase ON: 2 minuti
     set_device_status("irrigatore", "attivo", false) // Spegnimento irrigatore
     
A3. Automazione (riavvio loop)
SE (
    test_dispositivo("SWITCH", "stato", "==", true) // Switch ON
  AND
    test_dispositivo("irrigatore", "attivo", "==", false) // Ciclo precedente completato
  )
POI (
   start_tap_to_run("E2") // Riavvio immediato del ciclo
  )

A4. Automazione (opzionale - backup fine al tramonto)
SE (giorno_orario_definito("20:00", "ogni giorno"))
POI (
   set_device_status("SWITCH", "stato", false), // Blocco finale definitivo
   set_device_status("irrigatore", "attivo", false)
   )

```


**Logica**:  
A1. **Avvio**:  
   - Lo switch viene attivato e imposta un countdown fino al tramonto (14h nell'esempio).
   - La combinazione di switch ON e irrigatore OFF attiva A3: Automazione di Ripresa → parte il primo ciclo

E2. **Ciclo**
 - 58 minuti di irrigatore spento (ritardo iniziale).
 - 2 minuti di irrigatore acceso.
 - Al termine, l'irrigatore è OFF → Automazione di Ripresa riavvia il ciclo solo se lo switch è ancora ON. IMPORTANTE: è necessaria una condizione univoca di fine ciclo

A3. **Termine**
  - Il countdown dello switch raggiunge zero → switch si spegne automaticamente.
  - Automazione di Ripresa non parte più (switch OFF).

A4. **Backup** 
    - Questa l'automazione spegne comunque tutto alle 20:00.

**Vantaggi**:  
- **Loop flessibile**: Azioni e durata del loop sono definite in modu indipendente in E2.  
- **Spegnimento garantito**: Doppia sicurezza (countdown + automazione A4).
- **Switch come master**: Può essere disattivato manualmente in emergenza o esteso con altre condizioni (es. sensore pioggia). 
- **output**: ha il significato 'loop in corso' e può direttamente pilotare una spia. 

---

### Implementazione 2 (REGOLE di IoTwebUI)

**Vantaggi**
* `startDevice` e `stopDevice` sono un'unica device: si misura la durata dello stato 'TRUE' (e.g. "Sensore porta", "doorcontact_state")
* La potenza delle REGOLE e delle MACRO rende molto semplice e compatto il codice necessario
* `VOICE()` permette di utilizzare messaggi vocali in modo intuitivo.
* Le azioni immediate disponibili sono, oltre a VOICE(): beep, pop-up, suona(file), esegui(tap_to_run)


**Codice**

```
if(ISTRIGGERH( CONFIRMH(GET("Sensore porta", "doorcontact_state") , "04:00"))) VOICE("chiudere la porta, grazie");
```

**Svantaggi**:  
- **Latenza**: A causa dei vari tempi di polling, può presentare ritardi che lo rendono inadatto a tempi troppo brevi  
- **Server**: Richiede IoTwebUI in funzione.

---
### Esempi Pratici
1. **Porta Aperta**:  
   - Implementazione 1: Lo switch Zigbee conta 340s. Se la porta viene chiusa prima di 240s, il timer si annulla. A 100s rimanenti (240s trascorsi), parte l'allarme.  
   - Implementazione 2: Un messaggio vocale avverte che la posta è aperta dopo 5.5 minuti (+/- 90s)
   

2. **Consumo Elettrico**:  
   - Analogamente, se il consumo supera 3.3KW per >10 minuti, la notifica avviene solo dopo il superamento della durata minima.

---

### Raccomandazioni
- **Preferire Implementazione 1** (Zigbee) se possibile: più robusta e immediata.  
- Se si usa già per altri motivi **IoTwebUI** (e.g. menu di interfaccia) prendere in considerazione la **Implementazione 2** perchè più adattabile.
