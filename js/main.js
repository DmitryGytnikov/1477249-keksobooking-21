'use strict';

(() => {
  const MAP_TUMBLER = `map--faded`;
  const MAP_PINS = document.querySelector(`.map__pins`);
  const MAP_FILTERS = document.querySelector(`.map__filters`);
  const MAP_FILTERS_CHILDS = Array.from(MAP_FILTERS.children);
  const AD_FORM_FILDSETS = Array.from(window.const.AD_FORM.querySelectorAll(`.ad-form > fieldset`));
  const AD_FORM_TUMBLER = `ad-form--disabled`;
  const FRAGMENT = document.createDocumentFragment();
  const OFFERS_NUMBER = 8;

  let activatePage = (evt) => {
    if (evt.button === 0 || evt.key === `Enter`) {
      window.util.showElement(window.const.MAP, MAP_TUMBLER);
      window.util.disableElementsTumbler(MAP_FILTERS_CHILDS, false);
      window.util.disableElementsTumbler(AD_FORM_FILDSETS, false);
      window.util.showElement(window.const.AD_FORM, AD_FORM_TUMBLER);
    }
  };

  window.util.disableElementsTumbler(MAP_FILTERS_CHILDS, true);
  window.util.disableElementsTumbler(AD_FORM_FILDSETS, true);

  window.const.MAP_PIN_MAIN.addEventListener(`mousedown`, activatePage);
  window.const.MAP_PIN_MAIN.addEventListener(`keydown`, activatePage);

  const successHandler = (offers) => {
    if (offers.length >= OFFERS_NUMBER) {
      for (let i = 0; i < OFFERS_NUMBER; i++) {
        FRAGMENT.appendChild(window.pin.renderPin(offers[i]));
      }
    } else {
      for (let i = 0; i < offers.length; i++) {
        FRAGMENT.appendChild(window.pin.renderPin(offers[i]));
      }
    }

    MAP_PINS.appendChild(FRAGMENT);
  };

  const errorHandler = (errorMessage) => {
    window.util.createErrorMessage(errorMessage);
  };

  window.backend.load(successHandler, errorHandler);
})();
