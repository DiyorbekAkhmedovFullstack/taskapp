import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CTestResult, CTestResponse } from '../../models/c-test';

@Component({
  selector: 'app-c-test-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './c-test-result.html',
  styleUrls: ['./c-test-result.css']
})
export class CTestResultComponent implements OnInit {
  result: CTestResult | null = null;
  originalText: string = '';
  testData: CTestResponse | null = null;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.result = navigation.extras.state['result'];
      this.originalText = navigation.extras.state['originalText'];
      this.testData = navigation.extras.state['testData'];
    }
  }

  ngOnInit(): void {
    if (!this.result) {
      this.router.navigate(['/c-test']);
      return;
    }
  }

  getScoreColor(): string {
    if (!this.result) return '#6b7280';

    if (this.result.score >= 90) return '#10b981'; // Green
    else if (this.result.score >= 80) return '#3b82f6'; // Blue
    else if (this.result.score >= 70) return '#f59e0b'; // Yellow
    else if (this.result.score >= 60) return '#f97316'; // Orange
    else return '#ef4444'; // Red
  }

  getScoreClass(): string {
    if (!this.result) return 'score-average';

    if (this.result.score >= 90) return 'score-excellent';
    else if (this.result.score >= 80) return 'score-very-good';
    else if (this.result.score >= 70) return 'score-good';
    else if (this.result.score >= 60) return 'score-satisfactory';
    else return 'score-poor';
  }

  createNewTest(): void {
    this.router.navigate(['/c-test']);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  getAnswerClass(index: number): string {
    if (!this.result) return '';

    const userAnswer = this.result.userAnswers[index]?.trim().toLowerCase();
    const correctAnswer = this.result.correctAnswersList[index]?.trim().toLowerCase();

    return userAnswer === correctAnswer ? 'answer-correct' : 'answer-incorrect';
  }
}
