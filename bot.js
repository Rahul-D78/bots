require('dotenv').config()

const { Client } = require('discord.js');
const { Tasks, Questions } = require('./db');
const bot = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const PREFIX = "$"
let d = new Date()

bot.on('ready', () => {
    console.log(`${bot.user.username} has logged in`);
})

bot
.on('warn', console.warn)
.on('error', console.error)

//Message Event
bot.on('messageCreate', async (message) => {

    if(message.author.bot === true) return;

    if(message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(1)
            .split(/\s+/);

        console.log(CMD_NAME);
        console.log(args);
        
        if(CMD_NAME === 'botctl' && args[0] === 'get' && args[1] === 'tasks') {
            todaysTask(message)
        }

        if(CMD_NAME === 'botctl' && args[0] === 'get' && args[1] === 'qestions') {
            todaysQes(message)
        }

        message.reply('hi')
    }

    if(message.content.startsWith("/pom_help")) {
        message.reply(`Hlw ${message.author.username} I am POM BOT \nI can help you stay consistent in your work`)
    }
    
    //sending message after every 1 hour
    reminder(message)
    setInterval(() => {
        reminder(message)
    }, 1000 * 60 * 60);

    todaysQes(message)
})  

async function todaysTask(message) {
    
    //getting all the tasks from the DB
    await Tasks.findAll()
    .then((tasks) => {
        const todaysTask = tasks.filter((date) => {
            return date === d.getDate()
        })
        message.reply(todaysTask);
        console.log(todaysTask);
    }).catch((e) => {
        console.error(e)
    })
}

async function todaysQes(message) {

    //getting all the questions from the DB
    await Questions.findAll()
    .then((qes) => {
        const todaysQes = qes.filter((date) => {
            return date === d.getDate()
        })
        message.reply(todaysQes);
        console.log(typeof(todaysQes));
    }).catch((e) => {
        console.error(e)
    })
}

function reminder(message) {

    let hour = d.toLocaleTimeString('en-GB').slice(0, 2)
    if (hour >= '07' && hour < '12') message.reply('Good Morning 🌞 \nFirst Phase Task');
    if (hour >= '12' && hour < '17') message.reply('Good Afternoon 🌞 \nSecond Phase Task');
    if (hour >= '17' && hour < '21') message.reply('Good Evening 🌟 \nThird Phase Task');    
    if (hour >= '21' && hour < '24') message.reply('Good Night 🌚 \nFourth Phase Task');
    if (hour >= '24' && hour < '02') message.reply('please! try to be a morning person 👽 \nI hope you have finished all your todays task');
    
}

bot.login(process.env.DISCORDJS_BOT_TOKEN)