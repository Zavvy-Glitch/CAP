'use strict';

const io = require('socket.io-client');
const server = io.connect('http://localhost:3000/hub');

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

server.on('ORDER_RECEIVED', (payload) => {
  server.emit('PICKUP_REQUESTED', payload);
  console.log(`${payload.payload.store}: Order with ${payload.payload.orderID} has been PICKED UP`)
});

server.on('DELIVERY_CONFIRMED', (payload) => {
  console.log(`${payload.payload.store} delivery with orderID:${payload.payload.orderID} confirmed. Thank you!`)
})

