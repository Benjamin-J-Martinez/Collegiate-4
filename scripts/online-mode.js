const game = JSON.parse(sessionStorage.getItem('game'));

const createButton = document.getElementById('create');
const joinButton = document.getElementById('join');

createButton.addEventListener('click', () => {
    game.mode = 'create';
    sessionStorage.setItem('game', JSON.stringify(game));
})

joinButton.addEventListener('click', () => {
    game.mode = 'join';
    sessionStorage.setItem('game', JSON.stringify(game));
})