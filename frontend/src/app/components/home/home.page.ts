import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { Station } from 'src/app/models/station';
import { ServiceService } from 'src/app/Services/Service.Service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [ServiceService]
})
export class HomePage {

  constructor(private serviceService: ServiceService, private router: Router) { }

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
}
