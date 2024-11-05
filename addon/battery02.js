/*
This file is part of IoTwebUI project (https://github.com/msillano/IoTwebUI)
------------------------------
License MIT
(C)2024 marco.sillano@gmail.com
per IOTwebUI version 2.2 10/08/2024
  28/10/2024 bug: changed _t1 test (row 68).
  30/10/2024 bug: changed _t1 test, added == test, so it works also with 'low' (row 68).
  30/10/2024  bug: added set online

Ver 20.1 03/11/2024
per IOTwebUI version 2.2.2
   changed defaults, refresh at long interval, export CSV compatible.

*/
// =====================  x-device BATTERY02
// This addon implements a x-device, BATTERY02,  to do a detailed test of the device's batteries in a HOME. no auto-discovery.
// The advantage are:
//    - fine tuning of condition on single device basis.
//    - Total battery requred, sorted by battery type.
//    - Absence of false positives
// Disadvantages:
//    - USER MUST create/update 2 arrays: battery data and device data. The 'min' value can be set on a device/code basis.
//    - The other options also need to be updated in the code: this x-device only takes care of one default home!
//    - OPTIONS: var xname = "ROMA test batterie", xroom = "tools", xhome = 'ADMIN', _b2startHome = "ROMA", //    - Multiple homes require multiple instances of the code (with different names!)
_b2loops = 100
//     - Auto-refresh data every _b2loops loop. 
//      - At runtime you can force the refresh putting 'offline' the device, using RULEs: SETXDEVICEONLINE("xxxx", false). 

// =====================  USE AS NEW MACRO 
// 0) This file is in 'addons' directory of your IoTwebUI installation
// 1) Include THIS file in the main file ( IoTwebUI.html ) at the end, adding:
//       <script type="text/javascript" src="addons/battery02.js"></script >
// 2) optional: update 'custom.js' to set icon and color for this x-devices
// Now you can use BATTERY02() as new MACRO in RULE-pad !.

// ======================  USE AS NEW MACRO - ALTERNATIVE
// 1) Copy just 'BATTERY02' function code in the 'CUSTOM USER MACROS' section of usrrulesXX.X.js file
// 2) optional: update 'custom.js' to set icon and color for this x-devices
// You can use BATTERY02() as new MACRO in RULE-pad !.

// note: Large updates to the data are needed. The 'minified' version is not appropriate in this case.
// ==== end use instructions

// =================== BATTERY02 CODE
// EXAMPLE: This creates the x-device 'ROMA test batterie' for device batteries control
function BATTERY02(xname = "ROMA test batterie", xroom = "tools", xhome = 'ADMIN') {
// ================ start USER UPDATE	
// note: this x-device requires a lot of user data about the devices in the target Tuya home.
// So it is not allowed to change target home at runtime: all options are defined as defaults or in the next line:
    var  _b2startHome = "ROMA", _b2loops = 100;
	
	// USER UPDATE HERE with used batteries: (powID is the array index)
    var _power = [ 
           {name: "unknown", count:0},        //  powID:0
	       {name: "alcalina_AA", count:0},    //  powID:1
	       {name: "alcalina_AAA", count:0},   //  powID:2
	       {name: "alcalina_9V", count:0},    //  powID:3
		   {name: "Ni-MH_AA", count:0},       //  powID:4
		   {name: "Ni-MH_AAA", count:0},      //  powID:5
		   {name: "litio_cr2032", count:0},   //  powID:6
		   {name: "litio_cr123A", count:0},   //  powID:7
		  
	  ];
    var _dl =[];
    var _devices = [
	// dettaglio di tutti i dispositivi a batteria sotto controllo
	// USER MUST update this with all battery device:( here some example lines)
    // record:	[device.id, status.code, min%|'low', powID, number of batteries, 0-flag]
	 		  
              ["0420812xxxxxxxxxxxxxxx", "battery_state",     'low', 5, 1, 0], 
              ["bfbd7adxxxxxxxxxxxxxxx", "battery_percentage",   10, 1, 2, 0], 
               
              ];
			  
// ================ USER UPDATE ends	
 
 // ====  builds or clear device at any run - AGGIORNARE x-device: home, room|null, name!
      if(TRIGEVERY(_b2loops) || !GETATTRIBUTE(xname, "online", false)) 
		    ADDXDEVICE(xhome, xroom, xname, [{
                    code: 'home',
                    value: _b2startHome   // actual home 
                } ]);
// non è prevista la modifica di home al runtime perchè dovrebbe variare di conseguenza anche  _devices[] 
	// ==========  data collection		
      if (!GETATTRIBUTE(xname, "online", false)){
        	_devices.forEach((dev, pos) => {
 			let _t1 = GET(dev[0], dev[1], false);
			if ((_t1 !== null) && ((_t1 < dev[2])||(_t1 == dev[2]))){
				dev[5] = 1;
				_power[dev[3]].count += dev[4];
				_dl.push(GETATTRIBUTE(dev[0], 'name'));
		    } });

    // ========= formatting and status update       
		 SETXDEVICESTATUS(xname, "tested", _devices.length);
		 SETXDEVICESTATUS(xname, "low", _dl.length);
		 _dl.forEach((dev, pos) => {
                 SETXDEVICESTATUS(xname, "low" + (pos + 1), dev)});
         SETXDEVICESTATUS(xname, "<b>batteries","</b>");
         _power.forEach((pila) => {
	        	 if (pila.count > 0) SETXDEVICESTATUS(xname, "<i>"+pila.name, "</i>"+pila.count)});
	     SETXDEVICEONLINE(xname);  // done: online
		 VOICE("Lista delle batterie aggiornata");
	   }
  }

// end  BATTERY02 code

// =========== RULES for BATTERY02: use this in RULE-pad

    /*
    BATTERY02();                //  MACRO call
	  // nothing to do at runtime
    */

