var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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
  fs.appendFile(exports.paths.list, url, 'utf8', (err) => {
    if (err) { console.log('ERROR WITH .addUrlToList!'); }
    
    if (callback) {
      callback();
    }
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, (err, files) => {
    console.log('this are .isUrlArchived files', files);
    console.log('this is the url', url);
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

  

};




// exports.readListOfUrls = function(callback) {

// //fs.readFile('site.txt', 'utf8', function(err,data){

//==>callback used is isUrlInList(url = user input, callback = isUrlArchived){

//function() {
//  if( url is in list) { call is URL archived}
    
//  if( url is not in list) {call addUrlToList
    //addUrlToList(url = user input, callback = serveAssets(res, 'location of loading.html', callback to res.writehead?))}
//}
//})
    
    
  
// };

// exports.isUrlInList = function(url, callback) {
  //readfile
// };

// exports.addUrlToList = function(url, callback) {
//   callback(url);
// };

// exports.isUrlArchived = function(url = user input, callback = anonymous function that calls addUrlToList or serveAssets){
 // 
//function() {
//  if (isUrlArchived === true) { call serveAssests(res, 'location of www.___.com folder', callback?);}
//  else if (isUrlArchied === false) {serveAssets(res, 'location of loading.html', callback to res.writehead?))} 
// };

// exports.downloadUrls = function(urls) {
  //looks into the sites.txt
  //if there is a new site in the stored data,
  //then go to that website by sending out a GET request and 
  //take back the response and parse the data, write the html over to
  //a file. 
  
// };
