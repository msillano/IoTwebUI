#!/bin/bash

# ========================================================
# IoTwebUI Launcher - macOS Configuration 10.11.6 (El Capitan) 
# Version 3.1 | Updated: 2025-06-29
# ========================================================

# **************************
# *** UPDATE CONFIGURATION *
# **************************
# Use '/' for internal script paths and URLs
BROWSER_APP_PATH="/Applications/Google Chrome.app" # Path to the Chrome application bundle
# CHROME_EXECUTABLE_PATH="${BROWSER_APP_PATH}/Contents/MacOS/Google Chrome" # The actual executable inside the bundle

# This is the new, simplified path
# APP_FULL_PATH="/Applications/IoTwebUI3.3/IoTwebUI.html"
APP_FULL_PATH="/Applications/IoTwebUI3.3/appPage.html"

# =========== more:
SERVER_DIR="rest03.1"       # This is a relative path to the IoTwebUI base directory
IOTWEBUI_BASE_DIR="/Applications/IoTwebUI3.3/" # IMPORTANT: Update  to your actual macOS dir
# Using a consistent profile directory from your example
# CHROME_PROFILE="${HOME}/Library/Application Support/ChromeProfiles/IoTwebUI_Profile"
# CHROME_PROFILE="${HOME}/tmp/google"
# CHROME_PROFILE="${HOME}/tmp/chrome_dev_test"
  CHROME_PROFILE="/tmp/chrome_dev_test"

# ***************************
# *** COMMAND LINE ARGUMENTS *
# ***************************
MODE="WINDOW" # Default mode
if [[ "$1" == "/kiosk" ]]; then
    MODE="KIOSK"
elif [[ "$1" == "/?" ]]; then
    echo "Usage: $(basename "$0") [/kiosk] [/?]"
    echo "  /kiosk  - Starts in fullscreen kiosk mode"
    echo "  /?      - Shows this help message"
    exit 0
fi

# **********************
# *** SYSTEM CHECKS *
# **********************
echo "=== Verifying system requirements ==="

# Check server.js installation (path based on IOTWEBUI_BASE_DIR + SERVER_DIR)
if [[ ! -f "${IOTWEBUI_BASE_DIR}${SERVER_DIR}/server.js" ]]; then
    echo "[ERROR] File server.js not found in: ${IOTWEBUI_BASE_DIR}${SERVER_DIR}"
    exit 1
fi

# Check Chrome installation using the .app bundle path
if [[ ! -d "${BROWSER_APP_PATH}" ]]; then
    echo "[ERROR] Google Chrome application not found at: ${BROWSER_APP_PATH}"
    echo "Please verify installation or update the path in the script."
    exit 1
fi

# Check if the specific app HTML file exists
if [[ ! -f "${APP_FULL_PATH}" ]]; then
    echo "[ERROR] App HTML file not found at: ${APP_FULL_PATH}"
    echo "Please verify the path or update APP_FULL_PATH in the script."
    exit 1
fi

# Check for existing node.js server process
if pgrep -f "node server.js" > /dev/null; then
    echo "[INFO] node.js server process already running."
    SERVER_RUNNING=true
else
    SERVER_RUNNING=false
fi



# Starting REST Server

if [[ "$SERVER_RUNNING" == false ]]; then
    echo "=== Starting REST server ==="
    if ! cd "${IOTWEBUI_BASE_DIR}${SERVER_DIR}"; then
        echo "[ERROR] Can't access server directory: ${IOTWEBUI_BASE_DIR}${SERVER_DIR}"
        exit 1
    fi

    # Start node server in background, redirecting output to /dev/null
    nohup node server.js > /dev/null 2>&1 &
#    node server.js
    echo "Waiting for server initialization..."
    sleep 5 # Give the server some time to start up
else
    echo "=== Skipping server start, already running ==="
fi


# Chrome Configuration and Launch

echo "=== Launching Chrome in ${MODE} mode ==="

# Base Chrome arguments based on your 'open -n -a' command
CHROME_ARGS=(
    "--user-data-dir=${CHROME_PROFILE}"
    "--disable-web-security"
#    "--disable-popup-blocking"
    "--auto-accept-camera-and-microphone-capture"
    "--app=file:///Applications/IoTwebUI3.3/appPage.html"
)

# Mode-specific settings
if [[ "$MODE" == "KIOSK" ]]; then
    CHROME_ARGS+=( "--kiosk" ) # Append to array
    echo "Starting in KIOSK mode - Ctrl+Q or Cmd+Q to exit-"
else
    # The original BAT file had window-size for WINDOW mode, adding it back if needed
    # CHROME_ARGS+=" --new-window --window-size=800,400"
    echo "Starting in WINDOW mode"
fi

# Launch Chrome using 'open -n -a'
# The '-n' option opens a new instance even if one is already running
# The '-a' option specifies the application
# The '--args' keyword passes subsequent arguments directly to the application executable

open -n -a "${BROWSER_APP_PATH}"  --args "${CHROME_ARGS[@]}"
# echo "open -n -a" \"${BROWSER_APP_PATH}\"  --args "${CHROME_ARGS[@]}"



# **********************
# *** CLEANUP & EXIT *
# **********************
exit 0
