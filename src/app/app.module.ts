import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { Network } from '@ionic-native/network';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import { NetworkmeterProvider } from '../providers/networkmeter/networkmeter';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Network,
    LocalNotifications,
    BackgroundMode,
    NetworkmeterProvider,
    OpenNativeSettings
  ]
})
export class AppModule {}
