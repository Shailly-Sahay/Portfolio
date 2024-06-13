export default class View {
  render(data, info2, render = true) {
    this._data = data;
    this._info2 = info2;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._parentElement.insertAdjacentHTML("afterbegin", markup);

    if (!info2) return;
    this._furtherTask();
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  // SLIDER
}
