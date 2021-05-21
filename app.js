require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");
const config = require("./config");
const app = new Telegraf(config.token);

//0 1

function generatePasswordHard(lenght) {
  let sep = config.sumbols.split("");
  let k, result;
  for (let i = sep.length - 1; i > 0; i--) {
    k = Math.floor(Math.random() * (i + 1));
    result = sep[k];
    sep[k] = sep[i];
    sep[i] = result;
  }

  return sep.slice(0, lenght).join("");
}

function simpleRandomString(lenght) {
  let result = "";
  for (let i = 0; i < lenght; i++)
    result += config.sumbols[Math.floor(Math.random() * config.sumbols.length)];
  return result;
}

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
      ["Сгенерировать сложный пароль"],
      ["Сгенерировать простой пароль"],
      ["Сгенерировать из ключевых слов"],
    ]).resize()
  )
);

app.hears("Сгенерировать сложный пароль", (ctx) =>
  ctx.reply(`Ваш пароль:  ${simpleRandomString(20)}`)
);
app.hears("Сгенерировать простой пароль", (ctx) =>
  ctx.reply(`Ваш пароль:  ${generatePasswordHard(8)}`)
);
app.hears("Сгенерировать из ключевых слов", (ctx) =>
  ctx.reply("Окей,вводи слова")
);

app.on("text", (ctx) => {
  let text = ctx.message.text;

  function genAPassFromKeyWords(text) {
    for (const [key, value] of Object.entries(config.toReplace)) {
      text = text.replace(key, value);
    }


    text = text
      .split("")
      .reduce(
        (a, c) =>
          a +
          (/[ugdkrctyfwvzlphsim]/i.test(c) ? c.toUpperCase() : c.toLowerCase()),
        ""
      );

    text = text.split("");

    for (i = 0; i < Math.floor(text.length / 3); i++) {
      let additional = "*$%#";
      text.splice(
        Math.floor(Math.random() * text.length),
        0,
        additional[Math.floor(Math.random() * additional.length)]
      );
    }

    return text.join("");
  }
  {
    ctx.reply(`Ваш пароль:  ${genAPassFromKeyWords(text)}`);
  }
});

app.launch();
