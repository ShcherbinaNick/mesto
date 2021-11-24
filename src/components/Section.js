export class Section {
  constructor({ items, renderer }, containerElement) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerElement;
  }
  // Перебирает массив данных
  renderItems() {
    this._items.forEach(item => {
      return this._renderer(item);
    })
  }
  // Метод принимает параметр и вставляет его в контейнер
  addItem(element) {
    this._container.prepend(element)
  }
}