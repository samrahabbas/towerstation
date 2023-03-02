import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';


const LOADS_URL = `${environment.apiUrl}loads/`;

@Injectable({
  providedIn: 'root'
})
export class LoadService {
  
  
  userData = JSON.parse(localStorage.getItem("user")  || '{}');


  constructor(
    private http: HttpClient

  ) { }

   // Loads

   addLoads(data: any, u_id:any){
    return this.http.post(LOADS_URL + "add", {
      u_id, data
    });

  }

  getLoads(){
    return this.http.get(LOADS_URL + "getLoads/" + this.userData.id);
  }
  getAllLoads(){
    return this.http.get(LOADS_URL + "getAllLoads/" + this.userData.id);
  }
  searchLoads(data:any, user_id:any){
    return this.http.post(LOADS_URL + "search", { 
      user_id, data
    });
  }


  addPickupDate(data: any, loadId:any,userId:any){
    return this.http.post(LOADS_URL + "addPickupDate", {
      userId,loadId, data
    });

  }

  addLoadsDocument(data: any, userId:any, loadId:any){
    return this.http.post(LOADS_URL + "addLoadsDocument", {
      userId, loadId,data
    });

  }

  uploadDocument(data: any,file:any,userId:any){
    return this.http.post(LOADS_URL + "uploadDocument",file);
  }
  getLoadDocument(userId:any, laodId:any){
    return this.http.get(LOADS_URL + "getLoadDocument/" + userId + "/" + laodId);
  }

  downloadDocument(fileName:any){
    console.log(fileName);
    var body = {filename:fileName}
    return this.http.post(LOADS_URL + "downloadDocument",body, {
      responseType: 'blob'
    });

  }

}