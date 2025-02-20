### Pattern 
_Filtro per eventi brevi_


### Spiegazione del Pattern e Implementazioni

**Modello Concettuale**  
Rileva quando un evento inizia (`startDevice.start = true`) e termina (`stopDevice.stop = true`). Se la durata supera `durataMinima`, attiva un'azione (`segnale.attivo = true`).

**Esempi**
*  Un messaggio "Per favore, chiudere la porta!" se una porta resta aperta per più di 4 minuti.
*  Una notifica se il consumo di casa supera 3.3 KW per più di 10 minuti

---
### Implementazione 1 ('local linking' con Switch Zigbee)
**Device**: _Switch Zigbee (SWITCH) con funzione countdown. Le altre funzioni dello switch (ON/OFF, etc.) possono essere usate in modo indipendente per altri scopi_.

**Codice**

```
// Automazione A1
SE (test_dispositivo(startDevice, start, =, true))
POI (set_device_status(SWITCH, countdown, xxx))    // Nota: xxx va sostituito con (100 + durataMinima) 

// Automazione A2
SE (test_dispositivo(stopDevice, stop, =, true))
POI (set_device_status(SWITCH, countdown, 0), set_device_status(segnale, attivo, false))

// Automazione A3
SE (test_dispositivo(SWITCH, countdown, =, 100))
POI (set_device_status(SWITCH, countdown, 0), set_device_status(segnale, attivo, true))
```

```mermaid
%%{init: {'flowchart': {'nodeSpacing': 10, 'rankSpacing': 30}}}%%
flowchart 
direction LR

    subgraph Automazione A3
        direction TB
        A3_Start([Start]) --> A3_Cond{"test_device('SWITCH', 'countdown', '=', 100)?"}
        A3_Cond -->|Sì| A3_Action["set_device_status('SWITCH', 'countdown', 0)<br>set_device_status('segnale', 'attivo', true)"]
    end
    
    subgraph Automazione A2
        direction TB
        A2_Start([Start]) --> A2_Cond{"test_device('stopDevice', 'stop', '=', true)?"}
        A2_Cond -->|Sì| A2_Action["set_device_status('SWITCH', 'countdown', 0)<br>set_device_status('segnale', 'attivo', false)"]
    end

    subgraph Automazione A1
        direction TB
        A1_Start([Start]) --> A1_Cond{"test_device('startDevice', 'start', '=', true)?"}
        A1_Cond -->|Sì| A1_Action["set_device_status('SWITCH', 'countdown', 100 + durataMinima)"]
    end
    
```

**Logica**:  

1. **Avvio Timer**:  
   - All'evento di start, imposta il countdown a `100 + durataMinima` secondi.  
   - Esempio: Se `durataMinima = 240s` (4 minuti), il countdown parte da **340s**.  
2. **Interruzione**:  
   - Se arriva lo stop, il countdown viene resettato a **0** (annulla il timer) e l'output a "false".  
3. **Trigger dell'Azione**:  
   - Quando il countdown raggiunge **100**, significa che sono trascorsi `durataMinima` secondi (es. 340 - 100 = 240s).  
   - A questo punto, attiva `segnale.attivo` e resetta il timer.

![image](https://github.com/user-attachments/assets/ee6314ff-1d04-40ff-bc07-8f30e68f9103)<br>
<b>A</b>: Input &nbsp; <b>B</b>: Output &nbsp; <b>C</b>: Countdown > 0 

**Vantaggi**:  
- **Affidabile**: Funziona offline, senza dipendenze cloud.  
- **Reattivo**: Gestisce correttamente interruzioni e riavvii.

nota: se è complesso inserire in SmartLife un countdown di 100 (s), usate pure i minuti: 120 = 2 minuti; ritardo 240s = 4 minuti, totale 6 minuti.

---

### Implementazione 2 (REGOLE di IoTwebUI)

**Vantaggi**
* `startDevice` e `stopDevice` sono un'unica device: si misura la durata dello stato 'TRUE' (e.g. "Sensore porta.doorcontact_state")
* La potenza delle REGOLE e delle MACRO rende molto semplice e compatto il codice necessario
* `VOICE()` permette di utilizzare messaggi vocali in modo intuitivo.
* Le azioni immediate disponibili sono, oltre a VOICE(testo): beep, pop-up(testo), suona(file), esegui(tap_to_run)


**Codice**

```
if(ISTRIGGERH( CONFIRMH( GET("Sensore porta", "doorcontact_state") , "04:00"))) VOICE("chiudere la porta, grazie");
```

**Spiegazione**
* **GET** (`device`, `attributo`) è una MACRO che ritorna lo `stato` di `device.attributo` (VERO/FALSO)
* **CONFIRMH** (`evento`, `durata`) è una MACRO che ritorna vero solo se `evento` è H (VERO) per almeno il tempo `durata`, altrimenti ignora evento.
* **ISTRIGGERH** (`evento`) è una MACRO che trasforma un evento in _trigger_: è cioè VERO per un solo run, quando `evento` passa da FALSO a VERO.
* **if** (`condizione`) `azione` è il costrutto usuale js (può avere `else`)
* **VOICE** (`testo`) è una MACRO che pronuncia il `testo` nella lingua di default. <br>
Vedi [documentazione di riferimento](https://github.com/msillano/IoTwebUI/blob/main/LEGGIMI30.md#macro-per-risorse) per le MACRO.

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
- Se si usa già per altri motivi **IoTwebUI** (e.g. menu di interfaccia in un tablet) prendere in considerazione la **Implementazione 2** perchè più adattabile.
