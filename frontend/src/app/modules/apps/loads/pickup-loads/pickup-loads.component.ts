import { ChangeDetectorRef,Component, OnInit,  TemplateRef, ViewChild } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { LoadService } from "src/app/services/load.service";
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import * as saveAs from "file-saver";
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-pickup-loads',
  templateUrl: './pickup-loads.component.html',
  styleUrls: ['./pickup-loads.component.scss'],
  providers: [MessageService]
})
export class PickupLoadsComponent implements OnInit {

  isLoading: boolean = false;
  noData: boolean = false;
  public loadsData: any = [];
  public loads: any = [];
  public loadDocuments: any = [];
  public pickupDate: any;
  public dropDate: any;
  public pickupForm: FormGroup;
  public docForm: FormGroup;
  public documentName: any;
  loadId:any;
  public statuses: string[] = ["In Progress", "Delieverd"];
  public status:any;
  public env:any;




  userData = JSON.parse(localStorage.getItem("user")  || '{}');
  private subs: Subscription = new Subscription();


  @ViewChild("AddLoadModal")
  public addLoadModal: TemplateRef<any>;
  @ViewChild("LoadDocumentModal")
  public loadDocumentModal: TemplateRef<any>;
  @ViewChild("AddDocumentModal")
  public addDocumentModal: TemplateRef<any>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly loadService: LoadService,
    private readonly cdr: ChangeDetectorRef,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly ngbModal: NgbModal,
    private readonly messageService: MessageService,
    private readonly router: Router,


  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.env = environment;
    this.getLoads();

  }
  
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  // public get f(): { [p: string]: AbstractControl } {
  //   return this.docForm?.controls;
  // }

  // public get file(): File {
  //   return this.f?.file?.value;
  // }
  
  private initForm(): void {
    this.pickupForm = this.formBuilder.group({
      pickupDate: [null, []],
      dropDate: [null, []],
      status: ['Pending', []],

    });

    // if (this.isEditing) {
    //   this.violationForm.patchValue({
    //     date: new Date(),
    //     violationType: "Truck Safety",
    //     violationDescription: "Test Description",
    //     authority: "Authority",
    //     location: "Test Location",
    //     fineAmount: 59.00,
    //     notes: "Test Notes"
    //   });
    // }
  }

  public onAddLoad(id:any): void {
    this.loadId = id;
    this.ngbModal.open(this.addLoadModal, {
      centered: true,
      backdrop: "static"
    });
  }

  public onAddDocument(id:any): void {

    // this.router.navigate(["apps/loads/document"]);
    this.router.navigate(["apps/loads/document"],{
      queryParams: {
        id
      }
    });

    // this.loadId = id;
    // this.ngbModal.open(LoadDocumentComponent, {
    //   size: "lg",
    //   centered: true,
    //   backdrop: "static",
    //   keyboard: false,
    //   animation: true
    // });
  }
  public onAddPdf(id:any): void {

    // this.router.navigate(["apps/loads/pdf"]);

    this.router.navigate(["apps/loads/pdf"], {
      queryParams: {
        id
      }
    });
  }

  public previewDoc(id:any): void {
    this.loadId = id;
    this.ngbModal.open(this.loadDocumentModal, {
      centered: true,
      backdrop: "static"
    });

    this.getLoadDocuments(this.loadId);

  }

  // public downloadLoadPdf(){

  //   this.subs.add(this.loadService.downloadDocument(fileName).subscribe(
  //     res=> saveAs(res, fileName),
  //   ));
    

  // }

  public getLoadDocuments(loadId:any){
    // this.ngxSpinnerService.show();
    this.subs.add(
      this.loadService.getLoadDocument(this.userData.id,loadId)
        .subscribe((res:any) => {
          console.log(res);
          if (res.length > 0) {
            this.loadDocuments = res;
            // this.customers = res;
            // console.log(this.customers);

            this.cdr.markForCheck();
          }
        }, error => {
          console.log({ error });
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error?.message,
            closable: true
          });
          this.isLoading = false;
          this.ngxSpinnerService.hide();
        }, () => {
          this.isLoading = false;
          this.ngxSpinnerService.hide();
        })
    );
  }



  public addLoadData() {
    this.isLoading = true;
    console.log(this.pickupForm.value);
    

    this.loadService.addPickupDate(this.pickupForm.value, this.loadId,this.userData.id).subscribe((response: any) => {
      console.log(response);
      if(response.message == "Date Added successfully"){
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: response.message,
          closable: true
    
        });
        this.ngbModal.dismissAll();
        // window.location.reload();

        this.isLoading = false;
        this.ngxSpinnerService.hide();
        
        // this.router.navigate(['/apps/customer/list'])
      }else{
        // this.error = true;
      }
    },
    (error: any) => {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: error.error?.message,
        closable: true
      });
      this.isLoading = false;
                this.ngxSpinnerService.hide();
    }, () => {
    });

  
  }

  public dismissAllModals(): void {
    this.ngbModal.dismissAll();
  }

  private getLoads(){
    this.ngxSpinnerService.show();
    
    this.userData = JSON.parse(localStorage.getItem("user")  || '{}');

    this.loadService.getLoads().subscribe((response: any) => {
      console.log(response);
      if(response.length > 0){
        this.loads = response;
        this.ngxSpinnerService.hide();

        this.cdr.markForCheck();
      }else{
        this.ngxSpinnerService.hide();
     
      }
    });
  }

  public downloadDoc(fileName:any): void {
    console.log('a');
    this.subs.add(this.loadService.downloadDocument(fileName).subscribe(
        res=> saveAs(res, fileName),
      ));
      

  }


}
