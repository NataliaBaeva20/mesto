export class Section {
  // в конструкторе: массив данных, которые потребуются для перебора;
  //                 CSS-селектор контейнера. В него мы будем вставлять элементы разметки.
  constructor({ renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  setItem(element) {
    this._container.prepend(element);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }
}
