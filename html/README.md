## IoTwebUI HTML stuff
[versione italiana](https://github.com/msillano/IoTwebUI/blob/main/html/LEGGIMI.md)

Using the [RESTserver](https://github.com/msillano/IoTwebUI/blob/main/RESTserver/LEGGIMI-REST22.md) a client can:
1. Access the data of the Tuya and x-device devices in IoTwebUI
2. Launch a scene ('tap-tro-run) or a RULE (with name).

The simplest application of these features is the creation of user interfaces in HTML (WEB) as a REST client.<br>
Here we have a collection of examples:

a) **Widget Libraries**: they have the particularity that it is enough to place a widget with two numbers (x, y) in a web page with a background:
the update and the operation is automatic. All the example pages are made with this fast and simple technique.<br>
They reside in the dir `html/inc/`:
* **iotwidget01.js** offers 6 widgets: icon, icotip, value, bigvalue, bigbutton, imgbutton
* **iotwidget02.js** new 6 widgets: signal, switch, gauge, linechart, multichart, areachart.
* _iotwidget01.css_ required by `iotwidget01.js`
* _restget.js_ required by `iotwidget01.js` and `iotwidget02.js`

b) **Usage examples** ( dir `html/`)
* **clima01.html** example of a possible UI, uses only `iotwidget01.js` and, as a backend, the x-device `clima01-xdevice.js`. Uses real devices as the data source (requires customization).
For details see [clima01-readme](https://github.com/msillano/IoTwebUI/blob/main/html/clima01-readme.md) with information about the MPV pattern used!
* **test02.html** only to show the widget's look and feel: uses only `iotwidget02.js` and uses real devices as the data source (requires customization).
For details see [test02-readme](https://github.com/msillano/IoTwebUI/blob/main/html/test02-readme.md)
* **tester01.html** real WEB APP, for testing NI-MH batteries. see [TestBattery01_leggimi](https://github.com/msillano/IoTwebUI/blob/main/addon/TestBattery01_leggimi.pdf)
Requires ad hoc HW, TY-08Z device, cloner01, testbattery01, iotwidget01.js, iotwidget02.js<br>
In the documentation, there is also a hint about the process of developing custom APPs using Tuya + IoTwebUI.
In addition, in the dir, there are some graphic files required by the examples.
