#!/bin/bash

cd ../docker
if [ $(uname) == Linux ]; then
    sudo docker-compose stop
else 
    docker-compose stop
fi