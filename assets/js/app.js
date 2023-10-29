const utilsModule = require('./utils');
const listModule = require('./list');


const app = {
  //init page functions
  init: () => {
    app.addEventListenerToActions();

  },

  addEventListenerToActions: () => {
    listModule.addEventToListModalBtn();

    const closeBtns = document.querySelectorAll('.close');
    closeBtns.forEach((btn) => {
      btn.addEventListener('click', utilsModule.hideModals);
    });
  }






};

document.addEventListener('DOMContentLoaded', app.init);