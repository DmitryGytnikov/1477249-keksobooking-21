'use strict';

(() => {
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
