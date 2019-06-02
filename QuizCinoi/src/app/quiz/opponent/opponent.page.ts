import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { DatabaseService } from 'src/app/database.service';

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

  ngOnInit() {
    this.drawOpponent();
  }

  drawOpponent() {
    console.log("Losowanko cyk");
  }

  compareLocation() {}
}
