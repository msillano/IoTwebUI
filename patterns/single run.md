### Pattern

*single run*

### Spiegazione del Pattern e Implementazioni

**Modello Concettuale**\
Una serie di attività da eseguire al massimo una volta al giorno su comando

**Esempio**

- irrigazione: Un ciclo di irrigazione (e.g. 15 minuti) da eseguire su richiesta, magari solo se i bambini non giocano in giardino e non piove.

---

### Implementazione 1 ('local linkage' e Switch Zigbee)

**Device**:<br>
*Switch Zigbee (switch\_acqua) con funzione di master*.<br>
*Scene Switch Zigbee (start\_button) con funzione di user start*.<br>
*extra: Switch Zigbee (lock\_switch) con funzione di signal*

**Codice**

```tuya_local
Attivazione task:
SE (trigger(test_dispositivo(start_button, switch1, =, short))
   AND test_dispositivo(lock_switch, switch1, =, OFF))
POI (
    set_device_status(lock_switch, switch1, ON),
    start_tap_to_run( Task irrigazione )
)

Task irrigazione:
SE (trigger( esegui()))
POI (
    set_device_status(switch_acqua, switch1, ON),
    set_ritardo(900),                             // 900s = 15 minuti
    set_device_status(switch_acqua, switch1, OFF)
)

Reset Lock:
  SE (trigger(giorno_orario_definito(00:10, tutti i giorni)))
  POI (
    set_device_status(lock_switch, switch1, OFF)
)
```

**Diagrammi di Flusso**:

```mermaid
graph TD;
    Start[Utente preme start_button] -->|Verifica lock_switch| B{Lock_switch = OFF?};
    B -- Sì --> C[Attiva Irrigazione];
    C --> D[Attesa 15 minuti];
    D --> E[Spegni Irrigazione];
    E --> F[Lock_switch = ON];
    B -- No --> I[Fine - Nessuna azione];
    X[Ora = 00:10] --> Y[Reset Lock];
    Y --> Z[Lock_switch = OFF]
```

---

### Implementazione 2 (Cloud linkage)

**Device**:
*Switch (switch\_acqua) con funzione di master*.<br>
*Scene Switch (start\_button) con funzione di user start*.<br>

**Codice**

```tuya
Attivazione Irrigazione:
 SE (trigger(test_device(start_button, switch1, short)))
 POI (
    set_device_status(switch_acqua, ON, 1),
    set_ritardo(900s),
    set_device_status(switch_acqua, OFF, 0),
    disabilita_automazione(Attivazione Irrigazione)
)

Riattiva Sequenza:
SE (trigger(giorno_orario_definito(00:10, tutti i giorni)))
 POI (
    abilita_automazione(Attivazione Irrigazione)
)
```

**Diagrammi di Flusso**:

```mermaid
graph TD;
    Start[Utente preme start_button] --> B[Attiva Irrigazione];
    B --> C[Attesa 15 minuti];
    C --> D[Spegni Irrigazione];
    D --> E[Disabilita Automazione];
    X[Ora = 00:10] --> Y[Riattiva Automazione];
    Y --> Z[Automazione Abilitata di nuovo]
```

---

### Raccomandazioni

- **Usare Local Linkage** se la priorità è l'affidabilità e si vuole evitare dipendenze dalla connessione internet.
- **Usare Cloud Linkage** se si desidera più flessibilità e se eventuali interruzioni della rete non hanno conseguenze negative.
- In entrambi i casi, verificare che i dispositivi supportino la logica scelta e testare la configurazione prima della messa in uso definitiva.

