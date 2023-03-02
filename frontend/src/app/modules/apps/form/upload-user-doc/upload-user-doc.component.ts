import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { UserManagementService } from "src/app/services/user-management.service";
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upload-user-doc',
  templateUrl: './upload-user-doc.component.html',
  styleUrls: ['./upload-user-doc.component.scss'],
  providers: [MessageService]

})
export class UploadUserDocComponent implements OnInit {


  public users: any  = [];
  public loadDocForm: FormGroup;

  private subs: Subscription = new Subscription();
  userData = JSON.parse(localStorage.getItem("user")  || '{}');


  @ViewChild("UploadDocumentModal")
  public uploadDocumentModal: TemplateRef<any>;

  constructor(
    private readonly router: Router,
    private readonly messageService: MessageService,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly userManagementService: UserManagementService,
    private readonly cdr: ChangeDetectorRef,
    private readonly ngbModal: NgbModal,


  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  public get f(): { [p: string]: AbstractControl } {
    return this.loadDocForm?.controls;
  }

  public get file(): File {
    return this.f?.file?.value;
  }


  ngOnDestroy() {
    this.subs.unsubscribe();
  }


  // public uploadDocument(userId:any): void {
  //   this.ngbModal.open(this.uploadDocumentModal, {
  //     centered: true,
  //     backdrop: "static"
  //   });
  // }
  
  public uploadDocument(id:any): void {
    this.router.navigate(["apps/form/upload"], {
      queryParams: {
        id
      }
    });
  }

  public dismissAllModals(): void {
    this.ngbModal.dismissAll();
  }

  
  public onFileSelect(target: EventTarget | null): void {
    const event = target as HTMLInputElement;
    if (event.files) {
      this.f.file.setValue(event.files[0]);
      // this.f.documentName.setValue(this.file?.name);
    }
  }


  public onUploadDocument(){
    console.log(this.loadDocForm.value);
    // this.isLoading = true;

    // const formData = new FormData();
    // var data = JSON.stringify(this.loadDocForm.value);
 
    // formData.append('file', this.file);
    // formData.append('userId', this.userData.id);
    // formData.append('loadId', this.activatedRoute.snapshot.queryParams.id);
    // formData.append('data', data);

    // this.loadService.uploadDocument(this.loadDocForm.value.documentName,formData, this.userData.id).subscribe((response: any) => {
    //   console.log(response);
    //   if(response.message == "Document upload successfully"){
    //     this.messageService.add({
    //       severity: "success",
    //       summary: "Success",
    //       detail: response.message,
    //       closable: true
          
    //     });
    //     this.isLoading = false;
    //     this.ngxSpinnerService.hide();
    //     this.router.navigate(['/apps/loads/pickup'])
    //   }else{
    //     // this.error = true;
    //   }
    // },
    // (error: any) => {
    //   this.messageService.add({
    //     severity: "error",
    //     summary: "Error",
    //     detail: error.error?.message,
    //     closable: true
    //   });
    //   this.isLoading = false;
    //             this.ngxSpinnerService.hide();
    // }, () => {
    // });

  }





  private getAllUsers(): void {
    this.ngxSpinnerService.show();
    this.subs.add(
      this.userManagementService.getUsers(this.userData.userRole)
        .subscribe((res:any) => {
          console.log(res);
          if (res.length > 0) {
            this.users = res;
            console.log(this.users);
            this.ngxSpinnerService.hide();
            this.cdr.markForCheck();
          }else if(res.message == "Only admin access"){
            
          }
        }, error => {
          console.log({ error });
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.message,
            closable: true
          });
          this.ngxSpinnerService.hide();
        }, () => {
          this.ngxSpinnerService.hide();
        })
    );
  }



}
