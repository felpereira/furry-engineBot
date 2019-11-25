import { connection, connect } from 'mongoose';
import Mensagem, { IMensagem } from './interfaces/mensagem';

const CONNECTION_STRING = 'mongodb+srv://root:admin@cluster0-hcv5y.mongodb.net/botsecullum?retryWrites=true&w=majority';

export class Banco {
	constructor(args?: any) {}

	salvarMensagem(msg: IMensagem) {
		connect(CONNECTION_STRING, { useNewUrlParser: true });
		const db = connection;

		db.once('error', err => {
			console.log(err);
		});

		db.once('open', () => {
			const novaMsg = new Mensagem(msg);
			novaMsg.save();
		});
	}
}
