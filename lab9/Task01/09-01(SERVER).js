const http = require('http')

http.createServer((req, res) =>
{
  res.statusMessage='All good';
  res.statusCode=200;
  res.end("Answer body");
}).listen(3000)