import { ChangeDetectorRef,Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UploadDocModalComponent } from "../modals/upload-doc-modal/upload-doc-modal.component";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { DocManagementService } from 'src/app/services/doc-management.service';
import { saveAs } from 'file-saver';
import { data } from 'jquery';
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";


@Component({
  selector: 'app-doc-processing',
  templateUrl: './doc-processing.component.html',
  styleUrls: ['./doc-processing.component.scss'],
  providers: [MessageService]

})
export class DocProcessingComponent implements OnInit , OnDestroy{

  
  public isLoading: boolean = false;
  public documents: any  = [];

  userData = JSON.parse(localStorage.getItem("user")  || '{}');
  permissionData = JSON.parse(localStorage.getItem("permissions")  || '{}');
  docManagementUpdate:boolean =false;
  docManagementDelete:boolean = false;
  docManagementCreate:boolean = false;


  private subs: Subscription = new Subscription();
  @ViewChild("DeleteDocumentSwal")
  public DeleteDocumentSwal: SwalComponent;

  constructor(
    private readonly ngbModal: NgbModal,
    private readonly router: Router,
    private readonly messageService: MessageService,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly docManagementService: DocManagementService,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    if(this.userData.userRole == 1 || this.userData.userRole == null ){
      this.docManagementUpdate= true;
      this.docManagementDelete= true;
      this.docManagementCreate= true;
    }else{
      for(let i=0; i < this.permissionData.length; i++){
  
        if(this.permissionData[i].name == "Doc Management"){
          // this.userManagement = true;
          if(this.permissionData[i].privilegeId == 1){
            this.docManagementCreate = true;
          }
          if(this.permissionData[i].privilegeId == 3){
            this.docManagementUpdate = true;
          }
          if(this.permissionData[i].privilegeId == 4){
            this.docManagementDelete = true;
          }
   
        }
        
      }
    }
    this.getDocuments();
}

  ngOnDestroy() {
    this.subs.unsubscribe();
  }


  public openDocUploadModal(): void {
    const modalRef = this.ngbModal.open(UploadDocModalComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      animation: true,
    });
  }

  public previewDoc(): void {
  }

  public downloadDoc(fileName:any): void {
    this.subs.add(this.docManagementService.downloadDocument(fileName).subscribe(
        res=> saveAs(res, fileName),
      ));
      

  }

  public async deleteDoc(id:any): Promise<void> {
    await this.DeleteDocumentSwal.update({
      title: "Delete document"
    });
    const swalResult = await this.DeleteDocumentSwal.fire();
    if (swalResult.value) {
      this.deleteDocument(id);
    }


  }

  public deleteDocument(id:any){

    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.docManagementService.deleteDocument(id).subscribe(
        (data:any) => {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: data.message,
            closable: true
          });
          this.getDocuments();
        },
        (error: any) => {
          this.isLoading = false;
          this.ngxSpinnerService.hide();
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error?.data,
            closable: true
          });
        }, () => {
          this.isLoading = false;
          this.ngxSpinnerService.hide();
        })
    );


  }

  private getDocuments(): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.docManagementService.getDocuments(this.userData.id, this.userData.userRole)
        .subscribe((res:any) => {
          // console.log(res);
          if (res.length > 0) {
            this.documents = res;
            console.log(this.documents);

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


}
