import { IMensagem } from '../interfaces/mensagem';
import { Message } from 'discord.js';
import { formatarDados, consistirAgenda } from '../util';
import { decodificarComandoAgenda } from '../comandos/agenda';

export const tipos = ['agenda', 'daqui', 'tododia'];
export class Mensagem implements IMensagem {
	public idAutor = '';
	public idCanalOriginal = '';
	public idMensagem = '';
	public mensagemOriginal = '';
	public mensagemFormatada?: string;
	public dataAgendada?: Date;
	public tipo?: string;
	public idCanalDestino?: string;

	constructor(msgOriginal: Message) {
		const dadosFormatados = formatarDados(msgOriginal);

		this.idAutor = dadosFormatados.idAutor;
		this.idCanalOriginal = dadosFormatados.idCanalOriginal;
		this.idMensagem = dadosFormatados.idMensagem;
		this.mensagemOriginal = dadosFormatados.mensagemOriginal;

		this.decodificar();
	}

	public validar() {
		return consistirAgenda(this);
	}

	private decodificar() {
		if (this.mensagemOriginal.startsWith('!daqui ')) {
			this.tipo = 'daqui';
		} else if (this.mensagemOriginal.startsWith('!agenda ')) {
			//Ex.: !agenda #canal "abcde #euamobatata 321" 20:45 em 2019/12/05
			// comando
			// <canal>
			// <mensagem>
			// <hora>
			// (em) <data>

			decodificarComandoAgenda(this);
		}
	}
}
