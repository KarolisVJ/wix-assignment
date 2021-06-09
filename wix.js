let https = require('https')
let fs = require('fs')
let path = require('path')


let data = '';

https.get('https://www.wix.com/_serverless/hiring-task-spreadsheet-evaluator/jobs', (resp) => {


  resp.on('data', (chunk) => {
    data += chunk;

  });

  resp.on('end', () => {
    data = JSON.parse(data);
  });


  fs.open(__dirname+'/'+'wix'+data+'.json', 'wx', function(err, fileDescriptor){
    if(!err && fileDescriptor){
      var stringData = JSON.stringify(data);

      fs.writeFile(fileDescriptor, stringData,function(err){
        if(!err){
          fs.close(fileDescriptor,function(err){
            if(!err){
              return false;
            } else {
              return 'Error closing new file';
            }
        })
    }
})} else {
    console.log(err);
}
    }
)

}).on("error", (err) => {
  console.log("Error: " + err.message);
})

//open the results file to send it to Wix

let solution = fs.readFileSync('solution.json', 'utf8');



let options = {
  hostname: 'www.wix.com',
  path: '/_serverless/hiring-task-spreadsheet-evaluator/submit/eyJ0YWdzIjpbXX0',
  method: 'POST',
  headers: {'Content-Type': 'application/json',
  'Content-Length': Buffer.byteLength(solution)}
}

let postReq = https.request (options, (res)=>{
  let resData =""
  console.log("Status code:", res.statusCode)
  res.on('data', (chunk)=>{
    resData += chunk;
  })

  res.on('end', ()=>{
    console.log("Body:", resData);
  })


})

postReq.write(solution);
postReq.end

