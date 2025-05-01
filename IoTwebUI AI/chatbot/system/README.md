Qesta dir contiene file usabili come CONTEXT nelle conversazioni AI. Possono essere aggiunti o eliminati interattivamente durante le conversazioni dal frontend del chatbot.<br>
Devono essere mantenuti e aggiornati dall'utente, che aggiungerà o modificherà i file necessari in base ai propri obiettivi.

_Sono presenti alcuni esempi:_

- `CONX-Tink mode.txt`: Istruzioni per formattare le risposte in due parti: regionamento seguito da risposta vera e propria
- `get-devices-xxxx.txt`: Elenco di tutti i device con dati leggibili (real, virtual, x-device) _Esempio: contiene device fittizi_<br>
    File CSV, può essere creato da DB, a mano, o usando `IoTwebUI - APP Explore devices`
- `set-devices-xxxx.txt`: Elenco di tutti i device e attributi scrivibili dall'AI (x-device) _Esempio: contiene device fittizi_<br>
    File CSV, può essere creato da DB, a mano, o usando `IoTwebUI - APP Explore devices`
- `all-TTR-xxxx.txt`: Elenco di tutti i Tap-To-Run (Tuya) e REGOLE (IoTwebUI) attivabili da AI. _Esempio: contiene TTR fittizi_ <br> 
    File CSV, può essere creato da DB, a mano, o usando `IoTwebUI - APP Explore scenes`

Inoltre possono essere usati i seguenti file, accessibili pubblicamente (gist):

* [https://gist.github.com/msillano/e06d4125077d5690dd8b75ed7c0ee442/raw/34d5f43eb2c9194ccf289483473804e757f10594/tuya_BNF_local.it.dsv1.0.txt](https://gist.github.com/msillano/e06d4125077d5690dd8b75ed7c0ee442/raw/34d5f43eb2c9194ccf289483473804e757f10594/tuya_BNF_local.it.dsv1.0.txt)  Descrizione delle 'scene' Tuya in BNF, italiano (local linkage).

* [https://gist.github.com/msillano/64615e499df46326b9500ff3b5288c6a/raw/3bf7a9d5925530ecc667d085995a5df318c8e9b3/tuya_BNF_full.it.dsv1.0.txt](https://gist.github.com/msillano/64615e499df46326b9500ff3b5288c6a/raw/3bf7a9d5925530ecc667d085995a5df318c8e9b3/tuya_BNF_full.it.dsv1.0.txt)   Descrizione delle 'scene' Tuya in BNF, italiano (completo, incluso ambito).

