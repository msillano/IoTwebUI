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

// =====================  USE AS RULE (no MACRO)
// 1) Use the 'minified' version, as RULE (UPDATE the code if required!)
// 1-A) Copy the 'minified CLONER01' + 'RULES for CLONER01' (excluding MACRO call) in the RULE-pad at run time (temporary)
// 2-B) Copy the 'minified CLONER01' + 'RULES for CLONER01' (excluding MACRO call) in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices

// ==== end use instructions

// =================== CLONER01 CODE

// CUSTOM parameter. You can UPDATE the default params to meet your structure in the next line:

function CLONER01( dev_id, xname, room = "Test", home = 'ADMIN') {             // default params
    
// ====== Use callAPI() to get fresh data
       const api_url = "/v2.0/cloud/thing/"+dev_id+"/shadow/properties";
       const x = callAPI('GET', api_url); 
	   console.log(x);  // for debug only
// ====== Format data for the device 'status' as [{code, value},...]
	   let _clStatus =[];
	   x.properties.forEach( (p) => {   
	             let item ={
					 code : p.code,
					 value: p.value
				 };
        		 _clStatus.push( item); 
				 });
	   console.log(_clStatus);   // for debug only
// ====== Create/refresh the x-device
       ADDXDEVICE(home, room, xname, _clStatus );
	   SETXDEVICEONLINE(xname, true);  // set it online
  
}
// end  CLONER01 code


// =========== RULES for CLONER01: use this in RULE-pad
// This is an example only, use real values
// note: if you use CLONER01() many times, to buil many x-devices, take care to performances.

/*
  CLONER01("df123456xwyz876543xxww", "xtest");                //  MACRO call
*/

/*
// =============================  minified CLONER01
//   Minified version of CLONER01 for RULE-pad: 2 lines only!  (using Notepad++ + plugin JSTool).
//   On the RULE-pad you can cut long lines in many rows, and use 'continue' char (\) as last char for any row.
// You MUST update values to meet your structure in the next row:

var _cldev_id='xxxyyyzzz',_clxname='xtest',_clroom="Test",_clhome='ADMIN';const api_url="/v2.0/cloud/thing/"+_cldev_id+"/shadow/properties";var  _clx=callAPI('GET',api_url);

let _clStatus=[];_clx.properties.forEach((p)=>{let item={code:p.code,value:p.value};_clStatus.push(item);}); ADDXDEVICE(_clhome,_clroom,_clxname,_clStatus);SETXDEVICEONLINE(_clxname,true);


*/
