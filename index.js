const telegramBot = require('node-telegram-bot-api');
const dotenv=require('dotenv');
dotenv.config();


console.log(process.env.Telegram_Token);

const bot=new telegramBot(process.env.Telegram_Token,{polling:true});

bot.on('message',(msg)=>{

    const chatId=msg.chat.id;
    bot.sendMessage(chatId,"Hello! I am your Joke Bot. Send /joke to get a random joke.");
});

bot .onText(/\/joke/,async (msg)=>{
    const chatId=msg.chat.id;
    try{
        const joke=await getJoke();
        bot.sendMessage (chatId,joke);
    }   catch (error){  
        bot.sendMessage(chatId,"Sorry, I couldn't fetch a joke at the moment.");
    }
});

async function getJoke(){
    const axios=require('axios');
    const response=await axios.get('https://official-joke-api.appspot.com/random_joke');
    const jokeData=response.data;
    return `${jokeData.setup}\n${jokeData.punchline}`;
}
bot.onText(/^\//, async (msg) => {
    const chatId = msg.chat.id;
    const command = msg.text.split(' ')[0];
    
    if (command === '/joke') {
        // This will be handled by the specific /joke handler
        return;
    }
    if (command === '/start') {
        bot.sendMessage(chatId, "👋 Welcome to the Joke Bot! Send /joke to get a random joke.");
        return;
    }
    
    // Handle unknown commands
    bot.sendMessage(chatId, "❌ Unknown command! Available commands: /joke, /start");
});
