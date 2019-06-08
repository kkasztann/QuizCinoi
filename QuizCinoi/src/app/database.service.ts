import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { User } from "./models/user";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { element } from "@angular/core/src/render3";
import { AngularFireAuth } from "@angular/fire/auth";
@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  constructor(
    public db: AngularFirestore,
    private geoloc: Geolocation,
    public afAuth: AngularFireAuth
  ) {}
  arrayOfUsers = [];
  currentUser: User;
  pointsOfCurrentUser = 0;
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
  updateUser(user: User) {
    this.db
      .collection("users")
      .doc(user.uid)
      .update(user)
      .then(function() {
        console.log("DB - it's OK");
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }

  getUsersToRanking(arrayOfUsers) {
    if (arrayOfUsers.length !== 0) {
      arrayOfUsers = [];
    }
    this.db
      .collection("users")
      .get()
      .toPromise()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          arrayOfUsers.push(doc.data());
        });
        arrayOfUsers.sort((a, b) =>
          a.points > b.points ? -1 : b.points > a.points ? 1 : 0
        );
        console.log("koniec");
        console.log(arrayOfUsers);
      });
  }


  getUserPoints(
    arrayOfUsers,
    currentUser,
    currentUserUid,
    pointsOfCurrentUser
  ) {
    if (arrayOfUsers.length !== 0) {
      arrayOfUsers = [];
    }
    var self = this;
    this.db
      .collection("users")
      .get()
      .toPromise()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          arrayOfUsers.push(doc.data());
        });
        console.log("koniec");
        console.log(arrayOfUsers);
        console.log("getUserPoints");
        console.log(arrayOfUsers);
        currentUser = arrayOfUsers.find(
          element => element.uid === currentUserUid
        );
        console.log(currentUserUid);
        console.log(currentUser);
        pointsOfCurrentUser = currentUser.points;
        self.pointsOfCurrentUser = pointsOfCurrentUser;
        console.log(pointsOfCurrentUser);
        console.log("getUserPoints");
      });
  }

}
