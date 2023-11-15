const tagModule = {

  makeTagInDOM: (tag) => {
    const tagDOM = document.createElement('span');

    tagDOM.dataset.tagId = tag.id;
    tagDOM.textContent = tag.name;
    tagDOM.style.backgroundColor = tag.color;
    tagDOM.classList.add('tag');
    
    // tagDOM.addEventListener('dblclick', tagModule.dissociateTagFromCard);
    if (tag.card && tag.cards.length > 0){
      
      for (const card of tag.cards) {
          const cardId = card.id;
          console.log('cardid', cardId);
          
          if (cardId === tag.card.id) {
            const goodCard = document.querySelector(`.box[data-card-id="${cardId}"]`);
            goodCard.querySelector(".tags-container").appendChild(tagDOM);
            console.log('goodcard', goodCard);
            break;
          }
        }    
      }
      console.log('tagM', tag);
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
    console.log(cardId);

    try {
      const response = await fetch(`${utilModule.base_url}/cards/${cardId}/tags`, {
        method: 'POST',
        body: stringify,
        headers: {
          'content-type': 'application/json'
        }
      });
      const json = await response.json();
      console.log('tagcard', json);
      if (!response.ok) { throw Error('Cant havejson tag') }

      if (json.tags && Array.isArray(json.tags)) {
        const tag = json.tags.find(tag => tag.id == formData.get("tagId"));
        
        console.log('tag tag', tag);
        tagModule.makeTagInDOM(tag);

      }

      
    } catch (error) {
      console.log(error);

    }
    utilModule.hideModals();
  }
}