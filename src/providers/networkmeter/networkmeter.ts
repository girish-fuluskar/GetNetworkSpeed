import { Injectable } from '@angular/core';
import {Plugin, Cordova, CordovaProperty, CordovaInstance, IonicNativePlugin} from '@ionic-native/core';

@Plugin({
  pluginName: "networkmeter",
  plugin:"cordova-plugin-networkmeter",
  pluginRef:"NetworkMeter",
  repo:'https://github.com/girish-fuluskar/NetworkMeter.git',
  platforms:['Android','iOS']
})

@Injectable()
export class NetworkmeterProvider {

  @Cordova()
  initiateDownload():Promise<String>{
    return;
  }   

}
