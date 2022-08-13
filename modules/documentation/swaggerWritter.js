const swaggerJSDoc = require('swagger-jsdoc');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const settings = require('../../config');

let schema = [];
// eslint-disable-next-line eqeqeq
if (process.env.NODE_ENV == 'development') schema = ['http'];
else schema = ['https'];
// swagger definition
const swaggerDefinition = {
  info: {
    title: 'Library Management API Documentation',
    version: '1',
    description: 'API Documentation',
  },
  host: `${settings.domain}`,
  basePath: '/',
  schemes: [...schema],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: [
    './api/auth/index.js',
    './api/book/index.js'
  ]
};
// initialize swagger-jsdoc
const swaggerJson = swaggerJSDoc(options);
fs.writeFileAsync('./public/swagger.json', JSON.stringify(swaggerJson, null, 2))
  .then(() => {})
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  });
module.exports = swaggerJson;
