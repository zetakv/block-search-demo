// var fetch = require('node-fetch');
// var expect = require('chai').expect;
// import fetch from 'node-fetch';
// import { expect } from 'chai';

describe('测试api接口是否正常', function () {
  const hash = '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa';
  it('发出fetch请求', function() {
    return Promise.all([
      import('node-fetch'),
      import('chai')
    ]).then(([a, b]) => {
      const fetch = a.default;
      const { expect } = b.default;
      return fetch(`https://blockchain.info/rawblock/${hash}`)
        .then(resp => resp.json())
        .then(resp => {
          expect(resp).to.be.an('object');
          expect(resp.hash).to.be.equal(hash);
        });
    });
    
 }).timeout(10 * 1000);
});