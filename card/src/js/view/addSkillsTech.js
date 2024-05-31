import View from "./view.js";
import icons from "url:../../img/icons.svg";
// import icons from "url:../img/icons.svg";

class AddSkills extends View {
  _parentElement = document.querySelector(".skills__container--technical");

  _addHandlerAddSkills(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    return this._data
      .map((skill) => this._generateMarkupSkill(skill))
      .join(" ");
  }

  _generateMarkupSkill(skill) {
    return `<div class="skills__technical--skill">
            <svg class="skill__icon">
              <use class="icons" href="${icons}#icon-${skill.id}"></use>
            </svg>
            <div class="skills__technical--bar">
              <div class="skills__technical--valuebar" data-progress="${skill.progress}"><span></span></div>
            </div>
          </div>`;
  }
}

export default new AddSkills();
