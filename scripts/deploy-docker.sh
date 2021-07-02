#!/bin/bash

# Deploys the docker-compose project to a server with ssh access via pubkey

###################################################################################################
# CONFIGURATION
###################################################################################################

SSH_DOMAIN="<your ssh domain (user@domain)>"
FOLDER_NAME="simple-greeter"
IMAGE_NAME="simple-greeter"


###################################################################################################
# DEFINES
###################################################################################################

SERVER_FOLDER="${SSH_DOMAIN}:${FOLDER_NAME}"
HERE="$(PWD)/$(dirname $0)"


###################################################################################################
# MAIN
###################################################################################################

echo "" && echo "[INFO] Building ${IMAGE_NAME} image ..."
docker build -f ${HERE}/../docker/Dockerfile ${HERE}/.. -t ${IMAGE_NAME}
docker save -o ${HERE}/${IMAGE_NAME}-image.tar ${IMAGE_NAME}


echo "[INFO] Copying files to server ..."
ssh -t ${SSH_DOMAIN} "mkdir -p ${FOLDER_NAME}/scripts"
ssh -t ${SSH_DOMAIN} "mkdir -p ${FOLDER_NAME}/docker"

scp ${HERE}/run-docker.sh "${SERVER_FOLDER}/scripts"
scp ${HERE}/pause-docker.sh "${SERVER_FOLDER}/scripts"
scp ${HERE}/stop-docker.sh "${SERVER_FOLDER}/scripts"
scp ${HERE}/../docker/docker-compose.yml "${SERVER_FOLDER}/docker"

ssh -t ${SSH_DOMAIN} "sudo chmod 700 ./${FOLDER_NAME}/scripts/run-docker.sh"
ssh -t ${SSH_DOMAIN} "sudo chmod 700 ./${FOLDER_NAME}/scripts/pause-docker.sh"
ssh -t ${SSH_DOMAIN} "sudo chmod 700 ./${FOLDER_NAME}/scripts/stop-docker.sh"

scp ${HERE}/${IMAGE_NAME}-image.tar ${SERVER_FOLDER}


echo "" && echo "[INFO] Loading ${IMAGE_NAME} image on server ..."
ssh -t ${SSH_DOMAIN} "sudo docker load -i ./${FOLDER_NAME}/${IMAGE_NAME}-image.tar"


echo "" && echo "[INFO] (Re)starting ${IMAGE_NAME} on server ..."
ssh -t ${SSH_DOMAIN} "cd ./${FOLDER_NAME}/scripts && ./stop-docker.sh"
ssh -t ${SSH_DOMAIN} "cd ./${FOLDER_NAME}/scripts && ./run-docker.sh"


echo "" && echo "[INFO] Cleaning up ..."
ssh -t ${SSH_DOMAIN} "rm ./${FOLDER_NAME}/${IMAGE_NAME}-image.tar"
rm ${HERE}/${IMAGE_NAME}-image.tar


echo "" && echo "[INFO] Done. New version deployed ..."