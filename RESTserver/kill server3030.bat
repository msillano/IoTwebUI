REM:  Se la porta 3030 (RESTserver) rimane bloccata, usare questo tool
FOR /F "tokens=5 delims= " %%P IN ('netstat -ano ^| find "0.0.0.0:3030" ^| find "LISTENING"') DO taskkill /F /PID %%P
FOR /F "tokens=5 delims= " %%P IN ('netstat -ano ^| find "[::]:3030" ^| find "LISTENING"') DO taskkill /F /PID %%P
echo Processo sulla porta 3030 (se presente) terminato.