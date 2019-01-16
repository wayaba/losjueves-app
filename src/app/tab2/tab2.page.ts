import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LosjuevesApiService } from '../losjueves-api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  gamedatesdetail: any[] = [];
  constructor(public api: LosjuevesApiService,
    public loadingController: LoadingController) { }

  ngOnInit() {
    this.getGameDatesDetail();
  }

  async getGameDatesDetail() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    await this.api.getGameDatesDetail()
      .subscribe(res => {
        console.log(res);
        this.gamedatesdetail = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
}