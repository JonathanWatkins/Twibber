const ConvertLib = artifacts.require("ConvertLib");
const Twibber = artifacts.require("Twibber");

module.exports = function(deployer) {
  //deployer.deploy(ConvertLib);
  //deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(Twibber);
};
