import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { CTestGeneratorComponent } from './components/c-test-generator/c-test-generator';
import { CTestSolverComponent } from './components/c-test-solver/c-test-solver';
import { CTestResultComponent } from './components/c-test-result/c-test-result';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'c-test', component: CTestGeneratorComponent },
  { path: 'c-test/solve', component: CTestSolverComponent },
  { path: 'c-test/result', component: CTestResultComponent },
  { path: '**', redirectTo: '' }
];
