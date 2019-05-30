import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Question } from './questions/question.model';
import { dataAPI } from './dataAPI.model';
import { QuestionsPage } from './questions/questions.page';

@Injectable({ providedIn: "root" })
export class QuizService {
  category: string;
  categoryNumber: string;
  difficulty: string;
  answearType: string;
  url: string;
  dataVariable: dataAPI;
  questions: Question[];
  amountOfCorrectAnswers = 0;
  amountOfIncorrectAnswers = 0;
  amountOfQuestions: number;

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

  buildUrl() {
    switch (this.category) {
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

    return `https://opentdb.com/api.php?amount=5&category=${this.categoryNumber}&difficulty=${this.difficulty}&type=${this.answearType}`;
  }

  getQuestions() {
    this._http.get<dataAPI>(this.buildUrl()).subscribe((data) => {
      this.dataVariable = data;
      this.questions = this.dataVariable.results;
      console.log(this.questions);
      console.log(this.category);
    });
    console.log(this.questions);
    return this.questions;
  }

  saveUserAnswer(numberOfQuestion: number, isCorrect: boolean) {
    console.log(this.questions[numberOfQuestion].isCorrect);
    console.log(this.questions[numberOfQuestion].question + ' ----- ' + isCorrect);
    this.questions[numberOfQuestion].isCorrect = isCorrect;
  }

  getResult() {
    for (let item of this.questions){
        if(item.isCorrect === true) {
            this.amountOfCorrectAnswers++;
        } else {
            this.amountOfIncorrectAnswers++;
        }
    }
    this.amountOfQuestions = this.questions.length;
  }

}
