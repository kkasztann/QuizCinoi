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
      .add(user)
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }
}
