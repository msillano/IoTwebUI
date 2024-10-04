/*
This file is part of IoTwebUI project (https://github.com/msillano/IoTwebUI)
Contains user data and options
------------------------------
License MIT
(C)2024 marco.sillano@gmail.com
per IOTwebUI version 2.2 10/08/2024
 */
// =====================  x-device MULTIDATA01
// This addon implements MULTIDATA01 x-device. The 'multichart' widget (in iotwidget02) shows
// a chart with all values from a device. This sample x-device groups the data from many devices,
// renames it, and formats it for a correct presentation.
// The use and result is show in test02.html
// note: This code needs hurge customization to meet your requirements.

// =====================  USE AS NEW MACRO
// 0) This file (updated) must be in the 'addons' directory of your IoTwebUI installation
// 1) Include THIS file in the main file ( IoTwebUI.html ) at the end, adding:
//       <script type="text/javascript" src="addons/MULTIDATA01.js"></script >
// 2-A) Copy the 'RULES for MULTIDATA01' in the RULE-pad at run time (temporary)
// 2-B) Or copy the 'RULES for MULTIDATA01' in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices
// You can use 'MULTIDATA01()' as new MACRO in RULE-pad !.

// =====================  USE AS NEW MACRO - ALTERNATIVE
// 1) Copy just 'MULTIDATA01' function CODE in the 'CUSTOM USER MACROS' section of usrrulesXX.X.js file
// 2-A) Copy the 'RULES for MULTIDATA01' in the RULE-pad at run time (temporary)
// 2-B) Or copy the 'RULES for MULTIDATA01' in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices
// You can use 'MULTIDATA01()' as new MACRO in RULE-pad !.

// =====================  USE AS RULE (no MACRO)
// 1) Use the 'minified' version, as RULE (UPDATE the code if required!)
// 1-A) Copy the 'minified MULTIDATA01' in the RULE-pad at run time (temporary)
// 2-B) Copy the 'minified MULTIDATA01' in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices

// ==== end use instructions

// =================== MULTIDATA01 CODE
// WARNING: the TRIGBYNAME() MACRO works only on RULE-pad.
// EXAMPLE: This MACRO creates the x-device 'Device test' for device control

// CUSTOM parameter. All vars names starts with 'mc'.
var _mcHome = 'ADMIN', _mcRoom = "System", _mcName = "temperaturedata";

function MULTIDATA01() {             //  MACRO name

  if (!GETATTRIBUTE(_mcName, "name", false)) ADDXDEVICE(_mcHome, _mcRoom, _mcName), SETXDEVICEONLINE(_mcName, true);
  // data-processing x-device (e.g. temperaturedata) for 'multichart' widget
  // groups and format data from many real devices
  // Formats values like "21.3 °C" so useful as label and as number (space required).
  // Multichart uses numbers, parsing the string.
  SETXDEVICESTATUS(_mcName, "soggiorno", ROUND(GET("bf3d003xxxxxxxx8793rtr", "va_temperature")/10, 1)+" °C");
  SETXDEVICESTATUS(_mcName, "letto",     ROUND(GET("bfc54xxxxxxxxxxxxxme4o", "va_temperature")/10, 1)+" °C");
  SETXDEVICESTATUS(_mcName, "ospiti",    ROUND(GET("bf931bxxxxxxxxxxx5pnwu", "va_temperature")/10, 1)+" °C");
  SETXDEVICESTATUS(_mcName, "esterno",   ROUND(GET("bf37d9xxxxxxxxxx14tqef", "va_temperature")/10, 1)+" °C");
} // end  MULTIDATA01 code

// =========== RULES for TEMPERATUREDATA01: use this in RULE-pad
// This is the calling RULE only.
/*
  MULTIDATA01();                //  MACRO call

*/

/*
// =============================  minified MULTIDATA01
//   Minified version of MULTIDATA01 for RULE-pad - To be customized.
//   On the RULE-pad you can cut long lines in many rows, and use 'continue' char (\) as last char for any row.

  if (!GET("temperaturedata", "soggiorno", false)) ADDXDEVICE('ADMIN', "System", "temperaturedata"), SETXDEVICEONLINE("temperaturedata", true);

  SETXDEVICESTATUS("temperaturedata", "soggiorno", ROUND(GET("bf3d00xxxxxxxx342rtr", "va_temperature")/10, 1)+" °C");
  SETXDEVICESTATUS("temperaturedata", "letto",     ROUND(GET("bfc545xxxxxxxx4cme4o", "va_temperature")/10, 1)+" °C");
  SETXDEVICESTATUS("temperaturedata", "ospiti",    ROUND(GET("bf931bxxxxxxxx4fpnwu", "va_temperature")/10, 1)+" °C");
  SETXDEVICESTATUS("temperaturedata", "esterno",   ROUND(GET("bf37dxxxxxxxx426tqef", "va_temperature")/10, 1)+" °C");

// end minified
*/
