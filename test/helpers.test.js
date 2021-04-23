const assert = require('chai').assert;
const helpers = require('../helpers');

describe('Helpers', () => {
  it('should return medians', () => {
    assert.deepEqual(helpers.getMedian(10), [3,5]);
    assert.deepEqual(helpers.getMedian(18), [7]);
  });
});