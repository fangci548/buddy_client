import { Case } from 'src/app/models/case.model';
import { MessageModalComponent } from './message-modal/message-modal.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, ModalController, NavController } from '@ionic/angular';
import { OthercaseService } from '../../../service/othercase.service';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  case?: Case;
  @ViewChild(IonContent) content: IonContent;
  constructor(
    private route: ActivatedRoute,
    public nav: NavController,
    private caseService: OthercaseService,
    private modalCtrl: ModalController,
    private chatService: ChatService,
    private router: Router
    ) { }

  messages: Observable<any[]>;
  newMsg = '';

  ngOnInit() {
    const caseId = Number(this.route.snapshot.params.id);
    this.case = this.caseService.getOTHERRUNCASEs(caseId);
    this.messages = this.chatService.getChatMessages();
  }


  goback() {
    this.nav.back();
    this.nav.navigateBack('/tabs/tab3');
  }

  async openModal(){

    const modal = await this.modalCtrl.create({
      component: MessageModalComponent,
      componentProps: {title: this.case.userName, content: this.case.content, id: this.case.id, hashtag: this.case.hashtag, pay: this.case.pay}
    });

    await modal.present();
  }


  sendMessage() {
    this.chatService.addChatMessage(this.newMsg).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    });
  }

  signOut() {
    this.chatService.signOut().then(() => {
      this.router.navigateByUrl('/', { replaceUrl: true });
    });
  }

}
