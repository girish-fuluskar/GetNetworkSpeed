import { Injectable } from '@angular/core';
import {Plugin, Cordova, CordovaProperty, CordovaInstance, IonicNativePlugin} from '@ionic-native/core';
import { Observable } from 'rxjs/Observable';

@Plugin({
  pluginName: "networkmeter",
  plugin:"cordova-plugin-networkmeter",
  pluginRef:"NetworkMeter",
  repo:'https://github.com/girish-fuluskar/NetworkMeter.git',
  platforms:['Android','iOS']
})

// @Plugin({
//   pluginName: "networkspeed1",
//   plugin:"cordova-plugin-networkspeed1",
//   pluginRef:"NetworkMeter",
//   repo:'https://github.com/girish-fuluskar/NetworkSpeed1.git',
//   platforms:['Android','iOS']
// })

@Injectable()
export class NetworkmeterProvider {

  @Cordova()
  initiateDownload():Promise<String>{
    return;
  }
  
  @Cordova()
  getBitmapFromString():Promise<String>{
    return;
  }

  //@Cordova
  // startServiceNow(con: any):Promise<String>{
  //   return;
  // }
}
