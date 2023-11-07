const app = {
  init: function () {
    console.log('app init');
    app.addListenerToActions();
    app.getListsFromAPI();
  },

  addListenerToActions: () => {
    listModule.addEventToListModalBtn();

    // Event for Hiding CLOSING MODALS
    const closeBtns = document.querySelectorAll('.close');
    closeBtns.forEach((btn) => btn.addEventListener('click', utilModule.hideModals));


    // SELECT ADD LIST FORM
    const addListForm = document.querySelector('#addListModal form');
    addListForm.addEventListener('submit', listModule.handleAddListForm);

    app.addEventToCardModalBtn();

    // SELECT ADD CARD FORM
    const addCardform = document.querySelector('#addCardModal form');
    addCardform.addEventListener('submit', cardModule.handleAddCardForm);
      
    },

  getListsFromAPI: async () => {
    try {
      const response = await fetch(`${utilModule.base_url}/lists`);
      const json = await response.json();
      console.log('JSON response', json);

      if (response.ok) {
        json.forEach((list) => {
          listModule.makeListInDOM(list)
          list.cards.forEach((card) => {
            app.makeCardInDOM(card)
          })
        })
      }
    } catch (error) {
      console.error(error);
      
    }
  }

};

document.addEventListener('DOMContentLoaded', app.init);