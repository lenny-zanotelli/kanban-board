const tagModule = {

  makeTagInDOM: (tag) => {
    const tagDOM = document.createElement('span');

    tagDOM.dataset.tagId = tag.tag.id;
    tagDOM.textContent = tag.tag.name;
    tagDOM.style.backgroundColor = tag.tag.color;
    tagDOM.classList.add('tag');
    
    // tagDOM.addEventListener('dblclick', tagModule.dissociateTagFromCard);      
    const cardId = tag.card.id;
    
    const goodCard = document.querySelector(`.box[data-card-id="${cardId}"]`);
    goodCard.querySelector(".tags-container").appendChild(tagDOM);
    
  },

  showAssociateTagModal: async (event) => {

    const cardDOM = event.target.closest('.box');
    const cardId = cardDOM.dataset.cardId;
    const modal = document.getElementById('associateTagModal');
    modal.querySelector('input[name="cardId"]').value = cardId;

    const select = modal.querySelector('select[name="tagId"]');
    select.content = "";

    try {
      const response = await fetch(`${utilModule.base_url}/tags`);
      const json = await response.json();

      if (!response.ok) { throw json};

      for (const tag of json) {
        const option = document.createElement('option');

        option.textContent = tag.name;
        option.value = tag.id;
        select.appendChild(option);
      }
    } catch (error) {
      console.log(error);
    }
    modal.classList.add('is-active');
  },

  associateTagToCard: async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());
    const stringify = JSON.stringify(jsonData);
    const cardId = formData.get('cardId');

    try {
      const response = await fetch(`${utilModule.base_url}/cards/${cardId}/tags`, {
        method: 'POST',
        body: stringify,
        headers: {
          'content-type': 'application/json'
        }
      });
      const json = await response.json();
      if (!response.ok) { throw Error('Cant havejson tag') }

      if (json.tags && Array.isArray(json.tags)) {
        const tag = json.tags.find(tag => tag.id == formData.get("tagId"));
        
        tagModule.makeTagInDOM(tag);

      }

      
      utilModule.notify('Tag associate with card!', 5000, 'is-success')
    } catch (error) {
      console.log(error);
      utilModule.notify(error.message, 5000, 'is-danger')

    }
    utilModule.hideModals();
  }
}