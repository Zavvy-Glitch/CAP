'use strict';

const eventPool = require('../../eventPool.js');

module.exports = (payload) => {
  console.log('PACKAGE READY FOR PICKUP!', { VENDOR: payload });
  let vendorPayload = payload
  setInterval(() => {
    eventPool.emit('IN-TRANSIT', vendorPayload)
  }, 3000)
 
}