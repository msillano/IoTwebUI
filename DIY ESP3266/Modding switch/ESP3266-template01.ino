/*
This template for ESP8266 can be used for modding Tuya switches (1 output - relay)
see https://github.com/msillano/tuyaDEAMON-applications/wiki/note-9:-Modding-Tuya-smart-Switches
Basically it makes the WiFi connection, to be able to manage commands and configuration from the outside with URL,
with two protocols: HTTP-REST and WEB, depending on the needs (For a complete picture see
https://github.com/msillano/tuyaDEAMON-applications/wiki/note-5:-Watchdog-for-IOT#basic-wifi-arduino)
Intended for custom applications, it provides for the setting of connection parameters (SSID, pass etc..)
with constants directly in the code. However, an extension with dynamic configuration at startup (AP mode) is possible,

The changes to be made to this sketch are of two types:
A) Add the logic related to the 'USER' application.
B) Enter the required connection parameters (SSID, pass, IP etc...) as 'CONFIG'
// see https://github.com/msillano/IoTwebUI/blob/main/DIY%20ESP3266/Modding%20switch/README.md
more:
// see https://www.elektormagazine.de/news/eineinfacher2wlanschalterderfunktioniert
// see https://github.com/arduino/esp8266/blob/master/libraries/ESP8266WiFi/examples/WiFiWebServer/WiFiWebServer.ino
// see https://docs.arduino.cc/library-examples/wifi-library/WiFiWebServer
------------------------------
License MIT
(C)2025 marco.sillano@gmail.com
ver 01.0 15/03/2025
*/
#include <ESP8266WiFi.h>
//  see https://arduino-esp8266.readthedocs.io/en/latest/esp8266wifi/readme.html

// =====  CONFIGURATION
// const char* ssid     = "******";     // fill in here your router or wifi SSID
// const char* password = "******"; // fill in here your router or wifi password

const char* ssid = "Vodafone-work";  // fill in here your router or wifi SSID
const char* password = "ciroguest";  // fill in here your router or wifi password

IPAddress ip(192, 168, 1, 23);       // fill in here the desired IP Address
IPAddress gateway(192, 168, 1, 1);   // set gateway to match your network
IPAddress subnet(255, 255, 255, 0);  // set subnet mask to match your network
WiFiServer server(80);               // standard WEB port 80
// === configuration ends

//-------------------------
// ========================  HERE also USER vars, if required

int relay = 0;  // ESP01-relay uses GPIO 0;
String outStile = "none";

// ====== HERER MORE USER FUNCTIONS - COMMAND IMPLEMENTATION
/*
boolean doExecuteSome() {
  ... more
  return true;  // return true: OK
}
*/

void doHTMLAnswer(WiFiClient client, String mode) {
  if (mode == "none") return;
  // HTTP headers always start with a response code (e.g. HTTP/1.1 200 OK)
  // and a content-type so the client knows what's coming, then a blank line:
   if (mode == "UNK") {  // not allowed request!
    client.print("HTTP/1.1 404 Not Found\r\nContent-Type: text/plain\r\n\r\nNot found.\n");
    client.stop();
    return;
  }

  // Simple EXAMPLE: returns 'mode'. For more answers see modding-ESP.ino
  String s = "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\n" + mode + "\n";
  client.println(s);
  //  Serial.print("**TX: ");  // serial ECHO
  //  Serial.println(s);
}

// ------------------------
void setup() {
  // ========================  HERE also USER setup, if required
  //  HW setup
  Serial.begin(9600);
  pinMode(relay, OUTPUT);        // set the OUTPUT pin mode
  digitalWrite(relay, HIGH);     // relay OFF, active low
  pinMode(LED_BUILTIN, OUTPUT);  // set builtin LED
  digitalWrite(LED_BUILTIN, 0);  // LED ON: active low

  delay(1000);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.config(ip, gateway, subnet);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("WiFi connected.");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  server.begin();
}


void loop() {
  // ========================  HERE also USER loop, if required
  WiFiClient client = server.available();  // listen for incoming clients
  if (!client) {
    return;
  }                               // if you get a client,
  Serial.println("New Client.");  // print a message out the serial port
  outStile = "none";
  String readString = client.readStringUntil('\r');
  // ======== HERE USER CODE: selector for allowed URLs (REST etc..)
  if (!readString.startsWith("GET ")) {
    //  Serial.println("invalid request");
    client.stop();
    return;
  }

  /*
   // EXAMPLE, a a REST command
    if (readString.startsWith("GET /OFF")) {
    doExecuteOFF();
    outStile = "OK";
  } else {  // catchall case
    Serial.println("invalid request");
    outStile = "UNK";  }
*/
  while (client.available()) {
    // byte by byte is not very efficient
    client.read();
  }

  Serial.print("**RX: ");  // serial ECHO
  Serial.println(readString);
  doHTMLAnswer(client, outStile);
  delay(1);
  // close the connection:
  client.stop();
}
