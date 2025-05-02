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

