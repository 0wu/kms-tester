#!/bin/bash

# add -d for detached
#docker run  --rm --name selenium-tester -p 4444:4444 -p 5900:5900 -ti  umbocv/selenium-tester  /bin/bash
docker run  --name selenium-tester -p 4444:4444 -p 5900:5900 -ti  umbocv/selenium-tester  
#docker run  --rm --name browser-tester -p 4444:4444 -p 5900:5900  selenium/standalone-firefox-debug:2.47.1 #notworking, vnc password issue

#./selenium/check-rtc-delay.py
#./selenium/plot-delay.py
#docker kill selenium-tester
#docker rm selenium-tester
