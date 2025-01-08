## IoTwebUI user addon
[versione italiana](https://github.com/msillano/IoTwebUI/blob/main/addon/LEGGIMI.md)

ADDONs are nothing more than large MACROs (i.e. js functions): they generally create and manage **x-device**, but they can be used for custom libraries of specialized MACROs, etc. <br>
The advantage is that they are contained in a single file, easily updatable, and exchangeable between users. They contain all the instructions for use, allowing the 'tailor-made' extension of IoTwebUI functionality. <br>
Each user can choose the ADDONs that he/she considers most useful or create his/her own, perhaps by modifying a published addon.
A user can always add an ADDON to his/her IoTwebUI instance (detailed instructions in each Addon):<br>
- The file must be in the `addon/` dir
- The user must insert a new line in the main file (IoTwebUI.html)
- The user must add the RULE or RULES needed to execute or interact with the ADDON.
- **Addons** can form, when provided with a _user interface_, real [Tuya APPs](https://github.com/msillano/IoTwebUI/tree/main/APP).

<hr>

List of ADDONs to use as they are or use as models for your custom addons:
* **battery01.js** _x-device_: Shows a list of devices with low batteries. No dependencies and
with little customization, uses auto-discovery to identify devices.
* **battery02.js** _x-device_: Similar to the previous one, but with a more performing algorithm (and more customization: the user must enter the list of devices). No dependencies.
* **classify02.js** _x-device_: Shows a list of all devices in a HOME (or in all), divided by category (is-a). No dependencies.
* **clone01.js** _x-device_: creates and keeps updated a copy of a real Tuya device, more detailed than the standard version used by IoTwebUI. No dependencies.

<hr>

### APP, x-device, addon: programming notes
* An [**APP**](https://github.com/msillano/IoTwebUI/tree/main/APP) is provided with a user interface (usually WEB) to accept commands and present results.
* An **APP** uses an **x-device** as _middleware_: operating logic and data formatting ([pattern MVP](https://github.com/msillano/IoTwebUI/blob/main/html/clima01-leggimi.md#pattern-mvp)).

* An **x-device** can be implemented as an 'addon' in more complex cases, but in simple cases, it can also be realized with a few RULES.

Example:<br>
You want to format the temperature value provided by a sensor into a value displayed in an interface 'panel':<br>
_from `termometro.va_temperature` (212) to `tempData.scr_temperature` ("21.2 °C")_

An 'addon' is excessive, just two lines in the RULES:
```
if (!GETATTRIBUTE("tempData", "name", false))
    ADDXDEVICE('ROMA', "Tools", "tempData"),SETXDEVICEONLINE("tempData", true);

SETXDEVICESTATUS("tempData", "scr_temperature",
    ROUND(GET("termometro", "va_temperature")/10, 1)+" °C");
```
On the other hand, in more complex cases, the **addon-MACRO** implementation has many advantages, both in terms of use and performance!


