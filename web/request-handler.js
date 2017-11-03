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
    } else {
      pathName = req.url.slice(1);
      archive.isUrlInList(pathName, (trueOrFalse) => {
        console.log('WE ARE CHECKING TO SEE IF URL IS IN LIST');
        console.log('True or False: URL is in list: ', trueOrFalse);
        if (trueOrFalse) {
          // what to do if true
          archive.isUrlArchived(pathName, (trueOrFalse) => {
            console.log('WE ARE CHECKING TO SEE IF URL IS ARCHIVED');
            if (trueOrFalse) {
              //serve up archived data
              console.log('WE ARE TRIGGERING THE PROPER THING! IT REGISTERS THAT FILE EXISTS');
              httpHelper.serveAssets(res, archive.paths.archivedSites.concat(`/${pathName}`));
            } else {
              console.log('isNOTARCHIVED =' + archive.paths.siteAssets.concat('/loading.html'));

            }
          });
        } else {
          // what to do if false
          archive.addUrlToList(pathName, () => {
            console.log('addUrlToList =' + archive.paths.siteAssets.concat('/loading.html'));
          });
        }
      });
    }
  },


  'POST': (req, res) => {
    var body = '';
    
    req.on('data', function(data) {
      body += data;
    });
    
    req.on('end', function() {
      var post = qs.parse(body);
      console.log('------------------------------------------------', post.url);
      archive.addUrlToList(post.url, function() {});
    });
    
    res.writeHead(201, {'Content-Type': 'text/html'});
    res.end('we posted');
  }
};

exports.handleRequest = function (req, res) {
  
  actions[req.method](req, res);

  
  
  // res.end(archive.paths.list);
};

