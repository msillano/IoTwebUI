# **IoTrest: A REST bridge for your Tuya devices**

**IoTrest** is an optional extension for **IoTwebUI** 2.2 that turns your Tuya devices into _**web services** accessible via simple HTTP_ requests. In addition to reading data from your devices, IoTrest allows you to interact with them in an advanced way, triggering scenes, rules and receiving alerts in real time.

### **Main features**

* **Data access:** Read the current values ​​of sensors (temperature, humidity, etc.) and the status of actuators (lights, sockets, etc.) with a URL.
* **Automation:** Send REST requests to trigger pre-configured `scenes` and `rules` in Tuya _Smart/SmartLife_ and in _IoTwebUI_, for example with an HTML button.
* **Alerts:** Check real-time alerts for events that occur on your devices (alarms, status changes, etc.).
* **Ease of use:** Intuitive and well documented REST interface. For ease of use the results received are arrays or js objects.

**NB:** _If you are not interested in using the REST function, completely ignore the 'installation and configuration' phases, you can do them later. **IoTwebUI 2.2** will work perfectly!_

### **Architecture**
![](https://github.com/msillano/IoTwebUI/blob/main/pics/rest01.png?raw=true)

_A WEBAPP (like IoTwebUI) cannot contain an HTTP server, so IoTrest (a REST-HTPP server) is a standalone application in nodejs, which communicates via websocket (the fastest method) with IoTwebUI._

IoTrest integrates perfectly with IoTwebUI and takes advantage of its powerful Tuya device management features. REST-HTTP requests sent to IoTrest are translated into commands for IoTwebUI, which in turn interacts with Tuya Cloud.<br>
The average latency (delay) between an event and its reporting in a WEB client using IoTrest is the sum of 3 factors: 0.5*(time between two device measurements in Tuya Cloud) + 0.5*(IoTwebUI polling interval) + 0.5*(interval between two REST requests of the WEB client). Typical values: 3', 2', 30" => average latency 2'65"

### **Installation and configuration**

1. **Prerequisites:**
    * Node.js installed on your system.
       * Window, Linux, macOS: see [nodejs-installer](https://nodejs.org/en/download/prebuilt-installer).
       * Android: see [node-red in Android](https://nodered.org/docs/getting-started/android), stopping WITHOUT installing _node-red_, i.e. not running the command: `npm i -g --unsafe-perm node-red`<br>
       Or if you want to install a 24/7 Android server, with various tools (FTP, DB Maria, Apache, Autostart, etc...) see here: [Android deployment](https://github.com/msillano/tuyaDAEMON/wiki/80.-deployment:-android-server#2022-update)
    * IoTwebUI ver. 2.2 or higher, configured and working: see https://github.com/msillano/IoTwebUI, version 2.2 or higher.
2. **Installation:**
    * Update your installation path in the `install_server.bat` file
    * Click on `install_server.bat`: it will install the updated dependencies in the 'node_modules' dir.
3. **Configuration:**
    * Update your installation path in the `run_server.bat` file
4. **Testing and debugging**
There are three main files:
    * `server.js`: the executable file with the IoTrest implementation, to be launched in a terminal or using `run_server.bat`.
    * `MockIOTweb.html`: a WEBAPP (must be opened in a browser) that can replace `IoTwebUI`: the _websocket_ operation is identical, only that the data used does NOT come from the 'Cloud' but is fake.
    * `client.html`: another WEBAPP with _REST client for testing_ function: it allows you to send to `IoTwebUI` every possible REST request, and see the response.

So the set of three files is self-sufficient, does not require `IoTwebUI`, and can be used as a test. When everything works as it should, close **MockIOTweb** and open **IoTwebUI** and start working with real Tuya devices.<br>

`client.html` can be used until you have one or more custom REST clients (applications or user interfaces). If you want to create WEB interfaces, the HTML/javascript code of `client.html` can serve as a template.

## **Usage**
1. First start `server.js` with `run_server.bat`: if OK the message "Server HAPI running on http://localhost:3031" appears
2. Minimize the terminal. You can reopen it to see the exchanged messages or error messages. Close it when you are done using it.
3. Load/reload **IoTwebUI** in the browser, with `run_me.bat` or directly. If OK, a pop-up will appear immediately informing you that the connection via websocket with the server has been made. note: the websocket connection only happens when `IoTwebUI` is started.
4. Use `IoTwebUI` normally. To access REST, use either custom applications/interfaces, or open `client.html` in the browser (even more than one).

note: if you do not use REST, do not run `server.js`, but just launch **IoTwebUI** normally (with `run_me.bat` or directly): it will work perfectly (without the initial connection confirmation pop-up).

### **Final considerations**

* **Security:** For security reasons, run _IOTrest_ on a local network and do not expose it directly to the Internet.
* **Reliability:** _IoTrest_ and _IoTwebUI_ access Tuya Cloud only in read mode. **Under NO CIRCUMSTANCES can Tuya data be altered.**
* **Limitations:** _IoTrest_ performance depends on your system's hardware resources and the number of connected Tuya devices. The use of WEBsocket makes _IoTrest_ very fast.
* **Support:** _IoTrest_ supports all compatible Tuya devices, including virtual devices: all the main data available in Tuya Cloud are accessible.
* **Errors:** _IoTrest_ handles errors robustly, providing simple and clear, non-blocking error messages.
* **Warnings:**
    - the `online` value provided by Tuya Cloud may differ from the actual value shown in SmartLife.
    - If a device is `online = false`, Tuya Cloud keeps the latest values, so the `device/_dev-name_/_code_` request may provide outdated data.

### **Conclusions**

**IoTrest** is the ideal tool for those who want to quickly create customized solutions for the management of their Tuya devices. Thanks to its flexibility and ease of use, REST allows you to perform unparalleled automations for your home activities and create unique user experiences.
The user (or an APP or a UI) can read all the data from the Tuya Cloud filtered, when necessary, by decoding or processing. All possible configuration and command operations are guaranteed by the mediation of the Tuya 'tap-to-run': maximum freedom with total security!

![](https://github.com/msillano/IoTwebUI/blob/main/pics/screen02.png?raw=true)

UIs like these, with images, buttons, gadgets, device data, even multipage, are quite easily made in HTML and (a little) js, and are totally interactive via REST.

![](https://github.com/msillano/IoTwebUI/blob/main/pics/screen04.png?raw=true)

<hr style="height:2px;border-width:0;color:gray;background-color:gray">

## Endpoint URI

**Request:** <br>
general: `http://localhost:3031/IoTrest/` + path (see below) <br>

**Response:** <br>
Always a js object, see individual cases.

* **device/list[/_home_[/_room_]]** (e.g.: device/list, device/list/ROMA, device/list/ROMA/Studio) <br>
Received (ROMA/Studio)
```
          {home:"ROMA",
           room:"Studio",
           devices:["Termo studio",
                    "USBswitch",
                    "Zigbee Gateway"]}
 ```
* **device/_dev-name_|_dev-id_/dinfo| dstatus|_code_** (e.g.: device/Temperatura studio/va_temperature, device/Temperatura studio/dinfo, device/Termo studio/dstatus ) <br>
Received (va_temperature)
 ```
           {name:"Temperatura studio",
            va_temperature: 28}
```
&nbsp;&nbsp;&nbsp;&nbsp;Received (dinfo) <br> 
```
           {name: "Temperatura studio",
            id: "xxxxxxxxxxxxxxxxxxxx",
            product_name: "温湿度传感器",
            model: null,
            category: "wsdcg",
            sub: true,
            logged: ["va_temperature"],
            test: false}
```
&nbsp;&nbsp;&nbsp;&nbsp;Received (dstatus) 
``` 
           {name: "Termo studio",
            online: true,
            status: {switch: true,
                     temp_current: 306,
                     temp_set: 200 }}
```
note:<br>
- `dinfo.sub` `true` if the device is a sub-device (i.e. use a HUB) <br>
- `dinfo.logged` _IoTwebUI extension_: list of properties exported from IoTwebUI to file.<br>
- `dinfo.test` _IoTwebUI extension_: `true` if there is an IoTwebUI alarm connected to the device.<br>
- `dinfo.category` : code corresponding to `is-a` (in pop-ups, EXPERT mode).

* **alert/list/_dev-name_|_dev-id_** ( e.g.: alert/list/tuya_bridge)<br>
Received
```
           {"name":"tuya_bridge",
            "alarms":[ {"code": "switch_1",
                        "trigger": true,
                        "condition": "equ",
                        "value": "true",
                        "message": "I'm closed forever",
                        "action":["pop", "beep", "voice" ]}
                         ]}
```
notes:<br> 
      - `alarms[x].trigger`: `true` in case of active alarm.<br>
      - `alarms[x].conditon` values: "grt", "equ", "lst" for ">", "=", "<" <br>
      - `alarms[x].action[y]` values: "beep", "pop", "sound", "voice" (URL and SCENE/RULE: auto, based on `message`)


* **scene/list[/_room_]** (scene/list, scene/list/ROMA)<br>
  Received
```
           {home: "ROMA".
            scenes: [{name: "ALARM OFF",
                      status: "enable",
                      running_mode: "cloud"},
                     {name: "ALARM ON",
                      status: "enable",
                      running_mode: "cloud"},
                       ...]
                 }
```
* **rule/list** (e.g.: rule/list)<br>
Received
```
          ["turn off light",
           "pippo",
           "call pippo"]
```

* **execute/_scene-name_|_rule-name_** (e.g.: execute/call pippo)<br>
Received `done rule`

**Errors:**

TX: device/Living room temperature/_va\_humidity_ => **{error: "unknown"}**

TX: device/_Living room temperature/va\_humidity => **{error: "unknown"}**

TX: device/Living room temperature/ => **{error: "malformed"}**

note:
- The response is always a Js object (even in case of error).
- The data is as it comes from Tuya Cloud: it may need decoding or scaling (e.g. `'temp_current', value: 284` => 28.4 °C). [See below](https://github.com/msillano/IoTwebUI/blob/main/RESTserver/LEGGIMI-REST22.md#customizzazioni).
- **"unknown"** in case of incorrect or not found names (typing errors).
- **"malformed"** in case of missing or misplaced path parts (syntax error).
- Devices are identified by their name or ID: using the ID is independent from the name that you can freely change.

<hr style="height:2px;border-width:0;color:gray;background-color:gray">

### Customizzazioni
The following example is present in the 'custom.js' file, created specifically to facilitate any user customizations.

#### The problem
This breaker-meter ([OPWTY-63](https://github.com/msillano/tuyaDAEMON/blob/main/devices/BreakerDIN/device_BreakerDIN.pdf)), used with the name "Main AC", presents in the Cloud the realtime data (V, A, W, leak) not in clear, but encoded in 'phase_a', as we see in the first IoTwebUI tooltip: `{code: 'phase_a', value: 'CRAAArwAAJYACg=='}`. The reason for this design choice is that the data is sent from the device every second, and so the throughput is reduced.
<table> <tr> <td> <img src="https://github.com/msillano/tuyaDAEMON/blob/main/pics/BreakerDIN.jpg?raw=true" height="200px"> <img src="https://github.com/msillano/IoTwebUI/blob/main/pics/Screenshot_080106.png?raw=true" height="20 0px"> <img src="https://github.com/msillano/IoTwebUI/blob/main/pics/popup01.png?raw=true" width ="150px" valign="top"> <img src="https://github.com/msillano/IoTwebUI/blob/main/pics/popup002.png?raw=true" width ="150px" valign="top">
</td>
</tr>
</table>
As a result, you have the real-time values ​​(V, A, W, leak) present only in the SmartLife user interface, but NOT in the Smartlife automation conditions!<br>
Without custom interventions, the real-time values ​​(V, A, W, leak) are NOT present in IoTwebUI.

#### code
It is possible to have the RT values ​​clear both in the **IoTwebUI** tooltip and in the data exported from **IoTrest**, by intervening in the 'custom.js' file as follows:

1) The decoding algorithm is known: it is implemented in the `context.global.datadecode.STRUCTELERT` function present in the `*ENCODE/DECODE user library` node of `tuyaDAEMON.CORE_devices`. Unfortunately, the function is in nodejs, and must be rewritten for the browser's js environment. The function is however quite simple:
 ```
function datadecodeSTRUCTELERT(value) {
    let result = {};
// rewritten javascript version (Buffer not available in browser)
    const decod = atob(value); // ASCII string from code64
// Int16BE conversions, scaling:
    result["V"] = (decod.charCodeAt(1) + 256*decod.charCodeAt(0)) / 10.0;       // V
    result["Leack"] = (decod.charCodeAt(3) + 256*decod.charCodeAt(2)) / 1000.0; // A
    result["A"] = (decod.charCodeAt(5) + 256*decod.charCodeAt(4)) / 40000.0;    // A
    result["W"] = (decod.charCodeAt(7) + 256*decod.charCodeAt(6)) ;             // W
    return (result);
};
```

2) The hook function `filterDP(res, devData)` is called for each device read from the Cloud, and normally does nothing, but is present to insert custom processing for the values.
The `res` parameter is the object with the complete device data, while `devData` is a `{code1:value1, code2:value2...}` object with the default values ​​to display in the tooltip.
In this case we will have:

```
   if (res.name == "Main AC") {                     //Power meter
  // decode for tooltip adds extra values ​​to devData
      const vals = datadecodeSTRUCTELERT(devData.phase_a); // decodes 'phase_a'
      devData['phase_a_V'] = vals.V.toFixed(1);     // explodes 'vals'
      devData['phase_a_Leack'] = vals.Leack.toFixed(3);
      devData['phase_a_A'] = vals.A.toFixed(3);
      devData['phase_a_W'] = vals.W.toString();
  // MORE: To Export via REST the decoded value, we add it to device.status
      addToStatus("Main AC","phase_a_decoded", vals) ;
}
```
note: `addToStatus()` is a utility that updates local data (used by REST), adding, in this case, the value `phase_a_decoded`.

#### Results
The changes made are additive: they do not alter the existing data.

- The tooltip now shows the RT data in clear (last tooltip in the figure).

- As an additional benefit, real-time data (V, A, W, leak), not usable with Tuya/Smartlife automation, can now be used as conditions in IoTwebUI RULES! Example: `GET("Main AC","phase_a_decoded").W`

- Data can be exported: the REST request `device/Main AC/phase_a_decoded` results in:
```
         {name: "Main AC",
         phase_a_decoded: {V: 227,
                           Leack: 0.002,
                           A: 1.408,
                           W: 302 }
         }
```

_The various quirks of Tuya devices sometimes require targeted interventions: the goal in implementing IoTwebUI was to make these customizations as simple as possible._
