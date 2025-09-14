import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CTestService } from '../../services/c-test.service';
import { CTestResponse } from '../../models/c-test';

@Component({
  selector: 'app-c-test-solver',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './c-test-solver.html',
  styleUrls: ['./c-test-solver.css']
})
export class CTestSolverComponent implements OnInit {
  testData: CTestResponse | null = null;
  originalText: string = '';
  userAnswers: string[] = [];
  isLoading: boolean = false;
  testWords: string[] = [];

  constructor(private cTestService: CTestService, private router: Router) {
    // Get data from navigation state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.testData = navigation.extras.state['testData'];
      this.originalText = navigation.extras.state['originalText'];
    }
  }

  ngOnInit(): void {
    if (!this.testData) {
      this.router.navigate(['/c-test']);
      return;
    }

    this.initializeTest();
  }

  initializeTest(): void {
    if (this.testData) {
      // Split test text into words and identify gaps
      this.testWords = this.testData.testText.split(' ');
      this.userAnswers = new Array(this.testData.totalGaps).fill('');
    }
  }

  submitTest(): void {
    if (!this.testData) return;

    this.isLoading = true;

    this.cTestService.checkAnswers(this.userAnswers, this.testData.correctAnswers).subscribe({
      next: (result) => {
        this.isLoading = false;
        this.router.navigate(['/c-test/result'], {
          state: {
            result: result,
            originalText: this.originalText,
            testData: this.testData
          }
        });
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error checking answers:', error);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/c-test']);
  }

  isGap(word: string): boolean {
    return word.includes('_');
  }

  getGapIndex(wordIndex: number): number {
    let gapCount = 0;
    for (let i = 0; i <= wordIndex; i++) {
      if (this.testWords[i] && this.testWords[i].includes('_')) {
        if (i === wordIndex) return gapCount;
        gapCount++;
      }
    }
    return -1;
  }

  getWordBeforeGap(word: string): string {
    return word.split('_')[0];
  }

  getWordAfterGap(word: string): string {
    const parts = word.split('_');
    return parts[parts.length - 1];
  }

  get filledAnswersCount(): number {
    return this.userAnswers.filter(a => a.trim()).length;
  }
}
