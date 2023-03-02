import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {

  public isLoading: boolean = false;
  public selectedDriver:any;

  public types: string[] = [
    'Text',
    'Email',
    'Number',
    'Radio',
    'Checkbox',
    'Text-area',
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
