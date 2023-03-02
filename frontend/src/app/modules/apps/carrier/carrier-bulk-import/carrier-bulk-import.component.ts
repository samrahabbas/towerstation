import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { NgxDropzoneChangeEvent } from "ngx-dropzone";
import { Observable, Subscription } from "rxjs";
import { HttpResponse } from "@angular/common/http";
import { CarrierService } from "../services/carrier.service";
import { CarrierBulkImportModel } from "../models/carrier-bulk-import.model";

@Component({
  selector: 'app-carrier-bulk-import',
  templateUrl: './carrier-bulk-import.component.html',
  styleUrls: ['./carrier-bulk-import.component.scss'],
  providers: [MessageService]
})
export class CarrierBulkImportComponent implements OnInit, OnDestroy, AfterViewInit {
  public isLoading: boolean = false
  public selectedFile?: File

  public hasHeaderRow: boolean = true;
  public fileData: any[] = [];
  public carrierData: CarrierBulkImportModel | any = new CarrierBulkImportModel();

  @ViewChild("FileImport")
  public fileImport: TemplateRef<any>;
  @ViewChild("DataMapping")
  public dataMapping: TemplateRef<any>;
  @ViewChild("DataValidation")
  public dataValidation: TemplateRef<any>;

  public selectedStage: TemplateRef<any>;

  private subs: Subscription = new Subscription();

  constructor(
    private readonly messageService: MessageService,
    private readonly carrierService: CarrierService,
    private readonly cdr: ChangeDetectorRef,
    private readonly ngxSpinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngAfterViewInit() {
    this.selectedStage = this.fileImport;
  }

  public get fields(): string[] {
    if (this.hasHeaderRow) {
      return Object.keys(this.fileData[0]);
    } else {
      return Object.values(this.fileData[0]);
    }
  }

  public onFileSelect(dropzoneChangeEvent: NgxDropzoneChangeEvent): void {
    if (dropzoneChangeEvent.rejectedFiles.length > 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select a valid file' });
      return;
    }
    this.selectedFile = dropzoneChangeEvent.addedFiles[0]
    console.log(this.selectedFile);
  }

  public onFileRemove(file: File): void {
    this.selectedFile = undefined
  }

  public onDropdownSelect(target: any, property: keyof CarrierBulkImportModel): void {
    console.log(target.value);
    console.log(this.fileData[0]);
    if (this.hasHeaderRow) {
      this.carrierData[property] = this.fileData[0][target.value];
    } else {
      this.carrierData[property] = target.value;
    }
  }

  public getBulkImportTemplateFile(): Observable<HttpResponse<Blob>> {
    return this.carrierService.getBulkImportTemplateFile()
  }

  public resetCarrierData(): void {
    this.carrierData = new CarrierBulkImportModel()
  }

  public uploadFile(): void {
    this.bulkImport()
  }

  private bulkImport(): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(this.carrierService
      .bulkImport(this.selectedFile!)
      .subscribe((res) => {
        this.fileData = res.data
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: 'File uploaded successfully',
          closable: true
        });
        this.selectedStage = this.dataMapping;
      }, error => {
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
      }));
  }
}
