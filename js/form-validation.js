'use strict';

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
const adForm = document.querySelector(`.ad-form`);

const reset = () => {
  adForm.price.placeholder = AdFormMinPrice.flat;
};

adForm.price.addEventListener(`input`, () => {
  adForm.price.min = AdFormMinPrice[adForm.type.value];
  adForm.price.placeholder = AdFormMinPrice[adForm.type.value];

  if (adForm.price.value < AdFormMinPrice[adForm.type.value]) {
    adForm.price.setCustomValidity(`Недопустимая цена`);
  } else {
    adForm.price.setCustomValidity(``);
  }

  adForm.price.reportValidity();
});

adForm.type.addEventListener(`input`, (evt) => {
  if (evt.target === adForm.type) {
    adForm.price.placeholder = AdFormMinPrice[adForm.type.value];
  }
});

adForm.timein.addEventListener(`input`, (evt) => {
  if (evt.target === adForm.timein) {
    adForm.timeout.value = adForm.timein.value;
  } else {
    adForm.timein.value = adForm.timeout.value;
  }
});

adForm.timeout.addEventListener(`input`, (evt) => {
  if (evt.target === adForm.timeout) {
    adForm.timein.value = adForm.timeout.value;
  } else {
    adForm.timeout.value = adForm.timein.value;
  }
});

adForm.capacity.addEventListener(`input`, () => {
  if (RoomsForGuests[adForm.rooms.value].includes(adForm.capacity.value)) {
    adForm.capacity.setCustomValidity(``);
  } else {
    adForm.capacity.setCustomValidity(`Недопустимое количество гостей`);
  }

  adForm.capacity.reportValidity();
});
window.formvalidation = {
  reset
};
