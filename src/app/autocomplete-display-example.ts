import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { NgxSpinnerService } from 'ngx-spinner';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ReadCSVService } from 'src/services/read-csv.service';

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
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  filteredTestClasses: string[] | undefined;
  displayedColumns: string[] = ['TestClass'];
  classes: string[];
  _selectedTestClasses: string[] = [];
  checked_all = false;

  constructor(public readCSV: ReadCSVService, private spinner: NgxSpinnerService) {
  }

  async ngOnInit() {
    this.spinner.show();
    this.options = await this.readCSV.getApexClasses();
    console.log(this.options.length);
    this.spinner.hide();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }


  displayFn(className: string): string {
    return className && className ? className : '';
  }

  private _filter(name: string): string[] {
    if (name && name.length > 0) {
      const filterValue = name.toLowerCase();
      return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    } else {
      return [];
    }
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    this._selectedTestClasses = [];
    // this.filteredTestClasses = this.options.find(row => row === event.option.value) !== undefined ?
    //   this.options.find(row => row === event.option.value) : [];
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

  performBulkUpload() {
    // this.firebaseService.bulkUpload();
  }

  toggleSelection(event: MatCheckboxChange) {
    console.log(event.checked);
    const all_checkBoxes = document.querySelectorAll('.cb-cell');
    if (event.checked) {
      console.log(all_checkBoxes);
    }
  }

}
