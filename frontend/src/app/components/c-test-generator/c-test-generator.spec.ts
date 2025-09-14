import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CTestGenerator } from './c-test-generator';

describe('CTestGenerator', () => {
  let component: CTestGenerator;
  let fixture: ComponentFixture<CTestGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CTestGenerator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CTestGenerator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
