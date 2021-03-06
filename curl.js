const fetch = require('node-fetch');
const fs = require('fs');
const { program } = require('commander');

program
    .option('-o, --output <string>', 'file in which to store the fetched content')
    .option('-H, --header', 'set headers of the request')

const opts = program.parse(process.argv);
// ********************
// console.log(opts);
// url under args property
// can get value of output arguments 
// ********************
const output = opts.output; // this gives output.txt
const url = opts.args[0]; // this gives the url
// ********************

if (program.output) {
    fetch(url)
        .then(res => res.text())
        .then(body => {
            fs.writeFile(`./${output}`, body, err => {
                if (err) {
                    console.error(`curl: (23) Failed writing body`);
                }
            });
        })
        .catch(reason => {
            console.log('WARNING: Only absolute URLs are supported')
            console.log(`curl: (6) Could not resolve host: ${url}`)
        })
}

if (program.header) { 
    fetch(url)
        .then(res => res.headers)
        .then(headerObj => {
            console.log(`content-type : ${headerObj.get("content-type")}`)
        })
        .catch(reason => console.log(reason))

}