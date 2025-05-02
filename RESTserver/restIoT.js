/*
This file is part of IoTwebUI project (https://github.com/msillano/IoTwebUI)
contains two custom callback functions: getIcon(), filterDP()
------------------------------
License MIT
(C)2024 marco.sillano@gmail.com
per IOTwebUI version 2.2 10/08/2024
 */

// ==================== Interface
function getDeviceList(home = null, room = null) {
	   // in all cases, a device-name list:
    let dlist = {};
    if (home != 'x')
        dlist['home'] = home;
    if (room != 'x')
        dlist['room'] = room;
    dlist['devices']= deviceList((home == 'x')? null:home, (room == 'x')?null:room);
	   // test for 'not found'
    if (dlist.devices.length == 0)
        dlist = {error: "unknown"};
    return JSON.stringify(dlist);
}

function deviceList(home = null, room = null, id = false) {
    // in all cases, a device-name/id list: null == all
   	devices = [];
    // building list
    Object.keys(tuyaData).forEach((dhome) => {
        //	   console.log(" test-home "+ dhome + " = "+ home, room);
        if ((tuyaData[dhome].name == home) || (home === null)) {
            let idRoom = null; // add all
            if (room) {
                let xroom = tuyaData[dhome]['rooms'].filter((aroom) => aroom.name == room);
                idRoom = (xroom[0] && xroom[0].room_id) ? xroom[0].room_id : '???'; // room:none
            }
            //	  console.log(" test-room = "+ idRoom );
            tuyaData[dhome]['devices'].forEach((device) => {
                if ((idRoom == null) || (idRoom == tuyaData[dhome]['device_map'][device.id])){
					if (id)
                       devices.push(device.id);
				    else
                       devices.push(device.name);
				};
            });
        }
    });
   return (devices);
};

function getDeviceInfo(device) {
    // all data from cloud, no status, no online
    let odev = getDeviceFromRef(device);
    if (odev === null)
        return JSON.stringify({error: "unknown"});
	let logx =[];
    odev.status.forEach((rec) => {
 		if (isLogged(odev, rec.code))
		       logx.push(rec.code); 
        });
		/*
 	var tesl =[];
    let k = odev.test; // first test
    do {
        let test = testItems[k];
        if (test) {
         tesl.push(test.status);
		}
	    k = test.next || null; // to next step
    } while (k !== null);
*/
    return JSON.stringify({
        name: odev.name || null,
        id: odev.id,
        product_name: odev.product_name || null,
        category: odev.category || null,
        model: odev.model || null,
        sub: !!(odev.sub),
		logged: logx,
        test:  !(odev.test === null),
		});
};

function getDeviceStatus(device) {
    const oDev = getDeviceFromRef(device);
    if (oDev === null)
        return JSON.stringify({error: "unknown"});
    var rstatus = {};
    oDev.status.forEach((rec) => {
        rstatus[rec.code] = rec.value;
	    });
    const tip =  encodeURI(HTMLTooltip(oDev));
	let ico = null;
	if (oDev.id.startsWith("x-"))
		ico =  getIcon(oDev, "x-device");
	else if (oDev.id.startsWith("vdev"))
		ico =  getIcon(oDev, "virtual");
	else
		ico =  getIcon(oDev, "device", oDev.online);
	// overwrite in alert case
	if (isAlert(oDev) > 1) 
        ico = alertIcon;
   
    ico.code = ico.code.charCodeAt(0);
	/*
	// alarm on list
	var alarmOn =[];
    let k = oDev.test; // first test
    do {
        let test = testItems[k];
        if (test.trigger) {
            alarmOn.push(test.status);
		}
	    k = test.next || null; // to next step
    } while (k !== null);
  */
    return JSON.stringify({
        name: oDev.name || null,
        online: !!(oDev.online),
        status: rstatus,
 		icon : ico,
		tooltip: tip
       });
};
function getDeviceData(device) {
    const oDev = getDeviceFromRef(device);
    if (oDev === null)
        return JSON.stringify({error: "unknown"});
    var rstatus = {};
    oDev.status.forEach((rec) => {
        rstatus[rec.code] = rec.value;
	    });

	var alarmOn =[];
    let k = oDev.test; // first test
    do {
        let test = testItems[k];
        if (test?.trigger) {
            alarmOn.push(test.status);
		}
	    k = test?.next || null; // to next step
    } while (k !== null);
  
    return JSON.stringify({
        name: oDev.name || null,
        online: !!(oDev.online),
		alarms: alarmOn,
        status: rstatus,
       });
};



function getPropertyValue(device, datapoint) {
    let odev = getDeviceFromRef(device);
    if (odev === null)
        return JSON.stringify({error: "unknown device"});
//    let dpx = odev.status.filter((adp) => adp.code === datapoint);
    for(let i = 0; i < odev.status.length; i++){
//	    console.log(odev.status[i].code, (odev.status[i].code == datapoint ) );
	    if (odev.status[i].code == datapoint ) {
             console.log("READ :"+ odev.name +": "+ odev.status[i].code +" = "+  odev.status[i].value);
	   		 let res = {name: odev.name};
    		 res[datapoint] = odev.status[i].value;
             return JSON.stringify(res);
             }
	    }
      /*
    if (dpx[0] !== undefined){
		 let res = {name: odev.name};
		 res[dpx[0].code] = dpx[0].value;
         return JSON.stringify(res);
	     }						                  
    else{
	    */
         console.log("falied dp = ", datapoint, odev);
         return JSON.stringify({error: "unknown dp"});
    //   }
       
    }

function doInfoAlert(device) {
    let odev = getDeviceFromRef(device);
    if (odev === null)
        return JSON.stringify({error: "unknown"});
    let res = {
        name: odev.name || null,
        alarms: []
    };
    let j = odev.test;
    if (j !== null) {
        do {
            res.alarms.push({
                code: testItems[j].status,
                trigger: testItems[j].trigger,
                condition: testItems[j].condition,
                value: testItems[j].value,
                message: testItems[j].message,
                action: testItems[j].action
            });
            j = testItems[j].next; // for all tests (also multiple)
        } while (j !== null);
    };
    return JSON.stringify(res);
};

function getHomeList(home) {
     let slist = {
        homes: [],
     	};
	 Object.keys(tuyaData).forEach((dhome) => {
		slist.homes.push(tuyaData[dhome].name);
	    });
     return JSON.stringify(slist);
    };


function getSceneList(home) {
    let slist = {
        scenes: []
    };
    // building list
    if (home != 'x')
        slist['home'] = home;
    Object.keys(tuyaData).forEach((dhome) => {
        //	   console.log(" test-home "+ dhome + " = "+ home);
        if ((tuyaData[dhome].name == home) || (home == 'x')) {
            tuyaData[dhome]['scenes'].forEach((scene) => {
                slist.scenes.push({
                    name: scene.name,
                    status: scene.status,
                    running_mode: scene.running_mode
                });
            });
        };
    });
    return JSON.stringify(slist);
}

function getRuleList() {
    return JSON.stringify({
        rules: ruleNames
    });
}

function doSceneRule(sceneName) {
    let id = getScene(sceneName);  // case insensitive ?
    if (id != null) {
        setTimeout(doTTR, 50, id);
		REFRESH("cloud");
		return JSON.stringify({done: "scene"});
    }
	const i = ignoreIndexOf(ruleNames, sceneName);
	if ( i >= 0){
//		  console.log('found' + ruleNames[i]);
		 setTimeout(ruleButton, 50, ruleNames[i]);
		 REFRESH();
		 return JSON.stringify({done: "rule"});
		}
		 return JSON.stringify({error: "unknown"});
}

function doSetXdevice(deviceName, code, value ){
    let odev = getDeviceFromRef(deviceName);
    if ( odev && odev.id && odev.id.startsWith("x-")){
		if ((typeof value === 'string') && (value.toLowerCase() === "false"))
			 value = false;
		if ((typeof value === 'string') &&  (value.toLowerCase() === "true"))
			 value = true;		 
		setAnyStatus(odev, code, value);
 		console.log("WRITE : "+code+"/"+value, getDeviceFromRef(deviceName));
        REFRESH();
		return JSON.stringify({done: "set"});
	}
    return JSON.stringify({error: "unknown x-device"});
}

// ====================================================

// Create a WebSocket instance and connect to the server
const socket = new WebSocket('ws://localhost:3030');

function ERRmessage() {
   return JSON.stringify({error: "malformed"});
}

// Event listener for when the WebSocket connection is opened
socket.onopen = function (event) {
    // Alert the user that they are  connected to the WebSocket server
    alert('INFO: Connected to REST server!');
};

// Event listener for when a message is received from the server
socket.onmessage = function (event) {
    // here input route processing
    let parts = (event.data + '/x/x/x/x/x').split('/');
    switch (parts[0]) {
	case 'home':	
		if ((parts[1] == 'list') && (parts[2] == 'x')) {
			sendMessage(getHomeList()); 
		}else
            sendMessage(ERRmessage());
    case 'device':
        if ((parts[1] == 'list') && (parts[4] == 'x')) {
            sendMessage(getDeviceList(parts[2], parts[3])); // can be also 'x'
        } else if ((parts[2] == 'dinfo')  && (parts[3] == 'x')){
            sendMessage(getDeviceInfo(parts[1]));
        } else if ((parts[2] == 'dstatus') && (parts[3] == 'x')) {
            sendMessage(getDeviceStatus(parts[1]));
        } else if ((parts[2] == 'ddata') && (parts[3] == 'x')) {
            sendMessage(getDeviceData(parts[1]));
        } else if ((parts[1] != 'x') && (parts[2] != 'x') && (parts[3] == 'x'))
            sendMessage(getPropertyValue(parts[1], parts[2]));
        else
            sendMessage(ERRmessage());
        break;
     case 'scene':
        if ((parts[1] == 'list')  && (parts[3] == 'x')){
            sendMessage(getSceneList(parts[2])); // can be also 'x'
        } else
            sendMessage(ERRmessage());
        break;
    case 'rule':
        if ((parts[1] == 'list')  && (parts[2] == 'x')) {
            sendMessage(getRuleList());
        } else
            sendMessage(ERRmessage());
        break;
    case 'execute':
        if ((parts[1] != 'x')  && (parts[2] == 'x')){
            sendMessage(doSceneRule(parts[1]));
        } else
            sendMessage(ERRmessage());
        break;
    case 'alert':
        if ((parts[1] == 'list') && (parts[2] != 'x') && (parts[3] == 'x')) {
            sendMessage(doInfoAlert(parts[2]));
        } else
            sendMessage(ERRmessage());
        break;
    case 'set':
        if ((parts[1] != 'x') && (parts[2] != 'x') && (parts[3] != 'x') && (parts[4] == 'x')) {
            sendMessage(doSetXdevice(parts[1],parts[2],parts[3] ));
        } else
            sendMessage(ERRmessage());
        break;

    default:
        sendMessage(ERRmessage());
    };
};

// Event listener for when the WebSocket connection is closed
socket.onclose = function (event) {
    // Log a message when disconnected  from the WebSocket server
    console.log('Disconnected from WebSocket server');
};
// Function to send a message to the WebSocket server
function sendMessage(message) {
    // Send the message to the WebSocket server
    socket.send(message);
};
