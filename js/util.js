'use strict';

(() => {
  let disableElements = (arr, mode) => {
    for (let i = 0; i < arr.length; i++) {
      arr[i].disabled = mode;

      if (mode === true) {
        arr[i].style.cursor = `default`;
      }
    }
  };

  let showElement = (element, tumbler) => {
    element.classList.remove(tumbler);
  };

  let hideElement = (element, tumbler) => {
    element.classList.add(tumbler);
  };

  let createErrorMessage = (errorMessage) => {
    const node = document.createElement(`div`);

    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;
    node.textContent = errorMessage;

    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  let removePins = () => {
    const PINS = window.const.MAP.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    PINS.forEach((element) => {
      element.remove();
    });
  };

  let noop = () => {};

  window.util = {
    disableElements,
    showElement,
    hideElement,
    createErrorMessage,
    removePins,
    noop
  };
})();
