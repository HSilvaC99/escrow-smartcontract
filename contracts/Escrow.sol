// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract Escrow {
    address public immutable payer;
    address public immutable payee;
    address public immutable escrowAgent;
    uint256 public amount;

    enum EscrowState {
        AWAITING_RELEASE,
        COMPLETE,
        REFUNDED
    }
    EscrowState public currentState;

    event FundsDeposited(uint256 amount);
    event FundsReleased(uint256 amount);
    event RefundIssued(uint256 amount);

    modifier onlyEscrowAgent() {
        require(
            msg.sender == escrowAgent,
            "Only escrow agent can perform this action"
        );
        _;
    }

    modifier inState(EscrowState expectedState) {
        require(currentState == expectedState, "Invalid state for this action");
        _;
    }

    constructor(address _payee, address _escrowAgent) payable {
        require(_payee != address(0), "Invalid payee address");
        require(_escrowAgent != address(0), "Invalid escrow agent address");
        require(msg.value > 0, "Must send Ether to initialize the contract");

        payer = msg.sender;
        payee = _payee;
        escrowAgent = _escrowAgent;
        amount = msg.value;
        currentState = EscrowState.AWAITING_RELEASE;

        emit FundsDeposited(amount);
    }

    function releaseFunds()
        external
        onlyEscrowAgent
        inState(EscrowState.AWAITING_RELEASE)
    {
        // Evitamos múltiples escrituras al almacenamiento
        uint256 paymentAmount = amount;
        amount = 0; // Actualizamos antes de la interacción externa para prevenir reentrancia
        currentState = EscrowState.COMPLETE;

        (bool success, ) = payee.call{value: paymentAmount}("");
        require(success, "Transfer to payee failed");

        emit FundsReleased(paymentAmount);
    }

    function refund()
        external
        onlyEscrowAgent
        inState(EscrowState.AWAITING_RELEASE)
    {
        // Evitamos múltiples escrituras al almacenamiento
        uint256 refundAmount = amount;
        amount = 0; // Actualizamos antes de la interacción externa para prevenir reentrancia
        currentState = EscrowState.REFUNDED;

        (bool success, ) = payer.call{value: refundAmount}("");
        require(success, "Refund to payer failed");

        emit RefundIssued(refundAmount);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
