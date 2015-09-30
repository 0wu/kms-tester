FROM kurento/kurento-media-server:6.1.0
MAINTAINER tingfan.wu@umbocv.com

RUN apt-get update && apt-get install -y wget
RUN echo "deb http://ubuntu.kurento.org trusty kms6" | tee /etc/apt/sources.list.d/kurento.list \
  && wget -O - http://ubuntu.kurento.org/kurento.gpg.key | apt-key add - \ 
  && apt-get update \ 
  && apt-get -y install openh264-gst-plugins-bad-1.5 nodejs-legacy npm telnet python \ 
  && apt-get clean \ 
  && rm -rf /var/lib/apt/lists/*

RUN npm -g install bower

COPY ./WebRtcEndpoint.conf.ini /etc/kurento/modules/kurento/WebRtcEndpoint.conf.ini

EXPOSE 8000 
#ENTRYPOINT ["/bin/bash"] 
