/*
This file is part of IoTwebUI project (https://github.com/msillano/IoTwebUI)
------------------------------
License MIT
(C)2024 marco.sillano@gmail.com
per IOTwebUI version 2.2 10/08/2024
  28/10/2024 bug: changed _t1 test (row 68).
  30/10/2024 bug: changed _t1 test, added == test, so it works also with 'low' (row 68).

 TODO:
 1. Change the function interface (see cloner01()) for easier use. 
*/
// =====================  x-device BATTERY02
// This addon implements a x-device, BATTERY02, to do a detaild test of device battery in a HOME. no auto-discovery.
// USER MUST update 2 arrays: battery data and device data. The 'min' value can be set on device / code basis.

// =====================  USE AS NEW MACRO 
// 0) This file is in 'addons' directory of your IoTwebUI installation
// 1) Include THIS file in the main file ( IoTwebUI.html ) at the end, adding:
//       <script type="text/javascript" src="addons/battery02.js"></script >
// 2) optional: update 'custom.js' to set icon and color for this x-devices
// You can use BATTERY02() as new MACRO in RULE-pad !.

// ======================  USE AS NEW MACRO - ALTERNATIVE
// 1) Copy just 'BATTERY02' function code in the 'CUSTOM USER MACROS' section of usrrulesXX.X.js file
// 2) optional: update 'custom.js' to set icon and color for this x-devices
// You can use BATTERY02() as new MACRO in RULE-pad !.

// =======================  USE AS RULE (no MACRO)
// 1) Use the 'minified' version, as RULE (you must UPDATE the code and make your minified version!)
// 1-A) Copy the 'minified BATTERY02' in the RULE-pad at run time (temporary) 
// 2-B) Copy the 'minified BATTERY02' in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices
// ==== end use instructions

// =================== BATTERY02 CODE
// WARNING: the TRIGBYNAME() MACRO works only on RULE-pad.
// EXAMPLE: This creates the x-device 'ROMA power' for device control
function BATTERY02() {
	// USER UPDATE HERE with used batteries:
    var _power = [ {name: "alcalina_AA", count:0},    //  powID:0
	           {name: "alcalina_AAA", count:0},   //  powID:1
		   {name: "Ni-MH_AA", count:0},       //  powID:2
		   {name: "Ni-MH_AAA", count:0},      //  powID:3
		   {name: "litio_cr2032", count:0},   //  powID:4
		   {name: "litio_cr123A", count:0},   //  powID:5
	  ];
	var _dl =[];
    var _devices = [
	// dettaglio di tutti i dispositivi a batteria sotto controllo
	// USER Update this with all battery device
        // record:	[id, status.code, min%|'low', powID, number, 0-flag]
	      ["42027807d8bfxxxxxxxx", "BatteryStatus", 2, 2, 2, 0], 
              ["bfbd7ad42xxxxxxxx", "battery_percentage", 10, 1, 2, 0], 
              ["bf542e7c6xxxxxxxx", "va_battery", 2, 4, 1, 0], 
              ["bfcd95a6xxxxxxxx", "va_battery", 2, 4, 1, 0], 
              ["bf3445cexxxxxxxx", "battery_percentage", 10, 1, 2, 0], 
              ];
 
 // ====  builds or clear device at any run
         ADDXDEVICE('ROMA', null, "ROMA power", [{
                    code: 'home',
                    value: 'ROMA'   // actual home (RO)
                } ]);
// non è prevista la modifica di home al runtime perchè dovrebbe variare di conseguenza anche  _devices[] 
	// ==========  data collection		
		_devices.forEach((dev, pos) => {
 			let _t1 = GET(dev[0], dev[1], false);
			if ((_t1 !== null) && ((_t1 < dev[2])||(_t1 == dev[2]))){
				dev[5] = 1;
				_power[dev[3]].count += dev[4];
				_dl.push(GETATTRIBUTE(dev[0], 'name'));
		    } });

    // ========= formatting and status update       
		 SETXDEVICESTATUS("ROMA power", "count", _dl.length);
		 _dl.forEach((dev, pos) => {
                 SETXDEVICESTATUS("ROMA power", "low" + (pos + 1), dev)});
         _power.forEach((pila) => {
	        	 if (pila.count > 0) SETXDEVICESTATUS("ROMA power", pila.name, pila.count)});
  }

// end  BATTERY02 code

// =========== RULES for BATTERY02: use this in RULE-pad

    /*
    BATTERY02();                //  MACRO call
	  // nothing to do at runtime
    */

/*
// =============================  minified BATTERY02
//   Minified version of BATTERY01 for RULE-pad: 4 lines only!  (using Notepad++ + plugin JSTool).
//   On the RULE-pad you can cut long lines in many rows, and use 'continue' char (\) as last char for any row.

var _power=[{name:"alcalina_AA",count:0},{name:"alcalina_AAA",count:0},{name:"Ni-MH_AA",count:0},{name:"Ni-MH_AAA",count:0},{name:"litio_cr2032",count:0},{name:"litio_cr123A",count:0},];

var _dl=[];var _devices=[["4202xxxxxx","BatteryStatus",2,2,2,0],["bfbxxxxxxxx",","battery_percentage",10,1,2,0],["bf542xxxxxxx",","va_battery",2,4,1,0],["bfcd9xxxxxxx",","va_battery",2,4,1,0],["bf3445xxxxxxx",","battery_percentage",10,1,2,0],];

ADDXDEVICE('ROMA',null,"ROMA power",[{code:'home',value:'ROMA'}]);_devices.forEach((dev,pos)=>{let _t1=GET(dev[0],dev[1],false);if((_t1!==null)&&((_t1<dev[2])||(_t1 == dev[2]))){dev[5]=1;_power[dev[3]].count+=dev[4];_dl.push(GETATTRIBUTE(dev[0],'name'));}});

SETXDEVICESTATUS("ROMA power","count",_dl.length);_dl.forEach((dev,pos)=>{SETXDEVICESTATUS("ROMA power","low"+(pos+1),dev)});_power.forEach((pila)=>{if(pila.count>0)SETXDEVICESTATUS("ROMA power",pila.name,pila.count)});

// end minified
*/
