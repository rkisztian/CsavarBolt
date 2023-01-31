import { Body, Controller, Delete, Get, Param, Post, Render } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
import { Csavar } from './csavar.entity';
import { Rendeles } from './rendeles.entity';

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
   async deleteCsavar(@Param('id') id: number) {
    const csavarRepo = this.dataSource.getRepository(Csavar);
    await csavarRepo.delete(id)
  }

  @Post('/api/csavar/:id/rendeles')
  async csavarRendeles(@Param('id') id: number, @Body() rendeles : Rendeles) {
    const rendelRepo = this.dataSource.getRepository(Rendeles)
    const csavarRepo = this.dataSource.getRepository(Csavar)
    let csavarok = (await csavarRepo.findOneBy({id : id})).keszlet
    if(csavarok - rendeles.db < 0){
      return{ error: 'Nincs csavar'}
    } else {
      csavarRepo.update({id: id}, {keszlet : csavarok-rendeles.db})

      let keszrendeles : Rendeles = {id : undefined, csavar_id: id, db : rendeles.db}
      rendelRepo.save(keszrendeles)
      return {osszesen : rendeles.db * (await csavarRepo.findOneBy({id: id})).ar}
    }
  }

  

}
