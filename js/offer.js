'use strict';

(() => {
  const CARD_POPUP = document.querySelector(`#card`).content.querySelector(`.popup`);

  window.offer = {
    renderOffer(offer) {
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

      OFFER_CLOSE.addEventListener(`click`, () => {
        window.util.hideElement(OFFER_ELEMENT, window.const.TUMBLER);
      });

      OFFER_CLOSE.addEventListener(`keydown`, (evt) => {
        if (evt.key === `Enter`) {
          window.util.hideElement(OFFER_ELEMENT, window.const.TUMBLER);
        }
      });

      document.addEventListener(`keydown`, (evt) => {
        if (evt.key === `Escape`) {
          window.util.hideElement(OFFER_ELEMENT, window.const.TUMBLER);
        }
      });

      return OFFER_ELEMENT;
    },
  };
})();
