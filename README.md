# kms-tester
Kurento Media Server Tester

# Install
```
 sudo apt-get install python-selenium python-matplotlib python-pip
 sudo pip install --upgrade selenium  #need to be >2.26
```
# Run 

 1. start selenium standalone node (add -d for detached mode)
  docker run  --rm --name selenium-tester -p 4444:4444 -p 5900:5900 -ti  umbocv/selenium-tester

 2. Run test and plot results
 ```
 selenium/check-webrtc-delay.py
 ```
 This will talk to the docker browser instance and visit the webpage in kurento-js-test/rtc_from_source.html and save the result in timing.npz
 3. Plot results. The following script read timing.npz and show plot into human-readable graphs.
```
./check-webrtc-delay.py
```
One can modify the script to generate different kinds of graph
