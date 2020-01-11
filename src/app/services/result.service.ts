import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from 'src/models/user.model';

const BACKEND_URL = environment.apiUrl + 'result';

@Injectable({
  providedIn: 'root'
})

export class ResultService {

  constructor(private http: HttpClient) { }

  // Get result
  getResults() {
    return this.http.get<{
      message: string,
      results: [{ score: number, correctAnswers: number, incorrectAnswers: number, answerList: any, created_on: string,
      userId: User }]
    }>(BACKEND_URL)
      .pipe(
        map(result => {
          return result.results.map(ob => {
            return {
              score: ob.score,
              correctAnswers: ob.correctAnswers,
              incorrectAnswers: ob.incorrectAnswers,
              created_on: ob.created_on,
              user: ob.userId.fullName,
              answerList: ob.answerList.map(el => {
                return {
                  questionId: el.questionId,
                  answer: el.answer
                };
              }),
            };
          });
        })
      );
  }

  // addResult
  addResultData(score: number, correctAnswers: number, incorrectAnswers: number, answerList: any) {
    const result = { score: score, correctAnswers: correctAnswers, incorrectAnswers: incorrectAnswers, answerList: answerList };
    return this.http.post<{ message: string }>(BACKEND_URL, result);
  }

}
