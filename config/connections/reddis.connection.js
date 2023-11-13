const redis = require('redis');
const config = require('../config');

const connectRedis = () => {
  const client = redis.createClient(config.redis.uri);

  client.on('connect', () => {
    console.log('Connected to Redis');
  });

  client.on('error', (err) => {
    console.error('Error connecting to Redis:', err.message);
    process.exit(1);
  });

  return client;
};
