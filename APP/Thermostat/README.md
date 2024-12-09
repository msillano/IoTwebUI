# WEB Thermostat
[vesrsione italiana](https://github.com/msillano/IoTwebUI/blob/main/APP/Thermostat/thermostat01_LEGGIMI.md) 

This complete SW chronothermostat uses the measurements of one (or more) Tuya temperature probes to control a smart switch for heating (cooling).
It is the union of three elements:

1. SmarLife interface (local/remote) obtained with a **virtual device**
2. An **x-device** that contains all the operating logic
3. A **WEB graphical** interface (optional)

### Virtual device

The interface on SmartLife, also for remote use, uses a [virtual device](https://www.tuyaexpo.com/product/1104012), and allows the main user control functions:

![](https://github.com/msillano/IoTwebUI/blob/main/pics/virtual%20thermo.png?raw=true)

_Switch:_ ON/OFF, acts on heating/cooling <br>
_Mode:_ choice between Manual, ECO, Program:
* _Manual_: target temperature (Setpoint) adjustable in steps of 0.5 °C
* _ECO_ is a low (high) predefined temperature, that allows the restoration (1h) of the regime temperature to be made quickly, used in the event of prolonged absences. e.g. 16.5° (30° in the event of cooling).
* _Program_: target temperature (Setpoint) programmed for time slots defined for 7 days. To define the temperature profile the virtual interface is not used (limited to 4 daily intervals), but the user must set it in `addon/thermostat01.js`, without interval limits.

_Setpoint:_ The desired temperature (mode _Manual_) or a temporary change to the programmed temperature (mode _Program_).<br>
_ChildLoch_, _Weekly Program_, _Timer_ (all in settings - _Settings_) are NOT available in the 'virtual device': _Weekly Program_ and _Timer_ have alternative implementations.

_note: the HW-related functions are, obviously, not usable on a virtual device! (They are crossed out in the figure). In particular, the current temperature ('Room Temp') cannot be read, it is accessible using SmartLife by opening the Tuya devices kept as thermometers or using IoTwebUI, in the x-device tooltip, or using the user interface._

### x_device 
A **x_device** (default name "WEB Thermostat") for **IoTwebUI** takes care of:
1. Connection with the (real) _temperature sensors_, one or more: a moving average is used to improve sensitivity and reduce noise.
2. Connection with the _virtual device_ to read the values ​​set by the user.
3. Thermostat operation logic:
   * Winter (heating) or summer (cooling) operation is set in `addon/thermostat01.js`.
   * A correction `offset` can be applied to the temperature read by the probes (in `addon/thermostat01.js`).
   * It makes comparisons with an adjustable +/- `delta` (in `addon/thermostat01.js`), so it is a comparator with hysteresis. Recommended `delta = 0.3`°C
   * In 'auto' mode (i.e. Program) a manual change of `Setpoint` takes effect until the next scheduled interval.
   * `TimeON` provides the daily on-time (in hours). The countdown restarts every day at 24:00
4. There are _two outputs_: one for heating (`HOTout`) and one for cooling (`COLDout`). Values ​​`true/false`.

![](https://github.com/msillano/IoTwebUI/blob/main/pics/IoTwebUI03.png?raw=true)

All data is visible in the IoTwebUI tooltip, therefore accessible via 'RULE'.
In particular, two RULES (**IoTwebUI**) are needed to act on the heating (cooling) `swart switch`. Example, ON/OFF for heating (using defaults):

```
   if(GET("WEB Thermostat","HOTout", false)) SCENE("HOTTURNON");
   if(!GET("WEB Thermostat","HOTout", false)) SCENE("HOTTURNOFF");
```

_`HOTTURNON` and `HOTTURNOFF` are two Tuya 'tap-to-run' that turn on/off the heating: they are called at every loop (similarly for cooling)._

**TIMER**: ON/OFF schedule. If the heating (cooling) follows a predefined schedule (e.g. centralized), two Tuya 'automation' that turn on/off the virtual device at the same times are useful:

```
## thermostatSTART:
If
. Schedule 7:00 (Every day)
Then
. HeatingThermostat-vdev0.Switch : ON

## thermostatSTOP
If
. Schedule 23:00 (Every day)
Then
. HeatingThermostat-vdev0.Switch : OFF
```
note: If the virtual device is OFF, the x-device will continue to work, but its outputs will be _false_.

**WEEKLY PROGRAM** is implemented in `addon/thermostat01.js` and must be defined by the user, like this:

```
var Tprg = [
    DAYMAP(16, "08:00", 20, "18:00", 21, "23:00"), // Sunday
    DAYMAP(16, "08:00", 20, "11:00", 16, "18:00", 21, "23:00"), // Monday
etcetera...
```

A temperature is indicated for each interval, followed by the end time, circularly. The previous example reads:

```
Sunday: from 11:00 PM to  8:00 AM => 16°
        from  8:00 AM to  6:00 PM => 20°
        from  6:00 PM to 11:00 PM => 21°
etcetera...
```

**MULTIPLE INSTANCES**. The virtual device can have only one instance, but you can use a single _virtual device_ for multiple _x-devices_ (e.g. one per room) each with probes, profiles, and a 'smart relay' or a controlled solenoid valve! <br>
The only caveat is to create and include multiple `thermostatXX.js` files and change the name (`function THERMOSTATXX`(...)) for each instance, to be able to have different settings.

### User Interface
**WEB thermostat x-device** is complete and self-sufficient.

However, an ad hoc WEB interface is available, which uses **RESTserver**, to keep an eye on all data!

![](https://github.com/msillano/IoTwebUI/blob/main/pics/thermostat01.png?raw=true)

_note_:

* _The interface is completely optional, it does not intervene with the operating logic of **WEB thermostat**._
* _The graph covers 24 hours and initializes every day at 00:00._

### Pro
- Extremely configurable, like a classic chronothermostat, with extra functions:
    - possibility of using multiple temperature probes, and a moving average, to improve sensitivity and readiness.
    - daily programming with a variable number of intervals.
    - counting of the ON time of the boiler (air conditioner).
    - real-time updated graph.
    - use of the general features of IoTwebUI; alarms (even vocal), Logging, etc...
    - usable for heating or cooling
- The project is OpenSource, written in JS, and very commented, so it is easy to modify it to adapt it to specific needs.
- It can also be used as a monitor for an existing system (central boiler, smart thermostatic valves, etc.): _only the probes need to be connected but NOT the outputs, and must be copied the delta, the temperature profiles and ON/OFF times of the monitored system._

### Cons
- The response times are not fast, due to the polling limits of Tuya Cloud (180s).
- It needs a server (cell phone, top-TV, tablet, PC...) for **IoTwebUI**, running 24/7.
- The timings can be affected by the server and browser load: the best operation is with visible windows.

_These considerations recommend its use not as a primary system, but as an auxiliary device (e.g. extra heating with electric heaters, summer cooling, air conditioning of greenhouses or terrariums or aquariums, checking the operation of smart thermostatic valves, etc...)._

### Installation and Use
_note: many installation and configuration operations require the user to edit files, use the usual warnings:_
* _make a copy of the file before each change_
* _use a UTF8 editor (I use Notepad-plusplus)_
* _be careful NOT to ALTER anything else (especially commas ',' and quotes '"' and "`")._

1. **minimal (without UI)**
   * install **IoTwebUI** on the chosen server (see [IoTwebUI installation](https://github.com/msillano/IoTwebUI/blob/main/LEGGIMI22.md#installation))<br>
_note: initially delete (in file `config.js`) both alarms and Log and set `tuyaInterval = 180` (continuous use) or `tuyaInterval = 60` (occasional use, more ready)._
   * copy into the dir of **IoTwebUI** the necessary files: _from [Github](https://github.com/msillano/IoTwebUI/tree/main/APP/Thermostat) to the `/addon` and `/html` directories of the installed **IoTwebUI**._
   * When **IoTwebUI** works properly, add the [virtual device](https://www.tuyaexpo.com/product/1104012) to **SmartLife**<br>
_note. just read the QCODE with SmartLife._
   * Install in **IoTwebUI** the **x-device** `addon/thermostat01.js`<br>
_note: instructions in the file itself: you need to modify the file `IoTwebUI.html`._
   * Complete the configuration of `addon/thermostat01.js`<br>
_In particular check `xroom` (room: must exist), `xhome` (home: must exist) where the x-device must go, `nodeVirt` (name of the virtual device), and `sonde` (name, function and scale of the Tuya thermometers used). All this data can be read in the **IoTwebUI** tooltips_<br>
_Temperature programming can be done later, as well as the settings of `isHotMode`, `ECOHtemperature`, `ECOCtemperature`, `delta` and `offset`._

   * Create the required 'tap-to-run' in SmartLife (e.g. `HOTTURNON`, `HOTTUROFF`) that turn on/off the heating/cooling, using a 'smart switch'.

   * Create the necessary RULES in IoTwebUI, I recommend permanently modifying `usrrules02.2.js`. Example, with the default names and in case of heating only:

```
   THERMOSTAT01(); // run the MACRO at each loop
   if(GET("WEB Thermostat","HOTout", false)) SCENE("HOTTURNON");
   if(!GET("WEB Thermostat","HOTout", false)) SCENE("HOTTURNOFF");
```

Alternative (example: DO NOT use defaults, room = 'Bathroom', DO NOT use HOME)
```
   THERMOSTAT01("hottub", "Bathroom", null);
   if(GET("hottub","HOTout", false)) SCENE("HOTTURNON");
   if(!GET("hottub","HOTout", false)) SCENE("HOTTURNOFF");
```
_note: the previous RULES rules guarantee readiness, but are active every loop! If you prefer the action ONLY at every ON/OFF state change you can use:_
```
   if(ISTRIGGERH(GET("hottub","HOTout", false))) SCENE("HOTTURNON");
   if(ISTRIGGERL(GET("caldobagno","HOTout", false))) SCENE("HOTTURNOFF");
```
_but these RULES have the 'initial state' problem (like all Tuya conditions, see [post](https://www.facebook.com/groups/tuyaitalia/permalink/1379224052711944/)): if "HOTout" is **true** at the beginning, the heating is NOT turned on! You must then start with "HOTout" = **false** (manually lower the target temperature, wait for the 'flame' light to go off, then restore the desired target temperature!)._

_At the end, launch **IoTwebUI** (file `run_me.bat`) and access the virtual device with **SmartLife** (default: `HeatingThermostat-vdev0`)._

2. **Complete installation**

   * In addition to the 'minimal' installation, install [RESTserver](https://github.com/msillano/IoTwebUI/blob/main/RESTserver/LEGGIMI-REST22.md#impianto-e-configurazione)

   * Complete the configuration of `html/thermostat01.html`<br> _In particular, check x_term (name of the x-device, i.e. `xname`, used in the launch RULE. See above 'caldobagno')._

3. **Use**

   * Launch **RESTserver** (file `rest02.2\run_server.bat`), then minimize the `cmd.exe` window (DO NOT close it!).
   * Launch **IoTwebUI** (file `run_me.bat`)
   * press OK for _INFO: Connected to REST server!_
   * press button: _READY... press to continue_
   * Launch the **interface** by clicking on the file `html\thermostat01.html` (optional). It will open in your favorite browser.

4. **Troubleshooting**

   * Both with **IoTwebUI** and with the **interface** right mouse click, choose 'inspect..'. Then 'console': there the error messages appear.
   * For **RESTserver** the messages appear in the `cmd.exe` window
   * see [issues](https://github.com/msillano/IoTwebUI/issues).

<hr>

OpenSource Project, MIT License, (c)2024 marco sillano

_This project is a work-in-progress: it is provided "as-is", without warranties of any kind, implicit or explicit._




