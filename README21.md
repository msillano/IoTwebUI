ual## IoTwebUI 2.1: Tuya Web App open extension

[versione italiana](https://github.com/msillano/IoTwebUI/blob/main/LEGGIMI21.md)

**_Tired of SmartLife's limitations? IoTwebUI 2.1 is here to breathe new life into your smart home, with features that will make you say "Finally!". The 'open' philosophy is in this APP's DNA, enhancing customization and user control._**

_What can you do?_<br>
 👀 Control everything: Intuitive and customizable interface, data always at hand, flexible management.<br>
🔬 Data export: Save historical series for your analysis, in the most useful format<br>
⚡️ Powerful automation: Create complex automation with RULEs, beyond the limits of Tuya!<br>
⏱️ Personalized alerts: Monitor every aspect of your home automation and receive real-time advice or fire action.<br>
🎙 Voice control: all controlled by voice, in a single APP <br>
👌 Perfect integration: Combine devices, properties, RULEs, and Tuya tap-to-run for smooth and complete automation.

 ![aspetto della versione 2.0](https://github.com/msillano/IoTwebUI/blob/main/pics/wer21.png?raw=true)

#### Interface: A Feast for the Eyes and Control

- Choose between the light or dark theme, according to your preferences.
- Navigate through your devices and 'homes' with a draggable and zoomable tree, perfect for keeping everything under control.
- Informative pop-ups with new icons will keep you updated on the status of each property of a device, without missing a single detail.
- A drop-down menu with configuration information and dynamic options will give you quick access to everything you need.
- Voice commands and voice navigation between the various pages.
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
- A tab is dedicated to the RULES to be able to launch them when needed.

#### Alerts: Never Miss an Event Again

- You can activate a control function on any property of the devices and choose the "greater than", "equal to" or "less than" tests to monitor every aspect of your home automation.
- Same logic as Tuya conditions, for a common and reliable language.
- Choose from different consequential actions: beep, sound, pop-up, voice message, URL launch, or Tuya tap-to-run|RULES.
- Real-time, with an average delay equal to 50% of the Tuya sampling period, for a perfect balance between speed and precision.
- Alert definition at runtime: total control in real-time

#### RULE: Thirst for More Powerful Automations? IoTwebUI 2.0 Has the Answer!

- Perform logical and arithmetic operations and use variables for unlimited flexibility.
- Compare the values of two different properties, for even freer automations.
- Perform complex actions, such as activating Tuya tap-to-runs or sending commands to other applications via REST.
- **How does it work?**
  1. Create RULES with a user-friendly interface at runtime, even if you are not an experienced programmer.
  2. Use predefined MACROs for common and repetitive tasks, saving time and effort.
  3. Test your RULES in real time to be sure they work perfectly.
  4. In case of an error during the test, a pop-up will indicate the line and type of error for a quick and precise resolution.
  5. Export your RULES to include them in the configuration file and make them permanent.

#### EXPERT Mode: To Control Everything Controllable

EXPERT mode offers total control over the customization of IoTwebUI:
- Access the configuration interfaces and make changes that will be valid only for that run.
- Copy the data from the "export pad" to the configuration files to make your choices stable.
- You can disable EXPERT mode in the configuration when you have finished customizing.

#### Voice recognition: Customizable voice commands

  - Trigger each tap-to-run or RULE with "Hey Tuya, run..."
  - Control navigation in IoTwebUI APP: "Hey Tuya, go to scenes"
  - Control voice with your voice: you can activate continuous recognition or deactivate it completely.
<hr>

## Implementation and Usage Notes

- IoTwebUI is a web-based application that provides a user-friendly interface for interacting with Tuya smart devices. It is derived from a similar interface designed for [TuyaDAEMON](https://github.com/msillano/tuyaDEAMON-applications/tree/main/daemon.visUI.widget) and utilizes the [Vis-Network](https://visjs.github.io/vis-network/docs/network/) library for its visualization capabilities.

- Modern browsers implement the CORS (Cross-Origin Resource Sharing) security protocol, which restricts web applications from making requests to servers other than the one that served the web page. This poses a challenge for IoTwebUI, as it needs to access the Tuya Cloud to retrieve device data. It is necessary to disable CORS when launching the browser (see `run_me.bat` file):
```
chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security
```
As an alternative to the 'bat' file, the 'Cross Domains - CORS' extension can be used with some browsers, see [ISSUE4](https://github.com/msillano/IoTwebUI/issues/4).

- Tuya sets limits on the frequency of cloud access. IoTwebUI takes this into account, and the initial phase (when it reads all the data from the Cloud) is blocking and not very short (3-5 s, depending on the number of devices). 

- A second problem is the impossibility of creating files directly from an HTML page, again for security reasons. To export the data I used a logging library on the [`debugout.js`](https://github.com/inorganik/debugout.js) file. For this reason, control over the generated files is not complete, and small manual interventions are required on the exported files.

- The datalog files are saved in the download directory, with the name `tuyalogDYYYYMMGGThhmmss.csv|json.txt`.

- For the same reason it is not possible to update the configuration files from the APP. I chose a compromise solution, which involves user intervention with a simple copy-paste.

- Operation continues normally even if the browser window is iconized.

- Use only one instance of the APP, otherwise, you will have problems with Tuya tokens.


### User Interface

The user interface of IoTwebUI provides a clear and organized layout for managing Tuya smart devices. It features:

![](https://github.com/msillano/IoTwebUI/blob/main/pics/tootip20.png?raw=true)

The tooltips, which open when you hover the mouse over a device icon, contain all the properties included in the 'status' of the device, with the names and values ​​used by Tuya Cloud. Some values ​​can be hardcoded. <br>
Some small icons provide further information to the user (see figures above):
 - `tuya_bridge.switch_1` is under observation for an 'alert'
 - `tuya_bridge.switch_inching` is an example of an encoded value (AAAC). Decoded is an object:
````
{
"inching": false,
"delay": 2
}
````

 _note: If you are interested in decoding Tuya values, many functions have been developed for tuyaDAEMON (see 'core_device', 'ENCODE/DECODE user library' node)._
 - `Temperatura studio.va_temperature` is saved to the 'datafile', along with the other data in `logList`.
 - The Alert (special icon) was triggered for the `Temperatura soggiorno` device
 - `Temperatura soggiorno.va _humidity` is the cause of the Alert, and the condition is also indicated (>40)
 - The `Termo studio` tooltip is customized to present temperatures with the correct decimals. (note: only in the tooltip: Alert and RULE always use the value provided by Tuya Cloud, i.e. 222 and 190).
 - In EXPERT mode the following values ​​are added to the tooltips:
     - `isa`: name of the Tuya 'type' of the device (in code it is `device.category`). In total around 600 types.
     - `id`: `device.id`, required by some HUBs (e.g. TuyaDAEMON, Homebridge, HA, etc..).
     - `key`: `device.local_key`, required by some HUBs

### tap-to_run Tuya
All 'taps-to-run' are presented by 'home' (max 100) and in alphabetical order.
Tap-to-run names can have the following constraints:
 - 3 word limit when used with voice commands
 - Use prefixes to group related commands in IoTwebUI.
 - Be easy to remember and recognize (if you use voice commands with Google or Alexa).<br>

A pad is dedicated to the 'user RULES' identified with a name. They are treated like 'tap-to-run': they can be used in alerts, activated with buttons or via voice command, or launched by another RULE.<br>
_Of course 'RULES' and 'tap-to-run' must have unique names to be identified (but you can use also IDs)._

### Logging and data  export

It is possible to export some data to a file: the user must only specify `device` and `status` (property) to identify the data of interest and these are saved at regular intervals (minimum 1 minute) in an internal buffer (max 5000 records - equal to 80h @1 rec/min), then exported to a file automatically or by user command.<br>
The user can choose between two formats: `CSV` (suitable, for example, for DB and spreadsheets) or `JSON` (for more complex processing with ad hoc programs) with little editing on the files (see beyond [formats](https://github.com/msillano/IoTwebUI/blob/main/README21.md#formato-csv)).
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

extra: In EXPERT mode, a command is available in the menu to have the entire data structure obtained from Tuya Cloud in the console ('Dump data'): it can be explored at each level in the console pad or it can be copied with copy&paste in JSON format.

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
 <li> Associated message: <ul> 
  <li> is a URL to an MP3 or WAV file, in the 'sound' case
  <li> or it is a URL and then it is open in the browser
  <li> or it is the name of a 'tap-to-run'|RULE that is executed
  <li> used as Alerts text with 'pop-up'
  <li> is the text read in the 'voice' case
  </ul>
 <li> Action: one or more of 'beep', 'pop', 'sound' and 'voice' ('URL' and 'tap-to-run|RULES' are automatic) </li></ol>
 </TD>
 </TR>
</TABLE>
 _note:_ 

- _If you do not choose actions and do not fill  the 'message', the default action is always the change of icon on the diagram and in the tooltip._
- _The 'alerts' do not, for simplicity, have a time filter: if defined they are active 24/7. If some conditioning is needed, it is possible to create an ad-hoc RULE._
-  _The 'connected' is not included in the properties, and therefore 'Alert' cannot be defined. But it is available as MACRO in RULE._
- _Having only one message, the precedence rules are: SOUND() and URL (auto) are examined first, then Tap-to-run and RULES (auto), and POP and VOICE only last (compatible: the same message can be used for both); Beep is always usable._
- _To have both 'pop' and 'tap-to-run', you need to create two Alerts with the same conditions: in one the 'message' will be the text for the 'pop-up', in the other the name of the 'tap-to-run'._
- _The display of pop-ups may depend on your browser configuration; using 'run_me.bat' automatically updates the configuration for the new browser instance. User actions (e.g. buttons) can temporarily enable pop-ups.<br>
However, in order not to lose information, if the pop-ups are disabled for some reason, the message is still presented in a window of the APP: the difference is that the pop-ups can be many, while the window is unique and is reused with a counter._
- _All Alerts are stored in the 'Alert log', visible from the main menu.

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
 An important part is dedicated to a RULE editing pad (for details <a href="#rule---syntax">see below</a>).<br>
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

#### VoiceRecognition: greater freedom
- The availability of this function depends on the browser used.
- It is not easy to achieve the efficiency of specialized HW (smart speakers: Google, Alexa), because the result depends on various factors, including the microphone used, the related adjustments, the reduction of background noise, etc. In the tests, I went from over 90% recognition to a terrible 20%!
- **NB: Now it is optimized for the Italian language only**. But easy to port it to other languages (see file speech02.2.js, e.g. localized version: speech02.2.en.js).
- The choice of keywords and names for 'tap-to-run' and 'RULE' is also important: for example 'name three words' is difficult to recognize, while 'fire the light' is easily recognized.
- I believe that this depends on the linguistic models used: correct sentences, with a common meaning, are more recognizable than isolated words. For example 'Tuya' is often confused with 'Giulia'. 
- The presence of articles and/or prepositions facilitates recognition.
- Voice control is optional, and can be disabled in the configuration.
- If enabled, voice-recognition can be used in two ways, either continuously or by pressing a button. The default mode is set in configuration but can be changed with voice commands.
- the default grammar is as follows - in brackets (at): optional words; vertical bar to|up: alternative words-: <br>
 
'Hei Tuya, esegui|attiva (la|un*) xxx (xxx (xxx))' => launch 'tap-to-run' or RULE, name max 3 words

'Hei Tuya, (in|al) modo expert' => opens EXPERT mode

'Hei Tuya, (in|al) modo utente' => go back to USER mode

'Hei Tuya, vai (alle*) scene' => navigation to the 'tap-to-run' page and RULE

'Hei Tuya, vai (alle*) rule' => navigation to the edit RULE page (if in EXPERT mode)

'Hei Tuya, vai (alla*) home' => navigation to the page with the device tree

'Hei Tuya, ritorna|home' => navigation to the page with the device tree

'Hei Tuya, modo (della*) voce continuo' => start non-stop recognition mode.

'Hei Tuya, modo (della*) voce a|su richiesta|domanda' => start recognition mode with the button.

'Hei Tuya, basta voce' => stop the continuous recognition mode.

(*) note: the list of prepositions and articles accepted in the third position is very long: 'il','lo','la', 'le', 'a', 'ad', 'ai', 'al', 'all', 'allo', 'alla', 'alle', 'di', 'del', 'della', 'dei', 'un', 'una', 'con', 'colla': choose those that facilitate recognition.

note: The implementation also tolerates some inaccuracies in recognition (e.g. 'Giulia' instead of 'Tuya', etc.): this can be easily customized. See speech21.js file.

note: For better understanding, the sentences can be divided into two: "Hey Tuya" + pause: the feedback 'Hey Tuya...' appears confirming understanding of the first part; now the second part can be said.

note: navigation between pages is similar to the menu: from 'home' you can go to the 'tap-to-run' or 'edit RULE' pages (in EXPERT mode); but from these, you can only return to 'home'.

<hr>

**Safety NOTES**<br>
_To ensure maximum security, **IoTwebUI** operates exclusively in read-only mode, without making any changes to your data on Tuya Cloud._ <br>

_**This APP is totally open, without any protection, and contains your credentials in clear text in the files!**_ <br>
_DO NOT make it accessible from the outside or by third parties: otherwise, all your data, including Tuya credentials, are exposed!_

<hr>

### Versions

 - 2.1.1 Fix [ISSUE10](https://github.com/msillano/IoTwebUI/issues/10): Token expired error. [ISSUE11](https://github.com/msillano/IoTwebUI/issues/10): typo.

 - 2.1 Improved user experience:
     - Added customizable SpeechRecognition (speech21.js file).
     - Added RULES with 'name', activated with buttons, voice commands, or called by other RULES.
     - Added new MACROS
     - Improved the RULES 'test' function: upon completion, it restores the context in use.
     - Fallback: If pop-ups are blocked, alerts are shown in a window. No messages were lost.
     - Added date to the datalog file name.

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
   - DUMPing Tuya data in the console is only possible in expert mode
   - In 'expert' mode 3 new data are added to the tooltip (if available)

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
    - Some values ​​are encrypted: you can choose not to see them - or to decode them, the necessary code is available in TuyaDAEMON, but I discarded this option both because they are usually configuration data managed by SmartLife and to avoid having tooltips that are too large...
    - In other cases, you can divide by 10 or 100 to obtain the value in SI units.
    - As a developer, I prefer to have the original Tuya property names, but you can make them more friendly by translating them.
    - If you wish, you can also add new information, for example by deriving it from that of the device (e.g. temperature in °C and also in °F).

- For Tuya 'tap-to-run', you can customize the button color by editing `sceneColor(scene)` in `custom.js`.

- For RULES, the more adventurous can add their own MACROs in the `usrrulesXX.X.js` file.

- For VoiceRecognition, in the "speech0X.X.js" file it is simple to modify the words of the proposed grammar: for example, replace 'go' with 'reach'. The goal must always be to improve understanding of the commands. <br>
 - Adapting speech recognition to other languages ​​is complex, requiring deep language proficiency in grammar and vocabulary. I rely on the collaboration of willing users. For my part, I will complete the internationalization of the various pages of the asap APP (ver. 2.2).
- A little more complex is adding new voice commands, not so much for the definition of the grammar (the current code can serve as an example) but for the implementation of the actions, which often depend on the existing code.
_For new voice commands, the best way is to make an implementation proposal in the 'issues', and, based on consensus and feasibility, it could be implemented in the next release.

**All these customizations are unnecessary, but they make TuyaUIweb more personal, useful, and pleasant.**
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
- The RULES are executed cyclically, after every poll of data from the Tuya Cloud, i.e. every `TuyaInterval` (see config.js). Sometimes there are extra executions, for example during activations by the name of the RULES.
- **Important**: the code is executed one line at a time, it is not possible to write js blocks that occupy multiple lines! To contain the length of the lines, use intermediate volatile variables (see examples).
- Define volatile variables (valid for only one run of the RULE) with the syntax: **var** `_foo` **=**...
- It is also possible to define multiple variables at the same time, Example `var _var1, _var2 = 0;` both `_var1` and `_var2` are initialized to 0.
- To define permanent variables (valid for all runs) use the MACROS: `VSET(name, value)` and `VGET(name)`.
- Always use an underscore **_** as the first character in the _variable name_: this avoids interference with other variables.
- The 'semicolon' ";" at the end of the line is optional, but I highly recommend using it always.
- Default values: `true` and `false` for conditions; numeric constants are dotted, English style (`3.14`), and all strings need quotes (`"today "`). Special jolly values are `null` and `undefined`. 
- Use **//** for comments, they continue to the end of the line
- The most useful js operations are the arithmetic ones (**+, -, *, /**), the logical ones for the conditions: (**&&** -and, **||** -or, **!** -negation) and comparison operations: ( **&gt;**, **==**, **!=**, **&lt;**, **&gt;=**, **&lt;=**); string concatenation is simply done with the **+** ("hours " **+** "10:30").
- Do not confuse '=' (assignment - effect: the content of the variable on the left is modified), with '==' (comparison - result: true (same) or false (different)). Example: `var _foo = 32;` and `if (_foo == 32)...` (NB: `if(_foo = 32)` is a common but insidious error, difficult to find and correct).
Note: The opposite (negated) condition of 'equal' (`a == b`) is 'different' (`a != b`). The opposite (negated) condition of 'greater' (`a > b`) is NOT 'less' (`a < b`) but is 'less than or equal' (`a <= b`)! Similarly, the opposite of (`a < b`) is (`a >= b`).
- **Pay attention to the '+'**: in `a + b`, if `a` and `b` are both numbers, it adds, but if one of the two is a string not convertible into a number, the other is automatically converted to a string too. And the `number => string` conversion can lead to surprises when they are not integers! Always use the MACRO ROUND() when using decimal numbers in strings. Example:
````
 var _tf = GET("TF_frigo","va_temperature");  // read temperature sensor, saves it in _tf (number)
 var _tm = AVG(_tf, 12);                      // get average from last 12 values (_tm is a string, see AVG())
 var _tr = ROUND( _tm/10,  -1);               // round to the nearest ten, _tr is a string 
 if(TRIGEVERY(8)) POP( "FRIGO", "Frigo: "+ ROUND(_tf/10, 1) + "°C, media: "+ ROUND(_tm/10, 2) +"°C, round: " + _tr +"°C");
                                              // note: using ROUND() to convert to string, also for _tm/10 (again number)
 DATALOG("frigo.average", _tm/10);            // saves average on file (saved as number).
````
- As already mentioned, JavaScript is elastic when it comes to value conversions: numbers in 'string' format (i.e. "3.14" instead of 3.14 or Math.PI) are automatically converted to numbers in case of arithmetic operations. Again, numbers and strings are converted into logical values ​​when needed (for example when used as a condition in an `if()` ). Rules: zero (0) is `false`, and any other number is `true`. An empty string ("") or `null`, or `undefined` is `false`, and any other string is `true`. Examples: `if ("Caio")...` is `true`. `var _test = null; if(_test)...` is `false`. (note. It is better not to abuse these automatic mechanisms of the language, it is preferable to always write the extended, clearer conditions: `if (_test != null)...`)

- the use of parentheses, "()", always in pairs, is also important. Parentheses are mandatory after each MACRO - note, even if there are no parameters, e.g. `BEEP()` - and after an `if()`, to enclose the condition. However, use them freely to group intermediate results into expressions e.g. `if((_a > 10) && (_b/2 == 0))...` or `var _foo = ( _old + 5) * 2.3;`

- Many MACROS must maintain state between one run and the next, (e.g. AVG(), MAX(), etc...) and are identified with (*).
- The most useful js construct in RULES is the **if()** (conditional execution), which takes various forms:<br>
 **if(** `condition` **)** `action;`   // _action is executed only if condition is true._ <br>
 **if(** `condition` **)** `action1`**,** `action2`**,** `...;`   // two or more actions, comma separated.  <br>
 **if(** `condition1 && condition2 && ...` **)** `action;` // AND: 'all', condition1 and condition2 and ... must be true at the same time. <br>
 **if(** `condition1 || condition2 || ...` **)** `action;` // OR: 'any', condition1 or condition2 or ... must be true. <br>
 **if(** `condition` **)** `action1` **else** `action2;` // executes action1 (if true) or action2 (if false). <br>

- note: unlike the Tuya, Google, Alexa automation and routines, which in the conditions allow either only AND (all) or only OR (one is enough) (and then try to mitigate this limit by adding the extra 'scope' condition - e.g. Tuya) in the RULES you can have more complex (mixed) conditions by carefully using the brackets to indicate the order of calculation: example: `if ( (condition1 || condition2) && (condition3 || condition4) )...` - in words: "at least one must be true between (condition1, condition2) AND also at least one of (condition3, condition4)".

- If a condition is true for a long time (level), an if() will be executed multiple times, at every loop. To avoid this, the TRIGGER macros are true for only one cycle, the first, and then they are false.

- note on error messages: Error messages do not always identify the REAL cause of the problem. For example, a poorly written variable is immediately found to be 'undefined', but an unclosed parenthesis can lead to unclear message lines later when the compiler finds a problem! So be careful!
- **Important**: As implemented, memory-using MACROS (*) CANNOT be used in the `action` part of an **if**. For similar reasons, **nested ifs** (an **if** in the action zone of another **if**) are not allowed. These are constraints that do not, however, pose serious limitations.

<hr>

**EXAMPLE**:  A concrete case of heating control <br>
_I have central heating, with thermostatic valves on each radiator: each room has its desired temperature profile (Ttarget). Everything works very well, except in exceptional cases (for example, system shut down for maintenance)._ <br>
 I would like to implement a strategy of this type with Tuya: _if the bedroom temperature is 'a certain amount' (i.e. diff) lower than Ttarget, turn on the air conditioner as a heat pump with the same Ttarget._ That is:

 `if ​​(( Ttarget - Tambient ) > diff) => clima.warm( Ttarget )`

_This automation cannot be achieved with Smartlife_, nor with Alexa or Google, because:
 - arithmetic operations cannot be used,
 - comparisons can only be made with constant values,
 - there are no parametric tap-to-runs or at least those with dynamic names.

Am I asking too much? An 'open' system should allow these automations. Or not? In fact, with RULES _it can be done_! <br>
_Some preconditions: My thermo-valve ('Termo bed') has the properties 'temp_set' and 'temp_current'.
For simplicity, I only used the values ​​16, 20, and 21 °C as the Target temperature: in this way I only need 3 taps-to-run called Tbedroom16, Tbedroom20, and Tbedroom21, to turn on and set the air conditioner.<br>
Here are the necessary RULES, where I use some intermediate variables to reduce complexity. The ISTRIGGERH() macro is true only once, when the condition goes from false to true (see below), ROUND() rounds a number and transforms it into text, to form the strings "TTbedroom16","TTbedroom20",.. . i.e. the name of the 'tap-to-run', which thus now depends on Ttarget. The clima turn-on is also stored in the 'Alert register'._
```
var _diff = 2.3; // to be calibrated next winter
var _Ttarget = GET("Termo bed", "temp_set") ;
var _nowClima = ISTRIGGERH( ( _Ttarget - GET("Termo bed", "temp_current") ) > _diff);
if (_nowClima) SCENE("Tbedroom" + ROUND( _Ttarget, 0) ), ALERTLOG("RULE Tbedroom", "clima on") ;
```
note: tap-to-run names like 'TLetto16' are impossible to use with voice recognition, but are needed to handle them dynamically. If useful, just create 'tap-to-runs' with simple names as aliases, such as 'bedroom heating', which simply uses those with unrecognizable names.

_All in all simple, right? According to the designers of APPs for home automation (all of them: they copy each other's performance), we users are only able to manage "If .... Then ....". What a lack of imagination and confidence! Furthermore, having sophisticated tools available does not mean being obliged to use them! If you don't have to use them, even better. But when needed, the RULES are there, ready to solve our problems._

#### RULE - First steps
Do you want to experiment but don't know where to start? I recommend:
 1. Copying the following 3 RULES into the RULE edit area (EXPERT mode) and then pressing TEST.
 2. On the tap-to-run page, tab 'user RULE' you will find three new buttons: 'fire the light'. 'Goofy' and 'call for Goofy': you can check the functioning of the three RULES.
 3. Activate the 'voice command', and try "Hey Tuya, esegui Goofy".
````
 if (TRIGBYNAME('fire the light')) VOICE ("Done: 'fired the light'");
 if (TRIGBYNAME("Goofy")) POP ("Test", "Found Goofy");
 if (TRIGBYNAME("call for Goofy")) TRIGRULE("Goofy"), VOICE("I'll call Goofy");
````
### RULES - MACRO
MACROS respond to various needs:
 1. Provide access to **IoTwebUI** resources and functionality, to be able to use them in RULES
 2. The environment (runs repeated at regular intervals) and its limits (code in a single line) make writing complex functions more difficult: MACRO simplifies the user's task.
 3. Some operations require storing information between one run and the next, and MACROs (*) solve this problem, without explicitly resorting to VSET() VGET().
4. The distinction between a **level** - the same value (e.g. true) which is the same for multiple runs, generated, for example, by a comparison - and a **TRIGGER** - true for a single run, when an event starts or ends - is important: _Macros with TRIG in the name generate TRIGGER, the others generate LEVELS._

_note: this initial selection of MACRO is naturally conditioned by my habits and interests: in this sector the contribution of other users is precious._

We can divide the MACROS into two groups: the first manages interactions with the resources available in **IoTwebUI** (a sort of internal API). The second group contains general-purpose MACROs, modifying the input data in some useful way.
_note: the objective of MACROs is not to duplicate the functionality of Tuya rules (although sometimes there is overlap), but rather that provide more advanced calculation tools, to obtain 'automations' that were previously impossible. Using virtual devices and tap-to-run  you can divide tasks between Tuya scenes (automations and tap-to-run) and RULE in the most efficient way._ <br>

You can always add new MACROs, either as customization (if you create new MACROs, let me know) or in new releases of **IoTwebUI**.
<hr>

#### MACRO for resources
<dl>
<dt>ISCONNECTED(device)</dt>
<dd>Returns 'true' if the device (name or ID) is connected. <br>
<i>note: the data comes from the Cloud, it may differ from the local value shown by SmartLife.</i> <br>
<i>Example:</i> <code>if (! ISCONNECTED("Tuya bridge")) VOICE ("Warning! 'tuya bridge' currently disconnected"); </code> </dd>

<dt>GET(device, property)</dt>
<dd>Returns the 'property' value (the original names shown in the tooltip) of the device (name or ID)
<br> <i>Example:</i> <code>var _tf = GET("TF_frigo","va_temperature");</code> </dd>

<dt>DATALOG(name, value) (*)</dt>
<dd>Adds a new 'value' to the data log file, with the indicated 'name'. Useful for saving processing results (e.g. averages). This MACRO 'books' the saving of a value, but the saving occurs with the times and methods set in the config for the datalog file.<br>
<i>note: Saving data during a test begins immediately, but, in CSV format, the first row with names has already been created and is not updated. If necessary, save the log file to have a new updated file. This is only in the testing phase: with the RULES in use <i>from startup there is no problem.</i><br>
 <i>Example:</i> <code>DATALOG("Fridge Temperature", GET("TF_fridge","va_temperature")/10);</code>
</dd>

<dt>ALERTLOG(name, message) </dt>
<dd>Adds the 'message' to the alert log, identified by 'name'<br>
 <i>Example:</i> <code>if(ISTRIGGERL(GET("tuya_bridge", "switch_1"))) ALERTLOG("tuya_bridge", "Open now");</code>></dd>

<dt>BEEP()</dt>
<dd>Warning signal.<br>
<i>Example:</i> <code>if(GET("TF_fridge","va_temperature") > 100) BEEP(); </code>
</dd>

<dt> POP(device, message)</dt>
<dd>Warning signal.<br>
<i>Example:</i> <code>if(ISTRIGGERH(GET("TF_fridge","va_temperature") > 100)) POP("Fridge", "TEMPERATURE over 10°C"); </code> </dd>

<dt>XURL(url)</dt>
<dd>Warning signal.<br>
<i>Example:</i>  <code>XURL("https://www.google.com/"); </code> </dd>

<dt>REST(url)</dt>
<dd> For REST API (GET) web services that return a simple text as a response.<br>
 <i>Example:</i> <code>
 // see https://www.ipify.org/ <br>
 if(TRIGBYNAME("my IP")) POP( "My IP", REST("https://api.ipify.org/?format=txt")); </code> </dd>

<dt>RESTJSON(url)</dt>
<dd> For REST API (GET) web services, which respond to JSON format (mostly). This function returns, for ease of use, an object directly.<br>
 <i>Example:</i> <code>
 // see https://open-meteo.com/<br>
 var _meteo, _urlm ="https://api.open-meteo.com/v1/forecast?latitude=41.9030&longitude=12.4663&current=temperature_2m"; <br>
 if(TRIGBYNAME("weather")) _meteo = RESTJSON(_urlm), POP("ROME", "temperature = " + _meteo .current.temperature_2m ); </code> <br>
<i> note: this is the complete structure of the response-object (<code>_meteo</code>), which can be seen in the console with <code>'console.log(_meteo)'</code>. Only the temperature was used in the POP() ( <code>_meteo.current.temperature_2m </code>): </i> <pre>
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
timezone_abbreviation:"GMT"
utc_offset_seconds: 0
</pre></dd>


<dt>VOICE(message)</dt>
<dd>Warning signal.<br>
 <i>Example:</i> <code>if (! ISCONNECTED("Tuya bridge")) VOICE ("Warning! 'tuya bridge' currently disconnected") </code></dd>

 <dt>SOUND(url)</dt>
<dd>Plays music or audio message: MP3 or WAV format.<br>
 _Example:_ <code>SOUND("https://assets.mixkit.co/active_storage/sfx/918/918.wav"); </code>
</dd>

<dt>SCENA(sceneName) </dt>
<dd>Executes a 'tap-to-Run', present in the list read from the Cloud.<br>
 <i>Example:</i> <code> if(ISTRIGGERH(_alarm)) SCENE('siren sounds'); </code></dd>

<dt>TRIGRULE(name)</dt>
<dd>Executes a RULE identified by a name. <br>
 note: If the definition TRIGBYNAME(name) precedes the use of TRIGRULE(name), the execution is not immediate, but occurs immediately after the end of the current RULE run, in an EXTRA run. <br>
 <i>Example:</i> <code> if (TRIGBYNAME("foo")) VOICE ("Found foo");     // RULE 'foo' <br>
 if (TRIGBYNAME("call foo")) TRIGRULE("foo"), VOICE("call foo")         // RULE 'call foo'
 </code> </dd>
 
</dl>
<hr>

#### Functional MACROS

![TRIGGERS](https://github.com/msillano/IoTwebUI/blob/main/pics/MACRO_01.png?raw=true)<br>
<i> input ed output di: <code>ISTRIGGERH(evento), ISTRIGGERL(evento), CONFIRMH(evento, T), CONFIRML(evento, T)</code></i>
<dl>
 <dt> ISTRIGGERH(condition) (*) </dt>
<dd> Returns 'true' only when the "condition" passes from 'false to true', preventing the 'true' "condition" from acting at each run (similar to the conditions of Tuya automations).<br>
<i>Example:</i> <code>if(ISTRIGGERH(GET("TF_fridge","va_temperature") > 100)) POP("Fridge", "TEMPERATURE above 10°C" );</code> <br>
Note: the Tuya implementation of multiple <i>conditions (levels) in AND (all)</i> in an automation is as if it were written like this:<brt> <code>if( ISTRIGGERH(condiz1 && condiz2 && .. .) ... </code> <br> i.e. a Tuya automation is triggered when ALL conditions become true. With multiple conditions in OR:<brt> <code>if( ISTRIGGERH(condiz1) || ISTRIGGERH(condiz1) || .. .) ... </code> <br>
Note: multiple <i>conditions (levels, AND/OR) + scope (level) + enabled </i> of Tuya automations, can be implemented in RULES like this:<br> <code>if( (ISTRIGGERH(condition...)...) && (scope...) && enabled )...</code>. <br> You can see how <i>scope</i> does NOT intervene in the TRIGGER but that it MUST be true anyway!
</dd>

<dt> INSTRIGGERL(condition) (*)</dt>
<dd> Returns 'true' only when the "condition" passes from 'true to false' (inverse of ISTRIGGERH). Turns a false level into TRIGGER. <br>Note: the output is reversed compared to 'condition' (see figure).<br>
<i>Example:</i> <code>if(ISTRIGGERL(GET("tuya_bridge", "switch_1"))) ALERTLOG("tuya_bridge", "Open Now"); </code> </dd>

<dt> CONFIRMH(condition, time) (*) </dt>
<dd> Returns 'true' only if the "condition" remains 'true' for at least 'time'. Then it stays 'true' as long as the 'condition' is 'true'. Typical case: an open door. It is used to filter short-lived true 'levels' that are not of interest (see figure).<BR>
time = constant in the formats "hh:mm:ss" or "mm:ss" or "ss". Lower limit: TuyaInterval.<br>
<i>Example:</i> <br>
 <code>var _doorev = GET("Door sensor", "doorcontact_state") ; </code> // true with door open
 <code>if(ISTRIGGERH( CONFIRMH(_doorev, "01:20"))) VOICE("close the door, thank you"); </code> </dd>

<dt> CONFIRML(condition, time) (*) </dt>
<dd> Returns 'true' only if the "condition" remains 'false' for at least the 'time' (inverse of CONFIRMH): It is used to filter out short-lived false 'levels' that are of no interest.<br>Note: l 'output is inverted with respect to 'condition' (see figure).<br>
<i>Example:</i> <code>if(ISTRIGGERH(CONFIRML(ISCONNECTED("relay"), "02:30"))) VOICE("Disconnection alarm");</code> </dd>

<dt>TRIGCHANGED(value) (*) </dt>
<dd> returns 'true' whenever 'value' changes from the previous value.<br>
<i>Example:</i> <code> var _tf = GET("TF_fridge","va_temperature"); <br>
 var _annonce = "At " + TIME(hrs)+" the temperature changed. The fridge is at " + ROUND(_tf/10, 1) + " degrees";<br>
 if(TRIGCHANGED(_tf)) VOICE(_annonce); </code></dd>

<dt>TRIGEVERY(n) (*)</dt>
<dd> Simple timer: returns 'true' only after "n" executions, cyclical. <br>
 A single 'true' value is guaranteed for every nth loop, 'n' is the number of loops, in time: t <= n x tuyaInterval (defined in 'config.js' file).<br>
<i>Example:</i> <code>if(TRIGEVERY(8)) POP( "FRIDGE", "Internal temperature: "+ ROUND(_tf/10, 1) + "°C");</code> </dd>

<dt>TRIGBYNAME(name) </dt>
<dd> Associates a 'name' (max 3 words) with a RULE, allowing it to be activated with a user command (button or voice command) or in the case of 'Alert', or with TRIGRULE(name) from another RULE ( analogous to the 'tap-to-run' Tuya).<br>
Returns true when it should be executed. <br>
<i>Example:</i> <code>if (TRIGBYNAME('fire the light')) VOICE ("You have activated: 'fire the light'") </code> </dd>

<dt>VGET(name) </dt>
<dd>GET of a permanent variable - preserved for all RULE runs.<br>
 If the <code>name</code> variable was NOT initialized with a VSET, it returns <code>null</code>. <br>
<i>Example:</i> <code>if( VGET('start') == null ) VSET('start', TIME(hrs)); </code> </dd>

<dt>VSET(name, value)</dt>
<dd>SET of a permanent variable - preserved for all RULE runs.<br>
<i>Example:</i> <code>if( TRIGEVERY(10) ) VSET('try', VGET('try') + 2);</code> </dd>

<dt>ROUND(number, pos)</dt>
<dd> Returns a string with 'pos' decimal digits (if 'pos' >0) <br>
 or an integer ('pos' = 0) <br>
 or an integer with zeros ('pos' < 0) <br>
 <i>Examples:</i> <code>'ROUND (123.567, 2)' => "123.57"; 'ROUND(123.567, 0)' => "124"; 'ROUND(123.567, -2)' => "100";</code>
</dd>

<dt>ADDCOUNT(event, restart) (*) </dt>
<dd> When the restart is true it returns the total times that event has been true otherwise, it returns <code>null</code>,
It can be used in two ways: if 'event' is a TRIGGER count the number of times. Otherwise, if it is a 'level' rate
the duration of the true state (such as the duty cycle).
 <i>Example:</i>
 <code>var _tot = ADDCOUNT(ISCONNECTED("HUB_zigbee"), TRIGEVERY(100));</code> <br>
 <code>if (_tot) POP("Reliability", "The Zigbee HUB was connected "+ _tot +"% of the time"); </code> </dd>

<dt>HYSTERESIS (value, test, delta) (*)</dt>
 <dd> Compare 'value' with 'test', using 'delta' as the hysteresis range. The output becomes 'true' if 'value &gt; test + delta/2', or 'false' if 'value &lt; test - delta/2'.<br>
 <i>Example:</i> <code>if(ISTRIGGERH(HYSTERESIS(GET("T_bed","va_temperature"), 320, 10))) SCENE("Air conditioner ON"); </code> </dd>

<dt>AVG(value, n) (*) </dt>
<dd> Moving average of the last 'n' values: returns a string with 2 decimals.<br>
'n' is the number of loops, as time: t = n x tuyaInterval (defined in 'config.js' file).<br>
 <i>Example:</i> <code>DATALOG("Average Fridge Temperature", AVG(GET("TF_fridge","va_temperature")/10, 20)); </code> </dd>

<dt>MAX(value, n) (*) </dt>
<dd>Returns the largest of the last 'n' values.<br>
'n' is the number of loops, as time: t = n x tuyaInterval (defined in config.js file).<br>
<i>Example:</i> <code>var _Tmax = MAX(GET("TF_fridge","va_temperature")/10, 1440);</code> (24h = 1440@1min/loop) </dd>

<dt>DERIVATIVE(value) (*) </dt>
<dd>Returns the derivative (better: the incremental ratio) of value.<br>
<i>Example:</i> <code>if (DERIVATIVE(GET("TF_fridge","va_temperature")) > 0) VOICE("Increasing Fridge Temperature");</code> <br>
<i>Example: to evaluate the validity of the calculations</i> <pre>
 var _integ = INTEGRAL(1, 300);
 var _deriv = DERIVATIVE(_integ);
 console.log ( _integ , _deriv); </pre>
</dd>

<dt>INTEGRAL(value, limit) or INTEGRAL(value)(*) </dt>
<dd>Returns the integral (better: the integral sum) of value. Limit is optional, and returns the integral to 0 when it is reached.<br>
<i>note: You can use <code>INTEGRAL</code> to create more precise timers than <code>TRIGEVERY()</code> which is based on cycle counting. <br> The integral of a constant is an increasing straight line: using 1 as a constant, and a <code>limit</code> in seconds, we have a sawtooth trend. The integral is 0 at startup and then every <code>limit</code> seconds (error: 0..+TuyaInterval) with excellent precision. This example is a periodic timer lasting 1h:</i> <pre>
 var _integ = INTEGRAL(1, 3600);
 if (_integ == 0) ...more...</pre>
</dd>

<dt>TIME(wath) </dt>
<dd> returns a string, "hh:mm:ss" or "mm:ss" or "ss" calculated from the current time, depending on 'wath'.
 'wath': one of the constants defined as follows: <i>hrs</i> = 11, <i>min</i> = 14, <i>sec</i> = 17 (without quotes, they are not strings) .<br>
 <i>Example:</i> <code>var _message = "At " + TIME(hrs); </code> </dd>

<dt> DAYMAP(val1, time1, val2, time2, ... <i>more</i>) </dt>
<dd> Daily programming, returns a value that varies over time: up to 'time1' the output is 'val1', from 'time1' to 'time2' the output is 'val2'... continue like this until the last 'time' after which the output is 'val1' again.<br>
Naturally, the 'val' and 'time' values ​​must be present in pairs, as many as needed. All 'times' in "hh:mm:ss" format.<br>
Uses: daily temperature profiles, timed events or enabling for time intervals, etc., depending on whether 'val' are temperatures, or 'good morning'/'good evening', or true/false, etc..<br>
 <i>Example:</i> <code>if(DAYMAP(false,"12:30", true, "2:00")) BEEP(); </code>
 </dd>

<dt>WEEKMAP(map) </dt>
<dd>Weekly programming: 'map' is a string of any seven characters, one for each day of the week, starting from Sunday (e.g.: 'DLMMGVS' or 'SMTWTFS' or '1234567'). Only if the character corresponding to today is '-' (hyphen) does it return 'false' otherwise it returns 'true'. <br>
 <i>Example:</i> <code>WEEKMAP("DLMM-VS") </code> is false only every Thursday. </dd>

<dt>YEARMAP(month, day) </dt>
<dd>Annual programming: 'month' and 'day' are two strings of any 12 and 31 characters, to identify months and days (e.g.: 'GFMAMGLASOND' and '1234567890123456789012345678901'). Only if today's month and day are '-' (hyphen) does it return 'false' (for 24h) otherwise it returns 'true'. <br>
 <i>Example:</i> <code>YEARMAP( 'GFMAMGLASON-', '12345678901234567890123-5678901') </code> is false only on Christmas.
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



