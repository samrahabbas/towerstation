import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { GenericResponseDto } from "../../../../../core/dto/generic-response.dto";
import { ZipCodeDataDto } from "../../../../../core/dto/zip-code-data.dto";
import { AuthService } from "../../../auth";

@Injectable()
export class SettingsService {
  static readonly SHARED_URL = `${environment.apiUrl}/shared`;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService
  ) {}

  public getZipCodeData(zipCode: string): Observable<GenericResponseDto<ZipCodeDataDto[]>> {
    return this.httpClient
      .get<GenericResponseDto<ZipCodeDataDto[]>>(`${SettingsService.SHARED_URL}/zip-code-data/${zipCode}`,
        {
          headers: {
            Authorization: `Bearer ${this.authService.currentAuthValue?.token}`
          }
        });
  }
}
