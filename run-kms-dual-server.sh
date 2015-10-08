#!/bin/bash
    docker run --name "kms-server-tcp"  -P --net=host --rm -e LD_LIBRARY_PATH=/usr/local/lib --entrypoint="kurento-media-server" -ti umbocv/kms-server:udptcp 
