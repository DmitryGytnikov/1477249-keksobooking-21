'use strict';

const MAP = `.map`;
const MAP_TUMBLER = `map--faded`;
const MAP_PINS = document.querySelector(`.map__pins`);
const PIN_TEMPLATE = document.querySelector(`#pin`)
  .content
  .querySelector(`button`);
const MAP_WIDTH = document.querySelector(`.map__pins`).offsetWidth;
// console.log(MAP_WIDTH);
const PLACE_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const CHECK_TIME = [`12:00`, `13:00`, `14:00`];
const FEATURES_LIST = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const MAP_Y_TOP = 130;
const MAP_Y_BOTTOM = 630;
const FRAGMENT = document.createDocumentFragment();
const OFFERS_NUMBER = 8;

let getRandomNumber = (num) => {
  return (Math.round(Math.random() * num));
};

let getRandomElement = (arr) => {
  return arr[Math.round(Math.random() * Math.round(arr.length - 1))];
};

let getRandomArray = (arr) => {
  let newArray = [];

  newArray = arr.slice(getRandomNumber(arr.length - 1));

  return newArray;
};

let removeClass = (element, className, removableClassName) => {
  element.querySelector(className).classList.remove(removableClassName);
};

let getAvatar = (num) => {
  let avatar = ``;

  avatar = `img/avatars/user0` + num + `.png`;

  return avatar;
};

let getPrice = (num) => {
  let price;

  price = 1000 * num;

  return price;
};

let renderOffersList = (num) => {
  let offer = [];

  for (let i = 0; i < num; i++) {
    let locationX = Math.round(Math.random() * (MAP_WIDTH - 50));
    let locationY = Math.round(Math.random() * (MAP_Y_BOTTOM - MAP_Y_TOP)) + MAP_Y_TOP;

    offer[i] = {
      "author": {
        "avatar": getAvatar(i + 1)
      },
      "offer": {
        "title": `Уютная квартира в центре Кексограда`,
        "address": locationX + `, ` + locationY,
        "price": getPrice(getRandomNumber(9) + i),
        "type": getRandomElement(PLACE_TYPE),
        "rooms": getRandomNumber(3) + 1,
        "guests": getRandomNumber(2),
        "checkin": getRandomElement(CHECK_TIME),
        "checkout": getRandomElement(CHECK_TIME),
        "features": getRandomArray(FEATURES_LIST),
        "description": `Аутентичное жилье в историческом центре города. Все главные достопримечательности в пешей доступности.`,
        "photos": getRandomArray(PHOTOS),
      },
      "location": {
        "x": locationX,
        "y": locationY,
      }
    };
  }

  return offer;
};

let offersList = renderOffersList(OFFERS_NUMBER);
// console.log(offersList);

let renderPin = (pin) => {
  const PIN_ELEMENT = PIN_TEMPLATE.cloneNode(true);
  const PIN_IMG = PIN_ELEMENT.querySelector(`img`);

  PIN_IMG.src = pin.author.avatar;
  PIN_IMG.alt = pin.offer.title;

  PIN_ELEMENT.style.left = `${pin.location.x - (PIN_ELEMENT.offsetWidth / 2)}px`;
  PIN_ELEMENT.style.top = `${pin.location.y - PIN_ELEMENT.offsetHeight}px`;

  return PIN_ELEMENT;
};

for (let i = 0; i < offersList.length; i++) {
  FRAGMENT.appendChild(renderPin(offersList[i]));
}

MAP_PINS.appendChild(FRAGMENT);
// console.log(MAP_PINS.children);

removeClass(document, MAP, MAP_TUMBLER);
