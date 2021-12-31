import { User } from './../models/user.model';
declare let window: any;
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import Web3 from 'web3';
import { UserService } from '../service/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { NavController } from '@ionic/angular';
import { TabsPage } from '../tabs/tabs.page';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  account: string;
  password: string;
  validUser = true;
  nothing = true;
  emailvaild = true;
  exist = true;
  user = null;

  constructor(
    private userService: UserService,
    private router: Router,
    public afuth: AngularFireAuth,
    private navCtrl: NavController
  ) { }



  ngOnInit() {
  }

  // onSignin(){
  //   if (this.userService.isValidUser(this.account, this.password)) {
  //     this.router.navigate(['']);
  //   } else{
  //     this.validUser = false;
  //   }

  // }
  async login(){
    this.validUser = true;
    this.nothing = true;
    this.emailvaild = true;
    this.exist = true;
    const { account, password} = this
    try {
      const res = await this.afuth.signInWithEmailAndPassword(account + '@example.com', password)
      this.validUser = true;
      this.nothing = true;
      this.emailvaild = true;
      this.exist = true;
      this.navCtrl.navigateForward('TabsPage');
      this.router.navigate(['./'])
    } catch(err){
      console.dir(err)
      if (err.code === "auth/user-not-found"){
        this.exist = false;
      }
      if (err.code === "auth/wrong-password") {
        this.validUser = false;
      }
      if (err.code === "auth/internal-error"){
        this.nothing = false;
      }
      if (err.code === "auth/invalid-email") {
        this.nothing = false;
      }
    }
  }

  async googlelogin() {
    try{
      const res = await this.afuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      if(res){
        this.router.navigate(['./'])
      }
    } catch(err){
      console.log(err)
    }

  }


}
