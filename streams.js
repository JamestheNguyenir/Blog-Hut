const fs = require('fs');

const readStream =fs.createReadStream('/Users/jamesnguyen/Documents/node ninja/blog2.txt',{enconding:'utf8'});

const writeStream = fs.createWriteStream('/Users/jamesnguyen/Documents/node ninja/blog4.txt')

// readStream.on('data',(chunk)=>{
//     consoe.log(".....new chunk");
//     console.log(chunk);l

//     writeStream.write('\n New CHUNK \n');
//     writeStream.write(chunk)
// })

//piping 
readStream.pipe(writeStream)
writeStream.write('updated \n')





