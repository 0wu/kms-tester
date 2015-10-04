#!/bin/bash
if [ "x$USE_ICE" != "x" ]; then
    echo "
;pre-entrypoint injection
stunServerAddress=74.125.22.127
stunServerPort=19302
" >> /etc/kurento/modules/kurento/WebRtcEndpoint.conf.ini
fi

if [ "x$TURN_URL" != "x" ]; then
    echo "
;pre-entrypoint injection
; turnURL=user:password@address:port(?transport=[udp|tcp|tls])
turnURL=${TURN_URL}
" >> /etc/kurento/modules/kurento/WebRtcEndpoint.conf.ini
userpw=`echo ${TURN_URL}|sed -e 's/\(.*\)@.*/\1/'`
public_ip=`echo ${TURN_URL}|sed -e 's/.*@\([0-9.]*\).*/\1/'`
echo userpw=$userpw public_ip=$public_ip
turnserver -o -a v -r 'kms-test' -u $userpw -X $public_ip
fi

