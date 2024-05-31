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
  _onMouseHandler = () => {
    window.onmousedown = (e) => {
      this._parentElement.dataset.mouseDownAt = e.clientX;
    };

    window.onmousemove = (e) => {
      if (this._parentElement.dataset.mouseDownAt === "0") return;

      const mouseDelta =
        parseFloat(this._parentElement.dataset.mouseDownAt) - e.clientX;

      const maxDelta = window.innerWidth / 2;

      const percentage = (mouseDelta / maxDelta) * -100;

      const nextPercentageUnconstrained =
        parseFloat(this._parentElement.dataset.prevPercentage) + percentage;
      const nextPercentage = Math.max(
        Math.min(nextPercentageUnconstrained, 0),
        -100
      );

      this._parentElement.dataset.percentage = nextPercentage;

      this._parentElement.animate(
        {
          transform: `translate(${nextPercentage}%, -50%)`,
        },
        { duration: 1200, fill: "forwards" }
      );

      for (const image of this._parentElement.getElementsByClassName(
        "slider__comp"
      )) {
        image.animate(
          {
            objectPosition: `${100 + nextPercentage}% center`,
          },
          { duration: 1200, fill: "forwards" }
        );
      }
    };

    window.onmouseup = () => {
      this._parentElement.dataset.mouseDownAt = "0";

      this._parentElement.dataset.prevPercentage =
        this._parentElement.dataset.percentage;
    };
  };
}
