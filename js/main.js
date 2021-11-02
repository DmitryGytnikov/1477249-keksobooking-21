'use strict';

const MAP_FADED = `map--faded`;
const AD_FORM_DISABLED = `ad-form--disabled`;
const map = document.querySelector(`.map`);
const mapPinMain = document.querySelector(`.map__pin--main`);
const mapFilters = document.querySelector(`.map__filters`);
const mapFiltersChilds = Array.from(mapFilters.children);
const mapFeatures = document.querySelector(`.map__features`);
const mapFiltersFeatures = Array.from(mapFeatures.children);
const adForm = document.querySelector(`.ad-form`);
const adFormFildsets = Array.from(adForm.querySelectorAll(`.ad-form > fieldset`));
const resetBtn = adForm.querySelector(`.ad-form__reset`);
const avatarPreview = adForm.querySelector(`.ad-form-header__preview img`);
const housePhotoPreview = adForm.querySelector(`.ad-form__photo img`);
const defaultImg = `img/muffin-grey.svg`;

const successHandler = (offers) => {
  window.util.disableElements(mapFiltersChilds, false);
  window.util.disableElements(mapFiltersFeatures, false);
  window.offer.renderMany(offers);
  window.filter.filter(offers);
};

const errorHandler = (errorMessage) => {
  window.util.createErrorMessage(errorMessage);
  window.util.disableElements(mapFiltersChilds, true);
  window.util.disableElements(mapFiltersFeatures, true);
};

const pageActivationHandler = (evt) => {
  if (map.classList.contains(MAP_FADED) && evt.button === 0 || evt.key === `Enter`) {
    window.backend.loadData(successHandler, errorHandler);
    map.classList.remove(MAP_FADED);
    adForm.classList.remove(AD_FORM_DISABLED);
    window.util.disableElements(adFormFildsets, false);
    window.movepin.setAddress();
  }

  if (map.querySelectorAll(`.map__pin`).length >= 2) {
    window.util.disableElements(mapFiltersChilds, false);
    window.util.disableElements(mapFiltersFeatures, false);
  }
};

const deactivatePage = () => {
  adForm.reset();
  mapFilters.reset();
  map.classList.add(MAP_FADED);
  adForm.classList.add(AD_FORM_DISABLED);
  window.formvalidation.reset();
  window.util.removePins();
  window.util.disableElements(mapFiltersChilds, true);
  window.util.disableElements(mapFiltersFeatures, true);
  window.util.disableElements(adFormFildsets, true);
  window.movepin.resetMapPinMain();
  avatarPreview.src = defaultImg;
  housePhotoPreview.src = defaultImg;
};

resetBtn.addEventListener(`click`, () => {
  deactivatePage();
});

window.util.disableElements(mapFiltersChilds, true);
window.util.disableElements(adFormFildsets, true);
window.util.disableElements(mapFiltersFeatures, true);

mapPinMain.addEventListener(`mousedown`, pageActivationHandler);
mapPinMain.addEventListener(`keydown`, pageActivationHandler);

window.main = {
  deactivatePage
};
