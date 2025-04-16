

# IOTwebUI-AI

**Introduzione:**

Questo documento introduce il progetto **IOTwebUI-AI**, un _chatbot general purpose integrato con l'ecosistema Tuya_.
Questo ambiente versatile è stato sviluppato per permettere agli utenti più avventurosi di esplorare e sperimentare le potenzialità dell'intelligenza artificiale (AI) in combinazione con dispositivi IoT della piattaforma Tuya. L'obiettivo principale è fornire uno strumento flessibile per condurre prove e analisi, interagire con i dispositivi IoT presenti e sperimentare le potenzialità dell'AI in questo contesto.

### Obiettivo Primario: Sperimentazione di AI e Integrazione con Tuya

L'obiettivo principale di **IOTwebUI-AI** è la sperimentazione con diverse configurazioni di intelligenza artificiale (modelli), con gestione diretta del contesto, dello storico conversazionale e degli strumenti (TOOL) per analizzare e interagire con i dispositivi Tuya. Questo include:

* **Documentazione Assistita:** Sfruttare l'AI per generare documentazione, riassunti o analisi basate sulle informazioni dei dispositivi.
* **Automazione Assistita:** Sfruttare l'AI per generare algoritmi ed automatismi per gestire situazioni complesse di non immediata soluzione, tenendo conto dei vincoli delle 'scene' Tuya.
* **Manutenzione Assistita:** Altro settore in cui il contributo dell'AI puo portare benefici in termini di ottimizzazioni e risparmi.
* **Esplorazione di Applicazioni Future:** Testare diverse interazioni e automazioni che combinano le capacità dell'AI con il controllo e la gestione dei dispositivi Tuya + IOTwebUI.
  
Più in dettaglio,  **IOTwebUI-AI**  è stato progettato per testare ed ottimizzare: 

* **Ottimizzazione di Prompt e Interazioni:** Sperimentare con diverse istruzioni (prompt) per ottenere le risposte e le azioni desiderate dall'AI in relazione ai dispositivi IoT.
* **Gestione del Contesto IoT:** Valutare l'efficacia dell'integrazione di informazioni specifiche sui dispositivi e sul loro stato nelle conversazioni con l'AI.
* **Utilizzo di TOOL IoT:** Sviluppare e testare strumenti specifici per interagire con l'ecosistema Tuya tramite l'AI (ad esempio, comandi vocali intelligenti, automazioni basate su analisi AI...).
  
### Architettura di Alto Livello:

Il chatbot **IOTwebUI-AI** si basa su un'architettura modulare, progettata per massimizzare la flessibilità e semplificare l'interazione con l'AI e i dispositivi Tuya:

1.  **Modelli AI (Cloud o Locale):** Il sistema può utilizzare molti modelli di intelligenza artificiale, principalmente basati su cloud, tramite l'API di OpenAI, per poter valutare le diverse capacità di elaborazione del linguaggio naturale ed individuare il miglior modello per ogni compito. L'architettura è pensata per poter integrare anche modelli locali.

2.  **API di OpenAI (Punto di Accesso Unificato):** L'accesso ai diversi modelli AI compatibili avviene attraverso l'interfaccia standard dell'API di OpenAI, fornendo un metodo coerente per interagire con diverse intelligenze artificiali.

3.  **`ai_server` (Server Locale Dedicato):** Un server locale, chiamato "`ai_server`" e implementato con Express, funge da intermediario tra l'interfaccia utente e l'API di OpenAI. Questo componente gestisce:
    * Le comunicazioni con l'API di OpenAI, inclusa la formattazione delle richieste e la gestione delle risposte.
    * Funzionalità accessorie come l'archiviazione dello storico delle conversazioni e la gestione delle informazioni di contesto da utilizzare.
    * Il supporto per sessioni multiple di utenti.
    * L'implementazione dei TOOL specifici per l'interazione con l'ecosistema Tuya tramite comunicazioni REST con **IOTwebUI**.

4.  **`ai_proxy` (Libreria di Interfaccia):** Questa libreria JavaScript fornisce un'interfaccia semplificata per interagire con il "`ai_server`". Offre funzioni asincrone che astraggono le complesse chiamate al server, facilitando lo sviluppo dell'interfaccia utente. Le funzioni principali includono la gestione della configurazione, dello storico, del contesto e le chiamate all'API OpenAI (testo e streaming).

5.  **Funzioni JavaScript per l'Interfaccia Utente:** Un insieme di funzioni JavaScript (`IOTwebUIAI.js`) dedicate all'interfaccia HTML si occupa di:
    * Tradurre le azioni dell'utente in chiamate alle funzioni di "`ai_proxy`".
    * Gestire l'aspetto visivo dell'interfaccia e la presentazione delle informazioni.
    * Effettuare conversioni di formati come Markdown e Mermaid per una visualizzazione efficace.
    * Utilizzare il modulo "`ai_verticalMenu.js`" per la gestione dei menu dell'interfaccia.

6.  **Interfaccia Utente (HTML + CSS):** L'interfaccia utente  (`IOTwebUIAI.html`) è costruita con HTML e CSS per una struttura e uno stile flessibili. Poche funzioni JavaScript gestiscono interazioni dinamiche di base, come il menu a scomparsa.
Per favorire le customizzazioni, la definizione del menu è in un file separato: "`ai_verticalMenu.js`".

### Flessibilità e Potenza per la Sperimentazione con Tuya e AI:**

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

### Potenziali Sviluppi Futuri

L'esperienza acquisita e le specifiche definite attraverso la sperimentazione con **IOTwebUI-AI** potranno in futuro essere utilizzate per lo sviluppo di applicazioni + AI specializzate, focalizzate su specifiche interazioni con i dispositivi Tuya o su particolari analisi dei dati IoT.

### _Conclusione:_

_Il progetto IOTwebUI-AI rappresenta un ambiente di sperimentazione versatile e potente per esplorare le sinergie tra l'intelligenza artificiale e l'ecosistema Tuya. La sua architettura flessibile e l'integrazione di TOOL specifici offrono ai tecnici la possibilità di analizzare i dispositivi IoT, sperimentare nuove interazioni e definire le basi per future applicazioni intelligenti._
