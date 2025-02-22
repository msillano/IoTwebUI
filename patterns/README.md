# Tuya Patterns for Scenes
[versione italiana]()

Creating **`scenes`** in Tuya is quite straightforward: a series of interfaces and menus guide the user in creating **`tap_to_run`** (triggered manually or by other scenes, without conditions) and **`automations`** (triggered by conditions based on events).

However, it's not always smooth sailing: a series of `quirks` in Tuya's implementation can cause issues for users in the simplest cases, while the limitations imposed by design choices (lack of parameterized functions, ELSE statements, variables, arithmetic operations, etc.) can force users to seek non-linear solutions in slightly more complex scenarios, or make the use of other environments like **IoTwebUI**, tuyaDAEMON, or HA indispensable.

## Main Tuya Quirks

#### Conditions
1) **Conditions** trigger the linked actions only once, as soon as the condition is met (i.e., when the condition changes from FALSE to TRUE - edge triggering). Otherwise, coexistence between automatic and manual commands would be impossible. (see https://support.tuya.com/en/help/_detail/K9hutqbuwhik3)
2) **AND** conditions: (= all) trigger the action when they ALL become true (i.e., when the last condition changes from FALSE to TRUE and all others are already TRUE).
3) **OR** conditions: (= at least one) are independent (i.e., a trigger occurs every time a condition changes from FALSE to TRUE, regardless of the others).

#### Scope
**Scope** is only present in `automations` and consists of additional logical constraints that do not trigger activations (they are not triggers) but MUST be TRUE (level) for the conditions to trigger, and thus for the automation to activate.
In other words, 'when' an automation triggers is determined by the conditions (IF...), but the authorization is given by _enablement + conditions + scope_!

#### Disabling Automations
A `disabled automation` obviously does NOT start, regardless of conditions and scope.<br>
If you disable an `automation` during execution, it stops execution before the next task.<br>
Some issues arise when disabling followed by re-enabling during the execution of a delay. A disable is honored at the end of the current delay. However, if a re-enable occurs before the delay ends, the behavior can vary: in some cases, execution aborts (Zigbee) correctly; in others, it _does NOT abort, completely ignoring the disable_! Therefore, this is a situation to avoid, as it is NOT reliable!

#### HW Workarounds
Sometimes it is necessary to overcome the absence of variables or other language limitations by using devices (real or virtual) as a semaphore (1 bit of memory) or as a timer (using the countdown function), etc., which obviously complicates the scenes.

## Tuya Patterns
Some problems appear similar in different applications. In these cases, a valid general solution is called a 'pattern' and is suitable for repeated use.
This is a collection of patterns for Tuya scenes, often born and discussed in the [TuyaItalia group](https://www.facebook.com/groups/tuyaitalia?locale=it_IT) and then developed and documented with the help of various AI tools.

#### Contexts
For the patterns, three contexts have been considered:

1) **Local linkage**: Tuya scenes that can be executed directly by the HUB and Zigbee devices, without using WiFi or TuyaCloud. Using this context imposes some limitations on the conditions and actions available, in addition to the constraint of all Zigbee devices and the inability to use virtual devices and scope. _LAN linkage_ is similar in constraints and performance but involves multiple Zigbee HUBs and requires WiFi.<br>
Preferred for a reliable and robust system.<br>
Note: nothing prevents using these patterns with WiFi devices (_Cloud linkage_): the advantage of local operation is lost, but the logic remains valid!

2) **Cloud linkage**: All valid scenes in Tuya, using the Cloud, etc.<br>
Relying on the Cloud, they require reliable 24/7 WiFi. Generally simpler than equivalent _local linkage_ patterns.

3) **IoTwebUI RULES**: The [RULES](https://github.com/msillano/IoTwebUI/blob/main/LEGGIMI30.md#regole---sintassi) are the equivalent of Tuya 'scenes'. They use powerful [MACROS](https://github.com/msillano/IoTwebUI/blob/main/LEGGIMI30.md#regole---macro) that simplify their definition and are written by the user in a javascript 'dialect'. They are 'Turing complete,' meaning they can implement any algorithm.<br>
Essential for some applications (e.g., Thermostat, full of arithmetic operations!), for patterns, they sometimes represent a simple and powerful alternative.<br>
They depend on the execution of **IoTwebUI** on a server, making them the least robust solution.
