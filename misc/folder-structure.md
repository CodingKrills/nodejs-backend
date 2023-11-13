├── config/
│ ├── env/
│ │ ├── development.js
│ │ ├── production.js
│ │ ├── staging.js
│ │ └── test.js
│ ├── index.js
│ └── logger.js
├── controllers/
│ ├── authController.js
│ └── userController.js
├── middlewares/
│ ├── authMiddleware.js
│ ├── errorMiddleware.js
│ └── validationMiddleware.js
├── models/
│ ├── user.js
│ └── index.js
├── routes/
│ ├── authRoutes.js
│ ├── userRoutes.js
│ └── index.js
├── services/
│ ├── authService.js
│ └── userService.js
├── utils/
│ ├── errors.js
│ └── validation.js
├── app.js
├── index.js
├── package.json
└── README.md

config/ folder:

env/ folder: Contains environment-specific configuration files.
development.js: Configuration file for the development environment.
production.js: Configuration file for the production environment.
staging.js: Configuration file for the staging environment.
test.js: Configuration file for the testing environment.
index.js: Combines the environment-specific configuration files and exports the resulting configuration object.
logger.js: Defines a logger that can be used to log messages to the console or a file.
controllers/ folder:

authController.js: Defines controller functions for authentication-related endpoints.
userController.js: Defines controller functions for user-related endpoints.
middlewares/ folder:

authMiddleware.js: Defines a middleware function that checks whether a user is authenticated before allowing access to protected routes.
errorMiddleware.js: Defines a middleware function that handles errors and returns an appropriate error response to the client.
validationMiddleware.js: Defines middleware functions that can be used to validate user input for specific endpoints.
models/ folder:

user.js: Defines the user schema and model.
index.js: Exports all the models defined in this folder.
routes/ folder:

authRoutes.js: Defines the authentication-related endpoints and their associated controller functions.
userRoutes.js: Defines the user-related endpoints and their associated controller functions.
index.js: Combines all the route modules and exports the resulting router object.
services/ folder:

authService.js: Defines functions for authentication-related operations.
userService.js: Defines functions for user-related operations.
utils/ folder:

errors.js: Defines custom error classes that can be used in the application.
validation.js: Defines validation functions that can be used to validate user input.
app.js: Defines the Express application and its middleware stack.

index.js: Connects to the MongoDB database, starts the Express server, and sets up error handling.

package.json: Contains information about the project and its dependencies.

README.md: Contains information about the project and how to run it.

================================================================================================
development.js:

module.exports = {
db: {
uri: "mongodb://localhost/myapp_dev",
options: {
useNewUrlParser: true,
useUnifiedTopology: true
}
},
port: 3000
};

production.js:

module.exports = {
db: {
uri: "mongodb://localhost/myapp_prod",
options: {
useNewUrlParser: true,
useUnifiedTopology: true
}
},
port: process.env.PORT || 3000
};

================================================================================================

index.js:

const env = process.env.NODE_ENV || "development";
const config = require(`./env/${env}`);

module.exports = config;

logger.js:

const winston = require("winston");

const logger = winston.createLogger({
level: "info",
format: winston.format.json(),
defaultMeta: { service: "my-app" },
transports: [
new winston.transports.File({ filename: "error.log", level: "error" }),
new winston.transports.File({ filename: "combined.log" })
]
});

if (process.env.NODE_ENV !== "production") {
logger.add(new winston.transports.Console({
format: winston.format.simple()
}));
}

module.exports = logger;
In this example, development.js, production.js, staging.js, and test.js each export an object containing the configuration for their respective environments. index.js uses the NODE_ENV environment variable to determine which configuration file to load, and exports the resulting configuration object. Finally, logger.js defines a logger using the winston library, with different transports depending on the environment.

================================================================================================

const mongoose = require('mongoose');
const config = require('../config');

const connectMongoDB = async () => {
try {
await mongoose.connect(config.mongoDB.uri, {
useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
});
console.log('Connected to MongoDB');
} catch (error) {
console.error('Error connecting to MongoDB:', error.message);
process.exit(1);
}
};
module.exports = connectMongoDB;

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

module.exports = connectRedis;

const connectMongoDB = require('./mongodb');
const connectRedis = require('./redis');

module.exports = {
connectMongoDB,
connectRedis,
};

const express = require('express');
const { connectMongoDB } = require('./db');
const app = express();

// Connect to MongoDB
connectMongoDB();

// ... other app setup and middleware ...

app.listen(3000, () => {
console.log('App listening on port 3000');
});

================================================================================================

controllers/authController.js:

const authService = require('../services/authService');

exports.login = async (req, res, next) => {
try {
const { email, password } = req.body;
const token = await authService.login(email, password);
res.status(200).json({ token });
} catch (err) {
next(err);
}
};

controllers/userController.js:

const userService = require('../services/userService');

exports.createUser = async (req, res, next) => {
try {
const { name, email, password } = req.body;
const user = await userService.createUser(name, email, password);
res.status(201).json(user);
} catch (err) {
next(err);
}
};

exports.getUserById = async (req, res, next) => {
try {
const { id } = req.params;
const user = await userService.getUserById(id);
res.status(200).json(user);
} catch (err) {
next(err);
}
};

middlewares/authMiddleware.js:

const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

module.exports = async (req, res, next) => {
try {
const token = req.headers.authorization.split(' ')[1];
const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
const user = await userService.getUserById(decodedToken.userId);
req.user = user;
next();
} catch (err) {
res.status(401).json({ message: 'Invalid or missing token' });
}
};

middlewares/errorMiddleware.js:

const logger = require('../config/logger');

module.exports = (err, req, res, next) => {
logger.error(err);
res.status(500).json({ message: 'An error occurred' });
};

middlewares/validationMiddleware.js:

const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
return res.status(400).json({ errors: errors.array() });
}
next();
};
models/user.js:

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
name: { type: String, required: true },
email: { type: String, required: true, unique: true },
password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
models/index.js:

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = {
User: require('./user')
};

routes/authRoutes.js:

const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const validationMiddleware = require('../middlewares/validationMiddleware');

const router = express.Router();

router.post('/login', [
body('email').isEmail(),
body('password').notEmpty()
], validationMiddleware, authController.login);

module.exports = router;

routes/userRoutes.js

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');

const router = express.Router();

router.post('/', [
body('name').notEmpty(),
body('email').isEmail(),
body('password').notEmpty()
], validationMiddleware, userController.createUser);

router.get('/:id', [
param('id').isMongoId()
], validationMiddleware, authMiddleware, userController.getUserById);

module.exports = router;

routes/index.js:

const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;

services/authService.js:

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userService = require('./userService');

exports.login = async (email, password) => {
const user = await userService.getUserByEmail(email);
if (!user) {
throw new Error('Invalid email or password');
}
const isPasswordValid = await bcrypt.compare(password, user.password);
if (!isPasswordValid) {
throw new Error('Invalid email or password');
}
const token = jwt.sign({ userId: user.\_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
return token;
};

services/userService.js:

const bcrypt = require('bcrypt');
const { User } = require('../models');

exports.createUser = async (name, email, password) => {
const hashedPassword = await bcrypt.hash(password, 10);
const user = new User({ name, email, password: hashedPassword });
await user.save();
return user;
};

exports.getUserByEmail = async email => {
const user = await User.findOne({ email });
return user;
};

exports.getUserById = async id => {
const user = await User.findById(id);
return user;
};

utils/errors.js:

class HttpError extends Error {
constructor(statusCode, message) {
super(message);
this.statusCode = statusCode;
}
}

module.exports = {
HttpError
};
utils/validation.js:

const { body } = require('express-validator');

exports.validate = (method) => {
switch (method) {
case 'createUser': {
return [
body('name').notEmpty(),
body('email').isEmail(),
body('password').notEmpty()
];
}
case 'getUserById': {
return [
param('id').isMongoId()
];
}
}
};

app.js:

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const logger = require('./config/logger');

const app = express();

app.use(express.json());
app.use(morgan('combined', { stream: logger.stream }));
app.use(helmet());
app.use(cors());
app.use('/api', routes);
app.use(errorMiddleware);

module.exports = app;

index.js:

require('dotenv').config();
const app = require('./app');
const logger = require('./config/logger');

const port = process.env.PORT || 3000;

app.listen(port, () => {
logger.info(`Server listening on port ${port}`);
});
