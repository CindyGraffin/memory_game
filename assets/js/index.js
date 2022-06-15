/* ========== SELECTORS ========== */
const cardsContainer = document.querySelector('.cards__container');
const starterContainer = document.querySelector('.starter__container');
const starterButton = document.querySelector('.starter__button');
const winContainer = document.querySelector('.win__container');
const looseContainer = document.querySelector('.loose__container');
const replayButtons = document.querySelectorAll('.replay__button');
const timer = document.querySelector('.cards__timer');

/* ========== CARDS CREATION ========== */
/* function that shuffle all the elements in the cards values array */
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
/* function that create a button element with a value corresponding to the card value*/
const createCardButton = (cardValue) => { 
    return `
            <button class="card__button" value="${cardValue}">
            </button>
            `
} 
/* function that creates a div element for each card value, adds it the class 'card__container', creates one button for each div and then append each div with its button to the cards container */
const appendCards = (cardsValues) => {
    cardsValues.forEach((cardValue) => {
        let cardContainer = document.createElement('div');
        cardContainer.classList.add('card__container');
        cardContainer.innerHTML = createCardButton(cardValue);
        cardsContainer.appendChild(cardContainer);
    })   
}

/* ========== GAME LOGIC ========== */
/* array that stock the two cards returned */
let choosenCardsValues = [];
/* function that return the false pair of cards after a small delay */
const returnFalseCards = (retCard) => {
    setTimeout(() => {
        retCard.removeAttribute('disabled')
        retCard.classList.remove('returned')
        retCard.innerHTML =''
        choosenCardsValues = [];
    }, 600)
}
/* function that take care of the first card returned and push its value in the returned cards array */
const firstReturnedCardCare = (card, returnedCards) => {
    card.innerHTML = card.value
    choosenCardsValues.push(card.value);
    card.classList.add('returned')
    card.setAttribute('disabled', 'true');
    returnedCards.push(card);
}
/* function that launch the game */
starterButton.addEventListener('click', () => {
    const sortedCardsValues = ['🍌', '🍉', '🍒', '🍏', '🥝', '🍇', '🍓', '🍍', '🍌', '🍉', '🍒', '🍏', '🥝', '🍇', '🍓', '🍍'];
    let points = 0;
    /* shuffle the cards values */
    cardsValues = shuffleCardsValues(sortedCardsValues)
    starterContainer.style.display = 'none';
    cardsContainer.style.display = 'flex';
    let temps = 60
    let timerInterval = setInterval(() => {
        timer.innerText = temps
        temps--
        if (temps < 0) {
            clearInterval(timerInterval);
            cardsContainer.style.display = 'none';
            looseContainer.style.display = 'flex';
        }
    }, 1000)
    appendCards(cardsValues);
    let cards = document.querySelectorAll('.card__button');
    let returnedCards = []
    cards.forEach((card) => {
        card.addEventListener('click', () => {
            if (choosenCardsValues.length < 2) {
                firstReturnedCardCare(card, returnedCards)
                if ((choosenCardsValues[0] !== choosenCardsValues[1]) && choosenCardsValues.length === 2) {
                    // let returnedCards = document.querySelectorAll('.returned');
                    returnedCards.forEach((retCard) => {
                        returnFalseCards(retCard);
                    })
                    returnedCards = []
                /* else execute when the two cards are the same, it add one point to the player and clear out the array that contain the returned cards */ 
                } else if ((choosenCardsValues[0] === choosenCardsValues[1]) && choosenCardsValues.length === 2) {
                    points += 1
                    choosenCardsValues = [];
                    if (points === 8) {
                        cardsContainer.style.display = 'none';
                        winContainer.style.display = 'flex';
                        clearInterval(timerInterval);
                    }
                    returnedCards = []
                }
            }
        })
    })
})
/* function that allow to replay the same game */
replayButtons.forEach(button => {
    button.addEventListener('click', () => {
        timer.innerText = 60
        let temps = 60
        let timerInterval = setInterval(() => {
            timer.innerText = temps
            temps--
            if (temps < 0) {
                clearInterval(timerInterval);
                cardsContainer.style.display = 'none';
                looseContainer.style.display = 'flex';
            }
        }, 1000);
        const sortedCardsValues = ['🍌', '🍉', '🍒', '🍏', '🥝', '🍇', '🍓', '🍍', '🍌', '🍉', '🍒', '🍏', '🥝', '🍇', '🍓', '🍍'];
        choosenCardsValues = [];
        let points = 0;
        looseContainer.style.display = 'none';
        winContainer.style.display = 'none';
        cardsValues = shuffleCardsValues(sortedCardsValues)
        console.log(cardsValues);
        cardsContainer.innerHTML= '';
        cardsContainer.style.display = 'flex';
        appendCards(cardsValues);
        let cards = document.querySelectorAll('.card__button');
        let returnedCards = []
        cards.forEach((card) => {
            card.addEventListener('click', () => {
                if (choosenCardsValues.length < 2) {
                    firstReturnedCardCare(card, returnedCards)
                    if ((choosenCardsValues[0] !== choosenCardsValues[1]) && choosenCardsValues.length === 2) {
                        // let returnedCards = document.querySelectorAll('.returned');
                        returnedCards.forEach((retCard) => {
                        returnFalseCards(retCard);
                        })
                        returnedCards = []
                    /* else execute when the two cards are the same, it add one point to the player and clear out the array that contain the returned cards */ 
                    } else if ((choosenCardsValues[0] === choosenCardsValues[1]) && choosenCardsValues.length === 2) {
                        points += 1
                        choosenCardsValues = [];
                        if (points === 8) {
                            cardsContainer.style.display = 'none';
                            winContainer.style.display = 'flex';
                        }
                        returnedCards = []
                    }
                }
            })
        })
    })
})