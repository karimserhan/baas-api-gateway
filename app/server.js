import express from 'express';
import config from './config'
import routes from './routes'
import middlewares from './middlewares' 

console.log('Starting API application');
console.log(`App configuration: ${JSON.stringify(config, undefined, 2)}`);

const app = express();

// Configure global middlewares
console.log("Configuring middlewares");
app.use(middlewares.bodyParsing.jsonParser);
app.use(middlewares.bodyParsing.encodedUrlParser);
app.use(middlewares.cors.corsConfig);

// Configure routes
console.log("Configuring routes");
app.use('/users', routes.users)
app.use('/banking', routes.banking);

// Start listening
app.listen(config.port || 3000, () =>
  console.log(`Started listening on port: ${config.port}`),
);