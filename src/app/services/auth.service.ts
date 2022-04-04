import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../pages/common/global-constants';
import { User } from '../models/user';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = GlobalConstants.apiURL;


  userData: any; // Save logged in user data


  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private http: HttpClient,



  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || '{}');
      } else {
        localStorage.setItem('user', '{}');
        JSON.parse(localStorage.getItem('user') || '{}');
      }
    })
  }

  SignIn(email: string, password: string) {


    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {


        localStorage.setItem('user', JSON.stringify(result.user));

        this.router.navigate(['']);

      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  get isLoggedIn(): boolean {
    let r: boolean;

    const user = JSON.parse(localStorage.getItem('user')!);
    return user && !!Object.keys(user).length ? true : false

    // if (!user) {
    //   r = false; 

    //   console.log('test1')

    //   localStorage.setItem('user', '{}');
    //   console.log(Object.keys(user).length);
    // }
    // return r;

    //return !!Object.keys(user).length ? true : false;
  }

  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');

      this.router.navigate(['sign-in']);
    })
  }
}
