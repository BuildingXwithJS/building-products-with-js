// import enzyme methods
import React from 'react';
import {shallow, render, mount} from 'enzyme';
// import complete rxjs
import 'rxjs';

// setup localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key];
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', {value: localStorageMock});

// setup enzyme
global.React = React;
global.shallow = shallow;
global.render = render;
global.mount = mount;
// Skip createElement warnings but fail tests on any other warning
console.error = (message) => {
  if (!/(React.createElement: type should not be null)/.test(message)) {
    throw new Error(message);
  }
};
