import View from "./view.js";
import icons from "url:../../img/icons.svg";

class About extends View {
  _parentElement = document.querySelector("#cards");

  _addHandlerSkills(skills) {
    console.log(this._parentElement);

    skills.map((skill) => {
      const markup = `
                     <div class="card">
                      <div class="card__border"> </div>
                      <div class="card__content">
                          <p>
                              ${skill.skill} 
                      </div>
                      </div>
              
            
                    `;

      this._parentElement.insertAdjacentHTML("afterbegin", markup);
    });
  }
}

export default new About();
