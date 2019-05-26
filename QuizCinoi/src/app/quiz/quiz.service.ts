import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class QuizService {
  category: string;
  difficulty : string;
  answearType : string;

  getCategory(category: string) {
    this.category = category;
    console.log(category);
  }

  getDifficulty(difficulty: string) {
    this.difficulty = difficulty;
    console.log(difficulty);
  }

  getAnswearType(answearType: string) {
    this.answearType = answearType;
    console.log(answearType);
  }
}
