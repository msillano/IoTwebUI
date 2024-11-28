# Cloner01 - clonare device Tuya


### Descrizione
In alcuni casi i device Tuya espongono, in IoTwebUI, meno proprietà di quelle disponibili in SmartLife, per esempio nel menu delle condizioni.
_Questo può capitare perchè, per ragioni di prestazioni, IoTwebUI utilizza una funzione che legge tutti i device insieme, ma talvolta con proprietà ridotte._ 
Questa macro invece crea un'**x-device**, clone di un device Tuya, dotandolo di tutte le proprità disponibili, aggiornate ad ogni loop.
Quindi della stessa device esistono due versioni: quella standard, gestita da IoTwebUI, e un **x-device** più dettagliato, generato da questo addon.

_nota: Ogni loop questo addon fa una riciesta a TuyaCloud, raddoppiando quindi le richieste per loop.  Attenzione a non superare i limiti Tuya (vedi `tuyaInterval` in `config.js`)_

Un esempio di uso con il device [TY-08Z](https://github.com/msillano/IoTwebUI/blob/main/addon/TestBattery01_leggimi.pdf): nella figura il pop up 'standard' e quello della x-device (41 proprietà !) 
Ver. 2.2 10/08/2024 (c)marco.sillano@gmail.com


### Installazione
Istruzioni dettagliate nel file CLONER01.js
