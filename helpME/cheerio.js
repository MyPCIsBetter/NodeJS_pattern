//https://github.com/MatthewMueller/cheerio

/*
 *  SAMPLE USAGE
 */

var cheerio = require('cheerio');
var $ = cheerio.load(body); //body = some html

$('script').remove(); //deleting all <script> tags (just like in jQuery)
var finalbody = $("body").text(); //get text of <body>