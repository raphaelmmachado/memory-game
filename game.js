let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    setCard: function(id){
        //se der erro talves o cards seja card
        let card = this.cards.filter(card => card.id === id)[0];

        if(card.flipped || this.lockMode){
            return false;
        }
        if (!this.firstCard){
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        }else{
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },
    checkMatch: function(){
        if(!this.firstCard || !this.secondCard){
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
    },
    clearCards: function(){
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },
    unflipCards(){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },
    checkGameOver(){
        return this.cards.filter(card => !card.flipped).length == 0;
    },
    clubs: ['flamengo',
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
        'internacional'],

    cards: null,


//criar um par para cada carta e jogar todas as cartas em um array
    createCardsFromClubs: function  (){
        this.cards = [];
        //para cada clube criar 2 objetos
        this.clubs.forEach(club => {
            this.cards.push(this.createPairFromClubs(club));
        })
        //flatmap faz que os pares sejam objetos separados. nós queremos 24 cartas diferentes. não 12 pares.
        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards()
        
    },
// retorna os 2 objetos referenciando cada carta
    createPairFromClubs: function (club) {
        return [{
            id: this.createIdWithClub(club),
            icon: club,
            flipped: false,
        }, {
            id: this.createIdWithClub(club),
            icon: club,
            flipped: false,
        }];
    },
    //gera id aleatorio
    createIdWithClub : function (club) {
        return club + parseInt(Math.random() * 1000);
    },
//função para embaralhar
    shuffleCards: function (cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0;
        //esse loop aponta para o ultimo elemento do array, gera um numero aleatorio, troca de lugar, aponta para o elemento anterior e repete o processo
        while (currentIndex !== 0) {
    
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
    
            //forma de inverter valores de variaves
            [this.cards[randomIndex],this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }
    }
}