### **IOTrest: Un ponte REST per i tuoi dispositivi Tuya**

#### **Introduzione**

**IOTrest** è un'estensione per **IoTwebUI** che trasforma i tuoi dispositivi Tuya in _**servizi web**_ accessibili tramite semplici richieste HTTP. Oltre a consentire la lettura dei dati dei tuoi dispositivi, IOTrest ti permette di interagire con essi in modo avanzato, attivando scene, regole e ricevendo avvisi in tempo reale.

#### **Funzionalità principali**

* **Accesso ai dati:** Leggi i valori attuali dei sensori (temperatura, umidità, ecc.) e lo stato degli attuatori (luci, prese, ecc.).
* **Automazione:** Invia richieste REST per attivare scene e regole preconfigurate in IoTwebUI e Tuya Smart/SmartLife.
* **Avvisi:** Ricevi avvisi in tempo reale sugli eventi che si verificano sui tuoi dispositivi (allarmi, cambi di stato, ecc.).
* **Semplicità d'uso:** Interfaccia REST intuitiva e ben documentata. I risultati sono in formato testo oppure array od oggetti js.
* **Flessibilità:** Personalizza le tue interazioni con i dispositivi grazie alle numerose opzioni di configurazione.

#### **Architettura**

IOTrest si integra perfettamente con IoTwebUI e sfrutta le sue potenti funzionalità di gestione dei dispositivi Tuya. Le richieste HTTP inviate a IOTrest vengono tradotte in comandi per IoTwebUI, che a sua volta interagisce con Tuya Cloud.

#### **Installazione e configurazione**

1. **Prerequisiti:**
   * Node.js installato sul tuo sistema.
       * Window, Linux, macOS: vedi https://nodejs.org/en/download/prebuilt-installer.
       * Android: vedi https://nodered.org/docs/getting-started/android, fermandosi SENZA installare node-red:  `npm i -g --unsafe-perm node-red`
                  Oppure se si vuole installare un server 24/7 con anche tuyaDAEMON (DB, Apache) vedi qui: https://github.com/msillano/tuyaDAEMON/wiki/80.-deployment:-android-server#2022-update  
   * IoTwebUI ver. 2.2 o superiore, configurato e funzionante: vedi https://github.com/msillano/IoTwebUI
2. **Installazione:**
   * Clona il repository IOTrest da GitHub.
   * Esegui il comando di installazione delle dipendenze.
3. **Configurazione:**
   * Modifica il file di configurazione per specificare le credenziali di accesso a IoTwebUI e le impostazioni di rete.

#### **Utilizzo**

**Esempio di richiesta:**

```bash
POST http://tuo_server/tuyaREST/scenes/scene_id/activate
```

**Risposta:**

```json
{
  "status": "success",
  "message": "Scena attivata correttamente"
}
```

#### **Considerazioni importanti**

* **Sicurezza:** Per motivi di sicurezza, si consiglia di eseguire IOTrest su una rete locale e di non esporlo direttamente a Internet.
* **Limiti:** Le prestazioni di IOTrest dipendono dalle risorse hardware del tuo sistema e dal numero di dispositivi Tuya connessi.
* **Supporto:** IOTrest supporta tutti i dispositivi Tuya compatibili con IoTwebUI.
* **Errori:** IOTrest gestisce gli errori in modo robusto, fornendo messaggi di errore chiari e dettagliati.

#### **Conclusioni**

IOTrest è lo strumento ideale per chi desidera creare soluzioni personalizzate per la gestione dei propri dispositivi Tuya. Grazie alla sua flessibilità e alla sua facilità d'uso, TuyaREST ti permette di automatizzare le tue attività domestiche e di creare esperienze utente uniche.


