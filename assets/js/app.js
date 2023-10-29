const app = {

  base_url: 'http://localhost:3000',

  init: function () {
    app.getListsFromAPI();

    app.addListenerToActions();
    console.log('app init');
  },

  addListenerToActions: () => {
    app.addEventToListModalBtn();

    const closeBtns = document.querySelectorAll('.close');
    closeBtns.forEach((btn) => btn.addEventListener('click', app.hideModals));


    // SELECT ADD LIST FORM
    const addListForm = document.querySelector('#addListModal form');
    addListForm.addEventListener('submit', app.handleAddListForm);

    app.addEventToCardModalBtn();

    // SELECT ADD CARD FORM
    const addCardform = document.querySelector('#addCardModal form');
    addCardform.addEventListener('submit', app.handleAddCardForm);
      
    },

  addEventToListModalBtn: () => {
    const addListButton = document.getElementById('addListButton');

    addListButton.addEventListener('click', app.showListModal);

  },

  addEventToCardModalBtn: () => {
    // SELECT ADD CARD BTNS
    const showCardBtns = document.querySelectorAll(
      '.panel a.is-pulled-right'
    );

    for (const btn of showCardBtns) {
      btn.addEventListener('click', app.showCardModal);
    }
  },

  showListModal: () => {
    const modal = document.getElementById('addListModal');

    modal.classList.add('is-active');
  },

  showCardModal: (event) => {
    event.preventDefault();
    const modal = document.getElementById('addCardModal');
    modal.classList.add('is-active');

    const baseList = event.target.closest('.panel');
    const id = baseList.getAttribute('data-list-id');

    modal.querySelector('input[type=hidden]').value = id;

  },

  hideModals: () => {
    const modals = document.querySelectorAll('.modal');

    for (const modal of modals) {
      modal.classList.remove('is-active');
    }
  },

  handleAddListForm: async (event) => {
    event.preventDefault();

    const form = event.target;

    const formData = new FormData(form);
    // const dataObj = Object.fromEntries(formData.entries());
    // console.log(dataObj);
    const response = await fetch(`${app.base_url}/lists`, {
      method: 'POST',
      body: formData,
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json);
    }
    app.makeListInDOM(json);

    app.hideModals();
    form.reset();
  },

  handleAddCardForm: async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const response = await fetch(`${app.base_url}/cards`, {
      method: 'POST',
      body: formData
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json);
    }

    app.makeCardInDOM(json);

    app.hideModals();
    form.reset();
  },


  makeListInDOM: (list) => {
    const template = document.getElementById('template-list');

    // IMPORTNODE => Allow us to clone our template, true argument allow to retrieve all the children ot this template 
    const clone = document.importNode(template.content, true);

    clone.querySelector('h2').textContent = list.name;

    // clone.querySelector('.panel').setAttribute('data-list-id', listId);
    clone.querySelector('.panel').dataset.listId = list.id;
    console.log(list.id);

    const listContainer = document.querySelector('.card-lists');
    const firstElement = listContainer.querySelector('.panel');

    if (firstElement) {
      firstElement.before(clone);
    } else {
      listContainer.appendChild(clone);
    }

    app.addEventToCardModalBtn();

  },

  makeCardInDOM: (card) => {
    const template = document.getElementById('template-card');

    const clone = document.importNode(template.content, true);
    clone.querySelector('.card-content').textContent = card.title;

    // const cardId = `card-${Date.now()}`;
    clone.querySelector('.box').dataset.cardId = card.id;
    console.log(card.id);

    const goodList = document.querySelector(
        `[data-list-id="${card.list_id}"]`
    );

    const cardEmplacement = goodList.querySelector('.panel-block');
    cardEmplacement.appendChild(clone);
  },

  getListsFromAPI: async () => {
    try {
      const response = await fetch(`${app.base_url}/lists`);
      const jsonData = await response.json();
      console.log('JSON response', jsonData);

    if(!response.ok){ throw new Error(jsonData)};
      console.log(jsonData);

      for (const list of jsonData) {
        console.log('list',list);
        app.makeListInDOM(list);
        // for (const card of list.cards) {
        //   console.log(card);
        //   app.makeCardInDOM(card);
        // }
      }
    } catch (error) {
      console.error(error);
      
    }
  }

};

document.addEventListener('DOMContentLoaded', app.init);