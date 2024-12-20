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
// USE: With the collaboration of the UI scene01.html, we have a standalone documentation APP.
// Requres  IoTwebUI plus REST.

// =====================  USE AS NEW MACRO (preferred)
// 0) This file (updated) must be in the 'addons' directory of your IoTwebUI installation
// 1) Include THIS file in the main file ( IoTwebUI.html ) at the end, adding:
//       <script type="text/javascript" src="addons/scene01.js"></script >
// You can use 'SCENE01( xname [, room, home])' as new MACRO in RULE-pad:
// 2-A) Copy the 'RULES for SCENE01' (see at the bottom) in the RULE-pad at run time (temporary)
// 2-B) Or copy the 'RULES for SCENE01' in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices
// note: [, room, home] are optional, because default are defined in code (row 44). You can change the defaults.

// =====================  USE AS NEW MACRO - ALTERNATIVE
// 1) Copy just 'SCENE01' function CODE (updated) in the 'CUSTOM USER MACROS' section of usrrulesXX.X.js file
// You can use 'SCENE01( xname [, room, home])' as new MACRO in RULE-pad:
// 2-A) Copy the 'RULES for SCENE01' in the RULE-pad at run time (temporary)
// 2-B) Or copy the 'RULES for SCENE01'(see at the bottom) in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices
// note: [, room, home] are optional, because default are defined in code. You can change the defaults.

// ==== end use instructions

// =================== SCENE01 CODE
// =====   USER CONFIGURATION ================
// CUSTOM node shapes:
// see https://graphviz.org/doc/info/shapes.html
const deviceNode = " node [shape=ellipse]; ";
const automationNode = " node [shape=box,style=filled,color=GreenYellow]; ";
const tapToRunNode = " node [shape=box,style=filled,color=lightgrey]; " ;
const extraNode = " node [shape=box3d]; ";

// OPTIONAL: partial processing 
const graphTitle ="Tuya graph";
// const graphTitle ="Allarme con 'protezione intelligente'";
const subTitle = ""  // skipped
// const subTitle = 'see post <a href = "https://www.facebook.com/groups/tuyaitalia/permalink/1374886523145697/">https://www.facebook.com/groups/tuyaitalia/permalink/1374886523145697/</a>';
//
// Ottenere le liste aggiornate con "Plain list" (quarto tasto) e copiarle qui.
// commentare le Automazioni e/o le scene che si desidera processare!
//
const excludeAutomation = [

];

const excludeTapToRun = [

];
// future extension
const Industrial_General_Scene_Linkage_deprecated = false;

// CUSTOM parameter. You can UPDATE the default params to meet your structure in the next line:
function SCENE01(xname, room = "tools", home = 'ADMIN') { // default params for room and home
// =====   USER CONFIGURATION ENDS

    let homeName = VGET('homeName');
    let homeID = VGET('homeID');
 
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
        //    console.log("scene_phase A - startup");		
    }

    // ====== A_PHASE. GET some values, then tests for update. Flag is action != idle.
    if(GET(xname, "action", false) == "Clear"){
	   doClear(xname);
	   SETXDEVICESTATUS(xname, "action", "idle");
	   VOICE("Dati cancellati. Reinserire una home");
       return;
       }
 
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
			myMsgBox(hname, "The home <b>" + hname + "</b> not found - verify!");
			return;
 //           throw "The home <b>" + hname + "</b> not found - verify!";
        }
        if (exclude_home.includes(hId) || exclude_home.includes(tuyaData[hId].name)) {
 			myMsgBox(hname, "The home <b>" + hname + "</b> exists, but it is excluded!");
			return;
 //          throw "Home " + hname + " exists, but it is excluded!";
        }
        SETXDEVICEONLINE(xname, false);
		REFRESH(xname);
  	    VOICE("è cambiata la HOME... attendere lettura dati ");
		 
        getHomeAutomations(hId);
        getHomeDetails(hId);
        homeName = hname;
        homeID = hId;
  		VSET( 'homeName', homeName);
 		VSET( 'homeID', homeID);
        SETXDEVICEONLINE(xname);
		REFRESH(xname);
		VOICE(" Aggiornamento dati terminato");
    }
   
    if (!ISCONNECTED(xname))
        return; // nothing to do

    let stp = GET(xname, "action", false);
    let tit = "<h2>" + homeName + ": " + stp + "</h2>";
    // Automation, Tap-to-run, Cross
    switch (stp) {
    case "Automation":
        autoPopup("IoTwenUI & SCENE01", tit + makeAutomation(homeID));
        break;
    case "Tap-to-run":
        autoPopup("IoTwenUI & SCENE01", tit + makeTapToRun(homeID));
        break;
    case "Cross":
        dotpage(homeName, makeCross(homeID));
        break;
    case "List":
        autoPopup("IoTwenUI & SCENE01", tit + makeList(homeID));
        break;
	case "idle":
    default:
        return;
    }
    SETXDEVICESTATUS(xname, "action", "idle");
}
// =========================== required by SCENE01

function sconosciuto() {
    return " ?? unknow ";
}

function oneDetail(id) {
    sleep(200);
    let s = null;
    if (Industrial_General_Scene_Linkage_deprecated)
        //     s = callAPI('GET', "/v2.0/iot-03/automations/"+id);
        s = callAPI('GET', "/v2.0/iot-03/automations/" + id);
    else
        // /v2.0/cloud/scene/rule/{rule_id}
        s = callAPI('GET', "/v2.0/cloud/scene/rule/" + id);

    return s;
}

function getHomeAutomations(hIndex) {
    if (tuyaData[hIndex]['automations'])
        return;
    tuyaData[hIndex]['automations'] = [];
    sleep(200);
    s = callAPI('GET', "/v2.0/cloud/scene/rule?space_id=" + hIndex + "&type=automation");
    // GET /v1.1/homes/242****/automations
    // see https://developer.tuya.com/en/docs/cloud/scene-and-automatic?id=K95zu0bsi8i8s
    // s = callAPI('GET', "/v1.1/homes/"+id+"/automations");  // permission deny

    if (s && s.list) {
        s.list.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
        //        console.log(s);
        tuyaData[hIndex]['automations'].push(...s.list);
    }
	
//	sleep(200);
//{code: 28841106, msg: 'No permissions. This API is not subscribed.', success: false, t: 1734447795095, tid: '0a92510dbc8811efaf84fe4c51833753'}
//    s = callAPI('GET', "/v1.0/users/" + client_id + "/device-groups");
//   if (s ) {
//        tuyaData[hIndex]['groups'] = s;	   }
}

function getHomeDetails(hIndex) {
    if (tuyaData[hIndex]['automations'] || tuyaData[hIndex]['scenes']) {
        if ((tuyaData[hIndex]['automations'][0] && tuyaData[hIndex]['automations'][0]['details']) || (tuyaData[hIndex]['scenes'][0] && tuyaData[hIndex]['scenes'][0]['details']))
	           return;
        if (tuyaData[hIndex]['automations'])
            tuyaData[hIndex]['automations'].forEach((automation, idx) => {
                automation['details'] = oneDetail(automation.id);
            });
        if (tuyaData[hIndex]['scenes'])
            tuyaData[hIndex]['scenes'].forEach((rule, idx) => {
                rule['details'] = oneDetail(rule.id);
            });
        console.log("SCENE01 - updated");
     }
}

function getDName(devID) {
    const d = getDeviceFromRef(devID);
    if (d && d.name)
        return d.name;
    return devID;
}
function getDeviceName(devID) {
    return ("<i>" + getDName(devID) + "</i>");
}
function getSafeDeviceName(devID) {
    return ('"' + getDName(devID) + '"');
}

function getTName(homeId, ruleID) {
    for (const rule of tuyaData[homeId]['scenes']) {
        if (rule.id == ruleID)
            return (rule.name);
    }
    return ruleID;
}
function getRuleName(homeId, ruleID) {
    return ("<i>" + getTName(homeId, ruleID) + "</i>");
}
function getSafeRuleName(homeId, ruleID) {
    return ('"' + getTName(homeId, ruleID) + '"');
}

function getAName(homeId, ruleID) {
    for (const rule of tuyaData[homeId]['automations']) {
        if (rule.id == ruleID)
            return rule.name;
    }
    return ruleID;
}
function getSafeAutomationName(homeId, ruleID) {
    return ('"' + getAName(homeId, ruleID) + '"');
}

function getAutomationName(homeId, ruleID) {
    return ("<i>" + getAName(homeId, ruleID) + "</i>");
}

function function2code(devId, funID) {
	if (isNaN(funID)) 
		 return funID;
    const api_url = "/v2.0/cloud/thing/" + devId + "/shadow/properties";
    const x = callAPI('GET', api_url);
    for (const property of x.properties) {
        if (property.dp_id == funID)
            return (property.code);
    }
    return "dp_id_" + funID;
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
        return ' <i><b> ****** </b> non disponibile <b> ****** </b> </i><br>';
    return "";
}
function makeNtaptorun(rule) {
    if (!rule.details || rule.details.actions.length == 0)
        return ' <i><b> ****** </b> non disponibile <b> ****** </b> </i><br>';
    return "";
}
function makeTime(rule) {
    let txt = "<b>effective time</b><br>";
    if (!rule.details || !rule.details.effective_time)
        return " ";

    if (rule.details.effective_time.start)
        txt += "&nbsp;&nbsp; &#x2692;  start:" + rule.details.effective_time.start;
    if (rule.details.effective_time.end)
        txt += " end: " + rule.details.effective_time.end + "<br>";
    if (rule.details.effective_time.loops)
        txt += "&nbsp;&nbsp; &#x267A;" + " loops: " + loop2it(rule.details.effective_time.loops) + "<br>";
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
        case "timer":
            if (item.expr.loops == '1111111')
                txt += "&nbsp;&nbsp; &#x267A; schedule: " + item.expr.time + " Ogni giorno<br>";
            else
                if (item.expr.loops) {
                    txt += "&nbsp;&nbsp; &#x267A; schedule:" + item.expr.time + " loops: " + loop2it(item.expr.loops) + "<br>";
                } else {
                    // 20240512
                    // 01234567
                    let datstp = item.expr.date.slice(0, 3) + "/" + item.expr.date.slice(4, 5) + "/" + item.expr.date.slice(6, 7);
                    txt += "&nbsp;&nbsp; &#x2611; schedule: " + item.expr.time + " date: " + datstp + "<br>";
                }
            break;
            //		 case "weather":
        case "armed_state":
            txt += "&nbsp;&nbsp; &#x26A0; " + "<i>alarm</i>.armed_state == " + sconosciuto() + "<br>"
            break;
        case "weather":
            txt += "&nbsp;&nbsp; &#x2611; <i>weather</i>." + item.expr.weather_code + " " + item.expr.comparator + " " + item.expr.weather_value + "<br>";
            break;
        case "device_report":
            txt += "&nbsp;&nbsp; &#x2611; " + getDeviceName(item.entity_id) + "." + item.expr.status_code + " " + item.expr.comparator + " " + item.expr.status_value + "<br>";
            break;
        default:
            txt += "&nbsp;&nbsp; " + item.entity_type + sconosciuto() + "<br>";
        }
    }
    return txt;
}
function makeActions(rule) {
    let txt = "<b>actions</b><br>";
    if (!rule.details || !rule.details.actions || !rule.details.actions.length)
        return "";
    for (const item of rule.details.actions) {
        switch (item.action_executor) {
        case "delay":
            txt += "&nbsp;&nbsp; &#x273B; delay: " + item.executor_property.delay_seconds + " s " + sconosciuto() + "<br>";
            break;
        case "rule_trigger":
            txt += "&nbsp;&nbsp; &#x21e8; " + getRuleName(rule.space_id, item.entity_id) + ".trigger() <br>";
            break;
        case "rule_enable":
            txt += "&nbsp;&nbsp; &#x21d2; " + getAutomationName(rule.space_id, item.entity_id) + ".status = enable<br>";
            break;
        case "rule_disable":
            txt += "&nbsp;&nbsp; &#8655; " + getAutomationName(rule.space_id, item.entity_id) + ".status = disable<br>";
            break;
        case "app_push_trigger":
            txt += "&nbsp;&nbsp; &#x266B; <i>Message Center</i>.notification <br>";
            break;
        case "toggle":
                txt += "&nbsp;&nbsp; &#8702; " + getDeviceName(item.entity_id) + "." + function2code(item.entity_id, item.executor_property.function_code) + ".toggle() <br>";
            break;

        case "device_group_issue":
        case "device_issue":
              txt += "&nbsp;&nbsp; &#8702; " + getDeviceName(item.entity_id) + "." + function2code(item.entity_id, item.executor_property.function_code) + " = " + item.executor_property.function_value + "<br>";
            break;
        default:
            txt += "&nbsp;&nbsp; ? " + item.action_executor + " " + sconosciuto() + "<br>";
        }
    }
    return txt;
}
// ======================   local for CROSS
function dotpage( home, dotgraph) {
    // 14/06 ver 2.1 modified
    let stili = "top=10, left=10, width=600, height=400, status=no, menubar=no, toolbar=no, location=no";
    let testo = window.open("", "", stili);

    if (testo) {
        testo.document.write("<!DOCTYPE html><html><head>");
        testo.document.write("<script src='https://d3js.org/d3.v7.js'></script>");
        testo.document.write("<script src='https://unpkg.com/@hpcc-js/wasm@2.16.1/dist/graphviz.umd.js'></script>");
        testo.document.write("<script src='https://unpkg.com/d3-graphviz@5/build/d3-graphviz.js'></script>");
        testo.document.write("<meta charset='utf-8'>");
        testo.document.write("<title>IoTwebUI & SCENE01</title>");
        testo.document.write("</head><body>");
        testo.document.write("<h2>" + home + ": " +graphTitle + "</h2>");
		if(subTitle != "")
             testo.document.write("<h4>" + subTitle + "</h4>");
        testo.document.write("<div id='graph' style='text-align: center;'></div>");
        testo.document.write("<script>");
        testo.document.write("let dotxt = '" + dotgraph + "' ;\n");
        testo.document.write("d3.select('#graph').graphviz().renderDot(dotxt);");
        testo.document.write("</script></body></html>");
    } else {
        throw "URL: not open. Enable popups for this APP.";
    }
}
function sceneAction(scene, hID, map, type) {
    for (const item of scene.details.actions) {
        switch (item.action_executor) {
        case "rule_trigger":
            map.push({
                from: {
                    type: type,
                    id: '"' + scene.name + '"'
                },
                to: {
                    type: "rule",
                    id: getSafeRuleName(hID, item.entity_id)
                },
                action: "run"
            });
            break;
        case "rule_enable":
            map.push({
                from: {
                    type: type,
                    id: '"' + scene.name + '"'
                },
                to: {
                    type: "auto",
                    id: getSafeAutomationName(hID, item.entity_id)
                },
                action: "enable"
            });
            break;
        case "rule_disable":
            map.push({
                from: {
                    type: type,
                    id: '"' + scene.name + '"'
                },
                to: {
                    type: "auto",
                    id: getSafeAutomationName(hID, item.entity_id)
                },
                action: "disable"
            });
            break;
        case "toggle":
            map.push({
                from: {
                    type: type,
                    id: '"' + scene.name + '"'
                },
                to: {
                    type: "device",
                    id: getSafeDeviceName(item.entity_id)
                },
                action: "toggle"
            });
            break;
        case "device_group_issue":
            map.push({
                from: {
                    type: type,
                    id: '"' + scene.name + '"'
                },
                to: {
                    type: "extra",
                    id: '"Group ' + item.entity_id + '"'
                },
                action: "set"
            });
            break;
        case "device_issue":
            map.push({
                from: {
                    type: type,
                    id: '"' + scene.name + '"'
                },
                to: {
                    type: "device",
                    id: getSafeDeviceName(item.entity_id)
                },
                action: function2code(item.entity_id, item.executor_property.function_code) + ":" + item.executor_property.function_value,
 //               action: "set"
            });
            break;

        case "app_push_trigger":
            map.push({
                from: {
                    type: type,
                    id: '"' + scene.name + '"'
                },
                to: {
                    type: "extra",
                    id: '"Message center"'
                },
                action: "notification"
            });
            break;

        case "delay":
            // ignore
            break;
        default:
            map.push({
                from: {
                    type: type,
                    id: '"' + scene.name + '"'
                },
                to: {
                    type: "extra",
                    id: '"' + item.action_executor + '"'
                },
                action: "action"
            });
        }
    }
}
function sceneCondition(scene, hID, map) {
    if (scene.details.effective_time) {
        map.push({
            from: {
                type: "extra",
                id: '"' + scene.name + ' effective"'
            },

            to: {
                type: "auto",
                id: '"' + scene.name + '"'
            },
            action: "condition"
        });

     if (scene.details.effective_time.loops) {
            map.push({
                from: {
                    type: "extra",
                    id: '"' + scene.name + ' effective"'
                },
                to: {
                    type: "extra",
                    id: '"' + scene.name + ' effective"'
                },
                action: "loop"
            });

        }

    }

    for (const item of scene.details.conditions) {

        switch (item.entity_type) {
        case "timer":
            map.push({
                from: {
                    type: "auto",
                    id: '"' + scene.name + '"'
                },
                to: {
                    type: "auto",
                    id: '"' + scene.name + '"'
                },
                action: "schedule"
            });
            break;
        case "device_report":
            map.push({
                from: {
                    type: "device",
                    id: getSafeDeviceName(item.entity_id)
                },
                to: {
                    type: "auto",
                    id: '"' + scene.name + '"'
                },
                action:  item.expr.status_code + item.expr.comparator + item.expr.status_value ,
 //              action: "trigger"
            });
            break;
        default:
            map.push({
                from: {
                    type: "extra",
                    id: '"' + item.entity_type + '"'
                },
                to: {
                    type: "auto",
                    id: '"' + scene.name + '"'
                },
                action: "trigger"
            });
        }
    }
}

function processTapToRun(hID, map) {
    tuyaData[hID]['scenes'].forEach((scene) => {
        if ((makeNtaptorun(scene) == "") && (!excludeTapToRun.includes(scene.name))) {
            sceneAction(scene, hID, map, "tap")
        }
    });
}

function processAutomation(hID, map) {
    tuyaData[hID]['automations'].forEach((automation) => {
        if ((makeNdisponile(automation) == "") && (!excludeAutomation.includes(automation.name))) {
            sceneAction(automation, hID, map, "auto");
            sceneCondition(automation, hID, map);
        }
    });
}

function makeDot(hID, map) {
    // elenco nodi
    let device = [];
    let auto = [];
    let tap = [];
    let extra = [];
    map.forEach((pair) => {
        switch (pair.from.type) {
        case "device":
            if (!device.includes(pair.from.id))
                device.push(pair.from.id);
            break;
        case "auto":
            if (!auto.includes(pair.from.id))
                auto.push(pair.from.id);
            break;
        case "tap":
            if (!tap.includes(pair.from.id))
                tap.push(pair.from.id);
            break;
        case "extra":
            if (!extra.includes(pair.from.id))
                extra.push(pair.from.id);
            break;
        }
        switch (pair.to.type) {
        case "device":
            if (!device.includes(pair.to.id))
                device.push(pair.to.id);
            break;
        case "auto":
            if (!auto.includes(pair.to.id))
                auto.push(pair.to.id);
            break;
        case "tap":
            if (!tap.includes(pair.to.id))
                tap.push(pair.to.id);
            break;
        case "extra":
            if (!extra.includes(pair.to.id))
                extra.push(pair.to.id);
            break;
        }
    });
//    console.log(device, auto, tap);
    let dot = "digraph Tuya { ";
    dot += "fontname=\"Helvetica,Arial,sans-serif\" ";
    dot += "fontsize=20 ";
    dot += "node [fontname=\"Helvetica,Arial,sans-serif\"] ";
    dot += "edge [fontname=\"Helvetica,Arial,sans-serif\"] ";
    dot += "rankdir=LR; ";
	if (device.length)
         dot += deviceNode + device.join(';') + "; ";
 	if (extra.length)  
	     dot +=  extraNode  + extra.join(';') + "; ";
	if (tap.length)
		dot +=  tapToRunNode  + tap.join(';') + "; ";
  	if (auto.length)
		dot +=  automationNode  + auto.join(';') + "; ";
    dot += "  ";

    map.forEach((pair) => {
        dot += pair.from.id + " -> " + pair.to.id + " [label =\"" + pair.action + "\"]; ";
    });
    dot += "} ";
//    console.log(dot);
    return dot;
}

// =============================================== MAKE functions
function makeAutomation(hID) {
    // formato testo
    const cols = 3;
    let i = 0;
    let txt = "<table width='100%' border=1><tr><td width='" + Math.floor(100 / cols) + "%' >";
    tuyaData[hID]['automations'].forEach((automation) => {
        if (!excludeAutomation.includes(automation.name)) {
            if (i > 0)
                txt += (i % cols) ? ((i < cols) ? "</td><td width='" + Math.floor(100 / cols) + "%' >" : "</td><td>") : "</td></tr><tr><td>";

            txt += "<b> &nbsp;" + automation.name + "</b><br>";
            txt += makeNdisponile(automation);
     //       txt += "id: " + automation.id + "<br>";
            txt += "status: " + automation.status + "<br>";
            txt += "running_mode: " + automation.running_mode + "<br>";
            txt += makeTime(automation);
            txt += makePreconditions(automation);
            txt += makeConditions(automation);
            txt += makeActions(automation);
            i++;
        }
    });

    txt += "</td></tr></TABLE>";
    return (txt);
}

function makeTapToRun(hID) {
    // formato testo
    const cols = 3;
    let i = 0;
    let txt = "<table width='100%' border=1><tr><td width='" + Math.floor(100 / cols) + "%' >";
    tuyaData[hID]['scenes'].forEach((scene) => {
        if (!excludeTapToRun.includes(scene.name)) {
            if (i > 0)
                txt += (i % cols) ? ((i < cols) ? "</td><td width='" + Math.floor(100 / cols) + "%' >" : "</td><td>") : "</td></tr><tr><td>";

            txt += "<b> &nbsp;" + scene.name + "</b><br>";
            txt += makeNtaptorun(scene);
   //         txt += "id: " + scene.id + "<br>";
            txt += "status: " + scene.status + "<br>";
            txt += "running_mode: " + scene.running_mode + "<br>";
            txt += makeTime(scene);
            //       txt += makePreconditions(automation);
            //       txt += makeConditions(automation);
            txt += makeActions(scene);
            i++;
        }
    });

    txt += "</td></tr></TABLE>";
    return (txt);
}

function makeCross(hID) {
    let map = [];
    processTapToRun(hID, map);
    processAutomation(hID, map);
    // now m,ap ready:
    console.log("cross", map);
    return makeDot(hID, map);
}

function makeList(hID) {
    let txt = "**** Automations: <br>";
    tuyaData[hID]['automations'].forEach((automation) => {
        txt += '"' + automation.name + '",<br>';
    });
    txt += "<br>**** Tap-to-run:<br>";
    tuyaData[hID]['scenes'].forEach((scene) => {
        txt += '"' + scene.name + '",<br>';
    });

    return txt;
}
function doClear(xname){
	    SETXDEVICESTATUS(xname, 'home', null);
		SETXDEVICEONLINE(xname, false);
	    homeName = null;
        VSET('homeName', homeName);
	    for (const homeId of Object.keys(tuyaData)) {
			  delete tuyaData[homeId]['automations'];
        if (tuyaData[homeId]['scenes'])
            tuyaData[homeId]['scenes'].forEach((rule) => {
                delete  rule.details;
			});
		}
		REFRESH(xname);
}
// end  SCENE01 code


// =========== RULES for SCENE01: use this in RULE-pad or add to usrrulesXX.X.js
// This is an example only: use the name you like

/*
SCENE01("Scene"); // builds the x-device: name requirerd, uses default home,room
*/
// This x-device does not require any other rule
/* end  SCENE01  */