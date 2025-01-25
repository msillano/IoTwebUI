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
// note: LOOPINTERVAL MUST be defined in calling html page!
async function RESTget(url) {
	try {
    const response = await fetch(url);
    if (!response.ok) {
           if(response.status === 404) {
		    response.status = 200;
			   console.log("ERROR *** REST result: 'unfound' on " + url );
			   return {error: "unfound"};
			 }
		else {
			 throw new Error('Network response was not ok. Status: '+response.status);
			 }
       }
	const data = await response.json();
			   if (data.error)
				   console.log("ERROR *** REST result: '"+data.error +"' on " + url );
			   return data;
	}
    catch(error) {
       throw 'There has been a problem with your fetch operation:'+ error;
    };
}
/*
async function RESTget(url) {
  return await fetch(url, { method: 'GET'})
    .then((response) => {
		if (response.ok){
			   let r =  response.json();
			   console.log("result = ", r);
			   if (r.error)
				    VOICE( "Warning: REST result "+ r.error);
			   return r;
		}
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
*/
// Page buiding routines
function  placeWidget(data) {
	if (data.parent)
        return ("<div  style= 'position:relative; top:"+data.xpos+"px; left:" +data.ypos+"px;' id='item"+data.id+"' ></div>");
   return ("<div  style= 'position:absolute; top:"+data.xpos+"px; left:" +data.ypos+"px;' id='item"+data.id+"' ></div>");
}

function dynamicPage() {
     const outputDiv = document.getElementById('dynamic');
     widgets.forEach((item) => {
//		 console.log(item);
  	     let toDiv =  document.getElementById(item.parent) || outputDiv; 
//		 console.log("setting ", toDiv);
	     toDiv.innerHTML += placeWidget(item);
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
