import View from "./view.js";
import icons from "url:../../img/icons.svg";

export class SliderView extends View {
  _parentElement = document.querySelector(".slider");

  _btnRight = document.querySelector(".slider__btn--right");
  _btnLeft = document.querySelector(".slider__btn--left");
  _slides;
  _curSlide = 0;

  _sliderInit() {
    this._slides = document.querySelectorAll(".slide");
    this._sliderTransform(this._curSlide, this._slides);
    this._addHandlerSlider(this._curSlide, this._sliderTransform, this._slides);
  }

  _sliderTransform(curSlide, slides) {
    // console.log(this._maxSlide);
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${70 * (i - curSlide)}%)`;
    });
  }

  _addHandlerSlider(curSlide, handler, slides) {
    const maxSlide = slides.length;
    console.log(this);
    this._btnRight.addEventListener("click", function () {
      if (curSlide === maxSlide - 1) curSlide = 0;
      else curSlide++;

      handler(curSlide, slides);
    });

    this._btnLeft.addEventListener("click", function () {
      if (curSlide === 0) curSlide = maxSlide - 1;
      else curSlide--;

      // curSlide--;
      handler(curSlide, slides);
    });
  }
}

export default new SliderView();
