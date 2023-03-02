import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounting-reconcile-archive',
  templateUrl: './accounting-reconcile-archive.component.html',
  styleUrls: ['./accounting-reconcile-archive.component.scss']
})
export class AccountingReconcileArchiveComponent implements OnInit {

  public searchText: string;
  public isFilterAllLoads: boolean = false
  public filterLoadTypes: any[] = [
    {
      label: "Paid & Settled Loads",
      value: false
    },
    {
      label: "All Loads",
      value: true
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
