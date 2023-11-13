const tagModule = {

  makeTagInDOM: (tag) => {
    console.log('tag', tag);
    const tagDOM = document.createElement('span');

    tagDOM.dataset.tagId = tag.id;
    tagDOM.textContent = tag.name;
    tagDOM.style.backgroundColor = tag.color;
    tagDOM.style.border = "1px solid red";
    tagDOM.classList.add('tag');
    tagDOM.classList.add('is-one-quarter');

    console.log(tagDOM);

    // tagDOM.addEventListener('dblclick', tagModule.dissociateTagFromCard);
    const cardId = tag.id;
    console.log(cardId);
    const goodCard = document.querySelector(`[data-card-id="${cardId}"]`);
    console.log('goodcard', goodCard);

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
    console.log("associateTagToCard function is called");

    const form = event.target;
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());
    const stringify = JSON.stringify(jsonData);
    const cardId = formData.get('cardId');

    try {
      const response = await fetch(`${utilModule.base_url}/cards/${cardId}`, {
        method: 'PUT',
        body: stringify,
        headers: {
          'content-type': 'application/json'
        }
      });
      const json = await response.json();
      console.log(json);
      if (!response.ok) { throw json }

      const tag = json.find(
        tag => tag.id == formData.get('tagId')
      );
      
      console.log(tag);
      tagModule.makeTagInDOM(tag);
      
    } catch (error) {
      console.log(error);

    }
    utilModule.hideModals();
  }
}