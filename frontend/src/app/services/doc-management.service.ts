import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';

const DOCUMENT_URL = `${environment.apiUrl}doc-management/`;

@Injectable({
  providedIn: 'root'
})
export class DocManagementService {

  constructor(private http: HttpClient) { }

    
  uploadDocument(data: any,file:any,userId:any){
    return this.http.post(DOCUMENT_URL + "uploadDocument",file);
  }

  getDocuments(userId:any, userRole:any){
    return this.http.get(DOCUMENT_URL + "getDocuments/" + userId + "/" + userRole)
  }

  downloadDocument(fileName:any){
    console.log(fileName);
    var body = {filename:fileName}
    return this.http.post(DOCUMENT_URL + "downloadDocument",body, {
      responseType: 'blob'
    });

  }


  deleteDocument(id:any){
    return this.http.get(DOCUMENT_URL + "deleteDocument/" + id)
  }


}
