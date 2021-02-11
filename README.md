# ts-express-template
Getting started project for nodejs services with nodejs, express, typescript, docker and docker-compose.


## Development

Create an `.env` based on `.env-sample` an adapt it.

Run the linter:
```
npm run lint
```

Autofix lint errors:
```
npm run fix-lint
```

Run tests:
```
npm run test
```

Start:
```
npm start
```


## Docker

CAUTION: scripts only run on Linux based systems (Ubuntu / macOS)

cd to scripts
```
cd ./scripts
```

Build image
```
./build-docker-image.sh
```


## Docker Compose

Adapt docker-compose file in docker folder

cd to scripts
```
cd ./scripts
```

Start
```
./run-docker-compose.sh
```

Stop
```
./stop-docker-compose.sh
```


## Deploying

cd to scripts
```
cd ./scripts
```

Adapt the deploy-docker file

Deploy
```
./deploy-docker.sh
```