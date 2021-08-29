const http = require('http');
let aluminum = require('./alu');
let copper = require('./cu');
let Shekel = require('./dollar');

const server = http.createServer();
server.on('request', async (req, res) => {
  const data1 = await aluminum.alu();
  const data2 = await copper.cu();
  const data3 = await Shekel.dollar();
  
  res.writeHead(200, {'Content-Type' : 'text/html'});
  res.write("Aluminum Worth : &#8362;" +data1 * data3 + " per Kilo" +'<br/>');
  res.write("Copper Worth : &#8362;" +data2 * data3 + " per Kilo"+'<br/>');
  res.write("1 Dollar = &#8362;" +data3 +"<br/>");
  res.end();
});

server.listen(3000);

