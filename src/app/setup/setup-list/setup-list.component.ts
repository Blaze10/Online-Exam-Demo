import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from 'src/models/question.model';

@Component({
  selector: 'app-setup-list',
  templateUrl: './setup-list.component.html',
  styleUrls: ['./setup-list.component.css']
})
export class SetupListComponent implements OnInit {

  questionsList: Question[] = [];
  isLoading = false;

  constructor(private questionsService: QuestionService) { }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions() {
    this.isLoading = true;
    this.questionsService.getQuestions().subscribe((response) => {
      this.isLoading = false;
      this.questionsList = response.questions;
    }, err => {
      this.isLoading = false;
      console.log(err);
    });
  }

  deleteQuestion(questionId: string) {
    if (confirm('Are you sure?')) {
      this.isLoading = true;
      this.questionsService.deleteQuestion(questionId).subscribe(res => {
        this.getQuestions();
        this.isLoading = false;
      }, error => {
        console.log(error);
        this.isLoading = false;
      });
    }
  }

}
