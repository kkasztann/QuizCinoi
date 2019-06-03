import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Question } from './questions/question.model';
import { dataAPI } from './dataAPI.model';
import { QuestionsPage } from './questions/questions.page';
import * as $ from 'jquery';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatabaseService } from '../database.service';
import { User } from '../models/user';

@Injectable({ providedIn: "root" })
export class QuizService {
  category: string;
  categoryNumber: string;
  difficulty: string = "easy";
  answearType: string = "multiple";
  url: string;
  dataVariable: dataAPI;
  questions: Question[];
  amountOfCorrectAnswers = 0;
  amountOfIncorrectAnswers = 0;
  amountOfQuestions: number;
  isDuel: boolean = false;
  myUser: User = {
    uid: "noUID",
    points: 0,
    location: {
      latitude: 0,
      longitude: 0
    }
  };

  constructor(private _http: HttpClient,
    public afAuth: AngularFireAuth,
    public database: DatabaseService
    ) { }

  getCategory(category: string) {
    this.category = category;
    console.log(this.isDuel)
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
    // do not needed anymore because of default value
    // if (this.difficulty === undefined || this.difficulty === null) {
    //   this.difficulty = "easy";
    // }

    // if (this.answearType === undefined || this.answearType === null) {
    //   this.answearType = "multiple";
    // }

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

    if(this.isDuel){
      this.saveAnswersToDatabase();
    }
    this.amountOfQuestions = 0;
    this.amountOfCorrectAnswers = 0;
    this.amountOfIncorrectAnswers = 0;
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

  saveAnswersToDatabase(){
    if (this.afAuth.auth.currentUser) {
      this.myUser = {
        uid: this.afAuth.auth.currentUser.uid,
        resultsDuel: {
          opponentNick: 'FakeNick',
          result: 'waiting',
          stats: {
            questions: this.amountOfQuestions,
            correct: this.amountOfCorrectAnswers,
            wrong: this.amountOfIncorrectAnswers
          }
        }
      };
    }
    this.database.updateUser(this.myUser);
  }
}
