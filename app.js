require('dotenv').config();
const { Telegraf, Markup, Context } = require('telegraf');
const app = new Telegraf(process.env.BOT_TOKEN);
const { passwordStrength } = require('check-password-strength');


app.start((ctx) =>
  ctx.reply(
    `
Приветствую, ${ctx.message.from.first_name}!
Хочешь сгенерировать надежный пароль? Тогда ты по адресу. Нажимай на клавишу "Сгенерировать сложный пароль" 
или "Сгенерировать простой пароль" и я выведу его!)
Также я могу сгненерировать тебе пароль исходя из ключевых слов которые ты введешь

Например: 
вход-cucushka,curit,voditel
выход-cUCu3hk@cuR1tVod1t3l
`,
    Markup.keyboard([
      ["Сгенерировать сложный пароль"],["Сгенерировать простой пароль"],
      ["Сгенерировать из ключевых слов"]
     
    ]) .resize()
  )
);


app.hears("Сгенерировать сложный пароль",(ctx)=>{
 
 let password="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!№;%:?*()_+="

  function generateHardPassword(password){

    let arr=password.split('');
      let j, temp;
      for(let i = arr.length-1; i > 0; i--){
        j = Math.floor(Math.random()*(i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }

      return arr.slice(0,20).join('');

  }
  {ctx.reply(`Ваш пароль :   ${generateHardPassword(password)}`)};
    
})


app.hears("Сгенерировать простой пароль",(ctx)=>{
 
  let password="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!№;%:?*()_+="
 
   function generateSimplePassword(password){
 
     let sep=password.split('');
       let k, result;
       for(let i = sep.length-1; i > 0; i--){
         k = Math.floor(Math.random()*(i + 1));
         result = sep[k];
         sep[k] = sep[i];
         sep[i] = result;
       }
 
       return sep.slice(0,8).join('');
 
   }
   {ctx.reply(`Ваш пароль :    ${generateSimplePassword(password)}`)};
   
 })
 
app.hears("Сгенерировать из ключевых слов",(ctx)=>{
    {ctx.reply('Окей,вводи слова')}
    
 })

 app.on('text', (ctx) => {

let text=ctx.message.text

      function genAPassFromKeyWords(text){
      let replacedSymbols= text.replace('a','@').replace('o','0').replace('z','2').replace('e','3')
        .replace('s','2').replace('i','1').replace('b','8')

   let upcase=replacedSymbols.split('').reduce((a, c) => a + (/[ugdkrctyfwvzlphsim]/i.test(c) ? c.toUpperCase() : c.toLowerCase()), "")
      
   let array=upcase.split('')

      array.splice(Math.floor(Math.random()*array.length), 0,"*")
      array.splice(Math.floor(Math.random()*array.length), 0,"%")
      array.splice(Math.floor(Math.random()*array.length),0,'#')
      array.splice(Math.floor(Math.random()*array.length),0,'$')
    
      return array.join('')
     
    }
    {ctx.reply(`Ваш пароль :    ${genAPassFromKeyWords(text)}`)}
})
app.launch();