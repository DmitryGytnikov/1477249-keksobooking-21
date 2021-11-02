'use strict';

const fileTypes = [`gif`, `jpg`, `jpeg`, `png`, `svg`];
const adForm = document.querySelector(`.ad-form`);

const FileChooser = {
  AVATAR: adForm.querySelector(`.ad-form__field input[type=file]`),
  PHOTO: adForm.querySelector(`.ad-form__upload input[type=file]`)
};
const avatarPreview = adForm.querySelector(`.ad-form-header__preview img`);
const photoBlock = adForm.querySelector(`.ad-form__photo`);

const photo = document.createElement(`img`);
photo.width = 70;
photo.height = 70;

const photoPreview = photoBlock.appendChild(photo);

const choosers = [FileChooser.AVATAR, FileChooser.PHOTO];
const previews = [avatarPreview, photoPreview];

choosers.forEach((chooser, index) => {
  chooser.addEventListener(`change`, () => {
    let file = chooser.files[0];
    let fileName = file.name.toLowerCase();

    let matches = fileTypes.some((it) => {
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
