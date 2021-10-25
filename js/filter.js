'use strict';

(() => {
  let filterOffers = (offers) => {
    window.const.MAP_FILTERS.addEventListener(`change`, () => {
      const FILTERS = Object.fromEntries(new FormData(window.const.MAP_FILTERS).entries());

      const FILTERED_OFFERS = offers.filter((offer) => {
        return offer.offer.type === FILTERS[`housing-type`] || FILTERS[`housing-type`] === `any`;
      });

      window.util.removePins();

      window.offer.renderOffers(FILTERED_OFFERS);
    });
  };

  window.filter = {
    filterOffers: filterOffers
  };
})();
