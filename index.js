const Discord = require("discord.js");
const client = new Discord.Client();

var TinyDB = require("tinydb");
const agenda = new TinyDB("./db.json");

var cron = require("node-cron");

IniciarTimer();

function IniciarTimer() {
  //const channel = client.channels.find('name', 'financeiro');
  //channel.send(message);
}

function CarregarAlertas() {}

function EnviarMensgemCanal(mensagem, canal) {
  console.log("teste");

  var channel = client.channels.find("name", canal);
  channel.send(mensagem);
}

function Relogio() {}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function consistenciaAgenda(novaAgenda, callback) {
  console.log("aqui");
  if (novaAgenda.mensagem.lenght <= 0) {
    return callback("Mensagem Vazia");
  }

  if (
    !isNumber(novaAgenda.dia) ||
    (novaAgenda.dia < 1 && novaAgenda.dia > 31)
  ) {
    console.log("aqui");
    return callback("Dia invalido");
  }
  if (
    !isNumber(novaAgenda.mes) ||
    (novaAgenda.mes < 1 && novaAgenda.mes > 12)
  ) {
    return callback("Mês invalido");
  }
  if (!isNumber(novaAgenda.mes) || novaAgenda.ano < 2017) {
    return callback("Esse ano ja passou");
  }

  return callback("");
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  let mensagem = msg.content;

  if (mensagem.startsWith("!")) {
    // !agenda mensagem/dia/mes/ano/hora/canal?

    if (mensagem.startsWith("!agenda ")) {
      mensagem = mensagem.substring(8).split("/");

      novaAgenda = {
        mensagem: mensagem[0],
        dia: mensagem[1],
        mes: mensagem[2],
        ano: mensagem[3],
        hora: mensagem[4],
        canal: mensagem[5],
      };
      consistenciaAgenda(novaAgenda, mensagemRetorno => {
        if (mensagemRetorno) {
          msg.reply(mensagemRetorno);
        } else {
          agenda.appendItem(novaAgenda, (teste, novaAgenda, testt) => {
            console.log(novaAgenda);
            const hora = novaAgenda.hora.split(":");
            const stringAgenda = hora[1] + ' ' + hora[0] + ' ' + novaAgenda.dia + ' ' + novaAgenda.mes + ' *';

            cron.schedule(
              stringAgenda,
              EnviarMensgemCanal(novaAgenda.mensagem, novaAgenda.canal),
            );

            msg.reply("Agenda criada");
          });
        }
      });
    }
  }
});

client.login("");