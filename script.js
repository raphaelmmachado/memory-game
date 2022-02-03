const FRONT = 'card-front';
const BACK = 'card-back';
const CARD = 'card';
const ICON = 'icon';
const FLIP = 'flip';

const clubs = ['flamengo',
    'fluminense',
    'vasco',
    'botafogo',
    'corinthians',
    'sao-paulo',
    'palmeiras',
    'santos',
    'cruzeiro',
    'atletico-mineiro',
    'gremio',
    'internacional'];

let cards = null;
startGame();

function startGame() {
    cards = createCardsFromClubs(clubs);
    shuffleCards(cards);
    initializeCards(cards);
    console.log(cards)
}
//função que cria as cartas no DOM
function initializeCards(cards) {
    let gameBoard = document.querySelector('[data-board]');
    //para cada carta dar o id, classe, icone, eventlistener
    cards.forEach(card => {
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
function createCardContent(card, cardElement){
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}
// se for a parte da frente colocar a imagem referente ao clube
function createCardFace(face, card, element){
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if (face === FRONT){
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = './assets/' + card.icon + '.png';
        cardElementFace.append(iconElement);
    }
    //SE DER ERRO BEM PROVAVEL QUE FOI AQUI !!!!!
    else{
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = './assets/bola.png'
        cardElementFace.append(iconElement);
    }
    element.append(cardElementFace)
}
//função para embaralhar
function shuffleCards(cards) {
    let currentIndex = cards.length;
    let randomIndex = 0;
    //esse loop aponta para o ultimo elemento do array, gera um numero aleatorio, troca de lugar, aponta para o elemento anterior e repete o processo
    while (currentIndex !== 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        //forma de inverter valores de variaves
        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]];
    }
}
//criar uma função para criar um par para cada carta e jogar todas as cartas em um array    
function createCardsFromClubs(clubs) {
    let cards = [];
    //para cada clube criar 2 objetos
    clubs.forEach(club => {
        cards.push(createPairFromClubs(club));
    })
    //flatmap faz que os pares sejam objetos separados. nós queremos 24 cartas diferentes. não 12 pares.
    return cards.flatMap(pair => pair);
}
// retorna os 2 objetos referenciando cada carta
function createPairFromClubs(club) {
    return [{
        id: createIdWithClub(club),
        icon: club,
        flipped: false,
    }, {
        id: createIdWithClub(club),
        icon: club,
        flipped: false,
    }];
}
//gera id aleatorio
function createIdWithClub(club) {
    return club + parseInt(Math.random() * 1000);
}
//função para virar a carta
function flipCard() {
 this.classList.add(FLIP)
}