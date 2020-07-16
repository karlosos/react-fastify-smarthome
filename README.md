<h1 align="center">Smarthome web application built with React and Fastify</h1>

<div align="center">

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/intive/patronage20-js/graphs/commit-activity)
[![GitHub contributors](https://img.shields.io/github/contributors/intive/patronage20-js.svg)](https://GitHub.com/intive/patronage20-js/graphs/contributors/)

</div>

<div align="center">Auto formatted with standardjs, tested with jest 🎗</div>

![Tech logos](https://i.imgur.com/oRN1FfL.png)

![https://i.imgur.com/5q7fWtc.png](https://i.imgur.com/5q7fWtc.png)

![App gif](https://i.imgur.com/0RxbCgz.gif)

## What is this and who is it for 🤷‍♀️

This project was made during Patronage20 internship program in Intive. This is forked repository from: [intive/patronage20-js](https://github.com/intive/patronage20-js).

I've learnt a lot from this project. Technologies that was used:
- React with hooks
- Redux and Redux Sagas
- Fastify
- StandardJS
- Unit testing with jest
- Swagger documentation and OpenAPI
- Internationalization with `il8next`

## Features

- List of sensors (temperature sensors, window sensors, smoke detectors etc.) with live values
- Placing and removing sensors from map
- Changing color settings of LED Lights sensors
- Notifications panel
- HVAC panel with list of current rules
- HVAC form for creating new heating/cooling rules
- Internationalization with `i18next`
- Backend as a proxy with MongoDB for storing notifications and map positions
- Backend with basic cookies authorization
- Documentation of endpoints in swagger (`/.well-known/documentation`)
- Mock server generated with `prism` from OpenAPI schema

## Setting up development environment 🛠

### Prerequisites

Node minimum version 12.18.2, npm minimum version 6.14.5. In older versions mock server doesn't work because of `prism` prerequisites.

MongoDB must be installed locally or provided address to it in `.env`.

Populate `.env` file:

```
MONGODB_URI='mongodb://' # if you dont have local mongodb
GATEWAY_URL='http:localhost:3001' # address to gateway
COOKIE_NAME=NAME # if not set then cookie is not necessary to access website. It's also sended to gateway
COOKIE_VALUE=VALUE # if not set then it's not necessary for setting cookie in browser. It's also sended to gateway, so if gateway need cookie it's must have.
```

To manually set cookie in browser paste:

```
var doSetCookie = function setCookie (c_name, value, exdays) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + exdays)
  var c_value = escape(value) + ((exdays == null) ? '' : '; expires=' + exdate.toUTCString())
  document.cookie = c_name + '=' + c_value + '; samesite=Lax'
}
doSetCookie('Name', 'Value', 1)
```

With correct `Name` and `Value`.


### Backend

- Install node modules with `npm install`
- Run application with `npm run start:watch`

### Frontend

- Build application with `npm run build:frontend:dev`
- Frontend should be builded and served by backend. On every change frontend should be rebuilded and reloaded by backend.
- Access frontend by `http://0.0.0.0:3000/`
- Set cookie if request was forbidden.

## Testing 🚥

Run frontend tests with: ```npm run test:frontend```

Run backend tests with: ```npm run test:server```

Run database test with: ```npm run test:db```

## Using mock server 🎭

Documentation is prepared using OpenAPI schema. You can acces this documentation under [localhost:3000/.well-known/documentation](localhost:3000/.well-known/documentation).

- Start mock server with `npm run start:local:mock`
- You can the enter a whole url like `http://localhost:3001/api/v1/dashboard` an you will see the static examples served by the mock server.
- Then you can:
  * change the examples like `http://localhost:3001/api/v1/dashboard?__example=positiv` - where you can set the `__example` param
with any example provided in the `./src/docs/examples/` directory.
  * set a dynamic mock (but it's not very useful and I don't know how to deal with it) by http://localhost:3001/api/v1/dashboard?__dynamic=true

### Setting your own Mocks

* Follow the `positive_example` example.
  * Go to `openapi.json` and set what's needed.
  * Go to `./src/docs/examples` and create what's needed.