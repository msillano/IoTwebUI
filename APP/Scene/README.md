# Explore scene

### Objectives
_This APP aims to facilitate the development and documentation of scenes (Automation and Tap-to-run) of Tuya (SmartLife or Tuya Smart APPs) and IoTwebUI simply and automatically._ <br>
Two main artifacts are produced: lists of all the scenes with the main characteristics, formatted in a table, and a graph with the relationships between scenes and devices involved.

_Text tables can serve as an archive, to be used, for example, in case of the need to re-enter scenes, if a device has changed ID._ <br>
_The graph is useful both as a verification of the implemented logic and as a clear documentation of the behavior._

<table width = "100%"><tr><td>
The menu offers these choices:

* **Automation** generates a table (for printing, horizontal A4 sheet is better) with all the automation present
* **Tap-to-run** generates a table with all the tap-to-runs
* **Tuya grapho** generates a graph with the automations, tap-to-runs and devices involved, with the relationships that link them.

_Insert the desired HOME in the upper field, and click outside the field (deselect the field): the data update starts, which can take a certain amount of time. A voice message indicates the end._

* **Clear** clears the data in memory, so you need to re-enter the HOME. <br>
Useful when you make changes in the Tuya environment and want to update.
</td><td width="200pt">
<img src= "https://github.com/msillano/IoTwebUI/blob/main/pics/scene01d.png?raw=true">
</td></tr></table>

### Results

![](https://github.com/msillano/IoTwebUI/blob/main/pics/Scene01b.png?raw=true)
![](https://github.com/msillano/IoTwebUI/blob/main/pics/scene01a.png?raw=true)

Legend: With the defaults we have:

* In green the _automations_
* In grey the _Tap-to-run_
* In box3d the external subsets and _miniAPP Tuya_: Alarms, geolocation, timer for scheduling, etc
* In ellipses i _device_.

**note:** It is easy to change both the node's shapes and colors. You need to modify `addon/scene01.js`
See [https://graphviz.org/doc/info/shapes.html](https://graphviz.org/doc/info/shapes.html).<hr>

**IMPORTANT:** _The APIs used (from 'IOT base') unfortunately do NOT provide some information, which is therefore missing in all the artifacts._ <br> While I am looking for alternative APIs, the current situation is this:

* The data and functions managed by miniAPP are not accessible. In particular:
* all the _events_ of the anti-theft (arm), of the alarms and of the emergencies are NOT differentiated and all refer indiscriminately to "armed state".
* similarly also the _actions_ are NOT differentiated and always refer to "armed state" (mini APP 'smart protection')
* The timing functions (also monthly and yearly) that are set with the 'rules' in the mini APP 'Casa Cogliente'.

_The following information is also missing:_
* the groups appear only with their ID (and not with the name) and there are no details.
* the conditions defined by the user in _scope of validity_ (preconditions)
* the _logic_ set to manage the validity preconditions or the trigger conditions (i.e. AND/OR)
* the periods (day/night/time) of validity.
* the _duration_ of delays (delay)<br>

_This information is easily visible in SmartLife but is currently NOT readable via tuyaAPI._

<hr>

### Customizations

<table width = "100%"><tr><td width="200pt">
<img src="https://github.com/msillano/IoTwebUI/blob/main/pics/scene01c.png?raw=true">
</td><td>
A partial graph in place of a total one may be useful for documentation purposes. 
This is easily achieved with the following steps:

1. Use **Plain list**, the menu fourth option: you get three lists (_automazioni_, _tap-to-run_, _x-device_) already formatted.
2. Copy the lists in the source file (`/addon/scene01.js`) to the arrays (default empty: `[]`):

```
     const excludeAutomation = [
          "automation01",
          "automation02",
      // "thermostatSTART",
         . . .
        ];

      const excludeTapToRun = [
        ];
      const excludeXDevice = [
        ];
```
4. comment (with '//' at the beginning of the line) or delete the `scenes` or `x-devices` that you WANT to process.
Default: empty arrays []: everything appears in the graphs!
5. Restart **IoTwebUI**.

_The example graph is obtained by commenting only the two automations: `thermostatSTART` and `thermostatSTOP`; the device is added automatically because it is used by automations._

</td></tr></table>
<hr>

### Grapho di x-device

The data needed for the graphs are automatically extracted from the Tuya 'scenes' and 'devices'.<br>
You need to explicitly insert metadata in the **x-devices** to include them in the graphs, for example, for documentation, as in this example, which synoptically illustrates the operation of "Explore Scene."

![](https://github.com/msillano/IoTwebUI/blob/main/pics/Screenshot%202024-12-27%20194833.png?raw=true)

The Tuya and IoTwebUI worlds have limited points of contact:

* an _x-device_ (or an IoTwebUI _RULE_) can read data from a Tuya _device_
* an _x_device_ (or an IoTwebUI _RULE_) can activate a Tuya _Tap_to_run_ to trigger actions or update devices.
* an _x-device_ appears in **Explore Scene** graphs only if it has metadata.
* a _RULE_(IoTwebUI) cannot have metadata and appears in **Explore Scene** graphs only if it is present in the _x-device_ metadata.

The (optional) structure for the metadata of an **x-device** is the following (example):
```
            x-device.details: = [
                  { from: { type: "type",
                              id: "name"},
                    to: { type: "type",
                            id: "name"},
                    action: "label"
                   }, ...];
```

_note:_
* **from** and/or **to** are optional, when missing the _x-device_ node is used as default.
* **type** is mandatory and MUST take one of the following values: **device, auto, tap, extra, xdevice, xauto, xtap, xextra.** Values ​​starting with x (e.g. _xdevice_) refer to elements of `IoTwebUI`, the others to `Tuya`. Each _type_ corresponds to a node with a different appearance, 8 in total.
* **id**, mandatory, is the name of an element and appears in the node center. If it does not exist yet, it is created: this way we can insert the _ROUTINES of_ _IoTwebUI_ into the Tuya graph.
* **action** is the label of the arc that connects _from_ to _to_.

Examples can be found in the sources in many addons or APPs. (`battery01.2.js`, `scene01.js` etc.)
