'use strict';

(() => {
  const PIN_TEMPLATE = document.querySelector(`#pin`)
    .content
    .querySelector(`button`);

  window.pin = {
    renderPin(pin) {
      const PIN_ELEMENT = PIN_TEMPLATE.cloneNode(true);
      const PIN_IMG = PIN_ELEMENT.querySelector(`img`);

      PIN_IMG.src = pin.author.avatar;
      PIN_IMG.alt = pin.offer.title;

      PIN_ELEMENT.style.left = `${pin.location.x - (PIN_ELEMENT.offsetWidth / 2)}px`;
      PIN_ELEMENT.style.top = `${pin.location.y - PIN_ELEMENT.offsetHeight}px`;

      return PIN_ELEMENT;
    },
  };
})();
