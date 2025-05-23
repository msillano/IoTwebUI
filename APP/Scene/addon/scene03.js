/*
This file is part of IoTwebUI project (https://github.com/msillano/IoTwebUI)
Contains user data and options
------------------------------
License MIT
(C)2024 marco.sillano@gmail.com
per IOTwebUI version 2.2 10/08/2024
 */

// =====================  x-device SCENE01
// This addon implements SCENE03() MACRO. This MACRO implements a x-device that allow access to your device information, calling some Tuya API.
// USE: With the collaboration of the UI scene01.html (scene/html/*.*), we have a standalone APP for Tuya and IoTwebUI documentation.
// Requres  IoTwebUI & REST.
// More info: see https://github.com/msillano/IoTwebUI/tree/main/APP/Scene
// =====================  USE AS NEW MACRO (preferred)
// 0) This file (updated) must be in the 'addon' directory of your IoTwebUI installation
// 1) Include THIS file in the main file ( IoTwebUI.html ) at the end, adding:
//       <script type="text/javascript" src="addon/scene01.js"></script >
// You can use 'SCENE01( xname [, room, home])' as new MACRO in RULE-pad:
// 2-A) Copy the 'RULES for SCENE01' (see at the bottom) in the RULE-pad at run time (temporary)
// 2-B) Or copy the 'RULES for SCENE01' in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices
// note: [, room, home] are optional, because default are defined in code (row 44). You can change the defaults.

// =====================  USE AS NEW MACRO - ALTERNATIVE
// 1) Copy just 'SCENE01' function CODE (updated) in the 'CUSTOM USER MACROS' section of usrrulesXX.X.js file
// You can use 'SCENE01( xname [, room, home])' as new MACRO in RULE-pad:
// 2-A) Copy the 'RULES for SCENE01' (see at the bottom) in the RULE-pad at run time (temporary)
// 2-B) Or copy the 'RULES for SCENE01'(see at the bottom) in the 'var usrrules' in the usrrulesXX.X.js file (permanent).
// 3) optional: update 'custom.js' to set icon and color for this x-devices
// note: [, room, home] are optional, because default are defined in code. You can change the defaults.

// ==== end use instructions

// =================== SCENE01 CODE
// =====   USER CONFIGURATION ================
// CUSTOM node shapes:
// see https://graphviz.org/doc/info/shapes.html
const nodiStyles = {
    device: ' node [shape=ellipse, style=""]; ',
    auto: ' node [shape=box, style=filled, fillcolor=GreenYellow, color=black]; ',
    tap: ' node [shape=box, style=filled, fillcolor=lightgrey, color=black]; ',
    extra: ' node [shape=box3d, style="", color=black]; ',
    xdevice: ' node [shape=ellipse, style="diagonals", color=red]; ',
    xauto: ' node [shape=box, style="diagonals,filled", fillcolor=GreenYellow, color=red]; ',
    xtap: ' node [shape=box, style="diagonals,filled", fillcolor=lightgrey, color=red]; ',
    xextra: ' node [shape=box3d, style="filled", fillcolor=Yellow, color=black]; ',
}

// OPTIONAL: for partial processing
 var graphTitle = ""; // default -> auto
// var graphTitle = "ROMA batteries test (BATTERY02)"; // default -> auto
// const graphTitle ="Allarme con 'protezione intelligente'";
 const subTitle = "" // default -> skipped
// const subTitle = 'ref: <a href = "https://github.com/msillano/IoTwebUI/tree/main/addon">https://github.com/msillano/IoTwebUI/tree/main/addon</a>';
//
// Ottenere le liste aggiornate con "Plain list" (quarto tasto) e copiarle qui.
// commentare le Automazioni e/o le scene che si desidera processare!
//
const excludeAutomation = [

    // ROMA:

];

const excludeTapToRun = [

];

const excludeXDevice = [

];

// future extension
const Industrial_General_Scene_Linkage_deprecated = false;
let isString = value => typeof value === 'string';

// CUSTOM parameter. You can UPDATE the default params to meet your structure in the next line:
function SCENE01(xname, room = "tools", home = 'ADMIN') { // default params for room and home
    // =====   USER CONFIGURATION ENDS
    if (!graphTitle)
        graphTitle = xname + " (SCENE01)";
    let homeName = VGET('homeName');
    let homeID = VGET('homeID');

    // ====== A_PHASE. startup: singleton constructor: buids the x-device with default status
    //    console.log("scene_phase A - startup");
    if (!GETATTRIBUTE(xname, "name", false)) {
        ADDXDEVICE(home, room, xname, [{
                    code: 'home',
                    value: null // default
                }, {
                    code: 'action',
                    value: "idle"
                }
            ]);
       sleep(20);  // better after ADDXDEVICE			
        // ====================  EXTRA METADATA for 'Explore scene' (optional)
        // (optional) adds 'details[]' to the x-object, structure
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
       // ============================ for SCENE01:

        let xdev = getDeviceFromRef(xname);
        xdev['details'] = [{
                from: {
                    type: "extra",
                    id: "IoTwebUI\\ntuyaData"
                },
                action: "get",
            }, {
                from: {
                    type: "extra",
                    id: "TuyaCloud"
                },
                action: "get",
            }, {
                from: {
                    type: "xextra",
                    id: "UI\\nscene01"
                },
                action: "home.set",
            }, {
                from: {
                    type: "xextra",
                    id: "UI\\nscene01"
                },
                action: "action.set",
            }, {
                to: {
                    type: "xextra",
                    id: "SVG graph"
                },
                action: "popup",
            }, {
                to: {
                    type: "xextra",
                    id: "scene table"
                },
                action: "popup",
            }, {
                to: {
                    type: "xextra",
                    id: "node list"
                },
                action: "popup",
            }, {
                action: "<I>data-driven</I>",
            },
        ];

        // ====================  EXTRA METADATA ends
    } // startup ends

    // ====== A_PHASE. GET some values, then tests for update.
    // Unconditional 'Clear' process, reset x-device.
    if (GET(xname, "action", false) == "Clear") {
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
        // bad new home
        if (hId === null) {
            myMsgBox(xname, "The home <b>" + hname + "</b> not found - verify!");
            SETXDEVICESTATUS(xname, 'home', homeName);
            return;
        }
        // new home in  exclude_home
        if (exclude_home.includes(hId) || exclude_home.includes(tuyaData[hId].name)) {
            myMsgBox(xname, "The home <b>" + hname + "</b> exists, but it is excluded!");
            SETXDEVICESTATUS(xname, 'home', homeName);
            return;
        }
        // new home OK: continue
        SETXDEVICEONLINE(xname, false);
        REFRESH(xname);
        VOICE("è cambiata la HOME... attendere lettura dati ");

        getHomeAutomations(hId);
        getHomeDetails(hId);
        //      getXDetails(hId);
        homeName = hname;
        homeID = hId;
        VSET('homeName', homeName);
        VSET('homeID', homeID);
        SETXDEVICEONLINE(xname);
        REFRESH(xname);
        VOICE(" Aggiornamento dati terminato");
    }

    if (!ISCONNECTED(xname))
        return; // nothing to do

    // processes user request
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
	    let tmeta = makeMeta(homeID);
		autoPopup("IoTwenUI & SCENE01", tit + "<pre>"+ JSON.stringify(tmeta , null, 3)+"</pre>");
        dotpage(homeName, makeCross(homeID, tmeta));
        break;
    case "List":
        autoPopup("IoTwenUI & SCENE01", tit + makeList(homeID));
        break;
    case "AIlist":
        autoPopup("IoTwenUI & SCENE01", makeListAI(xname));
        break;
    case "idle":
        return;
    default:
    }
    SETXDEVICESTATUS(xname, "action", "idle");
}
// =========================== required by SCENE01

function sconosciuto() {
    return "?? unknow";
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
			if (a.running_mode == b.running_mode)
                return a.name.localeCompare(b.name);
		return a.running_mode > b.running_mode;	
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
/*
function getXDetails(homeId) {
// metadata migrates from x-device to an Automation same name
tuyaData[homeId].devices.forEach((device) => {
if ((device.category == "x-dev") && (!excludeXDevice.includes(device.name))) {
if (!tuyaData[homeId]["automations"])
tuyaData[homeId]["automations"] = [];
tuyaData[homeId]["automations"].push({
name: "x-device\\n" + device.name,
running_mode: "IoTwebUI",
space_id: homeId,
status: "enable",
details: {
conditions: [],
actions: [],
}
});
// transforms input/output to conditions/actions
let xdata = tuyaData[homeId]["automations"].slice(-1).pop();
if (device.details && device.details.input)
xdata.details.conditions = device.details.input;
if (device.details && device.details.output)
xdata.details.actions = device.details.output;
}
});
}
 */
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

function getTID(name) {
    for (const homeId of Object.keys(tuyaData)) {
        for (const rule of tuyaData[homeId]['scenes']) {
            if (rule.name == name)
                return (rule.id);
        }
    }
    return null;
}

function getRuleName(homeId, ruleID) {
    return ("<i>" + getTName(homeId, ruleID) + "</i>");
}


function getAName(homeId, ruleID) {
    for (const rule of tuyaData[homeId]['automations']) {
        if (rule.id == ruleID)
            return rule.name;
    }
    return ruleID;
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
    if (!rule.details || !rule.details.actions || !rule.details.conditions || rule.details.actions.length == 0 || rule.details.conditions.length == 0)
        return ' <i><b> ****** </b> non disponibile <b> ****** </b> </i><br>';
    return "";
}
function makeNtaptorun(rule) {
    if (!rule.details || !rule.details.actions || rule.details.actions.length == 0)
        return ' <i><b> ****** </b> non disponibile <b> ****** </b> </i><br>';
    return "";
}
function makeTime(rule) {
    let txt = "";
	if (!rule.details || !rule.details.effective_time)
        return "";
    txt = "&nbsp; intervallo_tempo ( ??,?? ";;
    /*
    if (rule.details.effective_time.start)
    txt += "&nbsp;&nbsp; &#9201;  start:" + rule.details.effective_time.start;
    if (rule.details.effective_time.end)
    txt += " end: " + rule.details.effective_time.end + "<br>";
     */
    if (rule.details.effective_time.loops){
		if (rule.details.effective_time.loops == '1111111')
            txt += ", Ogni giorno ) <br>";
       else   
            txt += ", " + loop2it(rule.details.effective_time.loops) + ") <br>";
	    }
	else 
	 txt += ") <br>";
    return txt;
}
function makePreconditions(rule) {
	   let txt = "";
	  if (rule.details && rule.details.effective_time && rule.details.preconditions )
         txt = " AND  ";
	   else
		 tvt = "&nbsp; ";

      if (rule.details.preconditions)
        return txt + " unknow ( ?? ) // no details <br>";
	return "";
}
function makeConditions(rule) {
    let txt = " ";
    nCond = rule.details.conditions.length;

    if (!rule.details.conditions || !rule.details.conditions.length)
        return txt;
	/*
    if (nCond > 1)
        txt += "<b>Se-conditions (" + (rule.decision_expr || sconosciuto()) + ")</b><br>";
    else
        txt += "<b>Se-conditions</b><br>";
	*/
	let k = 0;
    for (const item of rule.details.conditions) {
        switch (item.entity_type) {
        case "timer":
            if (item.expr.loops == '1111111')
                txt +=  ((k == 0) ? "&nbsp; ":"&nbsp;AND ") + "giorno_orario_definito( " + item.expr.time + ", Ogni giorno ),<br>";
            else
                if (item.expr.loops) {
                    txt +=   ((k == 0) ? "&nbsp; ":"&nbsp;AND ") + "giorno_orario_definito( " + item.expr.time + ", " + loop2it(item.expr.loops) + " ),<br>";
                } else {
                    // 20240512
                    // 01234567
                    let datstp = item.expr.date.slice(0, 3) + "/" + item.expr.date.slice(4, 5) + "/" + item.expr.date.slice(6, 7);
                    txt +=   ((k == 0) ? "&nbsp; ":"&nbsp;AND ") + "giorno_orario_definito( " + item.expr.time + ", " + datstp + " ),<br>";
                }
            break;
            //		 case "weather":
        case "armed_state":
            txt +=   ((k == 0) ? "&nbsp; ":"&nbsp;AND ") + "cambio_allarme( ?? ) // no details<br>"
            break;
        case "weather":
            txt +=   ((k == 0) ? "&nbsp; ":"&nbsp;AND ") + "cambio_condizione_meteo( " + item.expr.weather_code + " " + item.expr.comparator + " " + item.expr.weather_value + " )<br>";
            break;
        case "device_report":
            txt +=   ((k == 0) ? "&nbsp; ":"&nbsp;AND ") + "test_dispositivo( " + getDeviceName(item.entity_id) + ", " + item.expr.status_code + ", " + (item.expr.comparator == '=='? '=': item.expr.comparator) + ", " + item.expr.status_value + " )<br>";
            break;
			
        case "location_fence":
            txt +=   ((k == 0) ? "&nbsp; ":"&nbsp;AND ") + "cambio_coordinate_gps( ??, ??, ?? )  // no details<br>";
            break;
				
        default:
            txt +=   ((k == 0) ? "&nbsp; ":"&nbsp;AND ") + item.entity_type +" "+ sconosciuto() + "<br>";
        }
		k++;
    }
    return txt;
}
function makeActions(rule) {
    let txt = "";
    if (!rule.details || !rule.details.actions || !rule.details.actions.length)
        return "";
    for (const item of rule.details.actions) {
        switch (item.action_executor) {
        case "delay":
            txt += "&nbsp;set_ritardo( " + item.executor_property.delay_seconds + "s ),  // no details<br>";
            break;
        case "rule_trigger":
            txt += "&nbsp;start_tap_to_run( " + (item.entity_name || getRuleName(rule.space_id, item.entity_id)) + " ),<br>";
            break;
        case "rule_enable":
            txt += "&nbsp;abilita_automazione( " + getAutomationName(rule.space_id, item.entity_id) + " ),<br>";
            break;
        case "rule_disable":
            txt += "&nbsp;disabilita_automazione( " + getAutomationName(rule.space_id, item.entity_id) + " ),<br>";
            break;
        case "app_push_trigger":
            txt += "&nbsp;invia_notifica( ?? ),<br>";
            break;
        case "armed_state":
            txt += "&nbsp;set_modalità_allarme( ?? ),<br>";
            break;
        case "toggle":
            txt += "&nbsp;toggle_device_status( " + getDeviceName(item.entity_id) + ", " + function2code(item.entity_id, item.executor_property.function_code) + " ), <br>";
            break;

        case "device_group_issue":
        case "device_issue":
            txt += "&nbsp;set_device_status( " + getDeviceName(item.entity_id) + ", " + function2code(item.entity_id, item.executor_property.function_code) + ", " + item.executor_property.function_value + " ), <br>";
            break;
        default:
            txt += "&nbsp;" + item.action_executor + "( ?? ), " // unknown<br>";
        }
    }
    return txt;
}
// ======================   local for CROSS
function dotpage(home, dotgraph) {
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
        testo.document.write("<h2>" + home + ": " + graphTitle + "</h2>");
        if (subTitle != "")
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
function formatIt(name) { // for spaces and html code
    if (isString(name)) {
        if (name.startsWith("<") || name.endsWith(">")) {
            console.log("formatHTML:", name);
            return "<" + name + ">";
        }
    }
  //  console.log("formatSTD:", name);
	if (name.startsWith('"')){
		console.log("PREformat!:", name);
		return name;
	    }
    return ('"' + name + '"');
}

function sceneAction(scene, hID, map, type) {
    for (const item of scene.details.actions) {
        //       console.log(item);
        switch (item.action_executor) {
        case "rule_trigger":
            map.push({
                from: {
                    type: type,
                    id: formatIt(scene.name),
                },
                to: {
                    type: "tap",
                    id: (item.entity_name ? formatIt(item.entity_name) : formatIt(getTName(hID, item.entity_id) || "unknow"))
                },
                action: "run"
            });
            break;
        case "rule_enable":
            map.push({
                from: {
                    type: type,
                    id: formatIt(scene.name)
                },
                to: {
                    type: "auto",
                    id: formatIt(getAName(hID, item.entity_id || "unknow"))
                },
                action: "enable"
            });
            break;
        case "rule_disable":
            map.push({
                from: {
                    type: type,
                    id: formatIt(scene.name)
                },
                to: {
                    type: "auto",
                    id: formatIt(getAName(hID, item.entity_id || "unknow"))
                },
                action: "disable"
            });
            break;
        case "toggle":
            map.push({
                from: {
                    type: type,
                    id: formatIt(scene.name)
                },
                to: {
                    type: "device",
                    id: getSafeDeviceName(item.entity_id || "unknow")
                },
                action: "toggle"
            });
            break;
        case "device_group_issue":
            map.push({
                from: {
                    type: type,
                    id: formatIt(scene.name)
                },
                to: {
                    type: "extra",
                    id: '"Group ' + (item.entity_id || "unknow") + '"'
                },
                action: "set"
            });
            break;
        case "device_issue":
            map.push({
                from: {
                    type: type,
                    id: formatIt(scene.name)
                },
                to: {
                    type: "device",
                    id: getSafeDeviceName(item.entity_id || "unknow")
                },
                action: formatIt(function2code(item.entity_id, item.executor_property.function_code || "unknow") + ":" + item.executor_property.function_value),
                //               action: "set"
            });
            break;

        case "app_push_trigger":
            map.push({
                from: {
                    type: type,
                    id: formatIt(scene.name)
                },
                to: {
                    type: "extra",
                    id: '"Message center"'
                },
                action: "notification"
            });
            break;

        case "delay":
            map.push({
                from: {
                    type: type,
                    id: formatIt(scene.name)
                },
                to: {
                    type: type,
                    id: formatIt(scene.name)
                },
                action: "delay"
            });

            break;
        default:
            map.push({
                from: {
                    type: type,
                    id: formatIt(scene.name)
                },
                to: {
                    type: "extra",
                    id: formatIt(item.action_executor)
                },
                //executor_property:{extra_code: 'result'}
                action: (item.executor_property && item.executor_property.extra_code) ? formatIt(item.executor_property.extra_code) : "action"
            });
        }
    }

}
function sceneCondition(scene, hID, map, type) {
    if (scene.details.effective_time) {
        map.push({
            from: {
                type: "extra",
                id: formatIt(scene.name + ' effective')
            },

            to: {
                type: type,
                id: formatIt(scene.name)
            },
            action: "start"
        });

        if (scene.details.effective_time.loops) {
            map.push({
                from: {
                    type: "extra",
                    id: formatIt(scene.name + ' effective')
                },
                to: {
                    type: "extra",
                    id: formatIt(scene.name + ' effective')
                },
                action: "loop"
            });

        }

    }

    for (const item of scene.details.conditions) {

        switch (item.entity_type) {
        case "rule":
            map.push({
                from: {
                    type: "tap",
                    id: formatIt(item.entity_name || "unknow")
                },
                to: {
                    type: type,
                    id: formatIt(scene.name)
                },
                action: (item.expr && item.expr.extra_code ? formatIt(item.expr.extra_code) : (item.expr.status_code ? formatIt(item.expr.status_code + item.expr.comparator  + item.expr.status_value ) : "trigger"))
            });
            break;
        case "xrule":
            map.push({
                from: {
                    type: "xtap",
                    id: formatIt(item.entity_name || "unknow")
                },
                to: {
                    type: type,
                    id: formatIt(scene.name)
                },
                action: (item.expr && item.expr.extra_code ? formatIt(item.expr.extra_code) : (item.expr.status_code ? formatIt(item.expr.status_code + (item.expr.comparator || "") + (item.expr.status_value || "")) : "trigger"))
            });
            break;
        case "timer":
            map.push({
                from: {
                    type: type,
                    id: formatIt(scene.name)
                },
                to: {
                    type: type,
                    id: formatIt(scene.name)
                },
                action: (item.expr && item.expr.extra_code) ? formatIt(item.expr.extra_code) : "schedule"
            });
            break;
        case "weather":
            map.push({
                from: {
                    type: "extra",
                    id: '"weather"'
                },
                to: {
                    type: type,
                    id: formatIt(scene.name)
                },
                action: (item.expr) ? formatIt(item.expr.weather_code + " " + item.expr.comparator + " " + item.expr.weather_value) : "unknow"
            });
            break;

        case "device_report":
            map.push({
                from: {
                    type: "device",
                    id: getSafeDeviceName(item.entity_id || "unknow")
                },
                to: {
                    type: type,
                    id: formatIt(scene.name)
                },
                action: (item.expr && item.expr.status_code ? formatIt(item.expr.status_code + item.expr.comparator + item.expr.status_value) : ((item.expr && item.expr.extra_code) ? formatIt(item.expr.extra_code) : "trigger")),
                //              action: "trigger"
            });
            break;
        default:
            map.push({
                from: {
                    type: (item.entity_type.startsWith('"UI\\')) ? "xextra" : "extra",
                    id: formatIt(item.entity_type)
                },
                to: {
                    type: type,
                    id: formatIt(scene.name)
                },
                action: (item.expr && item.expr.extra_code) ? formatIt(item.expr.extra_code) : "trigger"
            });
        }
    }
}

// extracts taptorin details  to map.
function processTapToRun(hID, map) {
    if (tuyaData[hID]['scenes'])
        tuyaData[hID]['scenes'].forEach((scene) => {
            if ((makeNtaptorun(scene) == "") && (!excludeTapToRun.includes(scene.name))) {
                sceneAction(scene, hID, map, "tap")
            }
        });
}
// extracts automation details  to map.  xdevices back to xdevice type
function processAutomation(hID, map) {
    if (tuyaData[hID]['automations'])
        tuyaData[hID]['automations'].forEach((automation) => {
            if ((makeNdisponile(automation) == "") && (!excludeAutomation.includes(automation.name))) {
                sceneAction(automation, hID, map, "auto");
                sceneCondition(automation, hID, map, "auto");
            }
        });
}
// extracts x-device details free to map. No process.
function processFree(hID, map) {
    if (tuyaData[hID]['devices'])
        tuyaData[hID]['devices'].forEach((device) => {
            if ((device.category == "x-dev") && (!excludeXDevice.includes(device.name))) {
                console.log(device);
                if (device.details)
                    device.details.forEach((link) => {
                        let edge = {};
                        edge["from"] = {
                            type: (!link.from) ? "xdevice" : (link.from.type || "extra"),
                            id: (!link.from) ? formatIt(device.name) : (formatIt(link.from.id) || "unknow")
                        };
                        edge["to"] = {
                            type: link.to ? (link.to.type || "extra") : "xdevice",
                            id: link.to ? (formatIt(link.to.id) || "unknow") : formatIt(device.name)
                        };
                        edge["action"] = formatIt(link.action || "unknow");

//                        console.log("details => map", link, edge);
                        map.push(edge);
                    });
            }
        });
}

//
function extractNodes(map){
	
  let nodi = {
        device: [],
        auto: [],
        tap: [],
        xdevice: [],
        xauto: [],
        xtap: [],
        extra: [],
        xextra: [],
    }
    map.forEach((pair) => {
        if (nodi[pair.from.type] && nodi[pair.to.type]) {
            if (!nodi[pair.from.type].includes(pair.from.id))
                nodi[pair.from.type].push(pair.from.id);
            if (!nodi[pair.to.type].includes(pair.to.id))
                nodi[pair.to.type].push(pair.to.id);
        }
    });
 return nodi;
}
// 
function makeDot(hID, map) {
    // extract nodi from map as singleton:
    console.log("map is:", map);
    let nodi = extractNodes(map);
    console.log("dot-nodi", nodi);
    // builds the 'dot' buffer
    let dot = "digraph Tuya { ";
    dot += "fontname=\"Helvetica,Arial,sans-serif\" ";
    dot += "fontsize=16 ";
    dot += "node [fontname=\"Helvetica,Arial,sans-serif\", color = black] ";
    dot += "edge [fontname=\"Helvetica,Arial,sans-serif\"] ";
    dot += "rankdir=LR; ";
    for (const type of Object.keys(nodi))
        if (nodi[type].length)
            dot += nodiStyles[type] + nodi[type].join(';') + "; ";
    // adds arcs
    map.forEach((pair) => {
        dot += pair.from.id + " -> " + pair.to.id + " [label = " + pair.action + "]; ";
    });
    dot += "} ";
    console.log(dot);
    return dot;
}

// =============================================== MAKE functions
function makeAutomation(hID) {
    // formato testo
    const cols = 2;
    let i = 0;
    let txt = "<table width='100%' border=1><tr><td width='" + Math.floor(100 / cols) + "%' >";
    tuyaData[hID]['automations'].forEach((automation) => {
        if (!excludeAutomation.includes(automation.name)) {
            if (i > 0)
                txt += (i % cols) ? ((i < cols) ? "</td><td width='" + Math.floor(100 / cols) + "%' >" : "</td><td>") : "</td></tr><tr><td>";

             txt += makeNdisponile(automation);
            //       txt += "id: " + automation.id + "<br>";
            txt += "&nbsp;status: " + automation.status + "<br>";
            txt += "&nbsp;eseguito (linking): " + automation.running_mode + "<br>";
            txt += "<b>"+automation.name + ":</b><br><i>SE</i> ( trigger( <br>";
            txt += makeConditions(automation);
			if( (!automation.details || !automation.details.effective_time) &&
			(!automation.details.preconditions)) {} 
			  else {
                txt += ")<br>AND  ambito(<br>";
                txt += makePreconditions(automation);
                txt += makeTime(automation);
		    	}
           txt += "))<br><i>POI</i> (<br>";

           txt += makeActions(automation);
		   txt += ")<br>";
            i++;
        }
    });


//   now processes x-tap-to-run:
 let map =[];
 processFree(hID, map);
 let nodi = extractNodes(map); 
 console.log("SCENE-AUTOMATION X-MAP", map);
 let j = 0;
 if (nodi.xauto.length) {
     while (i % cols) {txt +="</td><td>"; i++;};
     txt += (i)?"</td></tr><tr><td>":"";
	 nodi.xauto.forEach((xscena) => {
		if (j > 0)
			  txt += (j % cols) ? ((j+i < cols) ? "</td><td width='" + Math.floor(100 / cols) + "%' >" : "</td><td>") : "</td></tr><tr><td>";
		txt += "eseguito (linking): IoTwebUI <br>";
	    txt += "<b> &nbsp;" + toPrn(xscena) + ":</b><br>";
		//       txt += makeTime(scene);
		//       txt += makePreconditions(automation);
		//       txt += makeConditions(automation);
		txt += "<i>SE</i> ( trigger(<br>  ";
		
//		txt += "&nbsp;&nbsp; ? <br>"
                let k = 0;
			    map.forEach((pair) => {
				if (pair.to.id == xscena)
					switch (pair.from.type){    
				   case "device":
                   case "xdevice":
		        	    txt +=  ((k == 0) ? "&nbsp; ":"&nbsp;AND ") + "test_dispositivo(  " + getDeviceName(toPrn(pair.from.id)) + ", " + toPrn(pair.action).replace("=",", = , ").replace("<",", < , ").replace(">",", > , ") + " ); <br>";
						break;
  	       //        case "xdevice":
	        	    // txt +=((k == 0) ? "&nbsp; ":"&nbsp;AND ") + "test_dispositivo(  x-" + getDeviceName(toPrn(pair.from.id)) + ", " + toPrn(pair.action) + " ); <br>";
			//			break;
   
                    case "auto": 
                    case "tap": 
 					    txt += ((k == 0) ? "&nbsp; ":"&nbsp;AND ") + toPrn(pair.from.id) + "( " + toPrn(pair.action) + " )<br>";
						break;
                    case  "xauto": 
                    case  "xtap": 
					    txt += ((k == 0) ? "&nbsp; ":"&nbsp;AND ") + toPrn(pair.from.id) + "( " + toPrn(pair.action) + " )<br>";
						break;
					  
                    case "extra": 
 						    txt +=  ((k == 0) ? "&nbsp; ":"&nbsp;AND ") + toPrn(pair.from.id) + "( " + toPrn(pair.action) + " )<br>";
						break;
                    case "xextra": 
 						    txt += ((k == 0) ? "&nbsp; ":"&nbsp;AND ") + toPrn(pair.from.id) + "( " + toPrn(pair.action) + " ) <br>";
				}
				k++;
		 });

		txt += ")) <br><i>POI</i> ( <br>";
	    map.forEach((pair) => {
				if (pair.from.id == xscena)
					switch (pair.to.type){    
				    case "device":
 	                case "xdevice":
	        	      txt += "&nbsp; set_device_status( " + getDeviceName(toPrn(pair.to.id)) + ", " + toPrn(pair.action).replace("=",", ") + " ), <br>";
						break;
                    case "auto": 
                    case  "xauto": 
            		   txt += "&nbsp; unknow ( ?? ),<br>";
             					break;
                    case "tap": 
                    case  "xtap": 
					   txt += "&nbsp; start_tap_to_run( " + toPrn(pair.to.id) + " ), <br>";
                       break;					  
                   case "xextra": 
                   case "extra": 
 						    txt += "&nbsp; " + toPrn(pair.to.id) + " ( " + toPrn(pair.action) + " ), <br>";
						break;
                  default: 
					    txt += "&nbsp; " + toPrn(pair.to.id) + " ( " + toPrn(pair.action) + " ),     //  unknow <br>";
						
				}
		 });
		txt += ") <br>"; 
		j++;
	  });
  }
 
 if (!i && !j) txt += "<br>none!<br>";

    txt += "</td></tr></TABLE>";
    return (txt);
}

function toPrn(str){
 return str.replace(/^"+|"+$/g, '');
}

function makeTapToRun(hID) {
    // formato testo
    const cols = 2;
    let i = 0;
    let txt = "<table width='100%' border=1><tr><td width='" + Math.floor(100 / cols) + "%' >";
	tuyaData[hID]['scenes'].forEach((scene) => {
        if (!excludeTapToRun.includes(scene.name)) {
            if (i > 0)
                txt += (i % cols) ? ((i < cols) ? "</td><td width='" + Math.floor(100 / cols) + "%' >" : "</td><td>") : "</td></tr><tr><td>";
            txt += makeNtaptorun(scene);
             //         txt += "id: " + scene.id + "<br>";
			 txt += "&nbsp;status: " + scene.status + "<br>";
             txt += "&nbsp;eseguito (linking): " + scene.running_mode + "<br>";
             txt += "<b>" + scene.name + "</b><br><i>SE</i> ( trigger( <br>";
            //      txt += makeNtaptorun(scene);
            //         txt += "id: " + scene.id + "<br>";
            //       txt += makeTime(scene);
            //       txt += makePreconditions(automation);
            //       txt += makeConditions(automation);
           //        txt += "<b>Se-conditions</b><br>";
            txt += "&nbsp; esegui()   // tap_to_run<br>))<br><i>POI</i>( <br>"
            txt += makeActions(scene);
  		    txt += ")<br>";
            i++;
        }
    });
//   now processes x-tap-to-run:
 let map =[];
 processFree(hID, map);
 console.log("SCENE-TAP-TO-TUN X-MAP", map);
 let nodi = extractNodes(map); 
 let j = 0;
 if (nodi.xtap.length) {
     while (i % cols) {txt +="</td><td>"; i++;};
     txt += (i)?"</td></tr><tr><td>":"";
	 nodi.xtap.forEach((atap) => {
		if (j > 0)
			  txt += (j % cols) ? ((j+i < cols) ? "</td><td width='" + Math.floor(100 / cols) + "%' >" : "</td><td>") : "</td></tr><tr><td>";
		txt += "eseguito (linking): IoTwebUI <br>";
        txt += "<b>" + toPrn(atap) + "</b><br><i>SE</i> ( trigger( <br>";
            //      txt += makeNtaptorun(scene);
            //         txt += "id: " + scene.id + "<br>";
            //       txt += makeTime(scene);
            //       txt += makePreconditions(automation);
            //       txt += makeConditions(automation);
           //        txt += "<b>Se-conditions</b><br>";
        txt += "&nbsp; esegui()   // tap_to_run<br>))<br><i>POI</i> ( <br>"
 	    map.forEach((pair) => {
				if (pair.from.id == atap)
					switch (pair.to.type){    
				    case "device":
 	                case "xdevice":
	        	      txt += "&nbsp; set_device_status( " + getDeviceName(toPrn(pair.to.id)) + ", " + toPrn(pair.action).replace("=",", ") + " ), <br>";
						break;
                    case "auto": 
                    case  "xauto": 
            		   txt += "&nbsp; unknow ( ?? ),<br>";
             					break;
                    case "tap": 
                    case  "xtap": 
					   txt += "&nbsp; start_tap_to_run( " + toPrn(pair.to.id) + " ),<br>";
                       break;					  
                   case "xextra": 
                   case "extra": 
 						    txt += "&nbsp; " + toPrn(pair.to.id) + " ( " + toPrn(pair.action) + " ), <br>";
						break;
                  default: 
					    txt += "&nbsp; " + toPrn(pair.to.id) + " ( " + toPrn(pair.action) + " ),     //  unknow <br>";
						
				}
		 });
		txt += ") <br>"; 
	     j++;
	  });
  }
 
 if (!i && !j) txt += "<br>none!<br>";
 txt += "</td></tr></TABLE>";
 
    return (txt);
}
function makeMeta(hID) {
    let metad = [];
    processFree(hID, metad);
    processTapToRun(hID, metad);
    processAutomation(hID, metad);
	return metad;
 }

function makeCross(hID, map) {
     return makeDot(hID, map);
}

function makeList(hID) {
	let txt = "Full lists as required to update exclusion lists in 'scene03.is'\n\n";
	txt += "// "+tuyaData[hID].name+" home \n" 
	if(tuyaData[hID]['automations'][0]){
		txt += "\n**** Automations: \n";
		tuyaData[hID]['automations'].forEach((automation) => {
			txt += '"' + automation.name + '",\n';
		});
	}
 	if(tuyaData[hID]['scenes'][0]){
        txt += "\n**** Tap-to-run:\n";
		tuyaData[hID]['scenes'].forEach((scene) => {
			txt += '"' + scene.name + '",\n';
		});
	}
    txt += "\n**** x-devices:\n";
    tuyaData[hID]['devices'].forEach((device) => {
        if (device.category == 'x-dev')
            txt += '"' + device.name + '",\n';
    });

    return txt;
}

function makeListAI(xname) {
	let txt = "</pre><pre id='exp'>\n**CSV TABLE - TAP-TO-RUN (TTR) for AI RunTuyaTTR TOOL** \n\n";
	txt += 'N, ORIGIN, NAME \n';
	let i = 1;
	Object.keys(tuyaData).forEach((hID) => {
		if(tuyaData[hID]['scenes'] && tuyaData[hID]['scenes'][0]){
	//		txt += '\n// TTR from ' + tuyaData[hID].name + ': \n';
			tuyaData[hID]['scenes'].forEach((scene) => {
			txt += (i++) +", " + tuyaData[hID].name +', "' + scene.name + '",\n';
			});
		}
	});
	const rules = updateRULEnames();
	if (rules && rules[0]) {
//		txt += '\n// RULES from IoTwebUI: \n';
		rules.forEach((arule) => {
				 txt += (i++) + ", " + 'IoTwebUI, "' + arule + '",\n';
		});
	}
    return txt + "\n// by scene03 addon: 'IoTwebUI."+xname+".action(AIlist)' "+(new Date().toLocaleString('it-IT')) +"\n</pre>" + "<br><button onclick=\"d=document,a=d.createElement('a'),	 a.href='data:text/plain;base64,'+btoa(unescape(encodeURIComponent(d.getElementById('exp').textContent))),a.download='all-TTR-'+Date.now()+'.txt', a.click()\">download</button><pre>";
}

function doClear(xname) {
    SETXDEVICESTATUS(xname, 'home', null);
    SETXDEVICEONLINE(xname, false);
    homeName = null;
    VSET('homeName', homeName);
    for (const homeId of Object.keys(tuyaData)) {
        delete tuyaData[homeId]['automations'];
        if (tuyaData[homeId]['scenes'])
            tuyaData[homeId]['scenes'].forEach((rule) => {
                delete rule.details;
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
