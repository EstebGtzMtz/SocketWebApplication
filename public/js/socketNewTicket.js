const socket = io();
let labelNewTicket = $('#lblNewTicket');

socket.on('connect', () => {
    console.log('server connect');
});

socket.on('disconnect', () => {
    console.log('server disconnect');
});

socket.on('currentTicket', (currentTicketResponse) => {
    labelNewTicket.text(currentTicketResponse.currentTicket);
});


$('button').on('click', () => {
    socket.emit('nextTicket', null, (nextTicket) => {
        labelNewTicket.text(nextTicket);
    });
});