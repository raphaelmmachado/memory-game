const FRONT = 'card-front';
const BACK = 'card-back';
const CARD = 'card';
const ICON = 'icon';
const FLIP = 'flip';

startGame();

function startGame() {
    initializeCards(game.createCardsFromClubs());
}
//função que cria as cartas no DOM
function initializeCards(cards) {
    let gameBoard = document.querySelector('[data-board]');
    //limpando o board toda vez antes de iniciar, para não criar outros tabuleiros quando reiniciar
    gameBoard.innerHTML = '';
    //para cada carta dar o id, classe, icone, eventlistener
    game.cards.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;
        createCardContent(card, cardElement);
        cardElement.addEventListener('click', flipCard);
        gameBoard.append(cardElement);
    })
}
// cria frente e costas
function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}
// se for a parte da frente colocar a imagem referente ao clube
function createCardFace(face, card, element) {
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if (face === FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = './assets/' + card.icon + '.png';
        cardElementFace.append(iconElement);
    }

    else {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = './assets/bola.png';
        cardElementFace.append(iconElement);
    }
    element.append(cardElementFace);
};

//função para virar a carta
function flipCard() {
    if (game.setCard(this.id)) {
        this.classList.add(FLIP);
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards();
                if (game.checkGameOver()) {
                    let gameOverLayer = document.querySelector('[data-game-over]');
                    gameOverLayer.style.display = 'flex';
                };
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);

                    firstCardView.classList.remove(FLIP);
                    secondCardView.classList.remove(FLIP);
                    game.unflipCards();
                }, 1000);

            };
        };
    };
};
function restart() {
    game.clearCards();
    startGame();
    let gameOverLayer = document.querySelector('[data-game-over]');
    gameOverLayer.style.display = 'none';
}