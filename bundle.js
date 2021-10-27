/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!********************!*\
  !*** ./js/util.js ***!
  \********************/


let disableElements = (arr, mode) => {
  for (let i = 0; i < arr.length; i++) {
    arr[i].disabled = mode;

    if (mode === true) {
      arr[i].style.cursor = `default`;
    }
  }
};

let showElement = (element, tumbler) => {
  element.classList.remove(tumbler);
};

let hideElement = (element, tumbler) => {
  element.classList.add(tumbler);
};

let createErrorMessage = (errorMessage) => {
  const node = document.createElement(`div`);

  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `30px`;
  node.textContent = errorMessage;

  document.body.insertAdjacentElement(`afterbegin`, node);
};

let removePins = () => {
  const PINS = window.const.MAP.querySelectorAll(`.map__pin:not(.map__pin--main)`);

  PINS.forEach((element) => {
    element.remove();
  });
};

let noop = () => {};

window.util = {
  disableElements,
  showElement,
  hideElement,
  createErrorMessage,
  removePins,
  noop
};

})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!***********************!*\
  !*** ./js/backend.js ***!
  \***********************/


const RequestMethod = {
  GET: `GET`,
  POST: `POST`
};
const RequestURL = {
  GET: `https://21.javascript.pages.academy/keksobooking/data`,
  POST: `https://21.javascript.pages.academy/keksobooking`
};
const StatusCode = {
  OK: 200
};
const TIMEOUT_IN_MS = 10000;

const statusHandler = (xhr, onLoad, onError) => {
  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onLoad(xhr.response);
    } else {
      onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });
};

let makeRequest = (method, url, onLoad, onError = window.util.noop) => {
  let xhr = new XMLHttpRequest();

  xhr.responseType = `json`;
  xhr.open(method, url);
  xhr.timeout = TIMEOUT_IN_MS;

  statusHandler(xhr, onLoad, onError);

  return xhr;
};

let loadData = (onLoad, onError) => {
  makeRequest(RequestMethod.GET, RequestURL.GET, onLoad, onError).send();
};

let saveData = (data, onLoad, onError) => {
  makeRequest(RequestMethod.POST, RequestURL.POST, onLoad, onError).send(data);
};

window.backend = {
  loadData,
  saveData
};

})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!*********************!*\
  !*** ./js/const.js ***!
  \*********************/


const AD_FORM = document.querySelector(`.ad-form`);
const ADDRESS = AD_FORM.querySelector(`[name='address']`);
const MAP = document.querySelector(`.map`);
const AD_FORM_FILDSETS = Array.from(AD_FORM.querySelectorAll(`.ad-form > fieldset`));
const MAP_FILTER = MAP.querySelector(`.map__filters-container`);
const MAP_FILTERS = document.querySelector(`.map__filters`);
const MAP_FILTERS_CHILDS = Array.from(MAP_FILTERS.children);
const MAP_PIN_MAIN = document.querySelector(`.map__pin--main`);
const TUMBLER = `hidden`;

window.const = {
  AD_FORM,
  ADDRESS,
  AD_FORM_FILDSETS,
  MAP_FILTER,
  MAP_FILTERS_CHILDS,
  MAP_FILTERS,
  MAP_PIN_MAIN,
  MAP,
  TUMBLER
};

})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!************************!*\
  !*** ./js/debounce.js ***!
  \************************/


const DEBOUNCE_INTERVAL = 500;

window.debounce = (cb) => {
  let lastTimeout = null;

  return (...parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};

})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!**********************!*\
  !*** ./js/filter.js ***!
  \**********************/


const Budget = {
  LOW: `low`,
  MIDDLE: `middle`,
  HIGH: `high`
};
const Cost = {
  MIN: 10000,
  MAX: 50000
};

let filterOffers = (offers) => {
  window.const.MAP_FILTERS.addEventListener(`change`, window.debounce(() => {
    const FILTERS = Object.fromEntries(new FormData(window.const.MAP_FILTERS).entries());

    const FILTERED_OFFERS = offers.filter((offer) => {
      return offer.offer.type === FILTERS[`housing-type`] || FILTERS[`housing-type`] === `any`;
    }).filter((offer) => {
      return offer.offer.rooms === parseInt(FILTERS[`housing-rooms`], 10) || FILTERS[`housing-rooms`] === `any`;
    }).filter((offer) => {
      return offer.offer.guests === parseInt(FILTERS[`housing-guests`], 10) || FILTERS[`housing-guests`] === `any`;
    }).filter((offer) => {
      switch (FILTERS[`housing-price`]) {
        case Budget.LOW:
          return offer.offer.price < Cost.MIN;
        case Budget.MIDDLE:
          return offer.offer.price >= Cost.MIN && offer.offer.price <= Cost.MAX;
        case Budget.HIGH:
          return offer.offer.price > Cost.MIN;
        default:
          return offer;
      }
    }).filter((offer) => {
      return offer.offer.features.includes(FILTERS[`features`]) || FILTERS[`features`] === undefined;
    });

    window.util.removePins();

    window.offer.renderOffers(FILTERED_OFFERS);
  }));
};

window.filter = {
  filterOffers
};

})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!*******************!*\
  !*** ./js/pin.js ***!
  \*******************/


const PIN_TEMPLATE = document.querySelector(`#pin`)
.content
.querySelector(`button`);

let renderPin = (offer) => {
  const PIN_ELEMENT = PIN_TEMPLATE.cloneNode(true);
  const PIN_IMG = PIN_ELEMENT.querySelector(`img`);

  PIN_IMG.src = offer.author.avatar;
  PIN_IMG.alt = offer.offer.title;

  PIN_ELEMENT.style.left = `${offer.location.x - (PIN_ELEMENT.offsetWidth / 2)}px`;
  PIN_ELEMENT.style.top = `${offer.location.y - PIN_ELEMENT.offsetHeight}px`;

  PIN_ELEMENT.addEventListener(`click`, () => {
    const MAP_CARD = window.const.MAP.querySelector(`.map__card`);

    if (MAP_CARD) {
      MAP_CARD.remove();
    }

    window.const.MAP.insertBefore(window.offer.renderOffer(offer), window.const.MAP_FILTER);
  });

  return PIN_ELEMENT;
};

window.pin = {
  renderPin
};

})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!******************************!*\
  !*** ./js/photo-uploader.js ***!
  \******************************/


const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`, `svg`];

const FileChooser = {
  AVATAR: window.const.AD_FORM.querySelector(`.ad-form__field input[type=file]`),
  PHOTO: window.const.AD_FORM.querySelector(`.ad-form__upload input[type=file]`)
};

const AVATAR_PREVIEW = window.const.AD_FORM.querySelector(`.ad-form-header__preview img`);
const PHOTO_BLOCK = window.const.AD_FORM.querySelector(`.ad-form__photo`);

let photo = document.createElement(`img`);
photo.width = 70;
photo.height = 70;

const PHOTO_PREVIEW = PHOTO_BLOCK.appendChild(photo);

let choosers = [FileChooser.AVATAR, FileChooser.PHOTO];
let previews = [AVATAR_PREVIEW, PHOTO_PREVIEW];

choosers.forEach((chooser, index) => {
  chooser.addEventListener(`change`, () => {
    let file = chooser.files[0];
    let fileName = file.name.toLowerCase();

    let matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();
      reader.addEventListener(`load`, () => {
        previews[index].src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
});

})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!*********************!*\
  !*** ./js/offer.js ***!
  \*********************/


const MAP_PINS = document.querySelector(`.map__pins`);
const FRAGMENT = document.createDocumentFragment();
const CARD_POPUP = document.querySelector(`#card`).content.querySelector(`.popup`);
const MAX_OFFERS_NUMBER = 5;

let closeOffer = (element, button) => {
  button.addEventListener(`click`, () => {
    window.util.hideElement(element, window.const.TUMBLER);
  });

  button.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      window.util.hideElement(element, window.const.TUMBLER);
    }
  });

  window.const.MAP_FILTERS.addEventListener(`change`, () => {
    window.util.hideElement(element, window.const.TUMBLER);
  });

  document.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Escape`) {
      window.util.hideElement(element, window.const.TUMBLER);
    }
  });
};

let renderOffer = (offer) => {
  const OFFER_ELEMENT = CARD_POPUP.cloneNode(true);
  const Offer = {
    TITLE: OFFER_ELEMENT.querySelector(`.popup__title`),
    ADDRESS: OFFER_ELEMENT.querySelector(`.popup__text--address`),
    PRICE: OFFER_ELEMENT.querySelector(`.popup__text--price`),
    TYPE: OFFER_ELEMENT.querySelector(`.popup__type`),
    CAPACITY: OFFER_ELEMENT.querySelector(`.popup__text--capacity`),
    TIME: OFFER_ELEMENT.querySelector(`.popup__text--time`),
    FEATURES: OFFER_ELEMENT.querySelector(`.popup__features`),
    DESCRIPTION: OFFER_ELEMENT.querySelector(`.popup__description`),
    AVATAR: OFFER_ELEMENT.querySelector(`.popup__avatar`),
    PHOTOS: OFFER_ELEMENT.querySelector(`.popup__photos`),
  };
  const PHOTO_ITEM = Offer.PHOTOS.querySelector(`.popup__photo`);
  const OfferTypes = {
    flat: `Квартира`,
    bungalow: `Бунгало`,
    house: `Дом`,
    palace: `Дворец`,
  };
  const OFFER_CLOSE = OFFER_ELEMENT.querySelector(`.popup__close`);
  Offer.ADDRESS.textContent = offer.offer.address;
  Offer.PRICE.textContent = offer.offer.price.toLocaleString() + ` ₽/ночь`;
  Offer.TITLE.textContent = offer.offer.title;
  Offer.CAPACITY.textContent = offer.offer.rooms + ` комнаты для ` + offer.offer.guests + ` гостей`;
  Offer.TIME.textContent = `Заезд после ` + offer.offer.checkin + `, выезд до ` + offer.offer.checkout;
  Offer.DESCRIPTION.textContent = offer.offer.description;
  Offer.AVATAR.src = offer.author.avatar;
  Offer.TYPE.textContent = OfferTypes[offer.offer.type];

  offer.offer.photos.forEach((photo) => {
    const PHOTO = PHOTO_ITEM.cloneNode(true);

    PHOTO.src = photo;
    Offer.PHOTOS.appendChild(PHOTO);
  });

  PHOTO_ITEM.remove();

  offer.offer.features.forEach((feature) => {
    window.util.showElement(Offer.FEATURES.querySelector(`.popup__feature--` + feature), window.const.TUMBLER);
  });

  closeOffer(OFFER_ELEMENT, OFFER_CLOSE);

  return OFFER_ELEMENT;
};

let renderOffers = (offers) => {
  if (offers.length >= MAX_OFFERS_NUMBER) {
    for (let i = 0; i < MAX_OFFERS_NUMBER; i++) {
      FRAGMENT.appendChild(window.pin.renderPin(offers[i]));
    }
  } else {
    for (let i = 0; i < offers.length; i++) {
      FRAGMENT.appendChild(window.pin.renderPin(offers[i]));
    }
  }

  MAP_PINS.appendChild(FRAGMENT);
};

window.offer = {
  closeOffer,
  renderOffer,
  renderOffers
};

})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!************************!*\
  !*** ./js/move-pin.js ***!
  \************************/


const PinSize = {
  halfWidth: 32,
  height: 70
};
const YLimit = {
  MIN: 130,
  MAX: 630
};
const XLimit = {
  MIN: 0 - PinSize.halfWidth,
  MAX: window.const.MAP.clientWidth
};

let setAddress = (element, x, y) => {
  element.setAttribute(`value`, x + `, ` + y);
};

window.const.MAP_PIN_MAIN.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  let pinAddressX = parseInt(window.const.MAP_PIN_MAIN.style.left, 10) + PinSize.halfWidth;
  let pinAddressY = parseInt(window.const.MAP_PIN_MAIN.style.top, 10) + PinSize.height;

  setAddress(window.const.ADDRESS, pinAddressX, pinAddressY);

  let onMouseMove = (moveEvt) => {
    let shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    let coordX = window.const.MAP_PIN_MAIN.offsetLeft - shift.x;
    let coordY = window.const.MAP_PIN_MAIN.offsetTop - shift.y;

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    if (coordX >= XLimit.MIN && coordX + PinSize.halfWidth <= XLimit.MAX) {
      window.const.MAP_PIN_MAIN.style.left = coordX + `px`;
    }

    if (coordY + PinSize.height >= YLimit.MIN && coordY + PinSize.height <= YLimit.MAX) {
      window.const.MAP_PIN_MAIN.style.top = coordY + `px`;
    }

    pinAddressX = parseInt(window.const.MAP_PIN_MAIN.style.left, 10) + PinSize.halfWidth;
    pinAddressY = parseInt(window.const.MAP_PIN_MAIN.style.top, 10) + PinSize.height;

    setAddress(window.const.ADDRESS, pinAddressX, pinAddressY);
  };

  let onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});

})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!*************************!*\
  !*** ./js/form-send.js ***!
  \*************************/


const MAIN = document.querySelector(`main`);
const AD_FORM_SUCCESS_MESSAGE = document.querySelector(`#success`).content.querySelector(`.success`);
const AD_FORM_ERROR_MESSAGE = document.querySelector(`#error`).content.querySelector(`.error`);

let showSuccessMessage = () => {
  const AD_FORM_SUCCESS_MESSAGE_ELEMENT = AD_FORM_SUCCESS_MESSAGE.cloneNode(true);

  MAIN.appendChild(AD_FORM_SUCCESS_MESSAGE_ELEMENT);

  document.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Escape`) {
      window.util.hideElement(AD_FORM_SUCCESS_MESSAGE_ELEMENT, `hidden`);
    }
  });

  document.addEventListener(`click`, () => {
    window.util.hideElement(AD_FORM_SUCCESS_MESSAGE_ELEMENT, `hidden`);
  });
};

let showErrorMessage = () => {
  const AD_FORM_ERROR_MESSAGE_ELEMENT = AD_FORM_ERROR_MESSAGE.cloneNode(true);

  MAIN.appendChild(AD_FORM_ERROR_MESSAGE_ELEMENT);

  const AD_FORM_ERROR_BUTTON = document.querySelector(`.error__button`);

  AD_FORM_ERROR_BUTTON.addEventListener(`click`, () => {
    window.util.hideElement(AD_FORM_ERROR_MESSAGE_ELEMENT, `hidden`);
  });

  document.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Escape`) {
      window.util.hideElement(AD_FORM_ERROR_MESSAGE_ELEMENT, `hidden`);
    }
  });

  document.addEventListener(`click`, () => {
    window.util.hideElement(AD_FORM_ERROR_MESSAGE_ELEMENT, `hidden`);
  });
};

const successFormHandler = () => {
  showSuccessMessage();

  window.const.AD_FORM.reset();
  window.main.deactivatePage();
};

window.const.AD_FORM.addEventListener(`submit`, (evt) => {
  evt.preventDefault();

  const DATA = new FormData(window.const.AD_FORM);

  window.backend.saveData(DATA, successFormHandler, showErrorMessage);
});

})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!*******************************!*\
  !*** ./js/form-validation.js ***!
  \*******************************/


const AdFormMinPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};
const RoomsForGuests = {
  1: [`1`],
  2: [`1`, `2`],
  3: [`1`, `2`, `3`],
  100: [`0`]
};

window.const.AD_FORM.price.addEventListener(`input`, () => {
  window.const.AD_FORM.price.min = AdFormMinPrice[window.const.AD_FORM.type.value];
  window.const.AD_FORM.price.placeholder = AdFormMinPrice[window.const.AD_FORM.type.value];

  if (window.const.AD_FORM.price.value < AdFormMinPrice[window.const.AD_FORM.type.value]) {
    window.const.AD_FORM.price.setCustomValidity(`Недопустимая цена`);
  } else {
    window.const. AD_FORM.price.setCustomValidity(``);
  }

  window.const.AD_FORM.price.reportValidity();
});

window.const.AD_FORM.timein.addEventListener(`input`, (evt) => {
  if (evt.target === window.const.AD_FORM.timein) {
    window.const.AD_FORM.timeout.value = window.const.AD_FORM.timein.value;
  } else {
    window.const.AD_FORM.timein.value = window.const.AD_FORM.timeout.value;
  }
});

window.const.AD_FORM.timeout.addEventListener(`input`, (evt) => {
  if (evt.target === window.const.AD_FORM.timeout) {
    window.const.AD_FORM.timein.value = window.const.AD_FORM.timeout.value;
  } else {
    window.const.AD_FORM.timeout.value = window.const.AD_FORM.timein.value;
  }
});

window.const.AD_FORM.capacity.addEventListener(`input`, () => {
  if (RoomsForGuests[window.const.AD_FORM.rooms.value].includes(window.const.AD_FORM.capacity.value)) {
    window.const.AD_FORM.capacity.setCustomValidity(``);
  } else {
    window.const.AD_FORM.capacity.setCustomValidity(`Недопустимое количество гостей`);
  }

  window.const.AD_FORM.capacity.reportValidity();
});

})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/


const MAP_TUMBLER = `map--faded`;
const MAP_FILTERS = document.querySelector(`.map__filters`);
const MAP_FEATURES = document.querySelector(`.map__features`);
const MAP_FILTERS_CHILDS = Array.from(MAP_FILTERS.children);
const MAP_FILTERS_FEATURES = Array.from(MAP_FEATURES.children);
const AD_FORM_FILDSETS = Array.from(window.const.AD_FORM.querySelectorAll(`.ad-form > fieldset`));
const AD_FORM_TUMBLER = `ad-form--disabled`;

let activatePage = (evt) => {
  if (evt.button === 0 || evt.key === `Enter`) {
    window.util.showElement(window.const.MAP, MAP_TUMBLER);
    window.util.disableElements(AD_FORM_FILDSETS, false);
    window.util.showElement(window.const.AD_FORM, AD_FORM_TUMBLER);
  }

  if (window.const.MAP.querySelectorAll(`.map__pin`).length >= 2) {
    window.util.disableElements(MAP_FILTERS_CHILDS, false);
    window.util.disableElements(MAP_FILTERS_FEATURES, false);
  }
};

let deactivatePage = () => {
  window.util.hideElement(window.const.MAP, MAP_TUMBLER);
  window.util.disableElements(MAP_FILTERS_CHILDS, true);
  window.util.disableElements(MAP_FILTERS_FEATURES, true);
  window.util.disableElements(AD_FORM_FILDSETS, true);
  window.util.hideElement(window.const.AD_FORM, AD_FORM_TUMBLER);
};

window.util.disableElements(MAP_FILTERS_CHILDS, true);
window.util.disableElements(AD_FORM_FILDSETS, true);
window.util.disableElements(MAP_FILTERS_FEATURES, true);

window.const.MAP_PIN_MAIN.addEventListener(`mousedown`, activatePage);
window.const.MAP_PIN_MAIN.addEventListener(`keydown`, activatePage);

const successHandler = (offers) => {
  window.util.disableElements(MAP_FILTERS_CHILDS, false);
  window.util.disableElements(MAP_FILTERS_FEATURES, false);

  window.offer.renderOffers(offers);
  window.filter.filterOffers(offers);
};

const errorHandler = (errorMessage) => {
  window.util.createErrorMessage(errorMessage);

  window.util.disableElements(MAP_FILTERS_CHILDS, true);
  window.util.disableElements(MAP_FILTERS_FEATURES, true);
};

window.backend.loadData(successHandler, errorHandler);

window.main = {
  deactivatePage
};

})();

/******/ })()
;
