/*
This file is part of IoTwebUI project (https://github.com/msillano/IoTwebUI)
Contains user data and options
------------------------------
License MIT
(C)2024 marco.sillano@gmail.com
per IOTwebUI version 2.2 10/08/2024
 */
// =====================  x-device CLASSIFY01
// This addon implements CLASSIFY01. This get a device list (all(default), only online, only offline) from one/all(default) HOMES.
// The code is executed only one time, at startup or after a change of device's velues: 'home', 'mode'
// note: CUSTOMIZATION: on the firt line you can set where put the new x-devoce. HOME/(ROOM)
// Calling parameter: device_name, target ROOM_name|All (null), and Mode: 'all'|'online'|'offline'

// =====================  USE AS NEW MACRO
// 0) This file (updated) must be in the 'addons' directory of your IoTwebUI installation
// 1) Include THIS file in the main file ( IoTwebUI.html ) at the end, adding:
//       <script type="text/javascript" src="addons/CLASSIFY01.js"></script >
// 2-A) Copy the 'RULES for CLASSIFY01' in the RULE-pad at run time (temporary)
// 2-B) Or copy the 'RULES for CLASSIFY01' in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices
// You can use 'CLASSIFY01(name, room, mode)' as new MACRO in RULE-pad !.

// =====================  USE AS NEW MACRO - ALTERNATIVE
// 1) Copy just 'CLASSIFY01' function CODE in the 'CUSTOM USER MACROS' section of usrrulesXX.X.js file
// 2-A) Copy the 'RULES for CLASSIFY01' in the RULE-pad at run time (temporary)
// 2-B) Or copy the 'RULES for CLASSIFY01' in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices
// You can use 'CLASSIFY01(name, room, mode)' as new MACRO in RULE-pad !.

// =====================  USE AS RULE (no MACRO)
// 1) Use the 'minified' version, as RULE (UPDATE the code if required!)
// 1-A) Copy the 'minified CLASSIFY01' + 'RULES for CLASSIFY01' (excluding MACRO call) in the RULE-pad at run time (temporary)
// 2-B) Copy the 'minified CLASSIFY01' + 'RULES for CLASSIFY01' (excluding MACRO call) in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices

// ==== end use instructions

// =================== CLASSIFY01 CODE
// WARNING: the TRIGBYNAME() MACRO works only on RULE-pad.
// EXAMPLE: This MACRO creates the x-device 'Device test' for device control

// CUSTOM parameter. All vars names starts with 'cl'.
var _clHome = 'ADMIN', _clRoom = "System";

function CLASSIFY01(_clName = "Device list", _clStartHome = null, _clStartMode = 'all' ) {             //  MACRO name

// ====== A_PHASE. singleton constructor: buids the x-device with default status
    if (!VGET('$cl0')) {
       VSET('$cl0', 1);
       ADDXDEVICE(_clHome, _clRoom, _clName, [{
                    code:  'home',
                    value: _clStartHome       // default start home
                  }, {
                    code:  'mode',  // all|online|offline
                    value: _clStartMode
                  }, {
                    code:  'count',
                    value:  0
                }] );
       console.log("cl_phase A - startup");
       }

// ====== METHOD: check a cleanup is triggered when the home/mode properties changes
    var _clXhome = GET(_clName, 'home'); // user can change home at runtime
    var _clXmode = GET(_clName, 'mode'); // user can change mode at runtime
    var _clDev = []; // temp device names array

    if (TRIGCHANGED(_clXhome + _clXmode)) {    // to use a single TRIGCHANGED()
   	      ADDXDEVICE(_clHome, _clRoom, _clName, [{
                    code: 'home',
                    value: _clXhome
                }, {
                    code:  'mode',  // all|online|offline
                    value: _clXmode
                }, {
                    code:  'count',
                    value:  0
                }] );
      SETXDEVICEONLINE(_clName, false);  // offline
      console.log("cl_phase A - update");
    	VOICE("Aggiorno la lista dei device");
		  }

// ========  B_PHASE  wait for 2 loops to coplete device processing
    if((TRIGEVERY(2) && GET(_clName, 'count', false) == 0)) {
      var _clAHomes = (_clXhome == null) ? GETHOMELIST():[_clXhome];
      _clAHomes.forEach ((xhome) => {
         GETIDLIST(xhome).forEach((devid) => {
           let online = GETATTRIBUTE(devid, 'online');
           if ( (_clXmode == 'all') || ((_clXmode == 'online') && online) || ((_clXmode == 'offline') && !online)){
    	   	   let device ={};
    	     	 device.name = GETATTRIBUTE(devid, 'name');
    		     device.category = GETATTRIBUTE(devid, 'category', false);
    		     device.is_a		= GETATTRIBUTE(devid, 'is-a', false);
    		     _clDev.push( device); };
        });}), console.log("cl_phase B - array done");
     }

// ========  C_PHASE: fills status properties
  function dynamicSort(properties) {    // local function
     return function(a, b) {
        for (let i = 0; i < properties.length; i++) {
            let prop = properties[i];
            if (a[prop] < b[prop]) return -1;
            if (a[prop] > b[prop]) return 1;
         }
         return 0;
       }
    }

if (ISTRIGGERH( _clDev.length > 0)){
    _clDev = _clDev.sort(dynamicSort(['category','name']));
    SETXDEVICESTATUS(_clName, "count", _clDev.length);
	  let _clC = ''; let i =1;
    _clDev.forEach((dev, pos) => {
	      if(_clC != dev.category){
           SETXDEVICESTATUS(_clName,  '<b>'+dev.category, dev.is_a +'</b>');
		       _clC = dev.category
	         }
        SETXDEVICESTATUS(_clName, '---- ' + i++, dev.name);
	      });
    console.log("cl_phase C - status ready");
    }

 // ====== D_PHASE: if done, set online and refresh
  if (ISTRIGGERH(_clDev.length > 0)) {
	    SETXDEVICEONLINE(_clName);  // done: online
		  console.log("** done classify01");
		  REFRESH('cloud');                 // to update tooltip asap
      VOICE("Device "+_clName+" aggiornato");
      };

} // end  CLASSIFY01 code

// =========== RULES for CLASSIFY01: use this in RULE-pad
// This is an example only, using 'ROMA' home - you can customize it in RULE-pad

/*
  CLASSIFY01("Device list", 'ROMA', 'online');                //  MACRO call

  if (TRIGBYNAME("ROMA all device")) SETXDEVICESTATUS("Device list", 'mode', 'all'), REFRESH(),VOICE("Tutti i device di Roma");

  if (TRIGBYNAME("ROMA offline")) SETXDEVICESTATUS("Device list", 'mode', 'offline'),REFRESH(),VOICE("Device offline di Roma");
*/

/*
// =============================  minified CLASSIFY01
//   Minified version of CLASSIFY01 for RULE-pad: 4 lines only!  (using Notepad++ + plugin JSTool).
//   On the RULE-pad you can cut long lines in many rows, and use 'continue' char (\) as last char for any row.

// not available

// end minified
*/
