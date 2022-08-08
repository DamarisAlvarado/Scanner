import { Component } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { DatalocalService } from '../../services/datalocal.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  slidesoptions={
    allowSlidePrev: false,
    allowSalideNext:false
  };

  constructor(private barcodescanner: BarcodeScanner , private datalocal: DatalocalService) {}

  ionViewDidEnter(){


  }

  ionViewDidLeave(){

  }

  ionViewWillEnter(){

    this.scan();
  }
  ionViewWillLeave(){

  }


  scan(){
    this.barcodescanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);

      if(!barcodeData.cancelled){
        this.datalocal.guardaR(barcodeData.format,barcodeData.text);
      }
     }).catch(err => {
         console.log('Error', err);
        this.datalocal.guardaR('QRCode','https://itnleon.mindbox.app/login/alumno');

     });
  }
}
