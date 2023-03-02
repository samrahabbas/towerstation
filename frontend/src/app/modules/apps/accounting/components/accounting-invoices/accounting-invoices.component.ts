import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounting-invoices',
  templateUrl: './accounting-invoices.component.html',
  styleUrls: ['./accounting-invoices.component.scss']
})
export class AccountingInvoicesComponent implements OnInit {

  public searchText: string;

  constructor() { }

  ngOnInit(): void {
  }

}
