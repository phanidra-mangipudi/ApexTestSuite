import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FirbaseService } from '../services/firbase.service';

import { DbResult } from '../models/db-result';


import { NgxSpinnerService } from 'ngx-spinner';

/**
 * @title Display value autocomplete
 */
@Component({
  selector: 'autocomplete-display-example',
  templateUrl: 'autocomplete-display-example.html',
  styleUrls: ['autocomplete-display-example.css'],
})

// tslint:disable-next-line: component-class-suffix
export class AutocompleteDisplayExample implements OnInit {

  myControl = new FormControl();
  options: DbResult[] = [];
  filteredOptions: Observable<DbResult[]>;
  filteredTestClasses: string[] | undefined = [];
  displayedColumns: string[] = ['TestClass'];
  classes: string[];
  _selectedTestClasses: string[] = [];

  constructor(public firebaseService: FirbaseService, private spinner: NgxSpinnerService) {
  }

  async ngOnInit() {
    this.spinner.show();
    await this.firebaseService.getRecords().subscribe(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.options.push({ Class: doc.data().Class, TestClasses: doc.data().TestClases });
      });
    });
    console.log(this.options.length);
    this.spinner.hide();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }


  displayFn(user: DbResult): string {
    return user && user.Class ? user.Class : '';
  }

  private _filter(name: string): DbResult[] {
    if (name && name.length > 0) {
      const filterValue = name.toLowerCase();
      return this.options.filter(option => option.Class.toLowerCase().indexOf(filterValue) === 0);
    } else {
      return [];
    }
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    this._selectedTestClasses = [];
    this.filteredTestClasses = this.options && this.options.find(row => row.Class === event.option.value.Class)?.TestClasses;
    console.log(this.filteredTestClasses);
  }

  cbToggled(val: string) {
    console.log(val);
    if (!this._selectedTestClasses.includes(val)) {
      this._selectedTestClasses.push(val);
    } else {
      // this._selectedTestClasses.splice()
    }
  }

  sfdxCommand(): string {
    return `sfdx force:apex:test:run --classnames ${this._selectedTestClasses} --resultformat tap --codecoverage`;
  }

  showCommand(): boolean {
    return this._selectedTestClasses.length > 0;
  }

}
