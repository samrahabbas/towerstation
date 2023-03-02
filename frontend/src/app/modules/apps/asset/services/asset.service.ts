import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { AuthService } from "../../../auth";
import { Observable } from "rxjs";
import { GenericResponseDto } from "../../../../../core/dto/generic-response.dto";
import { ZipCodeDataDto } from "../../../../../core/dto/zip-code-data.dto";

@Injectable()
export class AssetService {

  static readonly ASSET_URL = `${environment.apiUrl}/asset`;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService
  ) {}

  public getZipCodeData(zipCode: string): Observable<GenericResponseDto<ZipCodeDataDto[]>> {
    return this.httpClient
      .get<GenericResponseDto<ZipCodeDataDto[]>>(`${AssetService.ASSET_URL}/zip-code-data/${zipCode}`,
        {
          headers: {
            Authorization: `Bearer ${this.authService.currentAuthValue?.token}`
          }
        });
  }

  public getStates(): Observable<GenericResponseDto<ZipCodeDataDto[]>> {
    return this.httpClient
      .get<GenericResponseDto<ZipCodeDataDto[]>>(`${AssetService.ASSET_URL}/states`,
        {
          headers: {
            Authorization: `Bearer ${this.authService.currentAuthValue?.token}`
          }
        });
  }
}
