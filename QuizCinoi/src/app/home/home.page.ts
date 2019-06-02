import { Component, OnInit, DoCheck } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { DatabaseService } from "../database.service";
import { User } from "../models/user";
import { Plugins, Capacitor } from "@capacitor/core";
import { Coordinates } from "../models/coordinates";
import { Geolocation } from "@ionic-native/geolocation/ngx";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit, DoCheck {
  myUser: User = {
    uid: "noUID",
    points: 0,
    location: {
      latitude: 0,
      longitude: 0
    }
  };

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
    public database: DatabaseService,
    private geoloc: Geolocation
  ) {}

  ngOnInit() {
    console.log("START");

    if (this.afAuth.auth.currentUser) {
      this.myUser = {
        uid: this.afAuth.auth.currentUser.uid,
        points: 0,
        location: {
          latitude: 11,
          longitude: 22
        }
      };
    }
    this.database.setUser(this.myUser);
  }

  ngDoCheck() {
    console.log("Do check");
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(["/login"]);
    });
  }

  defineLocation() {
    this.geoloc
      .getCurrentPosition()
      .then(resp => {
        console.log(resp.coords.latitude);
        console.log(resp.coords.longitude);
      })
      .catch(error => {
        console.log("Error getting location", error);
      });
  }
}
