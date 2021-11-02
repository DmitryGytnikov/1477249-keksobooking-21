'use strict';

const MAX_OFFERS_NUMBER = 5;
const Budget = {
  LOW: `low`,
  MIDDLE: `middle`,
  HIGH: `high`
};
const Cost = {
  MIN: 10000,
  MAX: 50000
};

const mapFilters = document.querySelector(`.map__filters`);
const housingTypeFilter = mapFilters.querySelector(`#housing-type`);
const housingPriceFilter = mapFilters.querySelector(`#housing-price`);
const housingRoomsFilter = mapFilters.querySelector(`#housing-rooms`);
const housingGuestsFilter = mapFilters.querySelector(`#housing-guests`);
const housingFeatures = mapFilters.querySelector(`#housing-features`).querySelectorAll(`input`);

const filterHousingType = (offer) => {
  return (offer.offer.type === housingTypeFilter.value || housingTypeFilter.value === `any`) ? true : false;
};

const filterHousingPrice = (offer) => {
  switch (housingPriceFilter.value) {
    case Budget.LOW:
      return offer.offer.price < Cost.MIN;
    case Budget.MIDDLE:
      return offer.offer.price >= Cost.MIN && offer.offer.price <= Cost.MAX;
    case Budget.HIGH:
      return offer.offer.price > Cost.MIN;
    default:
      return offer;
  }
};

const filterHousingRooms = (offer) => {
  return (offer.offer.rooms === Number(housingRoomsFilter.value) || housingRoomsFilter.value === `any`) ? true : false;
};

const filterHousingGuests = (offer) => {
  return (offer.offer.guests === Number(housingGuestsFilter.value) || housingGuestsFilter.value === `any`) ? true : false;

};

const filterHousingFeatures = (offer) => {
  return Array.from(housingFeatures).filter((checkbox) => {
    return checkbox.checked;
  }).every((feature) => {
    return offer.offer.features.indexOf(feature.value) !== -1;
  });
};

const filter = (offers) => {
  mapFilters.addEventListener(`change`, window.debounce(() => {
    let filteredOffers = [];

    for (let i = 0; i < offers.length; i++) {
      const offer = offers[i];

      if (filterHousingType(offer) &&
          filterHousingPrice(offer) &&
          filterHousingRooms(offer) &&
          filterHousingGuests(offer) &&
          filterHousingFeatures(offer)
      ) {
        filteredOffers.push(offer);
      }
      if (filteredOffers.length === MAX_OFFERS_NUMBER) {
        break;
      }
    }

    window.util.removePins();
    window.offer.renderMany(filteredOffers);

    document.removeEventListener(`change`, filter);
  }));
};

window.filter = {
  filter
};
