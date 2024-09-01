/*
This file is part of IoTwebUI project (https://github.com/msillano/IoTwebUI)
Contains user data and options
------------------------------
License MIT
(C)2024 marco.sillano@gmail.com
per IOTwebUI version 2.2 10/08/2024
 */
// =====================  x-device BATTERY01
// This addon implements a x-device, BATTERY01, to test device battery in many HOMES. Weak auto-discovery devices
// note: CUSTOMIZATION: set your default 'home' name, update command RULE for more than one home!

// =====================  USE AS NEW MACRO 
// 0) This file (updated) must be in the 'addons' directory of your IoTwebUI installation
// 1) Include THIS file in the main file ( IoTwebUI.html ) at the end, adding:
//       <script type="text/javascript" src="addons/battery01.js"></script >
// 2-A) Copy the 'RULES for BATTERY01' in the RULE-pad at run time (temporary) 
// 2-B) Or copy the 'RULES for BATTERY01' in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices
// You can use 'BATTERY01()' as new MACRO in RULE-pad !.

// ======================  USE AS NEW MACRO - ALTERNATIVE
// 1) Copy just 'BATTERY01' function CODE in the 'CUSTOM USER MACROS' section of usrrulesXX.X.js file
// 2-A) Copy the 'RULES for BATTERY01' in the RULE-pad at run time (temporary) 
// 2-B) Or copy the 'RULES for BATTERY01' in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices
// You can use 'BATTERY01()' as new MACRO in RULE-pad !.

// =======================  USE AS RULE (no MACRO)
// 1) Use the 'minified' version, as RULE (UPDATE the code if required!)
// 1-A) Copy the 'minified BATTERY01' + 'RULES for BATTERY01' (excluding MACRO call) in the RULE-pad at run time (temporary) 
// 2-B) Copy the 'minified BATTERY01' + 'RULES for BATTERY01' (excluding MACRO call) in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices

// ==== end use instructions

// =================== BATTERY01 CODE
// WARNING: the TRIGBYNAME() MACRO works only on RULE-pad.
// EXAMPLE: This MACRO creates the x-device 'Battery test' for device control
function BATTERY01() {
     // ======= singleton CONSTRUCTOR
    if (!VGET('$done'))
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

    if (TRIGCHANGED(_xhome))     // if attribute home changed, data cleanup
        ADDXDEVICE('ROMA', null, "Battery test", [{
                    code: 'home',
                    value: _xhome
                }, {
                    code: 'low level',
                    value: _lowPerc
                }
            ]),  VOICE("Aggiorno la lista dei device");

    // ====== SET or REFRESH status properties
    // in my devices I found only 2 properties for pecentages: 'battery_percentage', 'va_battery'..
    GETIDLIST(_xhome).forEach((devid) => {
        let _t1 = GET(devid, 'battery_percentage', false);
        if (_t1 == "none")
            _t1 = GET(devid, 'va_battery', false);
        // for more properties, duplicate previous 2 lines...
        if ((_t1 != "none") && (_t1 < _lowPerc))
            _lowD.push(GETATTRIBUTE(devid, 'name'));
        });
  // from _lowD to Battery test.status		
   SETXDEVICESTATUS("Battery test", "count", _lowD.length);
   _lowD.forEach((dev, pos) => {
    SETXDEVICESTATUS("Battery test", "low" + (pos + 1), dev)});
}
// end  BATTERY01 code

// =========== RULES for BATTERY01: use this in RULE-pad
// This is an example only, using 2 homes: ROMA, MILANO - you can customize it in RULE-pad

    /*
    BATTERY01();                //  MACRO call
	
    if (TRIGBYNAME("Batterie MILANO")) SETXDEVICESTATUS("Battery test", 'home', 'MILANO'),REFRESH(),VOICE("Batterie di Milano"), REFRESH('cloud');
	
    if (TRIGBYNAME("Batterie ROMA")) SETXDEVICESTATUS("Battery test", 'home', 'ROMA'),REFRESH(),VOICE("Batterie di Roma"),REFRESH('cloud');
     */

/*
// =============================  minified BATTERY01
//   Minified version of BATTERY01 for RULE-pad: 4 lines only!  (using Notepad++ + plugin JSTool).
//   On the RULE-pad you can cut long lines in many rows, and use 'continue' char (\) as last char for any row.

if(!VGET('$done'))VSET('$done',1),ADDXDEVICE('ROMA',null,"Battery test",[{code:'home',value:'ROMA'},{code:'low level',value:10}]);

var _xhome=GET("Battery test",'home');var _lowPerc=GET("Battery test",'low level');var _lowD=[];if(TRIGCHANGED(_xhome)) ADDXDEVICE('ROMA',null,"Battery test",[{code:'home',value:_xhome},{code:'low level',value:_lowPerc}]),VOICE("Aggiorno la lista dei device");

GETIDLIST(_xhome).forEach((devid)=>{let _t1=GET(devid,'battery_percentage',false);if(_t1=="none")_t1=GET(devid,'va_battery',false);if((_t1!="none")&&(_t1<_lowPerc))_lowD.push(GETATTRIBUTE(devid,'name'));});

SETXDEVICESTATUS("Battery test", "count", _lowD.length);_lowD.forEach((dev,pos)=>{SETXDEVICESTATUS("Battery test","low"+(pos+1),dev)});

// end minified
*/