'use strict';

const eventPool = require('../../eventPool.js');

module.exports = (payload) => {
  console.log('PACKAGE PICKED UP!', { DRIVER: payload });
  setInterval(() => {
    eventPool.emit('DELIVERED', payload)
  }, 3000)
}