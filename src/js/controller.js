"use strict";
import * as model from "./model.js";

import gallery from "./view/gallery.js";
import about from "./view/about.js";
import Project from "./view/projectView.js";
import cardHover from "./view/cardHover.js";
import navigation from "./view/navigation.js";
import lazyLoading from "./view/lazyLoading.js";

const controlGallery = function () {
  gallery.render(model.projectsInfoArr);
  gallery.addHandlerClick(controlProject);
};

const controlAbout = function () {
  about._addHandlerSkills(model.skillsArr);
};

const controlProject = async function (id) {
  try {
    await Project.render(model.projectsInfoArr, id);
  } catch (err) {
    console.log(err);
  }
};

const controlNavigation = function () {
  navigation.addHandlerStickyNav();
  navigation.addHandlerMobileNav();
};

const init = function () {
  controlGallery();
  controlAbout();
  cardHover._init();
  controlNavigation();
  lazyLoading._addHandlerLoad();
};

init();

const swiper = new Swiper(".swiper", {
  grabCursor: true,
  initialSlide: 0,
  centeredSlides: true,
  slidesPerView: "auto",
  spaceBetween: 10,
  speed: 1000,
  freeMode: false,
  mousewheel: {
    thresholdDelta: 10,
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const handleOnMouseMove = (e) => {
  const { currentTarget: target } = e;

  const rect = target.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  target.style.setProperty("--mouse-x", `${x}px`);
  target.style.setProperty("--mouse-y", `${y}px`);
};

for (const card of document.querySelectorAll(".card")) {
  card.onmousemove = (e) => handleOnMouseMove(e);
}

document.getElementById("cards").onmousemove = (e) => {
  for (const card of document.getElementsByClassName("card")) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);

    card.style.setProperty("--mouse-y", `${y}px`);
  }
};
