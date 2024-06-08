/* global document, window, console, fetch */

const colors = ['lightcoral', 'lightgreen', 'lightblue', 'violet'];
const letters = 'AmirKhalifa'.split('');
let inputLetters = letters.slice();
let colorIndex = 0;
let letterIndex = 0;
let customNameEntered = false;

function chooseRectangleColor() {
    const color = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
    return color;
}

function initRectangles() {
    const wrapper = document.getElementById('wrapper');
    wrapper.innerHTML = '';
    wrapper.className = 'rectangles';
    const currLetters = customNameEntered ? inputLetters : letters;
    currLetters.forEach(letter => {
        const rect = document.createElement('div');
        rect.className = 'rectangle';
        rect.style.backgroundColor = chooseRectangleColor();
        const span = document.createElement('span');
        span.textContent = letter;
        rect.appendChild(span);
        wrapper.appendChild(rect);
    });
    colorIndex = 0;
    letterIndex = currLetters.length;
}

function populateSongsInList(data) {
    const wrapper = document.getElementById('wrapper');
    wrapper.innerHTML = '';
    wrapper.className = 'songs';

    const title = document.createElement('h1');
    title.textContent = data.title;
    wrapper.appendChild(title);

    const list = document.createElement('ol');
    data.songs.forEach(song => {
        const listItem = document.createElement('li');
        listItem.textContent = `${song.name} - ${song.artist}`;
        list.appendChild(listItem);
    });
    wrapper.appendChild(list);
}

function initSongs() {
    fetch('../data/music.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            populateSongsInList(data);
        })
        // eslint-disable-next-line no-console
        .catch(err => console.error('Error fetching data...', err));
}

function addRectangle() {
    const wrapper = document.getElementById('wrapper');
    if (wrapper.className === 'rectangles') {
        const rect = document.createElement('div');
        rect.className = 'rectangle';
        rect.textContent = letters[letterIndex % letters.length];
        letterIndex += 1;
        rect.style.backgroundColor = chooseRectangleColor();
        wrapper.appendChild(rect);
    }
}

function subtractRectangle() {
    const wrapper = document.getElementById('wrapper');
    if (wrapper.className === 'rectangles' && wrapper.lastChild) {
        wrapper.removeChild(wrapper.lastChild);
        letterIndex = Math.max(0, letterIndex - 1);
        colorIndex = (colorIndex - 1 + colors.length) % colors.length;
    }
}

function switchRectanglesSongs() {
    const wrapper = document.getElementById('wrapper');
    if (wrapper.className === 'rectangles') {
        initSongs();
        document.querySelector('header div:nth-child(2) span').textContent = 'Switch to rectangles';
    } else {
        initRectangles();
        document.querySelector('header div:nth-child(2) span').textContent = 'Switch to songs';
    }
}

function enterName() {
    const name = document.getElementById('nameInput').value;
    if (name) {
        inputLetters = name.split('');
        customNameEntered = true;
        initRectangles();
        document.getElementById('submitName').onclick = null;
        document.getElementById('nameInput').disabled = true;
        document.getElementById('submitName').style.cursor = 'not-allowed';
        document.getElementById('nameInput').style.cursor = 'not-allowed';
        letterIndex = 0;
    }
};



window.onload = () => {
    initRectangles();
    document.querySelector('header div:nth-child(2) span').onclick = switchRectanglesSongs;
    document.querySelector('header div:first-child span').onclick = addRectangle;
    document.querySelector('header div:last-child span').onclick = subtractRectangle;
    document.getElementById('submitName').onclick = enterName;

};
