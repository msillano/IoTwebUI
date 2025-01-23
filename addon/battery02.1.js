/*
This file is part of IoTwebUI project (https://github.com/msillano/IoTwebUI)
------------------------------
License MIT
(C)2024 marco.sillano@gmail.com
per IOTwebUI version 2.2 10/08/2024
28/10/2024 bug: changed _t1 test (row 68).
30/10/2024 bug: changed _t1 test, added == test, so it works also with 'low' (row 68).
30/10/2024  bug: added set online

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
//    - OPTIONS: var _b2xname = "ROMA test batterie", _b2xroom = "tools", _b2xhome = 'ADMIN', _b2startHome = "ROMA", //    - Multiple homes require multiple instances of the code (with different names!)
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
    // note: this x-device requires a lot of user data about the devices in the target Tuya home.
    // So it is not allowed to change target home at runtime: all options are defined in the next line:
   var _b2startHome = "ROMA";
// EXAMPLE: This creates the x-device 'XXXX  batteries test' in the XXXX home, 'tools' room
function BATTERY02(_b2xname = _b2startHome + ' batteries test', _b2xroom = "tools", _b2xhome = _b2startHome) {
     _b2loops = 100;

    // USER UPDATE HERE with used batteries:ì (note: position is ID, add new types at end!):
    var _power = [{
	    	name: "alcalina_AA",
            count: 0
        }, //  powID:0
        {
            name: "alcalina_AAA",
            count: 0
        }, //  powID:1
        {
            name: "Ni-MH_AA",
            count: 0
        }, //  powID:2
        {
            name: "Ni-MH_AAA",
            count: 0
        }, //  powID:3
        {
            name: "litio_cr2032",
            count: 0
        }, //  powID:4
        {
            name: "litio_cr123A",
            count: 0
        }, //  powID:5
        {
            name: "unknown",
            count: 0
        }, //  powID:6
        {
            name: "alcalina_9V",
            count: 0
        }, //  powID:7

    ];
    var _dl = [];
    var _devices = [
        // dettaglio di tutti i dispositivi a batteria sotto controllo
        // USER MUST update this with all battery device:( here some example lines)
        // record:	[id, status.code, min%|'low', powID, number, 0-flag]

        ["04208127d8bfc0dac0e5", "battery_state", 'low', 5, 1, 0],
        ["bfbd7ad4258e404d4cux8n", "battery_percentage", 10, 1, 2, 0],
        ["42027807d8bfc0c5831e", "BatteryStatus", 2, 4, 1, 0],
        ["bf58b543d99720c78fkiaj", "va_battery", 2, 3, 1, 0],
        ["bf750fb01d58166e88hlvh", "battery_percentage", 10, 1, 2, 0],
        ["bf3445cec64be01415ds3g", "battery_percentage", 10, 1, 2, 0],
        ["bfcd95a64bdd983fadstau", "va_battery", 2, 4, 1, 0],
        ["bf7e4a246be6c36c04hued", "va_battery", 2, 4, 1, 0],
        ["bf542e7c64b816977796bc", "va_battery", 2, 4, 1, 0],
        ["bf13c7f2a8155ca0acqmen", "va_battery", 2, 4, 1, 0],
        ["bfa2b73ed79307142bho75", "battery_percentage", 10, 6, 1, 0],
        ["317080408caab521a5d3", "va_battery", 10, 7, 1, 0],
        ["bf2a7ajayofmag9b", "battery_percentage", 2, 4, 1, 0],
        ["bfc613ofhsrcy8bc", "battery_percentage", 2, 4, 1, 0],

    ];

    // ====  builds or clear device at any run - AGGIORNARE x-device: home, room|null, name!
    //     if(TRIGEVERY(_b2loops) || !GETATTRIBUTE(_b2xname, "online", false)) {
    if (!GET(_b2xname, "home", false)) {
        ADDXDEVICE(_b2xhome, _b2xroom, _b2xname, [{
                    code: 'home',
                    value: _b2startHome // actual home
                }
            ]);
        // non è prevista la modifica di home al runtime perchè dovrebbe variare di conseguenza anche  _devices[]
        // ====================  EXTRA METADATA for 'Explore scene'
        // (optional) adds 'details' to the x-object
        // run only one time, at startup!
        // for details see https://github.com/msillano/IoTwebUI/blob/main/APP/Scene/LEGGIMI.md#grapho-di-x-device
        //    a) init
        let xdev = getDeviceFromRef(_b2xname);
        xdev['details'] = [
            //   b)here   input data (like conditions)
            {
                from: {
                    type: "extra",
                    id: "IoTwebUI\\ntuyaData"
                },
                action: "get",
            },
            //   b)here   output data (like actions)
            {
                to: {
                    type: "extra",
                    id: "tooltip\\nbatteries02"
                },
                action: "result",
            },
            //   c) here more edges and nodes, also external
            {
                action: "<I>refresh</I>",
            },

        ]; // details ends

    }
    // ==========  data collection
    if (!GETATTRIBUTE(_b2xname, "online", false)) {
        _devices.forEach((dev, pos) => {
            let _t1 = GET(dev[0], dev[1], false);
            if ((_t1 !== null) && ((_t1 < dev[2]) || (_t1 == dev[2]))) {
                dev[5] = 1;
                _power[dev[3]].count += dev[4];
                _dl.push(dev[3]+":"+GETATTRIBUTE(dev[0],'name'));
            }
        });

        // ========= formatting and status update
        SETXDEVICESTATUS(_b2xname, "tested", _devices.length);
        SETXDEVICESTATUS(_b2xname, "low", _dl.length);
        //	 SETXDEVICESTATUS(_b2xname, "time", (new Date()).toTimeString().split(' ')[0]);
        _dl.forEach((dev, pos) => {
            SETXDEVICESTATUS(_b2xname, "low" + (pos + 1), dev)
        });
        SETXDEVICESTATUS(_b2xname, "<b>batteries", "</b>");
        _power.forEach((pila, idx) => {
            if (pila.count > 0)
                SETXDEVICESTATUS(_b2xname, "<i>"+idx+":" + pila.name, "</i>" + pila.count)
        });
        SETXDEVICEONLINE(_b2xname); // done: online
        REFRESH(_b2xname);
        VOICE("La lista dettagliata delle batterie scariche di " + _b2xhome + " è aggiornata");
    }
}

// end  BATTERY02 code

// =========== RULES for BATTERY02: use this in RULE-pad

/*
BATTERY02();                //  MACRO call
// nothing to do at runtime
 */
