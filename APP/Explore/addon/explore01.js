/*
This file is part of IoTwebUI project (https://github.com/msillano/IoTwebUI)
Contains user data and options
------------------------------
License MIT
(C)2024 marco.sillano@gmail.com
per IOTwebUI version 2.2 10/08/2024
 */
 
// =====================  x-device EXPLORE01
// This addon implements EXPLORE01() MACRO. This MACRO implements a x-device that allow access to your device information, calling some Tuya API.
// USE: With the collaboration of the UI explore01.html, we have a standalone documentation APP.
// Requres  IoTwebUI plus REST.

// =====================  USE AS NEW MACRO
// 0) This file (updated) must be in the 'addons' directory of your IoTwebUI installation
// 1) Include THIS file in the main file ( IoTwebUI.html ) at the end, adding:
//       <script type="text/javascript" src="addons/EXPLORE01.js"></script >
// You can use 'EXPLORE01( xname [, room, home])' as new MACRO in RULE-pad:
// 2-A) Copy the 'RULES for EXPLORE01' in the RULE-pad at run time (temporary)
// 2-B) Or copy the 'RULES for EXPLORE01' in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices
// note: [, room, home] are optional, because default are defined in code (row 44). You can change the defaults.  

// =====================  USE AS NEW MACRO - ALTERNATIVE
// 1) Copy just 'EXPLORE01' function CODE (updated) in the 'CUSTOM USER MACROS' section of usrrulesXX.X.js file
// You can use 'EXPLORE01( xname [, room, home])' as new MACRO in RULE-pad:
// 2-A) Copy the 'RULES for EXPLORE01' in the RULE-pad at run time (temporary)
// 2-B) Or copy the 'RULES for EXPLORE01' in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices
// note: [, room, home] are optional, because default are defined in code. You can change the defaults.  

// ==== end use instructions

// =================== EXPLORE01 CODE

// CUSTOM parameter. You can UPDATE the default params to meet your structure in the next line:

function EXPLORE01( xname, room = "tools", home = 'ADMIN') {             // default params

// ====== A_PHASE. singleton constructor: buids the x-device with default status
    if (!GETATTRIBUTE(xname, "name", false)) {
        ADDXDEVICE(home, room, xname, [{
                    code:  'device',
                    value: "---"       // default 
                  }, {
                    code:  'action',
                    value:  "idle"
                }] );
 //      console.log("exp_phase A - startup");
	   SETXDEVICEONLINE(xname);
       }

 // ====== A_PHASE. GET some values, then tests for update. Flag is action != idle. 
	   let stp = GET(xname, "action", false);
       if (stp == 'idle') return;            // nothing to do

// test valid ID
       let idx = GET(xname, "device", false);
//	   console.log("EXPLORE01", idx, stp);
	   let odev = getDeviceFromRef(idx);
  	   if (!( odev && odev.id)){
			    SETXDEVICESTATUS(xname, "action", "idle");
	            throw "Device not found - verify ID";
		        }				   
       let tit ="<b>" +odev.name +" - "+stp+"</b><br><br>";
	   switch(stp)  {
		case "iot":
		   autoPopup(odev.name +" "+stp, tit+ JSON.stringify(odev, undefined, 2));
//		   console.log("EXPLORE01.IoT", odev);
		   SETXDEVICESTATUS(xname, "action", "idle");
		   break;
		case "info":
		   if (odev.id.startsWith("x-")) {
			   autoPopup(odev.name +" "+stp, tit+ JSON.stringify(odev, undefined, 2));
		   }else {
			   const api_url = "/v2.0/cloud/thing/"+odev.id;
			   const x = callAPI('GET', api_url); 
//			   console.log("EXPLORE01.schema", x);
			   autoPopup(odev.name +" "+stp, tit+  JSON.stringify(x, undefined, 2));
			   }
		   SETXDEVICESTATUS(xname, "action", "idle");
		   break;
		case "schema":
		   if (odev.id.startsWith("x-")) {
			   autoPopup(odev.name +" "+stp, tit+ JSON.stringify(odev.status, undefined, 2));
		   }else {
			   const api_url = "/v2.0/cloud/thing/"+odev.id+"/shadow/properties";
			   const x = callAPI('GET', api_url); 
//			   console.log("EXPLORE01.schema", x);
			   autoPopup(odev.name +" "+stp, tit+  JSON.stringify(x, undefined, 2));
			   }
		   SETXDEVICESTATUS(xname, "action", "idle");
		   break;
		case "model":
		   if (odev.id.startsWith("x-")) {
			   autoPopup(odev.name +" "+stp, tit+ JSON.stringify(odev.status, undefined, 2));
		   }else {
			   const api_url = "/v2.0/cloud/thing/"+odev.id+"/model";
               let x = callAPI('GET', api_url).model;
               let b = x.replace('\\"', '"');	
               x = JSON.parse(b);			   
			   console.log("EXPLORE01.model", x);
			   autoPopup(odev.name +" "+stp, tit+  JSON.stringify(x, undefined, 2));
			   }
		   SETXDEVICESTATUS(xname, "action", "idle");
		   break;
	     case "standard":
		   if (odev.id.startsWith("x-")) {
			   autoPopup(odev.name +" "+stp, tit+ JSON.stringify(odev.status, undefined, 2));
		   }else {
//			   const api_url = "/v2.0/cloud/thing/"+idx+"/model";
	           const api_url = "/v1.0/iot-03/devices/"+odev.id+"/specification";
			   let x = callAPI('GET', api_url);
			   console.log("EXPLORE01.standard", x);
			   autoPopup(odev.name +" "+stp, tit+  JSON.stringify(x, undefined, 2));
			   }
		   SETXDEVICESTATUS(xname, "action", "idle");
		   break;
		 default: return;
	     }
}

// end  EXPLORE01 code


// =========== RULES for EXPLORE01: use this in RULE-pad
// This is an example only, use real values
// note: if you use EXPLORE01() many times, to buil many x-devices, take care to performances.

/*
  EXPLORE01("Explore");                //  MACRO call
*/

