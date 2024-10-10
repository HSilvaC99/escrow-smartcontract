import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";

const EscrowModule = buildModule("EscrowModule", (m) => {

  const payer = m.getAccount(0);
  const payee = m.getAccount(1);
  const agent = m.getAccount(2);
  const amount = ethers.parseEther("1.0");

  const escrow = m.contract("Escrow", [payee, agent], {
    from: payer,
    value: amount,
  });

  return { escrow };
});

export default EscrowModule;
