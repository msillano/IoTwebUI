<h1>Integration Methods for Third-Party Zigbee Sub-Devices into the Tuya Ecosystem</h1>

[versione italiana](https://github.com/msillano/IoTwebUI/blob/main/MQTTserver/LEGGIMI.md)

_Currently (July 2025), Tuya accepts third-party Zigbee devices (with some limitations, see https://www.tuyaos.com/viewtopic.php?t=2688) while completely rejecting the "pairing" to "unauthorized" Tuya devices - i.e., Tuya Zigbee devices with non-original Tuya chips (news still uncertain, see post https://www.facebook.com/groups/tuyaitalia/permalink/1678413936126286/)._

If a user has a significant number of Zigbee devices, with many control scenes, the zero solution should consist of repurchasing the 'unauthorized' devices, but this time from well-known and reliable brands!

However, the problem remains of how to use 'banned' Zigbee devices and third-party Zigbee devices not compatible with Tuya. Several solutions are possible, some presented here in increasing order of complexity and performance. Each user can identify the solution that best meets their needs!

_**General Note**: Essential automations should be implemented using Tuya only, perhaps with 'local linkage'! Every added application reduces reliability and increases latency! <br>
Therefore, the Zigbee devices we are discussing here, with their respective solutions, will be better utilized in accessory applications, for sporadic use and not in key roles in stable home automation!_

<h3>SOLUTION 1: SLZB-06 (zigbee Hub) stand-alone</h3>

I acquired and tested the **SLZB-06p7** model, designed in Ukraine - for other models see http://smlight.tech/manual/slzb-06/guide/slzb-models-overview/) - which has very interesting features!
In particular, it has an operating mode called **zigbee Hub** standalone (see https://github.com/smlight-tech/slzb-os-zigbee-hub/tree/main).<br>
It also has a programming language for which it can execute custom control scripts (see https://github.com/smlight-tech/slzb-os-scripts)<br><br>
<table><tr>
<img height="230" alt="image" src="https://github.com/user-attachments/assets/084a0eb6-a901-4602-bf85-43377ab70c65" />
<img width="700" height="230" alt="image" src="https://github.com/user-attachments/assets/31bfd295-1a1c-41b9-b771-d39a348cfd65" />
</tr></table>

PROS:
- "`Zigbee Hub` is a mode that allows processing of all Zigbee traffic within the SLZB-OS system without the need to use ZHA or Z2M."
- "This ensures excellent stability, as it is no longer necessary to send raw Zigbee packets over the network, but instead already processed messages are sent.
The loss of a ready message will not cause a failure in the hub (as happens with ZHA/Z2M)."
- "MQTT integration allows ensuring traffic integrity (with QOS > 0)."

CONS:
- "The disadvantage of this solution is the limited computing power of the SLZB-06 controller's CPU, which limits the maximum number of ZigBee devices it can process." (about ten)
- "Furthermore, support for ZigBee device functionalities is limited (it will be expanded over time)."
(source https://github.com/smlight-tech/slzb-os-zigbee-hub/tree/main).

![514352507_10228789887283300_8876190228529040627_n](https://github.com/user-attachments/assets/24348a01-c471-4853-adf7-815f9527281d)
![516749877_10228789885683260_7727836866700025590_n](https://github.com/user-attachments/assets/0c145c4a-37dd-4772-97fd-51674b4ebb1e)

<h4>Usage Notes (SLZB-06P7)</h4>

- Connect LAN to the router and USB for power.
- If necessary, set LAN mode with the (inconvenient) button (see https://smlight.tech/manual/slzb-06/guide/configuration/#configuring-with-button) - blue LED on.
- Find SLZB-06P7's IP via modem/WiFi scan (or directly use `http://slzb-06p7.local/`) to access the configuration pages with a browser - (see https://smlight.tech/manual/slzb-06/guide/configuration/#configuring-with-web-interface)
- Update FW via OTA - Tested versions 2.9.4 and 20240316 (see http://smlight.tech/manual/slzb-06/guide/flashing-and-updating/updating-zigbee.html)
- Configuration: mode => zigbee Hub, Network => Ethernet/WiFi as preferred, MQTT => off.
- Hard reset (if you lose the configuration page): "turn on the device with the button pressed, when the LEDs start to flash, release the button".

<h4>Conclusion 1</h4>

A truly simple solution (only requires an SLZB-06 adapter). The WEB configuration pages present devices in two ways: as a list and as a dashboard (see figures).
It is thus possible to read Zigbee sensor values and issue manual commands to devices, with the SLZB-06's limitations indicated by the manufacturer!

<h3>SOLUTION 2: SLZB-06 (zigbee Hub) + mosquitto + MQTT Explorer </h3>
To further process device data, it needs to be collected and sent to a processing application!
The simplest solution is to use an _MQTT Broker_ (e.g., mosquitto - http://mosquitto.org/) to receive data from SLZB-06 and a simple _client APP_ that allows displaying MQTT data in various ways (e.g., MQTT Explorer - http://mqtt-explorer.com/)!

_As seen from the MQTT Explorer screenshot, at the top are all received MQTT messages (the numerical codes are typical of Zigbee devices and defined in ZCL - Zigbee Cluster Library), on the right the data represented as an object, and below are graphs of some user-selected values. In the example, the topic is "zhub/data/a4c13849baf0f06c/1/0402/0000" and the graph shows the values of "data.val" (temperature). Each point represents a measurement sent by the device!_

<img width="1025" height="617" alt="Schermata 2025-07-19 alle 19 33 18" src="https://github.com/user-attachments/assets/54bf88ee-b08c-4557-a836-095cbbef6595" />

<h4>Usage Notes (mosquitto)</h4>

- Install mosquitto from (https://mosquitto.org/download/) On Win it can be installed as an APP or as a service: https://cedalo.com/blog/how-to-install-mosquitto-mqtt-broker-on-windows/
- Configuration. These two values must be added in `mosquitto.conf` to easily access the Broker:

                        listener  1883  0.0.0.0
                        allow_anonymous true

<h4>Usage Notes (MQTT Explorer)</h4>

- Install 'MQTT Explorer' from [MQTT Explorer](http://mqtt-explorer.com/)
- Provide connection data for the mosquitto Broker.

<h4>Conclusion 2</h4>

Still a very simple solution because **mosquitto** and **MQTT Explorer** are easy to install, even on a single PC, and require little configuration! Naturally, on SLZB-06, the "zigbee Hub" mode remains with its limitations, and MQTT output must be enabled! <br>
Added functionalities include historical data storage and visualization in graphs! However, data series export is not available in 'MQTT Explorer'.

<h3>SOLUTION 3: SLZB-06 (zigbee Hub) + mosquitto + IoTwebUI </h3>

_One of the serious limitations of the two previous solutions is the inability to use Zigbee devices managed by SLZB-06p7 in automations! This applies both among themselves and when including 'scenes' and devices controlled by Tuya!_

To make this possible, it is necessary to use **IoTwebUI** and create **custom 'x-devices'** with automatically updated data: 'x-devices' can be used together with standard Tuya devices in IoTwebUI RULES (more powerful than Tuya 'scenes'), and can activate Tuya 'Tap-to-run'!

<table><tr>
<img width="489" height="238" alt="Schermata 2025-07-20 alle 09 04 53" src="https://github.com/user-attachments/assets/e02adab1-5475-436e-b00b-a385275982f7" />
<img width="404" height="187" alt="Schermata 2025-07-21 alle 13 09 25" src="https://github.com/user-attachments/assets/19263121-02d2-49df-82be-79d9b4f3ea37" />
</tr></table>

This screenshot shows how an x-device for a temperature/pressure sensor appears in IoTwebUI. On the right, a similar Tuya device.

Notes:
- X-devices, with gear icons, can be placed in any room created with Tuya (in the figure, the 'MQTT' room).
- Some data is missing, for example, the °C/°F option for temperature. This is because they are not implemented in "SLZB-06 zigbee Hub" (see https://github.com/smlight-tech/slzb-os-zigbee-hub/tree/main?tab=readme-ov-file#what-is-currently-supported)
- Since the x-device is user-implemented, data can be scaled/formatted, attributes can be used in any language, or other available data can be added (in this case, I added `lqi`, Zigbee link quality index).
- In IoTwebUI's Automations (RULES), `Tuya devices` and `x-devices` can be mixed, and Tuya 'tap-to-run' can be launched. Simple example (see https://github.com/msillano/IoTwebUI/blob/main/LEGGIMI30.md#ref-macro-per-risorse):

            if (  (GET("x-clima-sala", "Temperatura")  > 22.0 ) ||
                  ((GET("Temperature letto", "va_temperature")/10 ) > 22.0) ) SCENE("Spegni riscaldamento")

<h4>Usage Notes (IoTwebUI)</h4>
- Install IoTwebUI (ver > 3.0) and REST (ver. > 3.0) as per instructions (see https://github.com/msillano/IoTwebUI/blob/main/APP/LEGGIMI.md#installazione-e-uso)
- Configuration: The mapping between MQTT topics and REST (device, attribute, value) is the user's responsibility and must be done for each device. Unlike 'types', this implementation offers maximum freedom to the user, as it allows optimization for each device.
- Therefore, the `'server.js'` file must be updated for each device used. See examples at the beginning of the file! The topics used for each device can be seen with 'MQTT Explorer'. Example:

        "zhub/data/a4c13849baf0f06c/1/0402/0000": {           // MQTT topic - temperature
            description: "Temperatura - x-clima-sala",
            lastValue: null,                     // default
            handler: (data, thisMap) => {        // REST creation function here
                if (data.data.val === thisMap.lastValue)   // skips duplicates
                    return null;
                thisMap.lastValue = data.data.val;
                return (baseREST + "set/x-clima-sala/Temperatura/" + data.data.val + "°C");
                          // REST: set/<x-device-name>/<attribute>/<value>
                },
            },

- For each virtual device you want to use, you must add a definition line (singleton) in the RULES (file `usrrules03.x.js`), like the following example (home: 'ROMA'; room: 'mqtt'; name: 'x-clima-sala';):

            if (!GETATTRIBUTE('x-clima-sala', "name", false)) ADDXDEVICE('ROMA', 'mqtt', 'x-clima-sala'), SETXDEVICEONLINE('x-clima-sala');

- Launch order:
    1. "mosquitto" first (if it's a service, startup is automatic). On the SLZB-06 pages, you can see if the connection has been established!
    2. `APP_me.bat` launches both the REST + MQTT server (server.js), but only if necessary, then the user interface (IoTwebUI)!.
    3. For debugging, it is possible to launch the REST + MQTT server (server.js) in a cmd window: `node server.js` then you can use `APP_me.bat`: this way you can see the log of operations performed by REST + MQTT

 <img width="727" height="452" alt="Schermata 2025-07-22 alle 20 16 36" src="https://github.com/user-attachments/assets/09896242-222d-4244-bcb9-0e52c765d0c1" />


<h4>Conclusion 3</h4>

An overall complete solution, at the cost of an update for each added device! The user has complete customization freedom for each device. It therefore allows the reuse of 'banned' Tuya devices in automations interacting with Tuya.<br>
The limitations of the _SLZB-06 zigbee Hub_ mode are always valid: few devices and limited functions!

<h3>SOLUTION 4: SLZB-06 + zigbee2mqtt + mosquitto + ( MQTT Explorer | IoTwebUI ) </h3>

_To be able to process more devices, the solution is to use an external decoding software to the SLZB-06 adapter, with the host system's resources available!_
The SW in question is **zigbee2mqtt**, which, coupled with **SLZB-06P7**, allows managing up to **300** Zigbee devices, provided they belong to the set of **4464** 'known' devices to zigbee2mqtt (see https://www.zigbee2mqtt.io/supported-devices/).<br> 

<img width="1808" height="605" alt="image" src="https://github.com/user-attachments/assets/1e7707c7-d9a5-4145-ba3f-d9bcbf0b69e1" />


Note: it is still possible to add 'unknown' Tuya Zigbee devices to `zigbee2mqtt`, see https://medium.com/@dzegarra/zigbee2mqtt-how-to-add-support-for-a-new-tuya-based-device-part-1-b20227251d46

The `zigbee2mqtt` web interface presents numerous pages, some similar to those already seen with `zigbee Hub` (list, dashboard), others new: Map, Groups, etc.

![ScreenShot_20250725194703](https://github.com/user-attachments/assets/9dd59e9b-085a-40ea-a4ea-49504f4a7253)
![ScreenShot_20250725194808](https://github.com/user-attachments/assets/1218d458-e45b-4bb4-bf08-7a5bfd2fbb14)
![ScreenShot_20250725194931](https://github.com/user-attachments/assets/af00f0b1-937a-42a5-ac20-963ac35b7dd0)


The topics used by `zigbee2mqtt` are more concise, hence simpler to manage and use, as MQTT Explorer clearly shows:

![ScreenShot_20250726123726](https://github.com/user-attachments/assets/3f8ba1ae-f9c8-427f-a65c-ed2af3da817d)

In this case, only one 'topic' is used per device!

<h4>Usage Notes (SLZB-06P7)</h4>

For use with `zigbee2mqtt`, the SLZB-06 adapter can be configured in various ways. In particular, I chose USB + Ethernet, and 'coordinator' mode. Obviously, the Zigbee FWs have been updated.

<img width="1144" height="405" alt="Schermata 2025-07-25 alle 20 41 50" src="https://github.com/user-attachments/assets/813a6810-85f1-4088-9f93-f168837ae4d0" />

<h4>Usage Notes (zigbee2mqtt)</h4>

Installation is not very simple. Follow the instructions https://www.zigbee2mqtt.io/guide/installation/<br>
Configuration can be done by updating the `zigbee2mqtt/data/configuration.yaml` file. See https://www.zigbee2mqtt.io/guide/configuration/.<br>
The goal is a serial communication via USB between `SLZB-06P7` and `zigbee2mqtt`.
Example, I am using this:

            version: 4
            mqtt:
              base_topic: zigbee2mqtt
              server:  mqtt://localhost:1883
            serial:
              port: COM3
              baudrate: 115200
              rtscts: false
            advanced:
              transmit_power: 20
              log_level: info
              ........

- The MQTT data and commands used by **zigbee2mqtt** are documented at https://github.com/Koenkk/zigbee2mqtt.io/blob/master/docs/guide/usage/mqtt_topics_and_messages.md>

<h4>Usage Notes (APP) </h4>

Once the data reaches the mosquitto broker, it can then be used in the ways already seen, according to the user's needs and preferences.

- **MQTT Explorer** is the simplest solution, always useful for seeing MQTT topic and payload details, and also allows graphs of all measurements!

- **IoTwebUI** is the solution that offers the most customization opportunities, maintaining integration with Tuya, and has maximum freedom for interfaces and custom APPs! (see https://github.com/msillano/IoTwebUI/blob/main/APP/Overviews.md). Obviously, my preferred solution.

<h4>Usage Notes (IoTwebUI)</h4>

- `zigbee2mqtt` groups data into a single message per device. Therefore, the `'server.js'` file must be updated for each device used differently from the `Zigbee Hub` case. See examples at the beginning of the file! The topics used for each device can be seen with 'MQTT Explorer' - Both definitions can coexist, having different 'topics'!. Example:

        "zigbee2mqtt/0xa4c13849baf0f06c": {             // device-id
            description: "Temperatura - x-clima-sala",
            lastValue: null,
            // {"battery":100,"humidity":63.84,"linkquality":102,"temperature":27.13,"voltage":3000}
            handler: (data, thisMap) => {
                if (data.linkquality === thisMap.lastValue)
                    return null;
                thisMap.lastValue = data.linkquality;
            // now set all dPs.
                addToRestBuffer(baseREST + "set/x-clima-sala/batteria/" + data.battery + "%");
                addToRestBuffer(baseREST + "set/x-clima-sala/lqi/" + data.linkquality );
                addToRestBuffer(baseREST + "set/x-clima-sala/Umidità/" + data.humidity + "%" );
                return (baseREST + "set/x-clima-sala/Temperatura/" + data.temperature +  "°C");
                },
            },

<h4>Conclusion 4</h4>
Using `zigbee2mqtt` has advantages and disadvantages.

PROS
- Maximization of usable Zigbee devices: up to **300** Zigbee devices, and a set of **4464** 'known' devices.
- A 'clean' MQTT standard compatible with an infinite number of home automation APPs (see solution 5) from which the user can choose.

CONS
- Greater general complexity: installation, configuration, maintenance (it took me two days to get it working!)
- Increased risks related to reliability (using more logical blocks increases the probability of 'failures')
- It becomes increasingly necessary to use a dedicated 24/7 server: an Android top-box (my preferred solution, see https://github.com/msillano/tuyaDAEMON/wiki/80.-deployment:-android-server), a Raspberry, a mini PC etc...

Therefore, carefully evaluate the balance of advantages/disadvantages of this solution.

<h3>SOLUTION 5: SLZB-06 + zigbee2mqtt (+ mosquitto) + APP </h3>

zigbee2mqtt holds a de facto standard position in the field of Zigbee devices; therefore, many home automation applications provide integration with `zigbee2mqtt`. To use Zigbee2MQTT with other systems, native integration is not mandatory, but MQTT support is required. Native integration makes things simpler and more "clickable".

"Zigbee2MQTT integrates well with (almost) every home automation solution because it uses MQTT. However the following integrations are worth mentioning:" (https://github.com/Koenkk/zigbee2mqtt/blob/master/README.md#integrations)

<img align="left" height="100px" width="100px" src="https://user-images.githubusercontent.com/7738048/40914297-49e6e560-6800-11e8-8904-36cce896e5a8.png">

### [Home Assistant](https://www.home-assistant.io/)

- [Home Assistant OS](https://www.home-assistant.io/installation/): Using [the official addon](https://github.com/zigbee2mqtt/hassio-zigbee2mqtt)
- Other installation: using instructions [here](https://www.zigbee2mqtt.io/guide/usage/integrations/home_assistant.html)

<br>

<img align="left" height="100px" width="100px" src="https://etc.athom.com/logo/white/256.png">

### [Homey](https://homey.app/)

- Integration implemented in the [Homey App](https://homey.app/nl-nl/app/com.gruijter.zigbee2mqtt/)
- Documentation and support in the [Homey Forum](https://community.homey.app/t/83214)

<br>

<img align="left" height="100px" width="100px" src="https://user-images.githubusercontent.com/2734836/47615848-b8dd8700-dabd-11e8-9d77-175002dd8987.png">

### [Domoticz](https://www.domoticz.com/)

- Integration implemented in Domoticz ([documentation](https://www.domoticz.com/wiki/Zigbee2MQTT)).

<br>

<img align="left" height="100px" width="100px" src="https://github.com/user-attachments/assets/5acd77fb-1cbe-40b6-9515-935fd21dd3b4" />


### [Gladys Assistant](https://gladysassistant.com/)

- Integration implemented natively in Gladys Assistant ([documentation](https://gladysassistant.com/docs/integrations/zigbee2mqtt/)).

<br>

<img align="left" height="100px" width="100px" src="https://forum.iobroker.net/assets/uploads/system/site-logo.png">

### [IoBroker](https://www.iobroker.net/)

- Integration implemented in IoBroker ([documentation](https://github.com/o0shojo0o/ioBroker.zigbee2mqtt)).

<br>
_Furthermore, these applications have also been integrated_ (see https://www.zigbee2mqtt.io/guide/usage/integrations.html#integrations):

- **Majordomo** (Russian)
- Mozilla IoT **WebThings** Gateway via Zigbee2MQTT adapter
- **openHAB**
- **Homebridge** plugin (Apple HomeKit)
- **Symcon Automation** Solutions
- **HomeSeer**
- Matterbridge Zigbee2MQTT Plugin (**Apple HomeKit** and Google Home)
- Zigbee2MQTT **Automations**
- **node-red-contrib-zigbee2mqtt** for custom applications in node-red

All these home automation applications feature different look and feel, and different ways to create automations, as well as varying degrees of compatibility and ease of installation and use.
**I recommend trying more than one before making a choice!**

_However, all these excellent home automation applications present a common problem, which from my point of view advises against their generalized adoption: none allow integration with 'scenes' and all devices directly managed by Tuya!_

<h4>Conclusion 5</h4>

If there is a need for a subset of Zigbee devices, independent of the Tuya system, these APPs can speed up implementation!
However, if you want more interconnected systems, as is ideal for home automation, you either have to abandon Tuya and its ecosystem, or you have to use solutions like IoTwebUI or custom solutions that allow bidirectional communication with Tuya!

_If you implement one of these solutions, please let me know your pros and cons to update this guide._

Sincerely
