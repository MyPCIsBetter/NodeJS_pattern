/*
 *  REQUEST.js USAGE
 */

var urlOfSiteToScan = 'http://google.com';

request(urlOfSiteToScan, function (error, response, body) {
    if (!error && response.statusCode == 200) {

    }
});