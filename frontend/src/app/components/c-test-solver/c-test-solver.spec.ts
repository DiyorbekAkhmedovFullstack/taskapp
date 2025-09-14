import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CTestSolver } from './c-test-solver';

describe('CTestSolver', () => {
  let component: CTestSolver;
  let fixture: ComponentFixture<CTestSolver>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CTestSolver]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CTestSolver);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
