const { io } = require('../server');
const { TicketsControl } = require('../classes/ticketsControl');

const ticketsControl = new TicketsControl();

//This is the backend communication
io.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {
        const nextTicketNumber = ticketsControl.nextTicket();

        console.log(nextTicketNumber);
        callback(nextTicketNumber);
    });

    client.emit('currentTicket', {
        currentTicket: ticketsControl.getCurrentTicket()
    });
});