'use strict';

(() => {
  const AD_FORM = document.querySelector(`.ad-form`);
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


  AD_FORM.price.addEventListener(`input`, () => {
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

  ADDRESS.value = window.mock.getAddress();
})();