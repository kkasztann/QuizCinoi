import { Component, OnInit, DoCheck } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { DatabaseService } from "../database.service";
import { User } from "../models/user";
import { Plugins, Capacitor } from "@capacitor/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { QuizService } from '../quiz/quiz.service';

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
    private geoloc: Geolocation,
    public service: QuizService
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
    this.defineLocation();
  }

  ngDoCheck() {
    // console.log("Do check");
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
        this.myUser.location.latitude = resp.coords.latitude;
        console.log(resp.coords.longitude);
        this.myUser.location.longitude = resp.coords.longitude;
      }).then (() => {this.database.setUser(this.myUser); })
      .catch(error => {
        console.log("Error getting location", error);
      });
  }

  setQuizType(isDuel: boolean) {
    console.log(this.service.isDuel);
    this.service.isDuel = isDuel;
    console.log(this.service.isDuel);
  }
}
