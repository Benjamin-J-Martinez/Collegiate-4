let difficulty;

const buttons = document.getElementsByClassName('col px-auto my-4');
for(let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', event => {
        mode = event.target.id;
    })
}

sessionStorage.setItem('mode', mode);