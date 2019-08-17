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
const sumEl = cartWindow.querySelector('.cart-total span');
// const cardPrice = cart.querySelectorAll('.card-price');
// console.log(cardPrice);

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

// Выводим кол-во товаров на иконке корзины
const showCardsAmount = () => {
  cardsAmount = cartWrapper.querySelectorAll('.card').length;
  cartCounter.textContent = cardsAmount;
};

// Показать сумму товаров
const showPrice = (price) => {
  sumEl.textContent = Number(sumEl.textContent) + Number(price);
};

// Уменьшение суммы заказа при удаление товара из корзины
const reducePrice = (price) => {
  sumEl.textContent = Number(sumEl.textContent) - Number(price);
};

// Вешаем обработчики на карточки
cards.forEach((card) => {
  const cardBtn = card.querySelector('button');

  cardBtn.addEventListener('click', (evt) => {
    // Действия с карточкой
    const cardClone = card.cloneNode(true);

    // Помещаем карточку в корзину
    cartWrapper.appendChild(cardClone);
    const removeBtn = cardClone.querySelector('button');
    removeBtn.textContent = 'Удалить из корзины';
    removeBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      cardClone.remove();
      //Ууменьшаем общую стоимость товаров
      reducePrice(parseFloat(cardClone.querySelector('.card-price').textContent));
      // Уменьшаем цифру на счетчике товаров
      showCardsAmount();
    });

    // Делаем другие д-вия после добавления карточки
    emptyText.style.display = 'none';

    showCardsAmount();

    let cardPrice = card.querySelector('.card-price').textContent;
    showPrice(parseFloat(cardPrice));
  });

});

