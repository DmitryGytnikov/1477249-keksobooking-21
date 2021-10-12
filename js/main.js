'use strict';

const MAP = document.querySelector(`.map`);
const MAP_TUMBLER = `map--faded`;
const MAP_PINS = document.querySelector(`.map__pins`);
const MAP_PIN_MAIN = document.querySelector(`.map__pin--main`);
const MAP_FILTERS = document.querySelector(`.map__filters`);
const MAP_FILTERS_CHILDS = Array.from(MAP_FILTERS.children);
const AD_FORM = document.querySelector(`.ad-form`);
const AD_FORM_FILDSETS = Array.from(AD_FORM.querySelectorAll(`.ad-form > fieldset`));
const AD_FORM_TUMBLER = `ad-form--disabled`;
const AD_FORM_MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};
const ROOMS_FOR_GUESTS = {
  1: [`1`],
  2: [`1`, `2`],
  3: [`1`, `2`, `3`],
  100: [`0`]
};
const ADDRESS = AD_FORM.querySelector(`[name='address']`);
const PIN_SIZE = {
  width: 50,
  height: 70};
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

let disableElementsTumbler = (arr, mode) => {
  for (let i = 0; i < arr.length; i++) {
    arr[i].disabled = mode;

    if (mode === true) {
      arr[i].style.cursor = `default`;
    }
  }
};

let showElement = (elementClassName, removableClassName) => {
  elementClassName.classList.remove(removableClassName);
};

let activatePage = (evt) => {
  if (evt.button === 0 || evt.key === `Enter`) {
    showElement(MAP, MAP_TUMBLER);
    disableElementsTumbler(MAP_FILTERS_CHILDS, false);
    disableElementsTumbler(AD_FORM_FILDSETS, false);
    showElement(AD_FORM, AD_FORM_TUMBLER);
  }
};

let getAddress = () => {
  const x = MAP_PIN_MAIN.offsetLeft + PIN_SIZE.width / 2;
  const y = MAP_PIN_MAIN.offsetTop + PIN_SIZE.height;

  return `${x}, ${y}`;
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
        "address": `${locationX }, ${locationY}`,
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

ADDRESS.value = getAddress();

disableElementsTumbler(MAP_FILTERS_CHILDS, true);
disableElementsTumbler(AD_FORM_FILDSETS, true);

MAP_PIN_MAIN.addEventListener(`mousedown`, activatePage);
MAP_PIN_MAIN.addEventListener(`keydown`, activatePage);

// validation

AD_FORM.type.addEventListener(`input`, () => {
  AD_FORM.price.min = AD_FORM_MIN_PRICE[AD_FORM.type.value];
  AD_FORM.price.placeholder = AD_FORM_MIN_PRICE[AD_FORM.type.value];

  if (AD_FORM.price.value < AD_FORM_MIN_PRICE[AD_FORM.type.value]) {
    AD_FORM.price.setCustomValidity(`Недопустимая цена`);
  } else {
    AD_FORM.price.setCustomValidity(``);
  }

  AD_FORM.price.reportValidity();
});

AD_FORM.timein.addEventListener(`input`, (evt) => {
  if (evt.target === AD_FORM.timein) {
    AD_FORM.timeout.value = AD_FORM.timein.value;
  } else {
    AD_FORM.timein.value = AD_FORM.timeout.value;
  }
});

AD_FORM.timeout.addEventListener(`input`, (evt) => {
  if (evt.target === AD_FORM.timeout) {
    AD_FORM.timein.value = AD_FORM.timeout.value;
  } else {
    AD_FORM.timeout.value = AD_FORM.timein.value;
  }
});

AD_FORM.capacity.addEventListener(`input`, () => {
  if (ROOMS_FOR_GUESTS[AD_FORM.rooms.value].includes(AD_FORM.capacity.value)) {
    AD_FORM.capacity.setCustomValidity(``);
  } else {
    AD_FORM.capacity.setCustomValidity(`Недопустимое количество гостей`);
  }

  AD_FORM.capacity.reportValidity();
});
