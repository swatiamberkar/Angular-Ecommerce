import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { SignUp } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent implements OnInit {

  showLogin = false
  authError:string ='';

  constructor(private seller: SellerService,
              private router: Router) { }

  ngOnInit(): void {
    this.seller.reloadSeller()
  }

  // signUp(data: SignUp): void {
  //   console.warn(data);
  //   this.seller.userSignUp(data).subscribe((result)=>{
  //     console.warn(result);
  //     if(result){
  //       this.router.navigate(['seller-home'])
  //     }
      
  //   })

  // }

  // Using Auth Guard
  signUp(data: SignUp): void {
      console.warn(data);
      this.seller.userSignUp(data)
    }

    login(data: SignUp): void {
      this.seller.userLogin(data)
      this.seller.isLoginError.subscribe((isError)=>{
        console.warn(isError);
        if(isError){
          this.authError = "Email or Password is not correct."
        }
      })
    }
    
    openLogin(){
      this.showLogin=true
    }

    openSignUp(){
      this.showLogin=false
    }

}
