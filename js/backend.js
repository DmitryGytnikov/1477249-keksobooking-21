'use strict';

const RequestMethod = {
  GET: `GET`,
  POST: `POST`
};
const RequestURL = {
  GET: `https://21.javascript.pages.academy/keksobooking/data`,
  POST: `https://21.javascript.pages.academy/keksobooking`
};
const StatusCode = {
  OK: 200
};
const TIMEOUT_IN_MS = 10000;

const statusHandler = (xhr, onLoad, onError) => {
  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onLoad(xhr.response);
    } else {
      onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });
};

let makeRequest = (method, url, onLoad, onError = window.util.noop) => {
  let xhr = new XMLHttpRequest();

  xhr.responseType = `json`;
  xhr.open(method, url);
  xhr.timeout = TIMEOUT_IN_MS;

  statusHandler(xhr, onLoad, onError);

  return xhr;
};

let loadData = (onLoad, onError) => {
  makeRequest(RequestMethod.GET, RequestURL.GET, onLoad, onError).send();
};

let saveData = (data, onLoad, onError) => {
  makeRequest(RequestMethod.POST, RequestURL.POST, onLoad, onError).send(data);
};

window.backend = {
  loadData,
  saveData
};
