'use strict';

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
