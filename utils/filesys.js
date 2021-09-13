const { encrypt } = require('./helpers');
const fs = require("fs");
const crypto = require('crypto');

module.exports={
    readFile:async (path)=> {
        return new Promise((resolve, reject) => {
          fs.readFile(path, 'utf8', async function (err, jsonString) {
            if (err) {
              reject(err);
            }
            data = JSON.parse(jsonString);
            let string = "";
            for (let index = 0; index < 10; index++) {
    
                let nameIndex = Math.floor(Math.random() * 50) + 1;
                let originIndex = Math.floor(Math.random() * 50) + 1;
                let destinationIndex = Math.floor(Math.random() * 50) + 1;
    
                let name = data.names[nameIndex];
                let origin = data.cities[originIndex];
                let destination = data.cities[destinationIndex];
                let obj ={
                    name,
                    origin,
                    destination
                }
                
                var hash_Signature=crypto.createHash('md5').update((JSON.stringify(obj))).digest('hex');
                obj["secret_key"] = hash_Signature
                
               let encrypedData = await encrypt(JSON.stringify(obj))
               string += encrypedData
               if(index != 9 ) string += "|"
                   
            }
          
            resolve (string);
          });
        });
      }
}