import { Client, Message, TextChannel } from 'discord.js';
import { Banco } from '../banco/banco';
import * as util from '../util';

import { IMensagem } from '../interfaces/mensagem';

import executarComandoAgenda from '../comandos/agenda';

export class DiscordBot {
	private clientBot: Client;
	private conexaoBanco: Banco;

	constructor() {
		this.clientBot = new Client();
		this.conexaoBanco = new Banco();
	}

	start() {
		this.clientBot.login('NjM4NzM4MjE2MjM2NzQ0NzI1.XeRBpQ.TKTRrozvi5SDa0nt-MR0ixJuFrU');

		this.clientBot.on('message', (message: Message) => {
			if (message.content.startsWith('!')) {
				const msgFormatada = util.formatarDados(message);

				if (msgFormatada.mensagemOriginal.startsWith('!daqui ')) {
					//executarComandoDaqui(message);
				} else if (msgFormatada.mensagemOriginal.startsWith('!agenda ')) {
					executarComandoAgenda(msgFormatada)
						.then(msg => {
							this.conexaoBanco.salvarMensagem(msg as IMensagem);
						})
						.catch(err => message.reply(err));
				}
			}
		});
	}

	responderAviso(mensagem: string, canal: string, user: number) {
		const mensagemAEnviar = `<@${user}>, ${mensagem}`;

		const canalIstance = this.clientBot.channels.get(canal) as TextChannel;
		canalIstance.send(mensagemAEnviar);
	}
}
