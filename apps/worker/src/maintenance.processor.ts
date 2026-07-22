import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('maintenance')
export class MaintenanceProcessor extends WorkerHost {
  async process(job: Job): Promise<void> {
    await job.log('Foundation worker received a maintenance job.');
  }
}
