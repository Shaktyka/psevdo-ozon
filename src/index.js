'use strict';

const checkbox = document.querySelector('.filter-check_checkbox');
const cartBtn = document.querySelector('#cart');
const cartWindow = document.querySelector('.cart');
const cartClose = cartWindow.querySelector('.cart-close');
const cartSend = cartWindow.querySelector('.cart-confirm');
const cards = document.querySelectorAll('.goods .card');
const cartWrapper = cartWindow.querySelector('.cart-wrapper');
const emptyText = cartWindow.querySelector('#cart-empty');
let cardsAmount = 0;
const cartCounter = document.querySelector('.counter');

// Переключение классов при нажатии на чекбокс
checkbox.addEventListener('change', function(evt) {
  if (this.checked) {
    this.nextElementSibling.classList.add('checked');
  } else {
    this.nextElementSibling.classList.remove('checked');
  }
});

// Обработчик нажатия на кнопку закрытия окна
const cartCloseClickHandler = (evt) => {
  evt.preventDefault();
  closeCart();
};

// Обработчик нажатия на кнопку отправки корзины
const cartSendClickHandler = (evt) => {
  evt.preventDefault();
  closeCart();
};

// Закрытие окна корзины
const closeCart = () => {
  // Удаляем обработчик нажатия на кнопку закрытия окна
  cartClose.removeEventListener('click', cartCloseClickHandler);
  // Удаляем обработчик нажатия на кнопку отправки корзины
  cartSend.removeEventListener('click', cartSendClickHandler);
  cartWindow.style.display = 'none';
  document.body.style.overflow = '';
};

// Открытие окна корзины
const openCart = () => {
  // Вешаем обработчик нажатия на кнопку закрытия окна
  cartClose.addEventListener('click', cartCloseClickHandler);
  // Обработчик нажатия на кнопку отправки корзины
  cartSend.addEventListener('click', cartSendClickHandler);
  cartWindow.style.display = 'flex';
  document.body.style.overflow = 'hidden';
};

// Обработчик нажатия на кнопку корзины
const cartBtnClickHandler = (evt) => {
  evt.preventDefault();
  openCart();
};

// Вешаем обработчик нажатия на кнопку корзины
cartBtn.addEventListener('click', cartBtnClickHandler);

// Обработчик клика по карточке
// const cardClickHandler = (evt) => {
//   evt.preventDefault();
//   const clickedEl = evt.target;
//   console.log(clickedEl);
// };

//Ввывод кол-ва товаров на иконке корзины
const showCardsAmount = () => {
  cardsAmount = cartWrapper.querySelectorAll('.card').length;
  cartCounter.textContent = cardsAmount;
};

// Вешаем обработчики на карточки
cards.forEach((card) => {
  const cardBtn = card.querySelector('button');
  cardBtn.addEventListener('click', (evt) => {
    const cardClone = card.cloneNode(true);
    cartWrapper.appendChild(cardClone);
    emptyText.style.display = 'none';
    showCardsAmount();
  });
});
