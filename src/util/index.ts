import { Message } from 'discord.js';
import { Mensagem } from '../discordBot/Mensagem';
import { IMensagem } from '../interfaces/mensagem';

export function gerarIdUnico(): string {
	return (
		'_' +
		Math.random()
			.toString(36)
			.substr(2, 9)
	);
}

export function formatarDados(dados: Message, data?: Date, msgn?: string, tipo?: string): IMensagem {
	return {
		idAutor: dados.author.id,
		idCanalOriginal: dados.channel.id,
		idMensagem: gerarIdUnico(),
		mensagemOriginal: dados.content,
		mensagemFormatada: msgn,
		dataAgendada: data,
		tipo: tipo
	};
}

export function consistirAgenda(dados: Mensagem) {
	if (typeof dados.mensagemFormatada != 'string' || dados.mensagemFormatada.length <= 0) {
		return 'Mensagem Vazia!';
	}

	if (
		Object.prototype.toString.call(dados.dataAgendada) != '[object Date]' ||
		isNaN(dados.dataAgendada!.getTime())
	) {
		return 'Data inválida!';
	} else if (dados.dataAgendada && dados.dataAgendada <= new Date()) {
		return 'Essa data já passou!';
	}

	return;
}
