import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PermissionDto } from "../dto/permission.dto";
import { HttpClient } from "@angular/common/http";
import { GenericResponseDto } from "../../../../../core/dto/generic-response.dto";
import { environment } from "../../../../../environments/environment";
import { AuthService } from "../../../auth";
import { PrivilegeDto } from "../dto/privilege.dto";

@Injectable()
export class UserManagementService {
  static readonly ROLES_URL = `${environment.apiUrl}/roles`;

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {

  }

  public getModules(): Observable<GenericResponseDto<PermissionDto[]>> {
    return this.http
      .get<GenericResponseDto<PermissionDto[]>>(`${UserManagementService.ROLES_URL}/modules`,
        {
          headers: {
            Authorization: `Bearer ${this.authService?.currentAuthValue?.token}`
          }
        });
  }

  public addModule(name: string): Observable<GenericResponseDto<any>> {
    return this.http
      .post<GenericResponseDto<any>>(`${UserManagementService.ROLES_URL}/modules`,
        {
          name
        },
        {
          headers: {
            Authorization: `Bearer ${this.authService?.currentAuthValue?.token}`
          }
        });
  }

  public deleteModule(id: number): Observable<GenericResponseDto<any>> {
    return this.http
      .delete<GenericResponseDto<any>>(`${UserManagementService.ROLES_URL}/modules/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.authService?.currentAuthValue?.token}`
          }
        });
  }

  public updateModule(id: number, name: string): Observable<GenericResponseDto<any>> {
    return this.http
      .put<GenericResponseDto<any>>(`${UserManagementService.ROLES_URL}/modules/${id}`,
        {
          name
        },
        {
          headers: {
            Authorization: `Bearer ${this.authService?.currentAuthValue?.token}`
          }
        });
  }

  public getPrivileges(): Observable<GenericResponseDto<PrivilegeDto[]>> {
    return this.http
      .get<GenericResponseDto<PrivilegeDto[]>>(`${UserManagementService.ROLES_URL}/privileges`,
        {
          headers: {
            Authorization: `Bearer ${this.authService?.currentAuthValue?.token}`
          }
        });
  }
  public addRole(privilege_id: string, module_id: string): Observable<GenericResponseDto<any>> {
    return this.http
      .post<GenericResponseDto<any>>(`${UserManagementService.ROLES_URL}/roles`,
        {
          privilege_id, module_id
        },
        {
          headers: {
            Authorization: `Bearer ${this.authService?.currentAuthValue?.token}`
          }
        });
  }

}
