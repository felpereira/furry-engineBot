const Discord = require("discord.js");
const schedule = require("node-schedule");

const client = new Discord.Client();

const fs = require("fs");
let db = JSON.parse(fs.readFileSync("db.json", "utf8"));

const geraIDUnico = () => {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

const formataDados = (dados, data, msgn) => {
  return {
    dados: {
      idAutor: dados.author.id,
      nomeCanal: dados.channel.name
    },
    textoOriginal: dados.content,
    dataAgendada: data,
    mensagemFormatada: msgn,
    identificador: geraIDUnico()
  };
};

const salvaDb = dados => {
  db.push(dados);
  fs.writeFile("./db.json", JSON.stringify(db), () => {});
};

const removeDb = idAlvo => {
  const alvo = db.filter(el => {
    return el.identificador === idAlvo;
  });

  db.splice(db.indexOf(alvo[0]), 1);
  fs.writeFile("./db.json", JSON.stringify(db), () => {});
};

const EnviarMensagemCanal = (mensagem, canal) => {
  const channel = client.channels.find("name", canal);
  channel.send(mensagem);
};

const enviaLembreteGenerico = dados => {
  const job = schedule.scheduleJob(
    new Date(dados.dataAgendada),
    function() {
      EnviarMensagemCanal(
        `<@${dados.dados.idAutor}>, lembrete: ${dados.mensagemFormatada}`,
        dados.dados.nomeCanal
      );
      job.cancel();
      removeDb(dados.identificador);
    }.bind(null, dados)
  );
};

const respondeAviso = (dados, mensagem = "agenda criada!") => {
  const mensagemAEnviar = `<@${dados.dados.idAutor}>, ${mensagem}`;
  const canal = dados.dados.nomeCanal;
  EnviarMensagemCanal(mensagemAEnviar, canal);
};

const consistenciaAgenda = (dados, callback) => {
  if (dados.mensagemFormatada <= 0) {
    return callback("Mensagem Vazia!");
  }

  const agora = new Date();

  if (dados.dataAgendada <= agora) {
    return callback("Essa data já passou!");
  }

  if (typeof dados.dataAgendada === "string") {
    return callback("Data inválida!");
  }

  return callback();
};

const comandoDaqui = mensagem => {
  // !daqui xmins yhrs zdias <mensagem>
  //tanto faz a ordem dos indicadores de tempo
  let msgn = mensagem.textoOriginal
    .replace("!daqui ", "")
    .replace("min", "¨$%%¨")
    .replace("hrs", "¨#@*¨")
    .replace("dias", "¨_)@¨")
    .split("¨");

  const mins = msgn[msgn.indexOf("$%%") - 1]
    ? msgn[msgn.indexOf("$%%") - 1]
    : 0;
  const dias = msgn[msgn.indexOf("_)@") - 1]
    ? msgn[msgn.indexOf("_)@") - 1]
    : 0;
  const horas = msgn[msgn.indexOf("#@*") - 1]
    ? msgn[msgn.indexOf("#@*") - 1]
    : 0;
  mensagem.mensagemFormatada = msgn[msgn.length - 1].trim();

  const hoje = new Date();

  hoje.setDate(hoje.getDate() + Number(dias));
  hoje.setHours(hoje.getHours() + Number(horas));
  hoje.setMinutes(hoje.getMinutes() + Number(mins));

  mensagem.dataAgendada = hoje;

  consistenciaAgenda(mensagem, mensagemRetorno => {
    if (mensagemRetorno) {
      respondeAviso(mensagem, mensagemRetorno);
    } else {
      enviaLembreteGenerico(mensagem);
      respondeAviso(mensagem);
      salvaDb(mensagem);
    }
  });
};

const comandoAgenda = mensagem => {
  // !agenda mensagem/hora/dia/mes/ano/canal?
  [msgn, hora, dia, mes, ano, canal] = mensagem.textoOriginal
    .substring(8)
    .split("/");
  [horas, minutos] = hora.split(":");

  const dataAgendada = new Date(ano, --mes, dia, horas, minutos);

  mensagem.dataAgendada = dataAgendada;
  mensagem.mensagemFormatada = msgn;

  consistenciaAgenda(mensagem, mensagemRetorno => {
    if (mensagemRetorno) {
      respondeAviso(mensagem, mensagemRetorno);
    } else {
      enviaLembreteGenerico(mensagem);
      respondeAviso(mensagem);
      salvaDb(mensagem);
    }
  });
};

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  if (msg.content.startsWith("!")) {
    msg = formataDados(msg);
    if (msg.textoOriginal.startsWith("!daqui ")) {
      comandoDaqui(msg);
    } else if (msg.textoOriginal.startsWith("!agenda ")) {
      comandoAgenda(msg);
    }
  }
});

client.login("NjM4NzM4MjE2MjM2NzQ0NzI1.XbhNmQ.vQvznzHsUY3YG7r-4-HRfIdhPQQ");

(function() {
  db.forEach(el => {
    enviaLembreteGenerico(el);
  });
})();
