import { Controller, Get } from '@nestjs/common';
import { HealthStatus } from '@whatsapp-business/shared';

@Controller()
export class AppController {
  @Get('health')
  health(): HealthStatus {
    return { status: 'ok', service: 'api' };
  }
}
