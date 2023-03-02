import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DocTypeDto } from "../../dto/doc-type.dto";
// import { CustomerService } from "src/app/services/customer.service";
import { DocManagementService } from "src/app/services/doc-management.service";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";


@Component({
  selector: "app-upload-doc-modal",
  templateUrl: "./upload-doc-modal.component.html",
  styleUrls: ["./upload-doc-modal.component.scss"],
  providers: [MessageService]

})
export class UploadDocModalComponent implements OnInit {

  public isLoading: boolean = false;
  public docForm: FormGroup;
  public entities: string[] = [
    "Carrier 1", "Carrier 2", "Carrier 3",
    "Load 1", "Load 2", "Load 3",
    "Location 1", "Location 2", "Location 3",
    "Customer 1", "Customer 2", "Customer 3"
  ];
  public rawDocTypes: {group: string, names: string[]}[] = [
    {
      group: "Most Common Load Document Types",
      names: [
        "All Documents Are Combined",
        "POD (Proof of Delivery)",
        "BOL (Bill of Lading)",
        "Driver Load Confirmation (Signed)",
        "Carrier Load Confirmation (Signed)",
        "Client Rate Confirmation (Signed)",
        "Bill / Invoice",
        "Carrier Invoice",
        "Packing List / Slip",
        "Load Tender"
      ]
    },
    {
      group: 'Other Load Document Types',
      names: [
        'Fuel Receipt',
        'Toll Receipt',
        'Lumper Receipt',
        'Detention Receipt',
        'Meal Receipt',
        'Maintenance / Repair',
        'Claim / OS&D',
        'DOT Fine / Notice',
        'Scale Ticket',
        'Carrier Payment',
        'Due Diligence Certificate',
        'Advance',
        'Other / Miscellaneous'
      ]
    },
    {
      group: 'Your Company / Shared Document Types',
      names: [
        'Carrier Packet (Full)',
        'Customer Packet (Full)',
        'Broker Contract',
        'Customer Contract',
        'Driver Contract',
        'Carrier Contract',
        'Insurance (COI) Request',
        'Insurance (Proof Of)',
        'Equipment / Lane Request',
        'DOT / MC / FF / URS Number',
        'Billing Instructions',
        'Quick Pay / Settlement Form',
        'W9 Form',
        'Credit Application',
        'Claim Form',
        'Driver Application',
        'Sales Packet',
        'Marketing Packet',
        'Freight Export Docs.',
        'Freight Import Docs.',
        'Other / Miscellaneous'
      ]
    }
  ];
  public docTypes: DocTypeDto[] = [];
  userData = JSON.parse(localStorage.getItem("user")  || '{}');


  private readonly subs: Subscription = new Subscription();


  constructor(
    private readonly ngbActiveModal: NgbActiveModal,
    private readonly formBuilder: FormBuilder,
    private readonly docManagementService: DocManagementService,
    private readonly messageService: MessageService,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly cdr: ChangeDetectorRef,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
    this.rawDocTypes.forEach(group => {
      group.names.forEach(name => {
        this.docTypes.push({
          name: name,
          group: group.group
        })
      })
    })
  }


  ngOnInit(): void {
    this.initForm();
  }

  public get f(): { [p: string]: AbstractControl } {
    return this.docForm?.controls;
  }

  public get file(): File {
    return this.f?.file?.value;
  }

  public closeModal(): void {
    this.ngbActiveModal.close();
  }

  public onFileSelect(target: EventTarget | null): void {
    const event = target as HTMLInputElement;
    if (event.files) {
      this.f.file.setValue(event.files[0]);
      this.f.documentName.setValue(this.file?.name);
    }
  }

  public getGroupByDocTypes(key: string | object, children: any[]): string | object {
    console.log(key, children);
    return this.docTypes.map(group => group.group);
  }

  private initForm(): void {
    this.docForm = this.formBuilder.group({
      file: [null, [Validators.required]],
      entities: [null, []],
      documentName: [this.file?.name, []],
      // documentTypes: [null, []],
      documentDescription: [null, []],
      isCompanyDocument: [false, []],
      
    });
  }

  public onUploadDocument(){
    console.log(this.docForm.value);

    const formData = new FormData();
    var data = JSON.stringify(this.docForm.value);
 
    formData.append('file', this.file);
    formData.append('userId', this.userData.id);
    formData.append('data', data);

    this.docManagementService.uploadDocument(this.docForm.value.documentName,formData, this.userData.id).subscribe((response: any) => {
      console.log(response);
      if(response.message == "Document upload successfully"){
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: response.message,
          closable: true
          
        });
        this.ngbActiveModal.close();
        this.isLoading = false;
        this.ngxSpinnerService.hide();
        // this.router.navigate(['/apps/doc-management/doc-processing'])
        window.location.reload();
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
}
