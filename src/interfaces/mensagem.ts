import { Document, Schema, model } from 'mongoose';

export interface IMensagem {
	idAutor: string;
	idCanal: string;
	idMensagem: string;
	mensagemOriginal: string;
	mensagemFormatada?: string;
	dataAgendada?: Date;
}

export interface IMensagemModel extends IMensagem, Document {}

export const MensagemSchema = new Schema({
	idAutor: { type: String, required: true },
	idCanal: { type: String, required: true },
	idMensagem: { type: String, required: true },
	mensagemOriginal: { type: String, required: true },
	mensagemFormatada: String,
	dataAgendada: Date,
});

const Mensagem = model<IMensagemModel>('mensagens', MensagemSchema);
export default Mensagem;
