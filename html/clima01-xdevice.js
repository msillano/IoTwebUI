/*
This file is part of IoTwebUI project (https://github.com/msillano/IoTwebUI)
Contains user data and options
------------------------------
License MIT
(C)2024 marco.sillano@gmail.com
per IOTwebUI version 2.2 10/08/2024
 */
// =====================  x-device CLIMA01
// This addon implements a x-device, CLIMA01, plaing the role of middleware between Tuya devices and the CLIMA01 web page.
// Trensforms the Tuya temperature value e.g. 284  to a string used by the UI: "28,4°C" 

// =====================  USE AS NEW MACRO
// 0) This file (updated) must be in the 'addons' directory of your IoTwebUI installation
// 1) Include THIS file in the main file ( IoTwebUI.html ) at the end, adding:
//       <script type="text/javascript" src="addons/clima01-xdevice.js"></script >
// 2-A) Copy the 'RULES for CLIMA01' in the RULE-pad at run time (temporary)
// 2-B) Or copy the 'RULES for CLIMA01' in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices
// You can use 'CLIMA01()' as new MACRO in RULE-pad !.

// ======================  USE AS NEW MACRO - ALTERNATIVE
// 1) Copy just 'CLIMA01' function CODE in the 'CUSTOM USER MACROS' section of usrrulesXX.X.js file
// 2-A) Copy the 'RULES for CLIMA01' in the RULE-pad at run time (temporary)
// 2-B) Or copy the 'RULES for CLIMA01' in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices
// You can use 'CLIMA01()' as new MACRO in RULE-pad !.

// =======================  USE AS RULE (no MACRO)
// 1) Use the 'minified' version, as RULE (UPDATE the code if required!)
// 2-A) Copy the 'minified CLIMA01'  in the RULE-pad at run time (temporary)
// 2-B) Copy the 'minified CLIMA01'  in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices

// ==== end use instructions

// =================== CLIMA01 CODE
// EXAMPLE: This MACRO creates the x-device 'temperaturedata' for the CLIMA01 web page.
function CLIMA01() {
     // ======= singleton CONSTRUCTOR
    if (!VGET('$clima01'))
        VSET('$clima01', 1), ADDXDEVICE('ADMIN', "tools", "temperaturedata");
    // formats values from  all used devices
    SETXDEVICESTATUS("temperaturedata", "soggiorno", ROUND(GET("bfd2eac1e5cb7bf6a4ll4z", "va_temperature")/10, 1)+"°C");                
    SETXDEVICESTATUS("temperaturedata", "letto",     ROUND(GET("bfc5451737cbfe54ecme4o", "va_temperature")/10, 1)+"°C");    
    SETXDEVICESTATUS("temperaturedata", "ospiti",    ROUND(GET("bf931b4999e2384f95pnwu", "va_temperature")/10, 1)+"°C");     
    SETXDEVICESTATUS("temperaturedata", "esterno",   ROUND(GET("bf37d9e44c94789d14tqef", "va_temperature")/10, 1)+"°C");  
    SETXDEVICEONLINE("temperaturedata",true);                                      
 }

// end  CLIMA01 code

// =========== RULES for CLIMA01: use this in RULE-pad
// This only to fire CLIMA01

    /*
    CLIMA01();                //  MACRO call
    */

/*
// =============================  minified CLIMA01
//   Minified version of CLIMA01 for RULE-pad.
//   On the RULE-pad you can cut long lines in many rows, and use 'continue' char (\) as last char for any row.

    if (!VGET('$clima01')) VSET('$clima01', 1), ADDXDEVICE('ADMIN', "tools", "temperaturedata");
    SETXDEVICESTATUS("temperaturedata", "soggiorno", ROUND(GET("bfd2eac1e5cb7bf6a4ll4z", "va_temperature")/10, 1)+"°C");                
    SETXDEVICESTATUS("temperaturedata", "letto",     ROUND(GET("bfc5451737cbfe54ecme4o", "va_temperature")/10, 1)+"°C");    
    SETXDEVICESTATUS("temperaturedata", "ospiti",    ROUND(GET("bf931b4999e2384f95pnwu", "va_temperature")/10, 1)+"°C");     
    SETXDEVICESTATUS("temperaturedata", "esterno",   ROUND(GET("bf37d9e44c94789d14tqef", "va_temperature")/10, 1)+"°C");  
    SETXDEVICEONLINE("temperaturedata",true);                                      

// end minified
*/
