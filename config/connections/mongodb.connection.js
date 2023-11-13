const mongoose = require('mongoose');

const connectMongoDB = async (MONGODB_URI) => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB 🤝');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};
module.exports = connectMongoDB;
