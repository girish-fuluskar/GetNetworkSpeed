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
        //this.openNativeSettings.open("battery_optimization");
        this.getAll();
      });

      this.backgroundMode.on('deactivate').subscribe(async (stop) => {
        //this.backgroundMode.disableWebViewOptimizations();
        console.log('Deactivated');
        //this.openNativeSettings.open("battery_optimization");
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

      // me.networkmeter.getBitmapFromString().then(result =>{
      //   console.log("Bitmap: " + result);
      // })
      
    },1000);

    // setTimeout(function(){
    //   if (me.network.type !== 'none') {
        
    //     me.networkmeter.initiateDownload().then(result =>{
    //       console.log("Speed: " + result);
          
    //       me.localNotifications.schedule({
    //         id: 1,
    //         title: 'Network Status',
    //         text:  result.toString()
    //         //every: sch
    //         //trigger: {in: 1}
    //       });

    //     })

    //   }
    //   me.getAll();
    // },1000);
  }

  //Delete

    //Getteing Network Speed
    private async getDownloadSpeed(): Promise<string> {
      return await this.MeasureConnectionSpeed();
    }

      //Measuring Network Speed
  private MeasureConnectionSpeed(): Promise<string> {
    return new Promise((resolve) => {
      var imageAddr = "http://www.kenrockwell.com/contax/images/g2/examples/31120037-5mb.jpg";
      var downloadSize = 4995374; //bytes


      var startTime, endTime;
      var download = new Image();
      download.onload = () => {
        endTime = (new Date()).getTime();

        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = downloadSize * 8;
        var speedBps: any = (bitsLoaded / duration).toFixed(2);
        var speedKbps: any = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        this.ShowProgressMessage(
          "Your connection speed is:" +
          speedBps + " bps, "+
          speedKbps + " kbps, "+
          speedMbps + " Mbps"
        );
        //console.log(this.ShowProgressMessage);
        resolve(this.ShowProgressMessage.toString());
      }
      startTime = (new Date()).getTime();
      var cacheBuster = "?nnn=" + startTime;
      download.src = imageAddr + cacheBuster;
    });
  }

    //Network Progress Message
    private ShowProgressMessage(msg): void {
      if (console) {
        if (typeof msg == "string") {
          console.log(msg);
        } else {
          //for (var i = 0; i < msg.length; i++) {
            console.log(msg);
          //}
        }
        
        this.SendNetworkNotification(msg, 'minute');
      }
  
      var oProgress = document.getElementById("progress");
      if (oProgress) {
        var actualHTML = (typeof msg == "string") ? msg : msg.join("<br />");
        oProgress.innerHTML = actualHTML;
      }
    }

    private SendNetworkNotification(msg, sch): void{
      this.localNotifications.schedule({
        id: 1,
        title: 'Network Status',
        text: msg
        //every: sch
        //trigger: {in: 1}
      });
    }


}
