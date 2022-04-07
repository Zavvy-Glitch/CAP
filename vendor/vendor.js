'use strict';

const MessageClient = require('../library/MessageClient.js')
const chance = require('../library/chance.js');

const messageQueue = new MessageClient('pickup')

setInterval(async () => {
 let custOrder = {
  payload: {
    store: 'GIZMOS',
    orderID: chance.guid(),
    customer: chance.name(),
    address: chance.address()
  }
}

  messageQueue.publish('ORDER_RECEIVED', custOrder);
  console.log('Customer order received with orderID ',custOrder.payload.orderID);
}, 20000);


messageQueue.subscribe('ORDER_RECEIVED', (payload) => {
  messageQueue.publish('PICKUP_REQUESTED', payload);
  console.log(`${payload.payload.store}: Order with ${payload.payload.orderID} has been PICKED UP`)
});

messageQueue.subscribe('DELIVERY_CONFIRMED', (payload) => {
  console.log(`${payload.payload.store} delivery with orderID:${payload.payload.orderID} confirmed. Thank you!`)
})

