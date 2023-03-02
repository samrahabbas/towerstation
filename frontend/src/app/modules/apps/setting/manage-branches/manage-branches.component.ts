import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddBranchModalComponent } from "../modals/add-branch-modal/add-branch-modal.component";

@Component({
  selector: 'app-manage-branches',
  templateUrl: './manage-branches.component.html',
  styleUrls: ['./manage-branches.component.scss']
})
export class ManageBranchesComponent implements OnInit {

  public isCustomersShared: boolean = false;
  public isCarriesShared: boolean = false;
  public isLocationsShared: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly ngbModal: NgbModal
  ) { }

  ngOnInit(): void {
  }

  public openAddBranchModal(isEditing: boolean = false): void {
    const modalRef = this.ngbModal.open(AddBranchModalComponent, {
      centered: true,
      size: 'lg',
      animation: true,
      keyboard: false,
      backdrop: 'static',
    });

    if (isEditing) {
      modalRef.componentInstance.isEditing = true;
    }
  }

  public editBranch(): void {
    this.openAddBranchModal(true);
  }

}
