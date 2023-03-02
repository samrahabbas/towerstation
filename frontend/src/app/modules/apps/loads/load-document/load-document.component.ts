import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WebcamImage,WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { LoadService } from 'src/app/services/load.service';
import { MessageService } from "primeng/api";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-load-document',
  templateUrl: './load-document.component.html',
  styleUrls: ['./load-document.component.scss'],
  providers: [MessageService]

})
export class LoadDocumentComponent implements OnInit {


  private trigger:Subject<void> = new Subject();

  public showWeb = true;
  public webimage = false;
  webcamImage: WebcamImage | undefined;
  private nextWebcam: any = new Subject();
  isCameraExist = true;
  captureImage  = '';
  public isLoading: boolean = false;
  public isLoadingDiscard: boolean = false;
  userData = JSON.parse(localStorage.getItem("user")  || '{}');


  constructor(
    private readonly loadService: LoadService,
    private readonly messageService: MessageService,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly cdr: ChangeDetectorRef,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      this.isCameraExist = mediaDevices && mediaDevices.length > 0;
    });
  }


  public triggerSnapshot(): void {
    this.trigger.next();

  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    if(webcamImage){
      this.showWeb = false;
      this.webimage = true;
    }
    this.captureImage = webcamImage!.imageAsDataUrl;
    console.info('received webcam image', this.captureImage);
    // console.log(this.webcamImage);
  }



  public get triggerObservable(): Observable<void> {

    return this.trigger.asObservable();
  }
  public get nextWebcamObservable(): Observable<boolean | string> {

    return this.nextWebcam.asObservable();
  }

  public addLoadPicture(){
    this.isLoading = true;
    this.ngxSpinnerService.hide();

    this.loadService.addLoadsDocument(this.captureImage, this.userData.id, this.activatedRoute.snapshot.queryParams.id).subscribe((response: any) => {
      console.log(response);
      if(response.message == "Document Added successfully"){
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: response.message,
          closable: true
          
        });
        this.isLoading = false;
        this.ngxSpinnerService.hide();
        this.router.navigate(['/apps/loads/pickup'])
        // console.log("aa");
        // this.success = true;
        // this.createLoadForm.reset({});
           
        //     window.scroll({ 
        //       top: 0, 
        //       left: 0, 
        //       behavior: 'smooth' 
        //     });
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
      this.isLoading = false;
      this.ngxSpinnerService.hide();
      
    });

  }

  public discardLoadPicture(){
    this.isLoadingDiscard = true;
    this.showWeb = true;
    this.webimage = false;
    this.isLoadingDiscard = false;
  }
}
