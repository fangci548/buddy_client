import { Case } from 'src/app/models/case.model';
import { MessageModalComponent } from './message-modal/message-modal.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { MycaseService } from '../service/mycase.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  case?: Case;

  constructor(
    private route: ActivatedRoute,
    public nav: NavController,
    private caseService: MycaseService,
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
    const caseId = Number(this.route.snapshot.params.id);
    this.case = this.caseService.getMyPairedCasess(caseId);
  }


  goback() {
    this.nav.back();
    this.nav.navigateBack('/tabs/tab3');
  }

  async openModal(){


    this.nav.navigateBack('/chat');
  }
}
