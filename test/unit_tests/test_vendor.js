const Vendor = artifacts.require("Vendor");
const MockERC20 = artifacts.require("MockERC20");

/*
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const { bytecode, interface } = require('../compile');

const provider = ganache.provider()
const web3 = new Web3(provider);
*/

const totalSupply = 1000

contract("MockERC20", accounts =>

    it("Owner should hold total supply", () =>

    MockERC20.deployed()
    .then(instance => instance.balanceOf.call(accounts[0]))
    .then(balance => {
        assert.equal(
            balance,
            totalSupply
        );
    })
    )
);

contract("Vendor", accounts =>

    it("deploys an accounts", () => {
        assert.ok();
    }),

    it("Price should be similar to specified tokens/ETH ratio", () =>

    Vendor.deployed()
    .then(instance => instance.getPrice.call())
    .then(currentPrice => {
        assert.equal(
            currentPrice,
            100
        );
    })
    ),

);