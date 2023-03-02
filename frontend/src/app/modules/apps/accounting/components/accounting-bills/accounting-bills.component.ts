import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounting-bills',
  templateUrl: './accounting-bills.component.html',
  styleUrls: ['./accounting-bills.component.scss']
})
export class AccountingBillsComponent implements OnInit {

  public searchText: string;

  constructor() { }

  ngOnInit(): void {
  }

}
