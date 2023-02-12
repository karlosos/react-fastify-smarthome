# react-fastify-smarthome

## Setup database

### Install mongodb instance

Fetch mongodb image:
```console
docker pull mongo
```

Run mongodb container:
```console
docker run -d -p 27017:27017 -v ~/mongodb:/data/db --name mongo mongo:latest
```

Fetch mongodb UI image:
```console
docker pull mongo-express
```

Run mongodb UI container:
```console
docker run -d --link mongo:mongo -p 8081:8081 -e ME_CONFIG_MONGODB_URL="mongodb://mongo:27017" mongo-express
```

## Setup project

### Configuration

- Create a file named `.env`
- Populate `.env` file with the following configuration:
    ```text
    MONGODB_URI='mongodb://127.0.0.1:27017/'
    GATEWAY_URL='http://127.0.0.1:3001'
    #COOKIE_NAME= # if not set then cookie is not necessary to access website. It's also sended to gateway
    #COOKIE_VALUE= # if not set then it's not necessary for setting cookie in browser. It's also sended to gateway, so if gateway need cookie it's must have.
    ```

### Backend

- Install node modules with `npm install`
- Run application with `npm run start:watch`

### Frontend

- Build application with `npm run build:frontend:dev`
    - In case of the following error:
        ```text
        Error: error:0308010C:digital envelope routines::unsupported
        ```
        Run in powershell (see [reference](https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported)):
        ```powershell
        $env:NODE_OPTIONS = "--openssl-legacy-provider"
        ```
        Build again the application
- Frontend should be builded and served by backend. On every change frontend should be rebuilded and reloaded by backend.
- Access frontend by http://0.0.0.0:3000/
- Set cookie if request was forbidden.

### Mock

- Navigate to `package.json` & replace `localhost` with `127.0.0.1`
- Run in console:
```console
npm run start:local:mock
```