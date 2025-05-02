## IoTwebUI chatbot - USO

### **Come Funzionano le AI Senza Memoria (Stateless)**
[English version](https://github.com/msillano/IoTwebUI/blob/main/IoTwebUI%20AI/chatbot/README.md)

La maggior parte dei sistemi di Intelligenza Artificiale (AI) sono **senza memoria** (stateless), il che significa che non conservano informazioni tra una conversazione e l'altra. Ad esempio, un'IA non sa nemmeno qual è la data odierna a meno che non gliela forniamo esplicitamente durante la conversazione!

### **Come Gestisce le Informazioni IoTwebUI Chatbot?**
Il chatbot si occupa di organizzare tre tipi di informazioni, tutte in formato testo, fornite all'AI per ogni conversazione:

1. **Contesto di Sistema**  
   - Sono documenti o istruzioni che l'utente può controllare o che l'IA legge direttamente dal web utilizzando un TOOL dedicato.  
   - L'utente può aggiungere o rimuovere i file locali.  
   - Il primo documento di contesto include automaticamente la data e l'ora corrente, così l'IA ha sempre questa informazione a disposizione.  
   - Per velocizzare, anche `server02.js` usa un meccanismo di cache per i file di contesto: un file è letto dal PC solo se non è presente nella cache.
   - Esempi di file usati come contesto si trovano nella cartella `system`.

2. **Cronologia (History)**  
   - Contiene tutte le conversazioni passate, numerate progressivamente (es. [Q4], [R4]).  
   - Per evitare che la cronologia diventi troppo lunga, è possibile chiedere all'IA di riassumere le conversazioni precedenti e con il pulsante **"Cut History"**, l'utente può conservare solo l'ultima conversazione (il riassunto), eliminando il resto.

3. **Prompt (Domanda dell'Utente)**  
   - È la richiesta che l'utente fa all'IA e ha un grande impatto sulla risposta.  
   - Esiste una vasta letteratura su come scrivere prompt efficaci, nota come **Prompt Engineering**. Per un'introduzione, puoi leggere [questo articolo](https://github.com/msillano/IoTwebUI/blob/main/IoTwebUI%20AI/chatbot/system/info:%20Prompt%20Engineering.md).
   - Esempio di prompt: "_Leggi per favore questo documento: https://www.ibm.com/it-it/think/topics/prompt-engineering, riassumilo in un articolo su 'Prompt Engineering' di circa 100 righe, in fondo cita la fonte + 'modificato da deepseek'_"

### **Altri Modelli di IA con Memoria Limitata**
Alcuni modelli di IA dedicano una piccola parte della memoria a ogni conversazione (es. 8K o 32K). Questo spazio è limitato perché deve essere moltiplicato per il numero di utenti collegati (anche centinaia di migliaia!).  
- Ci si accorge di questa "cache" quando l'IA fa riferimento a informazioni precedenti che non sono più nel contesto o nella cronologia attuali.  
- Se i limiti di memoria della AI vengono superati, il contesto o il prompt vengono semplicemente troncati.

![image](https://github.com/user-attachments/assets/2d1204c5-8008-46f7-9f45-118dd1e91eb0)


### **Parametri che Influenzano lo Stile delle Risposte**
Alcuni parametri possono essere modificati da menu per personalizzare le risposte dell'IA:
- **Temperature**: Controlla la creatività delle risposte (valori più alti = più creative, valori più bassi = più precise).  
- **Seek**: controlla la ripetibilità delle risposte: seek ON = deterministico.

Altri parametri avanzati possono essere configurati nel file `server02.js`.  
- Per maggiori dettagli, consulta [queste informazioni](https://github.com/msillano/IoTwebUI/blob/main/IoTwebUI%20AI/ai_proxy.md#async-function-updateconfigsessionid-configuration).  

Questi parametri saranno utili per ottimizzare le prestazioni dell'IA.

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


2. **Aggiornamento del Menu dei Modelli**  
   - Nel file `ai_verticalMenu.js` sono già inclusi 9 modelli di IA utilizzabili come esempio.  
   - Elimina o commenta (`/* commento */`) i modelli che non ti servono.  
   - Aggiorna i dettagli del/dei modelli che intendi utilizzare (es. URL, nome, ecc.).  
   - Le istruzioni nel file sono chiare, ma se hai dubbi, puoi chiedere direttamente all'IA o aggiornare in seguito in caso di errori segnalati dall'AI durante la conversazione.  

---

## **Installazione del Chatbot IoTwebUI**

### **Prerequisiti**  
- Avere **IoTwebUI versione 3.1** installata e funzionante ([vedi istruzioni](https://github.com/msillano/IoTwebUI/blob/main/APP/LEGGIMI.md#installazione-e-uso)), incluso **IoTrest**.  
- Nota: Il chatbot può funzionare anche senza _IoTwebUI_, ma perderà l'integrazione con Tuya (la sua caratteristica principale). Resta comunque un chatbot flessibile con accesso al web.  

### **Passo 1: Scaricare e Preparare i File**  
1. Scarica il file `chatbot01.zip` e posizionalo nella cartella `\IoTwebUI\`.  
2. Estrai il contenuto: verrà creata la cartella `\IoTwebUI\IoTwebUI AI\chatbot`.  
   - Puoi usare altre cartelle, ma si consiglia di mantenere tutto organizzato sotto `IoTwebUI`.  

### **Passo 2: Configurare i File BAT**  
1. **Aggiorna i file BAT** per adattarli alle tue directory:  
   - `RUN chatbot.bat`: Avvia il frontend e il server. Dopo l'aggiornamento, puoi spostarlo dove preferisci.  
   - `install_AIserver.bat`: Installa le dipendenze necessarie per Node.js.
        
### **Passo 3: Installare le dipendenze**  
1.  Una volta aggiornato, devi usare `install_AIserver.bat`: crea la dir `/node_modules`.

_Ora **IoTwebUI chatbot** è pronto per essere utilizzato:_ esegui  `RUN chatbot.bat`!  

(rielaborato con deepseek)

 

