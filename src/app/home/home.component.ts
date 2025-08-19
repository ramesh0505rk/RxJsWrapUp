import { Component, OnInit } from '@angular/core';
import { combineLatest, concat, debounceTime, delay, distinctUntilChanged, filter, first, from, fromEvent, interval, last, map, merge, mergeMap, Observable, of, take, timer } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  observervable = new Observable((subscriber) => {
    subscriber.next('Hello');
    subscriber.error('World');
    subscriber.complete();
  })

  observer = {
    next: (value: any) => console.log('Next:', value),
    error: (error: any) => console.error('Error:', error),
    complete: () => console.log('Complete')
  }

  ngOnInit(): void {
    // this.subscribeToObservable();
    // this.ofTest()
    // this.fromTest()
    // this.intervalTest()
    // this.timerTest()
    // this.mapTest()
    // this.pluckTest()
    // this.filterTest()
    // this.takeTest()
    // this.firstLastTest()
    // this.debounceTimeTest()
    // this.distinctUntilChangedTest();
    // this.mergeTest();
    // this.concatTest();
    // this.combineLatestTest();
    this.mergeMapTest();
  }

  subscribeToObservable() {
    this.observervable.subscribe({
      next: (value) => console.log(value),
      error: (error) => console.error(error),
      complete: () => console.log('Observable completed')
    });
  }

  ofTest() {
    of('Hello', 'World', 'RxJS').subscribe((value: string) => console.log(value));
  }

  fromTest() {
    from([1, 2, 3, 4]).subscribe((value: number) => console.log(value));
  }

  intervalTest() {
    interval(1000).pipe(take(3)).subscribe(console.log);
  }

  timerTest() {
    timer(2000).subscribe(() => console.log('After 2 secs'))

    timer(2000, 3000).pipe(take(5)).subscribe(console.log)
  }

  mapTest() {
    of(1, 2, 3, 4).pipe(map(x => x * 10)).subscribe(console.log);

    of('John', 'Jane').pipe(map(name => `Hello ${name}`)).subscribe(console.log);
  }

  pluckTest() {
    from([
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
      { name: 'Doe', age: 40 }
    ]).pipe(
      map(person => person.age) // pluck('age') can also be used (Pluck is deprecated!)
    ).subscribe(name => console.log(name));
  }

  filterTest() {
    of(1, 2, 3, 4, 5).pipe(
      filter(x => x % 2 === 0),
      map(x => x * 10)
    ).subscribe(console.log)

    of('Hi', 'Hello', 'RxJS').pipe(filter(s => s.length > 3)).subscribe(console.log)
  }

  takeTest() {
    interval(1000).pipe(take(5)).subscribe(console.log)

    of('A', 'B', 'C').pipe(take(2)).subscribe(console.log)
  }

  firstLastTest() {
    of(10, 20, 30).pipe(first()).subscribe(console.log)

    of(10, 20, 30).pipe(last()).subscribe(console.log)
  }

  debounceTimeTest() {
    // fromEvent(document, 'keyup').subscribe(val=>console.log(val));
    fromEvent(document, 'keyup').pipe(debounceTime(1000)).subscribe(console.log)
  }

  distinctUntilChangedTest() {
    of(1, 1, 2, 2, 3).pipe(distinctUntilChanged()).subscribe(console.log); // 1,2,3

    of('a', 'a', 'b', 'b', 'c').pipe(distinctUntilChanged()).subscribe(console.log);
  }

  mergeTest() {
    // merge(of('A', 'B', 'C'), of(1, 2, 3)).subscribe(console.log);
    // merge(of('A', 'B', 'C'), of(1, 1, 2, 3)).pipe(take(5), distinctUntilChanged()).subscribe(console.log);

    merge(interval(1000).pipe(take(2)), interval(500).pipe(take(3))).subscribe(console.log)
  }

  concatTest() {
    // merge(of('A','B').pipe(delay(1000)), of('C')).subscribe(console.log)

    concat(of('A', 'B').pipe(delay(1000)), of('C')).subscribe(console.log)

    // concat(timer(1000), of('Done'), of('ramz')).subscribe(console.log);

    //   Key Difference:
    // merge → subscribes to all observables at the same time and interleaves emissions as they come.
    // concat → subscribes to observables one after another. It waits until the first one completes before moving to the next.
  }

  combineLatestTest() {
    // combineLatest([of(1,2,3), of('x','y')]).subscribe(console.log)

    // combineLatest([of('x', 'y'), interval(1000).pipe(take(3))]).subscribe(console.log)
    combineLatest([interval(2000).pipe(take(3)), interval(1000).pipe(take(3))]).subscribe(console.log)
  }

  //Higher order mapping
  mergeMapTest() {
    of('A', 'B').pipe(mergeMap(x => of(`${x}1`, `${x}2`))).subscribe(console.log);

    // of('A', 'B').pipe(
    //   mergeMap(x => interval(100).pipe(
    //     take(2),
    //     map(i => `${x}${i + 1}`)
    //   ))
    // ).subscribe(console.log);
  }
}