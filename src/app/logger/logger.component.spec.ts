/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoggerComponent } from './logger.component';

import * as LoggerClass from './logger';

describe('average salary', () => {

    const employees = [
      new LoggerClass.Employee('Jim', 100),
      new LoggerClass.Employee('Jhon', 200),
      new LoggerClass.Employee('Liz', 130),
      new LoggerClass.Employee('Penny', 30)
    ];

    const sales = new LoggerClass.Department([employees[0], employees[1]]);

    expect(LoggerClass.averageSalary(employees, [(e) => e.salary > 50, (e) => sales.works(e)])).toEqual(150);
    expect(LoggerClass.averageSalary(employees, [(e) => e.salary > 50])).toEqual(140);

});

describe('LoggerComponent', () => {
  let component: LoggerComponent;
  let fixture: ComponentFixture<LoggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
