## IoTwebUI user addon

ADDONs are nothing more than large MACROs (i.e. js functions): they generally create and manage **x-dervice**, but they can be used for custom libraries of specialized MACROs, etc. <br>
The advantage is that they are contained in a single file, easily updatable and also exchangeable between users. They contain all the instructions for use, allowing the 'tailor-made' extension of IoTwebUI functionality. <br>
Each user can choose the ADDONs that he/she considers most useful or create his/her own, perhaps by modifying a published addon.
A user can always add an ADDON to his/her IoTwebUI instance (detailed instructions in each Addon):<br>
- The file must be in the `addon/` dir
- The user must insert a new line in the main file (IoTwebUI.html)
- The user must add the RULE or RULES needed to execute or interact with the ADDON.

<hr>

List of ADDONs to use as they are or use as models for your custom addons:
* **battery01.js** _x-device_: Shows a list of devices with low batteries. No dependencies and
with little customization, uses auto-discovery to identify devices.
* **battery02.js** _x-device_: Similar to the previous one, but with a more performing algorithm (and more customization: the user must enter the list of devices). No dependencies.
* **classify02.js** _x-device_: Shows a list of all devices present in a HOME (or in all), divided by category (is-a). No dependencies.
* **clone01.js** _x-device_: creates and keeps updated a copy of a real Tuya device, more detailed than the standard version used by IoTwebUI. No dependencies.
* **testerbattery01.js** _x-device_: Full application including HTML UI. Requires TY-08Z HW board, clone01, tester01.html. (see [TestBattery01_readme](https://github.com/msillano/IoTwebUI/blob/main/addon/TestBattery01_readme.pdf) )


