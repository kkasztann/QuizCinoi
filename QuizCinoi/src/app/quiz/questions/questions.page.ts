import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Question } from './question.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {
  questions: Question[];
  constructor(public service: QuizService) { }

  ngOnInit() {
  }

  getResult(){
    console.log("all the results")
  }
  // @Todo: Add to question model isCorrect property, intialize questions and set this property when user select the item or
  // just count the proper answears

}
