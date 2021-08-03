export class Section {
  _items;
  _renderer;
  _containerSelector;

  constructor({ renderer }, containerSelector) {
    this._renderer = renderer; // renderer — это функция переданная колбэком
    this._containerSelector = document.querySelector(containerSelector);
  }

  // отвечает за отрисовку всех элементов.====================================
  renderItems(res) {
    res.forEach((cardElement) => {
      this._renderer(cardElement);
    });
  }

  // принимает DOM-элемент и добавляет его в контейнер =======================
  addItem = (cardElement, order = true) => {
    if (order) {
      this._containerSelector.append(cardElement);
    } else {
      this._containerSelector.prepend(cardElement);
    }
  };
}
