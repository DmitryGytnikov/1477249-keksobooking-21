'use strict';

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
