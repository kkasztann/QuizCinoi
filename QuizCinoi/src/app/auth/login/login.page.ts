import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  ngOnInit() {
    if (this.afAuth.auth.currentUser) {
      this.router.navigate(["/home"]);
    }
  }
  constructor(private router: Router, public afAuth: AngularFireAuth) {}

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      location.reload();
    });
  }

  success() {
    this.router.navigate(["/home"]);
  }

  error() {
    console.log("Upsss! Try to log in again");
  }
}
