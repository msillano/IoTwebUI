REM @echo off
setlocal enabledelayedexpansion

::: ========================================================
::: IoTwebUI AI Launcher - Windows Configuration
::: Version 1.0 | Updated: 2025-04-25
::: You can try also the add-on "Cross Domain - CORS" 
:::     see https://github.com/msillano/TuyaUIweb/issues/4
::: ========================================================

::: **************************
::: *** UPDATE CONFIGURATION *
::: **************************
:: Usa '/' per percorsi interni allo script e URL
SET "browser=C:/Program Files/Google/Chrome/Application/chrome.exe"
SET "IoTwebUIAIDIR=D:/xampp/htdocs/testvis/IoTwebUI.3.0/IoTwebUI AI/chatbot"
::: =========== more:
SET "appPage=/IoTwebUIAI.html"  :: Percorso relativo con '/'
SET "chromeProfile=C:/tmp/chrome"

::: ***************************
::: *** COMMAND LINE ARGUMENTS *
::: ***************************
SET mode=WINDOW
if "%~1"=="/kiosk" SET mode=KIOSK
if "%~1"=="/?" (
    echo Usage: %~nx0 [/kiosk] [/help]
    echo   /kiosk  - Starts in fullscreen kiosk mode
    echo   /help   - Shows this help message
    exit /b 0
)
SET "chromeProfile=!chromeProfile!!mode!"
::: **********************
::: *** SYSTEM CHECKS *
::: **********************
:: Converti percorsi a Windows-style (con '\') dove necessario
SET "IoTwebUIAIDIR_WIN=!IoTwebUIAIDIR:/=\!"
SET "serverDir_WIN=!serverDir:/=\!"
echo === Verifying system requirements ===

:: Check server.js installation
if not exist "!IoTwebUIAIDIR!\server02.js" (
    echo [ERROR] File server02.js non trovato in: !IoTwebUIDIR!/
    exit /b 1
)

:: Check Chrome installation
if not exist "%browser%" (
    echo [ERROR] Chrome not found at: %browser%
    echo Please verify installation or update the path in the script
    exit /b 1
)

:: Check WMIC availability
wmic /? >nul 2>nul
if %errorlevel% neq 0 (
    echo [WARNING] WMIC not available - using basic process check
    tasklist | find /i "node.exe" >nul && (
        echo [INFO] node.exe process found (WMIC not available for detailed check)
        goto :server_running
    )
) else (
    :: Enhanced process check
    wmic process where "name='node.exe'" get commandline 2>nul | findstr /C:"server02.js" > nul
    if %errorlevel% equ 0 goto :server_running
)

::: ********************
::: *** START SERVER *
::: ********************
echo === Starting REST server ===
cd /d "%IoTwebUIAIDIR%" 2>nul || (
    echo [ERROR] Can't access server directory: %IoTwebUIAIDIR%
    exit /b 1
)

start "IoTwebUIAI Server" /min cmd /c "node server02.js"
echo Waiting for server initialization...
ping -n 6 127.0.0.1 >nul

:server_running

::: ************************
::: *** CHROME CONFIGURATION *
::: ************************
echo === Launching Chrome in %mode% mode ===

:: Common settings for all modes
SET "CHROME_SETTINGS=--disable-web-security"
SET "CHROME_SETTINGS=!CHROME_SETTINGS! --user-data-dir="%chromeProfile%""
SET "CHROME_SETTINGS=!CHROME_SETTINGS! --hide-scrollbars"
SET "CHROME_SETTINGS=!CHROME_SETTINGS! --disable-popup-blocking"
SET "CHROME_SETTINGS=!CHROME_SETTINGS! --auto-accept-camera-and-microphone-capture"
SET "CHROME_SETTINGS=!CHROME_SETTINGS! --app="%IoTwebUIAIDIR%%appPage%""

:: Mode-specific settings
if "%mode%"=="KIOSK" (
    SET "CHROME_SETTINGS=!CHROME_SETTINGS! --kiosk"
    echo Starting in KIOSK mode -Alt+F4 to exit-
) else (
    SET "CHROME_SETTINGS=  --new-window --window-size=600,600 !CHROME_SETTINGS! "
    echo Starting in WINDOW mode
)

::: ********************
::: *** LAUNCH BROWSER *
::: ********************
start "" "%browser%" %CHROME_SETTINGS% 

::: **********************
::: *** CLEANUP & EXIT *
::: **********************

exit /b 0