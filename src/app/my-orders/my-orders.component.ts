import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit{

constructor( private product:ProductService){}

  orderData:order[] |undefined
 
  ngOnInit(): void {
    this.getOrderList();
  }

  cancelOrder(orderId:number|undefined){
    orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
      setTimeout(()=>{
        this.getOrderList();
      }, 3000)
      
    })
  }

  getOrderList(){
    this.product.orderList().subscribe((result)=>{
      this.orderData = result
     }) 
  }
}
