/*
This file is part of IoTrest project (https://github.com/msillano/IoTwebUI/tree/main/RESTserver)
 nodejs background server for IOTwebUI REST interface
 execute:
 'node server.js'  ( in Terminale, nella dir 'rest03.0'
------------------------------
License MIT
(C)2024 marco.sillano@gmail.com
version 3.0 15/01/2025
version 2.2 10/08/2024
*/

'use strict';

// custom system configuration
// const baseREST = "http://localhost:3031/IoTrest/";
const baseREST = "";
const baseMQTT = "mqtt://192.168.100.123";
const subscribeMQTT = "#"

// ---- here custom map:  topic => rest
const topicToRestMapping = {
  // FOR Zigbee HUB mode
  // example. door sensor:
    "zhub/data/a4c13845d63f9fd7/1/0500/0002": {
        description: "Controllo finestra ufficio - x-test",
        lastValue: null,
      //  funzione di crezione URL qui
        handler: (data, thisMap) => {
            if (data.data.val.ha === thisMap.lastValue)
                  return null;
            thisMap.lastValue = data.data.val.ha;
            return (baseREST + "set/x-test/finestra/" + (data.data.val.ha? "aperta":"chiusa"));
          },
      },
    "zhub/data/a4c13845d63f9fd7/1/0001/0021": {
          description: "Batteria finestra ufficio - x-test",
          lastValue: null,
          handler: (data, thisMap) => {
              return handler_battery(data, thisMap, "set/x-test/batteria/");
               },
          },
      "zhub/data/a4c13845d63f9fd7/lqi": {
              description: "lqi finestra ufficio - x-test",
              lastValue: null,
            //  funzione di crezione URL qui
            handler: (data, thisMap) => {
              return handler_lqi(data, thisMap, "set/x-test/lqi/") ;
              },
            },
// Example. Teperature sensor
        "zhub/data/a4c13849baf0f06c/1/0402/0000": {
              description: "Temperatura - x-clima-sala",
              lastValue: null,
            //  funzione di crezione URL qui
              handler: (data, thisMap) => {
                  if (data.data.val === thisMap.lastValue)
                        return null;
                  thisMap.lastValue = data.data.val;
                  return (baseREST + "set/x-clima-sala/Temperatura/" + data.data.val + "°C");
                },
            },
        "zhub/data/a4c13849baf0f06c/1/0405/0000": {
              description: "Umidità - x-clima-sala",
              lastValue: null,
                //  funzione di crezione URL qui
              handler: (data, thisMap) => {
                  if (data.data.val === thisMap.lastValue)
                            return null;
                  thisMap.lastValue = data.data.val;
                  return (baseREST + "set/x-clima-sala/Umidità/" + data.data.val + "%");
                },
            },
        "zhub/data/a4c13849baf0f06c/1/0001/0021": {
                  description: "Batteria clima sala - x-clima-sala",
                  lastValue: null,
                  handler: (data, thisMap) => {
                     return handler_battery(data, thisMap, "set/x-clima-sala/batteria/");
                     },
                },

        "zhub/data/a4c13849baf0f06c/lqi": {
                    description: "lqi clima sala - x-clima-sala",
                    lastValue: null,
                  //  funzione di crezione URL qui
                    handler: (data, thisMap) => {
                      return handler_lqi(data, thisMap, "set/x-clima-sala/lqi/") ;
                      },
                  },

// FOR zigbee2mqtt mode
// example. door sensor:

"zigbee2mqtt/0xa4c13845d63f9fd7": {
  description: "Controllo finestra ufficio - x-test",
  lastValue: null,
//  {"battery":100,"battery_low":false,"contact":true,"linkquality":178,"tamper":false,"voltage":3000}
   handler: (data, thisMap) => {
      if (data.linkquality === thisMap.lastValue)
            return null;
      thisMap.lastValue = data.linkquality;
    // now set all dP.
    addToRestBuffer(baseREST + "set/x-test/batteria/" + data.battery + "%");
    addToRestBuffer(baseREST + "set/x-test/lqi/" + data.linkquality );
    return (baseREST + "set/x-test/finestra/" + (data.contact? "chiusa": "aperta"));
    },

},

"zigbee2mqtt/0xa4c13849baf0f06c": {
  description: "Temperatura - x-clima-sala",
  lastValue: null,
  // {"battery":100,"humidity":63.84,"linkquality":102,"temperature":27.13,"voltage":3000}
  handler: (data, thisMap) => {
     if (data.linkquality === thisMap.lastValue)
           return null;
     thisMap.lastValue = data.linkquality;
   // now set all dP.
   addToRestBuffer(baseREST + "set/x-clima-sala/batteria/" + data.battery + "%");
   addToRestBuffer(baseREST + "set/x-clima-sala/lqi/" + data.linkquality );
   addToRestBuffer(baseREST + "set/x-clima-sala/Umidità/" + data.humidity + "%" );
   return (baseREST + "set/x-clima-sala/Temperatura/" + data.temperature +  "°C");
   },

},
"zigbee2mqtt/0xa4c138e8d1073889": {
  description: "Temperatura - x-external",
  lastValue: null,
  // {"battery":100,"humidity":63.84,"linkquality":102,"temperature":27.13,"voltage":3000}
  handler: (data, thisMap) => {
     if (data.linkquality === thisMap.lastValue)
           return null;
     thisMap.lastValue = data.linkquality;
   // now set all dP.
   addToRestBuffer(baseREST + "set/x-external/batteria/" + data.battery + "%");
   addToRestBuffer(baseREST + "set/x-external/lqi/" + data.linkquality );
   addToRestBuffer(baseREST + "set/x-external/Umidità/" + data.humidity + "%" );
   return (baseREST + "set/x-external/Temperatura/" + data.temperature +  "°C");
   },

},

}
// Handler common functions used by more than one device...
function handler_battery(data, thisMap, topic) {
    if (data.data.val === thisMap.lastValue)
          return null;
    thisMap.lastValue = data.data.val;
    return (baseREST + topic + data.data.val + "%");
  };

  function handler_lqi(data, thisMap, topic){
      if (data.data.val === thisMap.lastValue)
            return null;
      thisMap.lastValue = data.data.val;
        if (data.data.val > 200)
            return (baseREST + topic + data.data.val + " - Excellent");
        if (data.data.val > 150)
            return (baseREST + topic + (data.data.val + " - Good"));
        if (data.data.val > 100)
            return (baseREST + topic + (data.data.val + " - Normal"));
        return (baseREST + topic + (data.data.val + " - Poor"));
    };

// ----------  end custom

// const fetch = require('node-fetch');  //  npm install node-fetch@2
const mqtt  = require("mqtt");

// -------------- MQTT input
const client = mqtt.connect(baseMQTT);
client.on("connect", () => {
  client.subscribe(subscribeMQTT, (err) => {
    if (err)
       console.log("MQTT not found at "+baseMQTT +":1883 - "+ err);
    else
       console.log("Client MQTT connected to "+baseMQTT+":1883");
    });
});

client.on("message", (topic, message) => {
    const handlerConfig = topicToRestMapping[topic];
    if (handlerConfig) {
        try {
            let data = JSON.parse(message.toString());
            const restUrl = handlerConfig.handler(data, handlerConfig);
        //    console.log("URL ",restUrl );
            if (restUrl) {
                // Qui chiameresti il tuo buffer, non direttamente chiamaServerRest
      //          addToRestBuffer({ url: restUrl, topic: topic, originalMessage: data });
      //          chiamaServerRest(restUrl);  // direct
                addToRestBuffer(restUrl)      // via  Queue
            }
        } catch (e) {
            console.error(`ERROR: parsing or handling del messaggio per topic ${topic}: ${e.message}`);
        }
    } else {
         console.log(`INFO: Topic non mappato: ${topic}`);
    }
});

// ---------- REST output
async function chiamaServerRest(rqtPath) {
//  console.log('MQTT RX:', rqtPath);
  try {
    const answer = await getAnswer(rqtPath); // Send data request via ws
    console.log('MQTT TX:', answer);
  return answer;
  } catch (err) {
    console.error('Error fetching data:', err);
    return h.response().code(500).message('Internal Server Error'); // Handle errors gracefully
  }
}

// -----    REST messages Queue
const restQueue = []; // Il tuo buffer / coda
let processingRestQueue = false; // Flag per evitare esecuzioni multiple del timer

function addToRestBuffer(restCallInfo) {
    restQueue.push(restCallInfo);
    console.log('MQTT #'+restQueue.length, restCallInfo);

    // Se non stiamo già processando la coda, avvia il processore
    if (!processingRestQueue) {
        processingRestQueue = true;
        setTimeout(processRestQueue, 100)
    }
}

async function processRestQueue() {
      if (restQueue.length > 0) {
        const restCall = restQueue.shift(); // Estrai il primo elemento (FIFO)
        try {
            // Riutilizza la tua funzione chiamaServerRest
            await chiamaServerRest(restCall);
        } catch (error) {
            console.error(`ERROR: chiamata MQTT per ${restCall}: ${error.message}`);
            // **Importante:** Gestione retry. Puoi rimettere in coda l'elemento
            // con un contatore di tentativi, o in una coda di "fallimenti".
            // Es: restCall.retries = (restCall.retries || 0) + 1;
            // if (restCall.retries < MAX_RETRIES) {
            //     restQueue.push(restCall); // Rimetti in coda per riprovare
            // } else {
            //     console.error(`Max retries reached for ${restCall.url}, discarding.`);
            // }
        }
    }
    // Ri-pianifica la prossima esecuzione solo se ci sono ancora elementi
    // o se il flag processingRestQueue è ancora vero
    if (restQueue.length > 0) {
        setTimeout(processRestQueue, 1000); // Chiama ogni 2 secondi
    } else {
        processingRestQueue = false; // La coda è vuota, ferma il processore
        console.log('INFO: MQTT queue is empty. Processor stopped.');
    }
}


const  _wsport = 3030;
const    _port = 3031;
const    _host = 'localhost';
// ====================================================
const Hapi = require('@hapi/hapi');
// const HapiUrl = require('hapi-url');
const WebSocket = require('ws');
// ----------------------------------
const url0 = "http://"+ _host +":"+ _port+ "/IoTrest/";

// Create Hapi server
const server = Hapi.server({
  port:  _port,
  host: _host,
  routes: { cors: { origin: "ignore" }} // Allow CORS from any origin for development (adjust for production)
});

// Create WebSocket server and track connected client
const wss = new WebSocket.Server({ port: _wsport});
let connectedClient = null;

// Handle WebSocket connections
  wss.on('connection', (ws) => {
  connectedClient = ws;
  console.log('Client UI connected');

  // Handle disconnections gracefully
  ws.on('close', () => {
    connectedClient = null;
    console.log('Client UI disconnected');
  });
});

// Improved getAnswer function using async/await
async function getAnswer(message) {
  if (!connectedClient) {
    throw new Error('No connected client');
  }
  connectedClient.send(message); // Send the request message

  return new Promise((resolve, reject) => {
    connectedClient.onmessage = ({ data }) => {
      resolve(data);
    };
   });
}

// Define HAPI route for fetching all data
server.route({
  method: 'GET',
  path: '/IoTrest/{any*}',
  handler: async (request, h) => {
//	let rqtUrl  =  HapiUrl.current(request);
//	let rqtPath =  decodeURI(rqtUrl.substring(url0.length));
    let rqtPath = decodeURI(request.url.href.substring(url0.length));
    console.log("rqtPath", rqtPath);
 	if ((rqtPath.charAt(rqtPath.length - 1) == '/') ||
	   (rqtPath.charAt(rqtPath.length - 1) == '\\')) {
          rqtPath = rqtPath.substr(0, rqtPath.length - 1);
          }
	console.log('REST RX: ' + rqtPath);

    try {
      const answer = await getAnswer(rqtPath); // Send data request via ws
      console.log('REST TX:', answer);
	  return answer;
    } catch (err) {
      console.error('Error fetching data:', err);
      return h.response().code(500).message('Internal Server Error'); // Handle errors gracefully
    }
  }
});

// Start servers
async function start() {
  try {
    await server.start();
    console.log('Server HAPI running on %s', server.info.uri);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();

// ======================
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
