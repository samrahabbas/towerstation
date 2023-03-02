import { ChangeDetectorRef,Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { LoadService } from "src/app/services/load.service";
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: "app-search-loads",
  templateUrl: "./search-loads.component.html",
  styleUrls: ["./search-loads.component.scss"],
  providers: [MessageService]
})
export class SearchLoadsComponent implements OnInit {
  userData: any;
  isLoading: boolean = false;
  noData: boolean = false;
  public loadsData: any = [];
  public searchLoadsForm: FormGroup;
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
      // id: '1',
      // age: '29m',
      // pickup: '3',
      // origin: 'Auburn, NY',
      // DHO: 280,
      // destination: 'Visalia, CA',
      // DHD: null,
      // trip: 2753,
      // eq: 'V',
      // length: '12ft',
      // weight: '42,000 lbs',
      // type: 'Full',
      // factor: true,
      // cs: 95,
      // DTP: 29,
      // company: 'Ocean Drive Logistics',
      // contact: 'abc@gmail.com',
      // offer: '$1,000',
    }
  ]

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly loadService: LoadService,
    private readonly cdr: ChangeDetectorRef,
    private readonly ngxSpinnerService: NgxSpinnerService,
    


  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getLoads();
  }

  private initForm(): void {
    this.searchLoadsForm = this.formBuilder.group({
      origin: [null, [Validators.required]],
      DHO: [null, []],
      destination: [null, [Validators.required]],
      DHD: [null, []],
      company: [null, [Validators.required]],
      contact: [null, []],
      offer: [null, [Validators.required]],
      truckTypeGroup: [null, []],
      truckTypes: [null, [Validators.required]],
      loadType: [null, []],
      lookBackHours: [null, []],
      startDate: [new Date(), []],
      endDate: [new Date(), []],
      age: [null, []],
      pickup: [null, []],
      weight: [null, []],
      trip: [null, []],
      eq: [null, []],
      length: [null, []],
      factor: [null, [Validators.required]],
      cs: [null, []],
    });
  }

  private getLoads(){
    this.ngxSpinnerService.show();
    
    this.userData = JSON.parse(localStorage.getItem("user")  || '{}');

    this.loadService.getLoads().subscribe((response: any) => {
      // console.log(response.length);
      if(response.length > 0){
        this.loads = response;
        this.ngxSpinnerService.hide();

        this.cdr.markForCheck();

        // console.log(this.loads);
      }else{
        console.log('b');
        this.ngxSpinnerService.hide();
     
      }
    });
  }

  public searchLoad(){
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.userData = JSON.parse(localStorage.getItem("user")  || '{}');
    this.loadService.searchLoads(this.searchLoadsForm.value, this.userData.id).subscribe((response: any) => {
      console.log(response.result.length);
      if(response.result.length > 0){
        this.loads =[];
        this.loads = response.result;
        this.isLoading = false;
        this.ngxSpinnerService.hide();

        // this.success = true;
        this.searchLoadsForm.reset({});
      }else{
        // this.error = true;
        this.noData = true;
        this.loads =[];
        this.isLoading = false;
        if(!this.isLoading){
          this.ngxSpinnerService.hide();
        }
        this.cdr.markForCheck();

      }
    });
  }
}
