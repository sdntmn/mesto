export class Section {
  _items;
  _renderer;
  _containerSelector;

  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    console.log(this._items);
    this._renderer = renderer; // renderer — это функция переданная колбэком
    this._containerSelector = document.querySelector(containerSelector);
  }

  // отвечает за отрисовку всех элементов.==============================
  renderItems() {
    this._items.forEach((cardElement) => {
      this._renderer(cardElement);
    });
  }

  // принимает DOM-элемент и добавляет его в контейнер =================
  addItem = (cardElement) => {
    this._containerSelector.prepend(cardElement);
  };
}
