'use strict';

// const { io } = require('socket.io-client');
// const server = io.connect('http://localhost:3000/caps');

// const vendorId = 'Gizmos'

// server.emit('join', { roomId: vendorId})

const MessageClient = require('../library/MessageClient.js');

const messageQueue = new MessageClient('orders')


messageQueue.subscribe('PICKUP_REQUESTED', (payload) => {
  setTimeout(() => {
    switch(Math.floor(Math.random() * 4)){
      case 1:
        messageQueue.publish('IN_TRANSIT', payload)
        console.log(`ORDER STATUS: Order for ${payload.payload.orderID} is currently IN TRANSIT.`)
        case 2:
          messageQueue.publish('DAMAGED', payload)
          console.log(`ORDER STATUS: Order for ${payload.payload.orderID} has been DAMAGED. PLEASE CONTACT SHIPPER.`)
          case 3:
            messageQueue.publish('DELAYED', payload)
            console.log(`ORDER STATUS: Order for ${payload.payload.orderID} has been DELAYED.`)
          }
        }, 2000)
      })
      
      messageQueue.subscribe('IN_TRANSIT', (payload) => {
        setTimeout(() => {
          messageQueue.publish('DELIVERED', payload)
          console.log(`ORDER STATUS: Order for ${payload.payload.orderID} has been DELIVERED.`)
        }, 2000)
      })