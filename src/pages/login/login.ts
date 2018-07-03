import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { AuthProvider } from './../../providers/auth/auth';

import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  displayName = this.authProvider.displayName;
  photoURL = this.authProvider.photoURL;
  loginSuccess;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authProvider: AuthProvider,
    private afAuth: AngularFireAuth,
    public loadingCtrl: LoadingController
  ) {
    this.checkAuthState();
      
  }
  ionViewCanEnter(){
    this.afAuth.authState.subscribe(res =>{
      if (res && res.uid) {
        return true;
      }
      else {
        return false;
      }
    });
  }

  signIn(){
    this.authProvider.signInWithFacebook();
    this.loadingScreen();
  }

  signOut(){
    this.authProvider.signOut();
  }
  goBackToLogin(){
    this.navCtrl.setRoot('LoginPage');
  }

  loadingScreen(){
    let loading = this.loadingCtrl.create({
      content: 'Authenticating....'
    });

    loading.present();

    this.afAuth.authState.subscribe(res =>{
      if (res && res.uid) {
        this.welcomeUser();
        loading.dismiss();
      }
    });

    // setTimeout(() => {
    //   loading.dismiss();
    // }, 3000);
  }

  checkAuthState(){
    this.afAuth.authState.subscribe(res =>{
      if (res && res.uid) {
        this.welcomeUser();
      }
    });
  }
  welcomeUser(){
    this.authProvider.loginSuccess = true;
    this.loginSuccess = this.authProvider.loginSuccess;
  }
  goToHome(){
    this.navCtrl.push('HomePage');
    this.navCtrl.setRoot('HomePage');
  }


  // signIn(){
    

  //   this.afAuth.authState.subscribe(res => {
  //     if (res && res.uid) {
  //       console.log('user is logged in');
  //       this.loginSuccess = true;
  //       // this.goToHome();
  //     } else {
  //       console.log('user not logged in');
  //       this.authProvider.signInWithFacebook();
  //     }
  //   });
  // }

  // signOut(){
  //   this.authProvider.signOut();
  //   this.loginSuccess = false;
  //   this.navCtrl.push('LoginPage');
  //   this.navCtrl.setRoot('LoginPage');
  // }


}
