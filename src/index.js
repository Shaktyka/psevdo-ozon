'use strict';

let checkbox = document.querySelector('.filter-check_checkbox');

checkbox.addEventListener('change', function(evt) {
  if (this.checked) {
    this.nextElementSibling.classList.add('checked');
  } else {
    this.nextElementSibling.classList.remove('checked');
  }
});
