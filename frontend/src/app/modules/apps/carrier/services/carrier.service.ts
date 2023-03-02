import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { GenericResponseDto } from "../../../../../core/dto/generic-response.dto";
import { ZipCodeDataDto } from "../../../../../core/dto/zip-code-data.dto";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { AuthService } from "../../../auth";

@Injectable()
export class CarrierService {
  static readonly CARRIER_URL = `${environment.apiUrl}/carriers`;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService
  ) {
  }

  public getZipCodeData(zipCode: string): Observable<GenericResponseDto<ZipCodeDataDto[]>> {
    return this.httpClient
      .get<GenericResponseDto<ZipCodeDataDto[]>>(`${CarrierService.CARRIER_URL}/zip-code-data/${zipCode}`,
        {
          headers: {
            Authorization: `Bearer ${this.authService.currentAuthValue?.token}`
          }
        });
  }

  public getAllStates(): Observable<GenericResponseDto<string[]>> {
    return this.httpClient
      .get<GenericResponseDto<string[]>>(`${CarrierService.CARRIER_URL}/states`,
        {
          headers: {
            Authorization: `Bearer ${this.authService.currentAuthValue?.token}`
          }
        });
  }

  public getBulkImportTemplateFile(): Observable<HttpResponse<Blob>> {
    return this.httpClient
      .get(`${CarrierService.CARRIER_URL}/bulk-import-template`,
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
      .post<GenericResponseDto<any[]>>(`${CarrierService.CARRIER_URL}/bulk-import`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${this.authService.currentAuthValue?.token}`
          }
        });
  }
}
