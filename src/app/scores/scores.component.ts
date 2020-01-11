import { Component, OnInit } from '@angular/core';
import { ResultService } from '../services/result.service';
import { Result } from 'src/models/result.model';
import { AuthService } from '../services/auth.service';
import { QuestionService } from '../services/question.service';
import { Question } from 'src/models/question.model';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {

  isLoading = false;
  resultList: Result[] = [];
  role: string;
  detailView = [];

  constructor(private resultService: ResultService, private authService: AuthService,
              private questionService: QuestionService) { }

  ngOnInit() {
    this.getResults();
    this.role = this.authService.getRole();
  }

  getResults() {
    this.isLoading = true;
    this.resultService.getResults().subscribe(response => {
      this.isLoading = false;
      this.resultList = response;
    }, err => {
      this.isLoading = false;
    });
  }

  showDetails(score: number, answerList: [{questionId: string, answer: string}]) {
    this.detailView = [];
    answerList.forEach(el => {
      this.questionService.getQuestionById(el.questionId).subscribe(response => {
        this.detailView.push({
          question: response,
          selectedAnswer: el.answer
        });
      });
    });
  }

}
