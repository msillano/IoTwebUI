
/*
Semplice esempio (blink) di modding di 'smart relay Tuya' usando ESP8266:
1) Obiettivo lo smart relay funziona come lampeggiatore. (nota: NON usare tempi brevi (> 6s) altrimentri alcuni device si resettano.)
2) Comandi extra via URL HTTP:
  - http://192.168.X.X/  set il modo HTML (browser): ritorna una pagina WEB con la configurazione attuale e la possibilità di modificarla.
  - http://192.168.X.X/ON   REST per attivare il lampeggiatore
  - http://192.168.X.X/OFF  REST per spegnere il lampeggiatore
  - http://192.168.X.X/ESPtuya?time=XXXX (ms) REST per impostare il tempo (periodo, duty cycle 50%)
vedi articolo: https://github.com/msillano/IoTwebUI/blob/main/DIY%20ESP3266/Modding%20switch/LEGGIMI.md
Riferimenti:
vedi: https://github.com/msillano/tuyaDEAMON-applications/wiki/note-5:-Watchdog-for-IOT#basic-wifi-arduino)  
vedi: https://github.com/msillano/Ozone-coronavirus-sonoff/tree/master/PROJECTS-DIY/timerPDM (logica AP startup)
vedi: https://www.elektormagazine.de/news/eineinfacher2wlanschalterderfunktioniert
vedi: https://github.com/arduino/esp8266/blob/master/libraries/ESP8266WiFi/examples/WiFiWebServer/WiFiWebServer.ino
vedi: https://docs.arduino.cc/library-examples/wifi-library/WiFiWebServer

------------------------------
License MIT
(C)2025 marco.sillano@gmail.com
ver 01.0 15/03/2025
*/

#include <ESP8266WiFi.h>
//  see https://arduino-esp8266.readthedocs.io/en/latest/esp8266wifi/readme.html
#include <arduino-timer.h>  // blink requires arduino-timer library
//  see https://github.com/contrem/arduino-timer
//uncomment this for echo serial debug
 //#define SERIALDBG 1
// =====  CONFIGURATION
// const char* ssid     = "******";     // fill in here your router or wifi SSID
// const char* password = "******"; // fill in here your router or wifi password

const char* ssid = "Vodafone-work";  // fill in here your router or wifi SSID
const char* password = "ciroguest";  // fill in here your router or wifi password

IPAddress ip(192, 168, 1, 23);       // fill in here the desired IP Address
IPAddress gateway(192, 168, 1, 1);   // set gateway to match your network
IPAddress subnet(255, 255, 255, 0);  // set subnet mask to match your network
WiFiServer server(80);               // WEB port 80
// === configuration ends

//-------------------------
int relay = 0;  // ESP01-relay uses GPIO 0;
String outStile = "none";
// ========================  HERE also USER vars, if required
bool running = false;
long looptime = 6000;  // default 6s, fastest
bool output = false;
auto timer = timer_create_default();
Timer<>::Task task = 0;

// ====== TASK (blinking) functions
bool functionToggle(void* argument) {
  output = !output;
  if (running) {
    digitalWrite(relay, output ? HIGH : LOW);
    digitalWrite(LED_BUILTIN, output ? HIGH : LOW);
  }
  return true;  // to repeat the action - false to stop
}


// ====== HTML-REST EXECUTION FUNCTION
boolean doExecuteON() {
  running = true;
  digitalWrite(relay, output ? HIGH : LOW);
  digitalWrite(LED_BUILTIN, output ? HIGH : LOW);
  return true;  // return true: OK
}

boolean doExecuteOFF() {
  running = false;
  digitalWrite(relay, HIGH);
  digitalWrite(LED_BUILTIN, HIGH);
  return true;  // return true: OK
}

boolean doExecuteTime(String s) {
  String xvalue = s.substring(s.indexOf('=') + 1, s.lastIndexOf(' '));
  long x = xvalue.toInt();
  //  Serial.println(xvalue + " => " + String(x));
  if (x > 1999) {
    looptime = x;
    timer.cancel(task);
    task = timer.every(looptime / 2, functionToggle);
    output = false;
    digitalWrite(relay, LOW);
    digitalWrite(LED_BUILTIN, LOW);

    return true;
  }
  return false;  // return true: OK
}

int HTMLMode = 0;
void doHTMLAnswer(WiFiClient client, String mode) {
  if (mode == "none") return;
  // HTTP headers always start with a response code (e.g. HTTP/1.1 200 OK)
  // and a content-type so the client knows what's coming, then a blank line:

  if (mode == "UNK") {  // not allowed request!
    client.print("HTTP/1.1 404 Not Found\r\nContent-Type: text/plain\r\n\r\nNot found.\n");
    client.stop();
     return;
  }
  // WEB UI page:
  String p = "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n<!DOCTYPE HTML>\r\n<html>\r\n";
  p += "<head>\r\n<title>ESP8266 Tuya modding</title>\r\n</head>\r\n<body>\r\n";
  p += "<h2>ESPtuya blink test</h2>";
  p += "<form action='./ESPtuya' method='GET'>Period &nbsp;&nbsp; <input type='text' id='loop' name='loop' size=10  value=" + String(looptime);
  p += "> &nbsp;&nbsp; <input type=submit value='save'> </form><p><hr>\r\n";
  if (running) {
    p += "Actual status: RUN<p>\r\n";
  } else {
    p += "Actual status: STOP<p>\r\n";
  }
  p += "&nbsp; <input type='submit' value='RUN' style='width:100px;height:45px;' onClick=location.href='/ON'>\r\n";
  p += "&nbsp;&nbsp; <input type='submit' value='STOP' style='width:100px;height:45px;' onClick=location.href='/OFF'>\r\n";
  p += "<p>\r\n</body>\r\n</html>\n";
  // only text shot status
  String p2 = "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\n" + mode + "\n" ;
  if (mode == "HTML" || HTMLMode) {  // if started using HTML page, continue
    HTMLMode = 1;
    client.println(p);
  } else
    client.println(p2);  // REST answer
}

// ------------------------
void setup() {
  //  HW setup
  pinMode(relay, OUTPUT);        // set the OUTPUT pin mode
  digitalWrite(relay, HIGH);     // relay OFF, active low
  pinMode(LED_BUILTIN, OUTPUT);  // set builtin LED
  digitalWrite(LED_BUILTIN, 0);  // LED ON: active low

// We start by connecting to a WiFi network
#if defined(SERIALDBG)
  Serial.begin(9600);
  delay(1000);
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
#endif
  WiFi.config(ip, gateway, subnet);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
#if defined(SERIALDBG)
    Serial.print(".");
#endif
  }
#if defined(SERIALDBG)
  Serial.println();
  Serial.println("WiFi connected.");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
#endif
  server.begin();
  // ========================  HERE  USER setup
  task = timer.every(looptime / 2, functionToggle);
}


void loop() {
  // ========================  HERE also USER loop, if required
  timer.tick();
  // rest&HTL interfaces
  WiFiClient client = server.available();  // listen for incoming clients
  if (!client) {
    return;
  }  // if you get a client,
  // Serial.println("New Client.");  // print a message out the serial port
  outStile = "none";
  String readString = client.readStringUntil('\r');

  // ======== HERE USER CODE: selector for allowed URLs (REST etc..)
  // Serial.println(readString);

  if (!readString.startsWith("GET ")) {
    //  Serial.println("invalid request");
    client.stop();
    return;
  }

  if (readString.startsWith("GET / ")) {
    // nothing todo: starts HTML mode
    outStile = "HTML";
#if defined(SERIALDBG)
    Serial.print("RX-HTML: ");  // serial ECHO
    Serial.println(readString);
#endif
    //         break;
  } else if (readString.startsWith("GET /OFF ")) {
    doExecuteOFF();
    outStile = "OK";
#if defined(SERIALDBG)
    Serial.print("RX-OFF: ");  // serial ECHO
    Serial.println(readString);
#endif
  } else if (readString.startsWith("GET /ON ")) {
    doExecuteON();
    outStile = "OK";
#if defined(SERIALDBG)
    Serial.print("RX-ON: ");  // serial ECHO
    Serial.println(readString);
#endif
  } else if (readString.startsWith("GET /ESPtuya?loop=")) {
    if (doExecuteTime(readString))
      outStile = "OK";
    else
      outStile = "BAD";
#if defined(SERIALDBG)
    Serial.print("RX-URL: ");  // serial ECHO
    Serial.println(readString);
#endif
  } else {  // catchall case
    outStile = "UNK";
#if defined(SERIALDBG)
    Serial.print("RX-UNK: ");  // serial ECHO
    Serial.println(readString);
#endif
  }

while (client.available()) {
    // byte by byte is not very efficient
    client.read();
  }
  doHTMLAnswer(client, outStile);
  delay(1);
  // close the connection:
  client.stop();
}
