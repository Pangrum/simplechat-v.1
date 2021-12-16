const express = require('express'); // ใช้งาน module express
const app = express(); // สร้างตัวแปร app เป็น instance ของ express app
const http = require('http');
const server = http.createServer(app);  //สร้าง web server object
const { Server } = require("socket.io");  //เรียกใช้ server ของ socket.io มาใช้
const io = new Server(server); //ดึง server ของ socket.io มาใช้ และสร้างของขึ้นมาใหม่

app.get('/', (req, res) => { //จัดการเส้นทาง path
  res.sendFile(__dirname + '/index.html'); //ส่งไฟล์ index.html เข้าไปให้ client
});

io.on('connection', (socket) => { //connect ไปที่ socket
  socket.on('chat message', (msg) => { //ให้ client ดำเนินการบน server ได้
    io.emit('chat message', msg); //ส่งให้ client และผู้ส่ง
    console.log('message: ' + msg);
  });
});

server.listen(3000, () => { //ให้เซิร์ฟเวอร์ http ฟังที่พอร์ต 3000
  console.log('listening on *:3000');
});