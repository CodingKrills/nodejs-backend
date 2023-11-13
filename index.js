require('dotenv').config();
const app = require('./app');
// const logger = require('./config/logger');
const connectMongoDB = require('./config/connections/mongodb.connection');

const port = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI;

connectMongoDB(MONGODB_URI);

app.listen(port, () => {
  // logger.info(`Server listening on port ${port}`);
  console.log(`Server listening on port ${port} 👍`);
});
