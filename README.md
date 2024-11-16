Here's an improved README that is clear, visually structured, and covers all details from the assignment prompt, making it easy for anyone to run and understand the project.

---

# 🎟️ Ethereum Ticket Sale Smart Contract

## Overview
This project is a **decentralized ticket sale smart contract** for securely purchasing, swapping, and reselling tickets on the Ethereum blockchain. It automates the entire ticket lifecycle and applies a 10% service fee on resales, which is credited to the manager.

---

## 🔧 Smart Contract Specifications
- **Network**: Ethereum (Testing on Ganache)
- **Solidity Version**: ^0.8.17
- **Testing Framework**: Mocha, Ganache CLI

---

## 🚀 Features

### 🎟️ Primary Market
- **Direct Ticket Purchase**: Allows one ticket per address.
- **Ownership Registration**: Automatically recorded upon purchase.
- **Controlled Price & Supply**: Managed by the contract owner.

### 🔄 Secondary Market
- **Peer-to-Peer Swapping**: Enables users to swap tickets directly through the contract.
- **Ticket Resale with Service Fee**: Includes a 10% service fee on ticket resales.
- **Automatic Fee Distribution**: The fee goes directly to the manager.
- **Resale Price Validation**: Verifies correct pricing on resale transactions.

### 👤 Ownership Management
- **Ownership Verification**: Real-time tracking of ticket ownership.
- **Secure Transfers**: Ensures safe ticket swaps and resales.

---

## 📜 Core Contract Functions

### Contract Initialization
- **Constructor**
    ```solidity
    constructor(uint numTickets, uint price)
    ```
    Initializes the ticket sale with a set quantity and price. The deployer is the manager.

### Primary Functions
1. **Buy Ticket**
    ```solidity
    function buyTicket(uint ticketId) payable
    ```
    Purchases a ticket by ID, updating the owner if the payment and ticket availability are valid.

2. **Get Ticket Information**
    ```solidity
    function getTicketOf(address person) public view returns (uint)
    ```
    Retrieves the ticket ID owned by a specific address.

### Swapping and Resale
1. **Offer Swap**
    ```solidity
    function offerSwap(uint ticketId)
    ```
    Submits a swap offer for the sender’s ticket with a partner's ticket.

2. **Accept Swap**
    ```solidity
    function acceptSwap(uint ticketId)
    ```
    Accepts a swap offer if both parties own tickets and a valid offer exists.

3. **Resale Ticket**
    ```solidity
    function resaleTicket(uint price)
    ```
    Lists the sender’s ticket for resale at a specified price.

4. **Accept Resale**
    ```solidity
    function acceptResale(uint ticketId) payable
    ```
    Completes a resale with a 10% service fee for the manager. The new buyer becomes the ticket owner.

5. **Check Resale Tickets**
    ```solidity
    function checkResale() public view returns (uint[] memory)
    ```
    Displays a list of available resale tickets with their prices.

---

## 📂 Project Structure

```
ticket-sale-project/
├── TicketSale.sol          # Main smart contract
├── compile.js              # Compilation script
├── test/
│   └── TicketSale.test.js  # Test suite
├── package.json            # Project dependencies
└── .gitignore              # Git configuration
```

---

## ✅ Installation & Setup

### Prerequisites
- **Node.js and npm**
- **Project Dependencies**:
    ```bash
    npm install solc@0.8.17 web3@1.10.0 ganache-cli@6.12.2 mocha@10.2.0 @truffle/hdwallet-provider@2.1.15
    ```

### Project Setup
1. **Clone Repository**:
    ```bash
    git clone <repository-url>
    cd ticket-sale-project
    ```
2. **Install Project Dependencies**:
    ```bash
    npm install
    ```
3. **Compile Contract**:
    ```bash
    npm run compile
    ```
4. **Run Tests**:
    ```bash
    npm test
    ```

---

## ✅ Test Results
After running `npm test`, you should see:

```bash
TicketSale Contract
✓ Deploys successfully
✓ Allows ticket purchase
✓ Prevents duplicate ticket purchases
✓ Supports ticket swapping
✓ Enables ticket resale with service fee
✓ Matches example scenario requirements

6 tests passed (in ~467ms)
```

---

## 📜 Example Usage
1. **Deploy Contract**: Set the number of tickets and price.
2. **Purchase Ticket**: Execute `buyTicket` with payment.
3. **Swap Tickets**: Submit and accept swap offers.
4. **Resale Process**: List and accept resale offers.

---

## ⚠️ Error Handling

### Common Issues
- **Invalid Ticket ID**: Ticket ID must be within a valid range.
- **Incorrect Payment**: Ensure the payment amount matches the ticket price.
- **Unauthorized Access**: Verify ownership and permissions.

---

## ⛽ Gas Optimization

| Operation          | Gas Cost  |
|--------------------|-----------|
| Contract Deployment | ~838,035 |
| Ticket Purchase     | ~100,000 |
| Ticket Swap         | ~130,000 |
| Ticket Resale       | ~170,000 |

---

## 🔒 Security & Access Control
- **Manager-only Functions**: Certain operations are restricted to the contract owner.
- **Ownership Verification**: Confirms ticket ownership before any transfers or swaps.
- **Payment Validation**: Ensures the correct amount is transferred.

---

## 🛠️ Development Tools
- **Solidity**: Smart Contract Language
- **Web3.js**: Ethereum Interaction Library
- **Ganache CLI**: Local Blockchain Emulator
- **Mocha**: Testing Framework

---

## 🎮 License
This project is licensed under the ISC License.

