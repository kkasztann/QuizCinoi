import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { DatabaseService } from "src/app/database.service";
import { User } from "firebase";
import { Geolocation } from "@ionic-native/geolocation/ngx";

@Component({
  selector: "app-opponent",
  templateUrl: "./opponent.page.html",
  styleUrls: ["./opponent.page.scss"]
})
export class OpponentPage implements OnInit {
  constructor(
    public afAuth: AngularFireAuth,
    public database: DatabaseService,
    private geoloc: Geolocation
  ) {
    console.log(this.allUsers);
  }
  allUsers = [];
  myLat = 0;
  myLong = 0;

  ngOnInit() {
    this.database.getAllUsers(this.allUsers);
    this.defineLocation();
  }

  drawOpponent() {
    console.log("Losowanie");

    // setTimeout(() => {
    //   console.log(this.allUsers);
    // }, 3000);
  }
  compareLocation() {}

  defineLocation() {
    this.geoloc
      .getCurrentPosition()
      .then(resp => {
        console.log(resp.coords.latitude);
        this.myLat = resp.coords.latitude;
        console.log(resp.coords.longitude);
        this.myLong = resp.coords.longitude;
      })
      .then(() => {
        console.log("OK");
      })
      .catch(error => {
        console.log("Error getting location", error);
      });
  }

  calculateDistance(lat1: number, lat2: number, long1: number, long2: number) {
    let p = 0.017453292519943295; // Math.PI / 180
    let c = Math.cos;
    let a =
      0.5 -
      c((lat1 - lat2) * p) / 2 +
      (c(lat2 * p) * c(lat1 * p) * (1 - c((long1 - long2) * p))) / 2;
    let dis = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    return dis;
  }
}
