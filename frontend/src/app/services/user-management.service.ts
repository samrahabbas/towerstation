import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';


const USER_MANAGEMENT_URL = `${environment.apiUrl}user-management/`;
const ROLE_URL = `${environment.apiUrl}roles/`;


@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private http: HttpClient) { }

  userData = JSON.parse(localStorage.getItem("user")  || '{}');
  // companyId: any;

  addUser(data:any, userId:any){
    console.log(data);
    return this.http.post(USER_MANAGEMENT_URL + "addUser" , {
      userId, data
    });
  }
  
  
  getUsers(id:any){
    return this.http.get(USER_MANAGEMENT_URL + "getUsers/" + id);
  }

  getUserById(id:any){
    return this.http.get(USER_MANAGEMENT_URL + "getUserById/" + id)
  }

  updateUser(data: any, id:any){
    return this.http.post(USER_MANAGEMENT_URL + "updateUser", {
      id, data
    });
  }

  deleteUser(id:any){
    return this.http.get(USER_MANAGEMENT_URL + "deleteUser/" + id)
  }

    
  getUserByRole(id:any){
    return this.http.get(ROLE_URL + "getUserByRole/" + id)
  }



  addPermission(name: any){
    // console.log(u_id);
    return this.http.post(USER_MANAGEMENT_URL + "addPermission", {
      name
    });

  }

  getPrivileges(){
    return this.http.get(USER_MANAGEMENT_URL + "getPrivileges")
  }

  
  getPermission(){
    return this.http.get(USER_MANAGEMENT_URL + "getPermissions")
  }

  updatePermission(name: any, id:any){
    // console.log(u_id);
    return this.http.post(USER_MANAGEMENT_URL + "updatePermission", {
      id, name
    });
  }

  
  deletePermission(id:any){
    return this.http.get(USER_MANAGEMENT_URL + "deletePermission/" + id)
  }


  addRole(data:any, userId:any){

    return this.http.post(ROLE_URL + "addRole" , {
      userId,data
    });

  }

  getRoles(user_id:any){
    return this.http.get(ROLE_URL + "getRoles/" + user_id)
  }


  checkRoles(userRole:any){
    return this.http.get(USER_MANAGEMENT_URL + "checkRole/" + userRole)


  }

}
