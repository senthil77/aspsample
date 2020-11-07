import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-bol-invoice',
  templateUrl: './bol-invoice.component.html',
  styleUrls: ['./bol-invoice.component.css']
})
export class BolInvoiceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  printPage() {
    $('app-nav-menu').hide();
    $('button').hide();
    window.print();
    $('app-nav-menu').show();
    $('button').show();
  }


}
