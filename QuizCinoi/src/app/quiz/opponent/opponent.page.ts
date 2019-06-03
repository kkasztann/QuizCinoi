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
  allDistans = [];

  ngOnInit() {
    this.database.getAllUsers(this.allUsers);
    this.defineLocation();
  }

  drawOpponent() {
    console.log("Losowanie");
    console.log(this.allUsers);
    this.compareLocation(this.allUsers);
  }

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

  compareLocation(allUsers) {
    console.log("Compare TIME");
    console.log(allUsers);
    allUsers.forEach(user => {
      this.allDistans.push(
        this.calculateDistance(
          user.location.latitude,
          this.myLat,
          user.location.longitude,
          this.myLong
        )
      );
    });
    console.log(this.allDistans);

    var num: number = 5;
    var i: number;
    var minL = this.allDistans[0];
    var minU = this.allUsers[0];

    for (i = 1; i < this.allDistans.length; i++) {
      if (this.allDistans[i] < minL && this.allDistans[i] != 0) {
        minL = this.allDistans[i];
        minU = this.allUsers[i];
      }
    }
    console.log(minL);
    console.log(minU);
  }
}
