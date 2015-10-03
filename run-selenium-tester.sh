
# add -d for detached
docker run  --rm --name selenium-tester -p 4444:4444 -p 5900:5900 -ti  umbocv/selenium-tester  /bin/bash
#docker run  --rm --name browser-tester -p 4444:4444 -p 5900:5900  selenium/standalone-firefox-debug:2.47.1
# docker port browser-tester 5900
