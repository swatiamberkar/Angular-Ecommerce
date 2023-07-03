import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit {

  productList: undefined | Product[]
  productMessage: undefined | string
  icon=faTrash
  editIcon = faEdit

  constructor(private product: ProductService) { }

  ngOnInit(): void {
   this.list()
  }

  deleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = "Product Deleted Successfully."
        this.list()
      }
    })
    setTimeout(() => 
    this.productMessage = undefined,
      3000)
  }

  list(){
    this.product.productList().subscribe((result) => {
      console.warn(result);
      this.productList = result

    })
  }

}