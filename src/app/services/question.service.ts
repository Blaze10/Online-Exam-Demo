import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Question } from 'src/models/question.model';

const BACKEND_URL = environment.apiUrl + 'question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  // get questions
  getQuestions() {
    return this.http.get<{ questions: any, message: string, count: number }>(`${BACKEND_URL}/list`)
      .pipe(
        map(response => {
          return {
            count: response.count,
            message: response.message,
            questions: response.questions.map(q => {
              return {
                id: q._id,
                ...q
              };
            })
          };
        })
      );
  }

  // Add Question
  addQuestion(formData) {
    const question: Question = {
      question: formData.question, marks: formData.marks,
      options: formData.options, correctAnswer: formData.correctAnswer
    };
    return this.http.post<{ message: string }>(`${BACKEND_URL}/addQuestion`, question);
  }

  // update Question
  updateQuestion(formData, questionId: string) {
    const question: Question = {
      question: formData.question, marks: formData.marks,
      options: formData.options, correctAnswer: formData.correctAnswer
    };
    return this.http.patch<{ message: string }>(`${BACKEND_URL}/${questionId}`, question);
  }

  // get question by id
  getQuestionById(questionId: string) {
    return this.http.get<{ message: string, question: any }>(`${BACKEND_URL}/${questionId}`)
    .pipe(
      map(response => {
        return {
          id: response.question._id,
          ...response.question
        };
      })
    );
  }

  // delete question
  deleteQuestion(questionId: string) {
    return this.http.delete<{ message: string}>(`${BACKEND_URL}/${questionId}`);
  }
}
