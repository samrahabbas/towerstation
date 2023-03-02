import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';

const LOCATION_URL = `${environment.apiUrl}location/`;


@Injectable({
  providedIn: 'root'
})
export class LocationService {


  constructor(private http: HttpClient) { }

  addLocation(data: any, userId:any){
    // console.log(data);
    return this.http.post(LOCATION_URL + "addLocation", {
      userId, data
    });
  }

  getLocations(userId:any, userRole:any){
    return this.http.get(LOCATION_URL + "getLocations/" + userId + "/" + userRole)
  }

  getLocationById(id:any){
    return this.http.get(LOCATION_URL + "getLocationById/" + id)
  }

  updateLocation(data: any, id:any){
    return this.http.post(LOCATION_URL + "updateLocation", {
      id, data
    });
  }

  deleteLocation(id:any){
    return this.http.get(LOCATION_URL + "deleteLocation/" + id)
  }
  


}
