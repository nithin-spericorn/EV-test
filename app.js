const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const requestLogger = require('express-sequelize-logger')
const settings = require('./config');
const models = require('./db/models');
const cusHeader = require('./middlewares/custom-header')
const cors = require("cors");

const router = require('./routes/index');

const app = express();
var corsOptions = {
  origin: "*"
};
// DataBase connection
require('./config/db-config');
app.use(cors(corsOptions));
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

models.sequelize.sync({force:false})
  .then(()=> console.log('successfully synced with DB'))
  .catch((err)=> console.log("Sync error", err))
// DB Log
app.use(requestLogger({ sequelize: models.sequelize })); 

// Swagger
//const swaggerUrl = `${settings.websiteHost}/swagger.json`;
//require('./modules/documentation/swaggerWritter');
// const swaggerOptions = {
//   swaggerUrl,
//   customCss: '.swagger-ui .topbar { display: none }',
// };
// app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(null, swaggerOptions));

// add custom header
app.use(cusHeader);
//app routes
app.all('/api/*', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  return res.status(err.status || 500).send({
    STATUS: false,
    MSG: err.message,
    RESULT: '',
  });
});

module.exports = app;
