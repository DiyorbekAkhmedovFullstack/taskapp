import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CTestResult } from './c-test-result';

describe('CTestResult', () => {
  let component: CTestResult;
  let fixture: ComponentFixture<CTestResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CTestResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CTestResult);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
