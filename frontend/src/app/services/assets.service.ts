import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';

const ASSETS_URL = `${environment.apiUrl}assets/`;
const TRAILERS_URL = `${environment.apiUrl}trailers/`;
const POWER_UNIT_URL = `${environment.apiUrl}powerunit/`;
const DRIVER_URL = `${environment.apiUrl}drivers/`;


@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  constructor(private http: HttpClient) { }
  addAssetGroup(data: any, user_id:any){
    return this.http.post(ASSETS_URL + "addAssetGroup", {
      user_id, data
    });
  }

  getAssets(user_id:any, userRole:any){
    return this.http.get(ASSETS_URL + "getAssets/" + user_id +  "/" + userRole)
  }

  getAssetById(id:any){
    return this.http.get(ASSETS_URL + "getAssetById/" + id)
  }

  
  updateAssets(id: any, data:any){
    return this.http.post(ASSETS_URL + "updateAssets", {
      id, data
    });
  }

  deleteAssets(id:any){
    return this.http.get(ASSETS_URL + "deleteAssets/" + id)
  }



  //Trailers

  addTrailers(data: any, user_id:any){
    return this.http.post(TRAILERS_URL + "addTrailers", {
      user_id, data
    });
  }

  getTrailers(user_id:any, userRole:any){
    return this.http.get(TRAILERS_URL + "getTrailers/" + user_id + "/" + userRole)
  }

  getTrailerById(trailerId:any){
    return this.http.get(TRAILERS_URL + "getTrailerById/" + trailerId)
  }

  updateTrailer(id: any, data:any){
    return this.http.post(TRAILERS_URL + "updateTrailer", {
      id, data
    });
  }

  deleteTrailer(id:any){
    return this.http.get(TRAILERS_URL + "deleteTrailer/" + id)
  }

    // Trailer Maintenance Log 

  addTrailerLog(data: any, userId:any){
    return this.http.post(TRAILERS_URL + "addTrailerLog", {
      userId, data
    });
  }
  getTrailersLog(user_id:any, userRole:any){
    return this.http.get(TRAILERS_URL + "getTrailersLog/" + user_id + "/" + userRole)
  }

  getTrailerLogById(id:any){
    return this.http.get(TRAILERS_URL + "getTrailerLogById/" + id)
  }

  updateTrailerLog(id: any, data:any){
    return this.http.post(TRAILERS_URL + "updateTrailerLog", {
      id, data
    });
  }

  deleteTrailerLog(id:any){
    return this.http.get(TRAILERS_URL + "deleteTrailerLog/" + id)
  }



  // Power Unit

  addPowerUnit(data: any, user_id:any){
    return this.http.post(POWER_UNIT_URL + "addPowerUnit", {
      user_id, data
    });
  }

  
  getPowerUnitById(powerId:any){
    return this.http.get(POWER_UNIT_URL + "getPowerUnitById/" + powerId)
  }
  getPowerUnits(user_id:any, userRole:any){
    return this.http.get(POWER_UNIT_URL + "getPowerUnits/" + user_id + "/" + userRole)
  }

  updatePowerUnit(id: any, data:any){
    return this.http.post(POWER_UNIT_URL + "updatePowerUnit", {
      id, data
    });
  }

  deletePower(id:any){
    console.log(id);
    return this.http.get(POWER_UNIT_URL + "deletePowerUnit/" + id)
  }

  // Power Unit Maintenance Log

  addPowerUnitLog(data: any, userId:any){
    return this.http.post(POWER_UNIT_URL + "addPowerUnitLog", {
      userId, data
    });
  }

  getPowerUnitLog(user_id:any, userRole:any){
    return this.http.get(POWER_UNIT_URL + "getPowerUnitLog/" + user_id + "/" + userRole)
  }

  getPowerUnitLogById(id:any){
    return this.http.get(POWER_UNIT_URL + "getPowerUnitLogById/" + id)
  }

  
  updatePowerUnitLog(id: any, data:any){
    return this.http.post(POWER_UNIT_URL + "updatePowerUnitLog", {
      id, data
    });
  }


  deletePowerUnitLog(id:any){
    return this.http.get(POWER_UNIT_URL + "deletePowerUnitLog/" + id)
  }



  // Drivers

  addDriver(data: any, user_id:any){
    return this.http.post(DRIVER_URL + "addDriver", {
      user_id, data
    });
  }
  
  getDrivers(user_id:any, userRole:any){
    return this.http.get(DRIVER_URL + "getDrivers/" + user_id + "/" + userRole)
  }

  getDriverById(driverId:any){
    return this.http.get(DRIVER_URL + "getDriverById/" + driverId)
  }

  
  updateDriver(id: any, data:any){
    return this.http.post(DRIVER_URL + "updateDriver", {
      id, data
    });
  }

  
  deleteDriver(id:any){
    return this.http.get(DRIVER_URL + "deleteDriver/" + id)
  }

    // Pay Items

  addPayItems(data: any, userId:any){
      return this.http.post(DRIVER_URL + "addPayItems", {
        userId, data
      });
  }

    
  getDriverPayItems(userId:any, userRole:any){
    return this.http.get(DRIVER_URL + "getDriverPayItems/" + userId + "/" + userRole)
  }

  getPayItemById(driverId:any){
    return this.http.get(DRIVER_URL + "getPayItemById/" + driverId)
  }

  updatePayItem(id: any, data:any){
    return this.http.post(DRIVER_URL + "updatePayItem", {
      id, data
    });
  }

  deletePayItem(id:any){
    return this.http.get(DRIVER_URL + "deletePayItem/" + id)
  }




  // driver violations

  addViolation(data: any, userId:any){
    return this.http.post(DRIVER_URL + "addViolation", {
      userId, data
    });
  }

  getViolations(userId:any, userRole:any){
    return this.http.get(DRIVER_URL + "getViolations/" + userId + "/" + userRole)
  }

  getViolationById(id:any){
    return this.http.get(DRIVER_URL + "getViolationById/" + id)
  }

  updateViolation(id: any, data:any){
    return this.http.post(DRIVER_URL + "updateViolation", {
      id, data
    });
  }

  deleteViolation(id:any){
    return this.http.get(DRIVER_URL + "deleteViolation/" + id)
  }

  // Driver Deduction

  
  addDeduction(data: any, userId:any){
    return this.http.post(DRIVER_URL + "addDeduction", {
      userId, data
    });
  }

  getDriverDeductions(userId:any, userRole:any){
    return this.http.get(DRIVER_URL + "getDriverDeductions/" + userId + "/" + userRole)
  }

  getDeductionById(driverId:any){
    return this.http.get(DRIVER_URL + "getDeductionById/" + driverId)
  }

  updateDeduction(id: any, data:any){
    return this.http.post(DRIVER_URL + "updateDeduction", {
      id, data
    });
  }
  deleteDeduction(id:any){
    return this.http.get(DRIVER_URL + "deleteDeduction/" + id)
  }



}
