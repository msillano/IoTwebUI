# IoTwebUI 2.2: Tuya WEBAPP open extension #
[versione italiana](https://github.com/msillano/IoTwebUI/blob/main/LEGGIMI22.md)<br>

**_Tired of SmartLife limitations? IoTwebUI 2.2 is here to give new life to your smart home, with an arsenal of features that will make you say "Finally!". <br> The 'open' philosophy is in the DNA of this APP, which enhances customization and user control._**

_What can you do?_<br>
👀 Control everything: Intuitive and customizable interface, data always at hand, flexible visualization.<br>
🔬 Data export: Save historical series for your analysis, in the most useful format<br>
⚡️ Powerful automation: Create complex automation with tap-to-run and RULES, impossible with SmartLife!<br>
⏱️ Customized alerts: Monitor every aspect of your home automation and receive real-time, even voice, alerts.<br>
🎙 Voice commands: integrated with tap-to-run and RULES, in a single APP<br>
🏚 It is a bridge between HOMEs: it can read data from devices in any HOME, use them in RULES, and activate tap-to-run in all HOMEs. Tuya 'scenes' only act on devices in the HOME in which they are defined.<br>
👌 Perfect integration: Combine device, property, voice, RULES, and Tuya tap-to-run for smooth, complete, and reliable automation. <br>


**_New, version 2.2_**
* _REST interface_: web service for simple connection with applications or custom interfaces (document [README](https://github.com/msillano/IoTwebUI/blob/main/RESTserver/README.md)).<br>
* _**x-device**: IoTwebUI virtual devices, recursive: see [addon](https://github.com/msillano/IoTwebUI/tree/main/addon) cooperation mechanism._
* _Examples of custom HTML pages, and widget libraries: see [HTML](https://github.com/msillano/IoTwebUI/tree/main/html) dir._
* _ **x-device** + **WEB interface** => **APP**. See some [APP examples](https://github.com/msillano/IoTwebUI/tree/main/APP)._ 
* _Internationalization_: multilingual user interface versions and the 'voice' module.

![](https://github.com/msillano/IoTwebUI/blob/main/pics/useschema.png?raw=true)

note: _Portable, it can be installed anywhere: on a _smartphone_ or _tablet_, as an alternative interface to SmartLife, for you and other family members. On a _PC_ (Windows, Apple, Linux...) have Tuya on these computers too. On an _Android top box_, use the TV as a Tuya interface!_.

![version 2.1 look](https://github.com/msillano/IoTwebUI/blob/main/pics/ver22.jpg?raw=true)

#### Interface: a pleasure for the eyes and the control

- Choose between the light or dark theme, depending on your preferences.
- Navigate between your devices and the 'homes' with a draggable and zoomable tree, perfect for controlling everything.
- Informational pop-ups with new icons will keep you updated on the status of each property of a device, without missing a single detail.
- A drop-down menu with configuration information and dynamic options will give you quick access to everything you need.
- Voice commands and Voice navigation between the various pages.
- If you want to customize even more, unleash your creativity with icons, colors, and informational pop-ups to meet your needs.
- All texts are grouped in a single file, simplifying translations and customizations.
  
#### Data: safe and always at hand

- Save the data of the properties you are interested in a file, so you always have a complete archive of your home automation.
- Calculate moving averages, and decoded or normalized values ​​for more in-depth analysis.
- Choose automatic or manual saving, with data format options (CSV or JSON), sampling period, and saving cadence to suit your needs.
- Runtime management: unlimited flexibility
  
#### Tap-to-run Tuya: power at your fingertips

- A dedicated page with a tab for each "home" lets you keep everything under control.
- Automatic loading at startup for home automation that's always ready for action.
- Launch Tuya tap-to-runs with a simple click and customize the button colors for an even more intuitive experience.
- Exclude tap-to-runs you don't need, to have a clean and tidy interface.
- A tab is dedicated to RULEs to launch them when needed.

#### Alarms: never miss an event again

- you can activate a control function on any device property and choose the "greater than", "equal to" or "less than" tests to monitor every aspect of your home automation.
- Same logic as Tuya conditions, for a common and reliable language.
- Choose between different consequential actions: silent, beep, recorded phrase, pop-up, voice message, URL launch, or RULE|tap-to-run Tuya.
- Real-Time, with an average delay equal to 50% of the Tuya sampling period, for a perfect balance between speed and precision: Alarms are always displayed, with a pop-up or window.
- Definition of Alarms at runtime: total control in real time

#### RULES: Demand for more powerful automation? IoTwebUI 2.2 has the answer!

- Perform logical and arithmetic operations and use variables for unlimited flexibility.
- Compare the values ​​of two different properties, for even more free automations.
- Perform complex actions, such as performing PID controls, scheduling annually, or receiving data from other applications via REST.
- Triggered based on conditions (like Tuya 'Automations') or command (like Tuya 'tap-to-run').
- For simple cases (only one condition) you can use 'Alarms' (which can trigger 'tap-to-run').
- The RULE language satisfies the Bohm/Jacopini conditions and is therefore 'Turing complete'. More expressive power means for the user to focus on 'what you want to do' and not 'how to do it'!
- How does it work?
1. Create RULES at the run-time with a user-friendly interface, even if you are not an expert programmer.
2. Use predefined MACROS for common and repetitive tasks, saving time and effort.
3. Test your RULES in real time to verify they work perfectly.
4. If an error occurs during a test, a popup will tell you the line and type of error for quick and precise resolution.
5. Export your RULES to insert them into the configuration file and make them permanent.

#### Voice recognition: customizable voice commands

- Trigger every tap-to-run or RULE with "Hey Tuya, run ... "
- Control navigation in the IoTwebUI APP: "Hey Tuya, go to scenes"
- Control the voice with the voice: you can activate continuous recognition or deactivate it completely.
- Optimized modules for different languages

#### EXPERT mode: to control everything controllable

The EXPERT mode offers total control over the customization of IoTwebUI.
- Access the configuration interfaces and make changes that will be valid only for that run.
- Copy from the export "pad" into the configuration files to make your choices stable.
- You can deactivate EXPERT mode in the configuration when you are done customizing.

#### REST Interface: Simple and standard access to IoTwebUI

A _REST server_ interface in **IoTwebUI** provides a powerful, flexible, and standardized way to interact with your IoT devices, simplifying development and integration with WEB applications and interfaces. Optional, see [installation and details](https://github.com/msillano/IoTwebUI/blob/main/RESTserver/README.md#installation-and-configuration).
* Simplicity: The REST architecture is designed to be intuitive
* Flexibility: You can access your IoT devices from any internet-connected device, using any programming language that supports HTTP requests.
* Standards: REST is a widely adopted standard, meaning that many libraries and tools are available to simplify development.
* Independence: The REST interface separates the user interface from the backend, allowing you to update or change one without affecting the other.

#### One APP, an avalanche of functions

* Single point of control: With a single APP, you have a single point to monitor and manage. This simplifies problem resolution and reduces the risk of conflicts between different applications.
* Less dependence on third parties: By eliminating dependences on multiple providers, you reduce the risk of service interruptions caused by external problems, such as server failures or changes to provider policies.
* Greater readiness: reducing the steps between APPs reduces latency times.
* Long-term stability: A single APP offers a more stable solution in the long term since you are not subject to changes in provider policies or service interruptions due to migrations or updates. Furthermore, being OpenSource you have the guarantee of lifetime maintenance.

_In summary, a single APP offers a higher level of reliability thanks to its simplicity, fewer external dependencies, and greater control over the data._

<hr>

## Implementation and usage notes

- IoTwebUI is derived from a similar interface designed for [TuyaDAEMON](https://github.com/msillano/tuyaDEAMON-applications/tree/main/daemon.visUI.widget).
- The choice of the visualization library fell on [Vis-Network](https://visjs.github.io/vis-network/docs/network/) for its good flexibility and ease of use.
- The first problem is the CORS security protocol, which is present in modern browsers. An application (even in js, node-red, etc) does not have this problem, but an APP that runs in a browser does. It is necessary to disable CORS when launching the browser - tested Chrome (Version 125.0.6422.61 - 64 bit):<br>
`chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security`<br>
(see file `run-me.bat`). It is only valid for this instance, the others will remain protected.<br>
On some browsers, in place of to the 'bat' file, you can use the 'Cross Domains - CORS' extension, see [ISSUE4](https://github.com/msillano/IoTwebUI/issues/4).

- Tuya places limits on the frequency of access to the cloud. _IoTwebUI_ takes this into account, and the initial phase (when it reads all the data from the Cloud) is blocking and not very short (3-5 s, depending on the number of devices). As SmartLife does.

- A second problem is the impossibility of creating files directly from an HTML page, again for security reasons. To export the data I used a file logging library [debugout.js](https://github.com/inorganik/debugout.js). For this reason, the control over the generated files is not complete and small manual interventions on the exported files are necessary.
- The datalog files are saved in the `download` dir, with the name `tuyalogDYYYYMMGGThhmmss.csv|json.txt`.

- For the same reason, you can't update the configuration files from the APP. I chose a compromise solution, which requires the user to intervene with a simple copy-paste.
- Again for security reasons, authorization to use the microphone may be requested each time: it depends on the browser and the configuration, but the use of `run-me.bat` can avoid the inconvenience.
- **IoTwebUI** accesses the Cloud data EXCLUSIVELY in reading mode, to avoid any risk of incorrect operations. But this does not limit the functionality of **IoTwebUI** (and IoTrest and user applications): it is possible to perform any update of the device configuration in a _controlled manner_, that is, through a 'tap-to-run'. With this strategy, you have maximum freedom in total safety!
- Operation continues regularly even with the browser window minimized.
- Use only one instance of the APP, otherwise, you will have problems with Tuya tokens.

### User Interface
![](https://github.com/msillano/IoTwebUI/blob/main/pics/tootip20.png?raw=true)

In the tooltips, which open when you hover the mouse over a device icon, you find all the properties included in the 'status' of the device, with the names and values ​​used by Tuya Cloud. Some values ​​can be encoded. <br>
Some small icons provide additional information to the user. Examples (see figures above):
- `tuya_bridge.switch_1` is under observation for an 'Alarm'
- `tuya_bridge.switch_inching` is an example of an encoded value ('`AAAC`'). Decoded is an object:
````
        {
        "inching": false,
        "delay": 2
        }
````
_note: If you are interested in decoding Tuya values, see a [complete example](https://github.com/msillano/IoTwebUI/blob/main/RESTserver/LEGGIMI-REST22.md#customizzazioni)._
- `temperatura studio.va_temperatures` is saved on the data file, with the other data in `logList`.
- For the device `temperatura soggiorno` the Alarm has been triggered (special icon)
- `temperatura soggiorno.va _humidity` is the cause of the Alarm, and the condition (>40) that caused it is also indicated.
- The `termo studio` tooltip is customized, to present the temperatures with the correct decimals and units.
- In EXPERT mode the following values ​​are added in the tooltips:
   - `is-a`: name of the Tuya 'type' of the device (in corresponding code it is `device.category`). In total over 600 types.
   - `id`: `device.id`, required by some HUBs (e.g. TuyaDAEMON, Homebridge, HA, etc..) to access the Cloud.
   - `key`: `device.local_key`, required by some HUBs that use MQTT locally.
  
**[from ver. 2.2.2] Updated Tootips:**

- Added the device name to all tooltips.
- It is possible to 'export' tooltips with [Ctrl] + [click] in a pop-up that can be easily copied with copy-paste.
- The tooltip format is now CSV compatible, using ':' as field separator. So the data of a tooltip is easily importable into a spreadsheet (e.g. Excel) for further use.
- The updated versions of the example x-devices (in GitHub, /addon) are also optimized for export.
  
### Logging and data export
It is possible to export some data to a file: the user must specify only `device` and `status` (properties) to identify the data of interest and these are saved at regular intervals (minimum 1 minute) in an internal buffer (max 5000 records - equal to 80h @1 rec/min), then exported to file automatically or on user command.<br>
The user can choose in configuration between two formats: `CSV` (suitable, for example, for DB and spreadsheets such as Excel) or `JSON` (for more complex processing with ad hoc programs) with very few editing interventions on the files (see [beyond formats](#csv-format)).
<TABLE width = "100%" >
<TR>
<TD>
In EXPERT mode clicking on a device opens a dialog, the upper part concerns the export of data to file:
<ul>
<li> <b> log + </b>- adds to log (only for the current run)
<li> <b> log - </b>- deletes the device from the log, (all properties)
<li> <b> export </b>- opens pop-up to see the definitions of the current log <br>
<i> Permanent 'logs' are in the `config.js` file: they can be edited directly or copied from this pop-up.</i>
<li> <b> delete </b>- closes the dialog.</ul>
</TD>
<TD>
<img src="https://github.com/msillano/IoTwebUI/blob/main/pics/alert22.png?raw=true" />
</TD>
</TR>
</TABLE>

extra: In EXPERT mode there is a command available in the menu to have in the console the entire data structure obtained from Tuya Cloud ('Data object in console'): it can be explored at each level in the console pad or it can be copied with copy&paste in JSON format.

### Alarms and warnings
In EXPERT mode, clicking on a device opens a dialog that allows the definition of the 'Alarms' in the lower part:
<TABLE width = "100%" >
<TR>
<TD width = "200px">
<img src="https://github.com/msillano/IoTwebUI/blob/main/pics/alert23.png?raw=true" />
</TD>
<TD><ol>
<li> Choice of condition: 'greater than', 'equal to' or 'less than'
<li> The comparison value, a number (24), or a string (e.g. true) without quotes (").
<li> Associated message, which has various uses: <ul>
  <li> is a URL to an MP3 or WAV file in the case of 'sound'
  <li> or is a URL and then it is opened in the browser
  <li> or is the name of a 'tap-to-run' or 'RULE' which is executed
  <li> or appears as text in a 'pop-up'
  <li> or is the text read in the 'voice' case
  </ul>
<li> Action: one or more of 'beep', 'pop', 'sound' and 'voice' (URL and tap-to-run|RULE are automatic) </li></ol>
</TD>
</TR>
</TABLE>

_note:_

- _If you do not choose any action and leave 'message' empty, the default action is to change the device icon and update the tooltip, which is always executed._
- _'Alarms' do not have, for simplicity, a time filter: if defined, they are active 24/7. If some conditioning is needed, it is possible to create ad hoc RULES and activate them from the alert (RULES can produce the same actions activated by 'Alarms')._
- _Note that 'connected' is never included in the Tuya properties, and therefore 'Alarms' cannot be defined. But it is available as a MACRO in the RULES._
- _Having only one message, the precedence rules are: SOUND and URL (auto) are examined first, then Tap-to-run and RULE (auto), and only lastly POP and VOICE (compatible: the same message can be used for both); BEEP is always usable._
- _It is possible to define multiple compatible actions, e.g. 'beep' and 'pop-up' (with message)._
- _Instead, to have both 'pop-up' and 'tap-to-run', you need to create two Alarms with the same conditions: in one 'message' will be the text for the 'pop-up', in the other the name of the 'tap-to-run' (auto)._
- _The display of pop-ups can depend on the browser configuration: using 'run_me.bat' will automatically update the configuration for the new browser instance. User actions (e.g. buttons) can temporarily enable pop-ups._ <br>
_However, to show all information, if pop-ups are disabled, the message is presented in an APP window: the difference is that pop-ups can be many, while the window is unique and is reused with a counter._
- _**Alarms** are checked at every Tuya Cloud polling: short duration events, less than `tuyaInterval` cannot be detected._
- _All Alarms are stored and visible in the 'Alarm log', from the main menu._

**Commands:**
<ul>
<li> <b> test + </b>- adds a new Alarm (only for the current run)
<li> <b> test - </b>- deletes all Alarms of the device (only for the current run)
<li> <b> export </b>- opens a pop-up to see the definitions of all current Alarms. <br>
<i> Permanent 'Alarms' are in the `config.js` file: they can be edited directly or copied from this pop-up.</i>
<li> <b> cancel </b>- closes the dialog.</ul>

### tap-to_run Tuya
'Tap-to-runs' ('scenes' starting with 'Run') are presented divided by 'home' on the dedicated page (max 100), and then in alphabetical order, as a series of buttons.
'Tap-to-run' names can have the following constraints:
- 3-word limit if used with IoTwebUI voice commands.
- Use prefixes to group related commands in IoTwebUI.
- Be easy to remember and recognize (if using voice commands).<br>

A pad is dedicated to 'user RULES' identified with a name: they are treated like 'tap-to-runs': they can be used in Alarms, activated with buttons or by voice command, or launched from another RULE.<br>
_Of course 'RULES' and 'tap-to-runs' must have unique names to be identified._

### RULES
In EXPERT mode the menu has the option "new RULES" that opens a page dedicated to [RULE management](#rules---syntax):
<TABLE width = "100%" >
<TR>
<TD>
An important part is dedicated to a RULE editing pad (see below for details).<br>
<i>Note: if you prefer to use a more powerful external editor, you can certainly do so, with copy-paste.</i><br>
You can manage two sets of RULES: those in <i>use</i>, initially read from the `usrrulesXX.X.js` file, and the new ones, <i>in Edit</i> in the pad.
<br>
The commands present offer the following features;
<ul>
<li> <b> Clear </b>- clears the edit area
<li> <b> Load </b>- copies the currently used RULES to the Edit pad.
<li> <b> Replace </b>- the currently used RULES are replaced by the ones in the Edit pad.
<li> <b> Export </b>- Creates a pop-up to see the definitions of the RULES in use. <i>Permanent RULES are in the file 'usrrulesXX.X.js': they can be edited directly or copied from this pop-up.</i>
<li> <b> Test Start </b>- Start testing the RULES in Edit pad: the RULES in use are suspended.
<li> <b> Test End</b>- Ends the Test and restores the previous RULES (auto in case of error)
</ul>
</TD>
<TD>
<img src="https://github.com/msillano/IoTwebUI/blob/main/pics/rule01.png?raw=true" />
</TD>
</TR>

</TABLE>

### VoiceRecognition (English)

- The availability of this feature depends on the browser used.
- It is not easy to achieve the efficiency that you have with specialized HW (smart speakers: Google, Alexa), because the result depends on various factors, including the quality of the microphone used, the related settings, the reduction of background noise, etc... In some tests, I went from over 90% of recognitions to a terrible 20%!
- Also very important is the choice of keywords and names for 'tap-to-run' and 'RULE': for example 'name three words' is difficult to recognize, while 'turn on the light' is easily recognized.<br> I think this depends on the linguistic models used: correct sentences, with a common meaning, are more recognizable than isolated words. For example 'Tuya' is often confused with 'Giulia'.
- The presence of articles and/or prepositions facilitates recognition.
- Voice command is optional, and can be disabled in the configuration.
- If enabled, voice recognition can be used in two ways, either continuously or by pressing a button. The default mode is set in the configuration but can be changed with voice commands.
- the default (English) grammar is the following - in brackets `(to)`: optional words; vertical bar `on|in`: alternative words-:

- _'Hey Tuya, run|activate (the|an*) xxx ((the|an*) xxx ((the|an*) xxx))'_ => launch 'tap-to-run' or RULE, name max 3 words
note on names: when speaking you can add articles or prepositions (*) to the 3 words, which are therefore NOT part of the 'name' of the 'tap-to-run' or 'RULE'. Example:

- _'Hey Tuya, run|activate (the|a|...*) xxx (a|for|...*)(yyy) (a|for|...*) (zzz)'_  ( where `xxx (yyy) (zzz)`: tap-to-run|RULE name) => runs a tap-to-run|RULE
- _'Hey Tuya, (in|to...*) EXPERT mode'_ => opens EXPERT mode
- _'Hey Tuya, (in|to...*) USER mode'_ => returns to USER mode
- _'Hey Tuya, go (to|...*) SCENES'_ => navigation to the 'tap-to-run' and RULE page
- _'Hey Tuya, go (to|...*) RULES'_ => navigation to the edit RULE page (if in EXPERT mode)
- _'Hey Tuya, go home'_ => navigation to the page with device tree
- _'Hey Tuya, VOICE (in|to...*) continuous mode'_ => starts the recognition mode without stopping.
- _'Hey Tuya, VOICE (on*) demand'_ => start recognition mode with button.
- _'Hey Tuya, STOP (the*) voice'_ => stop recognition mode without stopping.

(*) note: _the list of prepositions and articles accepted and ignored in third and subsequent positions is long_: `'the', 'a', 'an', 'to', 'from', 'with', 'by', 'in', 'on', 'at', 'near', 'for', 'far', 'of', 'as', 'now'`: _choose those that facilitate recognition_.

- _note: The implementation also tolerates some inaccuracy in recognition (e.g. 'Julia' instead of 'Tuya', etc..): this can be easily customized. See file i18n/speechX.X.en.js._

- note: For better understanding, sentences can be split in two: "Hey Tuya" + pause: the feedback 'Hey Tuya...' appears, confirming the understanding of the first part; now the second part can be said.
  
_note: the request for consent to use the microphone depends on the browser and the configuration: using 'run_me.bat' there should be no requests._

### REST: client and server
In IoTwebUI there are 2 REST interfaces:

1. _REST client_, implemented as MACRO in two versions: TXT and JSON, allows you to import external data into the RULES, from web services, or even from third-party devices or DIY devices that implement a REST interface. _It is therefore possible to make Tuya interact with custom devices_: to create DIY devices with Arduino or ESP8266 see [example](https://github.com/msillano/tuyaDEAMON-applications/wiki/note-5:-Watchdog-for-IOT#watchdog03-esp01-relay--arduino).
2. _REST server_, for exporting Tuya device data and controlling automations and alarms, towards custom applications or interfaces. For details [see IoTrest documentation](https://github.com/msillano/IoTwebUI/blob/main/RESTserver/README.md).

_These two paths finally allow the integration of Tuya in vertical projects, without altering the basic functioning of Tuya/Smartlife, but enriching it with new potential, with a simpler strategy than the pre-existing alternatives (e.g. tuyaDAEMON, HA, etc...)_

<hr style="height:2px;border-width:0;color:gray;background-color:gray">

## Versions
- 2.2.3 Bug Fixes
    - Updated some MACROs

- 2.2.2 Bug Fixes
   - Added tooltip export function with [Ctrl]+[Click], CSV format (':' separator)
   - Addons and HTML dirs removed from Zip: use the latest versions directly from GitHub!
   - Updated some x.devices (in addon/) and new example app: [TestBattery](https://github.com/msillano/IoTwebUI/blob/main/addon)
     
- 2.2.1 Bug Fixes
  - Added web interface widgets: iotwidget01 and iotwidget02 in html/inc/
  - User interface web (examples) clima01.html and tes02.html in html/ dir.
  - 
- 2.2 Added REST server (IoTrest)
  - Internationalization (IT, EN) for user interface and speech module.
  - Changed menu items

- 2.1.1 Bug fixes [ISSUE10](https://github.com/msillano/IoTwebUI/issues/10): Token expired. [ISSUE11](https://github.com/msillano/IoTwebUI/issues/11): typo.

- 2.1 User experience improvement:
  - Added customizable SpeechRecognition (speech21.js file)
  - Added RULE with 'name', activated with buttons and voice commands
  - Added new MACROs
  - Improved the 'test' function: at the end it restores the context in use.
  - Fallback: if pop-ups are blocked, warnings are shown in a window. No lost messages.
  - Added date to the name of datalog files.

- 2.0 Important functional update.
  - Added the possibility to activate Tuya "Tap-to-Run" scenes from this APP.
  - Added 'Alerts': check values ​​and perform actions (options): beep, pop-up, voice message, open URL, 'Tap-to-Run'
  - Added 'User RULES' for unlimited user automations (requires basic js skills)
  - Added 'Alert register' for alerts and rules
  - Added interface for defining data to log to dataLog file, with export to configuration, for easy maintenance
  - Added interface for defining alerts, with export to configuration, for easy maintenance
  - Added interface for editing and testing rules at run-time, with export to configuration, for easy maintenance
  - Redesigned interface with Bootstrap 5.3, smooth and with light/dark mode, for a better user experience
  - Dynamic drop-down menu, to have maximum space available for the graph.

- 1.2 Functional update.
  - Added in 'config' the possibility to exclude some 'home'
  - Introduced two modes: normal | expert
      1. DUMP of Tuya data in console is possible only in expert mode
      2. In 'expert' mode 3 new data are added to the tooltip (if available)

- 1.1 Bug fixes

- 1.0 Initial release

<hr style="height:2px;border-width:0;color:gray;background-color:gray">

### NOTES on security

**_To ensure maximum security, IoTwebUI operates exclusively in read-only mode, without making any changes to your data on Tuya Cloud._** <br>

_**This APP is totally open, without any protection, and contains your credentials in clear text in the files!**_ <br>
_DO NOT make it accessible from the outside or by third parties, otherwise all your data, including Tuya credentials, are exposed!_

<hr style="height:2px;border-width:0;color:gray;background-color:gray">

## Installation

1) Download and unzip the `IoTwebUI.x.x.zip` file in a dir (with the permissions required by the OS).
2) Perform the configuration operations (see below).
3) For REST server installation (optional), see [details here](https://github.com/msillano/IoTwebUI/blob/main/RESTserver/READ-ME-REST22.md).
4) The main file is `IoTwebUI.html`. A WEB server is NOT necessary, as the code is all in JavaScript, executed by the browser, obviously with JavaScript enabled. To launch it see file `run_me.bat` (for Windows - Chrome). For other S.O. create a similar script. (Ignore the Chrome message: "You are using an unsupported command line flag: - disable-web-security...": unsupported but working.)<br>
5) On a Mac (IOS 10.11.6) the following command line worked:
`xxx:~ yyyy$ open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security --disable-popup-blocking --auto-accept-camera-and-microphone-capture --app=file:///Applications/IoTwebUI/IoTwebUI.html `

note: The "Cross Domain - CORS" addon seems to fix the CORS issue without a BAT file, see [ISSUE4](https://github.com/msillano/IoTwebUI/issues/4).
6) During installation and setup, the console is useful (in the browser - tools for programmers -, or the 'inspect' context menu) because that's where the IoTwebUI information and error messages go.<BR>
In the images: on the left, OK start (Chrome, CORS disabled) on the right, in case of CORS error (Opera):

<div><img src="https://github.com/msillano/IoTwebUI/blob/main/pics/okconsole.png?raw=true" alt="normal start" width="300" />
<img src="https://github.com/msillano/IoTwebUI/blob/main/pics/CORSerror.png?raw=true" alt="CORS error" width="400" align="right" /></div>

## Configuration

The **IoTwebUI** app is not for novice users, so it is acceptable that the configuration is done directly by editing a file (`config`.js). _The usual warnings: make a copy of the file before each change, use a UTF8 editor (I use Notepad-plus-plus), and be careful NOT to ALTER anything else (especially commas ',' and quotes '"' and "`")._

- The ESSENTIAL data to insert are your `Tuya credentials` for the 'platform.tuya'. <BR> Users of tuyaDAEMON, Homebridge, HA, and other similar hubs should already have them, but new users must register, there are many guides on the web. [This](https://github.com/iRayanKhan/homebridge-tuya/wiki/Get-Local-Keys-for-your-devices) is one of the clearest, others are [listed here](https://github.com/msillano/tuyaDAEMON/wiki/50.-Howto:-add-a-new-device-to-tuyaDAEMON#1-preconditions). An advantage is that you have access to the Tuya platform, with a lot of data on your devices, and to the technical documentation.

- It is also ESSENTIAL to update the var 'data_center' according to the one used when installing Tuya/SmatLife. On 'SmartLife/me/Configurare/Account e sicurezza' you will find the Region (e.g, Italy), and in this guide: [https://github.com/tuya/tuya-home-assistant/wiki/Countries-Regions-and-Tuya-Data-Center](https://github.com/tuya/tuya-home-assistant/wiki/Countries-Regions-and-Tuya-Data-Center) you will find the corresponding URL.
Alternatively, you can access `platform.tuya.com`, select 'Cloud', and 'open project'. Now select the 'devices' tab and on the top right you will find the data-center you used. Then in: 'Tuya documentation' - 'Cloud Development > API Request > Request Structure': you will find the list of 'endpoints' (URLs).

- Other options concern: timing (Cloud and log) and log configuration: the format, autosave, the requested values, or the look&feel, such as the presence of pan/zoom buttons. <BR>From version 1.2 the possibility to exclude some homes (`hide_homes` array), and from version 2.0 the possibility to exclude some tap-to-run (`hide_scenes` array).

- The available options for speech recognition are (always in config.js):
1) if it doesn't work well with your HW, you can disable it completely: `SpeechRecognitionEnabled = false;`
2) if it works well, you can eliminate the need to press the button every time: `SpeechRecognitionNeverEnds = true;`.

- Still in `config.js`, the variable `expertModeEnabled = false` allows you to completely disable the 'EXPERT' mode.
- Since version 2.0 definitions for 'dataLog' (`logList` in `config.js`), 'Alert' (`testList` in `config.js`) and RULE (`usrRules` in `usrrulesXX.X.js`) can be created in the APP, with simple user interfaces, and then exported to be copied into the respective files.

- Update with the paths of the host system the launch file `run_me.bat`, to launch Chrome with an optimized configuration.

## Internationalization

* User interface: the files, one per language, named `text02.2.xx.js` are located in the dir 'i18n': the file in use is `text02.2.js`. Replace it with the file of the desired language._<br>
* 'speech' modules: the files, one per language, named `speech02.2.xx.js` are located in the 'i18n' dir: the file in use is `speech02.2.js`. Replace it with the file of the desired language._<br>
If you make files for a new language, send it to me (https://github.com/msillano/IoTwebUI/issues): it will be added!

## Customizations

The **IoTwebUI** is OpenSource, in HTML+Javascript, it is quite documented and modular. So any intervention is possible.
Some areas have been privileged and their functions placed for simplicity in separate files -`custom.js`, `usrrulesXX.X.js`, "i18n/speech0X.X.js", "i18n/text0X.X.js" with detailed instructions and examples:

- _Tuya no longer allows you to change the icons, due to a questionable interpretation of its legal advisors of current copyright laws._
For this APP, instead, I chose the `awesome4` icons, with a [very wide choice](https://fontawesome.com/v4/cheatsheet/) and free to use. By default, all devices have the same icon, a cube.<br>
But they are easily customizable by the user: just provide a device selection criterion and the indication of the `awesome4` icon to use. As an example, they have special icons (see images and `custom.js` file):
- Thermometers (a device with the name 'Temp...').
- Thermostatic Valves (a device named 'Termo...').
- Gateways (a device with 'Gateway' in the name).

Even the special icon that indicates an alert is customizable: see `alertIcon` in 'config.js'.

- The content of the tooltips varies depending on the device. This is an area where the possibility of customization is useful, the chosen method (a filter) allows every freedom: <br>
- Some values ​​are encrypted: you can choose not to show them - or to decode them. In some cases decoding is appropriate: see a [complete example](https://github.com/msillano/IoTwebUI/blob/main/RESTserver/LEGGIMI-REST22.md#customizzazioni).
- In other cases you need to divide by 10 or 100 to get the SI value.

- As a developer, I prefer to have the original Tuya property names, but you can make them more friendly by translating them.
- If you want you can also add new information for example deriving it from the device (e.g. temperature both in °C and °F).

- For the Tuya 'tap-to-run', you can customize the color of the buttons by changing `sceneColor(scene)` in `custom.js`.

- For the RULE, the more adventurous can add their MACRO in the file `usrrulesXX.X.js`.

- All the texts used in the user interface are in the files "i18n/text0X.en.js".
- For VoiceRecognition, in the file "i18n/speech0X.en.js" it is easy to change the words of the proposed grammar: for example, replace 'go' with 'run'. The goal should always be to improve the understanding of commands.
- Adapting speech recognition to other languages ​​is complex, and requires deep knowledge of the language both in grammar and vocabulary. I rely on the collaboration of willing users.
- A bit more complex is adding new voice commands, not so much for the definition of the grammar (the current code can serve as an example) but for the implementation of the actions, which often depend on the existing code.<br>
I would say that for new voice commands, the best way is to make an implementation proposal in the ['issue'](https://github.com/msillano/IoTwebUI/issues), and, based on consensus and feasibility, it could be implemented in the next release.

These customizations ARE NOT NECESSARY, but they are options that make TuyaUIweb more useful and personalized.

<hr style="height:2px;border-width:0;color:gray;background-color:gray">

### CSV format

This is an example of a log file in CSV format:
```
    [date, time, ROMA.TF_frigo.va_temperature, ROMA.Temperatura studio.va_temperature]
    [2024-05-17, 06:35:28, 71, 22]
    [2024-05-17, 06:37:28, 71, 22]
    ... more ...
```
The first line contains the column headers, the following lines contain the data.
The operations to do are the following (in an ASCII editor, for example, Notepad++, with 'global find&replace'):
1) Remove the square bracket '[' at the beginning of each line.
2) Replace the final square bracket of each line with a semicolon ';'.

The correct CSV result is the following, importable in many DBs and spreadsheets:
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
    {"home":"ROMA","device":"Temperatura studio","status":"va_temperature","result":25,"day":"2024-05-17","time":"19:37:51"}],
    [{"home":"ROMA","device":"TF_frigo","status":"va_temperature","result":70,"day":"2024-05-17","time":"19:39:51"},
    {"home":"ROMA","device":"Temperatura studio","status":"va_temperature","result":25,"day":"2024-05-17","time":"19:39:51"}],
```
Note that all the identifying data are added to each measurement, obtaining a more verbose result than the CSV case.
The operation to do is the following (in an ASCII editor, for example Notepad++):
1) Add a pair of square brackets '[]' to enclose all the content.

The correct JSON result is the following, usable with JSON parser (e.g. Notepad++ + JSON Viewer) to recreate the objects:
```
    [
      [{"home":"ROMA","device":"TF_frigo","status":"va_temperature","result":70,"day":"2024-05-17","time":"19:37:51"},
       {"home":"ROMA","device":"Temperatura studio","status":"va_temperature","result":25,"day":"2024-05-17","time":"19:37:51"}],
      [{"home":"ROMA","device":"TF_frigo","status":"va_temperature","result":70,"day":"2024-05-17","time":"19:39:51"},
       {"home":"ROMA","device":"Temperatura studio","status":"va_temperature","result":25,"day":"2024-05-17","time":"19:39:51"}],
    ]
```
It is an array of arrays containing the individual measures (objects).

<hr style="height:2px;border-width:0;color:gray;background-color:gray">

### RULES - syntax
'RULES' are encoded in `JavaScript`. The particular environment in which RULES are evaluated entails some limitations to the standard JavaScript (js) syntax, as we will see in these notes. RULES are executed cyclically, after each data poll from the Tuya Cloud, therefore each `TuyaInterval` (see `config.js`). Sometimes there are extra executions, for example when RULES are activated by name.

- **important**: the code is executed one line at a time, it is not possible to write js blocks that occupy multiple lines! To contain the length of the lines, use intermediate volatile variables (see examples).
- Define the volatile variables (valid for only one run of the RULES) always with the syntax: **var** `_tizio` **=**..., then they can be used freely.
- It is also possible to define multiple variables at the same time, Example `var _var1, _var2 = 0;`: both `_var1` and `_var2` are initialized to 0.
- To define permanent variables (valid for all runs) use the MACROs: VSET(name, value) and VGET(name).
- Always use an underscore **"_"** as the first character in the _variable name_: this way you avoid interference with other program variables. Do not use 'strange' characters in variable names: better to limit yourself to [A..Za..z0..9] and '_'.
- The 'semicolon' **";"** at the end of the line is optional, but I strongly recommend to always use it.
- JavaScript is a 'case sensitive' language, that is, it distinguishes between UPPERCASE and lowerCASE, so be careful to always write variables in the same way (I recommend all lowercase, or the 'camel' technique for composite names: **`_variabilePocoUsata`**) to distinguish them at a glance from MACROS (always UPPERCASE).
- _Default values:_ **`true`** (true) and **`false`** (false) for conditions; numeric constants are with a dot, in English (**`3.14`**). All strings require quotes (**`"oggi "`** or **`'domani '`**). A quote can be inserted in a string if the other type of quote is used for the entire string. Example: `"At dawn "` OK , `'He said: "I'm tired"'` OK, but NOT `'At dawn'` !.
- Use **//** for comments, they continue to the end of the line
- The most useful js operations are the arithmetic ones (**+, -, *, /**), the logical ones for conditions: (**&&** -and, **||** -or, **!** -negation) and the comparison operations ( **&gt;**, **==**, **!=**, **&lt;**, **&gt;=**, **&lt;=**); string concatenation is done simply with **+** ("time " **+** "10:30").
- Do not confuse **'='** (assignment - effect: the content of the variable on the left is modified), with **'=='** (comparison - result: true (equal) or false (different)). _Example:_ `var _foo = 32;` and `if (_foo == 32)...` (NB: `if(_foo = 32)` is a common but insidious error, difficult to find and correct) <br>
- Note: The opposite (negated) condition of 'equal' `(a == b)` is 'not equal' `(a != b)`. The opposite (negated) condition of 'greater than' `(a > b)` is NOT 'less than' `(a < b)` but rather 'less than or equal' `(a <= b)`! Similarly, the opposite of `(a < b)` is `(a >= b)`.
- **Beware of the '+'**. In `a + b`, if `a` and `b` are numbers, it adds them together, but if one of them is a string that cannot be converted to a number, the other is automatically converted to a string as well. And the 'number => string' conversion can lead to surprises (i.e. lots of decimal places) when they are not integers! Always use ROUND() when you need to add comma-filled numbers to strings Example:
```
  var _tf = GET("TF_frigo","va_temperature");      // read temperature sensor, saves it in _tf (number)
  var _tm = AVG(_tf, 12);               // get average from last 12 values ​​(_tm is a string, see AVG())
  var _tr = ROUND( _tm/10, -1);                            // round to the nearest ten, _tr is a string
  if(TRIGEVERY(8)) POP( "FRIDGE", "Fridge: "+ ROUND(_tf/10, 1) + "°C, medium: "+ ROUND(_tm/10, 2) +"°C, round: " + _tr +"°C");
                            // note: using ROUND() to convert to string, also for _tm/10 (again number)
  DATALOG("frigo.media", _tm/10);                            // saves average on file (saved as number)
 ```

- As mentioned, JavaScript is flexible when it comes to value conversions: numbers in 'string' format (i.e. "3.14" instead of 3.14 or Math.PI) are automatically converted to numbers when performing arithmetic operations. Also, numbers and strings are converted to logical values ​​when needed (for example, when used as a condition in an `if()` statement). Rules: zero (0) evaluates to `false`, any other number evaluates to `true`. An empty string ("") or `null`, or `undefined` evaluates to `false`, any other string evaluates to `true`. Examples: `if ("caio")...` is true. `var _test = null; if(_test)...` is false. (note: It is better not to abuse these language automatisms, it is preferable to always write the extended conditions, clearer: `if (_test != null)`...)

note: the conditions of the automations/routines (all: Alexa, Google, Tuya etc...) are ALWAYS comparisons with predefined constant values. In the RULES this constraint falls completely: you can compare two measures, or compare the result of calculations (e.g. averages etc..), or with a stored variable etc. Freedom and simplicity.

- also important is the use of parentheses, "()", always in pairs. Parentheses are mandatory after each MACRO - note, even if there are no parameters, e.g. `BEEP()` - and after an `if()`, to enclose the condition. However, use them freely to group the intermediate results in the expressions e.g. `if((_a > 10) && (_b/2 == 0))...`
- Many MACROS must preserve state between runs (e.g AVG(), MAX() etc...) and are identified with (*).
- The most useful js construct in RULES is **if()** (conditional execution), which takes various forms:<br>
**if(** `condition` **)** `action;` // `action` _is executed only if `condition` is true_ <br>
**if(** `condition` **)** `action1`**,** `action2;` // _two (or more) actions, separated by_ ',' _comma._<br>
**if(** `condition1 && condition2 && ...` **)** `action;` // _AND: 'all',_ `condition1` _and_ `condition2` _and_ ... _must be true at the same time._<br>
**if(** `condition1 || condition2 || ...` **)** `action;` // _OR: 'at least one',_ `condition1` _or_ `condition2`, _or_ ... _must be true._<br>
**if (** `condition` **)** `action1` **else** `action2;` // _executes `action1` (if true) or `action2` (if false)._ <br>
note: Tuya automation (one or more conditions, AND/OR), Google (a test + voice command, OR), Alexa (only one condition!), etc... have heavy constraints in the conditions. RULES are more elastic: you can have as many conditions as you want in AND or OR, but also more complex conditions using the parentheses carefully to indicate the order of calculation!
example: `if ( (condition1 || condition2) && (condition3 || condition4) )` - in words: "at least one of (condition1, condition2) AND also at least one of (condition3, condition4) must be true".

- If a `condition` is true for a long time (level), an `if()` will be executed multiple times, in each loop. To avoid this, TRIGGER macros are true for only one loop, the FIRST time the condition is true, and then false.

- note on error messages: Error messages do not always identify the REAL cause of the problem. For example, a badly written variable is immediately found as 'undefined', but an unclosed parenthesis can lead to confusing message lines later when the compiler finds a problem! So be careful!

- **important**: as they are implemented, MACROs that use memory (\*) must be executed at every run: therefore they CANNOT be present in the `action` part of an **if()**. For similar reasons, nested **ifs** are not allowed (an **if()** in the action area of ​​another **if()**: it could not use MACROs (\*)). These are constraints that do not, however, pose serious limitations.
<hr>

**EXAMPLE** - A concrete case of heating control <br>
_I have centralized heating, with thermostatic valves on each radiator: each room has its desired temperature profile (Ttarget). Everything works very well, except in exceptional cases (for example, system turned off for maintenance)._ <br>
I would like to implement a strategy of this type with Tuya: _if the room temperature is lower than a 'tot' compared to the Ttarget, turn on the air conditioner as a heat pump by setting the temperature to Ttarget._ That is:

<code>`If (( Ttarget - Tambiente ) > tot) => climate.warm( Ttarget )` </code>

_This strategy is NOT feasible with Smartlife's 'automations'_, nor with Alexa or Google or HomeKit..., for various reasons:
- in automations you cannot use arithmetic operations: `( Ttarget - Tambiente )`
- comparisons, in automations, can only be done with constant predefined values: `( Tambiente < Ttarget - tot )`
- there are no parametric tap-to-runs or at least with dynamic names: `clima.warm( Ttarget )`.

Am I asking too much? An 'open' system should allow these automations. Or not? In fact with **IoTwebUI** and the RULES _it can be done!_ <br>
Let's see how I made it. Some preconditions: my thermovalve ('Termo letto') has the properties 'temp_set' and 'temp_current'.
To overcome the lack of parametric 'tap-to-run', that is with a value defined from outside the runtime, I use 'tap-to-run' with the dynamic name: for simplicity I used as Target temperature only the values ​​16, 20, 21 °C: in this way I only need 3 tap-to-run called Tletto16, Tletto20 and Tletto21, to turn on and set the air conditioning to the desired temperatures, in other words, the parameter is in the name!
Here are the necessary RULES, where I use some intermediate variables to reduce the complexity. The macro ISTRIGGERH() is true only once, when the condition goes from false to true (see below), ROUND() rounds a number and turns it into text, to form the strings "TLetto16","TLetto20",... that is, the name of the 'tap-to-run', which now depends on Ttarget. The ignition is also stored in the 'Alert register'.
```
var _tot = 2.3; // to be calibrated next winter
var _Ttarget = GET("Termo letto", "temp_set") ; // varies depending on the time
var _nowClima = ISTRIGGERH( ( _Ttarget - GET("Termo letto", "temp_current") ) > _tot); // condition
if (_nowClima) SCENE("TLetto" + ROUND( _Ttarget, 0) ), ALERTLOG("RULE Tletto", "acceso clima") ; // execution
```

note: tap-to-run names like 'TLetto16' are impossible to use with voice recognition, but they are useful to be able to manage them dynamically. If useful, just create 'tap-to-runs' with simple names as aliases, like 'bedroom heating', which simply use those with unrecognizable names.

_All in all simple, right? According to the designers of home automation APPs (all of them: they copy each other's performances) we users are only able to manage "If .... Then ....". What a lack of imagination and trust!._
_And then, having sophisticated tools at your disposal does not mean you are forced to use them! If you don't have to use them, all the better. But when we need it, the RULES are there, ready to solve our problems._

#### RULES - First steps
Want to try something but don't know where to start? Here are three RULES that don't require a device, but are useful for doing your first tests.
1) copy the following 3 RULES into the RULE edit area (EXPERT mode), and then press TEST.
2) On the tap-to-run page, tab 'user RULE' you will find three new buttons: 'turn off the light'. 'Pippo' and 'call Pippo': you can check the operation of the three RULES.
3) Activate the 'voice command', and try _"Hey Tuya, run Pippo"_, _"Hey Tuya, run turn off the light"_ _"Hey Tuya, make a call for Pippo"_...
```
if (TRIGBYNAME('turn off the light')) VOICE ("Done: 'turn off the light'");
if (TRIGBYNAME("Pippo")) POP ("Test", "Found Pippo");
if (TRIGBYNAME("called Pippo")) TRIGRULE("Pippo"), VOICE("call Pippo");
```

#### RULES - MACROS
MACROS meet various needs:
1. Provide access to **IoTwebUI** resources and features, to be able to use them in RULES
2. The environment (runs repeated at regular intervals) and its limits (code in a single line) make it more difficult to write complex functions: MACROS simplifies the user's task.
3. Some operations require the storage of information between one run and the next, and MACROS (*) solves this problem, without explicitly resorting to VSET() or VGET().
4. With events it is important to distinguish between a **level** - the same value (e.g. true) equal for multiple runs, generated, for example, by comparison - and a **TRIGGER** - true for a single run, when an event starts or ends -: _The macros with 'TRIG' in the name generate TRIGGER, the others generate LEVELS_.<br>

_note: this initial selection of MACROs is naturally conditioned by my habits and interests: in this sector the contribution of other users is precious._

_note: to identify a device you can use either the name or the ID (I don't like to impose unnecessary limits!). Using the ID is a little more complex (you can find it in the IoTwebUI tooltips in EXPERT mode) but offers the advantage that you can rename the device at any time!_

We can divide the MACROs into two groups: the first one manages the interactions with the resources available in **IoTwebUI** (a sort of internal API). The second group of MACROs is instead more general, modifying the input data in some useful way or providing useful outputs.<br>
_note: the goal of MACROs is not to duplicate the functionality of Tuya automation (even if sometimes there is overlap), but to provide more advanced calculation tools, to obtain 'automations' that were impossible until now. The use of x-devices, virtual devices, and tap-to-run allows us to divide the tasks between Tuya scenes (automation and tap-to-run) and RULEs in the most efficient way._ <br>
Of course, you can always add new MACROs, either as a customization (if you create new MACROs let me know) or in new releases of **IoTwebUI** (let me know your needs on GitHub, in the [ISSUE](https://github.com/msillano/IoTwebUI/issues)).

### MACRO - x-device
Starting from ver. 2.2, you can create and manage, via MACRO and RULES, **x-devices**, i.e. 'virtual devices' for **IoTwebUI**. The big advantage is that they have similar performance to real Tuya devices: they appear in the device tree, in the assigned house and room, they have updated tooltips, logs, alarms etc...

The **x-devices** introduce a concept of recursive composition in **IoTwebUI**: an _x-device_ can be a basic device (first level, like Tuya devices) but also an 'abstract' device of a higher level, which brings together and synthesizes the data and actions of multiple lower-level devices, as, for example, the Tuya 'Groups' do.
Unlike the 'Groups' (the only possibility of aggregation with Tuya), the x-devices are, to all intents and purposes, still devices, and therefore the composition is recursive. Furthermore, the aggregation functions are free, under user control, and not stereotyped in 'ON/OFF'. Furthermore, since the x-devices are devices, Alerts and RULES can be defined based on their properties, which is NOT possible with 'Groups'!
The **x-devices**, in addition to the presentation of data, can also manage 'actions', which they transfer to the lower level using RULES (and Automations or REST-client).

_**Scenarios of use for x-device:**_

1. I have a 'non Tuya' device that I can control via REST (client): by associating an 'alias' x-device to this device, and updating its values ​​in a mirror, I have the device visible and usable in IoTwebUI as a native Tuya device!
2. Various devices contribute to form 'systems', e.g. Heating, burglar alarm, consumption etc... A 'system' _x-device_ that presents the processed final data of the system itself, is useful and easy to consult.
3. HTML pages can act as an interface: they request updated data from various devices via REST-server. Using a 'synthesis' _x-device_ that brings together all the data needed for the HTML interface, you simply have to consult a single device. Furthermore, you have the possibility of monitoring the system from IoTwebUI and separate the data processing from the visualization interface, simplifying its implementation._
4. In summary, the x-devices constitute a layer of OOP middleware between the atomic Tuya devices and the applications/UI.

_**Limits for x-devices**_

1. Be careful when using multiple instances of an x-device. This is only possible if the x-device is implemented as a function (MACRO). If instead it is implemented as a RULE, you need to repeat the code for each instance, and then it is possible to change the assigned values.
2. Unlike Tuya devices, which are uniquely identified by their ID, **x-devices** must be identified exclusively by their name, because the ID changes with each run.

<hr>

#### MACRO for resources
<dl>
<dt>GET(device, property)</dt>
<dt>GET(device, property, strict)</dt>
<dd>Returns the value of 'property' (use the original names shown in the tooltips) of the device (name or ID)<br>
If it does not find 'device' or 'property' it throws an error if <code>strict == true</code> (default), otherwise it returns "null".<br>
        <i>Example:</i> <code>var _tf = GET("TF_frigo","va_temperature");</code> </dd>   

<dt>GETATTRIBUTE(device, attribute)</dt>
<dt>GETATTRIBUTE(device, attribute, strict)</dt>
<dd>Returns the value of a device 'attribute' (name or ID). The most useful are 'name', 'id', 'online', etc... <br>
If it does not find 'device' or 'attribute' it throws an error if <code>strict == true</code> (default), otherwise it returns "null".<br>
        <i>Example:</i> <code>var _name = GETATTRIBUTE(_devid, 'name');</code> </dd>   
     
<dt>ISCONNECTED(device)</dt>
<dd>Returns 'true' if the device (name or ID) is connected. <br>
<i>note: the data comes from the Cloud, it may differ from the local value shown by SmartLife.</i><br>
<i>Example:</i> <code>if (! ISCONNECTED("Tuya bridge")) VOICE ("Warning! 'tuya bridge' currently disconnected"); </code> </dd>


<dt>GETHOMELIST()</dt>
 <dd>Returns an array of the names of all HOMEs. </dd>

<dt>GETIDLIST()</dt>
<dt>GETIDLIST(home)</dt>
<dt>GETIDLIST(home, room)</dt>
 <dd>Returns an array of device IDs.<br>
<i>Example:</i> <code>GETIDLIST('ROMA').forEach((devid) => {...})</code> </dd>

<hr> 

<dt>ADDXDEVICE(home, room|null, name)</dt>
<dt>ADDXDEVICE(home, room|null, name, init)</dt>
<dt>ADDXDEVICE(home, room|null, name, init, category)</dt>
 <dd>Adds a new x-device in IotwebUI, displayed in the tree and with the same functions as the Tuya devices: 'Alarms', 'Export', 'REST' etc. <br>
note: <code>init: (default = [])</code> array of initial values ​​as objects. e.g.: {code: 'brightness_max_1', value: 891}. <br>
note: the default <code>category </code> is 'x-dev', with is-a => 'x-device custom'. You can specify a different category (among the existing ones), for example, to use a special icon, if this is provided by customizations based on category.<br>
note: <code>room == null</code> associates the device to the indicated 'home'.<br>
note: if the _x-device_ exists, ADDXDEVICE() re-initializes by replacing the data in 'status' with 'init'<br>.
note: ADDXDEVICE() starts 'online' with false: only after completing all the calculations (which may take time) can it be set to 'true' with SETXDEVICEONLINE(), to have visual feedback of the x-device status.<br>
_Example:_<br>
     <code> // singleton run: adds a x-device after the existence test
            if(!GETATTRIBUTE("Temperatura media","name",false)) ADDXDEVICE('ROMA', "Studio", "Temperatura media"); </code></dd>

<dt>SETXDEVICESTATUS(device, code, value)</dt>
<dd>Allows adding new values ​​or updating them in the 'status' of an _x-device_.<br>
_Example:_<br>
     <code>   //updates the x-device doing a 2 device average and then a mobile average over the last 10 results
       var _tm = ( GET("Temperatura studio","va_temperature") + ( GET("Termo studio","temp_current") / 10)) /2;
       SETDEVICESTATUS( "Temperatura media", "media", AVG(_tm, 10)); </code></dd>

<dt>SETXDEVICEONLINE(device)</dt>
<dt>SETXDEVICEONLINE(device, online)</dt>
<dd>Allows setting the 'online' attribute (default 'true') for x-devices.</dd>


<dt>DATALOG(name, value) (*)</dt>
<dd>Adds a new 'value' to the data log file, with the indicated 'name'. Useful for saving processing results (e.g. averages). This MACRO 'books' the saving of a value, but the saving occurs with the times and methods set in config for the data log file.<br>
<i>note: data saving during a test starts immediately, but, in CSV format, the first line with the names has already been created and is not updated. Eventually save the log file to have a new updated file. This is only for testing: with the RULES in use <i>since startup there is no problem.</i><br>
<i>Example:</i> <code>DATALOG("Fridge Temperature", GET("TF_frigo","va_temperature")/10);</code>
</dd>

<dt>REST(url)</dt>
<dd> REST client, for REST API (GET) web services or devices that return a plain text response.<br>
<i>Example:</i> <code>
// see https://www.ipify.org/ <br>
if(TRIGBYNAME("my IP")) POP( "My IP", REST("https://api.ipify.org/?format=txt")); </code> </dd>

<dt>RESTJSON(url)</dt>
<dd> REST client, for REST API (GET) web services or devices that return the response in JSON format (most of them). This function returns, for ease of use, an object directly.<br>
<i>Example:</i> <code>
// see https://open-meteo.com/<br>
var _meteo, _urlm ="https://api.open-meteo.com/v1/forecast?latitude=41.9030&longitude=12.4663&current=temperature_2m"; <br>
if(TRIGBYNAME("meteo")) _meteo = RESTJSON(_urlm), POP("ROMA", "temperature = " + _meteo.current.temperature_2m ); </code> <br>
<i> note: this is the complete structure of the response object (<code>_meteo</code>), which can be seen in the console with <code>'console.log(_meteo)'</code>. Only the temperature was used in POP() ( <code>_meteo.current.temperature_2m </code>): </i> <pre>
  current: 
     interval: 900 
     temperature_2m: 33.7 
     time: "2024-06-20T17:00" 
  current_units: 
     interval: "seconds" 
     temperature_2m: "°C" 
     time: "iso8601" 
  elevation: 15 
  generationtime_ms: 0.01800060272216797 
  latitude: 41.9 
  longitude: 12.469999 
  timezone: "GMT" 
  timezone_abbreviation: "GMT" 
  utc_offset_seconds: 0 
</pre></dd>

<hr>

<dt>DATALOG(name, value) (*)</dt>
<dd>Adds a new 'value' to the data log file, with the indicated 'name'. Useful for saving processing results (e.g. averages). This MACRO 'books' the saving of a value, but the saving occurs with the times and methods set in config for the data log file.
_note: data saving during a test starts immediately, but, in CSV format, the first line with the names has already been created and is not updated. If necessary, save the log file to have a new updated file. This only in the test phase: with the RULES in use from the start there is no problem._
<i>Example:</i> <code>DATALOG("Fridge Temperature", GET("TF_frigo","va_temperature")/10); </code></dd>

<dt>SAVELOG()</dt>
<dd>Causes the saving of the current log to the file, and the start of a new log file.</dd>


<dt>ALERTLOG(name, message) </dt>
<dd>Adds the 'message' to the alert log, identified by 'name'.<br>
<i>Example:</i> <code>if(ISTRIGGERL(GET("tuya_bridge", "switch_1"))) ALERTLOG("tuya_bridge", "Open now");</code>></dd>

<dt>BEEP()</dt>
<dd>Alert signal.<br>
<i>Example:</i> <code>if(GET("TF_frigo","va_temperature") > 100) BEEP(); </code>
</dd>

<dt> POP(device, message)</dt>
<dd>Warning signal.<br>
<i>Example:</i> <code>if(ISTRIGGERH(GET("TF_frigo","va_temperature") > 100)) POP("Frigo", "TEMPERATURE over 10°C" ); </code> </dd>

<dt>XURL(url)</dt>
<dt>XURL(url, target)</dt>
<dd>Opens a URL in the browser.<br>
`target`: `_self`, `_blank` (default), `_parent`, `_top` (see `window:open` ) <br>
note: _self, _parent, _top can terminate IoTwebUI.<br>
<i>Example:</i> <code>if (TRIGBYNAME("client REST")) XURL("rest02.2/client.html")</code> <br>
Using REST, this MACRO can be used to activate specific WEB pages, such as thematic UIs. <br>
<i>Example:</i> <code>if (GET("ALLARME", 'status') == 'Allarme') XURL("mypages/alarmmap.html")</code>
</dd>

<dt>VOICE(message)</dt>
<dd>Warning signal.<br>
<i>Example:</i> <code>if (! ISCONNECTED("Tuya bridge")) VOICE ("Warning! 'tuya bridge' is currently disconnected") </code>
</dd>

<dt>SOUND(url)</dt>
<dd>Play a music or audio message file: MP3 or WAV format.<br>
Local or remote.<br>
_Example:_ <code>SOUND("https://assets.mixkit.co/active_storage/sfx/918/918.wav"); </code>
</dd>

<dt>SCENE(scenaNome) </dt>
<dd>Performs a 'tap-to-Run', present in the list read from the Cloud.<br>
<i>Example:</i> <code> if(ISTRIGGERH(_alarm)) SCENE('sirena suona'); </code></dd>

<dt>TRIGBYNAME(name) </dt>
<dd> Associates a 'name' (max 3 words) to a RULE, allowing it to be activated with a user command (button or voice command) or in case of 'Alert', or with TRIGRULE(name) from another RULE (similar to the Tuya 'tap-to-run').<br>
Returns true when it must be executed. <br>
note: name must be unique (it can be used only once) but the action can be applied to multiple RULES using an auxiliary var.<br>
<i>Example:</i> <code>if (TRIGBYNAME('turn off the light')) VOICE ("You have activated: 'turn off the light'") </code> </dd>

<dt>TRIGRULE(name)</dt>
<dt>TRIGRULE(name, parameter)</dt>
<dd>Executes a RULE identified by a name. <br>
'parameter' (optional) is made available in the <code> var _ruleParam </code> (otherwise `null`). Since 'parameter' can be an object, there is no limit to the data passed with this mechanism.  <br>
note:TRIGRULE is not recursive; max 1 'parameter' active to not overwrite _ruleParam (static). <br>
note: If the definition of TRIGBYNAME(name) precedes the use of TRIGRULE(name), the execution is not immediate, but occurs immediately after the end of the current run of the RULE, in an EXTRA run. <br>
<i>Example:</i> <code> if (TRIGBYNAME("pippo")) VOICE (" Found pippo"); <br> // RULE 'pippo'
if (TRIGBYNAME("call pippo")) TRIGRULE("pippo"), VOICE("call pippo") // RULE 'call pippo'
</code> </dd>

<dt>REFRESH()</dt>
<dt>REFRESH('cloud')</dt>
<dd>Many operations are synchronized on the polling loop: this can slow down the response to user actions too much.
REFRESH() causes an extra cycle of RULES analysis, while REFRESH('cloud') causes extra polling of Tuya data and UI refresh.
N.B. DO NOT use them in RULES processed at every loop: it would create a blocking 'race condition'! Use them only in RULES processed once, in response to user actions, and only if really necessary!</dd>

</dl>
<hr>

#### functional MACROs
<dl>

![TRIGGERS](https://github.com/msillano/IoTwebUI/blob/main/pics/MACRO_01.png?raw=true)<br>
<i> input and output of: <code>ISTRIGGERH(event), ISTRIGGERL(event), CONFIRMH(event, T), CONFIRML(event, T)</code></i>

<dt>ISTRIGGERH(condition) (*) </dt>
<dd> Returns 'true' only when the "condition" changes from 'false to true', avoids that the "condition" 'true' acts at every run. That is, it transforms a true level into a TRIGGER (see figure). <br>
<i>Example:</i> <code>if(ISTRIGGERH(GET("TF_frigo","va_temperature") > 100)) POP("Frigo", "TEMPERATURE over 10°C" );</code> <br>
note: Unlike Tuya, at startup, if `condition` is true it returns true (even if a previous 'false' is missing).
note: the Tuya implementation of multiple <i>conditions (levels) in AND (all)</i> in automation is as if it were written like this:<br> <code>if( ISTRIGGERH(condiz1 && condiz2 && ...) ... </code> <br> that is, a Tuya automation is triggered when ALL conditions become true. With multiple conditions in OR, just ONE trigger is enough:<br> <code>if( ISTRIGGERH(condiz1) || ISTRIGGERH(condiz2) || ...) ... </code>.<BR>
Note: multiple <i>conditions (levels) + scope (level) + enablement </i> of Tuya automation can be implemented in RULE like this:<br> <code>if( (ISTRIGGERH(condiz1...) ...) && (scope...) && enabled)...</code>. <br> You can see how <i>Scope</i> does NOT intervene in the TRIGGER but MUST be true!
</dd>

<dt>ISTRIGGERL(condition) (*)</dt>
<dd> Returns 'true' only when the "condition" changes from 'true to false' (inverse of ISTRIGGERH): transforms a false level into a TRIGGER. <br>Note: the output is inverted with respect to 'condition' (see figure).<br>
<i>Example:</i> <code>if(ISTRIGGERL(GET("tuya_bridge", "switch_1"))) ALERTLOG("tuya_bridge", "Open now"); </code> </dd>

<dt>CONFIRMH(condition, time) (*) </dt>
<dd> Returns 'true' only if the "condition" remains 'true' for at least the time 'time'. Then it remains 'true' as long as the 'condition' is 'true'. Typical case an open door. It is used to filter short-lived true 'levels' that are not of interest (see figure).<BR>
time = constant in the formats "hh:mm:ss" or "mm:ss" or "ss". Lower limit: TuyaInterval.<br>
<i>Example:</i> <br>
<code>var _doorev = GET("Door sensor", "doorcontact_state") ; </code> // true with door open
<code>if(ISTRIGGERH( CONFIRMH(_doorev, "01:20"))) VOICE("close the door, thank you"); </code> </dd>

<dt>CONFIRML(condition, time) (*) </dt>
<dd> Returns 'true' only if the "condition" remains 'false' for at least the time 'time' (inverse of CONFIRMH): It is used to filter short-lived false 'levels' that are not of interest.<br>Note: the output is inverted with respect to 'condition' (see figure).<br>
<i>Example:</i> <code>if(ISTRIGGERH(CONFIRML(ISCONNECTED("relay"), "02:30"))) VOICE("Disconnection alarm");</code> </dd>

<dt>TRIGCHANGED(value) (*) </dt>
<dd> Returns 'true' every time 'value' changes with respect to the previous value.<br>
<i>Example:</i> <code> var _tf = GET("TF_frigo","va_temperature"); <br>
var _annonce = "At " + TIME(hrs)+" the temperature changed. The fridge is at " + ROUND(_tf/10, 1) + " degrees";<br>
if(TRIGCHANGED(_tf)) VOICE(_annonce); </code></dd>

<dt>TRIGEVERY(n) (*)</dt>
<dd> Simple timer: returns 'true' only after "n" executions, cyclical. <br>
A single 'true' value is guaranteed for every nth loop, 'n' is the number of loops, in time: t <= n x tuyaInterval (defined in 'config.js' file).<br>
<i>Example:</i> <code>if(TRIGEVERY(8)) POP( "FRIDGE", "Internal temperature: "+ ROUND(_tf/10, 1) + "°C");</code> </dd>

<dt>VSET(name, value)</dt>
<dd>SET of a permanent variable - preserved for all RULE runs.<br>
<i>Example:</i> <code>if( TRIGEVERY(10) ) VSET('trial', VGET('trial') + 2);</code> </dd>

<dt>VGET(name) </dt>
<dd>GET of a permanent variable - retained for all RULE runs.<br>
If the variable <code>name</code> has NOT been initialized with a VSET, returns <code>null</code>. <br>
<i>Example:</i> <code>if( VGET('start') == null ) VSET('start', TIME(hrs)); </code> </dd>

<dt>ROUND(number, pos)</dt>
<dd> Returns a string with 'pos' decimal places (if 'pos' >0) <br>
or an integer ('pos' = 0) <br>
or an integer with zeros ('pos' < 0) <br>
<i>Examples:</i> <code>'ROUND (123.567, 2)' => "123.57"; 'ROUND(123.567, 0)' => "124"; 'ROUND(123.567, -2)' => "100";</code>
</dd>

<dt>ADDCOUNT(event, restart) (*) </dt>
<dd> When restart is true it returns the total number of times that event has been true, otherwise it returns <code>null</code>,
It can be used in two ways: if 'event' is a TRIGGER it counts the number of times. Otherwise, if it is a 'level' it evaluates
the duration of the true state (like the duty cycle).
<i>Example:</i>
<code>var _tot = ADDCOUNT(ISCONNECTED("HUB_zigbee"), TRIGEVERY(100));</code> <br>
<code>if (_tot) POP("Reliability", "The Zigbee HUB was connected "+ _tot +"% of the time"); </code> </dd>

<dt>HYSTERESIS (value, test, delta) (*)</dt>
<dd> Compares 'value' to 'test', using 'delta' as the hysteresis range. Output becomes 'true' if 'value &gt; test + delta/2', or 'false' if 'value &lt; test - delta/2'.<br>
<i>Example:</i> <code>if(ISTRIGGERH(HYSTERESIS(GET("T_letto","va_temperature"), 320, 10))) SCENA("Condizionatore ON"); </code> </dd>

<dt>AVG(value, n) (*) </dt>
<dd> Moving average of the last 'n' values: returns a string with 2 decimals.<br>
'n' is in number of loops, in time: t = n x tuyaInterval (defined in 'config.js' file).<br>
<i>Example:</i> <code>DATALOG("Average Fridge Temperature", AVG(GET("TF_frigo","va_temperature")/10, 20)); </code> </dd>

<dt>MAX(value, n) (*) </dt>
<dd>Returns the largest of the last 'n' values.<br>
'n' is in number of loops, in time: t = n x tuyaInterval (defined in config.js file).<br>
<i>Example:</i> <code>var _Tmax = MAX(GET("TF_frigo","va_temperature")/10, 1440);</code> (24h = 1440 min) </dd>

<dt>DERIVATIVE(value) (*) </dt>
<dd>Returns the derivative (better: the incremental ratio) of value.<br>
<i>Example:</i> <code>if (DERIVATIVE(GET("TF_frigo","va_temperature")) > 0) VOICE("Temperature Rising Fridge");</code> <br>
<i>Example: to evaluate the goodness of the calculations</i> <pre>
var _integ = INTEGRAL(1, 300);
var _deriv = DERIVATIVE(_integ);
console.log ( _integ , _deriv); </pre>
</dd>

<dt>INTEGRAL(value, limit) or INTEGRAL(value)(*) </dt>
<dd>Returns the integral (better: the integral sum) of value. Limit is optional, and resets the integral to 0 when it is reached.<br>
<i>note: You can use <code>INTEGRAL</code> to create more precise timers than <code>TRIGEVERY()</code> which is based on counting cycles. <br> The integral of a constant is a straight line increasing: using 1 as the constant, and a <code>limit</code> in seconds, results in a sawtooth pattern. The integral is 0 at startup and then every <code>limit</code> seconds (error: 0..+TuyaInterval) with excellent precision. This example is a periodic timer with duration 1h:</i> <pre>
var _integ = INTEGRAL(1, 3600);
if (_integ == 0) ...more...</pre>
</dd>

<dt>TIME(wath) </dt>
<dd> returns a string, "hh:mm:ss" or "mm:ss" or "ss" calculated from the current time, depending on 'wath'.
'wath': one of the constants defined as follows: <i>hrs</i> = 11, <i>min</i> = 14, <i>sec</i> = 17 (without quotes, they are not strings, but numeric constants).<br>
<i>Example:</i> <code>var _message = "At " + TIME(hrs); </code> </dd>

<dt> DAYMAP(val1, time1, val2, time2, ... <i>more</i>) </dt>
<dd> Daily schedule, returns a value that varies over time: up to 'time1' the output is 'val1', from 'time1' to 'time2' the output is 'val2'... and so on until the last 'time' after which the output is again 'val1'.<br>
Of course the values ​​'val' and 'time' must be present in pairs, as many as needed. All 'time' in "hh:mm:ss" format.<br>
Uses: daily temperature profiles, timed events or time interval enablement, etc., depending on whether 'val' are temperatures, or 'good morning'/'good evening', or true/false, etc..<br>
<i>Example:</i> <code>if(DAYMAP(false,"12:30", true, "14:00")) BEEP(); </code>
</dd>

<dt>WEEKMAP(map) </dt>
<dd>Weekly schedule: 'map' is a string of any seven characters, one for each day of the week, starting from Sunday (e.g.: 'DLMMGVS' or 'SMTWFS' or '1234567'). Only if the character corresponding to today is '-' (dash) it returns 'false' otherwise it returns 'true'. <br>
<i>Example:</i> <code>WEEKMAP("DLMM-VS") </code> is false only every Thursday. </dd>

<dt>YEARMAP(month, day) </dt>
<dd>Yearly schedule: 'month' and 'day' are two strings of any 12 and 31 characters, to identify months and days (e.g.: 'GFMAMGLASOND' and '1234567890123456789012345678901'). Only if today's month and day are '-' (dash) it returns 'false' (for 24h) otherwise it returns 'true'. <br>
<i>Example:</i> <code>YEARMAP( 'GFMAMGLASON-', '12345678901234567890123-5678901') </code> is false only at Christmas.
</dd>

</dl>

(*): identifies MACROS that use memory to save state: DO NOT use them in the _action_ part of an if())

## Credits

Open Source Project, MIT License, (c)2024 marco sillano

_This project is a work-in-progress: it is provided "as is", without warranties of any kind, implicit or explicit._

- _If you develop some interesting extension or application with IoTwebUI or IoTrest let me know: we can include it here, or in the next release._
- _For problems regarding the code and the functioning of IoTwebUI, open an 'issue' here ([github](https://github.com/msillano/IoTwebUI/issues))._
- _For more general problems regarding Tuya, SmartLife (Tuya smart) and IoTwebUI, that may also interest other users, feel free to post in the group [Tuya and Smart Life Italia](https://www.facebook.com/groups/tuyaitalia)_

Thanks for your interest <br>
m.s.

<hr>
All trademarks listed belong to their legitimate owners.<br>
- https://www.tuya.com/<br> - https://getbootstrap.com/docs/5.3/getting-started/introduction/<br> - https://visjs.github.io/vis-network/docs/network<br> - https://fontawesome.com/v4/icons/<br> - https://code.google.com/archive/p/crypto-js/<br> - https://github.com/inorganik/debugout.js<br> - https://nodejs.org/en<br> - https://hapi.dev/<br> - https://github.com/rigon/hapi-url<br> - https://github.com/websockets/ws/blob/master/doc/ws.md
