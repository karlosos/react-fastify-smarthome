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
