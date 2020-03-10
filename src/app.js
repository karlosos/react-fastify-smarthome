const path = require('path');

module.exports = function({ port }) {
  const app = require('fastify')({ logger: true });
  const serveStatic = require('serve-static');

  app.use('/', serveStatic(path.join(__dirname, '..', 'frontend', 'dist')));

  app.register(
    (instance, opts, next) => {
      instance
        .register(require('fastify-swagger'), {
          routePrefix: '/documentation',
          swagger: {
            info: {
              title: 'Patronage 2020 JS',
              description: '',
              version: '0.1.0'
            },
            externalDocs: {
              url: 'https://swagger.io',
              description: 'Find more info here'
            },
            host: 'localhost' + ':' + port,
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json']
          },
          exposeRoute: true
        })
        .ready(err => {
          if (err) throw err;
          instance.swagger();
        });

      instance.register(require('./routes/well-known/health-check'));

      next();
    },
    {
      prefix: '.well-known'
    }
  );

  app.register(require('./routes/authors'), {
    prefix: '/api/v1/authors'
  });

  return app;
};
