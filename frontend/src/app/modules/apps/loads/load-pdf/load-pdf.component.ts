import { ChangeDetectorRef,Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { LoadService } from 'src/app/services/load.service';
import { ZipCodeService } from 'src/app/services/zip-code.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-load-pdf',
  templateUrl: './load-pdf.component.html',
  styleUrls: ['./load-pdf.component.scss'],
  providers: [MessageService]

})
export class LoadPdfComponent implements OnInit {

  public isLoading:boolean = false;
  public loadDocForm: FormGroup;

  userData = JSON.parse(localStorage.getItem("user")  || '{}');


  private readonly subs: Subscription = new Subscription();


  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly loadService: LoadService,
    private readonly zipCodeService: ZipCodeService,
    private readonly cdr: ChangeDetectorRef,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();

  }

  public get f(): { [p: string]: AbstractControl } {
    return this.loadDocForm?.controls;
  }

  public get file(): File {
    return this.f?.file?.value;
  }

  
  private initForm(): void {
    this.loadDocForm = this.formBuilder.group({
      file: [null, [Validators.required]],
      documentName: [null, []],
      // documentTypes: [null, []],
      
    });
  }

  public onFileSelect(target: EventTarget | null): void {
    const event = target as HTMLInputElement;
    if (event.files) {
      this.f.file.setValue(event.files[0]);
      // this.f.documentName.setValue(this.file?.name);
    }
  }

  
  public onUploadDocument(){
    // console.log(this.loadDocForm.value);
    this.isLoading = true;

    const formData = new FormData();
    var data = JSON.stringify(this.loadDocForm.value);
 
    formData.append('file', this.file);
    formData.append('userId', this.userData.id);
    formData.append('loadId', this.activatedRoute.snapshot.queryParams.id);
    formData.append('data', data);

    this.loadService.uploadDocument(this.loadDocForm.value.documentName,formData, this.userData.id).subscribe((response: any) => {
      console.log(response);
      if(response.message == "Document upload successfully"){
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: response.message,
          closable: true
          
        });
        this.isLoading = false;
        this.ngxSpinnerService.hide();
        this.router.navigate(['/apps/loads/pickup'])
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
