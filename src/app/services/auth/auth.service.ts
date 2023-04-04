import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";
import { GlobalConstants } from '../../common/global-constants';




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

  ngOnInit() {
    console.log(this.getUser())
  }

  SignIn(email: string, password: string) {

    $('#waitLogin').show();
    $("#submitLogin").hide();
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {

        localStorage.setItem('user', JSON.stringify(result.user));

        this.StoreToken(result);

        this.router.navigate(['']);

      })
      .catch((error) => {
        $('#submitLogin').show()
        $("#waitLogin").hide();
        window.alert(error.message);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user && !!Object.keys(user).length ? true : false
  }

  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');

      this.router.navigate(['sign-in']);
    })
  }

  getUser() {
    let user = JSON.parse(localStorage.getItem('user')!)

    return user
  }

  async StoreToken(result: any) {
    this.http
      .post<any[]>(`${GlobalConstants.apiURL}/user/sign-in`, { email: this.getUser().email })
      .subscribe(
        async (res: any) => {
          await localStorage.setItem("ACCESS_TOKEN", res['token']);
          await localStorage.setItem("userId", res['userId']);
          await localStorage.setItem('user', JSON.stringify(result.user));

          this.router.navigate(['']);
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

}