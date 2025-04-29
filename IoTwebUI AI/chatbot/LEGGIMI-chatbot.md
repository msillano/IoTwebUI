## IoTwebUI chatbot - USO
E' un ambiente nuovo e sto imparando facendo.

Il primo punto da tener presente è che la maggior parte delle AI è status less, cioè senza memoria. Per esempio, un'AI non conosce nemmeno la data odierna, se non viene fornita nella conversazione!

E' il **chatbot** che si occupa di presentare, ad ogni conversazione, 3 tipi di informazione, tutte in formato testo:
    1. **Contesto di sistema**: sono documenti, istruzioni sotto il controllo utente, oppure lette direttamente dall'AI nel web con il TOOL a disposizione. L'utente può cancellarlo, o aggiungere file (locali). Esempi di file usati come contesto in varie prove sono nella dir `system`. (Ad ogni documento di contesto il chatbot agguinge data e ora attuali, così l'AI ha questa informazione in automatico).
    2. **History**: contiene le conversazioni passate. Le conversazioni sono numerate progressivamente, così si può fare un riferimento esatto ad una domanda precedente [Qxx] oppure ad una risposta dell'AI [Rxx]. Per evitare che l'History cresca a dismisura, si può chiedere all'AI di fare un riassunto di tutte le conversazioni precedenti, e poi, con il bottone "Cut History", l'utente conserva il solo  riassunto!
   3. **Prompt** o domanda utente, che influenza molto il contenuto e la forma della risposta. Esiste già un'abbondante letteratura sul 'prompt Engineering'
       
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


## IoTwebUI chatbot - Installazione
Precondizioni
- IotwebUI ver 3.0 con installazione completa (vedi [istruzioni](https://github.com/msillano/IoTwebUI/blob/main/APP/LEGGIMI.md#installazione-e-uso)) e funzionante. 
_Questo chatbot può funzionare standalone, cioè senza IoTwebUI, ma in questo caso perde la sua principale caratteristica, la integrazione con Tuya. Rimane comunque un chatbot flessibile, con solo il tool di accesso al WEB._

passo 1. Scaricare il file zip chatbot01.zip: metterlo nella vostra dir \IoTwebUI\ e dezipparlo: sarà creata la dir  \IoTwebUI\IoTwebUI AI\chatbot
         (In realtà potere usare qualsiasi dir eseguibile: consiglio IoTwebUI per mantere unito il progetto).
passo 2. aggiornare i file BAT, per adattarli alle effettive dir usate. In particolare:
          file RUN chatbot.bat, che lancia il frontend ed il server. Una volta aggiornato, può essere spostato dove preferite.
          file install_AIserver.bat, necessario per le dipendenze nodjs. 

