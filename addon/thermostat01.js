/*
This file is part of IoTwebUI project (https://github.com/msillano/IoTwebUI)
Contains user data and updatable options
------------------------------
License MIT
(C)2024 marco.sillano@gmail.com
ver 1.0 07/12/2024
for IOTwebUI version 2.2.2
*/

// =====================  x-device THERMOSTAT01.1
// This addon implements a x-device, THERMOSTAT01, a SW cronothermostat for Tuya+IoTwebUI
// see https://github.com/msillano/IoTwebUI/tree/main/APP/Thermostat

// =====================  ADDON INSTALL: USE THIS AS EXTERNAL MACRO 
// 0) This file (updated) must be in the 'addons' directory of your IoTwebUI installation
// 1) Include THIS file in the main file ( IoTwebUI.html ) at the end, adding a line like:
//       <script type="text/javascript" src="addons/thermostat01.js"></script >
// 2-A) Copy the 'RULES for THERMOSTAT01'   in the RULE-pad at run time (temporary)
// 2-B) Or copy the 'RULES for THERMOSTAT01' in the 'var usrrules' in the usrrulesXX.X.js file (better - permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices
// ======= install howto ends

// =================== THERMOSTAT01 CODE === USER CONFIGURATION
// Parameters: defaults - xname = "WEB Thermostat", xroom = "Test", xhome = 'ADMIN' 
// IMPORTANT: in SmartLife APP the home "AMIN" and the room "Test" MUST exist.
// Or calling it in ROULE you can change:  THERMOSTAT01([my_name[, my_room [, my_home]]]), use null for no-room, no-home.
// CUSTOMIZATION: 

function THERMOSTAT01(xname = "WEB Thermostat", xroom = "Test", xhome = 'ADMIN') {
// HERE the Tuya user name of the your 'virtual device': 
    const nodeVirt = "HeatingThermostat-vdevo";
// user LIST of used thermometers (one or more) [device name, property, scale]
// note: if in the device's IoTwebUI popup you see ['temp_current' = 213](in place of 21.3) the scale is 10
    var sonde = [
        ['Termo letto', 'temp_current', 10],
    ];
// user TARGET temperature (Setpoint) for 7 day  
// note: many (as you like) couples (temperature, time end as HH:MM), circular. 
    var Tprg = [
        DAYMAP(16, "08:00", 20, "11:00", 21, "23:00"),              // domenica / sunday
        DAYMAP(16, "08:00", 20, "11:00", 16, "18:00", 21, "23:00"), // lunedì / Monday
        DAYMAP(16, "08:00", 20, "11:00", 16, "18:00", 21, "23:00"),
        DAYMAP(16, "08:00", 20, "11:00", 16, "18:00", 21, "23:00"),
        DAYMAP(16, "08:00", 20, "11:00", 16, "18:00", 21, "23:00"),
        DAYMAP(16, "08:00", 20, "11:00", 16, "18:00", 21, "23:00"),
        DAYMAP(16, "08:00", 20, "11:00", 16, "18:00", 21, "23:00"),
    ];
// isHotMode: true => hot mode (winter)
// isHotMode: false => cold mode (summer)
    var isHotMode = true;   
// user tempetature for ECO mode:
    var ECOHtemperature = 16.5;     // low for HOT mode - in 1h back to confort  (20°)
    var ECOCtemperature = 30;       // hi for COLD mode - in 1h back to confort  (24°)
// user  temperature tolerance: 0.3 preferred (HOT mode)
    var delta = 0.3; // Histeresys = 2* delta
// user thermometer temperature correction (optional).
    var offset = -0.0; // correction for temperature 

// =================== USER CONFIG  ENDS

// =================== locals:  do not change  ==============
    var AVGsonde = 3;
    var Tswitch = true;
    var Tmode = 'manual';
    var Tactual = "20.0";
    var Ttarget = "21.0";
    var fromPrg = "20";
    var THoutput = VGET('THoutput') || false;
    var TCoutput = VGET('TCoutput') || false;
    var dayChanged = false;
    // startup
    var oggi = VGET('oggi') || -1;
    var momentary = VGET('momentary') || false;

    // step 0 ========= update locals values from virtual
    const VirtTerm = getDeviceFromRef(nodeVirt);
    let status = {};
    VirtTerm.status.forEach((rec) => {
        status[rec.code] = rec.value;
    });
    // Tswitch
    Tswitch = status.switch;
    // Tmode
    Tmode = status.mode;
  // Ttarget
    Ttarget = status.temp_set / 10; // i.e.  124 => 12.4 °C
  // fromPrg: user programmed Setpoint
    const d = new Date();
    if (oggi != d.getDay())
        dayChanged = true;
    oggi = d.getDay();
    fromPrg = Tprg[oggi];
	  // user temperature change process ( auto mode)
    let userchanged = TRIGCHANGED(Ttarget);
    let prgchanged  = TRIGCHANGED(fromPrg);
    if (Tmode == 'auto') {
        if (!momentary && userchanged)
            momentary = true;
        if (momentary && prgchanged)
            momentary = false;
    }

    //  step 1  ========  Tactual processing
    //   update temperature
    if (sonde.length > 0) {
        let t = 0;
        for (i = 0; i < sonde.length; i++)
            t += GET(sonde[i][0], sonde[i][1], false) / (sonde[i][2] ? sonde[i][2] : 1);
        Tactual = AVG(offset + (t / sonde.length), AVGsonde);
 //       console.log("t, Tactual", t, Tactual);
    }
	
    // step 2  ======== update Ttarget (default from virtual)
 //   console.log("momentary ", momentary, Ttarget, fromPrg);
    switch (Tmode) {
    case 'eco':
        Ttarget = isHotMode? ECOHtemperature:ECOCtemperature ;
        break;
    case 'auto':
        if (!momentary)
            Ttarget = fromPrg;
        break;
    case 'manual':
    default:
    }
	
    // step 3  ========  decision: ON/OFF (HOT and COLD)

    if (!Tswitch) {
        THoutput = false;
        TCoutput = false;
    } else {
        //       console.log("test ", Number(Ttarget) - delta, Number(Ttarget) + delta, (Number(Tactual)));
        if ((Number(Ttarget) + delta) <= (Number(Tactual))) {
            THoutput = false;
            TCoutput = true;
        }
        if ((Number(Ttarget) - delta) >= (Number(Tactual))) {
            THoutput = true;
            TCoutput = false;
        }
    }
	
// ore ON (consumi)	
const TimeHOn = INTEGRAL((THoutput ? (1 / 3600) : 0), (dayChanged ? -1 : null)); // IN ORE - riscaldamento

const TimeCOn = INTEGRAL((TCoutput ? (1 / 3600) : 0), (dayChanged ? -1 : null)); // IN ORE - raffrescamento

// step 4  ========  store status variables
VSET('oggi', oggi);
VSET('momentary', momentary);
VSET('THoutput', THoutput);
VSET('TCoutput', TCoutput);

// step 5  ======= update the x-device
ADDXDEVICE(xhome, xroom, xname, [{
            code: 'Tswitch',
            value: Tswitch
        }, {
            code: 'Hot',
            value: isHotMode
        },{
            code: 'Tmode',
            value: (momentary ? Tmode + '+user' : Tmode)
        }, {
            code: 'Tactual',
            value: ROUND(Tactual, 1)
        }, {
            code: 'Ttarget',
            value: Ttarget
        }, {
            code: 'TimeON',
           value:  isHotMode? ROUND(TimeHOn, 2):ROUND(TimeCOn, 2)         // raffresacamento
        }, {
            code: 'HOTout',
            value: isHotMode && THoutput
        }, {
            code: 'COLDout',
            value: (!isHotMode) && TCoutput
        },

    ]);
SETXDEVICEONLINE(xname);

return;

}
// end  THERMOSTAT01 code

// =========== RULEs for THERMOSTAT01:
// 2-A) Copy this 'RULES for THERMOSTAT01'   in the RULE-pad at run time (temporary)
// 2-B) Or copy this 'RULES for THERMOSTAT01' in the 'var usrrules' in the usrrulesXX.X.js file (better - permanent).
/*
  THERMOSTAT01();  // runs this every loop, uses default values - see line 29 - required
  
//   note: the Tuya 'tap-to-run' "HOTTURNON", "HOTTURNOFF", etc.  MUST EXIST !
//   rules for HOT on/off - optional
  if(GET("WEB Thermostat","HOTout", false)) SCENE("HOTTURNON"); 
  if(GET("WEB Thermostat","HOTout", false)) SCENE("HOTTURNOFF");
  
//   rules for COLD on/off - optional
  if(GET("WEB Thermostat","COLDout", false)) SCENE("COLDTURNON"); 
  if(GET("WEB Thermostat","COLDout", false)) SCENE("COLDTURNOFF"); 

*/
