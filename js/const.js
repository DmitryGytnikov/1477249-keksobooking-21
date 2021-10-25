'use strict';

(() => {
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
    AD_FORM: AD_FORM,
    ADDRESS: ADDRESS,
    AD_FORM_FILDSETS: AD_FORM_FILDSETS,
    MAP_FILTER: MAP_FILTER,
    MAP_FILTERS_CHILDS: MAP_FILTERS_CHILDS,
    MAP_FILTERS: MAP_FILTERS,
    MAP_PIN_MAIN: MAP_PIN_MAIN,
    MAP: MAP,
    TUMBLER: TUMBLER
  };
})();
