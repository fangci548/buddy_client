import { Component,OnDestroy, OnInit } from '@angular/core';
import { FirebaseAuthService } from './../services/firebase-auth.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ImageListingModel } from '../utils/models/image-listing.model';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit,OnDestroy {
  userProfileData: any;
  friends: ImageListingModel;
  posts: ImageListingModel;
  private subs: Subscription[] = [];
  constructor(public nav: NavController,private firebaseAuthService: FirebaseAuthService,private route: ActivatedRoute) {}
  ngOnInit() {
//     this.userProfileData = this.firebaseAuthService.getUser();
    const sub3 = this.route.data
        .pipe(
          map((resolvedRouteData) => {

            const friendsDataStore = resolvedRouteData['data'].friends;
            const postsDataStore = resolvedRouteData['data'].posts;
            const sub1 = friendsDataStore.state.subscribe(
              (dataModel: ImageListingModel) => this.friends = dataModel
            );

            const sub2 = postsDataStore.state.subscribe(
              (dataModel: ImageListingModel) => this.posts = dataModel
            );


            this.subs.push(sub2);
          })
        ).subscribe();
        this.subs.push(sub3);
  }

  logoutAction() {
    this.firebaseAuthService.logout();
  }
  goback() {
    this.nav.back();
    this.nav.navigateBack('/tabs/tab3');
  }
    ngOnDestroy(): void {
      this.subs.forEach((s) => s.unsubscribe());
    }
}
