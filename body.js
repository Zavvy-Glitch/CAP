'use strict';

const eventPool = require('./eventPool.js')
const chance = require('./chance.js')

const vendorHandle = require('./src/vendor/vendor.js');
const driverHandle = require('./src/driver/driver.js');
const deliveryHandle = require('./src/delivery/delivery.js');

eventPool.on('PICK-UP', vendorHandle);
eventPool.on('IN-TRANSIT', driverHandle);
eventPool.on('DELIVERED', deliveryHandle);


function payloadCreation () {
  const payload =  {
      time: new Date,
      store: 'GIZMOS',
      orderID: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
      }
      return payload;
  }

setInterval(() => {
  let payload = payloadCreation();
  eventPool.emit('PICK-UP', { PAYLOAD: payload })
}, 3000);