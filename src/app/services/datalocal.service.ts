import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';
import{ Storage} from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatalocalService {

 guardados: Registro[]=[];

  // eslint-disable-next-line max-len
  constructor(private storage: Storage , private inappB: InAppBrowser, private navCtrl: NavController) {
    this.cargarStorage();
  }
 async cargarStorage(){
  this.storage.create();
  this.guardados = await this.storage.get('registros')|| [];
 }

  async guardaR(format: string,text: string){
    await this.cargarStorage();
    const nuevoRegistro = new Registro (format,text);
    this.guardados.unshift(nuevoRegistro);
    console.log(this.guardados);
    this.storage.set('registros',this.guardados);

    this.abrirRegistro(nuevoRegistro);

  }
  abrirRegistro(registro: Registro){
   // this.navCtrl.navigateForward('/tabs/Tab2');
    switch(registro.type){
      case 'http':
      //abrir navegador wwb
       this.inappB.create(registro.text,'_system');
      break;
    }
  }

  enviarCorreo(){
    const arrgeloR=[];
    const titulos = 'Tipo,Formato,Creado en ,Texto \n';
    arrgeloR.push(titulos);
    this.guardados.forEach(registro=>{
      const linea = `${registro.type},${registro.format},${registro.created},${registro.text.replace(',','')}\n`;

      arrgeloR.push(linea);

    });

  }




}
