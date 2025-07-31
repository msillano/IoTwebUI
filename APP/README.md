#  Tuya APPLICATIONS 
[versione italiana](https://github.com/msillano/IoTwebUI/blob/main/APP/LEGGIMI.md)

By APP we mean an application with a user interface, that uses Tuya and IoTwebUI with REST, to achieve the most varied objectives.
They normally comprise at least two files: 
* a MACRO (**x-device**) that acts as a middleware between the devices and the user interface, implementing the 'business logic', 
* a simple user interface (usually in HTML).

We have separated them in this dir for ease of use: during installation, the files must be copied into your host's 'addon/' and 'html/' dirs.

**All available APPs are presented in [this page](https://github.com/msillano/IoTwebUI/blob/main/APP/Overviews.md).**

**Programming Notes**<br>
* Details on [Pattern MVP](https://github.com/msillano/IoTwebUI/blob/main/html/clima01-leggimi.md#pattern-mvp) 
* "Advantages of this architecture" and 'Development process' in [testBattery01](https://github.com/msillano/IoTwebUI/blob/main/addon/TestBattery01_leggimi.pdf) 
* With **IoTwebUI 3.1**, attributes of an x_device can be read and written by AI, in addition to the user interface! This new option opens a new command channel that must be taken into account, both in terms of content and format!
<hr>

### Installation and Use
>>_note: many installation and configuration operations require the user to edit source files, due to WEBBAPP limitations. Use the usual warnings: Make a copy of the file before each change. Use a UTF8 editor (I use Notepad-plusplus). Be careful NOT to ALTER anything else (especially commas ',' and quotes '"' and "`")._

Common and general instructions. For further details see the individual APPs.

1. **minimal (without UI)**
   * Install **IoTwebUI** on the chosen server (see [IoTwebUI installation](https://github.com/msillano/IoTwebUI/blob/main/LEGGIMI22.md#installation))<br>
_note: initially delete (file `config.js`) both alarms and Logs, and set `tuyaInterval = 180` (continuous use) or `tuyaInterval = 60` (occasional use, more ready)._

   * Copy the necessary files into the **IoTwebUI** dir: _from [Github APP](https://github.com/msillano/IoTwebUI/tree/main/APP) to the `/addon` and `/html` dirs of **IoTwebUI** installed._

   * Install the required **x-device** in **IoTwebUI**.<br>
_note: instructions in the file itself `addon/xxxxx0y.js`: you need to modify the file `IoTwebUI.html`._

   * Complete the configuration of `addon/xxxxx0y.js`<br>
_In particular, check `xroom` (room: must exist), `xhome` (home: must exist) where the x-device must go, following the instructions in the file._<br>

   * If the APP requires, create the 'tap-to-run' in SmartLife to act on the Tuya devices, or whatever else is necessary to do in Tuya (e.g. _Thermostat_ requires installing a specific _virtual device_).

   * Create the necessary RULES in IoTwebUI, I recommend permanently modifying `usrrules0x.y.js`. They are indicated in the `addon/xxxxx0y.js` file itself.
  
2. **Complete installation** (User Interface)<br>
_Some APPs work perfectly without UI (e.g. Thermostat) for others the UI is essential._

   * In addition to the 'minimal' installation, install [RESTserver](https://github.com/msillano/IoTwebUI/blob/main/RESTserver/READ-ME-REST22.md#installation-and-configuration)

    * Complete the configuration of `html/xxxxxx0y.html`<br> _In particular check x_name (name of the x-device, i.e. `xname`), used in the launch RULE. See above. 
Check also any parameters and customizations._

3. **Use - until ver. 2.2**

   * Launch **RESTserver** (file `rest02.2\run_server.bat`), then minimize the `cmd.exe` window (DO NOT close!).
   * Launch **IoTwebUI** (file `run_me.bat`)
      * press OK for _INFO: Connected to REST server!_
      * press button: _READY... press to continue_
   * Launch the **interface** by clicking on the file `html\xxxxxx0y.html` (optional). It will open in your favorite browser.

3. **Use - ver. 3.0 - panel menu**

   * Launch **IoTwebUI 3.0** (file `APP_me.bat` - needs a local update!) for IoTwebUI, REST and menu
      * press OK for _INFO: Connected to REST server!_
      * press button: _READY... press to continue_
   * Now you can control APP via the custom menu.

4. **Usage - ver. 3.0 - REST + MQTT**

    * See [MQTTserver](https://github.com/msillano/IoTwebUI/tree/main/MQTTserver)
    * Install REST as indicated in **2. Complete Installation**
    * Replace the `server.js` file in RESTserver with the `server.js` file in MQTTserver dir.
    * Update `server.js`, see [MQTTserver/README.md](https://github.com/msillano/IoTwebUI/blob/main/MQTTserver/README.md) depending on the solution used.

5. **Limits** 
   * **IoTwebUI** a single instance.
   * **interface** also multiple instances if specified in the instructions.
    
6. **Troubleshooting**
* Both with **IoTwebUI** and with the **interface** right mouse click, choose 'inspect..'. Then 'console': there the error messages appear.
* For **RESTserver** the messages appear in the `cmd.exe` window
* see [issues](https://github.com/msillano/IoTwebUI/issues).

<hr>
Open Source Project, MIT License, (c)2024 marco sillano

IoTwebUI, Rest, addons, and APPs are a work-in-progress: they are provided "as is", without warranties of any kind, implicit or explicit.
<hr>
