
//  JavaScript has comments - this is one

//  node has a module system - "http" is the name of a module

var http = require('http');

//  

var traceRequest = function(msg) {
  var now = new Date();
  console.log(now.toUTCString() + ' ' + msg);
}

var writeResponse = function(response, msg) {

  response.writeHead(200, {"Content-Type": "text/html"});

  var html = '<p>' + msg + '</p>';

  response.end(html);
}

var test = function(response) {

  response.writeHead(200, {"Content-Type": "text/html"});

  var head = '<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.1.min.js"></script>';

  var body = '<button onclick="$.get(\'fabulous\', function(s) { console.log(s); })">hello</button>';

  var html = '<html>\n';
  html += '<head>\n' + head + '\n</head>\n'
  html += '<body>\n' + body + '\n</body>\n'
  html += '</html>';

  response.end(html);  
}

var fabulous = function(response) {

  response.writeHead(200, {"Content-Type": "text/plain"});

  var text = (new Date()).toUTCString() + ' hello world';

  response.end(text);
}


var serviceImplementation = function (request, response) {

  traceRequest(request.url);

  if (request.url == '/where') {
    writeResponse(response, 'Crystal Mountain Resort');
  }
  else if (request.url == '/when') {
    writeResponse(response, '6:30AM tomorrow morning');
  }
  else if (request.url == '/test') {
    test(response);
  }
  else if (request.url == '/fabulous') {
    fabulous(response);
  }
  else {
    writeResponse(response, 'i know nothing');
  }
}

var serviceImplementationAlt = function (request, response) {

  traceRequest('ALT' + request.url);

  if (request.url == '/where') {
    writeResponse(response, '<span style="color:red">Crystal Mountain Resort</span>');
  }
  else if (request.url == '/when') {
    writeResponse(response, '6:30AM tomorrow morning');
  }
  else {
    writeResponse(response, 'i know nothing');
  }
}

server = http.createServer(serviceImplementation);
serverAlt = http.createServer(serviceImplementationAlt);

server.listen(80);
serverAlt.listen(2020);

console.log('now everyone is listening');

