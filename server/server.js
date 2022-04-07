const { Server } = require('socket.io');
const PORT = process.env.PORT || 3000;
const Queue = require('../library/queue.js')
const Log = require('../library/logger.js')

const io = new Server(PORT)
const messageQueue = new Queue();
const server = io.of('/caps');



server.on('connection', socket => {
  console.log('Starting up CAPS...' + socket.id);

  socket.on('join', ({ queueId }) => {
    socket.join(queueId);
    socket.emit('join', queueId);
  })
  
  socket.on('ORDER_RECEIVED', (payload) => {
    let currentQueue = messageQueue.read(payload.queueId);
    if(!currentQueue){
      let queueKey = messageQueue.store(payload.queueId, new Queue());
      currentQueue = messageQueue.read(queueKey);
    }
    currentQueue.store(payload.messageId, payload)
    
    let log = new Log('ORDER-RECEIVED', payload);

      let message = currentQueue.remove(payload.messageId)
    console.log(log);
    server.emit('ORDER_RECEIVED', message);
  });
  
  socket.on('PICKUP_REQUESTED', (payload) => {
    let currentQueue = messageQueue.read(payload.queueId);
    if(!currentQueue) {
      throw new Error('No messages in the Queue');
    }
   
    let log = new Log('SCHEDULED FOR PICKUP', payload);
    console.log(log);
    server.emit('PICKUP_REQUESTED', payload);
  });
  
  socket.on('IN_TRANSIT', (payload) => {
  console.log(payload)
    let currentQueue = messageQueue.read(payload.queueId);
    if(!currentQueue) {
      throw new Error('No messages in the Queue');
    }
    let log = new Log('IN-TRANSIT', payload);
    console.log(log);
    server.emit('IN_TRANSIT', payload);
  });
  
  socket.on('DAMAGED', (payload) => {
    let currentQueue = messageQueue.read(payload.queueId);
    if(!currentQueue) {
      throw new Error('No messages in the Queue');
    }
    let log = new Log('PACKAGE DAMAGED DURING TRANSIT - RETURNED TO VENDOR');
    console.log(log);
    server.emit('DELAYED', payload);
  })
  
  socket.on('DELAYED', (payload) => {
    let currentQueue = messageQueue.read(payload.queueId);
    if(!currentQueue) {
      throw new Error('No messages in the Queue');
    }
    let log = new Log('ORDER_DELAYED', payload);
    console.log(log);
    server.emit('IN_TRANSIT', payload)
  })

  socket.on('DELIVERED', (payload) => {
    let currentQueue = messageQueue.read(payload.queueId);
    if(!currentQueue) {
      throw new Error('No messages in the Queue');
    }
    let log = new Log('DELIVERED', payload);
    console.log(log);
    server.emit('DELIVERY_CONFIRMED', payload)
  })
})
  