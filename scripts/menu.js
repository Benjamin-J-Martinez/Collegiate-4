let mode;

const buttons = document.getElementsByClassName('col');
for(let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', event => {
        mode = event.target.id;
    })
}

sessionStorage.setItem('mode', mode);