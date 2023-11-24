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

    cardModule.addEventToCardModalBtn();

    // SELECT ADD CARD FORM
    const addCardform = document.querySelector('#addCardModal form');
    addCardform.addEventListener('submit', cardModule.handleAddCardForm);

    // SELECT ADD TAG FORM
    const associateTagForm = document.querySelector('#associateTagModal form');
    associateTagForm.addEventListener('submit', tagModule.associateTagToCard);
      
  },

  getListsFromAPI: async () => {
    try {
      const response = await fetch(`${utilModule.base_url}/lists`);
      const json = await response.json();

      if (!response.ok) { throw new Error('Issue with http request', json)}

      for (const list of json) {
        listModule.makeListInDOM(list);
        for (const card of list.cards) {
          cardModule.makeCardInDOM(card);
          for (const tag of card.cardToTags) {
            tagModule.makeTagInDOM(tag);
          }
        }
      }


    } catch (error) {
      console.error(error);
      utilModule.notify(error.message, 5000, 'is-danger');

    }
  },


};

document.addEventListener('DOMContentLoaded', app.init);