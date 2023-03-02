import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-carrier-confirmation-documents',
  templateUrl: './settings-carrier-confirmation-documents.component.html',
  styleUrls: ['./settings-carrier-confirmation-documents.component.scss']
})
export class SettingsCarrierConfirmationDocumentsComponent implements OnInit {

  public termsAndConditionsHTML: string
  public footerHTML: string

  constructor() { }

  ngOnInit(): void {
  }

}
