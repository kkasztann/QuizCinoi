import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { User } from "./models/user";
import { Geolocation } from "@ionic-native/geolocation/ngx";
@Injectable({
  providedIn: "root"
})
export class DatabaseService {
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

  getAllUsers(allUsers: any[]) {
    this.db
      .collection("users")
      .get()
      .toPromise()
      .then(snapshot => {
        snapshot.forEach(doc => {
          allUsers.push(doc.data());
          // console.log(doc.id, "=>", doc.data());
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }
}
