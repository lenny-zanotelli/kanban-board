const cardModule = {

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
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());
    const stringify = JSON.stringify(jsonData);
    try {
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
      utilModule.notify('New Card has been created!', 5000, 'is-success');
      
    } catch (error) {
      console.log(error);
      utilModule.notify(error.message, 5000, 'is-danger');
      
    }
    utilModule.hideModals();
    form.reset();
      
  },

  makeCardInDOM: (card) => {
    const template = document.getElementById('template-card');
    const clone = document.importNode(template.content, true);
    
    clone.querySelector('.card-name').textContent = card.title;
    clone.querySelector('.box').dataset.cardId = card.id;
    clone.querySelector('form input[name="id"]').value = card.id;
    clone.querySelector('.box').style.backgroundColor = card.color;

    clone.querySelector('.edit-card-icon').addEventListener('click', cardModule.showEditCardForm);
    clone.querySelector('.edit-card-form').addEventListener('submit', cardModule.handleEditCardForm);
    clone.querySelector('.delete-card-btn').addEventListener('click', cardModule.deleteCard);
    clone.querySelector('.associate-tag-icon').addEventListener('click', tagModule.showAssociateTagModal);

    const goodList = document.querySelector(`[data-list-id="${card.list.id}"]`);
    goodList.querySelector('.panel-block').appendChild(clone);

  },

  showEditCardForm: (event) => {

    const cardDom = event.target.closest('.box');
    cardDom.querySelector('.card-name').classList.add('is-hidden');
    cardDom.querySelector('.edit-card-form').classList.remove('is-hidden');
    
  },

  handleEditCardForm: async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());
    const stringify = JSON.stringify(jsonData);

    const cardTitle = form.previousElementSibling;
    const cardId = formData.get('id');

    try {
      const response = await fetch(
        `${utilModule.base_url}/cards/${cardId}`,
        {
          method: 'PUT',
          body: stringify,
          headers: {
            'content-type': 'application/json'
          }
        } 
      );

      const json = await response.json();
      if (!response.ok) { throw json}
      
      form.classList.add('is-hidden');
      form.reset();

      cardTitle.textContent = json.title;
      cardTitle.parentElement.parentElement.style.backgroundColor = json.color;

      utilModule.notify('Card has been updated!', 5000,'is-success');

    } catch (error) {
      console.log(error);
      utilModule.notify(error.message, 5000, 'is-danger');
    }

    form.classList.add('is-hidden');
    cardTitle.classList.remove('is-hidden');
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
    utilModule.notify('Card has been deleted!', 5000, 'is-success');

    } catch (error) {
      utilModule.notify(error.message, 5000, 'is-danger');
      
    }
  }

}