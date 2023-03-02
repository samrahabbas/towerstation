import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';


const CARRIER_URL = `${environment.apiUrl}carrier/`;


@Injectable({
  providedIn: 'root'
})
export class CarrierService {

  constructor(private http: HttpClient) { }

  addCarrier(data: any, u_id:any){
    // console.log(data);
    return this.http.post(CARRIER_URL + "addCarrier", {
      u_id, data
    });
  }

  getCarriers(user_id:any, userRole:any){
    return this.http.get(CARRIER_URL + "getCarriers/" + user_id + "/" + userRole)
  }

  getCarrierById(id:any){
    return this.http.get(CARRIER_URL + "getCarrierById/" + id)
  }

  
  updateCarrier(data: any, id:any){
    console.log(id);
    return this.http.post(CARRIER_URL + "updateCarrier", {
      id, data
    });
  }

  deleteCarrier(id:any){
    return this.http.get(CARRIER_URL + "deleteCarrier/" + id)
  }
  
}
