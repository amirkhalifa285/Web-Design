window.onload = () => {
    initRectangles();
    document.querySelector('header div:nth-child(2) span').onclick = switchRectanglesSongs;
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
    console.log('Loading songs...');
    fetch('../data/music.json')
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response was not ok' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            populateSongsInList(data);
        })
        
        .catch(err => console.error('Error fetching data...', err));
       
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
    const wrapper = document.getElementById('wrapper');
    if (wrapper.className === 'rectangles') {
        initSongs();
        document.querySelector('header div:nth-child(2) span').textContent = 'Switch to rectangles';
    } else {
        initRectangles();
        document.querySelector('header div:nth-child(2) span').textContent = 'Switch to songs';
    }
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
