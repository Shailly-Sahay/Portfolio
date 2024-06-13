import View from "./view.js";
import icons from "url:../../img/icons.svg";

class Gallery extends View {
  _parentElement = document.querySelector(".gallery__wrapper-track");
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
          <div class="cardD-wrapper" data-id="${el.id}"> 
            <div class="cardD__${el.name} cardD">
              <div class="cardD__border"></div>
               <div class="cardD__imgbox"></div>
               <div class="cardD__overlay"></div>
                 <div class="cardD__contentbox">
                   <div class="cardD__contentbox--wrapper">
                     <div class="cardD__contentbox--imgbox"></div>
                     <h3 class="cardD__contentbox--heading">${el.name}</h3>
                  </div>                
                </div>
              </div>
            </div> 
           </div>
       
  `;
    return markup;
  }

  // the slider
  _onMouseHandler = () => {
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
    window.onmousedown = (e) => handleOnDown(e);
    window.ontouchstart = (e) => handleOnDown(e);

    // MOVE
    window.onmousemove = (e) => handleOnMove(e);
    window.ontouchmove = (e) => handleOnMove(e);

    // UP
    window.onmouseup = (e) => handleOnUp(e);
    window.ontouchend = (e) => handleOnUp(e);
  };
}

export default new Gallery();
