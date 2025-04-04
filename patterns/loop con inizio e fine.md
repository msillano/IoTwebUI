### Pattern 
_Loop con inizio e fine_


### Spiegazione del Pattern e Implementazioni

**Modello Concettuale**  
Un ciclo esegue una serie di operazioni (es. accensione/spegnimento di un dispositivo) in modo ripetuto. Il loop viene avviato da una condizione iniziale e terminato da una condizione finale.

**Esempi**
* Luci lampeggianti di allarme
*  irrigazione: da un orario di inizio ad uno di fine, viene ripetuto un periodo di irrigazione seguito da un periodo di pausa.
---

### Implementazione 1 ('local linkage' e Switch Zigbee)
**Device**: _Switch Zigbee (SWITCH) con funzione di CONTROL e timer_. 

**Codice**

```ruby
A1. Automazione (trigger iniziale)
SE (giorno_orario_definito("06:00", "tutti i giorni"))  // condixzione start - esempio
POI (
   set_device_status("irrigatore", "attivo", false)  
   set_device_status("SWITCH", "stato", true),       // set ON CONTROL SWITCH
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
    test_dispositivo("SWITCH", "stato", "==", true)       // se CONTROL SWITCH ON
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
- **Switch come control**: Può essere disattivato manualmente in emergenza o esteso con altre condizioni (e.g. sensore pioggia). 
- **output**: CONTROL SWITCH ON ha il significato 'loop in corso' e può essere usato come evento, e.g. pilotare una spia. 

**Modello**<br>
Può essere semplificato come un _black-box_, con tre ingressi (`start`, `stop`, `done-loop`) e due uscite (`run-loop`, `status`).

![image](https://github.com/user-attachments/assets/a1f6d7aa-a4cc-4528-a816-6a550c72761e)

---

### Implementazione 2 ('local linkage' e Switch Zigbee)

**Device**: 
* _Switch Zigbee (MASTER) con funzione di master._ <br>
* _Switch Zigbee (SLAVE) con funzione di slave (Opzionale)._ <br>
* evento CONTROLLO: se VERO, il loop è eseguito.

**Codice**

```ruby
AL1) Automazione (OFF step)
Se (test_dispositivo("CONTROLLO", "enable", true)     // condizione di Loop
   AND test_dispositivo("MASTER", "Switch_1", false))
Poi (
   set_device_status("SLAVE", "Switch_1", true),     //  SLAVE  (optional)
   set_ritardo(0:04:00),                             // Fase OFF: e.g. 4 minuti  )   
   set_device_status("MASTER", "Switch_1", true)
   )  

AL2) Automazione (ON step)
Se (test_dispositivo("CONTROLLO", "enable", true)     // condizione di Loop
   AND test_dispositivo("MASTER", "Switch_1", true))
Poi (
   set_device_status("SLAVE", "Switch_1", false),    //  SLAVE  (optional)
   set_ritardo(0:02:00),                             // Fase ON: e.g. 2 minuti  )   
   set_device_status("MASTER", "Switch_1", false)
   )  
```

![image](https://github.com/user-attachments/assets/16cd38cb-9338-4825-8419-18456c2b0251)

**Logica**:  
Questa implementazione utilizza due automazioni (AL1 e AL2) per gestire un ciclo ON / OFF  di due dispositivi Zigbee: un master e uno slave opzionale. La logica è controllata da un evento esterno ("CONTROLLO") che, se attivo (true), permette l'esecuzione del loop. 

![image](https://github.com/user-attachments/assets/403f14f5-80fc-41c6-b2e9-d39cef6a0ddd)

- **AL1 (OFF step)**: Quando il dispositivo "CONTROLLO" è attivo e lo switch del master è spento (false), l'automazione accende lo switch dello slave (se presente), imposta un ritardo di 4 minuti (fase OFF), e poi accende lo switch del master.
  
- **AL2 (ON step)**: Quando il dispositivo "CONTROLLO" è attivo e lo switch del master è acceso (true), l'automazione spegne lo switch dello slave (se presente), imposta un ritardo di 2 minuti (fase ON), e poi spegne lo switch del master.

**Vantaggi**:
  
1. **Flessibilità**: L'uso di uno slave opzionale permette di estendere la funzionalità del sistema senza dover modificare il codice principale. Questo rende la soluzione adattabile a diverse esigenze.

2. **Controllo Ciclico**: Il loop di accensione e spegnimento è gestito in modo autonomo, con tempi predefiniti (e.g.: 4 minuti OFF e 2 minuti ON), il che lo rende ideale per applicazioni come l'illuminazione temporizzata o il controllo ciclico di dispositivi.

3. **Semplicità di Implementazione**: Il codice è semplice e modulare, facilitando la manutenzione e l'aggiunta di nuove funzionalità da eseguire in fase ON o in fase OFF.

-----

### Implementazione 3 (Cloud linkage)

**Device**: _Non richiede device dedicate_. 

**Codice**

```ruby
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
-----

### Implementazione 4 ('local linkage' e Switch Zigbee)

**Device**: _Uso di uno switch reale, con la funzione 'circulate' o 'tempo di ciclo'_. 

Questa implementazione è solo HW e richiede un relay reale (non virtuale), si sfruttano le proprietà del timer 'circulate' che ha un tempo di inizio, un tempo di fine, e, all'interno di questi limiti, un tempo ON ed un tempo OFF! Esattamente quello che serve per un loop.
Basta quindi usare lo stato dello switch (eventualmente collegato al carico utile).
Vedi un esempio di device [con la funzione 'circulate'](tuyaDAEMON/devices/smart_breaker/device_smart_breaker.pdf).

-----

### Implementazione 5 ('local linkage' e Switch Zigbee + ESP01S (ESP3266))

**Device**: _Uso di uno switch reale, più un ESP01S programmato ad hoc_. 

![esp01-02](https://github.com/user-attachments/assets/ea6eaf65-409b-411d-b6c5-6f81525e3bfc)

Soluzione forse eccessiva, usata come "proof of concept" della possibilità di modding dei device Tuya. Minimo periodo 6 secondi (periodi più brevi mandano in pairing lo smart switch). In pratica un generatore di onde quadre controllato.

Vedi dettagli [BLINK-ESP01S](https://github.com/msillano/IoTwebUI/blob/main/DIY%20ESP3266/Modding%20switch/LEGGIMI.md#esempio-2--blink-esp01-integrazione-tuya--esp3266)

-----
### Raccomandazioni
- **Preferire Implementazione 4** (Zigbee): più robusta e affidabile, oppure **Implementazione 1**, affidabile.  
