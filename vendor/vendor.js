'use strict';

const io = require('socket.io-client');
const server = io.connect('http://localhost:3000/hub');


server.on('ORDER_RECEIVED', (payload) => {
  server.emit('PICKUP_REQUESTED', payload);
  console.log(`${payload.payload.store}: Order with ${payload.payload.orderID} has been PICKED UP`)
});

server.on('DELIVERY_CONFIRMED', (payload) => {
  console.log(`${payload.payload.store} delivery with orderID:${payload.payload.orderID} confirmed. Thank you!`)
})

