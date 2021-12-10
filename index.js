const express = require ("express");
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));
const port = 3001;

// när vi startar  o loggar in i localhost:3001 , då kommer vi till den sidan
app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/socket.html");
    
});   

// hanterar POST-förfrågningar
// OBS - behövs för att läsa data som skickas med POST
app.use(express.urlencoded({extended: true}));

server.listen(port , () => console.log("listening on port: " + port));
io.on('connection', (socket) => {
        console.log('a user connected');
        let tid = new Date().toISOString().substr(11, 8);   // aktuellt klockslag i formatet hh:mm:ss

        socket.broadcast.emit("user-connected", `(${tid}) userId: ${socket.id}: Online!`);

        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
            socket.broadcast.emit("chat message", `(${tid}) userId: ${socket.id}: ${msg}`);
          });
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
  });
