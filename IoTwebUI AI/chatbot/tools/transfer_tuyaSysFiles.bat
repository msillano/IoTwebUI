@echo off
:: Obiettivo: copiare da 'Download' a 'chatbot\system' i file di descrizione
:: del sistema Tuya, generati usando IoTwebUI + Explore devices|Explore scenes.
:: garantendo la manutenzione della dir 'chatbot\system'.
:: L'unico intervento manuale è premere il pulsante 'download' nel pop-up.
:: n.b. in quanto WEBAPP, IoTwebUI può solo effettuare salvataggi in 'Download"
:: Questo bat può essere attivato ad intervalli regolari da un crono 
:: This file is part of IoTwebUI-AI project (https://github.com/msillano/IoTwebUI)
:: @version 1.0
:: @license MIT
:: (c)2025 marco sillano

setlocal enabledelayedexpansion

REM ========= *** VERIFICARE QUESTI PERCORSI ***
set "source=D:\USER\Download"
set "dest=D:\xampp\htdocs\testvis\IoTwebUI.3.0\IoTwebUI AI\chatbot\system"
:: Pattern dei file da processare (usa quote se contengono spazi)
set "fileTypes=get-devices-*.txt set-devices-*.txt all-devices-*.txt all-TTR-*.txt"

:: Avvia l'elaborazione
call :parseTypes %fileTypes%
goto :done

:: ================================================================
:: Subroutine per iterare sui pattern
:parseTypes
if "%~1"=="" exit /b
call :processFile "%~1"
shift
goto :parseTypes

:: ================================================================
:: Elabora un singolo pattern
:processFile
call :latestFile "%~1"
if defined latest (
    echo Trovato file recente %~1: !latest!
    set "sourceFile=%source%\!latest!"
    call :copyAndDeleteFile "!sourceFile!" "%~1"
    ) 
set "latest="
exit /b

:: ================================================================
:: Trova l'ultimo file per il pattern specificato
:latestFile
set "latest="
for /f "delims=" %%f in ('dir /b /a-d /o-d "%source%\%~1" 2^>nul') do (
    set "latest=%%f"
    goto :break_loop
    )
:break_loop
exit /b

:: ================================================================
:: Copia e cancella il file con gestione errori
:copyAndDeleteFile
:: echo Pulizia file "%dest%\%~2"...
del /q "%dest%\%~2" 2>nul
echo Copia "%~1" in "%dest%\"...
copy /y "%~1" "%dest%\" >nul
if !errorlevel! neq 0 (
    echo ERRORE: Copia fallita: errorlevel=!errorlevel!
    exit /b !errorlevel!
    )
:: echo pulizia download, elimina "%~2"...
echo Cancella origine "%~2"
del /q "%source%\%~2"     2>nul
if !errorlevel! neq 0 (
    echo ERRORE: Eliminazione fallita: errorlevel=!errorlevel!
    exit /b !errorlevel!
    )
exit /b

:: ================================================================
:done
:: echo Script completato.
pause
endlocal