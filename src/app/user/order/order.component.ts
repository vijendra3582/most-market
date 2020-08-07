import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orders = [];
  constructor(
    private titleService: Title,
    private orderService: OrderService
  ) {
    this.titleService.setTitle("Manage Order - Most Market")
  }

  ngOnInit() {
    this.get();
  }

  get() {
    this.orderService.all().subscribe(
      data => {
        this.orders = data.data;
      }
    )
  }

  convertDate(t) {
    let date: any = new Date(t);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let dt = date.getDate();
    
    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    
    return year+'-' + month + '-'+dt;
  }
}
