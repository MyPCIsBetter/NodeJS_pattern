//https://github.com/jmg/node-simple-chat

var server = http.createServer(app); //app is "var app = express();" when using express
var io = require('socket.io').listen(server);
io.set('log level', 1);

/*
 * SAMPLE USAGE FROM PREVIOUS PROJECTS
 */

/*
************
in app.js
************
*/
io.sockets.on('connection', function (socket) {
    console.log("connected");
    socket.on('newQuery', function (data) {
        console.log("Got Data");
        socket.emit('alreadyInDB', {
            name: "ROBOSUPER",
            url: "robosuper.blogspot.com",
            info: "NAJLEPSIEJSZY BLOG SWIATA"
        });

        socket.emit('realTimeSearching', {
            name: "Example",
            url: "example.com",
            info: "Info"
        });

        setTimeout(function(){
            socket.emit('realTimeSearching', {
                name: "A GUNWO TA TWOJA STRONA",
                url: "jakiesporno.com",
                info: "Panie, tescik sie powiodl"
            });
        },3000);
    });
});

/*
************
in HTML file
************
*/

var realTimeServerConnection = {
    socket: null,

    initialize: function (socketURL) {
        this.socket = io.connect(socketURL);

        //Process any incoming messages
        this.socket.on('alreadyInDB', this.add.alreadyInDB);
        this.socket.on('realTimeSearching', this.add.realTimeSearching);
    },

    send: function () {
        this.socket.emit('newQuery', {
            keyWords: $('#keywords').val().split(" "),
            msg: $('#startsite').val()
        });

        //$('#keywords').val('');

        return false;
    },

    add:  {
        alreadyInDB: function (data) {
            $("#alreadyInDB").
                append("<a class='searchSite' id='siteName'>"+data.name+"</a><br>").
                append("<span class='searchSite' id='siteAdress'>" + data.url + "</span><br>").
                append("<span class='searchSite' id='siteInfo'>" + data.info + "</span><br>");
        },
        realTimeSearching: function (data) {
            $("#progress").
                append("<a class='searchSite' id='siteName'>" + data.name + "</a><br>").
                append("<span class='searchSite' id='siteAdress'>" + data.url + "</span><br>").
                append("<span class='searchSite' id='siteInfo'>" + data.info + "</span><br>");
        }
    }
};

var rtsc = realTimeServerConnection; //maly skrocik ;)

rtsc.initialize("http://localhost:1337/");