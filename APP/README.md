#  Tuya APPLICATIONS 
[versione italiana](https://github.com/msillano/IoTwebUI/blob/main/APP/README.md#applicazioni-tuya)

By APP we mean an application with a user interface, that uses Tuya and IoTwebUI with REST, to achieve the most varied objectives.
They normally comprise at least two files: 
* a MACRO (**x-device**) that acts as a middleware between the devices and the user interface, implementing the 'business logic', 
* a simple user interface (usually in HTML).

We have separated them in this dir for ease of use: during installation, the files must be copied into your host's 'addon/' and 'html/' dirs.

#  APPLICAZIONI Tuya 
[english version](https://github.com/msillano/IoTwebUI/blob/main/APP/README.md#tuya-applications)

_Per APP intendiamo una applicazione dotata di propria interfaccia utente, che utilizza Tuya e IoTwebUI con REST, per realizzare gli obiettivi più svariati._
_Sono normalmente composte di almeno due file:_
* _una MACRO (**x-device**) che fa da middleware tra i device e l'interfaccia utente, implementando anche la 'businnes logic'_
* _una semplice interfaccia utente specializzata (in genere in HTML)_

_Per comodità di uso li abbiamo separati in questa dir: in fase di installazione i file vanno copiati nelle dir 'addon/' e 'html/' della vostra installazione._  

**Programming Notes/Note di programmazione**<br>
* Details on [Pattern MVP](https://github.com/msillano/IoTwebUI/blob/main/html/clima01-leggimi.md#pattern-mvp) 
* "Advantages of this architecture" and 'Development process' in [testBattery01](https://github.com/msillano/IoTwebUI/blob/main/addon/TestBattery01_leggimi.pdf) <hr>
* Dettagli sul [Pattern MVP](https://github.com/msillano/IoTwebUI/blob/main/html/clima01-leggimi.md#pattern-mvp) 
* "Vantaggi di questa architettura" e 'Processo di sviluppo' in [testBattery01](https://github.com/msillano/IoTwebUI/blob/main/addon/TestBattery01_leggimi.pdf)

## Owerview
<table width="100%">
<tr><td width = "400pt"><img src="https://github.com/msillano/IoTwebUI/blob/main/pics/thermostat01.png?raw=true"></td><td colspan=2>  <b><i>WEB Thermostat</i></b><br><br>
This complete SW chronothermostat uses the measurements of one (or more) Tuya temperature probes to control a smart switch for heating (cooling).<hr>
<i>Questo è un cronotermostato completo SW che utilizza le misure di uno (o più) sonde di temperatura Tuya per controllare uno smart switch per il riscaldamento (raffrescamento).</i>  
 </td></tr>
<tr><td colspan=2>  <b><i>Explore</i></b><br><br> 
Application for 'power users'. It allows you to access all the details of our devices, obtaining them both from the Cloud and IoTwebUI.
Also useful for users of tuyaDAEMON, HA, etc. It lets you quickly find the keys, codes, and any info about a new device!<br>
<hr>
<i>Applicazione per 'power users'. Permette di accedere a tutti i dettagli dei nostri device, ottenendoli sia dal Cloud, che da IoTwebUI.
Utile anche per gli utenti di tuyaDAEMON, HA, etc.  Infatti permette di trovare rapidamente le key, i codici e qualunque info di un device!<i>
</td><td width="200px"><img src="https://github.com/msillano/IoTwebUI/blob/main/pics/app02.png?raw=true" />  </td></tr>
<tr><td width = "400pt"><img src="https://github.com/msillano/IoTwebUI/blob/main/pics/app03.png?raw=true"></td><td colspan=2>  <b><i>Battery Tester</i></b><br><br>
Measures the efficiency of a rechargeable battery by plotting its discharge and measuring the accumulated charge in mAh.<hr>

<i>Misura l'efficienza di una batteria ricaricabile, tracciando il grafico della sua scarica e misurando la carica accumulata in mAh.</i>
     </td></tr>
</table>
