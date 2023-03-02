import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';


const ZIP_CODE_URL = `${environment.apiUrl}zip-code-data/`;
const CUSTOMER_URL = `${environment.apiUrl}customer/`;
const SHIPPER_URL = `${environment.apiUrl}shipper/`;
const SIGNED_URL = `${environment.apiUrl}signed-documents/`;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {



  constructor(private http: HttpClient) { }

  getZipCodeData(zipCode:any){
    return this.http.get(ZIP_CODE_URL + "zip-code-data/" + zipCode)
  }

  
  addCustomer(data: any, u_id:any){
    return this.http.post(CUSTOMER_URL + "addCustomer", {
      u_id, data
    });
  }

  
  getCustomers(user_id:any, userRole:any){
    return this.http.get(CUSTOMER_URL + "getCustomers/" + user_id + "/" + userRole);
  }

  
  getCustomerById(id:any){
    return this.http.get(CUSTOMER_URL + "getCustomerById/" + id)
  }

  updateCustomer(id: any, data:any){
    return this.http.post(CUSTOMER_URL + "updateCustomer", {
      id, data
    });
  }

  deleteCustomer(id:any){
    return this.http.get(CUSTOMER_URL + "deleteCustomer/" + id)
  }
  
  addCustomerShipper(data: any, user_id:any){
    return this.http.post(SHIPPER_URL + "addCustomerShipper", {
      user_id, data
    });
  }

  getCustomerShipper(user_id:any, userRole:any){
    return this.http.get(SHIPPER_URL + "getCustomerShipper/" + user_id + "/" + userRole)
  }

  getCustomerShipperById(id:any){
    return this.http.get(SHIPPER_URL + "getCustomerShipperById/" + id)
  }

  getDocuments(user_id:any, userRole:any){
    return this.http.get(SIGNED_URL + "getDocuments/" + user_id + "/" + userRole);
  }


  addSignedDocument(formData: any){
    return this.http.post(SIGNED_URL + "addDocument",
       formData);
  }

  deleteDocument(id:any){
    return this.http.get(SIGNED_URL + "deleteDocument/" + id)
  }

  getSignedDocumentsById(id:any){
    return this.http.get(SIGNED_URL + "getSignedDocumentsById/" + id)
  }

  getSignedDocuments(id:any,userRole: any){
    return this.http.get(SIGNED_URL + "getSignedDocuments/" + id + "/" + userRole);
  }


}


