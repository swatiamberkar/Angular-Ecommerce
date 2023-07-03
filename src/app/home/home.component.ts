import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  popularProducts:undefined | Product[]
  trendyProducts:undefined | Product[]

  constructor(private product:ProductService){}

  ngOnInit(): void {
   this.product.popularProducts().subscribe((data)=>{
    this.popularProducts = data
   })

   this.product.trendyProducts().subscribe((data)=>{
    this.trendyProducts = data
   })
  }
}
