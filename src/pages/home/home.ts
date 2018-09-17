import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';


import { NetworkmeterProvider } from '../../providers/networkmeter/networkmeter';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public platform: Platform, private network: Network, private localNotifications: LocalNotifications,
    private backgroundMode: BackgroundMode, public networkmeter: NetworkmeterProvider, private openNativeSettings: OpenNativeSettings) {
      
      this.init();  
      
  }

  async init(){
    this.platform.ready().then(async(stop) =>{
      this.backgroundMode.disableWebViewOptimizations();
      this.backgroundMode.moveToBackground();

      this.backgroundMode.on('activate').subscribe(async(stop) => {
        this.backgroundMode.disableWebViewOptimizations();
        console.log('activated');
        this.getAll();
      });

      this.backgroundMode.on('deactivate').subscribe(async (stop) => {
        console.log('Deactivated');
        this.getAll();
      });

      document.addEventListener("abort", this.relaunch, false);


      this.getAll();
      this.backgroundMode.enable();
    })
  }

  public relaunch(): void{
    this.platform.exitApp();
  }

 public getAll(): void {
    var me =this;
    let s;
    setTimeout(function(){
      console.log("Calling Now");
      me.networkmeter.initiateDownload().then(result =>{
        console.log("Speed: " + result);
        me.getAll();
        me.localNotifications.schedule({
          id: 1,
          title: 'Network Status',
          text:  result.toString()
          //every: sch
          //trigger: {in: 1}
        });
      })

      //Bitmap
      me.networkmeter.getBitmapFromString().then(result => {
        console.log("Bitmap: " + result);
      })

      // me.networkmeter.startServiceNow(me).then(result => {
      //   console.log("New Network: " + result);
      // })
    },1000);
  }
}