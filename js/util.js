'use strict';

const disableElements = (arr, mode) => {
  arr.forEach((element) => {
    element.disabled = mode;

    if (mode === true) {
      element.style.cursor = `default`;
    }
  });
};

const createErrorMessage = (errorMessage) => {
  const node = document.createElement(`div`);

  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `30px`;
  node.textContent = errorMessage;

  document.body.insertAdjacentElement(`afterbegin`, node);
};

const removePins = () => {
  const pins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);

  pins.forEach((element) => {
    element.remove();
  });
};

const noop = () => {};

window.util = {
  disableElements,
  createErrorMessage,
  removePins,
  noop
};
