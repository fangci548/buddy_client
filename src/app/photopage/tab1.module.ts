import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from './../components/components.module';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { Tab1Page } from './tab1.page';
import { RouterModule } from '@angular/router';
import { ShellModule } from '../utils/shell/shell.module';
import { Tab1Resolver } from './tab1.resolver';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
     ShellModule,

     RouterModule.forChild([
          {
            path: '',
            component: Tab1Page,
            resolve: {
              data: Tab1Resolver
            }
          }
        ])
  ],
  declarations: [Tab1Page],
   providers: [Tab1Resolver]
})
export class Tab1PageModule {}
