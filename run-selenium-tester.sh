#!/bin/bash
docker ps -f name=selenium-tester  -q |xargs docker stop  

# add -d for detached
#docker run  --rm --name selenium-tester -p 4444:4444 -p 5900:5900 -ti  umbocv/selenium-tester  /bin/bash
for i in 4444 4445 4446 4447 ;
do
    docker run  -d  --name selenium-tester$i -p $i:4444  -ti  umbocv/selenium-tester 
done
wait
#docker run  --rm --name browser-tester -p 4444:4444 -p 5900:5900  selenium/standalone-firefox-debug:2.47.1 #notworking, vnc password issue

#./selenium/check-rtc-delay.py
#./selenium/plot-delay.py
#docker kill selenium-tester
#docker rm selenium-tester
