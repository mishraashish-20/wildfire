import { Controller, Get } from '@nestjs/common';
import { ok } from './common/api';
@Controller()
export class AppController { @Get('health') health() { return ok({ status: 'ok', service: 'wildfire-backend', timestamp: new Date().toISOString() }); } }
