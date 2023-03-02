import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GenericResponseDto } from "../../../../../core/dto/generic-response.dto";
import { ZipCodeDataDto } from "../../../../../core/dto/zip-code-data.dto";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { AuthService } from "../../../auth";
import { ViewLocationDto } from "../dto/view-location.dto";
import { LocationDto } from "../dto/location.dto";

@Injectable()
export class LocationService {
  static readonly LOCATIONS_URL = `${environment.apiUrl}/locations`;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService
  ) {
  }

  public getZipCodeData(zipCode: string): Observable<GenericResponseDto<ZipCodeDataDto[]>> {
    return this.httpClient
      .get<GenericResponseDto<ZipCodeDataDto[]>>(`${LocationService.LOCATIONS_URL}/zip-code-data/${zipCode}`,
        {
          headers: {
            Authorization: `Bearer ${this.authService.currentAuthValue?.token}`
          }
        });
  }

  public getBulkImportTemplateFile(): Observable<HttpResponse<Blob>> {
    return this.httpClient
      .get(`${LocationService.LOCATIONS_URL}/bulk-import-template`,
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
      .post<GenericResponseDto<any[]>>(`${LocationService.LOCATIONS_URL}/bulk-import`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${this.authService.currentAuthValue?.token}`
          }
        });
  }

  public saveLocation(model: any): Observable<GenericResponseDto<any>> {
    return this.httpClient
      .post<GenericResponseDto<any>>(`${LocationService.LOCATIONS_URL}`,
        model,
        {
          headers: {
            Authorization: `Bearer ${this.authService.currentAuthValue?.token}`
          }
        });
  }

  public updateLocation(id: string, model: any): Observable<GenericResponseDto<any>> {
    return this.httpClient
      .put<GenericResponseDto<any>>(`${LocationService.LOCATIONS_URL}/${id}`,
        model,
        {
          headers: {
            Authorization: `Bearer ${this.authService.currentAuthValue?.token}`
          }
        });
  }

  public deleteLocation(id: string): Observable<GenericResponseDto<any>> {
    return this.httpClient
      .delete<GenericResponseDto<any>>(`${LocationService.LOCATIONS_URL}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.authService.currentAuthValue?.token}`
          }
        });
  }

  public getLocations(): Observable<GenericResponseDto<ViewLocationDto[]>> {
    return this.httpClient
      .get<GenericResponseDto<any>>(`${LocationService.LOCATIONS_URL}`,
        {
          headers: {
            Authorization: `Bearer ${this.authService.currentAuthValue?.token}`
          }
        });
  }

  public getLocation(id: string): Observable<GenericResponseDto<LocationDto>> {
    return this.httpClient
      .get<GenericResponseDto<any>>(`${LocationService.LOCATIONS_URL}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.authService.currentAuthValue?.token}`
          }
        });
  }
}
