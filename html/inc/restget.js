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
			 return {error:"unknown"};
			 }
		else {
			 throw new Error('Network response was not ok');
			 } 
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
}

