const io = require('socket.io-client');
const server = io.connect('http://localhost:3000/hub');

server.on('PICKUP_REQUESTED', (payload) => {
  setTimeout(() => {
    switch(Math.floor(Math.random() * 4)){
      case 1:
        server.emit('IN_TRANSIT', payload)
        console.log(`ORDER STATUS: Order for ${payload.payload.orderID} is currently IN TRANSIT.`)
      case 2:
        server.emit('DAMAGED', payload)
        console.log(`ORDER STATUS: Order for ${payload.payload.orderID} has been damaged. Please Contact Shipper.`)
      case 3:
        server.emit('DELAYED', payload)
        console.log(`ORDER STATUS: Order for ${payload.payload.orderID} has been delayed.`)
    }
  }, 2000)
})

server.on('IN_TRANSIT', (payload) => {
  setTimeout(() => {
    server.emit('DELIVERED', payload)
    console.log(`ORDER STATUS: Order for ${payload.payload.orderID} has been DELIVERED.`)
  }, 2000)
})