const { Server } = require('socket.io');
const io = new Server(3000)
const server = io.of('/hub');
const Log = require('../library/logger.js');


server.on('connection', socket => {
  console.log('Starting up CAPS...' + socket.id);
  const chance = require('../chance.js');

  setInterval(async () => {
   let custOrder = {
    date: new Date(),
    payload: {
      store: 'GIZMOS',
      orderID: chance.guid(),
      customer: chance.name(),
      address: chance.address()
    }
  }

    server.emit('ORDER_RECEIVED', custOrder);
    console.log('Customer order received with orderID ',custOrder.payload.orderID);
}, 5000);
  
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
    let log = new Log('SCHEDULED FOR PICKUP', payload);
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
    let log = new Log('PACKAGE DAMAGED DURING TRANSIT - RETURNED TO VENDOR');
    console.log(log);
    server.emit('DELAYED', payload);
  })
  
  socket.on('DELAYED', (payload) => {
    let log = new Log('ORDER_DELAYED', payload);
    console.log(log);
    server.emit('IN_TRANSIT', payload)
  })
})