function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}

var num = 1;
var cards = [];
var i;
const backPic = "img/purple_back.png";

class Card {
  constructor(number, frontPic) {
    this.number = num;
    this.frontPic = frontPic;
    this.flipped = false;
  }

}

var frontPics = [
  "img/purple_back.png",
  "img/card1.png",
  "img/card2.png",
  "img/card3.png",
  "img/card4.png",
  "img/card5.png",
  "img/card6.png"
];

cards.push(new Card(num, frontPics[0]));

for(i = 1; i <= 12; i++){
  cards.push(new Card(num, frontPics[num]));
  if(i%2 == 0) num++;
}


cards = shuffle(cards);
var firstCard, secondCard;
var disabledBoard = false;
var oneFlippedCard = false;

function resetBoard(){
  firstCard = null;
  secondCard = null;
  disabledBoard = false;
  oneFlippedCard = false;
}

for(i = 1; i <= 12; i++){
  var cardTag = document.getElementById(i);
  cardTag.onclick = function(e) {
    if(disabledBoard) return;
    if(cards[this.id].flipped) return;
    if(!oneFlippedCard){
      oneFlippedCard = true;
      firstCard = this;
      firstCard.src = cards[firstCard.id].frontPic;
      return;
    }

    secondCard = this;
    secondCard.src = cards[secondCard.id].frontPic;

    if(cards[firstCard.id].number == cards[secondCard.id].number){
      cards[firstCard.id].flipped = true;
      cards[secondCard.id].flipped = true;
      resetBoard();
    }
    else{
      disabledBoard = true;
      setTimeout(() => {
        firstCard.src = backPic;
        secondCard.src = backPic;
        resetBoard();
      }, 1500);
    }
  }
}