#!/bin/bash

# Builds the docker image

###################################################################################################
# CONFIGURATION
###################################################################################################

IMAGE_NAME="crud-greeter"


###################################################################################################
# DEFINES
###################################################################################################

HERE="$(PWD)/$(dirname $0)"


###################################################################################################
# MAIN
###################################################################################################

docker build -f ${HERE}/../docker/Dockerfile ${HERE}/.. -t ${IMAGE_NAME}