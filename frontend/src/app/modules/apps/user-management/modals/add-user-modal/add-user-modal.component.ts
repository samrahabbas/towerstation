import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss']
})
export class AddUserModalComponent implements OnInit {

  public fullName: string
  public email: string

  @Input()
  public isEditing: boolean;

  constructor(
    private readonly ngbActiveModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    if (this.isEditing) {
      this.email = 'e.smith@kpmg.com.au'
      this.fullName = 'Emma Smith'
    } else {
      this.fullName = ''
      this.email = ''
    }
  }

  public closeModal(): void {
    this.ngbActiveModal.close()
  }
}
