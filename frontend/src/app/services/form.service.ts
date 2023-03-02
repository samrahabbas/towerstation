import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';


const FORM_URL = `${environment.apiUrl}form/`;

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    private http: HttpClient

  ) { }

  uploadDocument(data: any,file:any,userId:any){
    return this.http.post(FORM_URL + "uploadDocument",file);
  }
  getUserDocument(id:any){
    return this.http.get(FORM_URL + "getUserDocument/"  + id);
  }
  
  downloadDocument(fileName:any){
    var body = {filename:fileName}
    return this.http.post(FORM_URL + "downloadDocument",body, {
      responseType: 'blob'
    });

  }


}
