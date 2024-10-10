# Escrow Smartcontract

## Project description \[ENG\]

This project is submitted as the final degree project for Computer Engineering at the Complutense University of Madrid. It involves the development of a payment method on the Ethereum blockchain aimed at eliminating the hesitation potential consumers may have when making payments to e-commerce platforms perceived as unreliable.

The core idea revolves around utilizing a smart contract initiated by the consumer towards the e-commerce platform. In this system, the payment amount is held in escrow until one of the following conditions is met:

Successful Delivery: The order has been delivered to the consumer.
Contract Expiration: The order is not delivered, and the contract reaches its expiration date.
A critical aspect of this method is verifying the delivery status of the order. To achieve this, the project employs an oracle that connects directly to the relevant shipping company. This oracle monitors the status of the shipment and communicates with the smart contract to confirm whether the package has been delivered. By relying on the shipping company's official delivery status, the system ensures that funds are only released when the consumer has received their order or the contract terms dictate otherwise.

This blockchain-based payment solution enhances trust between consumers and e-commerce platforms by providing a secure and transparent mechanism for transactions. By mitigating concerns over the reliability of online merchants, the project aims to facilitate smoother and more confident online shopping experiences.

---

## Descripción del proyecto \[ESP\]

Este proyecto se presenta como el trabajo de fin de grado de Ingeniería Informática en la Universidad Complutense de Madrid. Consiste en el desarrollo de un método de pago en la blockchain de Ethereum cuyo objetivo es eliminar las dudas que pueden tener los consumidores potenciales al realizar pagos en plataformas de comercio electrónico percibidas como poco fiables.

La idea central gira en torno al uso de un contrato inteligente iniciado por el consumidor hacia la plataforma de comercio electrónico. En este sistema, el monto del pago se retiene en una cuenta de garantía hasta que se cumpla una de las siguientes condiciones:

Entrega Exitosa: El pedido ha sido entregado al consumidor.
Expiración del Contrato: El pedido no se entrega y el contrato alcanza su fecha de vencimiento.
Un aspecto crucial de este método es la verificación del estado de entrega del pedido. Para lograr esto, el proyecto utiliza un oráculo que se conecta directamente con la empresa de envío correspondiente. Este oráculo monitorea el estado del envío y se comunica con el contrato inteligente para confirmar si el paquete ha sido entregado o no. Al confiar en el estado oficial de entrega proporcionado por la empresa de envío, el sistema garantiza que los fondos solo se liberen cuando el consumidor haya recibido su pedido o cuando los términos del contrato así lo dicten.

Esta solución de pago basada en blockchain mejora la confianza entre los consumidores y las plataformas de comercio electrónico al proporcionar un mecanismo seguro y transparente para las transacciones. Al mitigar las preocupaciones sobre la fiabilidad de los comerciantes en línea, el proyecto tiene como objetivo facilitar experiencias de compra en línea más fluidas y seguras.
