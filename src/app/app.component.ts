import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // loadedFeature = 'recipe';
  //
  // onNavigate(feature: string) {
  //   this.loadedFeature = feature;
  // }
  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyAPAsxv5mjxRF7t7ROE3YnlC2BimFNIwVw",
      authDomain: "ng-recipe-book-ac2f0.firebaseapp.com"
    })
  }
}
