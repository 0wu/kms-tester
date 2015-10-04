FROM kurento/kurento-media-server:6.1.0
MAINTAINER tingfan.wu@umbocv.com

# install h264
RUN apt-get update \
  && apt-get install -y openh264-gst-plugins-bad-1.5 \ 
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# install turn server
RUN apt-get update \
  && apt-get install -y libevent-dev wget gcc make libssl-dev \
  && cd /tmp && wget http://turnserver.open-sys.org/downloads/v4.5.0.2/turnserver-4.5.0.2.tar.gz && tar zxvf turnserver*.tar.gz &&  cd turn* && ./configure  && make install \
  && apt-get remove -y gcc make \
  && apt-get autoremove -y && apt-get clean  && rm -rf /var/lib/apt/lists/*  


COPY ./pre-entrypoint.sh /pre-entrypoint.sh

EXPOSE 8888 3478
ENTRYPOINT /pre-entrypoint.sh && /entrypoint.sh
