# ts-express-template
Getting started project for nodejs services with nodejs, express, typescript, docker and docker-compose.


## REST API

Each body comes in raw json format.

- **Create Greeting**
  - POST /greeting
    - request
      - body
        - authToken: string
        - greeting: string
    - response
      - status code
        - 200 (OK)
        - 400 (Bad Request)
        - 401 (Unauthorized)
        - 500 (Internal Server error)
      - body (if success)
        - id: string
- **Get Greeting**
  - GET /greeting/:id
    - request
      - query
        - authToken: string
    - response
      - status code
        - 200 (OK)
        - 400 (Bad Request)
        - 401 (Unauthorized)
        - 404 (Not Found)
        - 500 (Internal Server error)
      - body (if success)
        - greeting: string (stringified JSON)
- **Get Greetings**
  - GET /greetings
    - request
      - query
        - authToken: string
    - response
      - status code
        - 200 (OK)
        - 400 (Bad Request)
        - 401 (Unauthorized)
        - 500 (Internal Server error)
      - body (if success)
        - greetings: array
          - id: string
          - greeting: string (stringified JSON)
- **Update Greeting**
  - PATCH /greeting/:id
    - request
      - body
        - authToken: string
        - greeting: string (stringified JSON)
    - response
      - status code
        - 200 (OK)
        - 400 (Bad Request)
        - 401 (Unauthorized)
        - 404 (Not Found)
        - 500 (Internal Server error)
- **Delete Greeting**
  - DELETE /greeting/:id
    - request
      - query
        - authToken
    - response
      - 200 (OK)
      - 400 (Bad Request)
      - 401 (Unauthorized)
      - 404 (Not Found)
      - 500 (Internal Server error)


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
./run-docker.sh
```


Pause
```
./run-docker.sh
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