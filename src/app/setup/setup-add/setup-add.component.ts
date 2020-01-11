import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { format } from 'url';
import { QuestionService } from 'src/app/services/question.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Question } from 'src/models/question.model';

@Component({
  selector: 'app-setup-add',
  templateUrl: './setup-add.component.html',
  styleUrls: ['./setup-add.component.css']
})
export class SetupAddComponent implements OnInit {

  questionsForm: FormGroup;
  optionsArray: string[] = [];
  isLoading = false;
  mode = 'Create';
  questionId: string;
  question: Question;

  constructor(private questionsService: QuestionService, private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.initQuestionsForm();

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.isLoading = true;
        this.mode = 'Edit';
        this.questionId = paramMap.get('id');
        this.questionsService.getQuestionById(this.questionId).subscribe((question: Question) => {
          this.question = question;
          this.patchQuestionsForm(this.question);
          this.isLoading = false;
        }, error => {
          console.log(error);
          this.isLoading = false;
        });
      } else {
        this.question = null;
        this.questionId = null;
        this.mode = 'Create';
      }
    });
  }

  // init form
  initQuestionsForm() {
    this.questionsForm = new FormGroup({
      question: new FormControl(null, [Validators.required]),
      marks: new FormControl(0, [Validators.required, Validators.min(1)]),
      addOption: new FormControl(null),
      correctAnswer: new FormControl(null, Validators.required),
      options: new FormControl(null, [Validators.required]),
    });
  }

  patchQuestionsForm(question: Question) {
    this.optionsArray = question.options;
    this.questionsForm.patchValue({
      question: question.question,
      marks: question.marks,
      correctAnswer: question.correctAnswer,
      options: this.optionsArray
    });
  }

  // Add options
  addOption() {

    const enteredOption = this.questionsForm.get('addOption').value;

    const isValidOption = this.optionsArray.some((op) => op === enteredOption.trim().toLowerCase());
    if (!isValidOption) {
      this.optionsArray.push(enteredOption.trim().toLowerCase());
      this.questionsForm.get('addOption').reset();

      if (this.optionsArray.length >= 2) {
        this.questionsForm.patchValue({
          options: this.optionsArray
        });
        this.questionsForm.get('options').updateValueAndValidity();
      }

    } else {
      alert('This option already exists');
    }
  }

  removeOption(index: number) {
    this.optionsArray.splice(index, 1);
    if (this.optionsArray.length < 2) {
     this.questionsForm.get('options').setValue(null);
     this.questionsForm.updateValueAndValidity();
    }
  }

  onSubmit() {
    this.isLoading = true;
    const formData = this.questionsForm.value;
    if (this.mode === 'Create') {
      this.questionsService.addQuestion(formData).subscribe(response => {
        this.router.navigate(['/setup/setup-list']);
      }, err => {
        this.isLoading = false;
        console.log(err);
      });
    } else {
      this.questionsService.updateQuestion(formData, this.questionId).subscribe(response => {
        this.router.navigate(['/setup/setup-list']);
      }, err => {
        this.isLoading = false;
        console.log(err);
      });
    }
  }

}
