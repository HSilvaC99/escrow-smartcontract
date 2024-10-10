import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";

const EscrowModule = buildModule("EscrowModule", (m) => {

  const from = m.getAccount(0);
  const value = ethers.parseUnits("1.0", "wei");

  const payee = m.getAccount(1);
  const agent = m.getAccount(2);

  console.log(payee, agent);

  const escrow = m.contract("Escrow", [payee, agent], {
    from,
    value,
  });

  return { escrow };
});

export default EscrowModule;
