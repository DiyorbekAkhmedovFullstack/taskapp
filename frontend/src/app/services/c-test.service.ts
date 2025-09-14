import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CTestRequest, CTestResponse, CTestResult } from '../models/c-test';

@Injectable({
  providedIn: 'root'
})
export class CTestService {
  private apiUrl = '/api/c-test';

  constructor(private http: HttpClient) { }

  generateCTest(request: CTestRequest): Observable<CTestResponse> {
    return this.http.post<CTestResponse>(`${this.apiUrl}/generate`, request);
  }

  checkAnswers(userAnswers: string[], correctAnswers: string[]): Observable<CTestResult> {
    const requestBody = {
      userAnswers: userAnswers,
      correctAnswers: correctAnswers
    };
    return this.http.post<CTestResult>(`${this.apiUrl}/check`, requestBody);
  }
}
