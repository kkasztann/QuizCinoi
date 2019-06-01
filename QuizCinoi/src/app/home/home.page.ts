import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { DatabaseService } from '../database.service';
import { User } from '../models/user';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {

myUser: User = {
  uid: 'noUID',
  points: 0
};


  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
    public database: DatabaseService
  ) {}

  ngOnInit() {
    console.log("START");

    if (this.afAuth.auth.currentUser) {
      this.myUser = {
        uid: this.afAuth.auth.currentUser.uid,
        points: 0
      };
    }

    this.database.setUser(this.myUser);
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(["/login"]);
    });
  }
}
