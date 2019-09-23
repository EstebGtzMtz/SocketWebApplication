const fs = require('fs');

class Ticket {
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}

class TicketsControl {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.last4TicketsAttending = [];

        const data = require('../data/data.json');

        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.last4TicketsAttending = data.last4TicketsAttending;
        } else {
            this.resetCounter();
        }

    }

    getCurrentTicket() {
        return `Ticket #${this.last}`;
    }

    getLastFourTickets() {
        return this.last4TicketsAttending;
    }

    nextTicket() {
        this.last += 1;
        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.saveFile();

        return `Ticket #${this.last}`;
    }

    attendTicket(desktop) {
        if (this.tickets.length === 0) {
            return 'There is not tickets to attend';
        }

        const ticketNumber = this.tickets[0].number;
        this.tickets.shift();

        const ticketAttend = new Ticket(ticketNumber, desktop);
        this.last4TicketsAttending.unshift(ticketAttend);

        if (this.last4TicketsAttending.length > 4) {
            this.last4TicketsAttending.splice(-1, 1) //drop the last one
        }
        console.log('LAST 4 ATTENDING');
        console.log(this.last4TicketsAttending);

        this.saveFile();
        return ticketAttend;
    }

    resetCounter() {
        this.last = 0;
        this.tickets = [];
        this.last4TicketsAttending = [];
        console.log('counter reset');
        this.saveFile();
    }

    saveFile() {
        const dataJson = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4TicketsAttending: this.last4TicketsAttending
        }

        const dataJsonString = JSON.stringify(dataJson);

        fs.writeFileSync('./server/data/data.json', dataJsonString);
    }
}

module.exports = {
    TicketsControl
}