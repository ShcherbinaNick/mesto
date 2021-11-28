export class Section {
  constructor({ renderer }, containerElement) {
    this._renderer = renderer;
    this._container = containerElement;
  }
  // Перебирает массив данных
  renderItems(items) {
    items.forEach(item => {
      return this._renderer(item);
    })
  }
  // Метод принимает параметр и вставляет его в контейнер
  addItem(element) {
    this._container.prepend(element)
  }
}