import { cancelJob } from 'node-schedule';

export default class Agenda {
	public static fecharJob(jobId: string) {
		cancelJob(jobId);
	}
}
