import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-header",
  templateUrl: "./user-header.component.html",
  styleUrls: ["./user-header.component.scss"]
})
export class UserHeaderComponent {
  constructor(private router: Router, public afAuth: AngularFireAuth) {}

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(["/login"]);
    });
  }
}
