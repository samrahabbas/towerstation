import { Injectable } from "@angular/core";
import { CountryCallingCodeDto } from "./dto/country-calling-code.dto";
import { FormArray, FormGroup } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class CoreHelperService {
  public static countryCallingCodes: CountryCallingCodeDto[] = [
    {
      countryCode: "US",
      callingCode: "+1",
      flag: "assets/media/flags/united-states.svg"
    },
    {
      countryCode: "CA",
      callingCode: "+1",
      flag: "assets/media/flags/canada.svg"
    },
    {
      countryCode: "MX",
      callingCode: "+52",
      flag: "assets/media/flags/mexico.svg"
    }
  ];

  /*
   Returns an array of invalid control/group names, or a zero-length array if
   no invalid controls/groups where found
*/
  public static findInvalidControlsRecursive(formToInvestigate: FormGroup | FormArray): string[] {
    const invalidControls: any[] = [];
    let recursiveFunc = (form: FormGroup | FormArray) => {
      Object.keys(form.controls).forEach(field => {
        const control = form.get(field);
        if (control?.invalid) {
          invalidControls.push({ field, errors: control.errors });
        }
        if (control instanceof FormGroup) {
          recursiveFunc(control);
        } else if (control instanceof FormArray) {
          recursiveFunc(control);
        }
      });
    };
    recursiveFunc(formToInvestigate);
    return invalidControls;
  }
}
