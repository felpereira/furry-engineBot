import { Message } from 'discord.js';
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
		idCanal: dados.channel.id,
		idMensagem: gerarIdUnico(),
		mensagemOriginal: dados.content,
		mensagemFormatada: msgn,
		dataAgendada: data,
		tipo: tipo,
	};
}

export function consistirAgenda(dados: IMensagem) {
	return new Promise<string | IMensagem>((res, rej) => {
		if (typeof dados.mensagemFormatada != 'string' || dados.mensagemFormatada.length <= 0) {
			rej('Mensagem Vazia!');
		}

		if (
			Object.prototype.toString.call(dados.dataAgendada) != '[object Date]' ||
			isNaN(dados.dataAgendada!.getTime())
		) {
			rej('Data inválida!');
		} else if (dados.dataAgendada && dados.dataAgendada <= new Date()) {
			rej('Essa data já passou!');
		}

		res(dados);
	});
}
