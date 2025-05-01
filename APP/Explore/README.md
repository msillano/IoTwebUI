# Explore device
[versione italiana](LEGGIMI.md)

### Objectives
_Though they follow common rules, Tuya devices have characteristics that vary greatly, ultimately depending on the manufacturers and their commercial objectives.
Through `SmartLife` we can access some data of a device: the main ones are presented on the_ main page _of the device, possibly with graphs, the others in the configuration pages _of the device during the creation of an_ automation _we find which_ conditions _we can test and which_ actions _we can perform. In the info, we then see the device Id, etc._

<table width = "100%"><tr><td>
The information accessible with SmartLife does not exhaust the potential of a device, and often, to use a device at its best both with SmartLife and with the help of other APPs, more information is needed: for example the access Key, other information on the data, such as the Dp (Data Point) for internal use, etc... which are not used or accessible with SmartLife. Even just the complete list of RT data of a device was a piece of difficult information to find a year ago.</td><td width="200pt">
<img src="https://github.com/msillano/IoTwebUI/blob/main/pics/app02.png?raw=true">
</td></tr></table>

### Results
This application allows quick and easy access to the main structures regarding a device, as they are obtained from tuyaAPI or IoTwebUI:

1. **Tuya Info**
Provides a set of **attributes** regarding the device, such as: `id`, `local_key`, `category`, `is_online`, `sub` etc...
2. **Tuya standard set**
Description of the **RT data**, associated with a category (type). Divided into 'status' (RO) and 'functions' (RW). Tuya uses this model when specific information is missing. Example, NON Tuya Zigbee devices! Or for quick updates.
3. **Tuya model**
Specific description of the RT data, associated with a Tuya device. Usually richer than the 'standard model'.
4. **Tuya schema**
A detailed list (follows 'Tuya model') of the specific RT data of a device, but with extra info, e.g. the low-level DP index (replaced by 'code' in the standard model) and the current values. This data is used by the MACRO [CLONER01()](sillano/IoTwebUI/blob/main/addon/cloner01-leggimi.md) to build/maintain the copy of a device, when it is of interest to a given RT value present in 'schema' but not in 'standard model'.
5. **IoTwebUI**
A complete list (attributes and RT data - follows 'standard model') of the data present in [IoTwebUI](https://github.com/msillano/IoTwebUI), with the current values. These values ​​are all accessible by the user and usable in the RULES using the MACRO GET() for the data and GETATTRIBUTE() for the other attributes.

New version: updated lists for AI
