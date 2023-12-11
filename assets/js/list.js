const listModule = {

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
      
      if (!response.ok) { throw new Error('erreur') }

      listModule.makeListInDOM(json);
      utilModule.notify('New List has been created!', 5000,'is-success');

    } catch (error) {

      utilModule.notify(error.message, 5000, 'is-danger');
      console.log(error);
    } finally {
      utilModule.hideModals();
      form.reset();
      
    }
  },

  makeListInDOM: (list) => {
    const template = document.getElementById('template-list');
    // IMPORTNODE => Allow us to clone our template, true argument allow to retrieve all the children ot this template 
    const clone = document.importNode(template.content, true);

    clone.querySelector('h2').textContent = list.name;
    clone.querySelector('.panel').dataset.listId = list.id;
    clone.querySelector("form input[name='list-id']").value = list.id;
    clone.querySelector('.add-card-btn').addEventListener('click', cardModule.showAddCardModal);
    clone.querySelector('h2').addEventListener('dblclick', listModule.showEditListForm);
    clone.querySelector('.edit-list-form').addEventListener('submit', listModule.handleEditTitleListForm);
    clone.querySelector('.delete-list-btn').addEventListener('click', listModule.deleteList);


    const cardContainer = clone.querySelector('.panel-block');

    Sortable.create(cardContainer, {
      group: 'lists',
      draggable: '.box',
      animation: 150
    });

    const listContainer = document.querySelector('#lists-container');
    listContainer.appendChild(clone);


  },
  showEditListForm: (event) => {
    const listTitle = event.target;
    
    listTitle.classList.add('is-hidden');
    listTitle.nextElementSibling.classList.remove('is-hidden');
    
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
      if (!response.ok) {throw json};
      
      list.remove();

      utilModule.notify('List has been deleted!', 5000,'is-success');
    } catch (error) {
      console.log(error);
      utilModule.notify(error.message, 5000, 'is-danger');
      
    }
  },


  handleEditTitleListForm: async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());
    const stringify = JSON.stringify(jsonData);
    const listTitle = form.previousElementSibling;

    const listId = formData.get('list-id');
    
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
      console.error(error);
      utilModule.notify(error.message, 3000, 'is-danger');
    } 
      form.classList.add('is-hidden');
      listTitle.classList.remove('is-hidden');
  
  },

  handleDragList: () => {
    const lists = document.querySelectorAll('.panel');

    lists.forEach(async (list, index) => {
      const formData = new FormData();

      formData.set('position', index);

      try {
        const response = await fetch(`${utilModule.base_url}/lists/${list.dataset.listId}`, {
          method: 'PUT',
          body: formData,
        });
        const jsonData = await response.json();
        console.log(jsonData);

        if(!response.ok) { throw jsonData }
      } catch (error) {
        console.error(error);
        utilModule.notify(error.message, 5000, 'is-danger');
        
      }
    })
  }

}