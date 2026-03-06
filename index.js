const telegramBot=require('node-telegram-bot-api');
const dotenv=require('dotenv');
const axios=require('axios');
dotenv.config(); // parse all the contents of the.env file and add them to process.env


const bot=new telegramBot(process.env.TELEGRAM_TOKEN,{polling:true});

bot.on('message',(msg)=>{

    const chatId=msg.chat.id;
    bot.sendMessage(chatId,"Hello, I am a joke bot. I can tell you fhaaaaaaaaa jokes. Just send me the command /joke and I will tell you a joke.");
});

bot.onText(/\/joke/, async(msg) => { // for network interaction use async and await with axios
    const respone=await axios.get('https://official-joke-api.appspot.com/random_joke')

    const setup=respone.data.setup
    const punchline=respone.data.punchline

    bot.sendMessage(msg.chat.id, `${setup}\n${punchline}`)
})
bot.onText(/^\//, async (msg) => {
    const chatId = msg.chat.id;
    const command = msg.text.split(' ')[0];
    
    if (command === '/joke') {
        // This will be handled by the specific /joke handler
        return;
    }
    if (command === '/start') {
        bot.sendMessage(chatId, "hello");
        return;
    }
    
    // Handle unknown commands
    bot.sendMessage(chatId, " Unknown command! Available commands: /joke, /start");
});