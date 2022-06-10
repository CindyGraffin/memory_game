/* ========== SELECTORS ========== */
const cardsContainer = document.querySelector('.cards__container');
const starterContainer = document.querySelector('.starter__container');
const starterButton = document.querySelector('.starter__button');

/* ========== CARDS CREATION ========== */
/* array that contains card values */
const sortedCardsValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const shuffleCardsValues = (cardsValues) => {
    let array = cardsValues
    let newArray = [];
    for (let i = 0; i < 16; i++) {
        let randomIndex = Math.floor(Math.random()* (array.length-1))
        let element = array[randomIndex];
        array.splice(randomIndex, 1)
        newArray.push(element)
    }
    return newArray
}
let cardsValues = shuffleCardsValues(sortedCardsValues)

/* function that create a button element with a value corresponding to the card value*/
const createCardButton = (cardValue) => { 
    return `
            <button class="card__button" value="${cardValue}">
            </button>
            `
} 
/* function that creates a div element for each card value, adds it the class 'card__container', creates one button for each div and then append each div with its button to the cards container */
const appendCards = (cardValues) => {
    cardsValues.forEach((cardValue) => {
        let cardContainer = document.createElement('div');
        cardContainer.classList.add('card__container');
        cardContainer.innerHTML = createCardButton(cardValue);
        cardsContainer.appendChild(cardContainer);
    })   
}

let choosenCardsValues = [];
/* ========== GAME LOGIC ========== */
/* function that return the false pair of cards after a small delay */
const returnFalseCards = (retCard) => {
    setTimeout(() => {
        retCard.removeAttribute('disabled')
        retCard.classList.remove('returned')
        retCard.innerHTML =''
        choosenCardsValues = [];
    }, 700)
}
let points = 0;
starterButton.addEventListener('click', () => {
    starterContainer.style.display = 'none';
    cardsContainer.style.display = 'flex';
    appendCards(cardsValues);
    let cards = document.querySelectorAll('.card__button');
    let returnedCards = []
    cards.forEach((card) => {
        card.addEventListener('click', () => {
            if (choosenCardsValues.length < 2) {
                card.innerHTML = card.value
                choosenCardsValues.push(card.value);
                card.classList.add('returned')
                card.setAttribute('disabled', 'true');
                returnedCards.push(card);
                console.log(returnedCards)
                if ((choosenCardsValues[0] !== choosenCardsValues[1]) && choosenCardsValues.length === 2) {
                    // let returnedCards = document.querySelectorAll('.returned');
                    returnedCards.forEach((retCard) => {
                        returnFalseCards(retCard);
                    })
                    returnedCards = []

                } else if ((choosenCardsValues[0] === choosenCardsValues[1]) && choosenCardsValues.length === 2) {
                    points += 1
                    choosenCardsValues = [];
                    if (points === 8) {
                        console.log('You win !');
                    }
                    returnedCards = []

                }
            }
        })
    })
})