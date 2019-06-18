
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

class Card {
  constructor(number, frontPic, backPic) {
    this.number = num;
    this.frontPic = frontPic;
    this.backPic = backPic;
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

cards.push(new Card(num, frontPics[0], frontPics[0]));

for(i = 1; i <= 12; i++){
  cards.push(new Card(num, frontPics[num], frontPics[0]));
  if(i%2 == 0) num++;
}


//cards = shuffle(cards);

for(i = 1; i <= 12; i++){
  var cardTag = document.getElementById(i);
  cardTag.onclick = function(e) {
    img = window.event.srcElement;

    img.src = cards[img.id].frontPic;
  }
}