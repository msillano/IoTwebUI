/*
This file is part of IoTwebUI project (https://github.com/msillano/IoTwebUI)
Contains user data and updatable options
------------------------------
License MIT
(C)2024 marco.sillano@gmail.com
ver 1.0 07/12/2024
for IOTwebUI version 2.2.2
 */

// =====================  x-device LOGIC_ANALYZER01.1
// This addon implements a x-device, LOGIC_ANALYZER01, a SW cronothermostat for Tuya+IoTwebUI
// see https://github.com/msillano/IoTwebUI/tree/main/APP/Thermostat

// =====================  ADDON INSTALL: USE THIS AS EXTERNAL MACRO
// 0) This file (updated) must be in the 'addons' directory of your IoTwebUI installation
// 1) Include THIS file in the main file ( IoTwebUI.html ) at the end, adding a line like:
//       <script type="text/javascript" src="addons/thermostat01.js"></script >
// 2-A) Copy the 'RULES for LOGIC_ANALYZER01'   in the RULE-pad at run time (temporary)
// 2-B) Or copy the 'RULES for LOGIC_ANALYZER01' in the 'var usrrules' in the usrrulesXX.X.js file (better - permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices
// ======= install howto ends

// =================== LOGIC_ANALYZER01 CODE === USER CONFIGURATION
// Parameters: defaults - xname = "WEB Thermostat", xroom = "Test", xhome = 'ADMIN'
// IMPORTANT: in SmartLife APP the home "AMIN" and the room "Test" MUST exist.
// Or calling it in ROULE you can change:  LOGIC_ANALYZER01([my_name[, my_room [, my_home]]]), use null for no-room, no-home.
// CUSTOMIZATION: some local values and user options see down, until "USER CONFIG  ENDS"

function LOGIC_ANALYZER01(xname = "Lanalyzer", xroom = "Test", xhome = 'ADMIN') {
    // HERE the Tuya user name of the your 'virtual device':
  
   // ====== A_PHASE. startup: singleton constructor: buids the x-device with default status
    //    console.log("scene_phase A - startup");
    if (!GETATTRIBUTE(xname, "name", false)) {
        ADDXDEVICE(xhome, xroom, xname, [{
                    code: 'home',
                    value: null // default
                }, {
                    code: 'action',
                    value: "idle"
                }
            ]);
       sleep(20);  // better after ADDXDEVICE	
	   
        // ====================  EXTRA METADATA 
        //  device.details: [
        //                { from: { type: "type",
        //                            id: "name"},
        //                    to: { type: "type",
        //                            id: "name"},
        //                action: "label"
        // 		    	  }, ...];
        // from, to: optional, if missed are replaced by this x-device
        // type: one of device,auto,tap,extra,xdevice,xauto,xtap,xextra
        // id: name of a node: if not exists it is cteated
        // for details see https://github.com/msillano/IoTwebUI/blob/main/APP/Scene/LEGGIMI.md#grapho-di-x-device
 
        let xdev = getDeviceFromRef(xname);
        xdev['details'] = [{
                from: {
                    type: "extra",
                    id: "IoTwebUI\\ntuyaData"
                },
                action: "get",
            },  {
                to: {
                    type: "xextra",
                    id: "SVG graph"
                },
                action: "popup",
            },  {
                action: "<I>data-driven</I>",
            },
        ];

// test
    autoPopup("IoTwenUI & LOGIC_ANALYZER01", getSelectPage());
   
	}   // startup ends
  
// pège selection
functio getSelectPage(){
let txt = "";
  cols = 3;
  let d = 0;
    let txt = "<table width='100%' border=1><tr>"
	 Object.keys(tuyaData).forEach((homeId) => {
		 txt += "<td colspan = 3 ><b>" + tuyaData[homeID].nome + "</b></td></tr><tr>";
		 for (const device of tuyaData[homeId].devices){
                if (device.online == true) {
				txt += "<td width='" + Math.floor(100 / cols) + "%' >" + ++d +":"+ device.name +"</td>";
				txt += "<td width='" + Math.floor(100 / cols) + "%' >";
				device.status.forEach((rec) => {
                     txt +=  status[rec.code] + "br";
				     })
				txt += "</td><td width='" + Math.floor(100 / cols) + "%' >";
			    device.status.forEach((rec) => {
                     txt +=  "BUTTON for " + status[rec.code] + "br";
				     })
	            txt += "</td></tr><tr>";
					}
         }				
		 
		 
    
     }	
	
	
 return  txt;
}	
  
  
  
  
  
  
    return;
}
// end  LOGIC_ANALYZER01 code

// =========== RULEs for LOGIC_ANALYZER01:
// 2-A) Copy this 'RULES for LOGIC_ANALYZER01'   in the RULE-pad at run time (temporary)
// 2-B) Or copy this 'RULES for LOGIC_ANALYZER01' in the 'var usrrules' in the usrrulesXX.X.js file (better - permanent).
/*
LOGIC_ANALYZER01();  // runs this every loop, uses default values - see line 29 - required

//   note: the Tuya 'tap-to-run' "HOTTURNON", "HOTTURNOFF", etc.  MUST EXIST !
//   rules for HOT on/off - optional (driveOn, driveOff)
if(GET("WEB Thermostat","HOTout", false)) SCENE("HOTTURNON");
if(GET("WEB Thermostat","HOTout", false)) SCENE("HOTTURNOFF");

//   rules for COLD on/off - optional
if(GET("WEB Thermostat","COLDout", false)) SCENE("COLDTURNON");
if(GET("WEB Thermostat","COLDout", false)) SCENE("COLDTURNOFF");

*/
