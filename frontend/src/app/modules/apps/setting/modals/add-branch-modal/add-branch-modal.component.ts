import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add-branch-modal',
  templateUrl: './add-branch-modal.component.html',
  styleUrls: ['./add-branch-modal.component.scss']
})
export class AddBranchModalComponent implements OnInit {
  public form: FormGroup;
  public isEditing: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly ngbActiveModal: NgbActiveModal
  ) {
  }

  public get f(): { [p: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.initForm();
  }

  public closeModal(): void {
    this.ngbActiveModal.close();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, []]
    });

    if (this.isEditing) {
      this.form.patchValue({
        name: 'Branch A',
        description: 'A Description'
      });
    }
  }
}
