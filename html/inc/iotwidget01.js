/*
This file is part of IoTwebUI project (https://github.com/msillano/IoTwebUI)
Contains user data and options
------------------------------
License MIT
(C)2024 marco.sillano@gmail.com
version 1.0 09/09/2024
 */

function getDeviceIcon(data, tooltip = false){
  let tmp  =  "<span class='hover'><span class='fa fa-2x' style='color:"+ data.icon.color + "; vertical-align: middle;'>";
  tmp +=  String.fromCharCode(data.icon.code)+"</span>";
  if (tooltip)
     tmp +=  "<span class='tooltip'><b>"+data.name+"</b><br>"+decodeURI(data.tooltip)+"</span></span>";
  else 
     tmp +=  "<span class='tooltip'><b>"+data.name+"</b></span></span>";
return (tmp);
}

function getButton(data, image = false){
	let tmp ="";
	if (image){
	      tmp =  "<button class='imgbutton' style='background-image: url(\"";
 	      tmp += data.image+"\");' onclick='RESTget(\""+baseURL + "execute/" + data.scenerule +"\")' ><span ";
 	      tmp += (data.color? "style ='color : "+data.color+";' ":" ")+ ">"+data.text+"</span></button>";
	} else {
          tmp =  "<input id='button"+ data.id +"' type='button' class='bigbutton' ";
          tmp += "style ='"+(data.color? " color : "+data.color+"; ":"");
          tmp += (data.background? " background-color : "+data.background+"; ":" ") + "' value='"+data.text+"'";
          tmp += " onclick='RESTget(\""+baseURL + "execute/" + data.scenerule +"\" )' />";
    }
    return(tmp); 	
}	



function doIotwidget01(item) {
	 switch(item.type){
		   case "value":
		        RESTget(baseURL + "device/" + item.devId +"/" + item.code)
			        .then(data => {
    			        // document.getElementById('output').innerText = JSON.stringify(data);  // only for test
                        const outputDiv = document.getElementById('item'+ item.id);
                        outputDiv.innerHTML = "<span  class='value' "+(item.color? "style ='color : "+item.color+";' ":"")+ "><b>"+ (data[item.code] || data['error'])+"</b></span>";
 				        });
 				break; 
 				
 		   case "bigvalue":
		        RESTget(baseURL + "device/" + item.devId +"/" + item.code)
			        .then(data => {
        			 //       document.getElementById('output').innerText += JSON.stringify(data);  // only for test
                     const outputDiv = document.getElementById('item'+ item.id);
                        outputDiv.innerHTML = "<span  class='bigvalue' "+(item.color? "style ='color : "+item.color+";' ":"")+ "><b>"+(data[item.code] || data['error'])+"</b></span>";
 				        });
 				break; 
				
 	       case "icon":
		        RESTget(baseURL + "device/" + item.devId +"/dstatus")
			        .then(data => {
         			 //       document.getElementById('output').innerText += JSON.stringify(data);  // only for test
                       const outputDiv = document.getElementById('item'+ item.id);
                        outputDiv.innerHTML = getDeviceIcon(data);
 				        });
 				break; 
 				
 		   case "icotip":
		        RESTget(baseURL + "device/" + item.devId +"/dstatus")
			        .then(data => {
         			 //       document.getElementById('output').innerText += JSON.stringify(data);  // only for test
   	                const outputDiv = document.getElementById('item'+ item.id);
                        outputDiv.innerHTML = getDeviceIcon(data, true);
 				        });
 				break; 
 				
 		   case "bigbutton":
	            let outputDiv1 = document.getElementById('item'+ item.id);
	            outputDiv1.innerHTML = getButton(item);
 				break; 
 	
		   case "imgbutton":
	            let outputDiv2 = document.getElementById('item'+ item.id);
 	            outputDiv2.innerHTML = getButton(item, true);
 				break; 
 				
           default:
               if (doIotwidget02) doIotwidget02 (item);  // extension
		}    		
	
	
} 


