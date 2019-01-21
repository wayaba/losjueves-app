import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LosjuevesApiService } from '../losjueves-api.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  gametable: any[] = [];
  constructor(public api: LosjuevesApiService,
    public loadingController: LoadingController) { }

  ngOnInit() {
    this.getGameTable();
  }

  async getGameTable() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    await this.api.getGameTable()
      .subscribe(res => {
        console.log(res);
        this.gametable = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
  
}
