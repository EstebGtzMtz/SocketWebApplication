const fs = require('fs');

class TicketsControl {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();

        const data = require('../data/data.json');

        if (data.today === this.today) {
            this.last = data.last;
        } else {
            this.resetCounter();
        }

    }

    getCurrentTicket() {
        return `Ticket #${this.last}`;
    }

    nextTicket() {
        this.last += 1;
        this.saveFile();

        return `Ticket #${this.last}`;
    }

    resetCounter() {
        this.last = 0;
        console.log('counter reset');
        this.saveFile();
    }

    saveFile() {
        const dataJson = {
            last: this.last,
            today: this.today
        }

        const dataJsonString = JSON.stringify(dataJson);

        fs.writeFileSync('./server/data/data.json', dataJsonString);
    }
}

module.exports = {
    TicketsControl
}