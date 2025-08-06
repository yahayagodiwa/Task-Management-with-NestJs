import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private testService: TestService) {}

  @Get('users')
  getUsers() {
    return this.testService.getUsers();
  }
}
