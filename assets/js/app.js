const app = {
  init: function () {
    console.log('app init');
    app.addListenerToActions();
    listModule.getListsFromAPI();
  },

  addListenerToActions: () => {
    listModule.addEventToListModalBtn();

    // Event for Hiding CLOSING MODALS
    const closeBtns = document.querySelectorAll('.close');
    closeBtns.forEach((btn) => btn.addEventListener('click', utilModule.hideModals));


    // SELECT ADD LIST FORM
    const addListForm = document.querySelector('#addListModal form');
    addListForm.addEventListener('submit', listModule.handleAddListForm);

    cardModule.addEventToCardModalBtn();

    // SELECT ADD CARD FORM
    const addCardform = document.querySelector('#addCardModal form');
    addCardform.addEventListener('submit', cardModule.handleAddCardForm);
      
    },


};

document.addEventListener('DOMContentLoaded', app.init);