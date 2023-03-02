import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-bill-lading-documents',
  templateUrl: './settings-bill-lading-documents.component.html',
  styleUrls: ['./settings-bill-lading-documents.component.scss']
})
export class SettingsBillLadingDocumentsComponent implements OnInit {

  public termsAndConditionsHTML: string
  public footerHTML: string

  constructor() { }

  ngOnInit(): void {
  }

}
