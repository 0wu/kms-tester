
docker run --name "kms-tester" -v $PWD:/root -w /root -p 8000:8000 -p 184.173.53.203:8888:8888 --rm -ti kurento-tester
