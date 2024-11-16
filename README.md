# 🎫 Ethereum Ticket Sale Smart Contract

## Overview
A comprehensive smart contract implementation for managing event ticket sales on the Ethereum blockchain. This project enables direct ticket purchases, ticket swapping, and resale functionality with automated service fee handling.

## Test Results
```bash
TicketSale Contract
Deploying contract with account: 0x0F3bBc8a8caB741bCC224E9F43f34Aa7Da563219
Account balance: 100000000000000000000
Contract deployed to: 0xD797b411745b60b8F22C0eD496434986737571a9
    ✔ deploys a contract
Deploying contract with account: 0x0F3bBc8a8caB741bCC224E9F43f34Aa7Da563219
Account balance: 99998323930000000000
Contract deployed to: 0x7390D00F4B9FE89d20984f6431896DD9777eC30e
Buyer initial balance: 100000000000000000000
    ✔ allows one account to buy a ticket (41ms)
Deploying contract with account: 0x0F3bBc8a8caB741bCC224E9F43f34Aa7Da563219
Account balance: 99996647860000000000
Contract deployed to: 0x6918B6D1B12C7EC6602C8E39aA4563bD6a3134ba
    ✔ prevents buying same ticket twice (42ms)
Deploying contract with account: 0x0F3bBc8a8caB741bCC224E9F43f34Aa7Da563219
Account balance: 99994971790000000000
Contract deployed to: 0x6b7d383754e506C251C7F591AC69c34BE301DE11
    ✔ allows ticket swap between two users (109ms)
Deploying contract with account: 0x0F3bBc8a8caB741bCC224E9F43f34Aa7Da563219
Account balance: 99993295720000000000
Contract deployed to: 0xF78857F602AE51637d4cB80d3Ffd952Ab76fDF41
    ✔ allows resale of tickets (86ms)
Deploying contract with account: 0x0F3bBc8a8caB741bCC224E9F43f34Aa7Da563219
Account balance: 99993119650000000000
Contract deployed to: 0xFABbA1C6fAB4BAb270550765dC02B57C4dFc4f73
    ✔ matches the example scenario (177ms)

6 passing (707ms)
```

## Project Structure
```
ticket-sale-project/
├── TicketSale.sol         # Main smart contract
├── compile.js             # Compilation script
├── test/
│   └── TicketSale.test.js # Test suite
├── package.json          # Project dependencies
└── .gitignore           # Git configuration
```

## Implementation Details

### Contract Functions

1. **Constructor**
```solidity
constructor(uint numTickets, uint price)
```
- Creates ticket sale with specified number and price
- Sets deployer as manager

2. **Buy Ticket**
```solidity
function buyTicket(uint ticketId) payable
```
- Purchases ticket by ID
- Requires exact payment
- One ticket per address

3. **Get Ticket Information**
```solidity
function getTicketOf(address person) public view returns (uint)
```
- Returns ticket ID owned by address
- Returns 0 if no ticket owned

4. **Swap Functions**
```solidity
function offerSwap(uint ticketId)
function acceptSwap(uint ticketId)
```
- Create and accept swap offers
- Atomic swap execution

5. **Resale Functions**
```solidity
function resaleTicket(uint price)
function acceptResale(uint ticketId) payable
```
- List tickets for resale
- Process 10% service fee
- Transfer ownership

6. **Check Resale**
```solidity
function checkResale() public view returns (uint[] memory)
```
- View available resale tickets

## Test Coverage

### 1. Contract Deployment Test ✅
- Verifies successful deployment
- Checks contract address

### 2. Ticket Purchase Test ✅
- Tests direct buying
- Verifies ownership
- Checks payment handling

### 3. Double Purchase Prevention Test ✅
- Prevents same ticket purchase
- Validates ticket availability

### 4. Ticket Swap Test ✅
- Tests ticket swapping
- Verifies ownership transfer
- Checks swap completion

### 5. Resale Test ✅
- Tests resale listing
- Validates service fee
- Confirms ownership transfer

### 6. Example Scenario Test ✅
- Tests complete workflow
- Matches Sziget Festival example
- Verifies all operations

## Setup Instructions

1. **Install Dependencies**
```bash
npm install
```

2. **Compile Contract**
```bash
npm run compile
```

3. **Run Tests**
```bash
npm test
```

## Security Features
- Ownership verification
- Payment validation
- One ticket per address
- Atomic operations
- Service fee automation

## Gas Optimization
| Operation | Gas Cost |
|-----------|----------|
| Deployment | ~838,035 |
| Purchase | ~100,000 |
| Swap | ~130,000 |
| Resale | ~170,000 |

## Support
For assistance:
1. Check documentation
2. Review test cases
3. Run tests locally
4. Open an issue

## License
ISC License

---
Last Updated: February 2024

