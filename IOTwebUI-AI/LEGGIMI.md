

# IoTwebUI-AI

**Introduzione:**<br>
[English version](https://github.com/msillano/IoTwebUI/blob/main/IOTwebUI-AI/README.md)

Questo documento introduce il **progetto IoTwebUI-AI**, un _chatbot general purpose integrato con l'ecosistema Tuya_.
Questo ambiente versatile è stato sviluppato per permettere agli utenti più avventurosi di esplorare e sperimentare le potenzialità dell'intelligenza artificiale (AI) in combinazione con dispositivi IoT **Tuya** tramite l'estensione **IoTwebUI**. L'obiettivo principale è fornire uno strumento flessibile per condurre prove e analisi, interagire con i dispositivi IoT presenti e sperimentare le potenzialità dell'AI in questo contesto.


```mermaid
%%{init: {'theme': 'neutral'}}%%
graph LR
    subgraph Chatbot IoTwebUI-AI
        style UI fill:#ccf,stroke:#333,stroke-width:2px
        style UI_JS fill:#f9f,stroke:#333,stroke-width:2px
        style UI_Menu fill:#ccf,stroke:#333,stroke-width:2px
        UI[HTML/CSS] --> UI_JS(JS Functions);
        UI_Menu(ai_verticalMenu.js) -- Configura --> UI_JS;
        UI_JS -- Usa funzioni di --> Proxy(ai_proxy);
    end

    subgraph Backend
        style Proxy fill:#9cf,stroke:#333,stroke-width:2px
        style AIServer fill:#fcc,stroke:#333,stroke-width:2px
        style HistoryDB fill:#f9c,stroke:#333,stroke-width:2px
        style ContextFiles fill:#cff,stroke:#333,stroke-width:2px
        Proxy -- HTTP --> AIServer;
        AIServer <-- Usa API (funzioni) di --> OpenAI;
        AIServer -- Gestisce --> HistoryDB(History Storage);
        AIServer -- Gestisce --> ContextFiles(Context Documents Storage);
        AIServer -- Utilizza   --> IoT(Tuya TOOL);
    end

    subgraph AI Models (Cloud)
        style OpenAI fill:#ace,stroke:#333,stroke-width:2px
        OpenAI -- Interroga  --> Deepseek;
        OpenAI -- Interroga --> GPTModels[Altri OpenAI Model];
     end

    subgraph IoT / Tuya
        style IoT fill:#9fc,stroke:#333,stroke-width:2px
        style IoTwebUI fill:#afe,stroke:#333,stroke-width:2px
        IoT -- REST --> IoTwebUI;
        IoTwebUI -- Legge -->     TuyaDevices[Tuya Devices];
        IoTwebUI -- Controlla --> x_device;
        IoTwebUI -- Esegue --> TuyaAutomations[Tuya Tap-To-Run / IoTwebUI Regole];
    end
```

### Obiettivo Primario: Sperimentazione di AI e Integrazione con Tuya

L'obiettivo principale di **IoTwebUI-AI** è la sperimentazione con diverse configurazioni di intelligenza artificiale (modelli), con gestione diretta del contesto, dello storico conversazionale e degli strumenti (TOOL) per analizzare e interagire con i dispositivi Tuya. Questo include:

* **Documentazione Assistita:** Sfruttare l'AI per generare documentazione, riassunti o analisi basate sulle informazioni dei dispositivi.
* **Manutenzione Assistita:** Altro settore in cui il contributo dell'AI puo portare benefici in termini di ottimizzazioni e risparmi.
* **Automazione Assistita:** Sfruttare l'AI per generare algoritmi ed automazioni per gestire situazioni complesse di non immediata soluzione, tenendo conto dei vincoli delle 'scene' Tuya.
* **Esplorazione di Applicazioni Future:** Testare diverse configurazioni ed ipotesi che combinino le capacità dell'AI con il controllo e la gestione dei dispositivi Tuya + IOTwebUI, in scenari non derministici.
  
Più in dettaglio,  **IoTwebUI-AI**  è stato progettato per gestire: 

* **Ottimizzazione di Prompt e Interazioni:** Sperimentare con diverse istruzioni (prompt) per ottenere le risposte e le azioni desiderate dall'AI in relazione ai dispositivi IoT.
* **Gestione del Contesto IoT:** Valutare l'efficacia dell'integrazione di informazioni specifiche sui dispositivi e sul loro stato nelle conversazioni con l'AI.
* **Utilizzo di TOOL IoT:** Sviluppare e testare strumenti specifici per interagire con l'ecosistema Tuya tramite l'AI (ad esempio, comandi vocali intelligenti, automazioni basate su analisi AI...).
  
### Architettura di Alto Livello:

Il chatbot **IoTwebUI-AI** si basa su un'architettura modulare, progettata per massimizzare la flessibilità e semplificare l'interazione con l'AI e i dispositivi Tuya:

1.  **Modelli AI (Cloud o Locale):** Il sistema può utilizzare molti modelli di intelligenza artificiale, principalmente basati su cloud, tramite l'API di OpenAI, per poter valutare le diverse capacità di elaborazione del linguaggio naturale ed individuare il miglior modello per ogni compito. L'architettura è pensata per poter integrare anche modelli locali.

2.  **API di OpenAI (Punto di Accesso Unificato):** L'accesso ai diversi modelli AI compatibili avviene attraverso l'interfaccia standard dell'API di OpenAI, fornendo un metodo coerente per interagire con diverse intelligenze artificiali.

3.  **`AIserver` (Server Locale Dedicato):** Un server locale, chiamato "`AIserver`" e implementato con Express, funge da intermediario tra l'interfaccia utente e l'API di OpenAI. Questo componente gestisce:
    * Le comunicazioni con l'API di OpenAI, inclusa la formattazione delle richieste e la gestione delle risposte.
    * Funzionalità accessorie come l'archiviazione dello storico delle conversazioni e la gestione delle informazioni di contesto da utilizzare.
    * Il supporto per sessioni multiple di utenti.
    * L'implementazione dei TOOL specifici per l'interazione con l'ecosistema Tuya tramite comunicazioni REST con **IOTwebUI**.

4.  **`ai_proxy` (Libreria di Interfaccia):** Questa libreria JavaScript fornisce un'interfaccia semplificata per interagire con  "`AIserver`". Offre funzioni asincrone che astraggono le complesse chiamate al server, facilitando lo sviluppo dell'interfaccia utente. Le funzioni principali includono la gestione della configurazione, dello storico, del contesto e le chiamate all'API `OpenAI` (testo e streaming).

5.  **Funzioni JavaScript per l'Interfaccia Utente:** Un insieme di funzioni JavaScript (`IOTwebUIAI.js`) dedicate all'interfaccia HTML si occupa di:
    * Tradurre le azioni dell'utente in chiamate alle funzioni di "`ai_proxy`".
    * Gestire l'aspetto visivo dell'interfaccia e la presentazione delle informazioni.
    * Effettuare conversioni di formati come Markdown e Mermaid per una visualizzazione efficace.
    * Utilizzare il modulo "`ai_verticalMenu.js`" per la gestione dei menu dell'interfaccia.

6.  **Interfaccia Utente (HTML + CSS):** L'interfaccia utente  (`IOTwebUIAI.html`) è costruita con HTML e CSS per una struttura e uno stile flessibili. Poche funzioni JavaScript gestiscono interazioni dinamiche di base, come il menu a scomparsa.
Per favorire le customizzazioni, la definizione del menu è in un file separato: "`ai_verticalMenu.js`".

### Flessibilità e Potenza per la Sperimentazione con Tuya e AI:

Il chatbot IOTwebUI-AI offre una notevole flessibilità per la sperimentazione nell'ambito dell'IoT e dell'AI permettendo il controllo utente diretto di tutti i principali fattori:

* **Configurazione Dinamica:** La configurazione del modello AI e delle impostazioni di accesso può essere modificata dinamicamente a livello globale.
* **Gestione Indipendente di Sessione e Modello:** Ogni sessione utente opera in modo indipendente, permettendo di testare diverse configurazioni contemporaneamente.
* **Contesto e Storico per Sessione:** Le informazioni di contesto relative ai dispositivi Tuya e lo storico delle conversazioni sono gestiti per ogni sessione.
* **Pulizia Automatica:** I dati delle sessioni (storico, contesto) vengono eliminati automaticamente dopo 24 ore.
* **Integrazione Avanzata con Tuya:** Una delle funzionalità chiave è l'integrazione di **TOOL** specifici per l'interazione con l'ecosistema Tuya. Questo permette di:
    * Accedere allo stato e alle informazioni dei dispositivi reali e virtuali Tuya ed agli x-device di IOTwebUI.
    * Inviare comandi ai dispositivi ("tap-to-run' Tuya e 'REGOLE' di IOTwebUI).
    * Aggiornare direttamente i valori di stato degli x-device di IOTwebUI.
    * Sviluppare scenari di automazione intelligenti basati sull'analisi AI dei dati dei dispositivi.
    * Sperimentare nuove modalità di interazione uomo-macchina per la gestione della smart home e di altri dispositivi IoT.

### AI provider
E' richiesta in'intefaccia API compatibile openai.
#### Groq
     Free plan (con limiti di accesso): vedi https://groq.com/ to get APIKEY
          rate limits here: https://console.groq.com/docs/rate-limits
     AccessPoint: https://api.groq.com/openai/v1
     Models: 9 (Wisper, llama..) vedi https://console.groq.com/docs/models
     note: groq-llama3.3 (meta) implementa tools ed è molto veloce, limit 1000/day
#### Deepseek
     a consumo:  https://www.deepseek.com/ to get APIKEY
         e.g. Aprile '25: 1250 API requests, 3'500'000 Tokens = 0.64 USD    
     AccessPoint: https://api.deepseek.com
     Models: 2 (deepseek-chat, deepseek-reasoner) vedi https://api-docs.deepseek.com/quick_start/pricing
#### OpenAi
     a consumo: vedi https://openai.com/api/pricing/ to get APIKEY
     AccessPoint: https://api.openai.com/v1
     Models: 10+ (ChatGPT-4o, DALL·E 3...) vedi https://platform.openai.com/docs/models

### Potenziali Sviluppi Futuri

L'esperienza acquisita e le specifiche definite attraverso la sperimentazione con **IOTwebUI-AI** potranno in futuro essere utilizzate per lo sviluppo di applicazioni + AI specializzate, focalizzate su specifiche interazioni con i dispositivi Tuya o su particolari analisi dei dati IoT.

### _Conclusione:_

_Il progetto IOTwebUI-AI rappresenta un ambiente di sperimentazione versatile e potente per esplorare le sinergie tra l'intelligenza artificiale e l'ecosistema Tuya. La sua architettura flessibile e l'integrazione di TOOL specifici offrono ai tecnici la possibilità di analizzare i dispositivi IoT, sperimentare nuove interazioni e definire le basi per future applicazioni intelligenti._
