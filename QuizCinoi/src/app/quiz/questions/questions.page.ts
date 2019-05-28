import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Question } from './question.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {
  questions : Question[];
  constructor(public service : QuizService) { }

  ngOnInit() {
    this.questions = this.service.questions;
    console.log('questions from service' + this.questions);
  }

  showData(){
    console.log(this.service.questions);
  }
}
