# BatteryTester02 - 2025

Il mercato evolve, i device cambiano: ecco il primo meter CC Tuya compatibile, specializzato nella gestione di batterie per FV: 0-420VDC, 100-600 A !
vedi Tuya WiFi Smart Tester Athorch (DT1209HBW): https://it.aliexpress.com/item/1005007168934730.html

![](https://github.com/msillano/IoTwebUI/blob/main/pics/athorchfig02.png?raw=true)

#### Impressioni generali
* Collegato immediatamente con Tuya: ha messaggi molto chiari! Ha l'opzione "rete alternativa"!
Impressionante il numero di schermate diverse (5 principali, in tutto 16) su un display grafico a colori: varie viste dei dati, grafico RT, configurazione.
* Quello che mi interessa di più è la integrazione con Tuya, che mi sembra molto ricca! La pagina principale presenta molti dati e 3 grafici riassuntivi: V+P, energia, %carica. Purtroppo grafici Tuya, vale a dire medie ogni ora!(L'interfaccia presenta grafici RT tipo oscilloscopio, aggiornato ogni secondo.) La pagina grafici di Tuya ne presenta ben 6: V, I, W, KWh, capacità (Ah), Temperatura (CPU e batt)- è fornita una sonda da fissare sulla batteria! Tutti con la solita cadenza: giorno, mese, anno!
* la pagina 'setup' presenta 11 valori e 4 bottoni rapidi: default, reset, WiFi reset

Manuale utente: http://en.atorch.cn/upload/20240816173247.pdf

_Tra le funzioni che mi hanno più colpito:_
* Relay esterno (5V, non fornito) programmabile come Over/uder voltage
* Frequenze di campionamento impostabile (lento 60s, veloce 1s)
* Cambio della visualizzazione sul monitor controllata da Tuya (3 opzioni/5).
* Sempre a proposito di Tuya, nelle 'scene' il device presenta 34 (!) CONDIZIONI diverse (di cui due in cinese!) e 21 AZIONI. Veramente ricco: ci vorrà un po' di tempo per studiarlo bene!

<hr>
![image](https://github.com/user-attachments/assets/e2994425-04a5-498a-91f6-f855aeec9cc2)

BatteryTester02 presenta le (poche) modifiche richieste per usare questo voltmetro!
IL grande vantaggio è che NON è necessario l'uso di CLONER01, che consuma molte risorse.
