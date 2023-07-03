import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})

export class SellerAddProductComponent {

  addProductMessage : string | undefined

  constructor(private product:ProductService) { }

  submit(data: Product) {
    this.product.addProduct(data).subscribe((result)=>{
      console.warn(result);
      if(result){
        this.addProductMessage = "Product is Successfully Added."
      }
      setTimeout(() => this.addProductMessage=undefined, 3000)
      
    })
  }

}
