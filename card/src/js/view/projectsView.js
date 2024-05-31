import View from "./view.js";
import icons from "url:../../img/icons.svg";

export class ProjectsView extends View {
  _parentElement = document.querySelector(".cardD-container");

  _card = document.querySelector(".cardD");
  _cardActive = document.querySelector(".cardD__active");
  _generateMarkup() {
    return this._data
      .map((project) => this._generateMarkupProject(project))
      .join(" ");
  }

  _generateMarkupProject(el) {
    const markup = `    <div class="slide"><div class="cardD-wrapper"> <div class="cardD__${el.name} cardD ">
              <div class="cardD__border"></div>
               <div class="cardD__imgbox"></div>
              <div class="cardD__overlay"></div>
              <div class="cardD__contentbox">
                <div class="cardD__contentbox--wrapper">
              <div class="cardD__contentbox--imgbox">
                
               </div>
                  <h3 class="cardD__contentbox--heading">${el.name}</h3>
                </div>
                <div class="cardD__contentbox--btnbox">
                  <a href="" class="cardD__contentbox--btn">Know more</a>
                </div>
                </div>
              </div>
            </div>  </div></div>`;

    return markup;
  }

  _addHandlerProjects(handler) {
    window.addEventListener("load", function () {
      handler();
    });
  }
}

export default new ProjectsView();
