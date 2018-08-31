import { Component } from '@angular/core';
import { Network } from '@ionic-native/network';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';


import { NetworkmeterProvider } from '../../providers/networkmeter/networkmeter';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private network: Network, private localNotifications: LocalNotifications,
    private backgroundMode: BackgroundMode, public networkmeter: NetworkmeterProvider) {

      this.backgroundMode.moveToBackground();

      this.backgroundMode.enable();

      
        this.getAll();

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
      
    },500);

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

}
