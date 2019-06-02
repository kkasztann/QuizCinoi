import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { User } from "./models/user";

@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  constructor(public db: AngularFirestore) {}

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
}