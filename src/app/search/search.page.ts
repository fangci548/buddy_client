import { CaseService } from './../service/case.service';
import { viewClassName } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar , NavController} from '@ionic/angular';
import { Case } from '../models/case.model';
import { Moment } from 'moment';
import { SearchCase } from '../models/searchcase.model';
import * as moment from 'moment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
// import { FirebaseDatabase, FirebaseFirestore } from 'angularfire2';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  // @ViewChild('search' , {static: false }) search: IonSearchbar;

  // public list: Array<Object> = [];
  // public searcheditem: any;
  searchTerm: string;
  cases: SearchCase[] = [];
  collect: boolean = false;
  currentuser = null;
  date: Date = new Date('2021-09-10 00:15:37');


  constructor(
    private caseService: CaseService,
    private navCtrl: NavController,
    public afuth: AngularFireAuth
    //private store: FirebaseFirestore
  ) {
    this.afuth.onAuthStateChanged((user) => {
      this.currentuser = user;
    });
  }

  ngOnInit() {
    this.cases = this.caseService.getCases();
  }

  showDetail(selectedCase: SearchCase){
    this.navCtrl.navigateForward('search/detail/'+selectedCase.id)
    console.log(this.currentuser);

    // onAuthStateChanged(getAuth(), (user) => {
    //   if(user){
    //     const uid = user.uid;
    //     console.log(user.uid);
    //   }

    // })

  }
  // ionViewDidEnter(){
  //   setTimeout(() => {
  //     this.search.setFocus();
  //   })
  // }

  // _ionchange(event){
  //   console.log(event.detail.value);
  //   const val = event.target.value;
  //   this.searcheditem = this.list;
  //   if (val && val.trim() != ''){
  //     this.searcheditem = this.searcheditem.filter((item: any) =>{
  //       return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //     })
  //   }
  // }
// theDate: Date
  getDiferenceInDay() {
    // console.log(moment.calendarFormat(this.date.getTime() - new Date().getTime()) );
    // return Math.abs(this.date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
    console.log(moment(moment().valueOf()).format('YYYY-MM-DD hh:mm'));

  }

  collectchange(selectedCase: SearchCase){
    //this.date = new Date();
    console.log(selectedCase.collect);
    if(selectedCase.collect == true){
      selectedCase.collect = false;
    }
    else{
      selectedCase.collect = true;
    }
    //console.log(this.getDiferenceInDay);
    console.log(selectedCase.collect);
    console.log(this.date);
  }



}
