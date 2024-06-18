import View from "./view.js";
import icons from "url:../../img/icons.svg";

class LazyLoading extends View {
  _parentElement = document.querySelectorAll(".blur-div");

  _loaded(e) {
    this.closest(".blur-div").classList.add("loaded");
    // console.log(this.closest(".blur-div"));
    console.log(this);
  }

  _addHandlerLoad() {
    this._parentElement.forEach((e) => {
      const img = e.querySelector("img");

      //   if (img.complete) e.classList.add("loaded");
      img.addEventListener("load", this._loaded);
    });
  }
}

export default new LazyLoading();
