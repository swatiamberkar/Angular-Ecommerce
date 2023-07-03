import { Component, OnInit } from '@angular/core';
import { Cart, Login, Product, SignUp } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {

  showLogin: boolean = true
  authError: string = ''

  constructor(private user: UserService,
    private product: ProductService) { }

  ngOnInit(): void {
    this.user.userAuthReload()
  }

  signUp(data: SignUp) {
    this.user.userSignUp(data)
  }

  login(data: Login) {
    this.user.userLogin(data)
    this.user.invalidUserAuth.subscribe((result) => {
      console.warn("result", result);
      if (result) {
        this.authError = "Please Enter Valid User Details..."
      }
      else {
        this.localCartToRemoteCart()
      }
    })
  }

  openSignUp() {
    this.showLogin = false
  }

  openLogin() {
    this.showLogin = true
  }

  localCartToRemoteCart() {

    let data = localStorage.getItem('localCart')
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id
     
    if (data) {
      let cartDataList: Product[] = JSON.parse(data)

      cartDataList.forEach((product: Product, index) => {
        let cartData: Cart = {
          ...product,
          productId: product.id,
          userId
        }

        delete cartData.id
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.warn("Item stored in DB");
            }
          })
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart')
          }
        }, 500)
      })
    }

    setTimeout(()=>{
      this.product.getCartList(userId)
    }, 2000)
    
  }
}
