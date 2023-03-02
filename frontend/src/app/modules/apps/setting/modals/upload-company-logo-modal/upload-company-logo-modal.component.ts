import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-upload-company-logo-modal',
  templateUrl: './upload-company-logo-modal.component.html',
  styleUrls: ['./upload-company-logo-modal.component.scss']
})
export class UploadCompanyLogoModalComponent implements OnInit {

  public file: File

  constructor(
    private readonly ngbActiveModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  public closeModal(): void {
    this.ngbActiveModal.close();
  }

  public onFileSelect(target: EventTarget | null): void {
    const event = target as HTMLInputElement;
    if (event.files) {
      this.file = event.files[0];
    }
  }
}
