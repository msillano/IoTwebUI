/*
This file is part of IoTwebUI project (https://github.com/msillano/IoTwebUI)
Contains user data and options
------------------------------
License MIT
(C)2024 marco.sillano@gmail.com
ver 1.0 20/08/2024
per IOTwebUI version 2.2 10/11/2024	
Ver 10.1 03/11/2024
per IOTwebUI version 2.2.2
 */

// =====================  x-device TESTBATTERY01.1
// This addon implements a x-device, TESTBATTERY01, to measure the capacity of NiMH batteries.
// logging the 3 values: 


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

function TESTERBATTERY01(xname = "BetteryTest", xroom = "Test", xhome = 'ADMIN') {
   const DevV = "X-TY-08Z";   // mirror x-device name 
   const CodeV = "value_13";  // code name of ADC pin used
    // coeff derivated from 2 points:
   const fref1 = 2.068 ;  // value fron Vmeter
   const fx1 = 819;       // value from X-TY-08Z
   const fref2 = 4.689;
   const fx2 = 1114;
   const batON = 650;
   const batOFF = 650;
// ---------------------- customization zone ends   
	
 // step0 ======= singleton CONSTRUCTOR at startup
   if (!GETATTRIBUTE(xname, "name", false)){
	         ADDXDEVICE(xhome, xroom, xname, [
			     {  code: 'step',
                    value: "start"  } ,
			     {  code: 'time',
                    value: 0 } ,
 			     {  code: 'tensione',
                    value: "0.0"  } ,
			     {  code: 'smoot',
                    value: "0.0"  } ,
			     {  code: 'charge',
                    value: "0.0"  } ,
					
			     {  code: '<i>setup',
                    value: '</i>'  } ,
			     {  code: 'mcoeff',
                    value: 1  } ,
			     {  code: 'qcoeff',
                    value: 0  } ,
               
            ]);
       SETXDEVICEONLINE(xname);
       }
    // step1 ====== GET some values, then tests for update. Flag is offline == false. 
     let vx = GET(DevV, CodeV, false);
 	 
	 if (vx !== null) {
		// automa states:
	    // start - idle - go - running - done
	   let stp = GET(xname, "step", false);
	   console.log("tester", vx, stp);
	   
	   switch(stp)  {
		case "start":  
	   // coeff derivated from 2 points:
	       VOICE("BATTERY TESTER pronto all'uso!");
	       let mf = (fref1 - fref2)/(fx1 - fx2);
           let qf = fref2 - (mf*fx2);
           SETXDEVICESTATUS(xname, "mcoeff", mf);			
	       SETXDEVICESTATUS(xname, "qcoeff", qf);	
		   SETXDEVICESTATUS(xname, "step", "idle");
		   return;
		case "idle": 
  		   SETXDEVICESTATUS(xname, "time", "0");
		   SETXDEVICESTATUS(xname, "tensione", "0.0");
		   SETXDEVICESTATUS(xname, "smoot", "0.0");
		   if (vx > batON) {VOICE("Inserita una nuova batteria!")};
		   
		   return;
	    case "go": 
  		   VSET("tbtime", Date.now());
		   SETXDEVICESTATUS(xname, "time", "0");
		   SETXDEVICESTATUS(xname, "tensione", "0.0");
		   SETXDEVICESTATUS(xname, "smoot", "0.0");
		   SETXDEVICESTATUS(xname, "charge", "0.0")
		   SETXDEVICESTATUS(xname, "step", "running");
	//	   return;         continue next
		case "running":
		   let tx = GET(xname, "time");  // to find first run
		   if (tx === "0")         // is the first run
	    		VSET("tbtime", Date.now());
     	   let m_coeff = GET(xname, "mcoeff");
           let q_coeff = GET(xname, "qcoeff");
           let Vb = (m_coeff * vx) + q_coeff;
		   if (vx > batON){
			   let delta = (Date.now() - VGET("tbtime"))/60000 ;   
			   SETXDEVICESTATUS(xname, "tensione", Vb.toFixed(2));
			   SETXDEVICESTATUS(xname, "smoot", AVG(Vb,(tx==="0")?0:10));
			   SETXDEVICESTATUS(xname, "time", delta.toFixed(1));
			   let mah = INTEGRAL((Vb / 0.95)* (1/3.6), (tx==="0")?1:null);  //  mAh = V/(RC=0.9)*adjust mA and hour
			   SETXDEVICESTATUS(xname, "charge", mah.toFixed(1));
			   }
		   if (vx < batOFF) {SETXDEVICESTATUS(xname, "step", "done"); 
		          VOICE("Estratta la vecchia batteria!");}
		   
		   return;
 	    case "done":   // final, keeps values
		   if (vx > batON){ SETXDEVICESTATUS(xname, "step", "idle");
		         VOICE("BATTERY TESTER inserita batteria!")};
  		   return;
     default:		
	   }
	   
    return; 
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
