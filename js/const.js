'use strict';

(() => {
  const MAP = document.querySelector(`.map`);
  const MAP_FILTER = MAP.querySelector(`.map__filters-container`);
  const MAP_PIN_MAIN = document.querySelector(`.map__pin--main`);
  const TUMBLER = `hidden`;
  const AD_FORM = document.querySelector(`.ad-form`);
  const ADDRESS = AD_FORM.querySelector(`[name='address']`);

  window.const = {
    MAP: MAP,
    MAP_FILTER: MAP_FILTER,
    MAP_PIN_MAIN: MAP_PIN_MAIN,
    TUMBLER: TUMBLER,
    AD_FORM: AD_FORM,
    ADDRESS: ADDRESS
  };
})();
