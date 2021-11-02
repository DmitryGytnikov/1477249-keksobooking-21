'use strict';

const main = document.querySelector(`main`);
const adForm = document.querySelector(`.ad-form`);
const adFormSuccessMessage = document.querySelector(`#success`).content.querySelector(`.success`);
const adFormErrorMessage = document.querySelector(`#error`).content.querySelector(`.error`);
let removableMessage;

const messageCloseHandler = (evt) => {
  if (evt.key !== `Escape` && evt.button !== 0) {
    return;
  }
  removableMessage.remove();
  document.removeEventListener(`keydown`, messageCloseHandler);
};

const show = (message) => {
  const adFormSuccessMessageElement = message.cloneNode(true);
  removableMessage = adFormSuccessMessageElement;
  main.appendChild(adFormSuccessMessageElement);

  document.addEventListener(`keydown`, messageCloseHandler);

  document.addEventListener(`click`, messageCloseHandler);

  if (message === adFormErrorMessage) {
    const adFormErrorButton = document.querySelector(`.error__button`);

    adFormErrorButton.addEventListener(`click`, messageCloseHandler);
  }
};

const errorFormHandler = () => {
  show(adFormErrorMessage);
};

const successFormHandler = () => {
  show(adFormSuccessMessage);

  adForm.reset();
  window.main.deactivatePage();
};

adForm.addEventListener(`submit`, (evt) => {
  evt.preventDefault();

  const data = new FormData(adForm);

  window.backend.saveData(data, successFormHandler, errorFormHandler);
});
