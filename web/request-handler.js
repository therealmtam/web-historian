var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var qs = require('querystring');
var httpHelper = require('./http-helpers');
// require more modules/folders here!


const actions = {
  'GET': (req, res) => {
    var pathName = req.url;
    if (pathName === '/' || pathName === '/styles.css') {
      httpHelper.serveAssets(res, archive.paths.siteAssets.concat('/index.html'));      
    }
  },
  'POST': (req, res) => {
    var body = '';
    
    req.on('data', function(data) {
      body += data;
    });
    
    req.on('end', function() {
      // var post = qs.parse(body);
      // console.log(post.url);
      // archive.addUrlToList(post.url, function() {
      //   fs.appendFile()
      // })
    });
    
    res.writeHead(201, {'Content-Type': 'text/html'});
    res.end('we posted');
  }
};

exports.handleRequest = function (req, res) {
  
  actions[req.method](req, res);

  
  
  // res.end(archive.paths.list);
};

