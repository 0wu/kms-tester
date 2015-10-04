#!/bin/bash
if [ x$1 != "x" ]; then 
    docker run --name "kms-tester"  -P --net=host --rm -e USE_ICE=1 -e TURN_URL='test:test@184.173.53.203:3478?transport=udp' --entrypoint="/bin/bash" -ti umbocv/kms-server 
else
    docker run --name "kms-tester"  -P --net=host --rm -e USE_ICE=1 -e TURN_URL='test:test@184.173.53.203:3478?transport=udp'  -ti umbocv/kms-server 
fi
