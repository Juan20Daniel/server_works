const express = require('express');
const http = require('http');

class Server {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        this.server = http.createServer(this.app)
    }

    excecute() {
        this.server.listen(this.PORT, 'localhost', () => {
            console.log('SERVER RUNNING ON THE PORT: '+this.PORT);
        });
    }
}

module.exports = Server;