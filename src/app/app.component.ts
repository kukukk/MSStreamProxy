import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HttpClient} from '@angular/common/http';

import {HomePage} from '../pages/home/home';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = HomePage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public http: HttpClient) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();

            this.createServer();
        });
    }

    createServer() {
        const that = this;
        (<any>window).webserver.onRequest(
            function(request) {
                const filename = request.path.replace('/', '');
                that.getRemoteFile(filename)
                    .then(content => {
                        (<any>window).webserver.sendResponse(
                            request.requestId,
                            content
                        );
                    });
            }
        );
        (<any>window).webserver.start();
    }

    getRemoteFile(filename) {
        const url = `https://kukukk.go.ro/dash/${filename}`;
        console.log(url);
        return new Promise(resolve => {
            this.http
                .get(url, {responseType: 'arraybuffer'})
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    error => {
                        console.log(error);
                        resolve('Missing...');
                    });
        });
    }
}

