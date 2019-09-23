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
        currentTicket: ticketsControl.getCurrentTicket(),
        lastFourTickets: ticketsControl.getLastFourTickets()
    });

    client.on('attendTicket', (data, callback) => {
        if (!data.desktop) {
            return callback({ err: true, message: 'Desktop is necessary' });
        }

        const ticketAttend = ticketsControl.attendTicket(data.desktop);

        callback(ticketAttend);

        client.broadcast.emit('lastFourTickets', {
            lastFourTickets: ticketsControl.getLastFourTickets()
        });
    });

});