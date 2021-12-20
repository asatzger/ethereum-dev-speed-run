var MockERC20 = artifacts.require("MockERC20");
var Vendor = artifacts.require("Vendor");

const _totalSupply = 1000

module.exports = function(deployer) {
  deployer.deploy(MockERC20, _totalSupply)
  .then(() => MockERC20.deployed())
  .then(_instance => _instance.address)
  .then(_address => deployer.deploy(Vendor, _address))
};