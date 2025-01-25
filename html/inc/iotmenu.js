/*
This file is part of IoTwebUI project (https://github.com/msillano/IoTwebUI)
 Contains js library
 ------------------------------
License MIT
(C)2024 marco.sillano@gmail.com
version 2.0 30/05/2024
*/
// to open a singleton popup
function openMyWind(url, x = 400, y=200, resizable=true){
    let l = Math.floor((screen.width - x) / 2);
    let t = Math.floor((screen.height - y) / 2);
    let stili = " screenY=" + t + ", screenX=" + l + ", popup";
    let testo = window.open(url, url, stili);
	testo.resizeTo(x,y);
	if(! resizable)
		testo.addEventListener("resize", () => {
		  testo.resizeTo(x, y);
		  });
    testo.focus();
 }
