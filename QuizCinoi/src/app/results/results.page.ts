import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz/quiz.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {

  constructor(public service: QuizService) { }
  ngOnInit() {
  }

}
