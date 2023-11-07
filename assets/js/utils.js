const utilModule = {
  base_url: 'http://localhost:3000',
  hideModals: () => {
    const modals = document.querySelectorAll('.modal');

    for (const modal of modals) {
      modal.classList.remove('is-active');
    }
  },
  notify: (message, timeout = 5000, level = 'is-success') => {
    const div = document.createElement('div');
    const span = document.createElement('span');

    div.classList.add('notification');
    div.classList.add(level);

    span.classList.add(level);
    span.textContent = message;

    div.appendChild(span);

    document.body.append(div);

    setTimeout(() => {
      document.querySelector('.notification').remove();
    }, timeout);
  },
}