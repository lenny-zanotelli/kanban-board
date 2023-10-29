const listModule = {
  addEventToListModalBtn: () => {
    const addListButton = document.getElementById('addListButton');
    addListButton.addEventListener('click', listModule.showAddListModal);
  },

  showAddListModal: () => {
    const modal = document.getElementById('addListModal');

    modal.classList.add('is-active');
  },

}

module.exports = listModule;