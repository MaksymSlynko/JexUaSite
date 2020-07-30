import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: any;
  userStatus: string;
  userChecker: boolean;

  constructor(private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router) { }

  isLogin(): boolean {
    return this.userChecker;
  }
  // loginUp(email: string, password: string) {
  //   console.log(email, password)
  //   this.afAuth.signInWithEmailAndPassword(email, password)
  //     .then(user => {
  //       this.firestore.collection('users').ref.where('userName', '==', user.user.email)
  //         .onSnapshot(snap => {
  //           snap.forEach(userRef => {
  //             this.currentUser = userRef.data();
  //             if (userRef.data().role !== 'admin') {
  //               this.router.navigate(['/']);
  //             } else {
  //               this.router.navigate(['admin'])
  //               this.userChecker = true;
  //             }
  //           })
  //         })
  //     });
  // }
  loginUp(email: string, password: string) {
    console.log(email, password)
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.firestore.collection('users').ref.where('userName', '==', user.user.email)
          .onSnapshot(snap => {
            snap.forEach(userRef => {
              this.currentUser = userRef.data();
              if (userRef.data().role !== 'admin') {
                this.router.navigate(['/']);
              } else {
                this.router.navigate(['admin'])
                this.userChecker = true;
              }
            })
          })
      });
  }
}