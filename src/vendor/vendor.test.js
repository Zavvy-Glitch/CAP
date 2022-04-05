'use strict'

const vendor = require('./vendor.js');
const eventPool = require('../../eventPool.js');

const payload =  {
  time: new Date,
  store: 'company',
  orderID: 'orderID',
  customer: 'customer',
  address: 'address',
  }


jest.mock('../../eventPool.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});

describe('testing vendor module', () => {
  test ('Emits IN-TRANSIT', () => {;
    vendor(payload)
    expect(eventPool.emit).toHaveBeenCalledWith('IN-TRANSIT', payload)
  })
})