const fs = require('fs');
// Configure Angular `environment.ts` file path
const targetPath = './src/environments/environment.ts';
// Load node modules
const colors = require('colors');
require('dotenv').config({ path: '.env' });
// `environment.ts` file structure
const envConfigFile = `export const firebaseConfig = {
   apiKey: '${process.env.apiKey}',
   authDomain: '${process.env.authDomain}',
   databaseURL: '${process.env.databaseURL}',
   projectId: '${process.env.projectId}',
   storageBucket: '${process.env.storageBucket}',
   messagingSenderId: '${process.env.messagingSenderId}',
   appId: '${process.env.appId}'
};`;

console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
console.log(colors.grey(envConfigFile));

fs.writeFileSync(targetPath, envConfigFile, function (err: any) {
    if (err) {
        throw console.error(err);
    } else {
        console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
    }
});
