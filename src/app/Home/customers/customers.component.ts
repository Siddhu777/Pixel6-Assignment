import { Component, OnInit } from '@angular/core';

export class CustomerData {
  PanNumber?: string;
  Name?: string;
  Mobile?: number;
  Email?: string;
  Address1?: string;
  Address2?: string;
  PostCode?: number;
  State?: string;
  City?: string;
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  custData: CustomerData;

  ngOnInit(): void {
    this. getCustomerData()
  }
  data:any
  getCustomerData(){
    this.data = JSON.parse(localStorage.getItem('Customer'))
    this.custData = this.data;
  }

}
