const gameCards = document.querySelectorAll(".memory-game__card");
// const overlay = document.querySelector(".overlay");

let firstCard, secondCard;
let cardIsFlipped = false;
let pauseGame = false;
let counter = 0;

// 1) Loop through array of cards
gameCards.forEach((card) => {
  card.addEventListener("click", () => {
    flipCard(card);
  });
});

// 2) Flip selected card
function flipCard(card) {
  console.log(card);

  if(pauseGame) return;

  if(card === firstCard) return;

  card.classList.add("flip");

  // if(!cardIsFlipped)
  if(cardIsFlipped === false) {
    // first click -> first card
    cardIsFlipped = true;
    firstCard = card;
    return;
  }
  
  cardIsFlipped = false;
  // second click -> second card
  secondCard = card;

  checkForMatch();
}

// 3) Check if there is a match between selected cards
function checkForMatch() {
//   let isMatched = firstCard.dataset.name === secondCard.dataset.name;
  let isMatched = firstCard.getAttribute("data-name") === secondCard.getAttribute("data-name");
  isMatched ? disableCards() : unFlipCards();
}

// Remove flipCard listener of first and second cards
function disableCards() {
  pauseGame = true;

  const frontFirstCard = firstCard.firstElementChild;
  const frontSecondCard = secondCard.firstElementChild;

  setTimeout(() => {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    frontFirstCard.style.opacity = ".5";
    frontSecondCard.style.opacity = ".5";

    pauseGame = false;
    resetBoard();

    counter++;
    checkCounter();
  }, 1200);
}

// 4) Remove flip class of selected cards after 1.3 seconds
function unFlipCards() {
  pauseGame = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1200);
}

// 5) Reset some variables to initial state
function resetBoard() {
  [cardIsFlipped, pauseGame] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// 6) Check if game is over and show message
function checkCounter() {
  if(counter === (gameCards.length / 2)) {
    setTimeout(() => {
      // overlay.style.display = "block";
      showMessage();
    }, 1000);
  }
}

function showMessage() {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  const message = document.createElement("div");
  message.classList.add("overlay__message");

  const h2 = document.createElement("h2");
  h2.innerText = "Congrats!";

  const btn = document.createElement("button");
  btn.innerText = "Reload Page";

  message.appendChild(btn);
  message.appendChild(h2);
  message.insertBefore(h2, btn);

  overlay.appendChild(message);

  document.body.appendChild(overlay);

  btn.addEventListener("click", () => {
    location.reload();
  });
}

// Shuffle randomly all cards as soon as the page is loaded
function shuffle() {
  gameCards.forEach((card) => {
    // let randomPositions = Math.floor(Math.random() * 12);
    let randomPositions = Math.floor(Math.random() * gameCards.length);
    card.style.order = randomPositions;
  });
}
shuffle();