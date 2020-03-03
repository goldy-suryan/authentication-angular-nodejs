require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 9999;
const auth = require('./server/middleware/auth.middleware');
const mongoose = require('mongoose');
const loginRoute = require('./server/routes/login.route');
const registerRoute = require('./server/routes/register.route');
// DB connection
mongoose.connect('mongodb://localhost:27017/test', { useUnifiedTopology: true, useNewUrlParser: true });

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, 'client/dist/client')));

// Routes
app.use(registerRoute);
app.use(loginRoute);
app.get('*', (req, res) => {
    res.sendFile('index.html');
})


// Application error handeling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            message: err.message
        }
    })
});

app.listen(port, '0.0.0.0', () => {
    console.log(`http://0.0.0.0:${port}`);
})