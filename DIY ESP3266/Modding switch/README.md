
**Introduzione:**

I wanted to explore the possibilities of modifying (modding) the Tuya smart switches, starting from the [observation](https://www.facebook.com/groups/tuyaitalia/permalink/1601909300443417/) that the voltage across the physical control switch is typically a low voltage DC voltage (3.3V or 5V), galvanically isolated from the 230V power circuit. This feature opens up interesting scenarios for integrating sensors and microcontrollers, allowing the creation of 'custom Tuya devices'.

### Smart Switch Analysis

* **Test Device:** A [cheap Zigbee](https://it.aliexpress.com/item/1005005875932568.html) smart switch was used as a test platform.

![full001](https://github.com/user-attachments/assets/5526c2b4-8f3b-400d-9d63-45ec7e69cd55)

* **Power Pins Identification:** Circuit analysis revealed the happy presence of both 5V (for relay power) and 3.3V (for control electronics), both isolated from the mains. Larger electrolytic capacitors were identified as convenient tap points for these voltages (see figure).
* **Input Pin Characteristics:** The switch input pin is connected to a 6.8K resistor to +3.3V, with an activation threshold of about 1.4V.
* **Warning:** A series of ON/OFFs in quick succession (chattering, unstable contact...) puts the switch into a 'pairing' condition (flashing blue light) which can only be exited by re-associating it to the HUB (with automatic name change).
 
## Example 1: DIY Flame Detector

![smartodiy](https://github.com/user-attachments/assets/aa2f31be-f7fe-4c35-86f4-c6d47d3bf05e)

From a [series of posts](https://www.facebook.com/groups/tuyaitalia/permalink/1543046892996325/), it turned out that there are NO Tuya alarms for open flames on the market! Good opportunity for a DIY Tuya-compatible device.

![image](https://github.com/user-attachments/assets/bfd57a5a-3507-4ab2-805d-2bc537dfc0cd)

 * A flame detector prototype was built using a high sensitivity IR sensor and a comparator with adjustable threshold using a [module for Ardiuno](https://it.aliexpress.com/item/1005007581633099.html).
 * _note: this module is part of a series of [37 sensors for Arduino](https://it.aliexpress.com/w/wholesale-37-arduino-sensor.html) very popular_..
* The module is powered at 3.3V and its digital output is connected to the input pin of the smart switch.
* The connection is very simple, three wires in total: GND, +3.3V, DO/IN: basically just one solder (+3.3V).
* The system has demonstrated high sensitivity, detecting the flame of a lighter at distances of 50-70 cm.

![definitivo](https://github.com/user-attachments/assets/f4bbe185-4abd-4b20-b782-9afa9a90b78f)

* Final version. Only one wire is connected internally, at +3.3V. Ground and input are taken from the external terminals! _Note: using 3 connectors allows you to replace the 'fire' module with [other modules of the series](https://www.adrirobot.it/37_in_1_sensor_module_board_set_kit_for_arduino/)_!
 
<hr> 

## Example 2: BLINK-ESP01, Tuya + ESP3266 integration

![esp-01s-esp8266-pinout-mischianti](https://github.com/user-attachments/assets/7e756b2f-d20e-42cf-ace9-d15ed1fb66f8)

This project uses the ESP01S microcontroller to implement a simple relay 'blink'. <br>
_For a general introduction to ESP01 [see here](https://www.ariat-tech.it/blog/esp-01-functional-features,pin-configuration,applications-and-relationship-with-esp-01s-and-esp8266.html)_.<br>
_Instead a general introduction to the use of ESP3266 in custom devices can be found in [this article](https://github.com/msillano/tuyaDEAMON-applications/wiki/note-5:-Watchdog-for-IOT#note-esp-01-programming)_.

![esp01-02](https://github.com/user-attachments/assets/ea6eaf65-409b-411d-b6c5-6f81525e3bfc)
Left: ESP01S programming with adapter via USB. Right: finished.

To keep it simple, as is the case for a _proof of concept_, we take the Arduino demo 'blink' perhaps the simplest and most famous program, only we implement it with a timer. In practice, we transform the smart relay into a flasher.

### Hardware

Modding smart switch: we use the same 3 connections used in Example 1: one internal (3.3V) and two on the terminals: S1 (GND) and S2 (IN).

### Firmware

Both the installation and the use of Arduino to program an ESP01s are very simple: you only need a USB adapter. For details see the project [Watchdog03](https://github.com/msillano/tuyaDEAMON-applications/wiki/note-5:-Watchdog-for-IOT#watchdog03-esp01-relay--arduino).

note: The mode change (run/programming) occurs at the startup of the ESP01 and the programming mode requires the IN0 PIN to ground. I therefore added a small switch to the programmer (in some models it is already present) and therefore the procedure is the following:
* switch with IN0 to GND (programming)
* insert the programmer into the USB socket
* programming with Arduino
* remove the programmer from the USB socket
* switch with IN0 open (run)
* Open the serial terminal on Arduino at 9600 baud.
* insert the programmer into the USB socket: the program starts automatically
* debug the program with the help of echos on the serial

_ATTENTION: some programmers have jumpers to choose 5V or 3.3V. ESP01S requires 3.3V!_

### HTTP control
We need to add some control functionality: ON/OFF and the possibility to change the period. We cannot use the relay in any way, ### Firmware

Both the installation and the use of Arduino to program an ESP01s are very simple: you only need a USB adapter. For details see the project [Watchdog03](https://github.com/msillano/tuyaDEAMON-applications/wiki/note-5:-Watchdog-for-IOT#watchdog03-esp01-relay--arduino).

note: The mode change (run/programming) occurs at the startup of the ESP01 and the programming mode requires the IN0 PIN to ground. I therefore added a small switch to the programmer (in some models it is already present) and therefore the procedure is the following:
* switch with IN0 to GND (programming)
* insert the programmer into the USB socket
* programming with Arduino
* remove the programmer from the USB socket
* switch with IN0 open (run)
* Open the serial terminal on Arduino at 9600 baud.
* insert the programmer into the USB socket: the program starts automatically
* debug the program with the help of echos on the serial

_ATTENTION: some programmers have jumpers to choose 5V or 3.3V. ESP01S requires 3.3V!_

### HTTP control
We need to add some control functionality: ON/OFF and the possibility to change the period. We cannot use the relay in any way, already used as an output device.<br>
To manage these 'extra' parameters we exploit the capabilities of ESP3266 to implement two alternative WiFi-HTTP interfaces:

**WEB Interface: URL `http://192.168.1.23/`**

 ![Screenshot 2025-03-17 211306](https://github.com/user-attachments/assets/7a8d1dd8-a853-4e5d-a81a-ba102655fd23)
 
By calling the address associated with ESP01 (custom, defined in the code) from a browser, you connect to a WEB server (port 80) created in ESP01. The server's response is a WEB page with a simple interactive interface that presents status information and allows updates.

**HTTP GET and REST interface**

For greater convenience, there is a second interface, always via the WEB server, but which uses the REST protocol and the GET+ parameters protocol (the same as the HTML 'forms'):

* `http://192.168.1.23/ON`
* `http://192.168.1.23/OFF`
* `http://192.168.1.23/ESPtuya?loop=xxxx` (xxx = periodo in ms)
  
The response is TEXT and contains 'OK' or 'BAD'. (Alternative: use JSON responses, when data must be provided).
You can also try them with a browser, directly writing the previous URLs.<br>
These interfaces are not intended for interactive uses but for programmatic uses in any APP or language capable of sending HTTP requests (in particular, from IoTwebUI).

_If you want, you could also use an MQTT interface, but it is more complex and requires an external MQTT broker._

**Examples of use with IOTwebUI**

* The simplest way are two 'RULES with name' (equivalent to Tuya tap-to-run) that will appear in the _tap-to-run_ page of **IoTwebUI**:
```
if (TRIGBYNAME("BLINK on"))   REST("http://192.168.1.23/ON"), BEEP();
if (TRIGBYNAME("BLINK off"))  REST("http://192.168.1.23/OFF"), BEEP();
```
* If you want, you can use a _smart switch virtual Tuya_ to implement a 'proxy' to control the ON/OFF state of the ESP3266: when the proxy is ON it blinks, otherwise it doesn't. Once you've done this, you can control the proxy in the standard Tuya 'scenes'!

These two IoTwebUI rules copy the state of 'blink-proxy.switch_1' to the ESP3266, via rest, using the appropriate command (in this case the response is TEXT - not JSON - and so we use the MACRO `REST()`).

![image](https://github.com/user-attachments/assets/5de0a999-f4a5-4636-b084-b8167fcea8fa)
```
if(ISTRIGGERH(!!GET("blink-proxy", "switch_1", false))) REST("http://192.168.1.23/ON"), BEEP();
if(ISTRIGGERL(!!GET("blink-proxy", "switch_1", false))) REST("http://192.168.1.23/OFF"), BEEP();
```
note: these commands have latency due to TuyaCloud loops!

<hr>

**General Considerations:**

* Galvanic isolation between the low voltage control circuit and the 230V power circuit is crucial for safety and the ability to make changes.
* Knowledge of the electrical characteristics of the input pin (voltage, current, activation threshold) is essential for the integration of sensors and microcontrollers.
* Using an ESP32 microcontroller opens the way to more advanced features, such as complex signal processing and wireless communication.
