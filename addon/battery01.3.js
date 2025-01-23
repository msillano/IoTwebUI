/*
This file is part of IoTwebUI project (https://github.com/msillano/IoTwebUI)
Contains user data and options
------------------------------
License MIT
(C)2024 marco.sillano@gmail.com
ver 01.0 20/08/2024
per IOTwebUI version 2.2 10/08/2024
    28/10/2024  bug: modified _t1 test (rows 77, 80)
    29/10/2024  added test for battery_state: high/medium/low
    30/10/2024  bug: added set online
	
Ver 01.1 03/11/2024
per IOTwebUI version 2.2.2
    breaking vertsion: changed interface and defaults, refresh only on change, export CSV compatible.
	
Ver 01.3 15/1/2025
per IOTwebUI version 3.0
    Extra data for APP Explore sccene (graph)
    Panel intefrace
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

// ==== end use instructions

// =================== BATTERY01 CODE
// 2 properties can be changed at run time by RULEs - see examples - updating automatically the device list:
// - 'home' (the target Tuya HOME name)
// - 'low level' (i.e. the %  low limit test value)
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
			
// ====================  EXTRA METADATA for 'Explore scene'
// (optional) adds 'details' to the x-object
// run only one time, at startup!
// for details see https://github.com/msillano/IoTwebUI/blob/main/APP/Scene/LEGGIMI.md#grapho-di-x-device
//    a) init
        let xdev = getDeviceFromRef(xname);
        xdev['details'] = [
 //  a) here   input data (like conditions)
 	   	    {from:{ type:"xtap",
		    id: "eg level x (%, optional)"},
		      action:"level = x",
	        },    
 			{ from:{type:"xtap",
			id: "eg check Xxxx (optional)"},
			  action:"home=Xxxx",
		   },
  		   {from:{ type:"extra",
		   id: "IoTwebUI\\mode"},
		      action: "get Expert mode",
		   },    
//   b)here output data, result (like actions)
  	       {to:{ type:"extra",
			     id: "tooltip\\nbattey01"},
		   action:"result",
		   },   
//   c) here more edges and nodes, also external
 	       {
		   action:"<I>data-driven</I>",
		   },	   
          ]; // details ends
// dummy, but required because in the 'else' section!		
     TRIGCHANGED(_showHome + String(_lowPerc)+ !(categories)) && GETATTRIBUTE(xname, "online"); 
	// ====================  EXTRA METADATA ends
	 return;
   } 

    // step1 ====== GET some values, then tests for update. Flag is offline == false. 
    var _showHome = GET(xname, 'home'); // home can change at runtime
    var _lowPerc  = GET(xname, 'low level'); // low level can change at runtime
    var _lowD = []; // temp device names array

    if (TRIGCHANGED(_showHome + String(_lowPerc)+ !(categories)) && GETATTRIBUTE(xname, "online")){  
	// test BAD user home
        if ( GETIDLIST(_showHome).length == 0){
/* 118n*/			
			 if(IoTlang == "IT"){			
				myMsgBox("Battery01.3","Nessun device trovato in "+ _showHome);
			 }
			 else if(IoTlang == "EN"){			
				myMsgBox("Battery01.3","Not found devices in "+ _showHome);
			    } else  // default = EN
					myMsgBox("Battery01.3","Not found devices in "+ _showHome);
			
		     SETXDEVICESTATUS(xname, "home", startHome);
			 SETXDEVICEONLINE(xname, false);
             return;
		   }
 	
		
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
         REFRESH(xname);  // required to refresh ASAP user interface off
         REFRESH();       // starts fast process
		 return; 
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
    _lowD.forEach((dev, pos) => {      //  lowXX: device_name
        SETXDEVICESTATUS(xname, "low" + (pos + 1).toString().padStart(2,"0"), dev)});
    SETXDEVICEONLINE(xname);  // done: online
/* I18n */
    if(IoTlang == "IT")
	   VOICE("Lista device con batterie scariche aggiornata")
    else if(IoTlang == "EN")
	   VOICE("List of devices with low batteries updated")
    else   // default = EN
 	   VOICE("List of devices with low batteries updated")
	 
   REFRESH(xname);  // required to refresh ASAP user interface (else nest TuyaLoop).
 	}
}
// end  BATTERY01 code

// =========== RULEs for BATTERY01:
//  This is an example only, using 2 homes: ROMA, MILANO - you must customize it.

    /*
     // Examples (optional): ROULES to change the HOME (if more than one home)! Update if required!
	 // note: Some audio feedback is usefull.
    if (TRIGBYNAME("Batterie MILANO")) SETXDEVICESTATUS("Batteries	test", 'home', 'MILANO'), VOICE("Test delle batterie di Milano");
	
    if (TRIGBYNAME("Batterie ROMA")) SOUND("click-104721.mp3"), SETXDEVICESTATUS("Batteries test", 'home', 'ROMA');

    // Example (optional): ROULE to change low battery level! Update where required!
    if (TRIGBYNAME("SET minimo 10%")) SETXDEVICESTATUS("Batteries test", 'low level', 10),REFRESH(),VOICE("Livello basso delle batterie aggionato");
	
    // mandatory MACRO call, after any command RULEs 
    BATTERY01('Batteries test','ROMA');                
     */

