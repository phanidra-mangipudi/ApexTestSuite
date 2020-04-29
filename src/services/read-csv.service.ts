import { Injectable } from '@angular/core';
import * as csv from 'csv-parser';
// const fs = require('fs');

@Injectable({
  providedIn: 'root'
})
export class ReadCSVService {

  constructor() { }

  getApexClasses() {
    // tslint:disable-next-line: prefer-const
    let apexClasses: string[] = [];
    // fs.createReadStream('ApexCodeCoverage.csv')
    //   .pipe(csv())
    //   .on('data', (data: any) => {
    //     if (!apexClasses.includes(data.ApexClassOrTriggerName)) {
    //       apexClasses.push(data.ApexClassOrTriggerName);
    //     }
    //   })
    //   .on('error', (error: any) => {
    //     console.error(error);
    //   })
    //   .on('end', () => {
    //     // writeFileSync('db.json', JSON.stringify(apexClasses));
    //     return [];
    //   });
    return [];
  }
}
