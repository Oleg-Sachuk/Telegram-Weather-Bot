const express = require('express');
const config = require('config');
var bodyParser = require('body-parser')


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
})

app.use('/api/weather/', require('./routes/weather.routes'));
app.use('/api/telegram/', require('./routes/telegram'));


// app.use(express.bodyParser())


const PORT = config.get("port") || 5000

async function start() {
    try {
        app.listen(PORT, () => { console.log(`App has been started on port ${PORT} `) })
    } catch (error) {
        console.log("Server failed with error: ", error.message);
        process.exit(1);
    }
}

start()
