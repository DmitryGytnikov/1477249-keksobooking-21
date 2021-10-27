'use strict';

const PIN_TEMPLATE = document.querySelector(`#pin`)
.content
.querySelector(`button`);

let renderPin = (offer) => {
  const PIN_ELEMENT = PIN_TEMPLATE.cloneNode(true);
  const PIN_IMG = PIN_ELEMENT.querySelector(`img`);

  PIN_IMG.src = offer.author.avatar;
  PIN_IMG.alt = offer.offer.title;

  PIN_ELEMENT.style.left = `${offer.location.x - (PIN_ELEMENT.offsetWidth / 2)}px`;
  PIN_ELEMENT.style.top = `${offer.location.y - PIN_ELEMENT.offsetHeight}px`;

  PIN_ELEMENT.addEventListener(`click`, () => {
    const MAP_CARD = window.const.MAP.querySelector(`.map__card`);

    if (MAP_CARD) {
      MAP_CARD.remove();
    }

    window.const.MAP.insertBefore(window.offer.renderOffer(offer), window.const.MAP_FILTER);
  });

  return PIN_ELEMENT;
};

window.pin = {
  renderPin
};
