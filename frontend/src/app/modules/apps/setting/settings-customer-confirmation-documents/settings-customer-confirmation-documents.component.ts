import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-customer-confirmation-documents',
  templateUrl: './settings-customer-confirmation-documents.component.html',
  styleUrls: ['./settings-customer-confirmation-documents.component.scss']
})
export class SettingsCustomerConfirmationDocumentsComponent implements OnInit {

  public termsAndConditionsHTML: string
  public footerHTML: string

  constructor() { }

  ngOnInit(): void {
  }

}
