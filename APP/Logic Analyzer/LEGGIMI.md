# Logic Analyzer
[english version](https://github.com/msillano/IoTwebUI/blob/main/APP/Logic%20Analyzer/README.md)

Questa APP è un **Analizzatore Logico** a 5 canali realizzato per il test, il debug e la documentazione di _scene_ e _REGOLE_ **Tuya** e **IoTwebUI**.

![Screenshot 2025-02-21 155415](https://github.com/user-attachments/assets/512b24fd-c1ad-4964-92e0-3ce16390bbad)<br>
TEST del Pattern ['filter for short events'](https://github.com/msillano/IoTwebUI/blob/main/patterns/filter%20for%20short%20events.md). A è il segnale input, B, l'output, C il countdown utilizzato, di un altro switch reale (gli switch virtuali non hanno l'implementazione del countdown!). 

### USO
* **Clear**: inizializza il grafico, e aggiorna la lista dei segnali visualizzati, oppure, opzionalmente, ne cancella la lista.
* **Add**: Appare un grande pop-up con tutti i device e segnali disponibili, cliccando su _aggiungi_ si scelgono i segnali da visualizzare nel _Logic Analyzer_ (nota: se si scelgono più di 5 segnali, gli ultimi sovrascrivono i primi).
_Ovviamente ha senso scegliere attributi (code)  con valori booleani (true/false) oppure numerici (0 => false, else => true: vedi 'countdown' (C) in figura): per comodità la terza colonna presenta i valori attuali._

![image](https://github.com/user-attachments/assets/e0b957f3-9371-405e-9981-630d13f7dec6)

### note
* Per l'installazione, vedi istruzioni [generali per APP](https://github.com/msillano/IoTwebUI/tree/main/APP#installation-and-use)

* Mi trovo bene usando 2 device virtuali: un 4 interruttori (`IN4_vdevo`, [vedi](https://www.tuyaexpo.com/product/1078029)) e un 2 switch, che possono essere usati indifferentemente per simulare input o visualizzare output.
* Inoltre trovo comodo, per avere test affidabili e ripetibili, crare per ogni test un 'tap_to_run' con funzioni di driver, che:
  1. inizializzi gli input ed output
  2. abiliti solo le 'automazioni' interessate al test
  3. gestisca la sequenza temporale degli input, possibilmente in tutti i casi possibili!
* _La visualizzazione ha una certa latenza, dovuta alla frequenza di polling dei dati di TuyaCloud (vedi `tuyaInterval`, in 'config.js', min 20s per bevi periodi). Eventi più brevi di 20s possono NON essere visualizzati. Tenere presente questo fattore programmando un test._

### Customizzazioni
Soprattutto per creare documentazione, è possibile cambiare i nomi sia dei device, che dei segnali visualizzati, anche con HTML per modificarne il look.
Occorre (al solito) editare il file "logic_analyzer01.js" aggiungendo elementi come segue (vedi in figura il risultato): 
```ruby
        _translate["OUT2-vdevo|switch_1"] = {
             device: "ALERT*",
             code: "<b>longOpen!</b>"
             };
```

 
