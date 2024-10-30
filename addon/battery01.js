/*
This file is part of IoTwebUI project (https://github.com/msillano/IoTwebUI)
Contains user data and options
------------------------------
License MIT
(C)2024 marco.sillano@gmail.com
ver 1.0 20/08/2024
per IOTwebUI version 2.2 10/08/2024
    28/10/2024  bug: modified _t1 test (rows 77, 80)
    29/10/2024  added test for battery_state: high/medium/low
 TODO:
 1. Change defaults and the function interface (see cloner01()) for easier use. 
 */

// =====================  x-device BATTERY01
// This addon implements a x-device, BATTERY01, to test device battery in many HOMES. Weak auto-discovery devices.
// note: CUSTOMIZATION: set home, room, name of the x-device, set your default 'home' name, and update example RULEs! Optional: add more device properties.

// =====================  ADDON INSTALL: USE AS EXTERNAL MACRO (preferred)
// 0) This file (updated) must be in the 'addons' directory of your IoTwebUI installation
// 1) Include THIS file in the main file ( IoTwebUI.html ) at the end, adding:
//       <script type="text/javascript" src="addons/battery01.js"></script >
// 2-A) Copy the 'RULES for BATTERY01'  (updated) in the RULE-pad at run time (temporary) 
// 2-B) Or copy the 'RULES for BATTERY01'  (updated) in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices

// ======================  INSTALL ALTERNATIVE 1: USE AS USER MACRO (only code)
// 1) Copy just 'BATTERY01' function CODE in the 'CUSTOM USER MACROS' section of usrrulesXX.X.js file
// 2-A) Copy the 'RULES for BATTERY01' (updated) in the RULE-pad at run time (temporary) 
// 2-B) Or copy the 'RULES for BATTERY01' (updated) in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices

// =======================  INSTALL ALTERNATIVE 2: USE AS RULE (no MACRO)
// 1) Uses the 'minified' version, as RULE (UPDATE the code if required!).
// 1-A) Copy the 'minified BATTERY01' + 'RULES for BATTERY01' (updated - excluding the MACRO call) in the RULE-pad at run time (temporary) 
// 2-B) Copy the 'minified BATTERY01' + 'RULES for BATTERY01' (updated - excluding the MACRO call) in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices

// ==== end use instructions

// =================== BATTERY01 CODE
// This MACRO creates the x-device 'Battery test' for device control
// 2 properties can be changed at run time by RULEs - see examples - updating automatically the device list:
// - 'home' (the Tuya HOME name)
// - 'low lewel' (i.e. the %  low limit value)

function BATTERY01() {
     // ======= singleton CONSTRUCTOR
    if (!VGET('$done'))
     // Update if required: home, room, name of the x-device
        VSET('$done', 1), ADDXDEVICE('ROMA', null, "Battery test", [{
                    code: 'home',
                    value: 'ROMA'   // UPDATE: my default home
                }, {
                    code: 'low level',
                    value: 2       // default low limit value
                }
            ]);

    //====== METHOD: a cleanup is triggered when the home property changes
    var _xhome = GET("Battery test", 'home'); // home can change at runtime
    var _lowPerc = GET("Battery test", 'low level'); // low level can change at runtime
    var _lowD = []; // temp device names array

    if (TRIGCHANGED(_xhome))     // if the attribute home changed, data cleanup
   // Update if required: home, room, name of the x-device
          ADDXDEVICE('ROMA', null, "Battery test", [{
                    code: 'home',
                    value: _xhome
                }, {
                    code: 'low level',
                    value: _lowPerc
                }
            ]),  VOICE("Aggiorno la lista dei device");

    // ====== SET or REFRESH status properties
    // I found only 2 properties for percentages in my devices: 'battery_percentage', 'va_battery'..
    // added also battery_state: high/medium/low
    GETIDLIST(_xhome).forEach((devid) => {
        let _t1 = GET(devid, 'battery_percentage', false);
        if (_t1 === null)
            _t1 = GET(devid, 'va_battery', false);
        //For more properties, duplicate the previous 2 lines...
        if (_t1 === null)
            _t1 = GET(devid, 'battery_state', false);
       if ((_t1 !== null) && ((_t1 < _lowPerc) || (_t1 == "low")))
            _lowD.push(GETATTRIBUTE(devid, 'name'));
        });
  // from _lowD to Battery test.status		
   SETXDEVICESTATUS("Battery test", "count", _lowD.length);
   _lowD.forEach((dev, pos) => {
    SETXDEVICESTATUS("Battery test", "low" + (pos + 1), dev)});
}
// end  BATTERY01 code

// =========== RULES for BATTERY01: use this in RULE-pad
//  This is an example only, using 2 homes: ROMA, MILANO - you can customize it in RULE-pad

    /*
    BATTERY01();                //  MACRO call

        // Example (optional): ROULES to change the HOME (if more than one home)! Update where required!
    if (TRIGBYNAME("Batterie MILANO")) SETXDEVICESTATUS("Battery test", 'home', 'MILANO'),REFRESH(),VOICE("Batterie di Milano"), REFRESH('cloud');
	
    if (TRIGBYNAME("Batterie ROMA")) SETXDEVICESTATUS("Battery test", 'home', 'ROMA'),REFRESH(),VOICE("Batterie di Roma"),REFRESH('cloud');

	// Example (optional): ROULE to change low battery level! Update where required!
    if (TRIGBYNAME("SET minimo 4%")) SETXDEVICESTATUS("Battery test", 'low level', 4),REFRESH(),VOICE("Livello basso delle batterie aggionato"),REFRESH('cloud');
     */

/*
// =============================  minified BATTERY01
//   Minified version of BATTERY01 for RULE-pad: 4 lines only!  (using Notepad++ + plugin JSTool).
//   On the RULE-pad you can cut long lines in many rows, and use 'continue' char (\) as last char for any row.

if(!VGET('$done'))VSET('$done',1),ADDXDEVICE('ROMA',null,"Battery test",[{code:'home',value:'ROMA'},{code:'low level',value:10}]);

var _xhome=GET("Battery test",'home');var _lowPerc=GET("Battery test",'low level');var _lowD=[];if(TRIGCHANGED(_xhome)) ADDXDEVICE('ROMA',null,"Battery test",[{code:'home',value:_xhome},{code:'low level',value:_lowPerc}]),VOICE("Aggiorno la lista dei device");

GETIDLIST(_xhome).forEach((devid)=>{let _t1=GET(devid,'battery_percentage',false);if(_t1=="none")_t1=GET(devid,'va_battery',false);if(_t1=="none")_t1=GET(devid,'battery_state',false);if((_t1!==null)&&((_t1<_lowPerc)||(_t1=="low")))_lowD.push(GETATTRIBUTE(devid,'name'));});

SETXDEVICESTATUS("Battery test", "count", _lowD.length);_lowD.forEach((dev,pos)=>{SETXDEVICESTATUS("Battery test","low"+(pos+1),dev)});

// end minified
*/
