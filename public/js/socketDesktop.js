const socket = io();

const URLParams = new URLSearchParams(window.location.search);

if (!URLParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('Desktop is necessary');
}

let desktop = URLParams.get('escritorio');
let lbl = $('small');
console.log(desktop);

$('h1').text('Escritorio ' + desktop);

$('button').on('click', () => {
    socket.emit('attendTicket', { desktop }, (resp) => {
        if (resp === 'There is not tickets to attend') {
            lbl.text(resp);
            return;
        }

        lbl.text('Ticket ' + resp.number);
    });
});