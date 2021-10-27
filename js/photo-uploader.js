'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`, `svg`];

const FileChooser = {
  AVATAR: window.const.AD_FORM.querySelector(`.ad-form__field input[type=file]`),
  PHOTO: window.const.AD_FORM.querySelector(`.ad-form__upload input[type=file]`)
};

const AVATAR_PREVIEW = window.const.AD_FORM.querySelector(`.ad-form-header__preview img`);
const PHOTO_BLOCK = window.const.AD_FORM.querySelector(`.ad-form__photo`);

let photo = document.createElement(`img`);
photo.width = 70;
photo.height = 70;

const PHOTO_PREVIEW = PHOTO_BLOCK.appendChild(photo);

let choosers = [FileChooser.AVATAR, FileChooser.PHOTO];
let previews = [AVATAR_PREVIEW, PHOTO_PREVIEW];

choosers.forEach((chooser, index) => {
  chooser.addEventListener(`change`, () => {
    let file = chooser.files[0];
    let fileName = file.name.toLowerCase();

    let matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();
      reader.addEventListener(`load`, () => {
        previews[index].src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
});
