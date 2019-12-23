import { connection, connect } from 'mongoose';
import { Mensagem } from '../discordBot/Mensagem';
import MensagemSchema from '../interfaces/mensagem';
const CONNECTION_STRING =
	'mongodb+srv://root:admin@cluster0-hcv5y.mongodb.net/botsecullum?retryWrites=true&w=majority';

export class Banco {
	constructor(args?: any) {}

	salvarMensagem(msg: Mensagem) {
		connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
		const db = connection;

		db.once('open', () => {
			const novaMsg = new MensagemSchema(msg);
			novaMsg.save();
		});
	}
}
