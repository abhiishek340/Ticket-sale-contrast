<div align="center">

# Ticket Sale Smart Contract

**A Solidity contract for event tickets with one-per-wallet purchases, peer-to-peer swaps and a resale market that takes a 10% fee, tested with Mocha on Ganache.**

<img src="https://img.shields.io/badge/Solidity_0.8.17-363636?style=flat-square&logo=solidity&logoColor=white" alt="Solidity"/>
<img src="https://img.shields.io/badge/solc--js-363636?style=flat-square&logo=ethereum&logoColor=white" alt="solc-js"/>
<img src="https://img.shields.io/badge/Web3.js_1.x-F16822?style=flat-square&logo=web3dotjs&logoColor=white" alt="Web3.js"/>
<img src="https://img.shields.io/badge/Ganache-E4A663?style=flat-square&logo=ganache&logoColor=black" alt="Ganache"/>
<img src="https://img.shields.io/badge/Mocha-8D6748?style=flat-square&logo=mocha&logoColor=white" alt="Mocha"/>

</div>

---

## Overview

This repository contains a course assignment (Assignment 3 of a blockchain class): a `TicketSale` contract for a festival or concert. The manager deploys it with a ticket supply and price. Each wallet can buy one ticket, holders can swap tickets with each other, and a ticket can be resold, with 10% of the resale price going to the manager. The contract is compiled with `solc-js` and tested against an in-memory Ganache chain.

## Features

- **Purchase**: `buyTicket(ticketId)` checks that the ID is valid and unsold, that the buyer holds no ticket yet, and that the payment equals `ticketPrice` exactly.
- **Ownership lookup**: `getTicketOf(address)` returns the caller's ticket ID, or `0` if they have none.
- **Swaps**: `offerSwap(ticketId)` records an offer to the target ticket's owner, and `acceptSwap(ticketId)` from that owner swaps the two tickets.
- **Resale**: `resaleTicket(price)` lists the caller's ticket. `acceptResale(ticketId)` pays the seller 90% and the manager 10%, then transfers ownership.
- **Resale listing**: `checkResale()` returns the IDs currently listed for resale.

## Tech stack

| Layer | Technology |
|-------|------------|
| Contract | Solidity `^0.8.17` |
| Compiler | `solc` (solc-js) via `compile.js`, optimizer on (200 runs) |
| Testing | Mocha, `ganache-cli` in-process provider, Web3.js 1.x |

## Project structure

```
TicketSale.sol          # The contract
compile.js              # Compiles TicketSale.sol -> TicketSale.json (ABI + bytecode)
TicketSale.json         # Compiled output used by the tests
test/TicketSale.test.js # Mocha test suite
package.json            # npm scripts: compile, test
```

The nested `ticket-sale-project/` folders only contain `package.json` scaffolding. They have no source code.

## Getting started

**Prerequisites:** Node.js and npm.

```bash
git clone https://github.com/abhiishek340/Ticket-sale-contrast.git
cd Ticket-sale-contrast
npm install
npm run compile   # writes TicketSale.json
npm test          # runs Mocha against an in-memory Ganache chain
```

## Tests

The suite deploys a fresh contract (100 tickets at 0.01 ETH) before each test:

| Test | What it checks |
|------|----------------|
| deploys a contract | Deployment succeeds |
| allows one account to buy a ticket | Purchase and ownership mapping |
| prevents buying same ticket twice | Double-sale is rejected |
| allows ticket swap between two users | Offer and accept swap ownership |
| allows resale of tickets | Listing, purchase and fee split |
| shows available resale tickets correctly | `checkResale` contents |
| matches the example scenario | The assignment walkthrough: 100,000 tickets, Alice buys #784, Bob buys #10,322, then they swap |

All 7 tests passed in the run recorded in the original README.

## Limitations

- There is no deployment script in the repo. `@truffle/hdwallet-provider` is installed but not used.
- `resaleTicket` accepts a price of `0`. Relisting the same ticket pushes a duplicate ID into `resaleTicketIds`.
- Payouts use `transfer` and the contract has not been audited. It is meant for local testing only.

---

<div align="center">
Built by <a href="https://github.com/abhiishek340">Abhishek Yadav</a>
</div>
