import { setDrops } from './matrix-functions.js';
import { startDrop } from "./matrix-functions.js";
import { renderDrop } from "./matrix-functions.js";
import { createDrop } from "./matrix-functions.js";
import { columnIsInUse } from "./matrix-functions.js";
import { thereIsAvailableDropSpaces } from "./matrix-functions.js";
let matrixCanvas;
let context;
let drops;
let dropsJugglerInterval;
let renderScreenInterval;
let dropsSpeeds = [];
let backgroundColor = '';
let lettersColor = '';
let dropsLength = 0;
let letters = '';
let fontSize = 0;
let columns = 0;
let lines = 0;
const defaultLettersSequence = '!@#$%¨&*()_+-=/?123456789ABCDEFGHIJKLMNOPQRSTUVWYXZ';
const defaultDropsSpeeds = [50, 60, 70, 80, 90];
const defaultBackgroundColor = '#000000';
const defaultLettersColor = '#8442fe';
const defaultDropsLength = 50;
const defaultFontSize = 20;
const setLetters = (lettersSequence = defaultLettersSequence) => letters = lettersSequence;
const setBackgroundColor = (color = defaultBackgroundColor) => backgroundColor = color;
const setLettersColor = (color = defaultLettersColor) => lettersColor = color;
const setFontSize = (size = defaultFontSize) => fontSize = size;
const setDropsLength = (length = defaultDropsLength) => dropsLength = length;
const setDropsSpeeds = (speeds = defaultDropsSpeeds) => dropsSpeeds = speeds;
setLetters();
setBackgroundColor();
setLettersColor();
setFontSize();
setDropsLength();
setDropsSpeeds();
function clearDrops() {
    drops = [];
}
function setUpCanvas() {
    matrixCanvas.width = matrixCanvas.parentElement.clientWidth;
    matrixCanvas.height = matrixCanvas.parentElement.clientHeight;
    context = matrixCanvas.getContext("2d");
}
function setUpCharactersDimensions() {
    columns = Math.floor(matrixCanvas.width / fontSize);
    lines = matrixCanvas.height / fontSize;
    context.font = `${fontSize}px`;
}
function paintCanvas() {
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
}
function dropsJuggler() {
    if (!thereIsAvailableDropSpaces(drops))
        return null;
    var column = 0;
    do {
        column = Math.floor(Math.random() * columns);
    } while (columnIsInUse(column, drops));
    var elements;
    elements = [];
    for (var i = 0; i < lines; i++) {
        elements.push(letters[Math.floor(Math.random() * letters.length)]);
    }
    drops[column] = createDrop(elements, dropsSpeeds, lettersColor);
    startDrop(drops[column]);
}
function renderScreen() {
    paintCanvas();
    for (var i = 0; i < drops.length; i++) {
        if (drops[i].isDropping) {
            renderDrop(drops[i], i, context, dropsLength, fontSize);
        }
    }
}
document.addEventListener("DOMContentLoaded", () => {
    clearDrops();
    matrixCanvas = document.querySelector('#matrix');
    setUpCanvas();
    if (context == null || matrixCanvas == null)
        return console.log("could not build context element!");
    paintCanvas();
    setUpCharactersDimensions();
    const resizeObserver = new ResizeObserver(async () => {
        console.log('resizing');
        clearDrops();
        clearInterval(dropsJugglerInterval);
        clearInterval(renderScreenInterval);
        setUpCanvas();
        paintCanvas();
        setUpCharactersDimensions();
        drops = setDrops(columns);
        dropsJugglerInterval = setInterval(dropsJuggler, 60);
        renderScreenInterval = setInterval(renderScreen, 60);
    });
    resizeObserver.observe(matrixCanvas.parentElement);
    drops = setDrops(columns);
    dropsJugglerInterval = setInterval(dropsJuggler, 60);
    renderScreenInterval = setInterval(renderScreen, 60);
});
export { setLetters, setBackgroundColor, setLettersColor, setFontSize, setDropsLength, setDropsSpeeds, };
