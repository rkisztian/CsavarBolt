import { Body, Controller, Delete, Get, Param, Post, Render } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
import { Csavar } from './csavar.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}



  @Get('/api/csavar')
  listCsavar(){
    const csavarRepo = this.dataSource.getRepository(Csavar);
    return csavarRepo.find();
  }

  @Post('/api/csavar')
  newCsavar(@Body() csavar: Csavar) {
    csavar.id = undefined;
    const csavarRepo = this.dataSource.getRepository(Csavar);
    csavarRepo.save(csavar);
  }

  @Delete('/api/csavar/:id')
  deleteCsavar(@Param('id') id: number) {
    const csavarRepo = this.dataSource.getRepository(Csavar);
    csavarRepo.delete(id);
  }

  

}
