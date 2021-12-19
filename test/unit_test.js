// Import required packages
const truffleAssert = require('truffle-assertions');
const Chance = require('chance');
const toBN = web3.utils.toBN;  // big number conversion

// Import smart contract to be tested 
const Staking = artifacts.require("Staking"); // deployed smart contract

// Identify account, timestamp etc
const _deploy_contract = require("../migrations/2_deploy_contract");
const chance = new Chance();
const admin = chance.pickone(accounts);
const timestamp = chance.timestamp();

let actualBalance = await web3.eth.getBalance(accounts[1]);
let expectedBalance = await web3.eth.getBalance(accounts[1]);
assert.deepEqual(actualBalance, expectedBalance);

/*
contract("Staking", accounts => {
    it("should have more money", () => {
        return Staking.deployed()
            .then(instance => {
                let actualBalance = await web3.eth.getBalance(accounts[1]);
                return actualBalance;
            })
            .then(balance_one => {
                let expectedBalance = await web3.eth.getBalance(accounts[1]);
                return expectedBalance;
            })

    })
})

contract("Staking", accounts => {
    it("should allow to stake money in function", () => {
        return Staking.deployed()
            .then(instance => {
                let contract = instance;
                let actualBalance = await web3.eth.getBalance(accounts[1]);
                let expectedBalance = web3.toBigNumber(web3.toWei(1, 'ether'))
                return contract.getBalance.call(accounts[0]);
            })

    }
      Staking.deployed()
        .then()
        )
})
let expectedBalance = web3.toBigNumber(web3.toWei(3, 'ether'));
let actualBalance = await web3.eth.getBalance(accounts[1]);

assert.deepEqual(actualBalance, expectedBalance, "Balance incorrect!");
*/
/*
contract("Staking", accounts => {
  it("should put 10000 MetaCoin in the first account", () =>
    Staking.deployed()
      .then( => instance.getBalance.call(accounts[0]))
      .then(balance => {
        assert.equal(
          balance.valueOf(),
          0,
          "10000 wasn't in the first account"
        );
      }));
});
*/

/*
  it("should call a function that depends on a linked library", () => {
    let meta;
    let metaCoinBalance;
    let metaCoinEthBalance;

    return MetaCoin.deployed()
      .then(instance => {
        meta = instance;
        return meta.getBalance.call(accounts[0]);
      })
      .then(outCoinBalance => {
        metaCoinBalance = outCoinBalance.toNumber();
        return meta.getBalanceInEth.call(accounts[0]);
      })
      .then(outCoinBalanceEth => {
        metaCoinEthBalance = outCoinBalanceEth.toNumber();
      })
      .then(() => {
        assert.equal(
          metaCoinEthBalance,
          2 * metaCoinBalance,
          "Library function returned unexpected function, linkage may be broken"
        );
      });
  });

  it("should send coin correctly", () => {
    let meta;

    // Get initial balances of first and second account.
    const account_one = accounts[0];
    const account_two = accounts[1];

    let account_one_starting_balance;
    let account_two_starting_balance;
    let account_one_ending_balance;
    let account_two_ending_balance;

    const amount = 10;

    return MetaCoin.deployed()
      .then(instance => {
        meta = instance;
        return meta.getBalance.call(account_one);
      })
      .then(balance => {
        account_one_starting_balance = balance.toNumber();
        return meta.getBalance.call(account_two);
      })
      .then(balance => {
        account_two_starting_balance = balance.toNumber();
        return meta.sendCoin(account_two, amount, { from: account_one });
      })
      .then(() => meta.getBalance.call(account_one))
      .then(balance => {
        account_one_ending_balance = balance.toNumber();
        return meta.getBalance.call(account_two);
      })
      .then(balance => {
        account_two_ending_balance = balance.toNumber();

        assert.equal(
          account_one_ending_balance,
          account_one_starting_balance - amount,
          "Amount wasn't correctly taken from the sender"
        );
        assert.equal(
          account_two_ending_balance,
          account_two_starting_balance + amount,
          "Amount wasn't correctly sent to the receiver"
        );
      });
  });
});
*/