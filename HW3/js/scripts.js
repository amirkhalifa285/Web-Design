window.onload = () => {
    initRectangles();
}

const colors = ['lightcoral', 'lightgreen', 'lightblue', 'violet'];
const letters = 'AmirKhalifa'.split('');
let colorIndex = 0;
let letterIndex = 0;

function initRectangles() {
    const wrapper = document.getElementById('wrapper');
    wrapper.innerHTML = '';
    wrapper.className = 'rectangles';
    letters.forEach(letter => {
        const rect = document.createElement('div');
        rect.className = 'rectangle';
        rect.style.backgroundColor = chooseRectangleColor();
        const span = document.createElement('span');
        span.textContent = letter;
        rect.appendChild(span);
        wrapper.appendChild(rect);
    });
    colorIndex = 0 ;
    letterIndex = letters.length;
}

function initSongs() {
}

function chooseRectangleColor() {
    const color = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
    return color;
}

function addRectangle() {
}

function subtractRectangle() {
}

function switchRectanglesSongs() {
}

function populateSongsInList() {
}
