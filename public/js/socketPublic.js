const socket = io();

const lblTicket1 = $('#lblTicket1');
const lblTicket2 = $('#lblTicket2');
const lblTicket3 = $('#lblTicket3');
const lblTicket4 = $('#lblTicket4');

const lblDesktop1 = $('#lblDesktop1');
const lblDesktop2 = $('#lblDesktop2');
const lblDesktop3 = $('#lblDesktop3');
const lblDesktop4 = $('#lblDesktop4');

const lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
const lblDesktops = [lblDesktop1, lblDesktop2, lblDesktop3, lblDesktop4];

socket.on('currentTicket', (resp) => {
    //console.log(resp);
    updateLastFourTicketsInHTML(resp.lastFourTickets);
});

socket.on('lastFourTickets', (resp) => {
    //console.log(resp);
    updateLastFourTicketsInHTML(resp.lastFourTickets);
});

const updateLastFourTicketsInHTML = lastFourTickets => {
    for (let i = 0; i <= lastFourTickets.length - 1; i++) {
        lblTickets[i].text('Ticket ' + lastFourTickets[i].number);
        lblDesktops[i].text('Desk ' + lastFourTickets[i].desktop);
    }
}