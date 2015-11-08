'use strict';

describe('hostNameFromUrl', function() {
  let pluralize = require('../../src/js/util/pluralize');

  it('pluralize correctly', function() {
    expect(pluralize(1, 'bid')).to.equal('1 bid');
    expect(pluralize(21, 'bid')).to.equal('21 bids');
    expect(pluralize(10, 'turkey')).to.equal('10 turkeys');
  });
});
