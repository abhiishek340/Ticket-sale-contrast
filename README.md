
# **TICKET SALE SMART CONTRACT**

## Overview

This project implements a smart contract for selling event tickets, allowing users to buy, swap, and resale tickets with a 10% service fee paid to the contract owner. The contract is designed to be used by events such as festivals or concerts, where the event manager (owner) sets the number and price of tickets, and users can interact with the contract to purchase or resell tickets. 

This smart contract is built using Solidity and tested with Mocha and Ganache. It features the following functions:
- **Ticket purchasing**
- Ticket swapping To make your Ticket Sale Smart Contract project visually appealing and well-organized, here's an updated version that includes your test results, project structure, and fulfills all the requirements for the assignment. This format ensures that all essential elements are easily identifiable and enhances readability.

---

# **Ticket Sale Smart Contract**

## **Overview**

This project implements a smart contract designed to handle the sale, resale, and swapping of event tickets with a 10% service fee. It is tailored for events such as concerts or festivals, where the event manager (owner) can set the number of tickets and their price. Users can interact with the contract to purchase, swap, and resell tickets.

**Key Features:**
- **Ticket purchasing**
- **Ticket swapping**
- **Ticket resale with a service fee**
- **Viewing available resale tickets**

The contract is built using **Solidity** and tested with **Mocha** and **Ganache**.

---

## **Requirements**

- **Node.js**
- **Ganache** (for local blockchain testing)
- **Truffle** (for deployment)
- **Mocha** (for testing)
- **Web3.js** (for Ethereum interaction)

---

## **Project Structure**

```
- contracts/
    - TicketSale.sol       // Smart contract code
- test/
    - ticketSaleTest.js    // Mocha test cases
- compile.js              // Script to compile the contract and generate ABI & Bytecode
- migrations/
    - migration files for deployment
- deploy.js               // Script to deploy contract to Ethereum network
- README.md               // Documentation file (this file)
```

---

## **Features**

### **1. Deploying the Contract**

The owner creates the contract instance with the specified number of tickets and price.

```solidity
constructor(uint numTickets, uint price)
```

### **2. Buying Tickets**

A user can buy a ticket, but each user can only buy one ticket. The contract verifies:
- The ticket is available
- The user has not purchased a ticket
- The correct price is paid

```solidity
function buyTicket(uint ticketId) public payable
```

### **3. Ticket Ownership Validation**

The `getTicketOf` function returns the ticket ID for a specific address. If no ticket is owned, it returns 0.

```solidity
function getTicketOf(address person) public view returns (uint)
```

### **4. Swapping Tickets**

Users can swap tickets with others using `offerSwap` and `acceptSwap`.

```solidity
function offerSwap(uint ticketId) public
function acceptSwap(uint ticketId) public
```

### **5. Reselling Tickets**

A user can resell a ticket for a specified price with a 10% service fee for the contract owner. The resale functions are:

```solidity
function resaleTicket(uint price) public
function acceptResale(uint ticketId) public payable
```

### **6. Check Resale Tickets**

The `checkResale` function displays a list of all tickets currently for resale.

```solidity
function checkResale() public view returns (uint[] memory)
```

---

## **Test Results**

All tests passed successfully using **Mocha** and **Ganache**. Below is the output of running the tests:

```
(base) student@NKU089520 Assignment 3 % npm test

> assignmnet-3@1.0.0 test
> mocha

  TicketSale Contract
  Deploying contract with account: 0x61fd67430FE593442C2759B68Edb95130a27a8CB
  Account balance: 100000000000000000000
  Contract deployed to: 0x208394AA8E770C819a9C3ba00aCC46460b9BBF68
      ✔ deploys a contract
  Deploying contract with account: 0x61fd67430FE593442C2759B68Edb95130a27a8CB
  Account balance: 99998323930000000000
  Contract deployed to: 0x06D8Dc54625bDbC28970bD44E2bd9194FB37d126
  Buyer initial balance: 100000000000000000000
      ✔ allows one account to buy a ticket (42ms)
  Deploying contract with account: 0x61fd67430FE593442C2759B68Edb95130a27a8CB
  Account balance: 99996647860000000000
  Contract deployed to: 0xC06A875a3E13597B742A3d8ED7aB6bB9bA986643
      ✔ prevents buying same ticket twice (43ms)
  Deploying contract with account: 0x61fd67430FE593442C2759B68Edb95130a27a8CB
  Account balance: 99994971790000000000
  Contract deployed to: 0x89fE4874454593482A57459Cb2F0De1ee81FFCBf
      ✔ allows ticket swap between two users (109ms)
  Deploying contract with account: 0x61fd67430FE593442C2759B68Edb95130a27a8CB
  Account balance: 99993295720000000000
  Contract deployed to: 0x221B6C8Db5a8f2de8F4Ab283359171a5d0490214
      ✔ allows resale of tickets (121ms)
  Deploying contract with account: 0x61fd67430FE593442C2759B68Edb95130a27a8CB
  Account balance: 99993119650000000000
  Contract deployed to: 0x2020B1D18dB62B93410d67a1120A7a21126a1031
      ✔ shows available resale tickets correctly (127ms)
  Deploying contract with account: 0x61fd67430FE593442C2759B68Edb95130a27a8CB
  Account balance: 99992943580000000000
  Contract deployed to: 0x8143fa4173494dA9129fb63A117F3c874e5be8dd
      ✔ matches the example scenario (189ms)

7 passing (915ms)
```

---

## **Installation**

### **Clone the Repository**
```bash
git clone https://github.com/yourusername/ticket-sale-smart-contract.git
cd ticket-sale-smart-contract
```

### **Install Dependencies**
```bash
npm install
```

### **Compile the Contract**
```bash
node compile.js
```

### **Run Tests**
```bash
npm test
```

### **Deploy the Contract**
```bash
node deploy.js
```


---

## **Files**

- `contracts/TicketSale.sol`: Smart contract code
- `test/ticketSaleTest.js`: Mocha test file for the contract
- `compile.js`: Script to compile the contract and generate ABI & Bytecode
- `deploy.js`: Script for deploying the contract to the Ethereum network

---

## **License**

This project is licensed under the **MIT License**.

---

### **Conclusion**

The Ticket Sale Smart Contract fulfills all the requirements, including ticket purchase, swap, resale, and validation functionalities. The contract was successfully compiled and tested in the Ganache environment, and all test cases passed as expected.
- **Ticket resale with a service fee**
- **Viewing available resale tickets**

## Requirements

- Node.js
- Ganache (for testing)
- Truffle (for deployment)
- Mocha (for testing)
- Web3.js (for interaction with Ethereum)

## Project Structure

- `contracts/`: Contains the smart contract code (`TicketSale.sol`).
- `test/`: Contains Mocha test cases to test the functionality of the smart contract.
- `compile.js`: A script to compile the smart contract and generate ABI and bytecode.
- `migrations/`: Contains migration files for deploying the contract.
- `deploy.js`: Script to deploy the contract to the Ethereum network.
- `README.md`: This documentation file.

## Features

### 1. **Deploying the Contract**

The owner of the contract (manager) creates an instance of the contract with the specified number of tickets and price.

```solidity
constructor(uint numTickets, uint price)
```

### 2. **Buying Tickets**

A user can buy a ticket, and each user can only purchase one ticket. The `buyTicket` function verifies that:
- The ticket is available
- The user has not purchased a ticket already
- The correct price is sent

```solidity
function buyTicket(uint ticketId) public payable
```

### 3. **Ticket Ownership Validation**

The `getTicketOf` function returns the ticket ID associated with an address. If no ticket is owned by the address, it returns 0.

```solidity
function getTicketOf(address person) public view returns (uint)
```

### 4. **Swapping Tickets**

Users can swap tickets. The `offerSwap` function allows users to offer a ticket swap, while the `acceptSwap` function facilitates the acceptance of a swap offer.

```solidity
function offerSwap(uint ticketId) public
function acceptSwap(uint ticketId) public
```

### 5. **Resale Tickets**

A user can resell a ticket through the contract, and a 10% service fee is deducted for the owner of the contract. The `resaleTicket` function allows a user to list a ticket for resale, while `acceptResale` allows another user to purchase the resold ticket.

```solidity
function resaleTicket(uint price) public
function acceptResale(uint ticketId) public payable
```

### 6. **Check Resale Tickets**

The `checkResale` function provides a list of all tickets that are currently for resale, along with their prices.

```solidity
function checkResale() public view returns (uint[] memory)
```

### 7. **Test Cases**

The contract has been thoroughly tested using Mocha and Ganache. The following tests are covered:

- **Deployment**: Verifies that the contract is deployed correctly.
- **Buying Tickets**: Verifies that users can buy tickets and prevents double purchases.
- **Swapping Tickets**: Verifies that tickets can be swapped between users.
- **Resale of Tickets**: Verifies that users can resale tickets and that the service fee is deducted.
- **Viewing Resale Tickets**: Verifies that users can see available resale tickets.
- **Example Scenario**: Simulates a real-world scenario where users buy, swap, and resale tickets.

All tests passed successfully:

```bash
  ✔ deploys a contract
  ✔ allows one account to buy a ticket
  ✔ prevents buying same ticket twice
  ✔ allows ticket swap between two users
  ✔ allows resale of tickets
  ✔ shows available resale tickets correctly
  ✔ matches the example scenario
```

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ticket-sale-smart-contract.git
cd ticket-sale-smart-contract
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Compile the Contract

Compile the smart contract using Truffle or your preferred method:

```bash
node compile.js
```

This will generate the ABI and Bytecode files, which are required for deployment.

### 4. Running Tests

Run the Mocha tests in Ganache to verify the smart contract's functionality:

```bash
npm test
```

### 5. Deploy the Contract

To deploy the contract, use the following script:

```bash
node deploy.js
```



## Files

- `contracts/TicketSale.sol`: The smart contract code.
- `test/ticketSaleTest.js`: The Mocha test file for the contract.
- `compile.js`: Script to compile the contract and generate ABI and Bytecode.
- `deploy.js`: Script for deploying the contract to the Ethereum network.

## License

This project is licensed under the MIT License.

