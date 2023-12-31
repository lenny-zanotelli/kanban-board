const app = {
  init: function () {
    console.log('app init');
    app.addListenerToActions();
    app.getListsFromAPI();
  },

  addListenerToActions: () => {

    // Event on 'Add a List'
    const addListButton = document.getElementById('addListButton');
    addListButton.addEventListener('click', listModule.showAddListModal);

    // Event for Hiding CLOSING MODALS
    const closeModalBtns = document.querySelectorAll('.close');
    closeModalBtns.forEach((btn) => btn.addEventListener('click', utilModule.hideModals));

    // Event on 'Add a List' FORM
    const addListForm = document.querySelector('#addListModal form');
    addListForm.addEventListener('submit', listModule.handleAddListForm);

    // Event on 'Add a Card' FORM
    const addCardform = document.querySelector('#addCardModal form');
    addCardform.addEventListener('submit', cardModule.handleAddCardForm);

    // Event on 'Associate a Tag to a Card' FORM
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

      const listContainer = document.querySelector('.card-lists');

      Sortable.create(listContainer, {
        draggable: '.panel',
        onEnd: listModule.handleDragList
      });

    } catch (error) {
      console.error(error);
      utilModule.notify(error.message, 5000, 'is-danger');

    }
  },


};

document.addEventListener('DOMContentLoaded', app.init);