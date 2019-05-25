import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bike } from '../models/bike';
import { Station } from '../models/station';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  stationBike: Bike[];
  unassignedBike: Bike[];
  selectedBike: Bike;

  station: Station[];
  selectedStation: Station;

  readonly URL_API = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { 
    this.selectedStation = new Station();
    this.selectedBike = new Bike();
  }

  getStations() {
    return this.http.get(this.URL_API + '/stations');
  }

  getStation(_id: String) {
    return this.http.get(this.URL_API + `/station/get/${_id}`);
  }

  addBike(stationId: string, bike: Bike) {
    return this.http.put(this.URL_API + `/station/bike/add/${stationId}`, bike);
  }

  deleteBike(stationId: string, bike: Bike) {
    return this.http.put(this.URL_API + `/station/bike/delete/${stationId}`, bike);
  }

  getUnassignedBikes() {
    return this.http.get(this.URL_API + '/bikes/unassigned');
  }
}