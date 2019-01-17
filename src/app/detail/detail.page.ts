import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LosjuevesApiService } from '../losjueves-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  playerDetail: any[] = [];
  player: any;
  constructor(public api: LosjuevesApiService,
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router) { }

    ngOnInit() {
      this.getPlayerDetail();
      this.getPlayer();
    }
  
    async getPlayer() {
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await loading.present();
      await this.api.getPlayer(this.route.snapshot.paramMap.get('id'))
        .subscribe(res => {
          console.log(res);
          this.player = res;
          loading.dismiss();
        }, err => {
          console.log(err);
          loading.dismiss();
        });
    }

    async getPlayerDetail() {
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await loading.present();
      await this.api.getPlayerDetail(this.route.snapshot.paramMap.get('id'))
        .subscribe(res => {
          console.log(res);
          this.playerDetail = res;
          loading.dismiss();
        }, err => {
          console.log(err);
          loading.dismiss();
        });
    }

    getStyle = function(name){
      if(name == "Azul")
        return {'color':'primary'};
      if(name == "Rojo")
        return {'color':'danger'};
    };

}
