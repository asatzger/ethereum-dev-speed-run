var ExampleExternalContract = artifacts.require("ExampleExternalContract");
var Staking = artifacts.require("Staking");

module.exports = function(deployer) {
  deployer.deploy(ExampleExternalContract)
  .then(() => ExampleExternalContract.deployed())
  .then(_instance => _instance.address)
  .then(_address => deployer.deploy(Staking, _address))
};
