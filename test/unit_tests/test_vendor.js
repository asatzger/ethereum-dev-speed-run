const Vendor = artifacts.require("Vendor");
const MockERC20 = artifacts.require("MockERC20");

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