/*
This file is part of IoTwebUI project (https://github.com/msillano/IoTwebUI)
Contains user data and options
------------------------------
License MIT
(C)2024 marco.sillano@gmail.com
per IOTwebUI version 2.2 10/08/2024
 */

// =====================  x-device SCENE01
// This addon implements SCENE01() MACRO. This MACRO implements a x-device that allow access to your device information, calling some Tuya API.
// USE: With the collaboration of the UI SCENE01.html, we have a standalone documentation APP.
// Requres  IoTwebUI plus REST.

// =====================  USE AS NEW MACRO
// 0) This file (updated) must be in the 'addons' directory of your IoTwebUI installation
// 1) Include THIS file in the main file ( IoTwebUI.html ) at the end, adding:
//       <script type="text/javascript" src="addons/SCENE01.js"></script >
// You can use 'SCENE01( xname [, room, home])' as new MACRO in RULE-pad:
// 2-A) Copy the 'RULES for SCENE01' in the RULE-pad at run time (temporary)
// 2-B) Or copy the 'RULES for SCENE01' in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices
// note: [, room, home] are optional, because default are defined in code (row 44). You can change the defaults.

// =====================  USE AS NEW MACRO - ALTERNATIVE
// 1) Copy just 'SCENE01' function CODE (updated) in the 'CUSTOM USER MACROS' section of usrrulesXX.X.js file
// You can use 'SCENE01( xname [, room, home])' as new MACRO in RULE-pad:
// 2-A) Copy the 'RULES for SCENE01' in the RULE-pad at run time (temporary)
// 2-B) Or copy the 'RULES for SCENE01' in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices
// note: [, room, home] are optional, because default are defined in code. You can change the defaults.

// ==== end use instructions

// =================== SCENE01 CODE

// CUSTOM parameter. You can UPDATE the default params to meet your structure in the next line:
function SCENE01(xname, room = "tools", home = 'ADMIN') { // default params
    var homeName = null;
    var homeID = null;
    // ====== A_PHASE. singleton constructor: buids the x-device with default status
    if (!GETATTRIBUTE(xname, "name", false)) {
        ADDXDEVICE(home, room, xname, [{
                    code: 'home',
                    value: null // default
                }, {
                    code: 'action',
                    value: "idle"
                }
            ]);
        console.log("exp_phase A - startup");
        SETXDEVICEONLINE(xname);
    }

    // ====== A_PHASE. GET some values, then tests for update. Flag is action != idle.

    // test valid HOME
    let hname = GET(xname, "home", false);
    if (!hname || hname == 'home')
        return; // nothing to do

    if (hname != homeName) {
        let hId = null;
        for (const homeId of Object.keys(tuyaData)) {
            if (tuyaData[homeId].name === hname)
                hId = homeId;
        };
        if (hId === null) {
            throw "Home " + hname + " not found - verify!";
        }
        if (exclude_home.includes(hId) || exclude_home.includes(tuyaData[hId].name)) {
            throw "Home " + hname + " exists, but it is excluded!";
        }

        getHomeAutomations(hId);
        getHomeDetails(hId);
        homeName = hname;
        homeID = hId;
    }
    let stp = GET(xname, "action", false);
    let tit = "<h2>" + homeName + ": - " + stp + "</h2>";
    // Automation, Tap-to-run,
    switch (stp) {
    case "Automation":
        autoPopup("IoTwenUI & SCENE01", tit + makeAutomation(homeID));
        break;
    case "Tap-to-run":
        break;
    default:
        return;
    }
    SETXDEVICESTATUS(xname, "action", "idle");
}
// required by SCENE01

function sconosciuto() {
    return " <i>?? unknown </i>";
}

function oneDetail(id) {
    sleep(200);
    // /v2.0/cloud/scene/rule/{rule_id}
    s = callAPI('GET', "/v2.0/cloud/scene/rule/" + id);
    //     s = callAPI('GET', "/v2.0/iot-03/automations/"+id);  // error not subscribed
    return s;
}

function getHomeAutomations(hIndex) {
    if (tuyaData[hIndex]['automations'])
        return;
    VOICE(" Nuova HOME.Attendere lettura dati ");
    tuyaData[hIndex]['automations'] = [];
    sleep(200);
    s = callAPI('GET', "/v2.0/cloud/scene/rule?space_id="+hIndex+"&type=automation");
    // GET /v1.1/homes/242****/automations
    // see https://developer.tuya.com/en/docs/cloud/scene-and-automatic?id=K95zu0bsi8i8s
    // s = callAPI('GET', "/v1.1/homes/"+id+"/automations");  // permission deny

    if (s && s.list) {
        s.list.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
        console.log(s);
        tuyaData[hIndex]['automations'].push(...s.list);
    }
}

function getHomeDetails(hIndex) {
    if (tuyaData[hIndex]['automations'] || tuyaData[hIndex]['scenes']) {
        if (tuyaData[hIndex]['automations'][0]['details'] || tuyaData[hIndex]['scenes'][0]['details'])
            return;
        if (tuyaData[hIndex]['automations'])
            tuyaData[hIndex]['automations'].forEach((automation, idx) => {
                automation['details'] = oneDetail(automation.id);
            });
        if (tuyaData[hIndex]['scenes'])
            tuyaData[hIndex]['scenes'].forEach((rule, idx) => {
                rule['details'] = oneDetail(rule.id);
            });
        VOICE(" Aggiornamento terminato.Grazie ");
    }
}

function getDeviceName(devID) {
    const d = getDeviceFromRef(devID);
    if (d && d.name)
        return d.name;
    return devID;
}
function getRuleName(homeId, ruleID) {
    for (const rule of tuyaData[homeId]['scenes']) {
        if (rule.id == ruleID)
            return (rule.name);
    }
    return ruleID;
}

function loop2it(loop) {
    const s = 'DLMMGVS';
    let d = '';
    for (i = 0; i < 7; i++) {
        if (loop.charAt(i) == '0')
            d += '-';
        else
            d += s.charAt(i);
    }
    return d;
}

function makeNdisponile(rule) {
    if (rule.details.actions.length == 0 || rule.details.conditions.length == 0)
        return ' <i><b> **** </b> non disponibile </i><br>';
    return " ";
}
function makeTime(rule) {
    let txt = "<b>effective time</b><br>";
    if (!rule.details.effective_time)
        return " ";

    if (rule.details.effective_time.start)
        txt += "&nbsp;&nbsp;&#x2692;  start:" + rule.details.effective_time.start;
    if (rule.details.effective_time.end)
        txt += " end: " + rule.details.effective_time.end + "<br>";
    if (rule.details.effective_time.loops)
        txt += "&nbsp; &nbsp; &#x267A;" + " loops: " + loop2it(rule.details.effective_time.loops) + "<br>";
    return txt;
}
function makePreconditions(rule) {
    let txt = "<b>preconditions<b><br>";
    if (!rule.details.preconditions)
        return "<b>preconditions</b>" + sconosciuto() + "<br>";

    return txt;
}
function makeConditions(rule) {
    let txt = " ";
    if (!rule.details.conditions || !rule.details.conditions.length)
        return txt;
    if (rule.decision_expr)
        txt += "<b>conditions (" + rule.decision_expr + ")</b><br>";
    else
        txt += "<b>conditions</b><br>";
    for (const item of rule.details.conditions) {
        switch (item.entity_type) {
        case " timer ":
            if (item.expr.loops == '1111111')
                txt += "&nbsp;&nbsp;&#x267A; time:" + item.expr.time + "Ognigiorno<br>";
            else
                if (item.expr.loop) {
                    txt += "&nbsp;&nbsp; &#x267A; time:" + item.expr.time + "loops:" + loop2it(item.expr.loops) + "<br>";
                } else {
                    // 20240512
                    // 01234567
                    let datstp = item.expr.date.slice(0, 3) + "/" + item.expr.date.slice(4, 5) + "/" + item.expr.date.slice(6, 7);
                    txt += "&nbsp;&nbsp; &#x2611; time:'" + item.expr.time + " date:" + datstp + "<br>";
                }
            break;
            //		 case "weather":
        case "armed_state":
            txt += "&nbsp;&nbsp; &#x26A0;" + "'alarm'.armed_state == " + sconosciuto() + "<br>"
            break;
        case "device_report":
            txt += "&nbsp;&nbsp; &#x2611; ' " + getDeviceName(item.entity_id) + " '." + item.expr.status_code + " " + item.expr.comparator + " " + item.expr.status_value + "<br>";
            break;
        default:
            txt += "&nbsp;&nbsp; ? " + item.entity_type + sconosciuto() + "<br>";
        }
    }
    return txt;
}
function makeActions(rule) {
    let txt = "<b>actions</b><br>";
    if (!rule.details.actions || !rule.details.actions.length)
        return "";
    for (const item of rule.details.actions) {
        switch (item.action_executor) {
        case "rule_trigger":
            txt += "&nbsp;&nbsp; &#x27A7; Tap-to-run: '" + getRuleName(rule.space_id, item.entity_id) + "'<br>";
            break;

        default:
            txt += "&nbsp;&nbsp; " + item.action_executor + " " + sconosciuto() + "<br>";
        }
    }
    return txt;
}

function makeAutomation(hID) {
    // formato testo
    const cols = 3;
    let i = 0;
    let txt = "<table border=1><tr><td>";
    tuyaData[hID][' automations '].forEach((automation) => {
        if (i > 0)
            txt += (i % cols) ? "</td><td>" : "</td></tr><tr><td>";

        txt += "<b>" + automation.name + "</b><br>";
        txt += "id: " + automation.id + "<br>";
        txt += "status: " + automation.status + "<br>";
        txt += "running_mode: " + automation.running_mode + "<br>";
        txt += makeNdisponile(automation);
        txt += makeTime(automation);
        txt += makePreconditions(automation);
        txt += makeConditions(automation);
        txt += makeActions(automation);
        i++;
    });

    txt += "</td></tr></TABLE>";
    return (txt);
}

// end  SCENE01 code


// =========== RULES for SCENE01: use this in RULE-pad
// This is an example only, use real values
// note: if you use SCENE01() many times, to buil many x-devices, take care to performances.

/*
SCENE01("Explore");                //  MACRO call
*/
