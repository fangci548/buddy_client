import { NgModule, Component } from '@angular/core';
import { PreloadAllModules, Router, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';

// Send unauthorized users to login
const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['/']);

// Automatically log in users
const redirectLoggedInToChat = () => redirectLoggedInTo(['/chat']);
const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
  //   ...canActivate(redirectLoggedInToChat),
  // },
  {
    path: 'chat',
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'mycase',
    loadChildren: () => import('./my/mycase/mycase.module').then( m => m.MycasePageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'othercase',
    loadChildren: () => import('./other/othercase/othercase.module').then( m => m.OthercasePageModule),
  },
  {
    path: 'othercase-done',
    loadChildren: () => import('./other/othercase-done/othercase-done.module').then( m => m.OthercaseDonePageModule)
  },
  {
    path: 'othercase-collect',
    loadChildren: () => import('./other/othercase-collect/othercase-collect.module').then(m => m.OthercaseCollectPageModule)
  },
  {
    path: 'othercase-running',
    loadChildren: () => import('./other/othercase-running/othercase-running.module').then( m => m.OthercaseRunningPageModule)
  },
  {
    path: 'mycase-paired',
    loadChildren: () => import('./my/mycase-paired/mycase-paired.module').then( m => m.MycasePairedPageModule)
  },
  {
    path: 'mycase-unpaired',
    loadChildren: () => import('./my/mycase-unpaired/mycase-unpaired.module').then( m => m.MycaseUnpairedPageModule)
  },
  {
    path: 'mycase-done',
    loadChildren: () => import('./my/mycase-done/mycase-done.module').then(m => m.MycaseDonePageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'message',
    loadChildren: () => import('./message/message.module').then( m => m.MessagePageModule)
  },





];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
