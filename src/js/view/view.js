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
    const section = document.querySelector(".gallery");
    const _parentElement = document.querySelector(".gallery__wrapper-track");
    function handleOnDown(e) {
      _parentElement.dataset.mouseDownAt = e.clientX;
    }

    function handleOnMove(e) {
      if (_parentElement.dataset.mouseDownAt === "0") return;

      const mouseDelta =
        parseFloat(_parentElement.dataset.mouseDownAt) - e.clientX;

      const maxDelta = window.innerWidth / 2;

      const percentage = (mouseDelta / maxDelta) * -100;

      const nextPercentageUnconstrained =
        parseFloat(_parentElement.dataset.prevPercentage) + percentage;
      const nextPercentage = Math.max(
        Math.min(nextPercentageUnconstrained, 0),
        -100
      );

      _parentElement.dataset.percentage = nextPercentage;

      _parentElement.animate(
        {
          transform: `translate(${nextPercentage}%, -50%)`,
        },
        { duration: 1200, fill: "forwards" }
      );

      for (const image of _parentElement.getElementsByClassName(
        "slider__comp"
      )) {
        image.animate(
          {
            objectPosition: `${100 + nextPercentage}% center`,
          },
          { duration: 1200, fill: "forwards" }
        );
      }
    }

    function handleOnUp(e) {
      _parentElement.dataset.mouseDownAt = "0";

      _parentElement.dataset.prevPercentage = _parentElement.dataset.percentage;
    }

    // DOWN
    section.onmousedown = (e) => handleOnDown(e);
    window.ontouchstart = (e) => handleOnDown(e);

    // MOVE
    section.onmousemove = (e) => handleOnMove(e);
    window.ontouchmove = (e) => handleOnMove(e);

    // UP
    section.onmouseup = (e) => handleOnUp(e);
    window.ontouchend = (e) => handleOnUp(e);
  };
}
