/*
This file is part of IoTwebUI project (https://github.com/msillano/IoTwebUI)
Contains user data and options
------------------------------
License MIT
(C)2024-2025 marco.sillano@gmail.com
version 3.0 15/01/2025
*/

// ============ stuff REQUIRED for DYNAMIC WIDGETs
const RESTINTERVAL =    701;           // (prime number)  
// to speedup starup (tuned for every page)
const LOOPINTERVAL_START =  7177;      // start: fast (7 s >> RESTINTERVAL x number(IoTwidgets)
const LOOPINTERVAL_RUN =  60001;       // run: standard (60 s) REFRESH USER INTERFACE LOOP
var   LOOPINTERVAL =  LOOPINTERVAL_START;    

function fastRun(){
// to speedup starup (tuned for every page)
// called for every widget loop, for extra processes 
// start speedup, slow after 5 loops	
	     if (lcount < 10){
			lcount++;
			if( lcount > 5)
				LOOPINTERVAL =  LOOPINTERVAL_RUN; 
			};
};
// feedbach button pressed sound
function key(){
    var audio = new Audio("inc/click-104721.mp3");  // click sound
    audio.play();
}
