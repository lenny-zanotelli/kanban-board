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
    cardEmplacement.appendChild(clone);
  },

}