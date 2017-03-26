import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs/Rx';



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
  private $fibonacciStreamGenerator;

  constructor() { }

  ngOnInit() {

    // Generates a observable stream using fibonacci series
    this.generateFibonacciSeries(10);

    this.createObservableStream();

    this.subscribeToStreams();

  }

  createObservableStream() {
    // creating a observale stream.
    // Stream would not start if the subscriber is not assinged to it
    // Each subscriber would instantiate a new stream.
    this.$obs = Observable.interval(500).take(5).do(i => console.log('obs value ' + i));

    // reduces the created stream
    this.$reducer = this.$obs.reduce((state, value) => state + value, 0);

    // perfroms scanning of the created stream
    this.$scanObs = this.$obs.scan((state, value) => state + value, 0);

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

    // Subscribe to fabonacci Stream
    this.$fibonacciStreamGenerator.subscribe(value => console.log('The fibonacci number is ' + value));
  }

  // The function is used to generate the steam according using the seies.
  // It gets the series from the series generator and than use the generated series to create a stream.
  // This allows us to create a custom stream from the number series that is desired for the usage.
  generateFibonacciSeries(steps: number) {
    console.log('generating fibonacci series till step ' + steps);
    this.$fibonacciStreamGenerator = Observable.from(this.seriesGenerator(steps, 'fabonacci')())
      .take(steps).scan((state, value) => value, 0);


  }

// Returns a function that generate the type of series defined in the series type
  seriesGenerator(steps: number, seriesType: string): Function {

    switch (seriesType) {
      case 'fabonacci':
        return function fibonacci(): number[] {
          let fn1 = 1;
          let fn2 = 1;
          let stepCount = 0;
          let fabArr = [1];
          while (stepCount < steps) {
            let current = fn2;
            fn2 = fn1;
            fn1 = fn1 + current;
            fabArr.push(fn1);
            stepCount++;
          }
          return fabArr;
        };
      default:
        return function simpleSeries(): number[] {
          let arr = [];
          for (let i = 0; i < steps; i++) {
            arr.push(steps);
          }
          return arr;
        };
    }
  }


}
