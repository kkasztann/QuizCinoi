import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Question } from './questions/question.model';
import { dataAPI } from './dataAPI.model';

@Injectable({ providedIn: "root" })
export class QuizService {
  category : string;
  categoryNumber : string;
  difficulty : string;
  answearType : string;
  url : string;
  dataVariable : dataAPI;
  questions : Question[];

  constructor(private _http: HttpClient) { }

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

  buildUrl(){
    switch (this.category){
        case 'Computers': {
          this.categoryNumber = '18';
          break;
        }
        case 'General': {
          this.categoryNumber = '9';
          break;
        }
        case 'Nature': {
          this.categoryNumber = '17';
          break;
        }
        case 'History': {
          this.categoryNumber = '23';
          break;
        }
        default: {
          this.categoryNumber = '9';
          break;
        }
    }

    return `https://opentdb.com/api.php?amount=5&category=${ this.categoryNumber }&difficulty=${ this.difficulty }&type=${ this.answearType }`;
  } 

  getQuestions(){
   this._http.get<dataAPI>(this.buildUrl()).subscribe((data)=>{
      this.dataVariable = data;
      this.questions = this.dataVariable.results;
      console.log(this.questions);
      console.log(this.category);
  });
   console.log(this.questions);
   return this.questions;
  }
}
