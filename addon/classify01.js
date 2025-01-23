/*
This file is part of IoTwebUI project (https://github.com/msillano/IoTwebUI)
Contains user data and options
------------------------------
License MIT
(C)2024 marco.sillano@gmail.com
per IOTwebUI version 2.2 10/08/2024
 */
// =====================  x-device CLASSIFY01
// This addon implements CLASSIFY01. This get a device list (all(default), only online, only offline) from one/all(default) HOMES.
// The code is executed only one time, at startup or after a change of device's velues: 'home', 'mode'
// note: CUSTOMIZATION: on the firt line you can set where put the new x-devoce. HOME/(ROOM)
// Calling parameter: device_name, target ROOM_name|All (null), and Mode: 'all'|'online'|'offline'

// =====================  USE AS NEW MACRO
// 0) This file (updated) must be in the 'addons' directory of your IoTwebUI installation
// 1) Include THIS file in the main file ( IoTwebUI.html ) at the end, adding:
//       <script type="text/javascript" src="addons/CLASSIFY01.js"></script >
// 2-A) Copy the 'RULES for CLASSIFY01' in the RULE-pad at run time (temporary)
// 2-B) Or copy the 'RULES for CLASSIFY01' in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices
// You can use 'CLASSIFY01(name, room, mode)' as new MACRO in RULE-pad !.

// =====================  USE AS NEW MACRO - ALTERNATIVE
// 1) Copy just 'CLASSIFY01' function CODE in the 'CUSTOM USER MACROS' section of usrrulesXX.X.js file
// 2-A) Copy the 'RULES for CLASSIFY01' in the RULE-pad at run time (temporary)
// 2-B) Or copy the 'RULES for CLASSIFY01' in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices
// You can use 'CLASSIFY01(name, room, mode)' as new MACRO in RULE-pad !.

// ==== end use instructions

// =================== CLASSIFY01 CODE

// CUSTOM parameter. All vars names starts with 'cl'.
let _clHome = 'ADMIN', _clRoom = "System"; // Home and room for the x-device
//
function CLASSIFY01(_clName = "Device list", _clStartHome = null, _clStartMode = 'all') { //  ====================
    let first = false;
    // ====== A_PHASE. singleton constructor: buids the x-device with default status
    if (!GETATTRIBUTE(_clName, "name", false)) {
        first = true;
        ADDXDEVICE(_clHome, _clRoom, _clName, [{
                    code: 'home',
                    value: _clStartHome // default start home
                }, {
                    code: 'mode', // all|online|offline
                    value: _clStartMode
                }, {
                    code: 'count',
                    value: 0
                }
            ]);
      sleep(20); // after ADDXDEVICE()
	  // ====================  EXTRA METADATA for 'Explore scene' (optional)
        //  adds 'details[]' to the x-object, structure
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
 
     let xdev = getDeviceFromRef(_clName);
     xdev['details'] = [
            //   b)here   input data (like conditions)
            {
                from: {
                    type: "extra",
                    id: "IoTwebUI\\ntuyaData"
                },
                action: "get",
            }, {
                action: "<I>data driven</I>",
            }, {
                from: {
                    type: "xtap",
                    id: "List any device"
                },
                action: "mode=all",
            }, {
                from: {
                    type: "xtap",
                    id: "List offline devices"
                },
                action: "mode=offline",
            },{
                from: {
                    type: "xtap",
                    id: "List online devices"
                },
                action: "mode=online",
            }, {
                from: {
                    type: "xtap",
                    id: "List total devices"
                },
                action: "home=any",
            }, {
                from: {
                    type: "xtap",
                    id: "List devices from ROMA"
                },
                action: "home=ROMA",
            },{
                from: {
                    type: "xtap",
                    id: "List devices from ADMIN"
                },
                action: "home=ADMIN",
            },
            //   c)here   output data (like actions)
            {
                to: {
                    type: "extra",
                    id: "tooltip"
                },
                action: "result",
            },
        ];
    }

    // ====== METHOD: check a cleanup is triggered when the home/mode properties changes
    var _clXhome = GET(_clName, 'home'); // user can change home at runtime
    var _clXmode = GET(_clName, 'mode'); // user can change mode at runtime
    var _clDev = []; // temp device names array
 
  if (TRIGCHANGED(_clXhome + _clXmode + !categories)) { // to use a single TRIGCHANGED()
         ADDXDEVICE(_clHome, _clRoom, _clName, [{
                    code: 'home',
                    value: _clXhome
                }, {
                    code: 'mode', // all|online|offline
                    value: _clXmode
                }, {
                    code: 'count',
                    value: 0
                }
            ]);		
    }
	
   function dynamicSort(properties) { // local function
        return function (a, b) {
            for (let i = 0; i < properties.length; i++) {
                let prop = properties[i];
                if (a[prop] < b[prop])
                    return -1;
                if (a[prop] > b[prop])
                    return 1;
            }
            return 0;
        }
    }

    // ========  B_PHASE  wait for 1 loop to complete device processing
    if ((!first) && (GET(_clName, 'count', false) === 0)) {   // NOT  at the first run
//        VOICE("attendere per favore...");
        var _clAHomes = (_clXhome == 'any') ? GETHOMELIST() : [_clXhome];
        _clAHomes.forEach((xhome) => {
            GETIDLIST(xhome).forEach((devid) => {
                let online = GETATTRIBUTE(devid, 'online');
                if ((_clXmode == 'all') || ((_clXmode == 'online') && online) || ((_clXmode == 'offline') && !online)) {
                    let device = {};
                    device.id = devid;
                    device.name = GETATTRIBUTE(devid, 'name');
                    device.category = GETATTRIBUTE(devid, 'category', false);
                    device.is_a = GETATTRIBUTE(devid, 'is-a', false);
                    _clDev.push(device);
                };
            });
        });
        // ========  C_PHASE: fills status properties
        _clDev = _clDev.sort(dynamicSort(['category', 'name']));
        SETXDEVICESTATUS(_clName, "count", _clDev.length);
        let _clC = '';
        let i = 1;
        _clDev.forEach((dev, pos) => {
            if (_clC != dev.category) {
                if (categories) // expert mode
                    SETXDEVICESTATUS(_clName, '<b>' + dev.category, dev.is_a + '</b>');
                else
                    SETXDEVICESTATUS(_clName, '<b>' + dev.category, '</b>');
                _clC = dev.category
            }
            if (categories) // expert mode
                SETXDEVICESTATUS(_clName, '---- ' + (i++).toString().padStart(2, "0"), dev.name + ': <i>' + dev.id + '</i>');
            else
                SETXDEVICESTATUS(_clName, '---- ' + (i++).toString().padStart(2, "0"), dev.name);
        });
        SETXDEVICEONLINE(_clName); // done: online
        REFRESH(_clName); // to update tooltip asap
        VOICE("Device List " + (_clXhome ? ("di " + _clXhome) : "totale") + " aggiornata");
    };
   
} // end  CLASSIFY01 code

// =========== RULES for CLASSIFY01: use this in RULE-pad
// This is an example only, using 'ROMA' home - you can customize it in RULE-pad (or editing usr

/*
// ---- CLASSIFY01: Device list
//  some control RULES with name (xtap examples), before for fastest execution
if (TRIGBYNAME("List any device")) SETXDEVICESTATUS("Device list",'mode','all'),REFRESH(),VOICE("Lista di tutti i device");

if (TRIGBYNAME("List offline devices")) SETXDEVICESTATUS("Device list",'mode','offline'),REFRESH(),VOICE("Lista dei soli device offline");

if (TRIGBYNAME("List devices from any HOME")) SETXDEVICESTATUS("Device list",'home',null),REFRESH(),VOICE("Lista totale di tutti i device "+GET("Device list", 'mode'));

if (TRIGBYNAME("List devices from ROMA")) SETXDEVICESTATUS("Device list",'home','ROMA'),REFRESH(),VOICE("Lista di "+GET("Device list", 'mode')+" device di Roma ");
//
CLASSIFY01("Device list", 'ROMA', 'all');            // x-device MACRO call
 */
