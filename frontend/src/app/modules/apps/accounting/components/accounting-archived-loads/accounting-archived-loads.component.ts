import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounting-archived-loads',
  templateUrl: './accounting-archived-loads.component.html',
  styleUrls: ['./accounting-archived-loads.component.scss']
})
export class AccountingArchivedLoadsComponent implements OnInit {

  public searchText: string;

  constructor() { }

  ngOnInit(): void {
  }

}
