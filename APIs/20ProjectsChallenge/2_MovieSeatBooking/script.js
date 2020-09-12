const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUi()

let ticketPrice = +movieSelect.value;
//Save selected Movie index and price

function setMovieData(MovieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}
//Update total and count
function updateSelectCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    
    //Using the spread operater
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

//Get data from local starage and populate UI

function populateUi() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) >  -1) {
               seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    
    if (selectedMovieIndex !== null) {
        movieSelect.selectIndex = selectedMovieIndex
    }

}
// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectIndex, e.target.value);
    updateSelectCount();
});
//Seat Click event
container.addEventListener('click', e => {
    e.preventDefault();

    if (e.target.classList.contains('seat') && 
    !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');

        updateSelectCount();
    }
});

//Initial count and toatal set
updateSelectCount();

// const whileLive = true;
// while (whileLive) {
//     washHands();
//     cleanHands();
//     wearMask();
//     sanitize();
// }