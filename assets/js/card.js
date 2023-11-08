const cardModule = {

  addEventToCardModalBtn: () => {
    // SELECT ADD CARD BTNS
    const showCardBtns = document.querySelectorAll(
      '.panel a.is-pulled-right'
    );

    for (const btn of showCardBtns) {
      btn.addEventListener('click', cardModule.showAddCardModal);
    }
  },
  showAddCardModal: (event) => {
    event.preventDefault();
    const modal = document.getElementById('addCardModal');
    modal.classList.add('is-active');

    const baseList = event.target.closest('.panel');
    const id = baseList.getAttribute('data-list-id');

    modal.querySelector('input[type=hidden]').value = id;

  },

  handleAddCardForm: async (event) => {
    event.preventDefault();
    const form = event.target;
    try {
      const formData = new FormData(form);
      const jsonData = Object.fromEntries(formData.entries());
      const stringify = JSON.stringify(jsonData);

      console.log(stringify);
  
      const response = await fetch(`${utilModule.base_url}/cards`, {
        method: 'POST',
        body: stringify,
        headers: {
          'content-type': 'application/json'
        }
      });
  
      const json = await response.json();
  
      if (!response.ok) {
        throw new Error(json);
      }
  
      cardModule.makeCardInDOM(json);
      utilModule.notify('is-success', 'New Card has been created!');

    } catch (error) {
      utilModule.notify(error.message, 5000, 'is-danger');
      console.log(error);
    
    } finally {
      utilModule.hideModals();
      form.reset();
    }
  },

  makeCardInDOM: (card) => {
    const template = document.getElementById('template-card');
    const clone = document.importNode(template.content, true);

    clone.querySelector('.card-name').textContent = card.title;
    clone.querySelector('.box').dataset.cardId = card.id;
    clone.querySelector('.box').style.backgroundColor = card.color;

    const form = clone.querySelector('form');
    form.querySelector('input[type=hidden]').value = card.id;

    const goodList = document.querySelector(
      `[data-list-id="${card.list.id}"]`
  );  

    const cardEmplacement = goodList.querySelector('.panel-block');

    const updateCardBtn = clone.querySelector('.box .is-narrow a:first-child');

    clone.querySelector('.delete-card-btn').addEventListener('click', cardModule.deleteCard);

    cardEmplacement.appendChild(clone);

    updateCardBtn.addEventListener('click', cardModule.showUpdateCardForm)
  },

  showUpdateCardForm: (event) => {
    event.preventDefault();
    const divParent = event.target.closest('.columns');

    const title = divParent.querySelector('.card-content');
    const form = divParent.querySelector('form');

    form.addEventListener('submit', cardModule.handleUpdateCard);

    title.classList.add('is-hidden');
    form.classList.remove('is-hidden');
  },

  handleUpdateCard: async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());
    const stringify = JSON.stringify(jsonData);

    try {
      const response = await fetch(
        `${utilModule.base_url}/cards/${formData.get('cardId')}`,
        {
          method: 'PUT',
          body: stringify
        }
      );

      const json = await response.json();
      if (!response.ok) throw json;
      
      form.classList.add('is-hidden');
      form.reset();

      const cardContent = form.previousElementSibling;
      cardContent.textContent = json.name;
      cardContent.classList.remove('is-hidden');
      cardContent.parentElement.parentElement.style.backgroundColor = json.color;
    } catch (error) {
      utilModule.notify(error.message, 5000, 'is-danger');
      
    }
  },

  deleteCard: async (event) => {
    event.preventDefault();
    
    const cardId = event.target.closest('.box').dataset.cardId;
    try {
      const response = await fetch(`${utilModule.base_url}/cards/${cardId}`,
      {
        method: 'DELETE'
      }
    );

    const json = await response.json();
    if (!response.ok) throw json;

    event.target.closest('.box').remove();
      
    } catch (error) {
      utilModule.notify(error.message, 5000, 'is-danger');
      
    }
  }

}