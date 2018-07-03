import { NavController } from 'ionic-angular';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  displayName;  
  photoURL;
  loginSuccess:boolean;
  constructor(
    private afAuth: AngularFireAuth
    //public navCtrl: NavController
  ) {
    this.checkAuthState();
    afAuth.authState.subscribe(user => {
      if (!user) {
        this.displayName = null;        
        return;
      }
      
      this.displayName = user.displayName;  
      this.photoURL = user.photoURL; 
      // this.checkAuthState();   
    });
  }
  
  signInWithFacebook() {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => console.log(res));
      // this.checkAuthState();
  }
  
  signOut() {
    this.afAuth.auth.signOut();

  }
  checkAuthState(){
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        console.log('user is logged in');
        this.loginSuccess = true;
      } else {
        console.log('user not logged in');
        this.loginSuccess = false;
      }
    });
  }

  // goToHome(){
  //   //this.navCtrl.setRoot('HomePage');
  //   this.navCtrl.push('HomePage');
  //   this.navCtrl.setRoot('HomePage');
  // }
}
