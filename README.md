# patronage20-js

## API server setup

* [fastify](https://www.fastify.io/)
* [fastify-swagger](https://github.com/fastify/fastify-swagger)


## Testing setup

* [Jest](https://jestjs.io/)

## Code convention

* [standard js](https://standardjs.com/)

## CI/CD

* github actions

## Using Mocks

1. Whole documentation is prepared by using openapi schema.
1. To se the documentation please run `npm run start` or `npm run start:watch` and go to the
running server i.ex. `localhost:3000` under `/.well-known/documentation`.
1. Next you can start the mock server by using `npm run start:local:mock` or `npm run start:local:mock:watch`.
1. You can the enter a whole url like `http://localhost:3001/api/v1/dashboard` an you will see the static examples
served by the mock server.
1. Then you can:
  1. change the examples like `http://localhost:3001/api/v1/dashboard?__example=positiv` - where you can set the `__example` param
with any example provided in the `./src/docs/examples/` directory.
  1. set a dynamic mock (but it's not very useful and I don't know how to deal with it) by http://localhost:3001/api/v1/dashboard?__dynamic=true

### Setting your own Mocks

1. Follow the `positive_example` example.
  1. Go to `openapi.json` and set what's needed.
  1. Go to `./src/docs/examples` and create what's needed.

## Setting environment variables

When deploying app in local environment create `.env` file in root directory which contains:

```
GATEWAY_URL='https://patronage20-concept-master.herokuapp.com'
COOKIE_NAME=secret_cookie
COOKIE_VALUE=3241231213fsdj23kj4kl32j4
```

`COOKIE_NAME` and `COOKIE_VALUE` are optional and should be both defined when cookie authentication is desirable.

### Setting cookie in browser

To set cookie in browser, paste following code into browser console. It is required when `COOKIE_NAME` and `COOKIE_VALUE` are defined in environment variables.

```
var doSetCookie = function setCookie (c_name, value, exdays) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + exdays)
  var c_value = escape(value) + ((exdays == null) ? '' : '; expires=' + exdate.toUTCString())
  document.cookie = c_name + '=' + c_value + '; samesite=Lax'
}
doSetCookie('secret_cookie', '3241231213fsdj23kj4kl32j4', 1)
```

### Starting application in development environment

In order to have hot reload run scripts:

```
npm run start:watch
npm run build:frontend:dev
```

Backend will serve new builds as frontend will be rebuilded on changes.
