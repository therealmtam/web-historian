var fs = require('fs');
var path = require('path');
var _ = require('underscore');
const request = require('request');


/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),          
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
  
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    if (err) {
      console.log('ERROR: readListOfUrls FAILED!', err);
    } else {

      let result = data.split('\n');
      
      if (callback) {
        callback(result);
      }
    }
    
  });
};

exports.isUrlInList = function(url, callback) {
  
  exports.readListOfUrls(function(results) {
    var count = results.reduce(function(acc, result) {
      if (url === result) {
        return ++acc;
      } else {
        return acc;
      }
    }, 0);
    
    if (count && callback) {
      callback(true); 
    } else if (callback) {
      callback(false);
    }
  }); 
  
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(this.paths.list, url, 'utf8', (err) => {
    if (err) { 
      console.log('ERROR WITH .addUrlToList!'); 
    }
    callback();
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, (err, files) => {
    var presence = files.reduce((acc, website) => {
      if (url === website) {
        return true;
      } else {
        return acc;
      }
    }, false);
    
    if (callback) {
      callback(presence);
    }
  });
};

exports.downloadUrls = function(urls) {
    // loop through each ULR in the urls array
  urls.forEach(url => {
    request('http://' + url, null, (err, response, body) => {
      if (err) {
        console.log('ERROR WITH WEBSITE REQUEST');
      } else {
        fs.writeFile(exports.paths.archivedSites + `/${url}`, body, (err) => {
          if (err) {
            console.log('ERROR IN DOWNLOADIG NEW URLS', err);
          }
        });
      }
    });
  });

  return;
};
