var semver = require('../semver.lite.js');
var tap = require('tap');
var test = tap.test;

// Tests totes stolen/adapted from node-semver: https://github.com/isaacs/node-semver

test('\ninvalid version numbers', function(t) {
  ['1.2.3.4',
   'NOT VALID',
   1.2,
   null,
   'Infinity.NaN.Infinity',
   'v2.1.0'
  ].forEach(function(v) {
    t.notOk(semver.valid(v), v + ' is not valid');
  });
  t.end();
});

test('\nvalid version numbers', function(t) {
  ['1.0.0',
   '2.1.9',
   '1.1.1',
   '1.0.0+alpha-build1',
   '1.0.0-build1',
   '1.0.0+1-build1',
   '1.0.0-1',
   '1.0.0-rc.0',
   '1.0.0-rc',
  ].forEach(function(v) {
    t.ok(semver.valid(v), v + ' is valid');
  });
  t.end();
});

test('\nmax satisfying', function(t) {
  [[['1.2.3', '1.2.4'], '1.2', '1.2.4'],
    [['1.2.4', '1.2.3'], '1.2', '1.2.4'],
    [['1.2.3', '1.2.4', '1.2.5', '1.2.6'], '1.2', '1.2.6'],
    [['1.1.0', '1.2.0', '1.2.1', '1.3.0', '2.0.0b1', '2.0.0b2', '2.0.0b3', '2.0.0', '2.1.0'], '~2.0.0', '2.0.0'],
    [['1.2.3', '1.2.4', '1.2.5', '1.2.11'], '1', '1.2.11'],
    [['1.2.3-rc', '1.2.4-rc.1', '1.2.5-rc', '1.2.11-rc'], '1', '1.2.11-rc']
  ].forEach(function(v) {
    var versions = v[0];
    var range = v[1];
    var expect = v[2];
    var actual = semver.maxSatisfying(versions, range);
    t.equal(actual, expect);
  });
  t.end();
});

test('\nrange syntax', function(t) {
  var versions = ['1.0.0', '1.1.0', '1.1.1', '2.0.0'];
  ['1.1.x', 'v1', '1.x', '1', '1.1', '1.x.x'].forEach(function(range) {
    var satisfying = semver.maxSatisfying(versions, range);
    t.equal(satisfying, versions[2], 'range: ' + range + ' resolves to ' + satisfying);
  });

  ['x2', '=2', '2', '2.0'].forEach(function(range) {
    var satisfying = semver.maxSatisfying(versions, range);
    t.equal(satisfying, versions[3], 'range: ' + range + ' resolves to ' + satisfying);
  });
  t.end();
});

test('\ninvalid range syntax', function(t) {
  var versions = ['1.0.0', '1.1.0', '1.1.1', '2.0.0'];
  ['prod', 'x', 'x.x.x'].forEach(function(range) {
    var satisfying = semver.maxSatisfying(versions, range);
    t.notOk(satisfying, 'range: ' + range + ' should be null');
  });

  t.end();
});
