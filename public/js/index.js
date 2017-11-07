var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected to server');
});

socket.on('newMessage', function(message) {
  receivedMessage(message);
});

socket.on('userJoined', function(message) {
  userJoinedAlert(message);
});

var submit = document.getElementById('btn-submit');
var user = 'Ramon Adan';

// Send message to server
submit.addEventListener('click', function(e) {
  var input = document.getElementById('input-val');
  var text = input.value;

  socket.emit('createMessage', {
    from: user,
    text: text
  }, function(data) {
    data ? senderMessage(data) : console.log('Error');
  });

  input.value = '';
  // generateMessage(text, user);
  e.preventDefault();
});

function senderMessage(data) {
  var container = document.getElementById('msg-container');
  var col = document.createElement('div');
  var divFloat = document.createElement('div');
  var spanMessage = document.createElement('span');
  var smallDate = document.createElement('small');
  var spanUser = document.createElement('span');
  col.className = 'col-12 m-1';
  divFloat.className = 'float-right';
  spanUser.className = 'badge badge-light align-bottom ml-2 p-1';
  spanMessage.className = 'btn btn-light p-1 px-3 text-right';
  smallDate.className = 'pl-5';
  spanUser.innerHTML = data.from;
  spanMessage.innerHTML = data.text;
  smallDate.innerHTML = formatedHour(data.date);

  spanMessage.appendChild(smallDate);
  divFloat.appendChild(spanMessage);
  divFloat.appendChild(spanUser);
  col.appendChild(divFloat);
  container.appendChild(col);
}

function receivedMessage(data) {
  var container = document.getElementById('msg-container');
  var col = document.createElement('div');
  var divFloat = document.createElement('div');
  var spanMessage = document.createElement('span');
  var smallDate = document.createElement('small');
  var spanUser = document.createElement('span');
  col.className = 'col-12 m-1';
  divFloat.className = 'float-left';
  spanUser.className = 'badge badge-light align-bottom mr-2 p-1';
  spanMessage.className = 'btn btn-primary p-1 px-3 text-left';
  smallDate.className = 'pl-5';
  spanUser.innerHTML = data.from;
  spanMessage.innerHTML = data.text;
  smallDate.innerHTML = formatedHour(data.date);

  spanMessage.appendChild(smallDate);
  divFloat.appendChild(spanUser);
  divFloat.appendChild(spanMessage);
  col.appendChild(divFloat);
  container.appendChild(col);
}

function userJoinedAlert(text) {
  var body = document.getElementsByTagName("body").item(0);
  var div = document.createElement('div');
  div.className = 'alert alert-info fixed-top w-50 mt-3';
  div.style.margin = '0 auto';
  setTimeout(function(){
    div.style.display = 'none';
  }, 5000);
  div.innerHTML = text;
  body.appendChild(div);
}

function formatedHour(timeout) {
  var date = new Date(timeout);
  var hrs = date.getHours();
  var min = date.getMinutes();

  return `${hrs}:${min}`;
}


// User is typing
var timeout;

var inputTeclado = document.getElementById('input-val');
inputTeclado.addEventListener('keypress', function() {
  socket.emit('typing', user);
  clearTimeout(timeout);
  timeout = setTimeout(function() {
    socket.emit("typing", false);
  }, 2000);
});

var typingDiv = document.getElementById('typing__element');
typingDiv.style.display = 'none';

socket.on('userTyping', function(data) {
  if(data) {
    typingDiv.style.display = 'block';
    typingDiv.innerHTML = data + ' typing ...';
    console.log('Usuario escribiendo');
  }else{
    typingDiv.style.display = 'none';
    console.log('Fin');
  }
});
