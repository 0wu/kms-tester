#!/usr/bin/env python
#https://gist.github.com/virtix/1126917#using-selenium-with-remote-webdriver
# http://selenium-python.readthedocs.org/en/latest/api.html
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait # available since 2.4.0
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.support import expected_conditions as EC # available since 2.26.0
import selenium.webdriver.firefox.firefox_profile as firefox_profile

# enable settings in "about:config"
firefoxProfile = webdriver.FirefoxProfile(); # OSX ref ~/Library/Application Support/Firefox/Profiles/*/prefs.js
firefoxProfile.set_preference('canvas.capturestream.enabled', True);
firefoxProfile.update_preferences()


class RTCDriver:
    def __init__(self, port):
        self.driver = webdriver.Remote(command_executor='http://127.0.0.1:%d/wd/hub' % port, desired_capabilities=DesiredCapabilities.FIREFOX, browser_profile=firefoxProfile)
        self.driver.get("http://g.umbocv.com:8000/kms-client-js/rtc_continuous.html")

    def getDelay(self):
        message= self.driver.find_element_by_id('message').text
        timing=map(float,message.split()[2].split(','))
        return timing[2]

    def __del__(self):
        try:
            self.driver.quit()
        except:
            pass

#launch remote instance
import time
from sysstats import get_kurento_cpu_percent as get_cpu_percent
drivers=[]
timing=[]
ndrivers=12
ports = [4444,4445,4446]*4

for i in range(ndrivers):
    drivers.append(RTCDriver(ports[i]))
    for j in range(30):
        cpu_percent = get_cpu_percent()
        delays=[d.getDelay() for d in drivers];
        delays_arr =[float('nan')]*ndrivers
        delays_arr[:len(delays)]=delays[:]
        timing.append(delays_arr+[cpu_percent])
        print(timing[-1])
import numpy;
numpy.array(timing).dump('cpu_timing.npz');
