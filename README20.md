## IoTwebUI 2.0: Tuya Web App open extension

[versione italiana](https://github.com/msillano/IoTwebUI/blob/main/LEGGIMI20.md)

**_Tired of SmartLife's limitations? IoTwebUI 2.0 is here to breathe new life into your smart home, with features that will make you say "Finally!". The 'open' philosophy is in this APP's DNA, enhancing customization and user control._**

_What can you do?_<br>
 👀 Control everything: Intuitive and customizable interface, data always at hand, flexible management.<br>
🔬 Data export: Save historical series for your analysis, in the most useful format<br>
⚡️ Powerful automation: Create complex automation with RULEs, beyond the limits of Tuya!<br>
⏱️ Personalized alerts: Monitor every aspect of your home automation and receive real-time advice or fire action.<br>
👌 Perfect integration: Combine devices, properties, RULEs, and Tuya tap-to-run for smooth and complete automation.

 ![aspetto della versione 2.0](https://github.com/msillano/IoTwebUI/blob/main/pics/ver20-look.png?raw=true)

#### Interface: A Feast for the Eyes and Control

- Choose between the light or dark theme, according to your preferences.
- Navigate through your devices and 'homes' with a draggable and zoomable tree, perfect for keeping everything under control.
- Informative pop-ups with new icons will keep you updated on the status of each property of a device, without missing a single detail.
- A drop-down menu with configuration information and dynamic options will give you quick access to everything you need.
- And if you want to further customize, unleash your creativity with icons, colors, and informative pop-ups of your choice.

#### Data: Safe and Always at Hand

- Record the data of the properties that interest you to files, so you will always have a complete archive of your home automation.
- Calculate moving averages, or decoded or normalized values for an even more in-depth analysis.
- Choose automatic or manual saving, with data format options (CSV or JSON), sampling period, and saving frequency to suit your needs.
- Runtime management: unlimited flexibility

#### Tap-to-run Tuya: Power at Your Fingertips

- A dedicated page with a tab for each "home" allows you to have everything under control.
- Automatic loading at startup for home automation that is always ready for action.
- Launch Tuya tap-to-runs with a simple click and customize button colors for an even more intuitive experience.
- Exclude the tap-to-runs you don't need for a clean and tidy interface.

#### Alerts: Never Miss an Event Again

- You can activate a control function on any property of the devices and choose the "greater than", "equal to" or "less than" tests to monitor every aspect of your home automation.
- Same logic as Tuya conditions, for a common and reliable language.
- Choose from different consequential actions: beep, pop-up, voice message, URL launch, or Tuya tap-to-run.
- Real-time, with an average delay equal to 50% of the Tuya sampling period, for a perfect balance between speed and precision.
- Alert definition at runtime: total control in real-time

#### RULE: Thirst for More Powerful Automations? IoTwebUI 2.0 Has the Answer!

- Perform logical and arithmetic operations and use variables for unlimited flexibility.
- Compare the values of two different properties, for even freer automations.
- Perform complex actions, such as activating Tuya tap-to-runs or sending commands to other applications via REST.
- **How does it work?**
  1. Create RULES at runtime with a user-friendly interface, even if you are not an experienced programmer.
  2. Use predefined MACROs for common and repetitive tasks, saving time and effort.
  3. Test your RULES in real time to be sure they work perfectly.
  4. In case of an error during the test, a pop-up will indicate the line and type of error for a quick and precise resolution.
  5. Export your RULES to include them in the configuration file and make them permanent.

#### EXPERT Mode: To Control Everything Controllable

EXPERT mode offers total control over the customization of IoTwebUI.
  - Access the configuration interfaces and make changes that will be valid only for that run.
  - Copy the data from the "export pad" to the configuration files to make your choices stable.
  - You can disable EXPERT mode in the configuration when you have finished customizing.

<hr>

## Implementation and Usage Notes

- IoTwebUI is a web-based application that provides a user-friendly interface for interacting with Tuya smart devices. It is derived from a similar interface designed for TuyaDAEMON and utilizes the Vis-Network library for its visualization capabilities.

- Modern browsers implement the CORS (Cross-Origin Resource Sharing) security protocol, which restricts web applications from making requests to servers other than the one that served the web page. This poses a challenge for IoTwebUI, as it needs to access the Tuya Cloud to retrieve device data. It is necessary to disable CORS when launching the browser (see `run_me.bat` file):
```
chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security
```
As an alternative to the 'bat' file, the 'Cross Domains - CORS' extension can be used with some browsers, see [ISSUE4](https://github.com/msillano/IoTwebUI/issues/4).

- Tuya sets limits on the frequency of cloud access. IoTwebUI takes this into account, and the initial phase (when it reads all the data from the Cloud) is blocking and not very short (3-5 s, depending on the number of devices). 

- A second problem is the impossibility of creating files directly from an HTML page, again for security reasons. To export the data I used a logging library on the `debugout.js` file. For this reason, control over the generated files is not complete, and small manual interventions are required on the exported files.

- The datalog files are saved in the download directory, with the name tuyalog-hh-mm-ss.csv|json.

- For the same reason it is not possible to update the configuration files from the APP. I chose a compromise solution, which involves user intervention with a simple copy-paste.

- Operation continues normally even if the browser window is iconized.


### User Interface

The user interface of IoTwebUI provides a clear and organized layout for managing Tuya smart devices. It features:
![](https://github.com/msillano/IoTwebUI/blob/main/pics/tootip20.png?raw=true)

The tooltips, which open when you hover the mouse over a device icon, contain all the properties included in the 'status' of the device, with the names and values ​​used by Tuya Cloud. Some values ​​can be hardcoded. <br>
Some small icons provide further information to the user (see figures above):
 - `tuya_bridge.switch_1` is under observation for an 'alert'
 - `tuya_bridge.switch_inching` is an example of an encoded value (AAAC). <br> _note: If you are interested in decoding Tuya values, many functions have been developed for tuyaDAEMON (see 'core_device', 'ENCODE/DECODE user library' node)._
 - `temperature studio.va_temperature` is saved to the 'datafile', along with the other data in `logList`.
 - The Alert (special icon) was triggered for the `living room temperature` device
 - `living room temperature.va _humidity` is the cause of the Alert, and the condition is also indicated (>40)
 - The `thermo studio` tooltip is customized to present temperatures with the correct decimals. (note: only in the tooltip: Alert and RULE always use the value provided by Tuya Cloud, i.e. 222 and 190).
 - In EXPERT mode the following values ​​are added to the tooltips:
     - `isa`: name of the Tuya 'type' of the device (in code it is `device.category`). In total around 600 types.
     - `id`: `device.id`, required by some HUBs (e.g. TuyaDAEMON, Homebridge, HA, etc..).
     - `key`: `device.local_key`, required by some HUBs

### tap-to_run Tuya
All 'taps-to-run' are presented by 'home' (max 100) and in alphabetical order.
Tap-to-run names can go two ways:
 - Use prefixes to group related commands in IoTwebUI.
 - Be easy to remember and recognize (if you use voice commands with Google or Alexa).<br>

### Logging and data  export

It is possible to export some data to a file: the user must only specify `device` and `status` (property) to identify the data of interest and these are saved at regular intervals (minimum 1 minute) in an internal buffer (max 5000 records - equal to 80h @1 rec/min), then exported to a file automatically or by user command.<br>
The user can choose between two formats: `CSV` (suitable, for example, for DB and spreadsheets) or `JSON` (for more complex processing with ad hoc programs) with very little editing on the files (see beyond formats).
<TABLE width = "100%" >
 <TR>
 <TD>
 In EXPERT mode, clicking on a device opens a dialogue, in the upper part it concerns the export of data to file:
 <ul>
 <li> <b> newLog </b>- add to the log (only for the current run)
 <li> <b>clear dev </b>- deletes the device from the log, (all properties)
 <li> <b> config </b>- opens pop-up to see current log definitions <br>
 <i>Permanent 'logs' are in the `config.js` file: they can be edited directly or copied from the pop-up.</i>
 <li> <b> cancel </b>- closes the dialog.</ul>
 </TD>
 <TD>
 <img src="https://github.com/msillano/IoTwebUI/blob/main/pics/alert20.png?raw=true" />
 </TD>
 </TR>
</TABLE>

In EXPERT mode, a command is available in the menu to have the entire data structure obtained from Tuya Cloud in the console ('Dump data'): it can be explored at each level in the console pad or it can be copied with copy&paste in JSON format.

### Alerts and notices
In EXPERT mode, clicking on a device opens a dialogue which in the lower part allows the definition of the 'Alerts':
<TABLE width = "100%" >
 <TR>
 <TD width="200px">
 <img src="https://github.com/msillano/IoTwebUI/blob/main/pics/alert21.png?raw=true" />
 </TD>
 <TD><ol>
 <li> Choice of condition: 'greater', 'equal' or 'less'
 <li> The comparison value, a number (24), or a string (e.g. true) without quotes (").
 <li> Associated message: <ul> is used
 <li> in Alerts with 'pop-up'
 <li> is the text read in the 'voice' case
 <li> or it is a URL and then it is open in the browser
 <li> or is the name of a 'tap-to-run' that is executed </ul>
 <li> Action: one or more of 'beep' 'pop' and 'voice' (URL and tap-to-run are automatic) </li></ol>
 </TD>
 </TR>
</TABLE>
 _note:_ 

- _If you do not choose actions and do not fill  the 'message', the default action is the change of icon on the diagram and in the tooltip._
- _The 'alerts' do not, for simplicity, have a time filter: if defined they are active 24/7. If some conditioning is needed, it is possible to create an ad-hoc RULE._
-  _The 'connected' is not included in the properties, and therefore 'Alert' cannot be defined. But it is available as MACRO in RULE._
-  _To have both 'pop' and 'tap-to-run', create two Alerts with the same conditions: in one the 'message' will be the text for the 'pop-up', and the name of 'tap-to-run' is another._

Buttons:
 <ul>
 <li> <b> newTest </b>- adds a new Alert (only for the current run)
 <li> <b>clear dev </b>- deletes all device alerts (only for the current run)
 <li> <b> config </b> - opens pop-up to see current alert definitions. <br>
 <i>Permanent 'Alerts' are in the `config.js` file: they can be edited directly or copied from the pop-up.</i>
 <li> <b> cancel </b>- closes the dialog.</ul>

### RULE: no limits automations.
 In EXPERT mode the menu presents the "RULE page" option which opens a page dedicated to managing the RULES:
<TABLE width = "100%" >
 <TR>
 <TD>
 An important part is dedicated to a RULE editing pad (for details see below).<br>
<i>Note: if you prefer to use a more powerful external editor, you can certainly do so, with copy-paste.</i><br>
Two sets of RULES can be managed: those in <i>use</i>, initially read from the `usrrulesXX.X.js` file, and the new ones, <i>in Edit</i> in the pad.
<br>

 The buttons present offer the following functions;
 <ul>
 <li> <b> Clear </b>- clears the edit area.
 <li> <b> Load </b>- copies the RULES currently in use to Edit pad.
 <li> <b> Replace </b>- the RULES currently in use are replaced by those in edit.
 <li> <b> Export </b>- Creates a pop-up to see the definitions of the RULES in use. <br><i>The permanent RULES are in the 'usrrulesXX.X.js' file: they can be edited directly or copied from the pop-up.</i>
 <li> <b> Test Start </b>- Start test of the RULES in Edit: the RULES in use are suspended.
 <li> <b> Test End</b>- End the Test and restore the previous RULES (auto in case of error)
 </ul>
 </TD>
 <TD>
 <img src="https://github.com/msillano/IoTwebUI/blob/main/pics/rules20.png?raw=true" />
 </TD>
 </TR>
</TABLE>
<HR>

**Safety NOTES**<br>
_To ensure maximum security, **IoTwebUI** operates exclusively in read-only mode, without making any changes to your data on Tuya Cloud._ <br>

_**This APP is totally open, without any protection, and contains your credentials in clear text in the files!**_ <br>
_DO NOT make it accessible from the outside or by third parties, otherwise all your data, including Tuya credentials, are exposed!_

<hr>

### Versions

- 2.0 Major functional update.
 - Added the ability to activate Tuya's "Tap-to-Run" scenes from this APP.
 - Added 'Alerts': check values ​​and perform actions (options): beep, pop-up, voice message, open URL, tun 'Tap-to-Run'
 - Added "User RULES" (RULE) for unlimited user automations (requires basic js skills)
 - Added "Alert register" for alerts and rules
 - Added interface for defining the data to be recorded on the dataLog file, with export in the configuration, for easy maintenance
 - Added interface for defining alerts, with export to configuration, for easy maintenance
 - Added interface for editing and testing rules at run-time, with export to configuration, for easy maintenance
 - Redesigned interface with Bootstrap 5.3, smooth and with light/dark mode, for a better user experience
 - Dynamic disappearing menu, to have maximum space available for the graph.

- 1.2 Functional update.
 - Added the possibility to exclude some 'homes' in 'config'
 - Two modes introduced: normal | expert
 1. DUMPing Tuya data in the console is only possible in expert mode
 2. In 'expert' mode 3 new data are added to the tooltip (if available)

- 1.1 Bug fixes

- 1.0 Initial release

### Installation

1) Download and unzip the `IoTwebUI.x.x.zip` file into a directory (with the permissions required by the OS).
2) Perform the configuration operations
3) The main file is `IoTwebUI.html`. A WEB server is NOT necessary, as the code is all JavaScript, executed by the browser. To launch it see `run_me.bat` file (for Windows - Chrome). For other S.O. create a similar script. (Ignore the Chrome message: "you are using an unsupported command line warning: - disable-web-security...": not supported but working).<br>
note: The "Cross Domain - CORS" addon seems to solve the problem without BAT files, see [ISSUE4](https://github.com/msillano/IoTwebUI/issues/4).
5) During the installation and setup phase, the console (in the browser - tools for programmers -, or 'inspect' contextual menu) is useful because the IoTwebUI information and error messages go there.<BR>
In the images: on the left boot OK (Chrome, CORS disabled) on the right in case of CORS error (Opera):

<div><img src="https://github.com/msillano/IoTwebUI/blob/main/pics/okconsole.png?raw=true" alt="normal start" width="300" />
 <img src="https://github.com/msillano/IoTwebUI/blob/main/pics/CORSerror.png?raw=true" alt="CORS error" width="400" align="right" />< /div>
  
 ###  Configuration

The **IoTwebUI** app is not for novice users, therefore it is acceptable to configure directly by editing a file (`config`.js). _The usual warnings: make a copy of the file before any modification, use a UTF8 editor (I use Notepad-plusplus), and be careful NOT TO ALTER anything else (especially commas ',' and single quotes '"' and "`"). _

 - The ESSENTIAL data to enter are your `Tuya credentials` for the 'platform.tuya'. <BR> Users of tuyaDAEMON, Homebridge, HA, and other similar hubs should already have them, but new users need to sign up, there are many guides on the web. [This](https://github.com/iRayanKhan/homebridge-tuya/wiki/Get-Local-Keys-for-your-devices) is one of the clearest, others are [listed here](https://github .com/msillano/tuyaDAEMON/wiki/50.-Howto:-add-a-new-device-to-tuyaDAEMON#1-preconditions). An advantage is that you have access to the Tuya platform, with a lot of data on your devices, and technical documentation.

- Other options concern: timing (Cloud and log) and log configuration: the format, the autosave, the required values, or the look&feel, such as the presence of the pan/zoom buttons. <BR>From version 1.2 the possibility of excluding some homes (`hide_homes` array), and from version 2.0 the possibility of excluding some tap-to-run (`hide_scenes` array).

- In `config.js`, the variable `expertModeEnabled = false` allows you to disable the 'EXPERT' mode.

. From version 2.0 the definitions for 'dataLog' (`logList` in `config.js`), 'Alert'(`testList` in `config.js`), and RULE (`usrRules` in `usrrulesXX.X.js`) can be created in the APP, with simple user interfaces, and then exported to be copied into the respective files.

- Update the `run_me.bat` launch file with the host system paths.

## Customizations

The **IoTwebUI** is OpenSource, in HTML+Javascript, and it is quite documented and modular. So any intervention is possible.
Some areas have been prioritized and the respective functions are in separate files for simplicity - `custom.js` and `usrrulesXX.X.js` with detailed instructions and examples:

 - _Tuya no longer allows you to change the icons, due to a questionable interpretation of its legal advisors of current copyright laws._
For this APP, however, I chose the `awesome4` icons, with a [very wide choice](https://fontawesome.com/v4/cheatsheet/) and free to use. By default, all devices have the same icon, a cube.<br>
But they are easily customizable by the user: just provide a device selection criterion and the indication of the `awesome4` icon to use. As an example, they have special icons (see images):
 - Thermometers (a device with the name 'Temp...').
 - thermostatic valves (a device with the name 'Termo...').
 - Gateways (devices with 'Gateway' in the name).

The special icon that indicates an alert is also customizable: see `alertIcon` in 'config.js'.

 - The content of the tooltips varies depending on the device. It is a sector where the possibility of customization is useful, the chosen method (a filter) allows every freedom: <br>
 - Some values ​​are encrypted: you can choose not to see them - or to decode them, the necessary code is available in TuyaDAEMON, but I discarded this option to avoid having tooltips that are too large.
 - In other cases, you can divide by 10 or 100 to obtain the value in SI units.
 - As a developer, I prefer to have the original Tuya property names, but you can make them more friendly by translating them.
 - If you wish, you can also add new information, for example by deriving it from that of the device (e.g. temperature in °C and also in °F).

- For Tuya 'tap-to-run', you can customize the button color by editing `sceneColor(scene)` in `custom.js`.

- For RULES, the more adventurous can add their own MACROs in the `usrrulesXX.X.js` file.

These customizations are NOT necessary, but they make the use of TuyaUIweb more useful and pleasant.
<hr>
### CSV format

This is an example of a log file in CSV format:
```
[date, time, ROMA.TF_frigo.va_temperature, ROMA.Temperatura studio.va_temperature]
[2024-05-17, 06:35:28, 71, 22]
[2024-05-17, 06:37:28, 71, 22]
... more ...
```
The first row contains the column headers, the following rows contain the data.
The operations to do are the following (in an ASCII editor, for example, Notepad++, with 'global find&replace'):
  1) Remove the square bracket '[' at the beginning of each line.
  2) Replace the final square bracket with a semicolon ';'.

The correct CSV result is the following, which can be imported into many DBs and spreadsheets:
```
date, time, ROMA.TF_frigo.va_temperature, ROMA.Temperatura studio.va_temperature;
2024-05-17, 06:35:28, 71, 22;
2024-05-17, 06:37:28, 71, 22;
... more ...
```
### JSON format
This is an example of a log file in JSON format:
```
[{"home":"ROMA","device":"TF_frigo","status":"va_temperature","result":70,"day":"2024-05-17","time":"19:37:51"},
 {"home":"ROME","device":"Temperatura studio","status":"va_temperature","result":25,"day":"2024-05-17","time":"19:37:51"}],
[{"home":"ROMA","device":"TF_frigo","status":"va_temperature","result":70,"day":"2024-05-17","time":"19:39:51"},
 {"home":"ROME","device":"Temperatura studio","status":"va_temperature","result":25,"day":"2024-05-17","time":"19:39:51"}],
```
Note that all identifying data is added to each measurement, resulting in a more verbose result than the CSV case.<br>
The operations to do are the following (in an ASCII editor, for example, Notepad++):
1) Add a pair of square brackets '[]' to enclose all content.

The correct JSON result is the following, which can be used with JSON parsers to recreate objects:
```
[
[{"home":"ROMA","device":"TF_frigo","status":"va_temperature","result":70,"day":"2024-05-17","time":"19:37:51"},
 {"home":"ROME","device":"Temperatura studio","status":"va_temperature","result":25,"day":"2024-05-17","time":"19:37:51"}],
[{"home":"ROMA","device":"TF_frigo","status":"va_temperature","result":70,"day":"2024-05-17","time":"19:39:51"},
 {"home":"ROME","device":"Temperatura studio","status":"va_temperature","result":25,"day":"2024-05-17","time":"19:39:51"}],
]
```
It is an array of arrays containing the individual measurements (objects).

### RULE - syntax
The particular environment in which the RULES are evaluated entails some limits to the standard js syntax:
- **Important**: the code is executed one line at a time, it is not possible to write js blocks that occupy multiple lines! To contain the length of the lines, use intermediate variables (see examples).
- always define the variables with the syntax: **var** `_foo` **=**...
- always use an underscore **_** as the first character in the _variable name_: this avoids interference with other variables.
- Default values: `true` and `false` for conditions; numeric constants are dotted, English style (`3.14`), and all strings need quotes (`"today "`);
- Use **//** for comments, they continue to the end of the line
- The most useful js operations are the arithmetic ones (**+, -, *, /**), the logical ones for the conditions: (**&&** -and, **||** -or, **!** -negation) and comparison operations: ( **&gt;**, **==**, **!=**, **&lt;**, **&gt;=**, **&lt;=**); string concatenation is simply done with the **+** ("hours " **+** "10:30").
- Pay attention to the '+': in `a + b`, if `a` and `b` are both numbers, it adds, but if one is a string, the other is automatically converted to a string too. And the `number => string` conversion can lead to surprises when they are not integers! Always use the MACRO ROUND() when you need to use decimal numbers in strings (see examples).
- the RULES are executed at each loop, after any update from Tuya Cloud. Many MACROs must therefore maintain their state between one run and the next and are identified with (*).
- The most useful js construct in RULES is the **if** (conditional execution), which takes various forms:<br>
 **if(** `condition` **)** `action;` <br>
 **if(** `condition1 && condition2` **)** `action1`**,** `action2;` <br>
 **if (** `condition` **)** `action1` **else** `action2;` <br>
- **Important**: As implemented, memory-using MACROS (*) CANNOT be used in the `action` part of an **if**. For similar reasons, **nested ifs** (an **if** in the action zone of another **if**) are not allowed. These are constraints that do not, however, pose serious limitations.

<hr>

**EXAMPLE 1**: used to test MACROs, works with my devices (needs to be modified for yours). <BR>
```
// -- various temperature calculations with popup and logging:
//  using variables, and MACROS: GET() AVG() ROUND() EVERY() POP() DATALOG()
 var _tf = GET("TF_frigo","va_temperature"); // read temperature sensor
 var _tm = AVG(_tf, 12);                     // get average from last 12 valus
 var _tr = ROUND( _tm/10,  -1);              // round to the nearest ten
 if(EVERY(8)) POP( "FRIGO", "Frigo: "+ _tf/10 + "°C, media: "+_tm/10 +"°C, round " + _tr +"°C");                   // divisions can get problems in numbers!
 DATALOG("frigo.media", _tm/10);            // saves average on file
 
// using again _tf, and MACROS: ISCONNECTED() ISCHANGED()  TIME() VOICE() ROUND()
// note: the delay is a function of the Tuya polling interval and  the device data period.
// In strings, ROUND can be used to cut a number. 

 var _annonce = "Alle ore " + TIME(hrs)+" la temperatura è cambiata. Il frigo è a " + ROUND(_tf/10, 1) + " gradi";
 if(ISCONNECTED("TF_frigo") && ISCHANGED(_tf)) VOICE(_annonce);    

// -- more functions (testing purpose):
// using MACROS: WEEKMAP() BEEP()

 if ( WEEKMAP("DLMM-VS")) BEEP();  // stupid beep every Tuya polling, but not Thursday

// using variables, and MACROS: ISTRIGGERL() DAYMAP() SCENA()

 var _trgl = ISTRIGGERL(GET("tuya_bridge", "switch_1"));
 if(DAYMAP(false,"08:30", true, "22:00") && _trgl) SCENA('sirena2');

// Voice message if someone keeps the door open
// using variables and MACROS: CONFIRMH() ALERTLOG()
// note: this example shows how to debug RULES, using single functions per line and 'console.log()' to see the values of variables.
// note: after an if()  you can use a comma ',' to execute more than one action. 

var _doorev = GET("Sensore porta", "doorcontact_state") ;   //event: true if door open
var _dooropen = CONFIRMH(_doorev, "01:20");         // true only after 1:20
if(ISTRIGGERH(_dooropen)) VOICE("chiudere la porta, grazie"), ALERTLOG("ingresso", "porta aperta") ;
console.log("DOOR", _doorev, _dooropen);
```
**EXAMPLE 2** - A concrete case of heating control <br>
_I have central heating, with thermostatic valves on each radiator: each room has its desired temperature profile (Ttarget). Everything works very well, except in exceptional cases (for example, system shut down for maintenance)._ <br>
 I would like to implement a strategy of this type with Tuya: _if the room temperature is 'a certain amount' lower than Ttarget, turn on the air conditioner as a heat pump with the same Ttarget._ That is:

 `If ​​(( Ttarget - Tambiente ) > tot) => clima.warm( Ttarget )`

_This automation cannot be achieved with Smartlife_, nor with Alexa or Google, because:
 - arithmetic operations cannot be used,
 - comparisons can only be made with constant values,
 - there are no parametric tap-to-runs or at least those with dynamic names.

Am I asking too much? An 'open' system should allow these automations. Or not? In fact, with RULES _it can be done_! <br>
_Some preconditions: My thermo-valve ('Termo bed') has the properties 'temp_set' and 'temp_current'.
For simplicity, I only used the values ​​16, 20, and 21 °C as the Target temperature: in this way I only need 3 taps-to-run called Tletto16, Tletto20, and Tletto21, to turn on and set the air conditioner._
```
var _tot = 2.3; // to be calibrated next winter
var _Ttarget = GET("Temperature read", "temp_set") ;
var _nowClima = ISTRIGGERH( ( _Ttarget - GET("Termo read", "temp_set") ) > _tot);
if (_nowClima) SCENE("TLetto" + ROUND( _Ttarget, 0) ), ALERTLOG("RULE Tletto", "clima on") ;
```

### RULE - MACRO
We can divide the MACROS into two groups: the first manages interactions with the resources available in **IoTwebUI** (a sort of internal API). The second group contains general-purpose MACROs, modifying the input data in some useful way.
_note: the objective of MACROs is not to duplicate the functionality of Tuya rules (although sometimes there is overlap): e.g. there are no MACROS for 'weather' or 'delay', but rather that provide more advanced calculation tools, to obtain 'automations' that were previously impossible. Using virtual devices and tap-to-run  you can divide tasks between Tuya scenes (automations and tap-to-run) and RULE in the most efficient way._ <br>
Obviously, you can always add new MACROs, either as customization (if you create new MACROs, let me know) or in new releases of **IoTwebUI**.
<hr>

#### MACRO for resources
<dl>
<dt>ISCONNECTED(device)</dt>
<dd>Returns 'true' if the device (name or ID) is connected. <br>
note: the data comes from the Cloud, it may differ from the local value shown by SmartLife. </dd>

<dt>GET(device, property)</dt>
<dd>Returns the 'property' value (the original names shown in the tooltip) of the device (name or ID)</dd>

<dt>DATALOG(name, value) (*)</dt>
<dd>Adds a new 'value' to the data log file, with the indicated 'name'.<br>
<i>note: saving data during a test begins immediately, but, in the CSV format, the first line with the names is not updated. If necessary, save the log file to have a new updated file. This is only in the testing phase: with the RULES in <i>use</i> from startup there is no problem.</i>
</dd>

<dt>ALERTLOG(name, message) </dt>
<dd>Adds the 'message' to the alert log, identified by 'name'</dd>

<dt>BEEP()</dt>
<dd>Warning signal.</dd>

<dt> POP(device, message)</dt>
<dd>Warning signal.</dd>

<dt>XURL(url)</dt>
<dd>Warning signal.</dd>

<dt>VOICE(message)</dt>
<dd>Warning signal.</dd>

<dt>SCENE(sceneName) </dt>
<dd>Executes a _tap-to-Run_, present in the list read from the Cloud.</dd>
</dl>
<hr>

#### Functional MACROS
<dl>
<dt> ISTRIGGERH(condition) (*) </dt>
<dd> Returns 'true' only when the "condition" passes from 'false to true', preventing the 'true' "condition" from acting at each run (similar to the conditions of Tuya automations). </dd>

<dt> INSTRIGGERL(condition) (*)</dt>
<dd> Returns 'true' only when the "condition" passes from 'true to false' (inverse of ISTRIGGERH). </dd>

<dt> CONFIRMH(condition, time) (*) </dt>
<dd> Returns 'true' only if the "condition" remains 'true' for at least 'time'. Then it stays 'true' as long as the 'condition' is 'true'. Typical case: an open door: see examples.<BR>
time = constant in the formats "hh:mm:ss" or "mm:ss" or "ss". Must be greater than TuyaInterval.</dd>

<dt> CONFIRML(condition, time) (*) </dt>
<dd> Returns 'true' only if the "condition" remains 'false' for at least 'time' (inverse of CONFIRMH).</dd>

<dt>HYSTERESIS (value, test, delta) (*)</dt>
 <dd> Compare 'value' with 'test', using 'delta' as the hysteresis range. The output becomes 'true' if 'value &gt; test + delta/2', or 'false' if 'value &lt; test - delta/2'. </dd>

<dt> EVERY(n) (*)</dt>
<dd> Simple timer: returns 'true' only after "n" executions, cyclic <br>
 A single 'true' value is guaranteed for every nth loop (does not require ISTRIGGERH()).
 'n' is the number of loops; as time: t = n x tuyaInterval (defined in 'config.js' file). </dd>

<dt> TIME(wath) </dt>
<dd> returns a string, "hh:mm:ss" or "mm:ss" or "ss" calculated from the current time, depending on 'wath'.
 'wath': one of the constants defined as follows: <i>hrs</i> = 11, <i>min</i> = 14, <i>sec</i> = 17 (without quotes, they are not strings) .<br>
 Example: <i>"At " + TIME(hrs)</i> </dd>

<dt> DAYMAP(val1, time1, val2, time2, ... more) </dt>
<dd> Returns: up to 'time1' the output is 'val1', from 'time1' to 'time2' the output is 'val2'... continue like this until the last 'time' after which the output is 'val1' again.<br>
Naturally, the 'val' and 'time' values ​​must be present in pairs, as many as needed. All 'times' in "hh:mm:ss" format.<br>
Uses: daily temperature profiles, timed events or enabling for time intervals, etc., depending on whether 'val's are temperatures, or 'good morning'/'good evening', or true/false, etc..
 </dd>

<dt> WEEKMAP(map) </dt>
<dd> 'map' is a string of seven characters, one for each day of the week, starting from Sunday (e.g.: 'DLMMGVS' or 'SMTWTFS' or '1234567'). Only if the character corresponding to today is '-' (hyphen) does it return 'false' otherwise it returns 'true'. <br> Example: WEEKMAP("DLMM-VS") is false only on Thursday. </dd>

<dt> AVG(value, n) (*) </dt>
<dd> Moving average of the last 'n' values: returns a string with 2 decimals.<br>
'n' is yhe number of loops; as time: t = n x tuyaInterval (defined in 'config.js' file).</dd>

<dt> MAX(value, n) (*) </dt>
<dd>Returns the largest of the last 'n' values.<br>
'n' is the number of loops; as time: t = n x tuyaInterval (defined in config.js file).</dd>

 <dt> ZEROMAX() </dt>
<dd>Resets all MAX() present in case of long periods, e.g. 24h.<br>
<i>note: it must be placed after all MAX()s present.</i>
 Example: 'if(ISTRIGGERH(DAYMAP(false, '00:00:00', true, '00:20:00'))) ZEROMAX();'<br>
 </dd>

<dt>ISCHANGED(value) (*) </dt>
<dd> returns 'true' whenever the 'value' changes from the previous value.</dd>

<dt>ROUND(number, pos)</dt>
<dd> Returns a string with 'pos' decimal digits (if 'pos' >0) <br>
 or an integer ('pos' = 0) <br>
 or an integer with zeros ('pos' < 0) <br>
 Examples: 'ROUND (123.567, 2)' = "123.57"; 'ROUND(123.567, 0)' = "124"; 'ROUND(123.567, -2)' = "100";
</dd>
</dl>
(*): identifies MACROS that use memory to save state.

<hr>

OpenSource project, MIT License, (c)2024 marco sillano

_This project is a work-in-progress: it is provided "as is", without warranties of any kind, express or implied._

- _If you develop any interesting extension or application with IoTwebUI let me know: we can insert it here, or in the next release._
- _For problems regarding the code and operation of IoTwebUI, open an 'issue' here ([github](https://github.com/msillano/IoTwebUI/issues))._
- _For more general problems regarding Tuya, SmartLife (Tuya smart) and IoTwebUI, which may also interest other users, please post in the group [Tuya and Smart Life Italia](https://www.facebook.com/groups/tuyaitalia)_

Thanks for your interest
m.s.

<hr>

### Acknowledgments
All trademarks are the property of their respective owners.

- https://getbootstrap.com/docs/5.3/getting-started/introduction/
- https://visjs.github.io/vis-network/docs/network
- https://fontawesome.com/v4/icons/
- https://code.google.com/archive/p/crypto-js/
- https://github.com/inorganik/debugout.js 


