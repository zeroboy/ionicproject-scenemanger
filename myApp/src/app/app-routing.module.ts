import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginPageModule' , pathMatch: 'full'},//登录
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },  { path: 'cat', loadChildren: './cat/cat.module#CatPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
