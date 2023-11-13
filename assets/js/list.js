const listModule = {

  addEventToListModalBtn: () => {
    const addListButton = document.getElementById('addListButton');

    addListButton.addEventListener('click', listModule.showAddListModal);

  },
  showAddListModal: () => {
    const modal = document.getElementById('addListModal');

    modal.classList.add('is-active');
  },

   
  handleAddListForm: async (event) => {
    event.preventDefault();
    const form = event.target;

    try {
      const formData = new FormData(form);
      const jsonData = Object.fromEntries(formData.entries());
      const stringify = JSON.stringify(jsonData);
  
      const response = await fetch(`${utilModule.base_url}/lists`, {
        method: 'POST',
        body: stringify,
        headers: {
          'content-type': 'application/json'
        }
      });
      
      const json = await response.json();
      console.log(json);
      
      if (!response.ok) { throw new Error(json)}
      listModule.makeListInDOM(json);
      utilModule.notify('is-success', 5000, 'New List has been created!');
    
    } catch (error) {
      utilModule.notify(error.message, 5000, 'is-danger');
      console.log(error);
    } 
      utilModule.hideModals();
      form.reset();
  },

  makeListInDOM: (list) => {
    const template = document.getElementById('template-list');
    // IMPORTNODE => Allow us to clone our template, true argument allow to retrieve all the children ot this template 
    const clone = document.importNode(template.content, true);

    const listTitle = clone.querySelector('h2');
    listTitle.textContent = list.name;

    clone.querySelector('.panel').dataset.listId = list.id;

    clone.querySelector('.delete-list-btn').addEventListener('click', listModule.deleteList);

    const listContainer = document.querySelector('.card-lists');
    const firstElement = listContainer.querySelector('.panel');

    if (firstElement) {
      firstElement.before(clone);
    } else {
      listContainer.appendChild(clone);
    }

    listTitle.addEventListener('dblclick', listModule.showEditListForm);

    cardModule.addEventToCardModalBtn();

  },
  getListsFromAPI: async () => {
    try {
      const response = await fetch(`${utilModule.base_url}/lists`);
      const json = await response.json();

      if (response.ok) {
        json.forEach((list) => {
          listModule.makeListInDOM(list)
          list.cards.forEach((card) => {
            cardModule.makeCardInDOM(card)
          });
        });
      };
    } catch (error) {
      console.error(error);
      utilModule.notify(error.message, 5000, 'is-danger');

    }
  },

  deleteList: async (event) => {
    event.preventDefault();
    const list = event.target.closest('.panel');
    const listId = list.dataset.listId;

    try {
      const response = await fetch(
        `${utilModule.base_url}/lists/${listId}`,
        {
          method: 'DELETE'
        }
      );
      const json = response.json();
      if (!response.ok) throw json;
      
      list.remove();
      utilModule.notify('is-success', 5000,'List has been deleted!');
    } catch (error) {
      console.log(error);
      utilModule.notify(error.message, 5000, 'is-danger');
      
    }
  },
  showEditListForm: (event) => {
    const listTitle = event.target;
    listTitle.classList.add('is-hiddden');

    const form = listTitle.nextElementSibling;
    form.querySelector('input[type=hidden]').value = listTitle.closest('.panel').dataset.listId;

    form.addEventListener('submit', listModule.updateList);

    form.classList.remove('is-hidden');
  },

  handleEditTitleListForm: async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());
    const stringify = JSON.stringify(jsonData);
    const listTitle = form.previousElementSibling;

    const listId = formData.get('id');

    console.log(stringify);
    
    try {
      const response = await fetch(
        `${utilModule.base_url}/lists/${listId}`,
        {
          method: 'PUT',
          body: stringify,
          headers: {
            'content-type': 'application/json'
          }
        }
      );
      const json = await response.json();
      if (!response.ok) throw json;

      listTitle.textContent = json.name;
      
    } catch (error) {
      console.log(error);
      utilModule.notify(error.message, 3000, 'is-danger');
    } 
      form.classList.add('is-hidden');
      listTitle.classList.remove('is-hidden');
      form.reset();
  
  }

}