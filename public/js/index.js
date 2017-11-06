var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected to server');
});

var submit = document.getElementById('btn-submit');
var user = 'Ramon Adan';

// Send message to server
submit.addEventListener('click', function(e) {
  var input = document.getElementById('input-val');
  var text = input.value;

  console.log(input.value);
  socket.emit('createMessage', {
    from: user,
    text: text
  });

  input.value = '';
  generateMessage(text, user);
  e.preventDefault();
});

function generateMessage(text, from) {
  var container = document.getElementById('msg-container')
  var col = document.createElement('div');
  var spanMessage = document.createElement('span');
  var spanUser = document.createElement('span');
  col.className = 'col-12 m-1';
  spanUser.className = 'badge badge-light align-bottom ml-2 p-1 float-right';
  spanMessage.className = 'btn btn-light p-1 px-3 text-right float-right';
  spanUser.innerHTML = from;
  spanMessage.innerHTML = text;

  col.appendChild(spanUser);
  col.appendChild(spanMessage);
  container.appendChild(col);
}
