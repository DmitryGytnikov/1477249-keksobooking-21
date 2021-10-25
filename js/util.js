'use strict';

(() => {
  window.util = {
    getRandomNumber(num) {
      return (Math.round(Math.random() * num));
    },

    getRandomElement(arr) {
      return arr[Math.round(Math.random() * Math.round(arr.length - 1))];
    },

    getRandomArray(num, arr) {
      let randomArr = [];

      for (let i = 0; i < num; i++) {
        let newIndex = window.util.getRandomNumber(arr.length - 1);

        randomArr.push(arr[newIndex]);
        arr.splice(newIndex, 1);
      }

      return randomArr;
    },

    disableElementsTumbler(arr, mode) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].disabled = mode;

        if (mode === true) {
          arr[i].style.cursor = `default`;
        }
      }
    },

    showElement(element, tumbler) {
      element.classList.remove(tumbler);
    },

    hideElement(element, tumbler) {
      element.classList.add(tumbler);
    },

    createErrorMessage(errorMessage) {
      const node = document.createElement(`div`);

      node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
      node.style.position = `absolute`;
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = `30px`;
      node.textContent = errorMessage;

      document.body.insertAdjacentElement(`afterbegin`, node);
    },

    removePins() {
      const PINS = window.const.MAP.querySelectorAll(`.map__pin:not(.map__pin--main)`);

      PINS.forEach((element) => {
        element.remove();
      });
    },

    noop() {},
  };
})();
