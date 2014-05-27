/*
Date: 08-04-2014
Author: Rohit Patel
Description: With this script we can create FTP server on any selected port.
If you are using default port(21) for that case you may be have to use root privileges(sudo) 
*/
var ftpd = require('./nodeftpd/ftpd.js');
var server = ftpd.createServer("127.0.0.1", "./files/").listen(2121);

// this event passes in the client socket which emits further events
// but should recommend they don't do socket operations on it
// so should probably encapsulate and hide it
server.on("client:connected", function(socket) {
    var username = null;
    console.log("client connected: " + socket.remoteAddress);
    socket.on("command:user", function(user, success, failure) {
        if (user) {
            username = user;
            success();
        } else failure();
    });

    socket.on("command:pass", function(pass, success, failure) {
        if (pass) success(username);
        else failure();
    });
});
server.debugging = 4;
server.listen(7001);

