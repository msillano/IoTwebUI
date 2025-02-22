# Logic Analyzer
[Versione italiana](https://github.com/msillano/IoTwebUI/blob/main/APP/Logic%20Analyzer/LEGGIMI.md)

This APP is a **5-channel Logic Analyzer** designed for testing, debugging, and documenting _scenes_ and _RULES_ for **Tuya** and **IoTwebUI**.

![Screenshot 2025-02-21 155415](https://github.com/user-attachments/assets/512b24fd-c1ad-4964-92e0-3ce16390bbad)<br>
TEST of the Pattern ['filter for short events'](https://github.com/msillano/IoTwebUI/blob/main/patterns/filter%20for%20short%20events.md). A is the input signal, B is the output, and C is the countdown used by another real switch (virtual switches do not have countdown implementation!).

### USAGE
* **Clear**: Initializes the chart and updates the list of displayed signals or clears the list optionally.
* **Add**: A large pop-up appears with all available devices and signals. By clicking _add_ (`aggiungi`), you can select the signals to display in the _Logic Analyzer_ (note: if more than 5 signals are selected, the later ones will overwrite the earlier ones).
_Of course, it makes sense to choose attributes (codes) with boolean values (true/false) or numeric values (0 => false, else => true: see 'countdown' (C) in the figure): for convenience, the third column shows the current values._

![image](https://github.com/user-attachments/assets/e0b957f3-9371-405e-9981-630d13f7dec6)

### Notes
* For installation, see [general instructions for APP](https://github.com/msillano/IoTwebUI/tree/main/APP#installation-and-use)
* I find it convenient to use 2 virtual devices: a 4-switch device (`IN4_vdevo`, [see](https://www.tuyaexpo.com/product/1078029)) and a 2-switch device, which can be used interchangeably to simulate inputs or display outputs.
* Additionally, I find it useful, for reliable and repeatable tests, to create a 'tap_to_run' for each test with driver functions that:
  1. Initialize inputs and outputs
  2. Enable only the 'automations' involved in the test
  3. Manage the timing sequence of inputs, preferably covering all possible cases!
* _The display has some latency, due to the frequency of TuyaCloud data polling (see `tuyaInterval`, in 'config.js', min 20s for short periods). Events shorter than 20s may NOT be displayed. Please keep this in mind when you schedule a test._


### Customizations
Especially for creating documentation, it is possible to change the names of both devices and displayed signals, even using HTML to modify their appearance.
You need to (as usual) edit the file "logic_analyzer01.js" by adding elements as follows (see the result in the figure):
```ruby
        _translate["OUT2-vdevo|switch_1"] = {
             device: "ALERT*",
             code: "<b>longOpen!</b>"
             };
```             
