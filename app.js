const express = require('express');
const config = require('config');
var bodyParser = require('body-parser')


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
})

app.use('/api/weather/', require('./routes/weather.routes'));
app.use('/api/google/', require('./routes/sheet'));


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
