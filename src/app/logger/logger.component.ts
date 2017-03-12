import { Component, OnInit } from '@angular/core';
import {Observable, Subscriber} from 'rxjs/Rx';

@Component({
  selector: 'rxex-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent implements OnInit {

  private $obs;
  private $sharableObs;
  private $reducer;
  private $scanObs;

  constructor() { }

  ngOnInit() {

    this.createObservableStream();

    this.subscribeToStreams();

  }

  createObservableStream() {
    // creating a observale stream.
    // Stream would not start if the subscriber is not assinged to it
    // Each subscriber would instantiate a new stream.
    this.$obs = Observable.interval(500).take(5).do(i => console.log('obs value ' + i));

    // reduces the created stream
    this.$reducer = this.$obs.reduce((state, value) =>  state + value , 0);

    // perfroms scanning of the created stream
    this.$scanObs = this.$obs.scan((state, value) => state + value , 0);

    // The extra share function added on the end of the observable chain allows the observable to be shared among
    // multiple subscriber.
    this.$sharableObs = Observable.interval(500).take(5).do(i => console.log('sharable obs value ' + i)).share();


  }

  subscribeToStreams() {

    // assigning a first subscriber to the stream
    this.$obs.subscribe(value => console.log('observer 1 received ' + value));

    // assiging a second subscriber to the stream
    this.$obs.subscribe(value => console.log('observer 2 received ' + value));

    // subscribe to the reducer. The reducer performs the operation when the stream is finished.
    this.$reducer.subscribe(total => console.log('reduced total = ' + total));

    // subscrive to the scanner. The scanner performs the operation on every new value of the stream
    this.$scanObs.subscribe(total => console.log('scanned total = ' + total));

    this.$sharableObs.subscribe(value => console.log('sharable observer 1 received ' + value));

    this.$sharableObs.subscribe(value => console.log('sharable observer 2 received ' + value));


  }

}
