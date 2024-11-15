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
//       <script type="text/javascript" src="addons/testerbattery01.js"></script >
// 2-A) Copy the 'RULES for TESTBATTERY01'  (updated) in the RULE-pad at run time (temporary) 
// 2-B) Or copy the 'RULES for TESTBATTERY01'  (updated) in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices

// ======================  INSTALL ALTERNATIVE 1: USE AS USER MACRO (only code)
// 1) Copy just 'TESTBATTERY01' function code in the 'CUSTOM USER MACROS' section of usrrulesXX.X.js file
// 2-A) Copy the 'RULES for TESTBATTERY01' (updated) in the RULE-pad at run time (temporary) 
// 2-B) Or copy the 'RULES for TESTBATTERY01' (updated) in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices

// ==== end use instructions

// =================== TESTBATTERY01 CODE
// Parameters: xname = "BetteryTest", xroom = "Test", xhome = 'ADMIN'
// CUSTOMIZATION: user can change defaults: DevV, CodeV about ADC
// You can change also the VOICE messages (i.e. translating)
// Tarature (una tantum): using only X-TY-08Z and a voltmeter, apply 2 tension and update the 4 values: fref1, fx1, fref2, fx2 

function TESTERBATTERY01(xname = "BetteryTest", xroom = "Test", xhome = 'ADMIN') {
   const DevV  = "X-TY-08Z";   // mirror x-device name (not ID)
   const CodeV = "value_13";   // code name of ADC pin used in X-TY-08Z
    // coeff derivated from 2 points:
   const fref1 = 2.068 ;  // value fron Vmeter
   const fx1   = 819;       // value from X-TY-08Z
   const fref2 = 4.689;   // value fron Vmeter
   const fx2   = 1114;      // value from X-TY-08Z
 // ---------------------- customization zone ends   
   const batON = 650;  //  battery
   const batOFF = 650; //  no battery  
	
 // step0 ======= singleton CONSTRUCTOR at startup
   if (!GETATTRIBUTE(xname, "name", false)){   //( i.e. if xname don't exst as x-device, only first loop 
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
	       let mf = (fref1 - fref2)/(fx1 - fx2);  // init coeff
           let qf = fref2 - (mf*fx2);
           SETXDEVICESTATUS(xname, "mcoeff", mf); 			
	       SETXDEVICESTATUS(xname, "qcoeff", qf);	
		   SETXDEVICESTATUS(xname, "time", "0");  // init all
		   SETXDEVICESTATUS(xname, "tensione", "0.0");
		   SETXDEVICESTATUS(xname, "smoot", "0.0");
		   SETXDEVICESTATUS(xname, "charge", "0.0")
		   SETXDEVICESTATUS(xname, "step", "idle");
		   return;
		case "idle": 
  		   if (vx > batON) {VOICE("Inserita una nuova batteria!")};
		   
		   return;
	    case "go": 
 		   SETXDEVICESTATUS(xname, "time", "0");      // init runtime data
		   SETXDEVICESTATUS(xname, "tensione", "0.0");
		   SETXDEVICESTATUS(xname, "smoot", "0.0");
		   SETXDEVICESTATUS(xname, "charge", "0.0")
		   SETXDEVICESTATUS(xname, "step", "running");
		   return;       //  continue next
		case "running":
		   let first = (GET(xname, "time") === "0");  // to find first run
		   if (first)         // is the first run
	    		VSET("tbtime", Date.now());
     	   let m_coeff = GET(xname, "mcoeff");
           let q_coeff = GET(xname, "qcoeff");
           let Vb = (m_coeff * vx) + q_coeff;
		   if (vx > batON){
			   let delta = (Date.now() - VGET("tbtime"))/60000 ;   
			   SETXDEVICESTATUS(xname, "time", delta.toFixed(1));
     		   SETXDEVICESTATUS(xname, "tensione", Vb.toFixed(2));
			   // to clear the old values, if first uses param 0, else 10
			   SETXDEVICESTATUS(xname, "smoot", AVG(Vb, first?0:10));
			   // to clear the old value, if first uses param -5000 else null
			   let mah = INTEGRAL((Vb / 0.95)* (1/3.6), first ? -5000:null);  //  mAh = V/(RC=0.9)*adjust mA and hour
			   SETXDEVICESTATUS(xname, "charge", mah.toFixed(1));
			   }
		   if (vx < batOFF) {SETXDEVICESTATUS(xname, "step", "idle"); 
		          VOICE("Estratta la vecchia batteria!");}
		   return;
 	    case "done":   // final, keeps values
		   SETXDEVICESTATUS(xname, "step", "idle");
  		   return;
     default:		
	   }
	   
    return; 
	}
 
 }
// end  BATTERY01 code

// =========== RULEs for BATTERY01:

    /*
  CLONER01("TY-08Z", "X-TY-08Z");
  TESTERBATTERY01("BetteryTest");
// rules for commands:
 if (TRIGBYNAME("Start BatteryTEST")) SETXDEVICESTATUS("BatteryTest", 'step', 'go'), SAVELOG(),REFRESH('cloud'),VOICE("TEST star");
 if (TRIGBYNAME("Stop BatteryTEST")) SETXDEVICESTATUS("BatteryTest", 'step', 'done'), SAVELOG(),REFRESH(),VOICE("TEST end");
     */

