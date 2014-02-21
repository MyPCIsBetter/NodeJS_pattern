/*
* ALL PAGES OF SITE HERE
*/

exports.pages = {
    "index": function(req, res){
        res.render('zzStarter', { sometext: 'Express' });
    }
}