#!/bin/bash

PROJECT_NAME="greeter"


cd ../docker
if [ $(uname) == Linux ]; then
    sudo docker-compose -p ${PROJECT_NAME} down
else 
    docker-compose -p ${PROJECT_NAME} down
fi