"use strict";
import * as model from "./model.js";

// import Typed from "typed.js";

// import addSkillsTech from "./view/addSkillsTech.js";
import cardHover from "./view/cardHover.js";
import ProjectsView from "./view/projectsView.js";
import SliderView from "./view/sliderView.js";
import about from "./view/about.js";

// const typed = new Typed(".heading-tertiary", {
//   strings: ["Developer", "Self-learner"],
//   typeSpeed: 5,
// });

const controlSkillsTech = function () {
  addSkillsTech.render(model.skillsTech);
};

const controlProjects = function () {
  // projects.addHandlerRotateCard();
  ProjectsView.render(model.projectsInfoArr);

  // Slider
  SliderView._sliderInit();
};

const init = function () {
  // addSkillsTech._addHandlerAddSkills(controlSkillsTech);
  cardHover._onMouseMoveHandler();
  about._typingHandler();

  ProjectsView._addHandlerProjects(controlProjects);
};

init();

let circle = document.querySelector(".projects__circle");

window.addEventListener("scroll", function () {
  let value = window.scrollY;
  circle.style.clipPath = `circle(${value * 0.6}px at left center)`;
});

// SLider
