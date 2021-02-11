#!/bin/bash


###################################################################################################
# CONFIGURATION
###################################################################################################

DOMAIN="<your ssh domain>"
FOLDER_NAME="express-greeter"
IMAGE_NAME="express-greeter-image"


SERVER_FOLDER="${DOMAIN}:${FOLDER_NAME}"


###################################################################################################
# MAIN
###################################################################################################

echo "[INFO] Copying files to server ..."
ssh -t ${DOMAIN} "mkdir -p ${FOLDER_NAME}/scripts"
ssh -t ${DOMAIN} "mkdir -p ${FOLDER_NAME}/docker"

scp ./run-docker.sh "${SERVER_FOLDER}/scripts"
scp ./stop-docker.sh "${SERVER_FOLDER}/scripts"
scp ../docker/docker-compose.yml "${SERVER_FOLDER}/docker"

ssh -t ${DOMAIN} "sudo chmod 700 ./${FOLDER_NAME}/scripts/run-docker.sh"
ssh -t ${DOMAIN} "sudo chmod 700 ./${FOLDER_NAME}/scripts/stop-docker.sh"


echo "" && echo "[INFO] Building ${IMAGE_NAME} image ..."
docker build -f ../docker/Dockerfile ./.. -t ${IMAGE_NAME}


echo "" && echo "[INFO] Copying ${IMAGE_NAME} image to server ..."
docker save -o ./${IMAGE_NAME}.tar ${IMAGE_NAME}
scp ./${IMAGE_NAME}.tar ${SERVER_FOLDER}


echo "" && echo "[INFO] Loading ${IMAGE_NAME} image on server ..."
ssh -t ${DOMAIN} "sudo docker load -i ./${FOLDER_NAME}/${IMAGE_NAME}.tar"


echo "" && echo "[INFO] (Re)starting ${IMAGE_NAME} on server ..."
ssh -t ${DOMAIN} "cd ./${FOLDER_NAME}/scripts && ./stop-docker.sh"
ssh -t ${DOMAIN} "cd ./${FOLDER_NAME}/scripts && ./run-docker.sh"


echo "" && echo "[INFO] Cleaning up ..."
ssh -t ${DOMAIN} "rm ./${FOLDER_NAME}/${IMAGE_NAME}.tar"
rm ./${IMAGE_NAME}.tar


echo "" && echo "[INFO] Done. New version deployed ..."