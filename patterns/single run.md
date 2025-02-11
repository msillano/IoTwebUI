### Pattern 
_single run_


### Spiegazione del Pattern e Implementazioni

**Modello Concettuale**  
Una serie di attività da eseguire al massimo una volta al giorno

**Esempio**
*  irrigazione: Un ciclo di irrigazione (e.g. 15 minuti) da eseguire su comando dell'utente, magari solo se non piove.
---

### Implementazione 1 ('local linkage' e Switch Zigbee)
**Device**: <br>
_Switch Zigbee (switch_acqua) con funzione di master_. <br>
_Scene Switch Zigbee (start_button) con di user start_. <br>
_extra: Switch Zigbee (lock_switch) con funzione di signal_

**Codice**

```
Attivazione Irrigazione: 
SE (trigger(test_dispositivo(start_button, switch1, =, short)) 
   AND test_dispositivo(lock_switch, switch1, =, OFF)) 
POI (
    set_device_status(lock_switch, switch1, ON)
    set_device_status(switch_acqua, switch1, ON),
    set_ritardo(900),                             // 900s = 15 minuti
    set_device_status(switch_acqua, switch1, OFF),
)

Reset Lock: 
  SE (trigger(giorno_orario_definito(00:10, tutti i giorni))) 
  POI (
    set_device_status(lock_switch, switch1, OFF)
)
```


**Logica**: 
 
**Fine**:
```mermaid
```

**Vantaggi**:  

---

### Implementazione 2 (Cloud linkage)

**Device**:
_Switch Zigbee (switch_acqua) con funzione di master_. <br>
_Scene Switch Zigbee (start_button) con di user start_. <br>

**Codice**

```
Attivazione Irrigazione: 
 SE (trigger(test_device(start_button, switch1, short))) 
 POI (
    set_device_status(switch_acqua, ON, 1),
    set_ritardo(900s),
    set_device_status(switch_acqua, OFF, 0),
    disabilita_automazione(Attivazione Irrigazione)
)

riattiva_sequenza: 
SE (trigger(giorno_orario_definito(00:10, tutti i giorni)))
 POI (
    abilita_automazione(attiva_sequenza)
)
```
**Logica**: 
 
**Fine**:

```mermaid
```

**Vantaggi**:  

---

### Raccomandazioni
