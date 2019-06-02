import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { DatabaseService } from "src/app/database.service";
import { User } from "firebase";

@Component({
  selector: "app-opponent",
  templateUrl: "./opponent.page.html",
  styleUrls: ["./opponent.page.scss"]
})
export class OpponentPage implements OnInit {
  constructor(
    public afAuth: AngularFireAuth,
    public database: DatabaseService
  ) {}
  allUsers = [];

  ngOnInit() {
    this.database.getAllUsers(this.allUsers);
  }

  drawOpponent() {
    console.log("Losowanie");

    setTimeout(() => {
      console.log(this.allUsers);
    }, 3000);
  }
  compareLocation() {}
}
