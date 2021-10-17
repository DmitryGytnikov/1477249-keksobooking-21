'use strict';

(() => {
  window.util = {
    getRandomNumber(num) {
      return (Math.round(Math.random() * num));
    },

    getRandomElement(arr) {
      return arr[Math.round(Math.random() * Math.round(arr.length - 1))];
    },

    getRandomArray(arr) {
      let newArray = [];

      newArray = arr.slice(window.util.getRandomNumber(arr.length - 1));

      return newArray;
    },

    disableElementsTumbler(arr, mode) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].disabled = mode;

        if (mode === true) {
          arr[i].style.cursor = `default`;
        }
      }
    },

    showElement(elementClassName, removableClassName) {
      elementClassName.classList.remove(removableClassName);
    }
  };
})();
