const app = {
  init: function () {
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

  handleAddListForm: (event) => {
    event.preventDefault();

    const form = event.target;

    const formData = new FormData(form);

    app.makeListInDOM(formData);
    app.hideModals();
    form.reset();

  },

  handleAddCardForm: (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    app.makeCardInDOM(formData);

    app.hideModals();

    form.reset();
  },


  makeListInDOM: (data) => {
    const template = document.getElementById('template-list');

    // IMPORTNODE => Allow us to clone our template, true argument allow to retrieve all the children ot this template 
    const clone = document.importNode(template.content, true);

    clone.querySelector('h2').textContent = data.get('name');
    const listId = `list-${Date.now()}`;

    clone.querySelector('.panel').setAttribute('data-list-id', listId);
    clone.querySelector('.panel').dataset.listId = listId;

    const listContainer = document.querySelector('.card-lists');
    const firstElement = listContainer.querySelector('.panel');

    if (firstElement) {
      firstElement.before(clone);
    } else {
      listContainer.appendChild(clone);
    }

    app.addEventToCardModalBtn();

  },

  makeCardInDOM: (data) => {
    const template = document.getElementById('template-card');

    const clone = document.importNode(template.content, true);
    clone.querySelector('.card-content').textContent = data.get('title');

    const cardId = `card-${Date.now()}`;
    clone.querySelector('.box').dataset.cardId = cardId;

    const goodList = document.querySelector(
        `[data-list-id="${data.get('list_id')}"]`
    );

    const cardEmplacement = goodList.querySelector('.panel-block');

    cardEmplacement.appendChild(clone);
  }

};

document.addEventListener('DOMContentLoaded', app.init);