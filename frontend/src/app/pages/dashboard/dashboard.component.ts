import { ChangeDetectorRef, Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, AfterViewInit } from "@angular/core";
import { FormService } from "src/app/services/form.service";
import { Subscription } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";
// import * as saveAs from "file-saver";

// import WebViewer, { WebViewerInstance } from '@pdftron/webviewer';
// import { LoadService } from "src/app/services/load.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  @ViewChild('viewer') viewer: ElementRef;

  public isLoading: boolean = false;
  public showData: boolean = false;
  public documents: any  = [];
  userData = JSON.parse(localStorage.getItem("user")  || '{}');


  private subs: Subscription = new Subscription();

  constructor(
    private readonly formService: FormService,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly cdr: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit(): void {
    // WebViewer({
    //   path:'../assets/lib',
    //   // initialDoc: '../assets/files/webviewer-demo-annotated.pdf'
    //   initialDoc: 'http://localhost:3200/pdf'
    //   // initialDoc: 'https://pdftron.s3.amazonaws.com/download/pl/webviewer-demo.pdf'

    // },  this.viewer.nativeElement).then(instance =>{

    // });
  }

  ngOnInit(): void {
    // this.getUserDocument();
   
  }


  // private getUserDocument(): void {
  //   this.isLoading = true;
  //   this.ngxSpinnerService.show();
  //   this.subs.add(
  //     this.formService.getUserDocument(this.userData.id)
  //       .subscribe((res:any) => {
  //         console.log(res);
  //         if (res.length > 0) {
  //           this.showData = true;
  //           this.documents = res;
  //           // console.log(this.customers);

  //           this.cdr.markForCheck();
  //         }
  //       }, error => {
  //         console.log({ error });
  //         // this.messageService.add({
  //         //   severity: "error",
  //         //   summary: "Error",
  //         //   detail: error.error?.message,
  //         //   closable: true
  //         // });
  //         this.isLoading = false;
  //         this.ngxSpinnerService.hide();
  //       }, () => {
  //         this.isLoading = false;
  //         this.ngxSpinnerService.hide();
  //       })
  //   );
  // }

  // public downloadDoc(fileName:any): void {
  //   this.subs.add(this.formService.downloadDocument(fileName).subscribe(
  //       res=> saveAs(res, fileName),
  //     ));
      

  // }




}
