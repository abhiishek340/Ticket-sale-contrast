const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

let contractData;
try {
    contractData = require('../TicketSale.json');
} catch (error) {
    console.error('Error loading TicketSale.json. Did you run "npm run compile" first?');
    process.exit(1);
}

const { abi, bytecode } = contractData;

let accounts;
let ticketSale;
const TICKET_PRICE = web3.utils.toWei('0.01', 'ether');
const TOTAL_TICKETS = '100';

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    const deployerBalance = await web3.eth.getBalance(accounts[0]);
    console.log('Deploying contract with account:', accounts[0]);
    console.log('Account balance:', deployerBalance);

    const contract = new web3.eth.Contract(abi);
    ticketSale = await contract.deploy({
        data: bytecode,
        arguments: [TOTAL_TICKETS, TICKET_PRICE]
    }).send({
        from: accounts[0],
        gas: '3000000'
    });

    console.log('Contract deployed to:', ticketSale.options.address);
});

describe('TicketSale Contract', () => {
    it('deploys a contract', () => {
        assert.ok(ticketSale.options.address);
    });

    it('allows one account to buy a ticket', async () => {
        const buyerBalance = await web3.eth.getBalance(accounts[1]);
        console.log('Buyer initial balance:', buyerBalance);

        await ticketSale.methods.buyTicket(1).send({
            from: accounts[1],
            value: TICKET_PRICE,
            gas: '3000000'
        });

        const ticketOwner = await ticketSale.methods.getTicketOf(accounts[1]).call();
        assert.equal(ticketOwner, '1');
    });

    it('prevents buying same ticket twice', async () => {
        await ticketSale.methods.buyTicket(1).send({
            from: accounts[1],
            value: TICKET_PRICE,
            gas: '3000000'
        });

        try {
            await ticketSale.methods.buyTicket(1).send({
                from: accounts[2],
                value: TICKET_PRICE,
                gas: '3000000'
            });
            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    it('allows ticket swap between two users', async () => {
        // First user buys ticket 1
        await ticketSale.methods.buyTicket(1).send({
            from: accounts[1],
            value: TICKET_PRICE,
            gas: '3000000'
        });

        // Second user buys ticket 2
        await ticketSale.methods.buyTicket(2).send({
            from: accounts[2],
            value: TICKET_PRICE,
            gas: '3000000'
        });

        // First user offers swap
        await ticketSale.methods.offerSwap(2).send({
            from: accounts[1],
            gas: '3000000'
        });

        // Second user accepts swap
        await ticketSale.methods.acceptSwap(1).send({
            from: accounts[2],
            gas: '3000000'
        });

        const ticket1Owner = await ticketSale.methods.getTicketOf(accounts[2]).call();
        const ticket2Owner = await ticketSale.methods.getTicketOf(accounts[1]).call();
        assert.equal(ticket1Owner, '1');
        assert.equal(ticket2Owner, '2');
    });

    it('allows resale of tickets', async () => {
        // First user buys ticket
        await ticketSale.methods.buyTicket(1).send({
            from: accounts[1],
            value: TICKET_PRICE,
            gas: '3000000'
        });

        // List ticket for resale
        const resalePrice = web3.utils.toWei('0.015', 'ether');
        await ticketSale.methods.resaleTicket(resalePrice).send({
            from: accounts[1],
            gas: '3000000'
        });

        // Second user buys resale ticket
        await ticketSale.methods.acceptResale(1).send({
            from: accounts[2],
            value: resalePrice,
            gas: '3000000'
        });

        const newOwner = await ticketSale.methods.getTicketOf(accounts[2]).call();
        assert.equal(newOwner, '1');
    });

    it('matches the example scenario', async () => {
        // Create contract with 100,000 tickets at 10,000 wei
        const EXAMPLE_PRICE = '10000';
        const EXAMPLE_TICKETS = '100000';
        
        const exampleContract = await new web3.eth.Contract(abi)
            .deploy({
                data: bytecode,
                arguments: [EXAMPLE_TICKETS, EXAMPLE_PRICE]
            })
            .send({
                from: accounts[0],
                gas: '3000000'
            });

        // Alice buys ticket #784
        await exampleContract.methods.buyTicket(784).send({
            from: accounts[1], // Alice
            value: EXAMPLE_PRICE,
            gas: '3000000'
        });

        // Bob buys ticket #10,322
        await exampleContract.methods.buyTicket(10322).send({
            from: accounts[2], // Bob
            value: EXAMPLE_PRICE,
            gas: '3000000'
        });

        // Alice offers swap
        await exampleContract.methods.offerSwap(10322).send({
            from: accounts[1],
            gas: '3000000'
        });

        // Bob accepts swap
        await exampleContract.methods.acceptSwap(784).send({
            from: accounts[2],
            gas: '3000000'
        });

        // Verify swap
        assert.equal(
            await exampleContract.methods.getTicketOf(accounts[1]).call(),
            '10322'
        );
        assert.equal(
            await exampleContract.methods.getTicketOf(accounts[2]).call(),
            '784'
        );

        // Alice resales ticket
        const resalePrice = '8000'; // Reduced price
        await exampleContract.methods.resaleTicket(resalePrice).send({
            from: accounts[1],
            gas: '3000000'
        });

        // Claire buys the resale ticket
        await exampleContract.methods.acceptResale(10322).send({
            from: accounts[3], // Claire
            value: resalePrice,
            gas: '3000000'
        });

        // Verify Claire owns the ticket
        assert.equal(
            await exampleContract.methods.getTicketOf(accounts[3]).call(),
            '10322'
        );
    });
}); 