// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract TicketSale {
    // Contract variables
    address public manager;
    uint public ticketPrice;
    uint public totalTickets;
    
    // Mapping to store ticket ownership
    mapping(address => uint) public ticketOwners;
    mapping(uint => address) public ticketToOwner;
    mapping(uint => bool) public soldTickets;
    
    // Swap related mappings
    mapping(address => mapping(address => uint)) public swapOffers;
    
    // Resale related mappings
    mapping(uint => uint) public ticketsForResale;
    uint[] public resaleTicketIds;

    constructor(uint numTickets, uint price) {
        require(numTickets > 0, "Number of tickets must be greater than 0");
        require(price > 0, "Price must be greater than 0");
        
        manager = msg.sender;
        ticketPrice = price;
        totalTickets = numTickets;
    }

    function buyTicket(uint ticketId) public payable {
        require(ticketId > 0 && ticketId <= totalTickets, "Invalid ticket ID");
        require(!soldTickets[ticketId], "Ticket already sold");
        require(ticketOwners[msg.sender] == 0, "You already own a ticket");
        require(msg.value == ticketPrice, "Incorrect payment amount");

        soldTickets[ticketId] = true;
        ticketOwners[msg.sender] = ticketId;
        ticketToOwner[ticketId] = msg.sender;
    }

    function getTicketOf(address person) public view returns (uint) {
        return ticketOwners[person];
    }

    function offerSwap(uint ticketId) public {
        require(ticketOwners[msg.sender] != 0, "You don't own a ticket");
        require(ticketToOwner[ticketId] != address(0), "Target ticket not sold");
        require(ticketId != ticketOwners[msg.sender], "Cannot swap with your own ticket");

        address targetOwner = ticketToOwner[ticketId];
        swapOffers[msg.sender][targetOwner] = ticketOwners[msg.sender];
    }

    function acceptSwap(uint ticketId) public {
        require(ticketOwners[msg.sender] != 0, "You don't own a ticket");
        address offerer = ticketToOwner[ticketId];
        require(swapOffers[offerer][msg.sender] != 0, "No swap offer exists");

        uint offererTicket = ticketOwners[offerer];
        uint accepterTicket = ticketOwners[msg.sender];

        // Perform the swap
        ticketOwners[offerer] = accepterTicket;
        ticketOwners[msg.sender] = offererTicket;
        ticketToOwner[offererTicket] = msg.sender;
        ticketToOwner[accepterTicket] = offerer;

        // Clear the swap offer
        swapOffers[offerer][msg.sender] = 0;
    }

    function resaleTicket(uint price) public {
        require(ticketOwners[msg.sender] != 0, "You don't own a ticket");
        uint ticketId = ticketOwners[msg.sender];
        ticketsForResale[ticketId] = price;
        resaleTicketIds.push(ticketId);
    }

    function acceptResale(uint ticketId) public payable {
        require(ticketsForResale[ticketId] > 0, "Ticket not for resale");
        require(ticketOwners[msg.sender] == 0, "You already own a ticket");
        require(msg.value == ticketsForResale[ticketId], "Incorrect payment amount");

        address currentOwner = ticketToOwner[ticketId];
        uint resalePrice = ticketsForResale[ticketId];
        uint serviceFee = resalePrice * 10 / 100;
        uint sellerAmount = resalePrice - serviceFee;

        // Transfer ownership
        ticketOwners[currentOwner] = 0;
        ticketOwners[msg.sender] = ticketId;
        ticketToOwner[ticketId] = msg.sender;

        // Remove from resale list
        removeFromResaleList(ticketId);

        // Transfer payments
        payable(currentOwner).transfer(sellerAmount);
        payable(manager).transfer(serviceFee);
    }

    function checkResale() public view returns (uint[] memory) {
        return resaleTicketIds;
    }

    // Helper function to remove ticket from resale list
    function removeFromResaleList(uint ticketId) private {
        for (uint i = 0; i < resaleTicketIds.length; i++) {
            if (resaleTicketIds[i] == ticketId) {
                resaleTicketIds[i] = resaleTicketIds[resaleTicketIds.length - 1];
                resaleTicketIds.pop();
                ticketsForResale[ticketId] = 0;
                break;
            }
        }
    }
} 