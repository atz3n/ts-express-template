#!/bin/bash

cd ../docker
if [ $(uname) == Linux ]; then
    sudo docker-compose down
else 
    docker-compose down
fi