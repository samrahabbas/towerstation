import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounting-reports',
  templateUrl: './accounting-reports.component.html',
  styleUrls: ['./accounting-reports.component.scss']
})
export class AccountingReportsComponent implements OnInit {

  public arSearchText: string;
  public apSearchText: string;

  constructor() { }

  ngOnInit(): void {
  }

}
