import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { AuthService } from "../../../auth";
import { Observable } from "rxjs";
import { GenericResponseDto } from "../../../../../core/dto/generic-response.dto";
import { ZipCodeDataDto } from "../../../../../core/dto/zip-code-data.dto";
import { CustomerModel } from "../models/customer.model";
import { CustomerDto } from "../dto/customer.dto";

@Injectable()
export class CustomerService {
  static readonly CUSTOMERS_URL = `${environment.apiUrl}/customers`;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService
  ) {
  }

  public getZipCodeData(zipCode: string): Observable<GenericResponseDto<ZipCodeDataDto[]>> {
    return this.httpClient
      .get<GenericResponseDto<ZipCodeDataDto[]>>(`${CustomerService.CUSTOMERS_URL}/zip-code-data/${zipCode}`,
        {
          headers: {
            Authorization: `Bearer ${this.authService.currentAuthValue?.token}`
          }
        });
  }

  public createCustomer(customer: CustomerModel): Observable<GenericResponseDto<any>> {
    return this.httpClient
      .post<GenericResponseDto<any>>(`${CustomerService.CUSTOMERS_URL}`, customer,
        {
          headers: {
            Authorization: `Bearer ${this.authService.currentAuthValue?.token}`
          }
        });
  }

  public getCustomers(): Observable<GenericResponseDto<CustomerDto[]>> {
    return this.httpClient
      .get<GenericResponseDto<CustomerDto[]>>(`${CustomerService.CUSTOMERS_URL}`,
        {
          headers: {
            Authorization: `Bearer ${this.authService.currentAuthValue?.token}`
          }
        });
  }

  public getCustomer(id: string): Observable<GenericResponseDto<CustomerDto>> {
    return this.httpClient
      .get<GenericResponseDto<CustomerDto>>(`${CustomerService.CUSTOMERS_URL}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.authService.currentAuthValue?.token}`
          }
        });
  }

  public updateCustomer(id: string, customer: CustomerModel): Observable<GenericResponseDto<any>> {
    return this.httpClient
      .put<GenericResponseDto<any>>(`${CustomerService.CUSTOMERS_URL}/${id}`, customer,
        {
          headers: {
            Authorization: `Bearer ${this.authService.currentAuthValue?.token}`
          }
        });
  }

  public deleteCustomer(id: string): Observable<GenericResponseDto<any>> {
    return this.httpClient
      .delete<GenericResponseDto<any>>(`${CustomerService.CUSTOMERS_URL}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.authService.currentAuthValue?.token}`
          }
        });
  }

  public getAllStates(): Observable<GenericResponseDto<string[]>> {
    return this.httpClient
      .get<GenericResponseDto<string[]>>(`${CustomerService.CUSTOMERS_URL}/states`,
        {
          headers: {
            Authorization: `Bearer ${this.authService.currentAuthValue?.token}`
          }
        });
  }

  public getBulkImportTemplateFile(): Observable<HttpResponse<Blob>> {
    return this.httpClient
      .get(`${CustomerService.CUSTOMERS_URL}/bulk-import-template`,
        {
          headers: {
            Authorization: `Bearer ${this.authService.currentAuthValue?.token}`
          },
          observe: "response",
          responseType: "blob"
        });
  }

  public bulkImport(file: File): Observable<GenericResponseDto<any[]>> {
    const formData = new FormData();
    formData.append("file", file);

    return this.httpClient
      .post<GenericResponseDto<any[]>>(`${CustomerService.CUSTOMERS_URL}/bulk-import`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${this.authService.currentAuthValue?.token}`
          }
        });
  }

  

}
