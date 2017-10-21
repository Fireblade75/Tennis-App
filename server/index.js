require('dotenv').config();
const path = require('path');
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

// Importing routes
const playerRoute = require('./routes/player-route');
const userRoute = require('./routes/user-route');
const matchRoute = require('./routes/match-route');
const authRoute = require('./routes/auth-route');

// Import webpack (only during development)
let webpack, webpackDevMiddleware;
if (process.env.USE_WEBPACK) {
    webpack = require('webpack');
    webpackDevMiddleware = require('webpack-dev-middleware');
}

// Mongoose configuration
mongoose.Promise = global.Promise;
mongoose.connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_DOMAIN}/${process.env.DB_NAME}`,
    { useMongoClient: true }
)

// Creating an express server
const app = express();

// Configuring midleware for logging page requests
if(process.env.NODE_ENV !== 'test') {
    app.use(morgan('tiny'));
}

// Configuring webpack for live updating
if(process.env.USE_WEBPACK) {
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        stats: {colors: true}
    }));
}

// Configure Json Web Token
app.set('private-key', process.env.APP_SECRET);
app.use(function (req, res, next) {
    const token = req.headers.authorization;
    if(token !== undefined) {
        jwt.verify(token, app.get('private-key'), function (err, decoded) {
            if (err) {
                res.status(401);
                res.json({'error': 'invalid_token'});
            } else {
                req.currentUser = jwt.decode(token);
                next();
            }
        });
    } else {
        next();
    }
});

// Configuring midleware for parsing post bodies and setting up static files folder
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// Setting up routes
app.use('/api/players', playerRoute);
app.use('/api/users', userRoute);
app.use('/api/matches', matchRoute);
app.use('/auth', authRoute);

// Start listening on the specified port
const port = process.env.PORT || 3000;
const server = app.listen(port, function listen() {
    console.log(`Starting server on port ${port}.`);
});

// Close the database connection when the server closes
server.on('close', function() {
    mongoose.connection.close();
});

module.exports = {app, server};
