/*
This file is part of IoTwebUI project (https://github.com/msillano/IoTwebUI)
Contains user data and options
------------------------------
License MIT
(C)2024 marco.sillano@gmail.com
per IOTwebUI version 2.2 10/08/2024
 */
 
// =====================  x-device EXPLORE01
// This addon implements EXPLORE01() MACRO. This MACRO implements a x-device that allow access to your device information, calling some Tuya API, and produces some artifacts useful for AI.
// USE: With the collaboration of the UI explore01.html, we have a standalone documentation APP.
// Requres  IoTwebUI plus REST.

// =====================  USE AS NEW MACRO
// 0) This file (updated) must be in the 'addons' directory of your IoTwebUI installation
// 1) Include THIS file in the main file ( IoTwebUI.html ) at the end, adding:
//       <script type="text/javascript" src="addons/EXPLORE01.js"></script >
// You can use 'EXPLORE01( xname [, room, home])' as new MACRO in RULE-pad:
// 2-A) Copy the 'RULES for EXPLORE01' in the RULE-pad at run time (temporary)
// 2-B) Or copy the 'RULES for EXPLORE01' in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: you can update 'custom.js' to set icon and color for this x-devices
// note: [, room, home] are optional, because default are defined in code (row 31). You can change the defaults.  

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
  	   if ((!( odev && odev.id)) && (!stp.startsWith('list'))){     // list without device!
			   SETXDEVICESTATUS(xname, "action", "idle");
	           VOICE("Definire prima un device, verificare ID");
			   return;
		        }				   
       let tit ="<b>" + (odev?odev.name:'full') +" - "+stp+"</b><br><br>";
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
		   
		 case "listRead":
	  	     autoPopup("IoTwenUI & EXPLORE01", getListPageRDCSV(xname));
  	         SETXDEVICESTATUS(xname, "action", "idle");
	         break;		 
			 
 		 case "listWrite":
	  	     autoPopup("IoTwenUI & EXPLORE01", getListPageWRCSV(xname));
  	         SETXDEVICESTATUS(xname, "action", "idle");
	         break;		 
   	     
		 case "listFull":
	  	     autoPopup("IoTwenUI & EXPLORE01", getListPageFullCSV(xname));
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
   function getListPageHtML() {
        cols = 4;
        let d = 0;
        let txt = "<table width='100%' border=1><tr>";
        Object.keys(tuyaData).forEach((homeId) => {
            txt += "<td colspan = "+cols+" ><b>" + tuyaData[homeId].name + "</b></td></tr><tr>";
               
        for (const device of tuyaData[homeId].devices) {
 //               if (device.online == true) {
	                 txt += "<td width='" + Math.floor(100 / cols) + "%' ><b>" + (device["is-a"] || device.category)  + "</b></td>";
 
                    txt += "<td width='" + Math.floor(100 / cols) + "%' >" + ++d + ":" + device.name + "</td>";
					
                    txt += "<td width='" + Math.floor(100 / cols) + "%' >";
                    device.status.forEach((rec) => {
                        txt += rec.code + "<br>";
                    })
                    txt += "</td><td width='" + Math.floor(100 / cols) + "%' >";
                    device.status.forEach((rec) => {
                        txt += rec.value + "<br>";
                    })
                    txt += "</td></tr><tr>";
 //               }
            } // device loop

        }); // homes loop
        return txt;
        }

  function getListPageFullCSV(xname) {
        cols = 4;
        let d = 0;
        let txt = "</pre><pre id='exp'>\n**CSV TABLE - ALL DEVICE**\n\n";
        txt += "N, HOME, ROOM, TIPO, CATEGORIA, NOME, ATTRIBUTO, VALUE;\n";            
      	let i = 1;
		Object.keys(tuyaData).forEach((homeId) => {
              for (const device of tuyaData[homeId].devices) {
				 const idroom = tuyaData[homeId]['device_map'][device.id] || 0;
				 const xroom  = tuyaData[homeId]['rooms'].find((room) => room.room_id == idroom) ;
				 let dtipo = 'WiFi';
				 if (device.sub)
				      dtipo = "Zigbee or BLE";
				 else if (device.category == "x-dev")
				      dtipo = "x-device";
				 else if (device.id.startsWith('vdev'))
				      dtipo = "virtual";
				 
	            device.status.forEach((rec) => {
                  txt += i++ + ", " + tuyaData[homeId].name + ", "+ (xroom?xroom.name:'none') + ", "+  dtipo + ", "+ (device["is-a"] || device.category) + ", "+ device.name + ", "+ rec.code?.replace('<','&lt;') +  ", "+ rec.value?.toString().replace('<','&lt;') +";\n";
                      })
  
            } // device loop
			
        }); // homes loop
		
		   return txt + "\n\n// by explore01 addon: 'IoTwebUI."+xname+".action(listFull)' "+(new Date().toLocaleString('it-IT')) +"\n</pre>" + "<br><button onclick=\"d=document,a=d.createElement('a'),	 a.href='data:text/plain;base64,'+btoa(unescape(encodeURIComponent(d.getElementById('exp').textContent))),a.download='all-devices-'+Date.now()+'.txt', a.click()\">download</button><pre>";
        }



    function getListPageRDCSV(xname) {
        cols = 4;
        let d = 0;
        let txt = "</pre><pre id='exp'>\n**CSV TABLE - DEVICE for GetTuyaValue TOOL** \n\n";
        txt += "N, HOME, ROOM, TIPO,  CATEGORIA, NOME\n";            
  		let i = 1;
     
		Object.keys(tuyaData).forEach((homeId) => {
             for (const device of tuyaData[homeId].devices) {
				 const idroom = tuyaData[homeId]['device_map'][device.id] || 0;
				 const xroom  = tuyaData[homeId]['rooms'].find((room) => room.room_id == idroom) ;
				 let dtipo = 'WiFi';
				 if (device.sub)
				      dtipo = "Zigbee or BLE";
				 else if (device.category == "x-dev")
				      dtipo = "x-device";
				 else if (device.id.startsWith('vdev'))
				      dtipo = "virtual";
            
                txt += i++ + ", " + tuyaData[homeId].name + ", "+ (xroom?xroom.name:'none') + ", "+  dtipo + ", "+ (device["is-a"] || device.category) + ", "+ device.name + ";\n";
             } // device loop
        }); // homes loop
	// footer	
  	    return txt + "\n\n// by explore01 addon: 'IoTwebUI."+xname+".action(listRead)' "+(new Date().toLocaleString('it-IT')) +"\n</pre>" + "<br><button onclick=\"d=document,a=d.createElement('a'),	 a.href='data:text/plain;base64,'+btoa(unescape(encodeURIComponent(d.getElementById('exp').textContent))),a.download='get-devices-'+Date.now()+'.txt', a.click()\">download</button><pre>";
        }

   function getListPageWRCSV(xname) {
        cols = 4;
        let d = 0;
        let txt = "</pre><pre id='exp'>\n**CSV TABLE - DEVICE for SetTuyaValue TOOL** \n\n";
        txt += "N, HOME, ROOM, TIPO,  NOME,  ATTRIBUTO;\n"; 
        let i=1;		
        Object.keys(tuyaData).forEach((homeId) => {
             for (const device of tuyaData[homeId].devices) {
				 const idroom = tuyaData[homeId]['device_map'][device.id] || 0;
				 const xroom  = tuyaData[homeId]['rooms'].find((room) => room.room_id == idroom) ;
				 let dtipo = 'WiFi';
				 if (device.sub)
				      dtipo = "Zigbee or BLE";
				 else if (device.category == "x-dev")
				      dtipo = "x-device";
				 else if (device.id.startsWith('vdev'))
				      dtipo = "virtual";
				 
			    if (dtipo == "x-device"){
	              device.status.forEach((rec) => {
                    txt += i++ + ", " + tuyaData[homeId].name + ", "+ (xroom?xroom.name:'none') + ", "+  dtipo + ", "+ device.name + ", "+ rec.code?.replace('<','&lt;') + ";\n";
                      })
				} //  x-device
             } // device loop
        }); // homes loop
		// footer
   	   return txt + "\n\n// by explore01 addon: 'IoTwebUI."+xname+".action(listWrite)' "+(new Date().toLocaleString('it-IT')) +"\n</pre>" + "<br><button onclick=\"d=document,a=d.createElement('a'),	 a.href='data:text/plain;base64,'+btoa(unescape(encodeURIComponent(d.getElementById('exp').textContent))),a.download='set-devices-'+Date.now()+'.txt', a.click()\">download</button><pre>";
        }

// end  EXPLORE01 code


// =========== RULES for EXPLORE01: use this in RULE-pad
// This is an example only, use real values
// note: if you use EXPLORE01() many times, to buil many x-devices, take care to performances.

/*
  EXPLORE01("Explore devices");                //  MACRO call
*/

