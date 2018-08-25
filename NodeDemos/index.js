// Demo of Nodejs web Service
// JM

// need to receive and send http protocol interactions
var http = require('http'); // bundled with Node
// need url to decipher the user request
var url = require('url'); // bundled function
// similar to body-parser with Express
var decoder = require('string_decoder').StringDecoder; // bundled with Node
var parser = new decoder('utf-8'); // creates a new instance of decoder

// create server object
// req is url and other data
var server = http.createServer((req, res) => {
    // true states to use a query string library
    var parseUrlObject = url.parse(req.url, true);
    // // NOTE:great way to see exactly what is going through
    // also keep in mind that localhost will come back null, same with port
    console.log(parseUrlObject);
    // gets data for the pathname
    var path = parseUrlObject.pathname;
    // replaces all forward and trailing forward slashes(/)
    var cleanPath = path.replace(/^\/+|\/+$/g, '');
    // ensures that user request is lowercase for better parsing
    var method = req.method.toLowerCase();
    var queryParamsObj = parseUrlObject.query;
    var headers = req.headers;

    // get the data sent by user
    let buffer = '';
    // NOTE: it appears you may not be able to use arrow functions; when I originally wrote, it did not work. When I 
        // changed BACK to regular functions it worked fine.
    req.on('data', function(d){
        buffer += parser.write(d); // adds data fragments as they are sent
    }); 
    req.on('end', function(){
        buffer += parser.end();
        // Report the server response
        var now = new Date();
        console.log(`Server responded at ${now.toUTCString()}`);
        // end the request
        res.write(`\nReceived buffer of length ${buffer.length}\n`);
        // res.send does not exist with Node; .send is an EXPRESS method
        res.write(`Request headers are ${JSON.stringify(headers)}\n`);
        res.end(`Request received on path: ${cleanPath} with method ${method} and query params obj:` 
            + JSON.stringify(queryParamsObj, null, 4) + `\n`);
    });  
});

// Determing user intent
// parse the users URL
// get the path in the URL
// send a Response
// send an appropriate message to node console



server.listen(3000, () => {
    console.log('Listening on 3000');
});