# ts-express-template
Getting started project for nodejs services with nodejs, express, typescript, docker and docker-compose.


## API

- **Get Greeting**
  - GET /greet
    - request
      - query
        - name: string
    - response
      - status code
        - 200 (OK)
        - 400 (Bad Request)
      - text (if success)
        - greeting
- **Set Language**
  - POST /language
    - request
      - body
        - language: "en" | "de"
    - response
      - status code
        - 200 (OK)
        - 400 (Bad Request)


## Development

Create an `.env` based on `.env-sample` an adapt it.

Run the linter:
```
npm run lint
```

Autofix lint errors:
```
npm run fix:lint
```

Run tests:
```
npm run test
```

Run in dev mode:
```
npm run dev
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
./run-docker.sh
```


Pause
```
./pause-docker.sh
```


Stop
```
./stop-docker.sh
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