### Pattern 
_Filtro per eventi brevi_


### Spiegazione del Pattern e Implementazioni

**Modello Concettuale**  
Rileva quando un evento inizia (`startDevice.start = true`) e termina (`stopDevice.stop = true`). Se la durata supera `durataMinima`, attiva un'azione (`segnale.attivo = true`).

**Esempi**
*  Un messaggio "Per favore, chiudere la porta!" se una porta resta aperta per più di 4 minuti.
*  Una notifica se il consumo di casa supera 3.3 KW per più di 10 minuti

---
### Implementazione 1 (Collegamento Locale con Switch Zigbee)
**Strumento**: Switch Zigbee con funzione countdown. Le altre funzioni dello switch (ON/OFF, etc.) possono essere usate per altri scopi.

**Codice**

```
// Automazione A1
SE (test_dispositivo(startDevice, start, =, true))
POI (set_device_status(SWITCH, countdown, xxx))    // Nota: xxx va sostituito con (100 + durataMinima) 

// Automazione A2
SE (test_dispositivo(stopDevice, stop, =, true))
POI (set_device_status(SWITCH, countdown, 0))

// Automazione A3
SE (test_dispositivo(SWITCH, countdown, =, 100))
POI (set_device_status(SWITCH, countdown, 0), set_device_status(segnale, attivo, true))
```


**Logica**:  
1. **Avvio Timer**:  
   - All'evento di start, imposta il countdown a `100 + durataMinima` secondi.  
   - Esempio: Se `durataMinima = 240s` (4 minuti), il countdown parte da **340s**.  
2. **Interruzione**:  
   - Se arriva lo stop, il countdown viene resettato a **0** (annulla il timer).  
3. **Trigger dell'Azione**:  
   - Quando il countdown raggiunge **100**, significa che sono trascorsi `durataMinima` secondi (es. 340 - 100 = 240s).  
   - A questo punto, attiva `segnale.attivo` e resetta il timer.

**Vantaggi**:  
- **Affidabile**: Funziona offline, senza dipendenze cloud.  
- **Reattivo**: Gestisce correttamente interruzioni e riavvii.

---

### Implementazione 2 (Collegamento Cloud con Tuya)


**Logica**:  
1. **Avvio Delay**:  
   - Allo start, inizia un delay di `durataMinima`.  
   - Se il delay termina senza interruzioni, attiva `segnale.attivo`.  
2. **Interruzione**:  
   - Allo stop, disabilita il delay (A1) per evitare falsi positivi.  
3. **Riattivazione**:  
   - Dopo 4 secondi (o altro valore), un secondo automation (E1) riabilita A1.  

**Limitazioni di Tuya**:  
- Non permette di riabilitare un automation disabilitato nella stessa scena.  
- Soluzione: Usare un tap_to_run separato (E1) con un piccolo delay per riattivare A1.

**Svantaggi**:  
- **Fragile**: Dipende da ritardi cloud e workaround.  
- **Ritardi Potenziali**: Il ripristino di A1 potrebbe non essere immediato.

---

### Esempi Pratici
1. **Porta Aperta**:  
   - Implementazione 1: Lo switch Zigbee conta 340s. Se la porta viene chiusa prima di 240s, il timer si annulla. A 100s rimanenti (240s trascorsi), parte l'allarme.  
   - Implementazione 2: Un delay cloud di 4 minuti. Se la porta viene chiusa, il delay si disabilita e un secondo automation lo riattiva dopo 4 secondi.

2. **Consumo Elettrico**:  
   - Analogamente, se il consumo supera 3.3KW per >10 minuti, il trigger avviene solo dopo il superamento della durata minima.

---

### Raccomandazioni
- **Preferire Implementazione 1** (Zigbee) se possibile: più robusta e immediata.  
- **Implementazione 2** (Cloud) richiede attenzione ai ritardi e alle limitazioni di Tuya. Ottimizzare il delay in E1 (es. 2-10s) per bilanciare reattività e stabilità.
