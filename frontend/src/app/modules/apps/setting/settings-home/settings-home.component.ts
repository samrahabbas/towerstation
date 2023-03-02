import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UploadCompanyLogoModalComponent } from "../modals/upload-company-logo-modal/upload-company-logo-modal.component";
import { CustomizeInternationalCustomizationComponent } from "../modals/customize-international-customization/customize-international-customization.component";
import { EditStartingLoadNumberComponent } from "../modals/edit-starting-load-number/edit-starting-load-number.component";

@Component({
  selector: "app-settings-home",
  templateUrl: "./settings-home.component.html",
  styleUrls: ["./settings-home.component.scss"]
})
export class SettingsHomeComponent implements OnInit {

  constructor(
    private readonly ngbModal: NgbModal
  ) {
  }

  ngOnInit(): void {
  }

  public openUploadCompanyModal(): void {
    this.ngbModal.open(UploadCompanyLogoModalComponent, {
      centered: true,
      size: "lg",
      backdrop: "static",
      keyboard: false,
      animation: true
    });
  }

  public openCustomizeInternationalCustomizationsModal(): void {
    this.ngbModal.open(CustomizeInternationalCustomizationComponent, {
      centered: true,
      size: "xl",
      backdrop: "static",
      keyboard: false,
      animation: true
    });
  }

  public onEditLoadNumberModal(): void {
    this.ngbModal.open(EditStartingLoadNumberComponent, {
      centered: true,
      size: "xl",
      backdrop: "static",
      keyboard: false,
      animation: true
    });
  }
}
