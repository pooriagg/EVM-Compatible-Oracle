const oracle = artifacts.require("Oracle");

module.exports = async (deployer) => {
    deployer.deploy(oracle);
};