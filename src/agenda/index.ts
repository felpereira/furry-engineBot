import { scheduleJob, Job, cancelJob } from 'node-schedule';
import { Mensagem } from '../discordBot/Mensagem';
import { gerarIdUnico } from '../util';
import Agenda from './agenda';

export class Agendamento {
	private idJob: string;
	private jobInstance: Job;
	private mensagemInstance: Mensagem;

	constructor(mensagem: Mensagem) {
		this.mensagemInstance = mensagem;
		this.idJob = gerarIdUnico();
		this.jobInstance = this.gerarSchedule();
	}

	public fecharJob() {
		cancelJob(this.idJob);
	}

	private gerarSchedule() {
		if (!this.mensagemInstance.dataAgendada) throw new Error();

		const callback = () => {
			this.mensagemInstance.enviarMensagemAgendada(`${this.mensagemInstance.mensagemFormatada}`);
			Agenda.fecharJob(this.idJob);
		};

		return scheduleJob(this.idJob, this.mensagemInstance.dataAgendada, callback);
	}
}
