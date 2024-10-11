import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer } from "ethers";
import { Escrow, Escrow__factory } from "../typechain-types";


describe("Escrow", () => {
  let escrowFactory: Escrow__factory;
  let escrow: Escrow;
  let payer: Signer;
  let payee: Signer;
  let agent: Signer;
  const amount = ethers.parseEther("1");

  beforeEach (async () => {
    [payer, payee, agent] = await ethers.getSigners();
    escrowFactory = await ethers.getContractFactory("Escrow");

    escrow = await escrowFactory.deploy(
      await payee.getAddress(),
      await agent.getAddress(),
      {
        from: await payer.getAddress(), 
        value: amount
      }
    );

    await escrow.waitForDeployment();
  });

  //
  it("Should deploy the Escrow contract", async () => {
    expect(await escrow.payer()).to.equal(await payer.getAddress());
    expect(await escrow.payee()).to.equal(await payee.getAddress());
    expect(await escrow.escrowAgent()).to.equal(await agent.getAddress());
    expect(await escrow.amount()).to.equal(amount);
    expect(await escrow.currentState()).to.equal(0); // AWAITING_RELEASE
  });

  it("Should emit 'FundsDeposited' event at deploying", async () => {
    const newEscrowInstance = expect(
      await escrowFactory.deploy(
        await payee.getAddress(),
        await agent.getAddress(),
        {
          from: await payer.getAddress(),
          value: amount
        }
      )
    );
    expect(await newEscrowInstance).to.emit(await newEscrowInstance, "FundsDeposited").withArgs(amount);
  });

  it("Only agent can release funds", async () => {
    expect(await escrow.connect(agent).releaseFunds())
      .to.emit(await escrow, "FundsReleased").withArgs(amount);
  });

  it("Only agent can refund funds", async () => {
    expect(await escrow.connect(agent).refund())
      .to.emit(await escrow, "RefundIssued").withArgs(amount);
  });

  it("Should emit 'FundsReleased' event when funds are released", async () => {
    expect(await escrow.connect(agent).releaseFunds());
    expect(await escrow.currentState()).to.equal(1); // COMPLETE
  });

  it("Should emit 'RefundIssued' event when funds are refunded", async () => {
    expect(await escrow.connect(agent).refund());
    expect(await escrow.currentState()).to.equal(2); // REFUNDED
  });

  it("Should transfer funds to payee when funds are released", async () => {
    const payeeInitialBalance = await ethers.provider.getBalance(await payee.getAddress());

    const tx = await escrow.connect(agent).releaseFunds();
    await tx.wait();

    const payeeFinalBalance = await ethers.provider.getBalance(await payee.getAddress());
    expect(payeeFinalBalance).to.equal(payeeInitialBalance + amount);
  });

  it("Should refund funds to payer when funds are refunded", async () => {
    const payerInitialBalance = await ethers.provider.getBalance(await payer.getAddress());

    const tx = await escrow.connect(agent).refund();
    await tx.wait();

    const payerFinalBalance = await ethers.provider.getBalance(await payer.getAddress());
    expect(payerFinalBalance).to.equal(payerInitialBalance + amount);
  });

  it("Should not allow to release funds if not in AWAITING_RELEASE state", async () => {
    await escrow.connect(agent).releaseFunds();
    expect(escrow.connect(agent).releaseFunds()).to.be.revertedWith("Invalid state.");
  });

  it("Should not allow to refund funds if not in AWAITING_RELEASE state", async () => {
    await escrow.connect(agent).refund();
    expect(escrow.connect(agent).refund()).to.be.revertedWith("Invalid state.");
  });
});