import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';


const ZIP_CODE_URL = `${environment.apiUrl}zip-code-data/`;


@Injectable({
  providedIn: 'root'
})
export class ZipCodeService {

  constructor(private http: HttpClient) { }

  getZipCodeData(zipCode:any){
    console.log(zipCode);
    return this.http.get(ZIP_CODE_URL + "zip-code-data/" + zipCode)
  }
  getStates(){
    return this.http.get(ZIP_CODE_URL + "getStates")
  }
}
