import View from "./view.js";
import icons from "url:../../img/icons.svg";

class CardHover extends View {
  _parentElement = document.querySelector(".cards");
  _cardArr = document.querySelectorAll(".card");

  _onMouseMove = (e) => {
    const { currentTarget: target } = e;
    this._getCoordinates(e, target);
  };

  // Function to get coordinates
  _getCoordinates(e, target) {
    const rect = target.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;

    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  // Function to handle mouse movement
  _onMouseMoveHandler() {
    this._cardArr.forEach((card) => {
      card.onmousemove = (e) => this._onMouseMove(e);
    });

    this._parentElement.onmousemove = (e) => {
      this._cardArr.forEach((card) => {
        this._getCoordinates(e, card);
      });
    };
  }
}

export default new CardHover();
