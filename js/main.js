'use strict';

(() => {
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
      window.util.disableElementsTumbler(AD_FORM_FILDSETS, false);
      window.util.showElement(window.const.AD_FORM, AD_FORM_TUMBLER);
    }

    if (window.const.MAP.querySelectorAll(`.map__pin`).length >= 2) {
      window.util.disableElementsTumbler(MAP_FILTERS_CHILDS, false);
      window.util.disableElementsTumbler(MAP_FILTERS_FEATURES, false);
    }
  };

  let deactivatePage = () => {
    window.util.hideElement(window.const.MAP, MAP_TUMBLER);
    window.util.disableElementsTumbler(MAP_FILTERS_CHILDS, true);
    window.util.disableElementsTumbler(MAP_FILTERS_FEATURES, true);
    window.util.disableElementsTumbler(AD_FORM_FILDSETS, true);
    window.util.hideElement(window.const.AD_FORM, AD_FORM_TUMBLER);
  };

  window.util.disableElementsTumbler(MAP_FILTERS_CHILDS, true);
  window.util.disableElementsTumbler(AD_FORM_FILDSETS, true);
  window.util.disableElementsTumbler(MAP_FILTERS_FEATURES, true);

  window.const.MAP_PIN_MAIN.addEventListener(`mousedown`, activatePage);
  window.const.MAP_PIN_MAIN.addEventListener(`keydown`, activatePage);

  const successHandler = (offers) => {
    window.util.disableElementsTumbler(MAP_FILTERS_CHILDS, false);
    window.util.disableElementsTumbler(MAP_FILTERS_FEATURES, false);

    window.offer.renderOffers(offers);
    window.filter.filterOffers(offers);
  };

  const errorHandler = (errorMessage) => {
    window.util.createErrorMessage(errorMessage);

    window.util.disableElementsTumbler(MAP_FILTERS_CHILDS, true);
    window.util.disableElementsTumbler(MAP_FILTERS_FEATURES, true);
  };

  window.backend.load(successHandler, errorHandler);

  window.main = {
    deactivatePage: deactivatePage
  };
})();
