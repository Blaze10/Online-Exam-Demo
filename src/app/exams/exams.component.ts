import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Question } from 'src/models/question.model';
import { NgForm } from '@angular/forms';
import { ResultService } from '../services/result.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {

  isLoading = false;
  questionsList: Question[] = [];

  constructor(private questionService: QuestionService, private resultService: ResultService,
              private router: Router) { }

  ngOnInit() {
    this.getQuestionsList();
  }

  // Get questions
  getQuestionsList() {
    this.isLoading = true;
    this.questionService.getQuestions().subscribe(response => {
      this.isLoading = false;
      this.questionsList = response.questions;
    }, err => {
      console.log(err);
      this.isLoading = false;
    });
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    if (confirm('Are you sure?')) {
      const formValue = Object.entries(form.value);
      const answerArray = [];
      formValue.forEach(el => {
        answerArray.push({questionId: el[0], answer: el[1]});
      });

      let correctAnswers = 0;
      let wrongAnswers = 0;
      let marksScored = 0;

      this.questionsList.forEach(el => {
        answerArray.forEach(ob => {
          if (ob.questionId === el.id) {
            if (ob.answer === el.correctAnswer) {
              correctAnswers += 1;
              marksScored += el.marks;
            } else {
              wrongAnswers += 1;
            }
          }
        });
      });

      this.resultService.addResultData(marksScored, correctAnswers, wrongAnswers, answerArray)
      .subscribe(response => {
        this.isLoading = false;
        this.router.navigate(['/scores/user-result']);
      }, err => {
        this.isLoading = false;
      });

    }
  }

}
