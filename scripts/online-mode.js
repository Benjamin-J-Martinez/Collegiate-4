const game = JSON.parse(localStorage.getItem('game'));

const createButton = document.getElementById('create');
const joinButton = document.getElementById('join');

createButton.addEventListener('click', () => {
    game.mode = 'create';
    localStorage.setItem('game', JSON.stringify(game));
})

joinButton.addEventListener('click', () => {
    game.mode = 'join';
    localStorage.setItem('game', JSON.stringify(game));
})