import { Client, Message, TextChannel } from 'discord.js';
import { Banco } from '../banco/banco';
import { Mensagem } from './Mensagem';

export class DiscordBot {
	private clientBot: Client;
	private conexaoBanco: Banco;

	constructor() {
		this.clientBot = new Client();
		this.conexaoBanco = new Banco();
	}

	start() {
		this.clientBot.login('NjM4NzM4MjE2MjM2NzQ0NzI1.Xe6s0g.kla7OG6t7O3r7NNZNRmBf2pL0hU');

		this.clientBot.on('message', this.handleMessage);
	}

	close() {
		this.clientBot.destroy();
	}

	private handleMessage(message: Message) {
		if (message.content.startsWith('!')) {
			const mensagem = new Mensagem(message);
			const erro = mensagem.validar();

			this.responderRapido(mensagem, erro || 'agendamento salvo.');
			if (erro) return;

			this.conexaoBanco.salvarMensagem(mensagem);

			switch (mensagem.tipo) {
				case 'Daqui':
					break;
				case 'Agenda':
					break;

				default:
					break;
			}

			// if (mensagem.mensagemOriginal.startsWith('!daqui ')) {
			// 	//executarComandoDaqui(message);
			// } else if (mensagem.mensagemOriginal.startsWith('!agenda ')) {
			// 	mensagem.tipo = 'agenda';
			// 	executarComandoAgenda(mensagem)
			// 		.then(() => {
			// 			this.conexaoBanco.salvarMensagem(mensagem as IMensagem);
			// 			mensagem.responder('mensagem salva!');
			// 		})
			// 		.catch(err => mensagem.responder(err));
			// }
		}
	}

	responderRapido(mensagem: Mensagem, msgCustom?: string) {
		const mensagemAEnviar = `<@${mensagem.idAutor}>, ${msgCustom || mensagem.mensagemFormatada}`;

		this.acharCanalInstance(mensagem.idCanalOriginal).send(mensagemAEnviar);
	}

	acharCanalInstance(idCanal: string) {
		return this.clientBot.channels.get(idCanal) as TextChannel;
	}
}
