/*
This file is part of IoTwebUI project (https://github.com/msillano/IoTwebUI)
 Contains js library
 ------------------------------
License MIT
(C)2024 marco.sillano@gmail.com
version 2.0 30/05/2024
*/

// REST simple client for IOTwebUI
// DO NOT CHANGE: see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
function RESTget(url) {
  return fetch(url, { method: 'GET'})
    .then(response => {
		if (response.ok)
			   return response.json();
		else if(response.status === 404) {
		     response.status = 200;
			   return {error: "unknown"};
			 }
		else {
			 throw new Error('Network response was not ok');
			 }
    })
    .catch(error => {
       console.error('There has been a problem with your fetch operation:', error);
    });
}

// Page buiding routines
function  placeWidget(data) {
    return ("<div  style= 'position:absolute; top:"+data.xpos+"px; left:" +data.ypos+"px;' id='item"+data.id+"' ></div>");
}

function dynamicPage() {
     const outputDiv = document.getElementById('dynamic');
     widgets.forEach((item) => {
	     outputDiv.innerHTML += placeWidget(item);
     });
}
var mainTimer = null;
var oldLOOP = null;

function widgetUpdate(pos = 0) {
//	   console.log('widget #'+pos);
// added to allow LOOPINTERVAL changes
     if (pos == 0) {
  //       console.log("old - new", oldLOOP, LOOPINTERVAL);
		 if (oldLOOP != LOOPINTERVAL) {
			 clearInterval(mainTimer);
			 oldLOOP = LOOPINTERVAL;	
			 console.log("new LOOP: "+ LOOPINTERVAL); 		 
			 mainTimer =  setInterval(widgetUpdate, (LOOPINTERVAL)); 
		 }
	 }
	 if (pos >= widgets.length) return;
     const item = widgets[pos];
          if (typeof(window.doIotwidget01) === "function") {doIotwidget01 (item);}  // extension
     else if (typeof(window.doIotwidget02) === "function") {doIotwidget02 (item);}  // extension
     else if (typeof(window.doIotwidget03) === "function") {doIotwidget03 (item);}  // extension
     else if (typeof(window.doIotwidget04) === "function") {doIotwidget04 (item);}  // extension
     setTimeout(widgetUpdate, (RESTINTERVAL), ++pos);    // ms interval between REST call, defined in the APP HTML page
     }


// ===========  START FUNCTION


function startup() {
     dynamicPage();
 // data refresh
	 oldLOOP = LOOPINTERVAL;	
	 console.log("start LOOP: "+ LOOPINTERVAL); 		 
     mainTimer =  setInterval(widgetUpdate, (LOOPINTERVAL));     
     widgetUpdate();	 // 
     }
