import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoadService } from 'src/app/services/load.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-create-load',
  templateUrl: './create-load.component.html',
  styleUrls: ['./create-load.component.scss'],
  providers: [DatePipe]

})
export class CreateLoadComponent implements OnInit {

  myDate:any = new Date();
  userId: any;
  userData: any;
  success: boolean = false;
  error: boolean = false;
  public isLoading: boolean = false;
  public origin: boolean = false;
  public destination: boolean = false;
  public company: boolean = false;
  public offer: boolean = false;
  public istruckTypes: boolean = false;
  public startDate: boolean = false;
  public endDate: boolean = false;
  public isFactor: boolean = false;


  constructor(private readonly formBuilder: FormBuilder,private LoadService: LoadService, 
    private datePipe: DatePipe ) {
      // this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
      // console.log(this.myDate)

  }


  public createLoadForm: FormGroup;
  public truckTypes: string[] = [
    'Vans, Standard',
    'Flatbeds',
    'Reefers',
    'Conestoga',
    'Containers',
    'Decks, Specialized',
    'Decks, Standard',
    'Dry Bulk',
    'Hazardous Materials',
    'Other Equipment',
    'Tankers',
    'Vans, Specialized',
  ]
  public loadTypes: string[] = [
    'Full',
    'Partial',
    'Both'
  ]
  public factor: string[] = [
    'True',
    'False',
  ]
  public loads: any[] = [
    {
      id: '1',
      age: '29m',
      pickup: '3',
      origin: 'Auburn, NY',
      DHO: 280,
      destination: 'Visalia, CA',
      DHD: null,
      trip: 2753,
      eq: 'V',
      length: '12ft',
      weight: '42,000 lbs',
      type: 'Full',
      factor: true,
      CS: 95,
      DTP: 29,
      company: 'Ocean Drive Logistics',
      contact: 'abc@gmail.com',
      offer: '$1,000',
    }
  ]



  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.createLoadForm = this.formBuilder.group({
      origin: [null, [Validators.required]],
      DHO: [null, []],
      destination: [null, [Validators.required]],
      DHD: [null, []],
      company: [null, [Validators.required]],
      contact: [null, []],
      offer: [null, [Validators.required]],
      truckTypeGroup: ['general', []],
      truckTypes: [null, [Validators.required]],
      loadType: ['Both', []],
      lookBackHours: [null, []],
      startDate: [new Date(), []],
      endDate: [new Date(), []],
      age: [null, []],
      pickup: [null, []],
      weight: [null, []],
      trip: [null, []],
      eq: [null, []],
      length: [null, []],
      factor: ['true', [Validators.required]],
      cs: [null, []],
    });
  }

  createLoad(){

    if(this.createLoadForm.value.origin == null){
      this.origin = true;
      window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
    }
    else if(this.createLoadForm.value.destination == null){
      this.destination = true;
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
    else if(this.createLoadForm.value.company == null){
      this.company = true;
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
    else if(this.createLoadForm.value.offer == null){
      this.offer = true;
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
    else if(this.createLoadForm.value.truckTypes == null){
      this.istruckTypes = true;
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
    else if(this.createLoadForm.value.startDate == null){
      this.startDate = true;
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
    else if(this.createLoadForm.value.endDate == null){
      this.endDate = true;
    }
    else if(this.createLoadForm.value.factor == null){
      this.isFactor = true;
    }else{
      // console.log(this.createLoadForm.value);
      this.isLoading = true;
  
      this.userData = JSON.parse(localStorage.getItem("user")  || '{}');
  
      // console.log(this.userData.id);
      this.LoadService.addLoads(this.createLoadForm.value, this.userData.id).subscribe((response: any) => {
        // console.log(response);
        if(response.message == "Create Load successfully"){
          // console.log("aa");
          this.success = true;
          this.isLoading = false;
          this.createLoadForm.reset({});
             
              window.scroll({ 
                top: 0, 
                left: 0, 
                behavior: 'smooth' 
              });
        }else{
          this.error = true;
        }
      });
    }
  }
}
