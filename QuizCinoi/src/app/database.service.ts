import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { User } from "./models/user";
import { Geolocation } from "@ionic-native/geolocation/ngx";
@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  lat: number;
  long: number;

  constructor(public db: AngularFirestore, private geoloc: Geolocation) {}

  setUser(user: User) {
    this.db
      .collection("users")
      .doc(user.uid)
      .set(user)
      .then(function() {
        console.log("DB - it's OK");
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }

  defineLocation() {
    this.geoloc
      .getCurrentPosition()
      .then(resp => {
        console.log(resp.coords.latitude);
        this.lat = resp.coords.latitude;
        console.log(resp.coords.longitude);
        this.long = resp.coords.longitude;
      })
      .then(() => {
        console.log("ok");
      })
      .catch(error => {
        console.log("Error getting location", error);
      });
  }

  getAllUsers(allUsers: User[]) {
    this.db
      .collection("users")
      .get().toPromise()
      .then(snapshot => {
        snapshot.forEach(doc => {
          allUsers.push(doc.data());
          console.log(doc.id, "=>", doc.data());
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });

    //   this.db
    //     .collection("users")
    //     .get()
    //     .toPromise()
    //     .then(function(querySnapshot) {
    //       querySnapshot.forEach(function(doc) {
    //         console.log(doc.id, " => ", doc.data());
    //         allUsers.push(doc.data());
    //       });
    //     });
    // }
  }
}
