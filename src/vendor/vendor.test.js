'use strict'

const vendor = require('./vendor.js');
const eventPool = require('../../eventPool.js');

jest.mock('../../eventPool.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});

describe('testing vendor module', () => {
  test ('Emits IN-TRANSIT', () => {;
    vendor({payload})
    expect(eventPool.emit).toHaveBeenCalledWith('IN-TRANSIT')
  })
})