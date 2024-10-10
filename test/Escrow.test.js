// Importar el contrato compilado previamente.
const Escrow = artifacts.require("Escrow");

// Definir la función de pruebas utilizando 'Mocha' y 'Chai'. contract() es una función de 'Mocha' que define una suite de pruebas. Es similar a describe() en 'Jest', pero también inicializa las cuentas proporcionadas por 'Truffle'.
contract("Escrow", (accounts) => {
  const payer = accounts[0];
  const payee = accounts[1];
  const agent = accounts[2];
  const amount = web3.utils.toWei("1", "ether");

  // Primera prueba: el contrato se despliega e inicializa correctamente.
  it("Should deploy smart contract properly", async () => {
    const escrowInstance = await Escrow.new(payee, agent, {
      from: payer,
      value: amount,
    });

    const contractPayer = await escrowInstance.payer();
    const contractPayee = await escrowInstance.payee();
    const contractAgent = await escrowInstance.escrowAgent();
    contractBalance = await escrowInstance.getBalance();

    assert.equal(contractPayer, payer, "Payer is incorrect");
    assert.equal(contractPayee, payee, "Payee is incorrect");
    assert.equal(contractAgent, agent, "Agent is incorrect");
    assert.equal(contractBalance.toString(), amount, "Balance is incorrect");
  });
  // Segunda prueba: Verificar que el agente de custodia puede liberar los fondos al beneficiario.
  it("Should release funds to payee", async () => {
    const escrowInstance = await Escrow.new(payee, agent, {
      from: payer,
      value: amount,
    });

    await escrowInstance.releaseFunds({ from: agent });

    const contractBalance = await escrowInstance.getBalance();
    assert.equal(contractBalance.toString(), "0", "Funds were not released");
  });
  // Tercera prueba: Verificar que el agente de custodia puede emitir un reembolso al pagador.
  it("Should refund funds to payer", async () => {
    const escrowInstance = await Escrow.new(payee, agent, {
      from: payer,
      value: amount,
    });

    await escrowInstance.refund({ from: agent });

    const contractBalance = await escrowInstance.getBalance();
    assert.equal(contractBalance.toString(), "0", "Funds were not refunded");
  });
});
