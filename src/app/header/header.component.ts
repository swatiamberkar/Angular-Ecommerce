import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  menuType:String = 'default'
  sellerName:string = ''
  searchResult:undefined | Product[]
  userName:string = ''
  cartItem = 0

  constructor(private route: Router,
              private product:ProductService){}

  ngOnInit(): void {
    
    this.route.events.subscribe((val:any)=>{
      if(val.url)
      {
       // console.warn(val.url);
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          let sellerStore = localStorage.getItem('seller')
          let sellerData = sellerStore &&  JSON.parse(sellerStore)[0]
          this.sellerName = sellerData.name
         // console.warn("This is seller area.");
          this.menuType= "seller"
        }
        else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user')
          let userData = userStore && JSON.parse(userStore)
          this.userName = userData.name
          this.menuType = "user"
          this.product.getCartList(userData.id)
        }
        else{
         // console.warn("Outside to seller area.");
          this.menuType= "default"
        }
      } 
    });

    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItem = JSON.parse(cartData).length
      console.warn(this.cartItem);
      
    }

    this.product.cartData.subscribe((items)=>{
      this.cartItem = items.length
    })
  }

  logout(){
    localStorage.removeItem('seller')
    this.route.navigate(['/'])
  }

  userLogout(){
    localStorage.removeItem('user')
    this.route.navigate(['/user-auth'])
    this.product.cartData.emit([]);
  }

  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement
      this.product.searchProducts(element.value).subscribe((result) =>{
        if(result.length>5){
          result.length = 5;
        }
  
        this.searchResult=result
      })
    }

  }

  hideSearch(){
    this.searchResult = undefined
  }

  submitSearch(val:string){
   // console.warn(val);
    this.route.navigate([`search/${val}`])
  }

  redirectToDetails(id:number){
    this.route.navigate(['/details/'+id])
  }


}
