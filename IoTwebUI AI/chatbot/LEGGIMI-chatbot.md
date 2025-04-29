## IoTwebUI chatbot - USO

Il primo punto da tener presente è che la maggior parte delle AI è status less, cioè senza memoria. Per esempio, un'AI non conosce nemmeno la data odierna, se non viene fornita nella conversazione!

E' il **chatbot** che si occupa di presentare, ad ogni conversazione, 3 tipi di informazione, tutte in formato testo:
    1. **Contesto di sistema**: sono documenti, istruzioni sotto il controllo utente, oppure lette direttamente dall'AI nel web con il TOOL a disposizione. L'utente può cancellarlo, o aggiungere file (locali). Esempi di file usati come contesto in varie prove sono nella dir `system`. (Ad ogni documento di contesto il chatbot agguinge data e ora attuali, così l'AI ha questa informazione in automatico).
    2. **History**: contiene le conversazioni passate. Le conversazioni sono numerate progressivamente, così si può fare un riferimento esatto ad una domanda precedente [Qxx] oppure ad una risposta dell'AI [Rxx]. Per evitare che l'History cresca a dismisura, si può chiedere all'AI di fare un riassunto di tutte le conversazioni precedenti, e poi, con il bottone "Cut History", l'utente conserva il solo  riassunto!
   3. **Prompt** o domanda utente, che influenza molto il contenuto e la forma della risposta. Esiste già un'abbondante letteratura sul 'prompt Engineering' Come introduzione leggi [questo articolo](https://github.com/msillano/IoTwebUI/blob/main/IoTwebUI%20AI/chatbot/system/info:%20Prompt%20Engineering.md).
       
Altri modelli di AI dedicano dello spazio in memoria ad ogni conversazione, eg. 8K o 32K: è limitato perchè va moltiplicato per il numero di utenti collegati: molte migliaia! Ci si accorge di questa cache se nelle risposte sono presenti delle informazioni precedenti, non più nel context o nella History attuali.

In ogni caso ogni modello di AI ha dei limiti, o globali o per ogni singolo elemento testuale fornito: se sono superate, context o prompt sono semplicemente troncati!

Altri parametri influenzano lo 'stile' della risposta: possono essere modificati a menu (temperature, seek...) oppure in config (file server02.js) Qui [alcuni dettagli](https://github.com/msillano/IoTwebUI/blob/main/IoTwebUI%20AI/ai_proxy.md#async-function-updateconfigsessionid-configuration). Saranno usati in un secondo tempo per migliorare le prestazioni dell'AI. 

## IoTwebUI chatbot - Configurazione

   Per ogni Model che volete usare dovete conoscere:
          - nome esatto da usare (value)
          - Url di accesso a openAI da usare (baseURL)
          - API_KEY che vi abilita all'accesso  (può essere gratuita - Groq, o a consumo - Deepseek) [vedi](https://github.com/msillano/IoTwebUI/blob/main/IoTwebUI%20AI/LEGGIMI.md#ai-provider) 

   a) date un nome alla KEY (e.g. API_KEY_GROQ) e salvatela nell'environment del PC: Carcare "Modifica le variabili di ambiente", poi nel popup "Proprietà del sistema / avanzate" scegliete 'variabili d'ambiente' e inserite la KEY. In questo modo è al sicuro! Consigliabile un restart del PC.

   b) Aggiornamento del menu: Nel file 'ai_verticalMenu.js' ho lasciato i 9 model di AI che uso in questo momento: possono servire come esempio!<br>
Cancellate/commentate (/* commento */) quelli che non vi servono, ed aggiornate il/i modelli che volete usare! Le istruzioni nel file mi sembrano abbastanza chiare.<br>
Alcune informazioni utili per il menu (se il modello gestisce tool, se accetta il param 'temperature' etc...) potete chiederle all'AI stessa, oppure potete intervenire in occasione di messaggi di errore nella conversazione.

**Miglioramento del Testo per un Lettore Tecnico ma Non Esperto**

---

### **Come Funzionano le AI Senza Memoria (Stateless)**

La maggior parte dei sistemi di Intelligenza Artificiale (AI) sono **senza memoria** (stateless), il che significa che non conservano informazioni tra una conversazione e l'altra. Ad esempio, un'IA non sa nemmeno qual è la data odierna a meno che non gliela forniamo esplicitamente durante la conversazione!

### **Come Gestisce le Informazioni un Chatbot?**
Il chatbot si occupa di organizzare tre tipi di informazioni, tutte in formato testo, per ogni conversazione:

1. **Contesto di Sistema**  
   - Sono documenti o istruzioni che l'utente può controllare o che l'IA legge direttamente dal web utilizzando uno strumento dedicato.  
   - L'utente può aggiungere o rimuovere file (anche locali).  
   - Ogni documento di contesto include automaticamente la data e l'ora corrente, così l'IA ha sempre questa informazione a disposizione.  
   - Esempi di file usati come contesto si trovano nella cartella `system`.

2. **Cronologia (History)**  
   - Contiene tutte le conversazioni passate, numerate progressivamente (es. [Q1], [R1]).  
   - Per evitare che la cronologia diventi troppo lunga, è possibile chiedere all'IA di riassumere le conversazioni precedenti.  
   - Con il pulsante **"Cut History"**, l'utente può conservare solo il riassunto, eliminando il resto.

3. **Prompt (Domanda dell'Utente)**  
   - È la richiesta che l'utente fa all'IA e ha un grande impatto sulla risposta.  
   - Esiste una vasta letteratura su come scrivere prompt efficaci, nota come **Prompt Engineering**.  
   - Per un'introduzione, puoi leggere [questo articolo](https://github.com/msillano/IoTwebUI/blob/main/IoTwebUI%20AI/chatbot/system/info:%20Prompt%20Engineering.md).

---

### **Altri Modelli di IA con Memoria Limitata**
Alcuni modelli di IA dedicano una piccola parte della memoria a ogni conversazione (es. 8K o 32K). Questo spazio è limitato perché deve essere moltiplicato per il numero di utenti collegati (spesso migliaia!).  
- Ci si accorge di questa "cache" quando l'IA fa riferimento a informazioni precedenti che non sono più nel contesto o nella cronologia attuali.  
- Se i limiti di memoria vengono superati, il contesto o il prompt vengono semplicemente troncati.

---

### **Parametri che Influenzano lo Stile delle Risposte**
Alcuni parametri possono essere modificati per personalizzare le risposte dell'IA:
- **Temperature**: Controlla la creatività delle risposte (valori più alti = più creative, valori più bassi = più precise).  
- **Seek**: Altri parametri avanzati che possono essere configurati nel file `server02.js`.  
- Per maggiori dettagli, consulta [questa guida](https://github.com/msillano/IoTwebUI/blob/main/IoTwebUI%20AI/ai_proxy.md#async-function-updateconfigsessionid-configuration).  

Questi parametri saranno utili in seguito per ottimizzare le prestazioni dell'IA.

---

## **Configurazione del Chatbot IoTwebUI**

### **Informazioni Necessarie per Ogni Modello di IA**
Per utilizzare un modello di IA, è necessario conoscere:
1. **Nome Esatto del Modello** (value)  
2. **URL di Accesso** (baseURL)  
3. **API_KEY** (chiave di accesso, che può essere gratuita o a consumo).  
   - Per maggiori dettagli, consulta [questa pagina](https://github.com/msillano/IoTwebUI/blob/main/IoTwebUI%20AI/LEGGIMI.md#ai-provider).

### **Passaggi per Configurare la Chiave API**
1. **Assegna un Nome alla Chiave** (es. `API_KEY_GROQ`) e salvala nelle variabili d'ambiente del tuo computer:  
   - Cerca "Modifica le variabili d'ambiente" nel sistema operativo.  
   - Aggiungi la chiave nella sezione "Variabili d'ambiente" e riavvia il PC per applicare



## IoTwebUI chatbot - Installazione
Precondizioni
- IotwebUI ver 3.0 con installazione completa (vedi [istruzioni](https://github.com/msillano/IoTwebUI/blob/main/APP/LEGGIMI.md#installazione-e-uso)) e funzionante. 
_Questo chatbot può funzionare standalone, cioè senza IoTwebUI, ma in questo caso perde la sua principale caratteristica, la integrazione con Tuya. Rimane comunque un chatbot flessibile, con solo il tool di accesso al WEB._

passo 1. Scaricare il file zip chatbot01.zip: metterlo nella vostra dir \IoTwebUI\ e dezipparlo: sarà creata la dir  \IoTwebUI\IoTwebUI AI\chatbot
         (In realtà potere usare qualsiasi dir eseguibile: consiglio IoTwebUI per mantere unito il progetto).
passo 2. aggiornare i file BAT, per adattarli alle effettive dir usate. In particolare:
          file RUN chatbot.bat, che lancia il frontend ed il server. Una volta aggiornato, può essere spostato dove preferite.
          file install_AIserver.bat, necessario per le dipendenze nodjs. 

