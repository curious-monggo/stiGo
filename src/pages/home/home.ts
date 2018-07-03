import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public authProvider: AuthProvider
  ) {
    
  }
  
  signOut(){
    this.authProvider.signOut();
    this.navCtrl.setRoot('LoginPage');
  }

  goBackToLogin(){
    this.navCtrl.setRoot('LoginPage');
  }
}
