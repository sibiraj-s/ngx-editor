git add .

ECHO Commit name? 
set /p done=

git commit -m  %done%

git push -u origin master



ECHO press any key to continue...: 
set /p done=


