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
  async listCsavar(){
    const csavarRepo = this.dataSource.getRepository(Csavar);
    const sorok = await csavarRepo.find()
    return {Csavar : sorok}
  }

  @Post('/api/csavar')
  newCsavar(@Body() csavar: Csavar) {
    let hiba = "";
    csavar.id = undefined
    if(csavar.tipus.trim() == ""){
      hiba = "A tipust megadni kötelező"
      return hiba
    }
    if(csavar.hossz <= 0 || isNaN(csavar.hossz)) {
      hiba = "A hossz megadása kötelező"
    }
    if(isNaN(csavar.keszlet) || csavar.keszlet < 0){
      hiba ="A készlet megadása kötelező"
      return hiba
    }
    if(csavar.ar <= 0 || isNaN(csavar.ar)){
      hiba = "Az ár megadása kötelező"
    }
    const csavarRepo = this.dataSource.getRepository(Csavar)
    csavarRepo.save(csavar)
  }

  @Delete('/api/csavar/:id')
  deleteCsavar(@Param('id') id: number) {
    const csavarRepo = this.dataSource.getRepository(Csavar);
    csavarRepo.delete(id);
  }

  

}
