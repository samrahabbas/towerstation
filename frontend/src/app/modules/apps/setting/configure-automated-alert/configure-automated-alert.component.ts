import { Component, OnInit, ViewChild } from "@angular/core";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CreateAlertModalComponent } from "../modals/create-alert-modal/create-alert-modal.component";

@Component({
  selector: 'app-configure-automated-alert',
  templateUrl: './configure-automated-alert.component.html',
  styleUrls: ['./configure-automated-alert.component.scss']
})
export class ConfigureAutomatedAlertComponent implements OnInit {

  @ViewChild('DeleteAlertSwal')
  public deleteAlertSwal: SwalComponent;

  constructor(
    private readonly ngbModal: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  public onAddAlert(): void {
    this.ngbModal.open(CreateAlertModalComponent, {
      centered: true,
      size: 'xl',
      backdrop: 'static',
      keyboard: false,
      animation: true
    });
  }

  public editAlert(): void {
  }

  public deleteAlert(): void {
    this.deleteAlertSwal.update({
      title: 'Delete alert',
    })
    this.deleteAlertSwal.fire()
  }

  public confirmDeleteAlert(): void {

  }
}
