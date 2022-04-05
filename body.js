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
  let company = chance.company();
  let orderID = chance.guid();
  let customer =  chance.name();
  let address = chance.address();
  
  const payload =  {
      time: new Date,
      store: company,
      orderID: orderID,
      customer: customer,
      address: address,
      }
      return payload;
  }

setInterval(() => {
  let payload = payloadCreation();
  eventPool.emit('PICK-UP', { payload })
}, 3000);