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
    30/10/2024  bug: added set online
	
Ver 10.1 03/11/2024
per IOTwebUI version 2.2.2
    breaking vertsion: changed interface and defaults, refresh only on change, export CSV compatible.
*/

// =====================  x-device BATTERY01.1
// This addon implements a x-device, BATTERY01, to test device battery in many HOMES. Weak auto-discovery devices.
// - vers. BATTERY01.1 breaking update.
// - New calling PARAMETERS: now in RULES you MUST specify xname, startHome.
// - You CAN specify xroom = "Tools", xhome = 'ADMIN' (you can change the default values to suit your needs).
// - This allows the creation of multiple instances of BATTERY01.1, one per HOME, if necessary (e.g. to automate maintenance).
// - At runtime you can change the target HOME and min percentage value (defaultLow = 5), using RULEs. 
// - AnY change at runtime causes a data refresh.
// - Tooltip format changed, now it is CSV compatible, using ':' as field separator (the export more usefull).
// - In EXPERT mode, devices are identified by name and ID


// =====================  ADDON INSTALL: USE THIS AS EXTERNAL MACRO (preferred)
// 0) This file (updated) must be in the 'addons' directory of your IoTwebUI installation
// 1) Include THIS file in the main file ( IoTwebUI.html ) at the end, adding a line like:
//       <script type="text/javascript" src="addons/battery01.js"></script >
// 2-A) Copy the 'RULES for BATTERY01'  (updated) in the RULE-pad at run time (temporary) 
// 2-B) Or copy the 'RULES for BATTERY01'  (updated) in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices

// ======================  INSTALL ALTERNATIVE 1: USE AS USER MACRO (only code)
// 1) Copy just 'BATTERY01' function code in the 'CUSTOM USER MACROS' section of usrrulesXX.X.js file
// 2-A) Copy the 'RULES for BATTERY01' (updated) in the RULE-pad at run time (temporary) 
// 2-B) Or copy the 'RULES for BATTERY01' (updated) in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices

// =======================  INSTALL ALTERNATIVE 2: USE AS RULE (no MACRO)
// 1) Uses the 'minified' version, as RULE (UPDATE the code if required!).
// 1-A) Copy the 'RULES for BATTERY01' + 'minified BATTERY01' (updated - excluding the MACRO call) in the RULE-pad at run time (temporary) 
// 2-B) Copy the  'RULES for BATTERY01' + 'minified BATTERY01' (updated - excluding the MACRO call) in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices

// ==== end use instructions

// =================== BATTERY01 CODE
// 2 properties can be changed at run time by RULEs - see examples - updating automatically the device list:
// - 'home' (the target Tuya HOME name)
// - 'low lewel' (i.e. the %  low limit test value)
// CUSTOMIZATION: user can change defaults: - xroom = "tools" - xhome = 'ADMIN' and defaultLow = 5
// You can change also the VOICE messages (i.e. translating)

function BATTERY01(xname, startHome, xroom = "tools", xhome = 'ADMIN') {
   const defaultLow = 5;   // default low limit value
 // ---------------------- customization zone ends   
 
 // step0 ======= singleton CONSTRUCTOR at startup
   if (!GETATTRIBUTE(xname, "name", false)){
	         ADDXDEVICE(xhome, xroom, xname, [{
                    code: 'home',
                    value: startHome   
                }, {
                    code: 'low level',
                    value: defaultLow      // default low limit value
                }, {
                    code: 'count',
                    value: 'processing...'
				}
                
            ]);
//			return;
   }

    // step1 ====== GET some values, then tests for update. Flag is offline == false. 
    var _showHome = GET(xname, 'home'); // home can change at runtime
    var _lowPerc  = GET(xname, 'low level'); // low level can change at runtime
    var _lowD = []; // temp device names array

    if (TRIGCHANGED(_showHome + String(_lowPerc)+ !(categories)) && GETATTRIBUTE(xname, "online")){   
	// if the attribute home, expert mode, _lowPerc changed, data cleanup
           ADDXDEVICE(xhome, xroom, xname, [{
                    code: 'home',
                    value: _showHome
                }, {
                    code: 'low level',
                    value: _lowPerc
                }, {
                    code: 'count',
                    value: 'processing...'
                }
            ]);		// optional			
          	VOICE("Aggiorno la lista delle batterie"); // start action feedback
			return;  // slow, but required to allow a loop and show the device as offline 
	}

    // step2 ====== SET status properties (only if offline)
    // Test for properties: 'battery_percentage', 'va_battery', 'battery_state'..
    // if required add here more properties
	// 'offline' is used as visible feedback and as flag for updates.
	if (!GETATTRIBUTE(xname, "online")){
    GETIDLIST(_showHome).forEach((devid) => {
        let _t1 = GET(devid, 'battery_percentage', false);
        if (_t1 === null)
            _t1 = GET(devid, 'va_battery', false);
        //For more properties, duplicate the previous 2 lines...
        if (_t1 === null)
            _t1 = GET(devid, 'battery_state', false);
       if ((_t1 !== null) && ((_t1 < _lowPerc) || (_t1 == "low")))
            _lowD.push(GETATTRIBUTE(devid, 'name') + ((categories)? (': <i>'+devid +'</i>'):''));
        });
  // from _lowD to Battery test.status		
    SETXDEVICESTATUS(xname, "count", _lowD.length);
    _lowD.forEach((dev, pos) => {
		//  lowXX: device_name
        SETXDEVICESTATUS(xname, "low" + (pos + 1).toString().padStart(2,"0"), dev)});
    SETXDEVICEONLINE(xname);  // done: online
// optional	not required
//	VOICE("Lista delle batterie aggiornata")
	}
}
// end  BATTERY01 code

// =========== RULEs for BATTERY01:
//  This is an example only, using 2 homes: ROMA, MILANO - you must customize it.

    /*
        // Example (optional): ROULES to change the HOME (if more than one home)! Update where required!
		// note: the REFRESH() is for speedup the updates.
    if (TRIGBYNAME("Batterie MILANO")) SETXDEVICESTATUS("Battery test", 'home', 'MILANO'),REFRESH(),VOICE("Test delle batterie di Milano");
	
    if (TRIGBYNAME("Batterie ROMA")) SETXDEVICESTATUS("Battery test", 'home', 'ROMA'),REFRESH(),VOICE("Test delle batterie di Roma");

	   // Example (optional): ROULE to change low battery level! Update where required!
    if (TRIGBYNAME("SET minimo 10%")) SETXDEVICESTATUS("Battery test", 'low level', 10),REFRESH(),VOICE("Livello basso delle batterie aggionato");
	
	   // mandatory MACRO call, after any command RULEs 
    BATTERY01('Battery test','ROMA');                
     */

/*
// =============================  minified BATTERY01
//   Minified version of BATTERY01.1 for RULE-pad: 3 lines only!  (using Notepad++ + plugin JSTool).
//   On the RULE-pad you can cut long lines in many rows, and use 'continue' char (\) as last char for any row.
//   Only one instance! Or repeat the code changing _xname="Battery test". The first line contains CUSMIZABLE DEFAULT.

var _xname="Battery test",_startHome="ROMA",_xroom="tools",_xhome='ADMIN',_defaultLow=5; if(!GETATTRIBUTE(_xname,"name",false)){ADDXDEVICE(_xhome,_xroom,_xname,[{code:'home',value:_startHome},{code:'low level',value:_defaultLow},{code:'count',value:'processing...'}]);}

var _showHome=GET(_xname,'home');var _lowPerc=GET(_xname,'low level');var _lowD=[]; if(!GETATTRIBUTE(_xname,"online")){GETIDLIST(_showHome).forEach((devid)=>{let _t1=GET(devid,'battery_percentage',false);if(_t1===null)_t1=GET(devid,'va_battery',false);if(_t1===null)_t1=GET(devid,'battery_state',false);if((_t1!==null)&&((_t1<_lowPerc)||(_t1=="low")))_lowD.push(GETATTRIBUTE(devid,'name')+((categories)?(': <i>'+devid+'</i>'):''));});SETXDEVICESTATUS(_xname,"count",_lowD.length);_lowD.forEach((dev,pos)=>{SETXDEVICESTATUS(_xname,"low"+(pos+1).toString().padStart(2,"0"),dev)});SETXDEVICEONLINE(_xname);}

if(TRIGCHANGED(_showHome+String(_lowPerc)+!(categories))&&GETATTRIBUTE(_xname,"online")){ADDXDEVICE(_xhome,_xroom,_xname,[{code:'home',value:_showHome},{code:'low level',value:_lowPerc},{code:'count',value:'processing...'}]);VOICE("Aggiorno la lista delle batterie");}


// end minified
*/
