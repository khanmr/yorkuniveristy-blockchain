## CSBC 1000 Fundamentals of Back-End and Blockchain Development

### Summary

In this project, we will write a smart contract in solidity for a decentralized logistics app and deploy it using Remix. The app has 2 users:

1. Distributors - the company sending goods; and
2. Logistics - the company delivering goods.

The distributor can:

- place an order for delivery
- deposit funds in escrow
- pay the total delivery cost to the logistics company in ETH (wei) from the deposited funds

The logistics company can:

- view existing delivery jobs
- confirm an order
- pick an order
- deliver an order

### Pre-requisites

- Remix IDE

### Project Setup

1. Go to [Remix IDE](https://remix.ethereum.org/)
2. From file explorer, create a new file - logistics.sol
3. Copy the code to logistics.sol.
4. From solidity compiler, compile the contract.
5. From deploy, deploy the contract.
6. Click on drop-down to see fields required for each transaction.
7. Run transactions from the deployed contract.
   - Create order (distributor)
   - Get order by ID
   - Confirm order (logistics)
   - Deposit funds (distributor)
   - Pick order (logistics)
   - Deliver order (logistics)
   - Withdraw funds (distributor)
