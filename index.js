const Discord = require('discord.js');
const client = new Discord.Client();

var TinyDB = require('tinydb');
const test_db = new TinyDB('./db.json');

var cron = require('node-cron');

IniciarTimer();

function IniciarTimer() {
  const channel = client.channels.find('name', 'financeiro');
  channel.send(message);
}

function CarregarAlertas() {}

function EnviarMensgemCanal() {}

function Relogio() {}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  let mensagem = msg.content;

  if (mensagem.startsWith('!')) {
    let message = mensagem.substring(
      mensagem.indexOf('"') + 1,
      mensagem.lastIndexOf('"')
    );

    mensagem = mensagem.substring(1).split(' ');
    console.log(mensagem);

    if (mensagem[0].startsWith('remind')) {
      let data = mensagem[mensagem.length - 1].split(':');

      var time = new Date();
      time.setHours(data[0]);
      time.setMinutes(data[1]);

      mensagem = {
        where: mensagem[1],
        when: time,
        message: message,
        autor: 'blue'
      };

      test_db.appendItem(mensagem, () => console.log('teta'));
    }

    if (msg.content === 'ping') {
      msg.reply('Pong!');
    }
  }
});

client.login('');
