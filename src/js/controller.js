"use strict";
import * as model from "./model.js";

import gallery from "./view/galleryView.js";
import lazyLoading from "./view/lazyLoadingView.js";
import about from "./view/about.js";
import Project from "./view/projectView.js";
import cardHover from "./view/cardHover.js";
import navigation from "./view/navigation.js";
const controlGallery = function () {
  gallery._onMouseHandler();
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

const init = function () {
  controlGallery();
  lazyLoading._lazyLoading();
  controlAbout();
  cardHover._init();
  navigation.addHandlerStickyNav();
};

init();

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
