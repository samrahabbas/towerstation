import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-edit-starting-load-number',
  templateUrl: './edit-starting-load-number.component.html',
  styleUrls: ['./edit-starting-load-number.component.scss']
})
export class EditStartingLoadNumberComponent implements OnInit {
  public form: FormGroup;

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
      nextAvailableLoadNumber: [105, []],
      newStartingLoadNumber: [106, [Validators.min(106)]],
    });
  }
}
