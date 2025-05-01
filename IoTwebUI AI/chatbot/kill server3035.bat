REM:  Se la porta 3035 (AIserver) rimane bloccata, usare questo tool
FOR /F "tokens=5 delims= " %%P IN ('netstat -ano ^| find "0.0.0.0:3035" ^| find "LISTENING"') DO taskkill /F /PID %%P
FOR /F "tokens=5 delims= " %%P IN ('netstat -ano ^| find "[::]:3035" ^| find "LISTENING"') DO taskkill /F /PID %%P
echo Processo sulla porta 3035 (se presente) terminato.