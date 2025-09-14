import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CTestService } from '../../services/c-test.service';
import { CTestRequest, CTestResponse } from '../../models/c-test';

@Component({
  selector: 'app-c-test-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './c-test-generator.html',
  styleUrls: ['./c-test-generator.css']
})
export class CTestGeneratorComponent {
  inputText: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private cTestService: CTestService, private router: Router) { }

  generateTest(): void {
    if (!this.inputText.trim()) {
      this.errorMessage = 'Bitte geben Sie einen Text ein.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const request: CTestRequest = { text: this.inputText.trim() };

    this.cTestService.generateCTest(request).subscribe({
      next: (response: CTestResponse) => {
        this.isLoading = false;
        // Pass data to solver component through navigation state
        this.router.navigate(['/c-test/solve'], {
          state: {
            testData: response,
            originalText: this.inputText
          }
        });
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Fehler beim Generieren des Tests. Stellen Sie sicher, dass der Text mindestens 2 Sätze enthält.';
        console.error('C-Test generation error:', error);
      }
    });
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
