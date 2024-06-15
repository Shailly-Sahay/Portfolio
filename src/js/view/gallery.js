import View from "./view.js";
import icons from "url:../../img/icons.svg";

class gallery extends View {
  _parentElement = document.querySelector(".swiper-wrapper");
  // _galleryTrack = document.querySelector(".gallery__wrapper-track");
  _card = document.querySelector(".cardD-wrapper");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const card = e.target.closest(".cardD-wrapper");
      if (!card) return;

      handler(card.dataset.id);
    });
  }
  _generateMarkup() {
    return this._data
      .map((project) => this._generateMarkupProject(project))
      .join(" ");
  }

  _generateMarkupProject(el) {
    const markup = `   
        <div class="swiper-slide">
          <div class="cardD-wrapper" data-id="${el.id}"> 
            <div class="cardD__${el.name} cardD">            
              <div class="cardD__contentbox">
                <div class="cardD__imgBox"></div>   
                 <h3 class="cardD__contentbox--heading">${el.name}</h3>         
              </div>
            </div> 
           </div>
<p>Click to know more</p>

         </div>
  `;
    return markup;
  }
}

export default new gallery();
