import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private network: Network,
    private toast: ToastService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    // Watch network for a disconnection
    const disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('[ERR] Network was disconnected');
      this.toast.presentToast('Network was disconnected...', 4000);
    });

    // Watch network for a connection
    const connectSubscription = this.network.onConnect().subscribe(() => {
      this.toast.presentToast('Network was reconnected!', 4000);
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('[LOG] Connected via WiFi.');
        }
      }, 3000);
    });
  }
}
