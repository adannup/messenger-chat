const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

const {generateMessage} = require('./utils/messages.js');

const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const bootstrapPath = path.join(__dirname, '../node_modules/bootstrap/dist/');
const bootstrap = {
  css: 'css',
  js: 'js'
};

app.use(express.static(publicPath));
app.use('/style/css', express.static(bootstrapPath + bootstrap.css));
app.use('/bootstrap/js', express.static(bootstrapPath + bootstrap.js));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Message broadcast, user joined
  socket.broadcast.emit('userJoined', 'An user has been joined');

  socket.on('createMessage', (message, receivedCallback) => {
    console.log(message);
    receivedCallback(generateMessage(message));

    socket.broadcast.emit('newMessage', generateMessage(message));
  });
});

http.listen(PORT, () => {
  console.log(`Server up on port: ${PORT}`);
});
