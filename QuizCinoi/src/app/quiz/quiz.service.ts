import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Question } from './questions/question.model';
import { dataAPI } from './dataAPI.model';
import { QuestionsPage } from './questions/questions.page';
import * as $ from 'jquery';


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
    if (this.difficulty === undefined || this.difficulty === null) {
      this.difficulty = "easy";
    }

    if (this.answearType === undefined || this.answearType === null) {
      this.answearType = "multiple";
    }

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

    console.log(`https://opentdb.com/api.php?amount=5&category=${this.categoryNumber}&difficulty=${this.difficulty}&type=${this.answearType}`)
    return `https://opentdb.com/api.php?amount=5&category=${this.categoryNumber}&difficulty=${this.difficulty}&type=${this.answearType}`;
  }

  getQuestions() {
    this._http.get<dataAPI>(this.buildUrl()).subscribe((data) => {
      this.dataVariable = data;
      this.questions = this.dataVariable.results;
      console.log(this.questions);
      this.clearData();
      for (let item of this.questions) {
        item.allAnswers = this.shuffleAnswers([...item.incorrect_answers, item.correct_answer]);
      }
      console.log(this.questions);
    });

    console.log(this.questions);
    return this.questions;
  }

  saveUserAnswer(numberOfQuestion: number, answer: string) {
    this.questions[numberOfQuestion].selected = answer;
    if (this.questions[numberOfQuestion].correct_answer === answer) {
      this.questions[numberOfQuestion].isCorrect = true;
    } else {
      this.questions[numberOfQuestion].isCorrect = false;
    }
    console.log(this.questions[numberOfQuestion].isCorrect);
  }

  getResult() {
    for (let item of this.questions) {
      if (item.isCorrect === true) {
        this.amountOfCorrectAnswers++;
      } else {
        this.amountOfIncorrectAnswers++;
      }
    }
    this.amountOfQuestions = this.questions.length;
  }

  shuffleAnswers(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  removeHTMLentities(toEncode) {
    return $("<div/>").html(toEncode).text();
  }

  clearData() {
    for (let questionItem of this.questions) {
      questionItem.question = this.removeHTMLentities(questionItem.question);
      questionItem.correct_answer = this.removeHTMLentities(questionItem.correct_answer);
      for (let answerItem of questionItem.incorrect_answers) {
        answerItem = this.removeHTMLentities(answerItem);
      }
    }
  }
}
