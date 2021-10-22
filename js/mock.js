// 'use strict';

// (() => {
//   const MAP_PIN_MAIN = document.querySelector(`.map__pin--main`);
//   const MAP_WIDTH = document.querySelector(`.map__overlay`).offsetWidth;
//   const PLACE_TYPE = [`palace`, `flat`, `house`, `bungalow`];
//   const CHECK_TIME = [`12:00`, `13:00`, `14:00`];
//   const FEATURES_LIST = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
//   const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
//   const MAP_Y_TOP = 130;
//   const MAP_Y_BOTTOM = 630;
//   const PIN_SIZE = {
//     width: 50,
//     height: 70};

//   window.mock = {
//     getAddress() {
//       const x = MAP_PIN_MAIN.offsetLeft + PIN_SIZE.width / 2;
//       const y = MAP_PIN_MAIN.offsetTop + PIN_SIZE.height;

//       return `${x}, ${y}`;
//     },

//     getAvatar(num) {
//       let avatar = ``;

//       avatar = `img/avatars/user0` + num + `.png`;

//       return avatar;
//     },

//     getPrice(num) {
//       let price;

//       price = 1000 * num;

//       return price;
//     },

//     renderOffersList(num) {
//       let offer = [];

//       for (let i = 0; i < num; i++) {
//         let locationX = Math.round(Math.random() * (MAP_WIDTH - 50));
//         let locationY = Math.round(Math.random() * (MAP_Y_BOTTOM - MAP_Y_TOP)) + MAP_Y_TOP;

//         offer[i] = {
//           "author": {
//             "avatar": window.mock.getAvatar(i + 1)
//           },
//           "offer": {
//             "title": `Уютная квартира в центре Кексограда`,
//             "address": `${locationX }, ${locationY}`,
//             "price": window.mock.getPrice(window.util.getRandomNumber(9) + i),
//             "type": window.util.getRandomElement(PLACE_TYPE),
//             "rooms": window.util.getRandomNumber(3) + 1,
//             "guests": window.util.getRandomNumber(2),
//             "checkin": window.util.getRandomElement(CHECK_TIME),
//             "checkout": window.util.getRandomElement(CHECK_TIME),
//             "features": window.util.getRandomArray(FEATURES_LIST),
//             "description": `Аутентичное жилье в историческом центре города. Все главные достопримечательности в пешей доступности.`,
//             "photos": window.util.getRandomArray(PHOTOS),
//           },
//           "location": {
//             "x": locationX,
//             "y": locationY,
//           }
//         };
//       }

//       return offer;
//     },
//   };
// })();
