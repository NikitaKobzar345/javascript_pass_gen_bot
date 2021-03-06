require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const emojiRegex=require('emoji-regex/RGI_Emoji.js')
const config=require('./config');
const app = new Telegraf(process.env.BOT_TOKEN);

const emoji = emojiRegex()

function generatePassword(length){
  let chars=config.sumbols;
  let password='';
  for(let i=0;i<=length;i++){
    password+=chars[Math.floor(Math.random()* chars.length )]
  }
  return password;
}


app.start((ctx) =>
  ctx.reply(
    `
Приветствую, ${ctx.message.from.first_name}!
Хочешь сгенерировать надежный пароль? Тогда ты по адресу. Нажимай на клавишу "Сгенерировать сложный пароль" 
или "Сгенерировать простой пароль" и я выведу его!)
Также я могу сгненерировать тебе пароль исходя из ключевых слов которые ты введешь.

Например: 
вход-cucushka,curit,voditel
выход-cUCu3hk@cuR1tVod1t3l

Учти что я не принимаю эмодзи!
`,
    Markup.keyboard([
      ["Сгенерировать сложный пароль"],["Сгенерировать простой пароль"],
      ["Сгенерировать из ключевых слов"]
     
    ]) .resize()
  )
);


app.hears("Сгенерировать сложный пароль",(ctx)=>
  ctx.reply(`Ваш пароль:  ${generatePassword(19)}`))

app.hears("Сгенерировать простой пароль", (ctx) =>
  ctx.reply(`Ваш пароль:  ${generatePassword(11)}`)
);

app.hears("Сгенерировать из ключевых слов", (ctx) =>
  ctx.reply("Окей,вводи слова")
);

 app.on('text', (ctx) => {

let text=ctx.message.text;

  if(text.match(emoji)){
  ctx.reply('Я не принимаю эмодзи')
  return
}

  function genAPassFromKeyWords(text) {
    
    text = text
      .split("")
      .reduce(
        (a, c) =>
          a +
        ((Math.floor(Math.random() * text.length > 5 )) ? c.toUpperCase() : c.toLowerCase()),
        ""
      );
   
   text = text.split("");

    let additional='!@#$%^&*(){}[]=<>/,.';
    
   for (i = 0; i < Math.floor(text.length / 3); i++) {
      
      text.splice(
        Math.floor(Math.random() * text.length),
        0,
        additional[Math.floor(Math.random() * additional.length)]

      );       
  }

  return text.join('');

}
  if(text.length >= 40){
    ctx.reply('Слишком много символов')
  }
  else
    ctx.reply(`Ваш пароль:  ${genAPassFromKeyWords(text)}`)
 
})

app.launch();
