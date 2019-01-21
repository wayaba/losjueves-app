import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LosjuevesApiService } from '../losjueves-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  @ViewChild('doughnutCanvas') doughnutCanvas;
  playerDetail: any[] = [];
  doughnutChart: any;

  constructor(public api: LosjuevesApiService,
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router) { 
    }

    ngOnInit() {
      this.getPlayerDetail();
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
          this.getGraph(res);
          loading.dismiss();
        }, err => {
          console.log(err);
          loading.dismiss();
        });
    }

    getGraph(res: any){
      
      let win = 0;
      let draw = 0;
      let lose = 0;
      let pj = 0;
      for (var i=0 ; i < res.detail.length; i++) {          
          win = +win + +res.detail[i].win;
          draw = +draw + +res.detail[i].draw;
          lose = +lose + +res.detail[i].lose;
          pj = +pj + +res.detail[i].pj;
      }

      if(pj > 0){
        win = Math.round((win * 100)/pj);
        draw = Math.round((draw * 100)/pj);
        lose = Math.round((lose * 100)/pj);
      }
      
      Chart.defaults.global.tooltips.enabled = false;
      this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
        
        type: 'pie',
        options: {
          responsive: true,
          maintainAspectRatio: false,    
          legend: {
              display: true,
              position: 'top',
              labels: {
                usePointStyle: true
             }
            }    
          },
        data: {
            labels: ["% Victorias: " + win ,"% Empates: " + draw, "% Derrotas: " + lose],
            datasets: [{
                data: [win, draw, lose],
                backgroundColor: [
                  "#2EFE64",
                  "#F4FA58",
                  "#2ECCFA" 
                ],                
            }]
        }

      });
    }

}
