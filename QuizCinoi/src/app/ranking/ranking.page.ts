import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";

@Component({
  selector: "app-ranking",
  templateUrl: "./ranking.page.html",
  styleUrls: ["./ranking.page.scss"]
})
export class RankingPage implements OnInit {
  constructor(public database: DatabaseService) {}

  ngOnInit() {
    this.database.getUsersToRanking(this.database.arrayOfUsers);
  }

  getCurrent() {
    this.database.getUsersToRanking(this.database.arrayOfUsers);
    console.log(this.database.arrayOfUsers);
  }
}
