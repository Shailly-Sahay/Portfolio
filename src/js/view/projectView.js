import View from "./view";

// const path = require("node:path");
// console.log(__filename);
// console.log(__dirname);
class Project extends View {
  _parentElement = document.querySelector(".projectInfo");
  _overlay = document.querySelector(".overlay");

  _window = document.querySelector(".projectInfo");

  _generateMarkup() {
    this._clear();
    this.toggleWindow();
    const project = this._data.find((el) => el.id === +this._info2);

    return this._generateMarkupProject(project);
  }

  _generateMarkupProject(el) {
    console.log(el);
    const markup = `   
          <div class="projectInfo__wrapper">
                <div class="projectInfo__container">
                 <div class="projectInfo__container--2">
                 <button class="btn--close-modal">&times;</button>
                    <H3 class="heading-tertiary">${el.name}</H3>
            <p class="projectInfo__description">${el.description}</p>
            <div class="projectInfo__toolBox" id="singleCard"></div>
              <div class="projectInfo__btnBox" >
<a href="#">Repo</a>
<a href="#">Live site &#8599;</a>
</div>
          </div>
        
        </div>
   


    </div>
       
  `;

    return markup;
  }

  _furtherTask() {
    // Closing btn functionality
    this._btnClose = document.querySelector(".btn--close-modal");
    this._addHandlerToggleWindow();

    // Adding tools for the project
    this._toolBox = document.querySelector(".projectInfo__toolBox");
    this._addTools();
  }

  _addTools() {
    const project = this._data.find((el) => el.id === +this._info2);

    project.toolsArr.map((tool) => {
      const markup = `
                     <div class="card">
                      <div class="card__border"> </div>
                      <div class="card__content">
                          <p>
                              ${tool} 
                          </p>
                      </div>
                      </div>
                    `;

      this._toolBox.insertAdjacentHTML("afterbegin", markup);
    });
  }

  _addHandlerToggleWindow() {
    [this._btnClose, this._overlay].forEach((btn) => {
      btn.addEventListener("click", () => {
        this.toggleWindow();
      });
    });
  }

  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }
}

export default new Project();
