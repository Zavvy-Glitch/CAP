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
    vendor('test');
    
    expect(eventPool.emit).toHaveBeenCalledWith('IN-TRANSIT', 
    expect.objectContaining({store: 'test'}),
    )
  })
})