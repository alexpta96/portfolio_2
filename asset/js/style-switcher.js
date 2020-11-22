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

function setColorStyle(color) {
    colorStyles.forEach(style => {
        if(color === style.title) {
            style.removeAttribute('disabled');
        } else {
            style.setAttribute('disabled', 'true');
        }
    });
}

// Dark and light mode

const dayNight = styleSwitcher.querySelector('.day-night');
dayNight.addEventListener('click', () => {
    dayNight.querySelector('i').classList.toggle('fa-sun');
    dayNight.querySelector('i').classList.toggle('fa-moon');
    document.body.classList.toggle('dark');
});
window.addEventListener('load', () => {
    if(document.body.classList.contains('dark')) {
        dayNight.querySelector('i').classList.add('fa-sun');
    } else {
        dayNight.querySelector('i').classList.add('fa-moon');
    }
})