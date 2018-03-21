import {Component, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild('video') video: any;

    constructor(public navCtrl: NavController, public http: HttpClient) {

    }

    playVideo() {
        const video = this.video.nativeElement;
        video.src = 'https://kukukk.go.ro/dash/base.m3u8';
        video.play();
    }
}
