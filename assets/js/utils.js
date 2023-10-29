const utilsModule = {
  BASE_URL: 'http://localhost:3000',

  hideModals: () => {
    const modals = document.querySelector('.modal');

    for (const modal of modals) {
      modal.classList.remove('is-active');
    } 
  },

};

module.exports = utilsModule;