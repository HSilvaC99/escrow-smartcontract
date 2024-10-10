const { net } = require("web3");

const Escrow = artifacts.require("Escrow");

module.exports = async function (deployer, network, accounts) {
  const payee = accounts[1];
  const agent = accounts[2];

  const amount = web3.utils.toWei("1", "ether");

  await deployer.deploy(Escrow, payee, agent, {
    from: accounts[0],
    value: amount,
    network: network,
  });
};
