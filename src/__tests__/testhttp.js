const account = require('../basic/utils/accountHelper.js')
var co = require('co');
describe(
  '/ (Account)',
  () => {
    let res
    it('test', async () => {
        await co(function*() {
        // res = yield account.getAccount("rc_uk_sfentity")
        // return retvalue
      });
      res = await account.getAccount("rc_uk_sfentity")
      console.log(res[0]['uuid']);
      await account.recycleAccount(res[0]['uuid'])
      let a1 = await account.getAccountByUUid(res[0]['uuid'])
      console.log("account not null:")
      console.log(a1)

      await account.lockAccount(res[0]['uuid'])
      let a2 = await account.getAccountByUUid(res[0]['uuid'])
      console.log("account is null:")
      console.log(a2)
    })
  },
  500
)