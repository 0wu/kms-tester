#!/usr/bin/env python
#https://gist.github.com/virtix/1126917#using-selenium-with-remote-webdriver
# http://selenium-python.readthedocs.org/en/latest/api.html
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait # available since 2.4.0
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.support import expected_conditions as EC # available since 2.26.0
import selenium.webdriver.firefox.firefox_profile as firefox_profile

# Create a new instance of the Firefox driver
#driver = webdriver.Firefox()
#driver = webdriver.Chrome()

# enable settings in "about:config"
firefoxProfile = webdriver.FirefoxProfile(); # OSX ref ~/Library/Application Support/Firefox/Profiles/*/prefs.js
firefoxProfile.set_preference('canvas.capturestream.enabled', True);
firefoxProfile.update_preferences()

#launch remote instance
driver = webdriver.Remote(command_executor='http://127.0.0.1:4444/wd/hub', desired_capabilities=DesiredCapabilities.FIREFOX, browser_profile=firefoxProfile)

# go to the google home page
driver.get("http://g.umbocv.com:8001/kms-client-js/rtc_source_from_file.html")


timing = [];
try:
    # we have to wait for the page to refresh, the last thing that seems to be updated is the title
    WebDriverWait(driver, 30).until(EC.title_contains("Auto"))
    print driver.title

    while driver.execute_script("return document.getElementById('videoInput').error") ==None and \
            not driver.execute_script("return document.getElementById('videoInput').onend"):
        message= driver.find_element_by_id('message').text
        timing.append(map(float,message.split()[2].split(',')))

    driver.get_screenshot_as_file('screenshot.png')


finally:
    driver.quit()

import numpy;
timing_arr = numpy.array(timing);
sender = timing_arr[:,0];
receiver= timing_arr[:,1];
delay = timing_arr[:,2];
print(timing_arr)

import matplotlib
matplotlib.use('Agg')

import pylab as p
p.plot(sender, receiver)
p.xlabel('sender')
p.ylabel('receiver')
p.title('webrtc-timing')
p.savefig("timing.png")
