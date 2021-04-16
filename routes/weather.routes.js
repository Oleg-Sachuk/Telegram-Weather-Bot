const { Router } = require('express');
const config = require('config')
const fetch = require('node-fetch');
const router = Router();
const telegramBot = require('node-telegram-bot-api');

let userId = null;

const bot = new telegramBot(config.get('Botkey'), {
    polling: {
        interval: 300,
        autoStart: true,
        params: {
            timeout: 10
        }
    }
})

bot.on('message', (msg) => {
    const { id } = msg.chat;
    userId = msg.chat.id
    bot.sendMessage(id, `Hello ${JSON.stringify(msg.from.first_name)}`)
})

router.post('/current', async (req, res) => {
    let data;
    console.log("Recieved", req.body);
    try {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&appid=${config.get("APIkey")}`, {
            method: 'GET',
            headers: null
        })
            .then(response => {
                console.log(
                    `Response: ${response.status} ${response.statusText}`
                );
                return response.json();
            })
            .then(text => {
                if(userId) bot.sendMessage(userId,`Weather in ${text.name}: ${text.weather[0].main} (${text.weather[0].description}) temperature is: ${text.main.temp} (feels like: ${text.main.feels_like})`)
                data = text;
                console.log(`Weather in ${text.name}: ${text.weather[0].main} (${text.weather[0].description}) temperature is: ${text.main.temp} (feels like: ${text.main.feels_like})`);
                res.status(200).json(data)
            })
            .catch(err => console.error(err));
    } catch (error) {
        console.log("Request /api/weather/current failed");
    }
})

module.exports = router;