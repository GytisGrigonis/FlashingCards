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

var numberFlipped = 0, score = 0;
var num = 0;
var cards = [];
var i;
const backPic = "img/purple_back.png";
var firstCard, secondCard;
var disabledBoard = false;
var oneFlippedCard = false;
var coefficient = 128;

class Card {
  constructor(number, frontPic) {
    this.number = num;
    this.frontPic = frontPic;
    this.flipped = false;
  }
}

var startTag = document.getElementById("start-btn");
startTag.onclick = function(e){
  startTag.disabled = true;
  for(i = 0; i < 12; i++) cards[i].flipped = false;
  document.getElementById("board").scrollIntoView();
  document.getElementById("score").innerHTML = score;
  play();
}

var frontPics = [
  "img/card1.png",
  "img/card2.png",
  "img/card3.png",
  "img/card4.png",
  "img/card5.png",
  "img/card6.png"
];

for(i = 0; i < 12; i++){
  cards.push(new Card(num, frontPics[num]));
  if(i%2 == 1) num++;
}

cards = shuffle(cards);

function resetBoard(){
  firstCard = null;
  secondCard = null;
  disabledBoard = false;
  oneFlippedCard = false;
}

function play(){
  for(i = 0; i < 12; i++){
    var cardTag = document.getElementById(i);
    cardTag.onclick = function(e) {
      if(disabledBoard) return;
      if(cards[this.id].flipped) return;
      if(!oneFlippedCard){
        oneFlippedCard = true;
        firstCard = this;
        firstCard.src = cards[firstCard.id].frontPic;
        cards[firstCard.id].flipped = true;
        numberFlipped++;
        return;
      }

      secondCard = this;
      secondCard.src = cards[secondCard.id].frontPic;

      if(cards[firstCard.id].number == cards[secondCard.id].number){
        cards[firstCard.id].flipped = true;
        cards[secondCard.id].flipped = true;
        resetBoard();
        score += Math.floor(coefficient/numberFlipped);
        coefficient = coefficient/2;
        document.getElementById("score").innerHTML = score;
        numberFlipped = 0;
      }
      else{
        disabledBoard = true;
        numberFlipped++;
        setTimeout(() => {
          firstCard.src = backPic;
          secondCard.src = backPic;
          resetBoard();
        }, 500);
        cards[firstCard.id].flipped = false;
        cards[secondCard.id].flipped = false;
      }

      if(cards.every(function(v){
        return v.flipped == true;}))
        {
        startTag.disabled = false;
        resetBoard();
        document.getElementById("scoreModal").innerHTML = score;
        document.getElementById("hidden-btn").click();
        setTimeout(function(){
          for(i = 0; i < 12; i++){
          cards[i].flipped = true;
          var cardTag = document.getElementById(i);
          cardTag.src = backPic;
          }
        }, 1500)

        cards = shuffle(cards);
        numberFlipped = 0;
        score = 0;
        document.getElementById("score").innerHTML = score;
      }
    }
  }
}