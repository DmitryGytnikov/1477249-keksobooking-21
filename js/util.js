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

    showElement(elementClassName, removableClassName) {
      elementClassName.classList.remove(removableClassName);
    }
  };
})();
