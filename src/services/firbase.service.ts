import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { data } from '../data.json';
import { writeFileSync } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class FirbaseService {

  constructor(public db: AngularFirestore) { }

  getRecords() {
    return this.db.collection('TestResultsData').get();
  }

  bulkUpload() {
    const collectionKey = 'TestResultsData';
    // tslint:disable-next-line: prefer-const
    let minifiedData = new Map();
    for (const val of Object.values(data)) {
      if (minifiedData.has(val.Class)) {
        // tslint:disable-next-line: prefer-const
        let _temp: string[] = minifiedData.get(val.Class);
        _temp.push(val.TestClass);
        minifiedData.set(val.Class, _temp);
      } else {
        minifiedData.set(val.Class, [val.TestClass]);
      }
    }

    let dbData = [];
    for (const [key, value] of minifiedData) {
      dbData.push({
        Class: key,
        TestClases: value
      });
      // this.db.collection(collectionKey).doc(key).set({
      //   Class: key,
      //   TestClases: value
      // }).then((res: any) => {
      //   console.log('Document ', key, ' successfully written!');
      // }).catch((error: any) => {
      //   console.error('Error writing document: ', error);
      // });
    }

    writeFileSync('db.json', dbData);

    console.log(dbData);
  }

}

