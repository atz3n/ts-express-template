#!/bin/bash

cd ../docker
if [ $(uname) == Linux ]; then
    sudo docker-compose up -d
else 
    docker-compose up -d 
fi
