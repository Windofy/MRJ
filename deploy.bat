@echo off
echo.
echo  ========================================
echo   MRJ4.16 -- Deploy naar Cloud Run
echo  ========================================
echo.
echo  Uploaden gestart... (duurt 2-4 minuten)
echo  Sluit dit venster NIET.
echo  ----------------------------------------
echo.

gcloud run deploy mrj415 --source "C:\Users\MNRV\Desktop\MRJ4.16" --project mrj415 --region europe-west1 --allow-unauthenticated --set-env-vars "ANTHROPIC_API_KEY=%ANTHROPIC_API_KEY%,GEMINI_API_KEY=%GEMINI_API_KEY%,FAL_KEY=%FAL_KEY%,SUPABASE_URL=%SUPABASE_URL%,SUPABASE_KEY=%SUPABASE_KEY%,FLASK_DEBUG=false" --verbosity=info 2>&1

echo.
echo  ----------------------------------------
if %errorlevel% equ 0 (
    echo  KLAAR! Live op:
    echo  https://mrj415-1074183733569.europe-west1.run.app
    start https://mrj415-1074183733569.europe-west1.run.app
) else (
    echo  Fout. Zie output hierboven.
)
echo.
pause
