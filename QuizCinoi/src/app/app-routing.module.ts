import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './auth/register/register.module#RegisterPageModule' },
  { path: 'ranking', loadChildren: './ranking/ranking.module#RankingPageModule' },
  { path: 'quiz', loadChildren: './quiz/quiz.module#QuizPageModule' },
  { path: 'opponent', loadChildren: './quiz/opponent/opponent.module#OpponentPageModule' },
  { path: 'categories', loadChildren: './quiz/categories/categories.module#CategoriesPageModule' },
  { path: 'form', loadChildren: './quiz/form/form.module#FormPageModule' },
  { path: 'questions', loadChildren: './quiz/questions/questions.module#QuestionsPageModule' },
  { path: 'summary', loadChildren: './quiz/summary/summary.module#SummaryPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
