// Toggle style switcher
const styleSwitcher = document.querySelector('.style-switcher');
const styleSwitcherToggler = styleSwitcher.querySelector('.style-switcher-toggler');

styleSwitcherToggler.addEventListener('click', () => {
    styleSwitcher.classList.toggle('open');
});

// Hide style switcher when scroll
window.addEventListener('scroll', () => {
    if(styleSwitcher.classList.contains('open')) {
        styleSwitcher.classList.remove('open');
    }
});

// Theme colors
const colorStyles = document.querySelectorAll('.color-style');

if(localStorage.getItem('color') !== null) {
    changeColor();
}

function setColorStyle(color) {
    localStorage.setItem('color', color);
    changeColor();
}

function changeColor() {
    colorStyles.forEach(style => {
        if(localStorage.getItem('color') === style.title) {
            style.removeAttribute('disabled');
        } else {
            style.setAttribute('disabled', 'true');
        }
    });
}

// Dark and light mode

const dayNight = styleSwitcher.querySelector('.day-night');

function updateIcon() {
    if(document.body.classList.contains('dark')) {
        dayNight.querySelector('i').classList.remove('fa-sun');
        dayNight.querySelector('i').classList.add('fa-moon');
    } else {
        dayNight.querySelector('i').classList.add('fa-sun');
        dayNight.querySelector('i').classList.remove('fa-moon');
    }
}
function changeTheme() {
    if(localStorage.getItem('theme') != null) {
        if(localStorage.getItem('theme') === 'light') {
            document.body.classList.remove('dark');
        } else {
            document.body.classList.add('dark');
        }
    }
    updateIcon();
}
dayNight.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    if(document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
    changeTheme();
});
changeTheme();