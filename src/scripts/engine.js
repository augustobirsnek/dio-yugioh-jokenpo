const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardsSprids: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards: {
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },
    playerSides: {
        player1: "player-cards",
        player1BOX: document.querySelector("#player-cards"),
        computer: "computer-cards",
        computerBOX: document.querySelector("#computer-cards"),
    },
    actions: {
        button: document.getElementById("next-duel"),
    },
};

const pathImages = "./src/assets/icons/";

const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${pathImages}dragon.png`,
        WinOf: [1,],
        LoseOf: [2,],
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        WinOf: [2,],
        LoseOf: [0,],
    },
    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        WinOf: [0,],
        LoseOf: [1,],
    },
];

function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

function createCardImage(IdCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id",IdCard);
    cardImage.classList.add("card");

    if(fieldSide === state.playerSides.player1) {
        cardImage.addEventListener("mouseover", () => {
            drawSelectCard(IdCard);
        })
        
        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"));
        })
    }

    return cardImage;
}

function setCardsField(cardId) {
    removeAllCardsImagens();

    let computerCardId = getRandomCardId();

    ShowHiddenCardFieldsImages(true);

    hiddenCardDetails();

    drawCardsInField(cardId, computerCardId);

    let duelResults = checkDuelResults(cardId, computerCardId);

    updateScore();
    drawButton(duelResults);
}

function drawCardsInField(cardId, computerCardId) {
    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;
}

function ShowHiddenCardFieldsImages(value) {
    if(value) {
        state.fieldCards.player.style.display = "block";
        state.fieldCards.computer.style.display = "block";
    } else {
        state.fieldCards.computer.style.display = "none";
        state.fieldCards.player.style.display = "none";
    }
}

function hiddenCardDetails() {
    state.cardsSprids.avatar.src = "";
    state.cardsSprids.name.innerText = "";
    state.cardsSprids.type.innerText = "";
}

function drawButton(text) {
    state.actions.button.innerText = text;
    state.actions.button.style.display = "block";
}

function updateScore() {
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore}| Lose: ${state.score.computerScore}`
}

function checkDuelResults(playerCardId, ComputerCardId) {
    let duelResults = "DRAW";
    let playerCard = cardData[playerCardId]

    if(playerCard.WinOf.includes(ComputerCardId)) {
        playAudio("win");
        duelResults = "WIN";
        state.score.playerScore++;
    } 

    if (playerCard.LoseOf.includes(ComputerCardId)) {
        playAudio("lose");
        duelResults = "LOSE";
        state.score.computerScore++;
    }

    return duelResults;
}

function removeAllCardsImagens() {
    let {computerBOX, player1BOX} = state.playerSides;
    let imgElements = computerBOX.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());

    imgElements = player1BOX.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());
}

function drawSelectCard(index) {
    state.cardsSprids.avatar.src = cardData[index].img;
    state.cardsSprids.name.innerText = cardData[index].name;
    state.cardsSprids.type.innerText = `Attribute: ${cardData[index].type}`;
}

function drawCards(cardNumbers, fieldSide) {
    for(let i = 0; i < cardNumbers; i++) {
        const randomIdCard = getRandomCardId();
        const cardImage = createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

function resetDuel() {
    state.cardsSprids.avatar.src = "";
    state.actions.button.style.display = "none";

    init();
}

function playAudio(status) {
    const audio = new Audio(`./src/assets/audios/${status}.wav`);
    audio.play();
}

function init() {
    ShowHiddenCardFieldsImages(false);

    drawCards(5, state.playerSides.player1);
    drawCards(5, state.playerSides.computer);

    const bgm = document.getElementById("bgm");
    bgm.play();
}

init ();