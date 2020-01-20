import { Mensagem } from '../discordBot/Mensagem';
//import

//TODO agendar a mensagem

export const decodificarComandoAgenda = (mensagem: Mensagem): void => {
	const { mensagemOriginal } = mensagem;

	mensagem.mensagemFormatada = mensagemOriginal.substring(
		mensagemOriginal.indexOf('"') + 1,
		mensagemOriginal.lastIndexOf('"')
	);

	const horario = mensagemOriginal.substr(mensagemOriginal.lastIndexOf(':') - 2, 5);

	const indexEm = mensagemOriginal.lastIndexOf('em');
	let data: string;

	if (indexEm > 0) {
		data = mensagemOriginal.substr(indexEm + 3, 10);
	} else {
		data = new Date().getDate().toString();
	}

	mensagem.dataAgendada = new Date(`${horario} ${data} GMT-03:00`);

	mensagem.idCanalDestino = mensagemOriginal.substr(mensagemOriginal.indexOf('#') + 1, 18);

	mensagem.tipo = 'Agenda';
};

export const agendar = (mensagem: Mensagem) => {};
