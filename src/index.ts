const Discord = require('discord.js');
//const schedule = require('node-schedule');
//const client = Discord.client();
const fs = require('fs');
//let bancoDadosAgenda = JSON.parse(fs.readFileSync('db.json', 'utf8'));
import { Banco } from './banco';
import { Message } from 'discord.js';
import { IMensagem } from './interfaces/mensagem';
const conexao = new Banco();

const gerarIdUnico = (): string => {
	return (
		'_' +
		Math.random()
			.toString(36)
			.substr(2, 9)
	);
};

const formatarDados = (dados: Message, data?: Date, msgn?: string): IMensagem => {
	return {
		idAutor: dados.author.id,
		idCanal: dados.channel.id,
		idMensagem: gerarIdUnico(),
		mensagemOriginal: dados.content,
		mensagemFormatada: msgn,
		dataAgendada: data,
	};
};

// const salvarAgendaLocal = dados => {
// 	bancoDadosAgenda.push(dados);
// 	fs.writeFile('./db.json', JSON.stringify(bancoDadosAgenda), () => {});
// };

// const removerAgendaLocal = idAlvo => {
// 	const novaAgenda = bancoDadosAgenda.filter(el => el.identificador !== idAlvo);

// 	fs.writeFile('./db.json', JSON.stringify(novaAgenda), () => {});
// };

// const enviarMensagemCanal = (mensagem, canal) => {
// 	const channel = client.channels.find('name', canal);
// 	channel.send(mensagem);
// };

// const agendarMensagen = dados => {
// 	const job = schedule.scheduleJob(
// 		new Date(dados.dataAgendada),
// 		function() {
// 			enviarMensagemCanal(
// 				`<@${dados.dados.idAutor}>, lembrete: ${dados.mensagemFormatada}`,
// 				dados.dados.nomeCanal
// 			);
// 			job.cancel();
// 			removerAgendaLocal(dados.identificador);
// 		}.bind(null, dados)
// 	);
// };

// const responderAviso = (dados, mensagem = 'agenda criada!') => {
// 	const mensagemAEnviar = `<@${dados.dados.idAutor}>, ${mensagem}`;
// 	const canal = dados.dados.nomeCanal;
// 	enviarMensagemCanal(mensagemAEnviar, canal);
// };

// const consistirAgenda = (dados, callback) => {
// 	if (dados.mensagemFormatada <= 0) {
// 		return callback('Mensagem Vazia!');
// 	}

// 	const agora = new Date();

// 	if (dados.dataAgendada <= agora) {
// 		return callback('Essa data já passou!');
// 	}

// 	if (typeof dados.dataAgendada === 'string') {
// 		return callback('Data inválida!');
// 	}

// 	return callback();
// };

// const executarComandoDaqui = mensagem => {
// 	// !daqui xmins yhrs zdias <mensagem>
// 	//tanto faz a ordem dos indicadores de tempo
// 	let msgn = mensagem.textoOriginal
// 		.replace('!daqui ', '')
// 		.replace('min', '¨$%%¨')
// 		.replace('hrs', '¨#@*¨')
// 		.replace('dias', '¨_)@¨')
// 		.split('¨');

// 	const mins = msgn[msgn.indexOf('$%%') - 1] ? msgn[msgn.indexOf('$%%') - 1] : 0;
// 	const dias = msgn[msgn.indexOf('_)@') - 1] ? msgn[msgn.indexOf('_)@') - 1] : 0;
// 	const horas = msgn[msgn.indexOf('#@*') - 1] ? msgn[msgn.indexOf('#@*') - 1] : 0;
// 	mensagem.mensagemFormatada = msgn[msgn.length - 1].trim();

// 	const hoje = new Date();

// 	hoje.setDate(hoje.getDate() + Number(dias));
// 	hoje.setHours(hoje.getHours() + Number(horas));
// 	hoje.setMinutes(hoje.getMinutes() + Number(mins));

// 	mensagem.dataAgendada = hoje;

// 	consistirAgenda(mensagem, mensagemRetorno => {
// 		if (mensagemRetorno) {
// 			responderAviso(mensagem, mensagemRetorno);
// 		} else {
// 			agendarMensagen(mensagem);
// 			responderAviso(mensagem);
// 			salvarAgendaLocal(mensagem);
// 		}
// 	});
// };

// const executarComandoAgenda = mensagem => {
// 	// !agenda mensagem/hora/dia/mes/ano/canal?
// 	[msgn, hora, dia, mes, ano, canal] = mensagem.textoOriginal.substring(8).split('/');
// 	[horas, minutos] = hora.split(':');

// 	const dataAgendada = new Date(ano, --mes, dia, horas, minutos);

// 	mensagem.dataAgendada = dataAgendada;
// 	mensagem.mensagemFormatada = msgn;

// 	consistirAgenda(mensagem, mensagemRetorno => {
// 		if (mensagemRetorno) {
// 			responderAviso(mensagem, mensagemRetorno);
// 		} else {
// 			agendarMensagen(mensagem);
// 			responderAviso(mensagem);
// 			salvarAgendaLocal(mensagem);
// 		}
// 	});
// };

// Client.on('ready', () => {
// 	console.log(`Logged in as ${client.user.tag}!`);
// });

// client.on('message', msg => {
// 	if (msg.content.startsWith('!')) {
// 		msg = formatarDados(msg);
// 		if (msg.textoOriginal.startsWith('!daqui ')) {
// 			executarComandoDaqui(msg);
// 		} else if (msg.textoOriginal.startsWith('!agenda ')) {
// 			executarComandoAgenda(msg);
// 		}
// 	}
// });

// client.login('');

// (function() {
// 	bancoDadosAgenda.forEach(el => {
// 		agendarMensagen(el);
// 	});
// })();
