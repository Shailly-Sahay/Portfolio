import View from "./view.js";
import icons from "url:../../img/icons.svg";

class Navigation extends View {
  addHandlerStickyNav() {
    const nav = document.querySelector(".nav");
    const mainPage = document.querySelector(".mainWebsite-Page");
    const obsCallback = function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          nav.classList.add("sticky-bg");
        } else nav.classList.remove("sticky-bg");
      });
    };

    const observer = new IntersectionObserver(obsCallback, {
      root: null,
      threshold: [0.0001],
    });

    observer.observe(mainPage);
  }
}

export default new Navigation();
