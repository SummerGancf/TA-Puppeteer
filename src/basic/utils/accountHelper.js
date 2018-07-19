const request = require('request');
var co = require('co');

const BASE_URL = "http://*:7789/env/xmnup/account/"
var getData = function*(method, path, param) {
    var options = {
      headers: {
        charset: 'UTF-8'
      },
      url: BASE_URL + path + "/" + param,
      method: method,
      json: true
    };

    var rep = yield new Promise(function(resolve, reject) {
      return request(options, function(err, response, body) {
        if (err) {
          reject(err);
        } else {
          resolve(body);
        }
      });
    });

    return rep;
}

async function getAccount(scenarioTag) {
  let account
  await co(function*() {
    account = yield getData('GET',"tag", scenarioTag)
  })
    return account
}

async function getAccountByUUid(uuid) {
  let account
  await co(function*() {
    account = yield getData('GET',"id", uuid)
  })
  return account
}

async function lockAccount(uuid) {
  let res
  await co(function*() {
    res = yield getData('PUT',"occupy", uuid)
  })
  return res
}

async function recycleAccount(uuid) {
  let res
  await co(function*() {
    res = yield getData('PUT',"recycle", uuid)
  })
  return res
}


module.exports = {
  getAccount:getAccount,
  getAccountByUUid:getAccountByUUid,
  lockAccount:lockAccount,
  recycleAccount:recycleAccount
}