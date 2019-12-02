import { IMensagem } from '../interfaces/mensagem';
import { consistirAgenda } from '../util';

export default async function(mensagem: IMensagem) {
	//Ex.: !agenda #canal "abcde #euamobatata 321" 20:45 em 2019/12/05
	// comando
	// <canal>
	// <mensagem>
	// <hora>
	// (em) <data>

	mensagem.tipo = 'Agenda';

	mensagem.mensagemFormatada = mensagem.mensagemOriginal.substring(
		mensagem.mensagemOriginal.indexOf('"') + 1,
		mensagem.mensagemOriginal.lastIndexOf('"')
	);

	mensagem.idCanal = mensagem.mensagemOriginal.substr(mensagem.mensagemOriginal.indexOf('#') + 1, 18);

	const horario = mensagem.mensagemOriginal.substr(mensagem.mensagemOriginal.lastIndexOf(':') - 2, 5);

	const indexEm = mensagem.mensagemOriginal.lastIndexOf('em');
	let data: string;

	if (indexEm > 0) {
		data = mensagem.mensagemOriginal.substr(indexEm + 3, 10);
	} else {
		data = new Date().getDate().toString();
	}

	mensagem.dataAgendada = new Date(`${horario} ${data} GMT-03:00`);

	return await consistirAgenda(mensagem);
}
