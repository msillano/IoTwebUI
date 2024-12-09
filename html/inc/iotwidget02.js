/*
This file is part of IoTwebUI project (https://github.com/msillano/IoTwebUI)
Contains user data and options
------------------------------
License MIT
(C)2024 marco.sillano@gmail.com
version 1.0 09/09/2024
17/11/2024: added clear to chart, added hook() function call.

 */

/*  add to  main (see exaple test02.htl)
<script type="text/javascript" src="inc/restget.js"> </script >
// REQUIRED by iotwidget02
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javascript" src="inc/iotwidget02.js"> </script >
 */

// for meter, comment if not used
google.charts.load('current', {
    'packages': ['gauge']
});
// for linechart, areachart, comment if not used
google.charts.load('current', {
    'packages': ['corechart']
});

const meteroptions = {
    width: 200,
    height: 200,
    minorTicks: 5,
    min: 0,
    max: 100
};

const linechartoptions = {
    width: 600,
    height: 300,
    //     	  curveType: 'function',
    //        hAxis:{textPosition: "none"},
    legend: {
        position: "none"
    },
    backgroundColor: "#DBD396",
    pointSize: 3,
    clear: false,
};

const multichartoptions = {
    width: 600,
    height: 300,
    backgroundColor: "#DBD396",
};

const areachartoptions = {
    width: 600,
    height: 300,
    //     	  curveType: 'function',
    //        hAxis:{textPosition: "none"},
    backgroundColor: "#DBD396",
    pointSize: 3,
};

function getSignal(item, data) {
    let tmp = "<div id = 'but" + item.id + "' class='signal' style='background-image: ";
    //	  console.log(data, " Switch ", data[item.code]);
    if (data[item.code])
        tmp += "url(\"" + item.on.image + "\");'></div>";
    else
        tmp += "url(\"" + item.off.image + "\");'></div>";
    return (tmp);
}

function getSwitch(item, data) {
    let tmp = "<button id = 'but" + item.id + "' class='switch' style='background-image: url(\"";
    //	  console.log(data, " Switch ", data[item.code]);
    if (data[item.code])
        tmp += item.on.image + "\");'  onclick = 'this.style.opacity = 0.5, RESTget(\"" + baseURL + "execute/" + item.on.scenerule + "\");' ></button>";
    else
        tmp += item.off.image + "\");' onclick = 'this.style.opacity = 0.5, RESTget(\"" + baseURL + "execute/" + item.off.scenerule + "\");' ></button>";
    console.log(tmp);
    return (tmp);
}

const maxChart = 120; // 70, 150
var lastswitchstate = null;
var charts = {};
var data = null;
function doIotwidget02(item) {
    switch (item.type) {

    case "signal":
        // green: blob:https://www.freeimages.com/08776ea6-e48e-43f2-bab8-a4a19d584429
        // red: blob:https://www.freeimages.com/08776ea6-e48e-43f2-bab8-a4a19d584429
        //          data = JSON.parse(restHTTP(baseURL + "device/" + item.devId +"/" + item.code));
        //item.dataOK (opzionale) array di calori OK
        RESTget(baseURL + "device/" + item.devId + "/" + item.code)
        .then(data => {
            //		 		console.log('signal:', data);
            //				 console.log('signal0:', item);
            if (item.dataOK && Array.isArray(item.dataOK)) {
                data[item.code] = item.dataOK.includes(data[item.code]); // added 15/11/2024
            }
            //         		console.log('signal2:', data);
            const outputDiv = document.getElementById('item' + item.id);
            outputDiv.innerHTML = getSignal(item, data);
            //                 lastsignl = data[item.code];
            hook(item.id, data[item.code]);
        });
        break;

    case "switch":
        // switch: blob:https://www.freeimages.com/ac360700-395f-45d0-b0f6-bdb864db60af (modified)
        //          data = JSON.parse(restHTTP(baseURL + "device/" + item.devId +"/" + item.code));
        RESTget(baseURL + "device/" + item.devId + "/" + item.code)
        .then(data => {
            //             console.log(data);
            if (lastswitchstate != data[item.code]) {
                const outputDiv = document.getElementById('item' + item.id);
                outputDiv.innerHTML = getSwitch(item, data);
                lastswitchstate = data[item.code];
                hook(item.id, data[item.code]);
            }
        });
        break;

    case "gauge":
        // documentation: https://developers.google.com/chart/interactive/docs/gallery/gauge
        if (typeof(charts[item.id]) !== "object") {
            let mergedopt = {
                ...meteroptions,
                ...item.options
            };
            charts[item.id] = new google.visualization.Gauge(document.getElementById('item' + item.id));
            google.charts.setOnLoadCallback(function () {
                charts[item.id]["data"] = google.visualization.arrayToDataTable([
                            ['Label', 'Value'],
                            [item.label, 0],
                        ]);
                charts[item.id].draw(charts[item.id]["data"], mergedopt);
            });
        } else {
            let mergedopt = {
                ...meteroptions,
                ...item.options
            };
            //                data = JSON.parse(restHTTP(baseURL + "device/" + item.devId +"/" + item.code));
            RESTget(baseURL + "device/" + item.devId + "/" + item.code)
            .then(data => {
                charts[item.id]["data"].setValue(0, 1, parseFloat(data[item.code]));
                charts[item.id].draw(charts[item.id]["data"], mergedopt);
            });
        }
        break;

    case "areachart":
        // documentation: https://developers.google.com/chart/interactive/docs/gallery/areachart
        if (typeof(charts[item.id]) !== "object") { // first call
            let mergedopt = {
                ...areachartoptions,
                ...item.options
            };
            charts[item.id] = new google.visualization.AreaChart(document.getElementById('item' + item.id));
            google.charts.setOnLoadCallback(function () {
                charts[item.id]["data"] = new google.visualization.DataTable();
                charts[item.id]["data"].addColumn('timeofday', 'Time');
                charts[item.id]["data"].addColumn('number', item.tiplabel1);
                charts[item.id]["data"].addColumn('number', item.tiplabel2);
                charts[item.id].draw(charts[item.id]["data"], mergedopt);
            });
        } else { // next calls
            let d = new Date();
            let t = [d.getHours(), d.getMinutes(), d.getSeconds()];
            let d1 = null;
            if (item.clear) {
                charts[item.id]["data"] = new google.visualization.DataTable();
                charts[item.id]["data"].addColumn('timeofday', 'Time');
                charts[item.id]["data"].addColumn('number', item.tiplabel1);
                charts[item.id]["data"].addColumn('number', item.tiplabel2);
                item['clear'] = false;
            }
            while (charts[item.id]["data"].getNumberOfRows() >= item.maxPoint) {
                charts[item.id]["data"].removeRow(0);
            }
            let mergedopt = {
                ...areachartoptions,
                ...item.options
            };
            //                 data = JSON.parse(restHTTP(baseURL + "device/" + item.devId1 +"/" + item.code1));
            RESTget(baseURL + "device/" + item.devId1 + "/" + item.code1)
            .then(data => {
                if (data[item.code1] != undefined) {
                    if (item.field1) {
                        d1 = parseFloat(data[item.code1][item.field1]);
                    } else {
                        d1 = parseFloat(data[item.code1]);
                    }

                    //                       data = JSON.parse(restHTTP(baseURL + "device/" + item.devId2 +"/" + item.code2));
                    RESTget(baseURL + "device/" + item.devId2 + "/" + item.code2)
                    .then(data => {
                        if ((data[item.code2] !== undefined) && (d1 !== null)) {
                            if (item.field2) {
                                charts[item.id]["data"].addRow([t, d1, parseFloat(data[item.code2][item.field2])]);
                            } else {
                                charts[item.id]["data"].addRow([t, d1, parseFloat(data[item.code2])]);
                            }
                            charts[item.id].draw(charts[item.id]["data"], mergedopt);
                        }
                    });
                }
            });
        }
        break;

    case "linechart":
        // documentation: https://developers.google.com/chart/interactive/docs/gallery/linechart
        if (typeof(charts[item.id]) !== "object") {
            let mergedopt = {
                ...linechartoptions,
                ...item.options
            };
            charts[item.id] = new google.visualization.LineChart(document.getElementById('item' + item.id));
            google.charts.setOnLoadCallback(function () {
                charts[item.id]["data"] = new google.visualization.DataTable();
                charts[item.id]["data"].addColumn('timeofday', 'Time');
                charts[item.id]["data"].addColumn('number', item.tiplabel);
                charts[item.id].draw(charts[item.id]["data"], mergedopt);
            });
        } else {
            let d = new Date();
            let t = [d.getHours(), d.getMinutes(), d.getSeconds()];
            let mergedopt = {
                ...linechartoptions,
                ...item.options
            };
            if (item.clear) {
                charts[item.id]["data"] = new google.visualization.DataTable();
                charts[item.id]["data"].addColumn('timeofday', 'Time');
                charts[item.id]["data"].addColumn('number', item.tiplabel);
                item['clear'] = false;
            }
            while (charts[item.id]["data"].getNumberOfRows() >= item.maxPoint) {
                charts[item.id]["data"].removeRow(0);
            }
            //                  data = JSON.parse(restHTTP(baseURL + "device/" + item.devId +"/" + item.code));
            RESTget(baseURL + "device/" + item.devId + "/" + item.code)
            .then(data => {
                if (data[item.code] != undefined) {
                    if (item.field) {
                        charts[item.id]["data"].addRow([t, parseFloat(data[item.code][item.field])]);
                    } else {
                        charts[item.id]["data"].addRow([t, parseFloat(data[item.code])]);
                    }
                    charts[item.id].draw(charts[item.id]["data"], mergedopt);
                };
            });
        }
        break;

    case "multichart":
        // documentation: https://developers.google.com/chart/interactive/docs/gallery/linechart
        // all values of one device (x-device)
        // added option filter code[] 04/12/2024
        if (typeof(charts[item.id]) !== "object") {
            let mergedopt = {
                ...multichartoptions,
                ...item.options
            };
            charts[item.id] = new google.visualization.LineChart(document.getElementById('item' + item.id));
            //                  data = JSON.parse(restHTTP(baseURL + "device/" + item.devId +"/dstatus"));
            RESTget(baseURL + "device/" + item.devId + "/dstatus")
            .then(data => {
                google.charts.setOnLoadCallback(function () {
                    charts[item.id]["data"] = new google.visualization.DataTable();
                    charts[item.id]["data"].addColumn('timeofday', 'Time');
                    if (item.code && Array.isArray(item.code)) {
                        for (const option of Object.keys(data.status)) {
                            if (item.code.includes(option))
                                charts[item.id]["data"].addColumn('number', option);
                        }
                    } else {
                        for (const option of Object.keys(data.status)) {
                            charts[item.id]["data"].addColumn('number', option);
                        }
                    }
                    charts[item.id].draw(charts[item.id]["data"], mergedopt);
                });
            });
        } else {
            let d = new Date();
            let t = [[d.getHours(), d.getMinutes(), d.getSeconds()]];
            let mergedopt = {
                ...multichartoptions,
                ...item.options
            };
     //   graph moves to left 
            while (charts[item.id]["data"].getNumberOfRows() >= item.maxPoint) {
                charts[item.id]["data"].removeRow(0);
            }
            //                  data = JSON.parse(restHTTP(baseURL + "device/" + item.devId +"/dstatus"));
            RESTget(baseURL + "device/" + item.devId + "/dstatus")
            .then(data => {
  // clear implementation				
   			    if (item.clear &&  charts[item.id]["data"]) {
 			    	let n =  charts[item.id]["data"].getNumberOfRows();
					if (n > 5){
						charts[item.id]["data"].removeRows(0, n);
					    console.log("day change clear");
                        }
                    item['clear'] = false;
                    }
                if (item.code && Array.isArray(item.code)) {
                    used = [];
                    for (const x of item.code) {
                        used[x] = data.status[x];
                        //		console.log (x, data.status[x]);
                    }
                    //		 console.log (data.status, used);
                    update = [...t, ...Object.values(used)];
                } else {
                    update = [...t, ...Object.values(data.status)];
                }
                for (i = 1; i < update.length; i++) {
                    update[i] = parseFloat(update[i]); // string to number
                }
                //            console.log(update) ;
                charts[item.id]["data"].addRow(update);
                charts[item.id].draw(charts[item.id]["data"], mergedopt);
            });
        }
        break;

        // to auto-extend widget library
    default:
        if (typeof(window.doIotwidget03) === "function") {
            doIotwidget03(item);
        } // extension

    }

}

