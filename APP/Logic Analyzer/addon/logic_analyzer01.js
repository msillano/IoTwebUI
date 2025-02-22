/*
This file is part of IoTwebUI project (https://github.com/msillano/IoTwebUI)
Contains user data and updatable options
------------------------------
License MIT
(C)2024 marco.sillano@gmail.com
ver 1.0 15/02/2025
for IOTwebUI version 2.2.2
 */

// =====================  x-device LOGIC_ANALYZER01.1
// This addon implements a x-device, LOGIC_ANALYZER01, with 5 ch. for Tuya+IoTwebUI
// see https://github.com/msillano/IoTwebUI/tree/main/APP/Logic%20Analyzer

// =====================  ADDON INSTALL: USE THIS AS EXTERNAL MACRO
// 0) This file (updated) must be in the 'addons' directory of your IoTwebUI installation
// 1) Include THIS file in the main file ( IoTwebUI.html ) at the end, adding a line like:
//       <script type="text/javascript" src="addons/logic_analyzer01.js"></script >
// 2-A) Copy the 'RULES for LOGIC_ANALYZER01'   in the RULE-pad at run time (temporary)
// 2-B) Or copy the 'RULES for LOGIC_ANALYZER01' in the 'var usrrules' in the usrrulesXX.X.js file (better - permanent).
// 3) optional: update 'custom.js' to set a fast polling rate, suitable for the signals to be tested.
// You can also set custom icon and color for this x-devices
//    
// ======= install howto ends

// =================== LOGIC_ANALYZER01 CODE === USER CONFIGURATION
// Parameters: defaults - xname = "Lanalyzer", xroom = "Test", xhome = 'ADMIN'
// IMPORTANT: in SmartLife APP the home "AMIN" and the room "Test" MUST exist.
// Or calling it in ROULE you can change:  LOGIC_ANALYZER01([my_name[, my_room [, my_home]]]), use null for no-room, no-home.
// CUSTOMIZATION: some local values and user options see down, until "USER CONFIG  ENDS"

var _labelTxt = "A: none<br>&nbsp;&nbsp;<br> B: none<br>&nbsp;&nbsp;<br> C: none<br>&nbsp;&nbsp;<br> D: none<br>&nbsp;&nbsp;<br> E: none<br>&nbsp;&nbsp;<br>";
// ========================  Device/code translations (CUSTOM!)
var _translate = {};
_translate["IN4-vdevo|switch_1"] = {
    device: "DOOR*",
    code: "open"
};
_translate["OUT2-vdevo|switch_1"] = {
    device: "ALERT*",
    code: "<b>longOpen!</b>"
};
_translate["SWITCH|countdown_1"] = {
    device: "<i>extra</i>",
    code: "countdown"
};
// =================  USER CONFIG  ENDS
//
var _LAsignals = [{
        dev: null,
        code: null,
        tdev: null,
        tcode: null
    }, {
        dev: null,
        code: null,
        tdev: null,
        tcode: null
    }, {
        dev: null,
        code: null,
        tdev: null,
        tcode: null
    }, {
        dev: null,
        code: null,
        tdev: null,
        tcode: null
    }, {
        dev: null,
        code: null,
        tdev: null,
        tcode: null
    }
];

const _names = ["A", "B", "C", "D", "E"];

var _indx = 0;

// HERE the default Tuya user-name (xname) of the your 'virtual device' and the location:
function LOGIC_ANALYZER01(xname = "Lanalyzer", xroom = "Test", xhome = 'ADMIN') {

    // ========= local functions
    function isDevSelect(adev) {
        for (const selected of _LAsignals) {
            if (selected.dev == adev)
                return true;
        }
        return false;
    }

    function isCodeSelected(adev, acode) {
        for (const selected of _LAsignals) {
            if ((selected.dev == adev) && (selected.code == acode))
                return true;
        }
        return false;
    }
	
    function updateLabels() {
        let lab = "";
        for (i = 0; i < _LAsignals.length; i++) {
            lab += _names[i] + ": " + ((!_LAsignals[i].dev) ? "none" : (_LAsignals[i].tdev || _LAsignals[i].dev)) + '<br>';
            lab += '&nbsp;&nbsp;' + ((!_LAsignals[i].dev) ? "" : (_LAsignals[i].tcode || _LAsignals[i].code)) + '<br>';
        }
        _labelTxt = lab;
        SETXDEVICESTATUS(xname, 'labels', _labelTxt);
    }
    // page selection
    function getSelectPage() {
        const baseURL = 'http://localhost:3031/IoTrest/';
        cols = 3;
        let d = 0;
        let txt = '<script type="text/javascript" src="html/inc/restget.js"> </script >';
        txt += '<style> dir:hover {color: red; } </style>';
        txt += '<script> function doAdd(n,c){';
        txt += 'let aUrl = \"' + baseURL + 'set/' + xname + '/action/\" +n + \"|\" +c ;';
        txt += ' console.log( aUrl);';
        txt += ' RESTget(aUrl); let x=document.getElementById(n+c); x.innerText=" === in use"; x.onClick=null;} </script >';
        txt += "<table width='100%' border=1><tr>";
        Object.keys(tuyaData).forEach((homeId) => {
            txt += "<td colspan = 4 ><b>" + tuyaData[homeId].name + "</b></td></tr><tr>";
            for (const device of tuyaData[homeId].devices) {
                if (device.online == true) {
                    let selected = isDevSelect(device.name);
                    txt += "<td width='" + Math.floor(100 / cols) + "%' >" + ++d + ":" + device.name + "</td>";
                    txt += "<td width='" + Math.floor(100 / cols) + "%' >";
                    device.status.forEach((rec) => {
                        if (!rec.code.includes("<") && !rec.value.toString().includes("<"))
                            txt += rec.code + "<br>";
                    })
                    txt += "</td><td width='" + Math.floor(50 / cols) + "%' >";
                    device.status.forEach((rec) => {
                        if (!rec.code.includes("<") && !rec.value.toString().includes("<"))
                            txt += rec.value + "<br>";
                    })
                    txt += "</td><td width='" + Math.floor(50 / cols) + "%' >";
                    device.status.forEach((rec) => {
                        if (!rec.code.includes("<") && !rec.value.toString().includes("<")) {

                            if (selected && isCodeSelected(device.name, rec.code))
                                //                          txt += "RESTget(baseURL + 'set/'+xname+'/add/{\"d\":\"'+device.name+',v:'+rec.code+'\"}' )";
                                txt += "<div id=\"" + device.name + rec.code + "\"> === in use</div>";
                            else {
                                txt += "<div id=\"" + device.name + rec.code + "\" onClick = 'doAdd(\"" + device.name + "\",\"" + rec.code + "\"); ' >aggiungi</div>";
                            }
                        }
                    })
                    txt += "</td></tr><tr>";
                }
            } // device loop

        }); // homes loop
        return txt;
    }

    // ======================================= MAIN
    // ====== A_PHASE. startup: singleton constructor: buids the x-device with default status
    //    console.log("scene_phase A - startup");
    if (!GETATTRIBUTE(xname, "name", false)) {
        ADDXDEVICE(xhome, xroom, xname, [{
                    code: 'action',
                    value: "idle"
                }, {
                    code: 'labels',
                    value: _labelTxt
                }, {
                    code: 'A',
                    value: 1
                }, {
                    code: 'B',
                    value: 2
                }, {
                    code: 'C',
                    value: 3
                }, {
                    code: 'D',
                    value: 4
                }, {
                    code: 'E',
                    value: 5
                }

            ]);
        sleep(20); // better after ADDXDEVICE

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
                action: "get data",
            }, {
                to: {
                    type: "xextra",
                    id: "UI"
                },
                action: "data",
            }, {
                from: {
                    type: "xextra",
                    id: "UI"
                },
                action: "commands",
            }, {
                to: {
                    type: "xextra",
                    id: "device pooUp"
                },
                action: "select",
            }, {
                action: "<I>polling</I>",
            },
        ];

        return;
    } // startup ends

    // ==============================
    const delta = 0.75;
    for (i = 0; i < _LAsignals.length; i++) {
        if (_LAsignals[i].dev) {
            let v = GET(_LAsignals[i].dev, _LAsignals[i].code);
            if ((!v) || (v == "false")) {
                SETXDEVICESTATUS(xname, _names[i], i + 1)
            } else {
                SETXDEVICESTATUS(xname, _names[i], 1 + i + delta)
            }
        }
    }
	
    // =============================== actions
    // processes user request
    let stp = GET(xname, "action", false);
    if (stp == "idle")
        return;

     // add, Tap-to-run, Cross
    switch (stp) {
    case "add":
        let tit = "<h2>Select device's codes " + (new Date().toJSON()) + "</h2>";
        autoPopup("IoTwenUI & LOGIC ANALYZER", tit + getSelectPage());
        break;
    case "clear":
        for (i = 0; i < _LAsignals.length; i++) {
            _LAsignals[i].dev = null;
            _LAsignals[i].code = null;
            _LAsignals[i].tdev = null;
            _LAsignals[i].tcode = null;
        };
        _indx = 0;
        updateLabels();
        break;
    default:
        if (stp.includes("|")) {
            let useL = _translate[stp];
            parts = stp.split("|");
//			console.log("TRANSLATE", _translate, useL);
            _LAsignals[_indx++] = {
                dev: (parts[0]),
                code: (parts[1]),
                tdev: (useL ? useL.device : null),
                tcode: (useL ? useL.code : null)
            };
            _indx %= 5;
            updateLabels();
        }

    }

    SETXDEVICESTATUS(xname, "action", "idle");
    return;
}
// end  LOGIC_ANALYZER01 code

// =========== RULEs for LOGIC_ANALYZER01:
// 2-A) Copy this 'RULES for LOGIC_ANALYZER01'   in the RULE-pad at run time (temporary)
// 2-B) Or copy this 'RULES for LOGIC_ANALYZER01' in the 'var usrrules' in the usrrulesXX.X.js file (better - permanent).
/*
LOGIC_ANALYZER01();  // runs this every loop, uses default values - see line 82 - required
*/
