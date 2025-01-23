/*
This file is part of IoTwebUI project (https://github.com/msillano/IoTwebUI)
Contains user data and options
------------------------------
License MIT
(C)2024 marco.sillano@gmail.com
per IOTwebUI version 2.2 10/08/2024
 */
 
// =====================  x-device CLONERO1
// This addon implements CLONER01() MACRO. This MACRO clones an existing Tuya device. 
// USE: When the "Query Devices in Home" API (used by IoTwebUI) is not enough, i.e. when you
// want to take advantage of the more complete "Query Properties" API, which can show more properties.
// Example: see document https://github.com/msillano/tuyaDAEMON/blob/main/devices/TY-08Z/TY_08Z_01.pdf
// The code is executed at any polling, to update device property values.
// NOTE: this is resources consuming device! So it is set in 'idle' status using 'standby' input (e.g. from applications)
// At startup it makes a device refresh, then sets standby to true 

// =====================  USE AS NEW MACRO
// 0) This file (updated) must be in the 'addons' directory of your IoTwebUI installation
// 1) Include THIS file in the main file ( IoTwebUI.html ) at the end, adding:
//       <script type="text/javascript" src="addons/cloner01.js"></script >
// 2-A) Copy the 'RULES for CLONER01' in the RULE-pad at run time (temporary)
// 2-B) Or copy the 'RULES for CLONER01' in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices
// You can use 'CLONER01( dev_id, xname [, room, home])' as new MACRO in RULE-pad.
// note: [, room, home] are optional, because default are defined in code (row 47). You can change the defaults.  

// =====================  USE AS NEW MACRO - ALTERNATIVE
// 1) Copy just 'CLONER01' function CODE (updated) in the 'CUSTOM USER MACROS' section of usrrulesXX.X.js file
// 2-A) Copy the 'RULES for CLONER01' in the RULE-pad at run time (temporary)
// 2-B) Or copy the 'RULES for CLONER01' in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices
// You can use 'CLONER01( dev_id, xname [, room, home])' as new MACRO in RULE-pad.
// note: [, room, home] are optional, because default are defined in code. You can change the defaults.  

// ==== end use instructions

// =================== CLONER01 CODE

// CUSTOM parameter. You can UPDATE the default params to meet your structure in the next line:

function CLONER01( dev_id, xname, room = "Test", home = 'ADMIN') {             // default params
    
// ====== Use callAPI() to get fresh data
 	let _clStatus =[{
						 code : "standby",
						 value: true
					 }
	];
	let first = !GETATTRIBUTE(xname, 'name', false);         // exists ?
	if (first){
	ADDXDEVICE(home, room, xname, _clStatus );
	}
	let device = getDeviceFromRef(xname) || null;
	if (first){
             device["clone"] = true;
             device["fromdevice"] = dev_id;
             device['details'] = [
            {
                from: {
                    type: "extra",
                    id: "Tuya\\nCloud"
                },
                action: "get schema",
            }, {
                action: "<I>loop</I>",
            }, {
                from: {
                    type: "xtap",
                    id: "CLONER ON"
                },
                action: "standby=false",
            },  {
                from: {
                    type: "xtap",
                    id: "CLONER OFF"
                },
                action: "standby=true",
			} ]; 
         }
 	let tuyaOK = GETATTRIBUTE(dev_id, 'online', false);
	let isIdle = !device || device.status.filter((attr) => attr.code == "standby")[0].value;
	if (first && !tuyaOK){
		 myMsgBox("CLONER01","WARNING: The Tuya device "+dev_id+" is offline.");
	}
//	 console.log("CLONER-1: isIdle:"+isIdle+" first:"+first);
    if (!first && tuyaOK){   //  device tuya online and not first ?
		 let asData = device.status.length > 1;
//		 console.log("CLONER-2 isIdle:"+isIdle+" asData:"+asData+" first:"+first);
		 if (!isIdle || !asData) {        // not idle OR no data
			   const api_url = "/v2.0/cloud/thing/"+dev_id+"/shadow/properties";
			   const x = callAPI('GET', api_url); 
//			   console.log(x);  // for debug only
		// ====== Format data for the device 'status' as [{code, value},...]
			   if (x) {
				   x.properties.forEach( (p) => {   
   						     SETXDEVICESTATUS(xname, p.code, p.value);
							 });		 
			   }
		 }
	}
	// ====== Create/refresh the x-device
 SETXDEVICEONLINE(xname, GETATTRIBUTE(dev_id, 'online', false) && !isIdle );  // set it online
}
// end  CLONER01 code


// =========== RULES for CLONER01: use this in RULE-pad
// This is an example only, use real values
// note: if you use CLONER01() many times, to buil many x-devices, take care to performances.

/*
  CLONER01("df123456xwyz876543xxww", "xtest");                //  MACRO call
*/

