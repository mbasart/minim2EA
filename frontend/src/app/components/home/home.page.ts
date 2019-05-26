import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { Station } from 'src/app/models/station';
import { ServiceService } from 'src/app/Services/Service.Service';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [ServiceService]
})
export class HomePage {

  constructor(private serviceService: ServiceService, private router: Router,public toastController: ToastController) {}

  ngOnInit() {
    localStorage.removeItem('stationId');
    this.getStations();
  }

  getStations() {
    this.serviceService.getStations()
      .subscribe(res =>{
        this.serviceService.station = res as Station[];
    })
  }

  viewStation(station) {
    this.router.navigate(["/bikes"], {queryParams: {"station": station}} );
  }

  sortAlphabet(){
    this.serviceService.station.sort(function(a,b){
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })
  }

  sortBikes(){
    this.serviceService.station.sort(function(a,b){
      var textA = a.bikes.length;
      var textB = b.bikes.length;
      return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
    })
  }

  async presentToastNot() {
    const toast = await this.toastController.create({
      message: 'This station does not exist, sorry :(',
      duration: 3000
    });
    toast.present();
  }

  findName(form?: NgForm){
    if(form){
      for(let i=0; i<this.serviceService.station.length; i++){
        let pos = this.serviceService.station[i].name.search(form.value.name);
        if(pos != -1){
          var stationFind = this.serviceService.station[i];
        }
      }
      //var textC = this.serviceService.station[0].name.search(form.value.name);
      console.log(stationFind);
      if(stationFind != null){
        this.serviceService.station = [];
      this.serviceService.station[0] = stationFind;
      }else {
        this.getStations();
        this.presentToastNot();
      }
    }
  }
}
