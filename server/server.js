const io = require('socket.io')(3000);
const server = io.of('/hub');
const Log = require('../library/logger.js');

server.on('connection', socket => {
  console.log('Starting up CAPS...' + socket.id);
  

  socket.on('ORDER_RECEIVED', (payload) => {
    let log = new Log('ORDER-RECEIVED', payload);
    console.log(log);
    server.emit('ORDER_RECEIVED', payload);
  });

  socket.on('PICKUP', payload => {
    new Log('PICKUP', payload);
    server.emit('PICKUP', payload);
  });
  
  socket.on('PICKUP_REQUESTED', (payload) => {
    let log = new Log('Scheduled for Pickup', payload);
    console.log(log);
    server.emit('PICKUP_REQUESTED', payload)
  });
  
  socket.on('IN_TRANSIT', (payload) => {
    let log = new Log('IN-TRANSIT', payload);
    console.log(log);
    server.emit('IN_TRANSIT', payload);
  });
  
  socket.on('DELIVERED', (payload) => {
    let log = new Log('DELIVERED', payload);
    console.log(log);
    server.emit('DELIVERY_CONFIRMED', payload);
  })
  
  socket.on('DAMAGED', (payload) => {
    let log = new Log('Package DAMAGED during transit - RETURNED to vendor');
    console.log(log);
    server.emit('DELAYED', payload);
  })
  
  socket.on('DELAYED', (payload) => {
    let log = new Log('ORDER_DELAYED', payload);
    console.log(log);
    server.emit('IN_TRANSIT', payload)
  })
})