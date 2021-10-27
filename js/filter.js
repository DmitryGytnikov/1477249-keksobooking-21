'use strict';

const Budget = {
  LOW: `low`,
  MIDDLE: `middle`,
  HIGH: `high`
};
const Cost = {
  MIN: 10000,
  MAX: 50000
};

let filterOffers = (offers) => {
  window.const.MAP_FILTERS.addEventListener(`change`, window.debounce(() => {
    const FILTERS = Object.fromEntries(new FormData(window.const.MAP_FILTERS).entries());

    const FILTERED_OFFERS = offers.filter((offer) => {
      return offer.offer.type === FILTERS[`housing-type`] || FILTERS[`housing-type`] === `any`;
    }).filter((offer) => {
      return offer.offer.rooms === parseInt(FILTERS[`housing-rooms`], 10) || FILTERS[`housing-rooms`] === `any`;
    }).filter((offer) => {
      return offer.offer.guests === parseInt(FILTERS[`housing-guests`], 10) || FILTERS[`housing-guests`] === `any`;
    }).filter((offer) => {
      switch (FILTERS[`housing-price`]) {
        case Budget.LOW:
          return offer.offer.price < Cost.MIN;
        case Budget.MIDDLE:
          return offer.offer.price >= Cost.MIN && offer.offer.price <= Cost.MAX;
        case Budget.HIGH:
          return offer.offer.price > Cost.MIN;
        default:
          return offer;
      }
    }).filter((offer) => {
      return offer.offer.features.includes(FILTERS[`features`]) || FILTERS[`features`] === undefined;
    });

    window.util.removePins();

    window.offer.renderOffers(FILTERED_OFFERS);
  }));
};

window.filter = {
  filterOffers
};
