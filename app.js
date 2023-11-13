const express = require('express');
// const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes');
const errorMiddleware = require('./middlewares/error.middleware');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = YAML.load('./swagger/swagger.yaml');
// const logger = require('./config/logger');

const app = express();

app.use(express.json());
// app.use(morgan('combined', { stream: logger.stream }));
app.use(helmet());
app.use(cors());
app.use('/api/v1', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorMiddleware);

module.exports = app;
