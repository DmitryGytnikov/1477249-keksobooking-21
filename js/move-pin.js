'use strict';

const PinSize = {
  halfWidth: 32,
  height: 70
};
const YLimit = {
  MIN: 130,
  MAX: 630
};
const XLimit = {
  MIN: 0 - PinSize.halfWidth,
  MAX: window.const.MAP.clientWidth
};

let setAddress = (element, x, y) => {
  element.setAttribute(`value`, x + `, ` + y);
};

window.const.MAP_PIN_MAIN.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  let pinAddressX = parseInt(window.const.MAP_PIN_MAIN.style.left, 10) + PinSize.halfWidth;
  let pinAddressY = parseInt(window.const.MAP_PIN_MAIN.style.top, 10) + PinSize.height;

  setAddress(window.const.ADDRESS, pinAddressX, pinAddressY);

  let onMouseMove = (moveEvt) => {
    let shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    let coordX = window.const.MAP_PIN_MAIN.offsetLeft - shift.x;
    let coordY = window.const.MAP_PIN_MAIN.offsetTop - shift.y;

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    if (coordX >= XLimit.MIN && coordX + PinSize.halfWidth <= XLimit.MAX) {
      window.const.MAP_PIN_MAIN.style.left = coordX + `px`;
    }

    if (coordY + PinSize.height >= YLimit.MIN && coordY + PinSize.height <= YLimit.MAX) {
      window.const.MAP_PIN_MAIN.style.top = coordY + `px`;
    }

    pinAddressX = parseInt(window.const.MAP_PIN_MAIN.style.left, 10) + PinSize.halfWidth;
    pinAddressY = parseInt(window.const.MAP_PIN_MAIN.style.top, 10) + PinSize.height;

    setAddress(window.const.ADDRESS, pinAddressX, pinAddressY);
  };

  let onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});
