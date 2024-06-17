import View from "./view.js";
import icons from "url:../../img/icons.svg";

class Navigation extends View {
  // _parentElement = document.querySelector(".nav");
  addHandlerStickyNav() {
    const mainPage = document.querySelector(".mainWebsite-Page");

    const nav = document.querySelector(".nav");
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

  addHandlerMobileNav() {
    const nav = document.querySelector(".nav");
    const iconNav = document.querySelector(".btn-nav-mobile");
    const navLink = document.querySelectorAll(".nav__link");
    // console.log(this._parentElement);

    navLink.forEach((e) =>
      e.addEventListener("click", function () {
        console.log("dffdf");
        nav.classList.toggle("nav__open");
      })
    );
    iconNav.addEventListener("click", function () {
      nav.classList.toggle("nav__open");
    });
  }
}

export default new Navigation();
