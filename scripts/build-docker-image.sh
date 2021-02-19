#!/bin/bash


###################################################################################################
# CONFIGURATION
###################################################################################################

IMAGE_NAME="crud-greeter"


###################################################################################################
# MAIN
###################################################################################################

docker build -f ../docker/Dockerfile ./.. -t ${IMAGE_NAME}