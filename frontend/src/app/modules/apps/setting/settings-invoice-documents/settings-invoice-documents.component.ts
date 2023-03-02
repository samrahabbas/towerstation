import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-invoice-documents',
  templateUrl: './settings-invoice-documents.component.html',
  styleUrls: ['./settings-invoice-documents.component.scss']
})
export class SettingsInvoiceDocumentsComponent implements OnInit {

  public termsAndConditionsHTML: string
  public footerHTML: string

  constructor() { }

  ngOnInit(): void {
  }

}
