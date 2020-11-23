// Navigation Menu
(() => {
    const humburgerBtn = document.querySelector('.hamburger-btn');
    const navMenu = document.querySelector('.nav-menu');
    const closeNavMenu = navMenu.querySelector('.close-nav-menu');

    humburgerBtn.addEventListener('click', showNavMenu);
    closeNavMenu.addEventListener('click', hideNavMenu);

    function showNavMenu() {
        navMenu.classList.add('open');
        bodyScrollToggle();
    }
    function hideNavMenu() {
        navMenu.classList.remove('open');
        fadeOutEffect();
        bodyScrollToggle();
    }
    function fadeOutEffect() {
        document.querySelector('.fade-out-effect').classList.add('active');
        setTimeout(() => {
            document.querySelector('.fade-out-effect').classList.remove('active');
        }, 300);
    }
    // handle link click
    document.addEventListener('click', (event) => {
        if(event.target.classList.contains('link-item')) {
            console.log(event.target.hash);
            if(event.target.hash != '') {
                event.preventDefault();
                const hash = event.target.hash;
                // deactive existing active section
                document.querySelector('.section.active').classList.add('hide');
                document.querySelector('.section.active').classList.remove('active');
                navMenu.querySelector('.active').classList.add('outer-shadow','hover-in-shadow');
                navMenu.querySelector('.active').classList.remove('inner-shadow', 'active');
                // active new active section
                document.querySelector(hash).classList.remove('hide');
                document.querySelector(hash).classList.add('active');
                if(navMenu.classList.contains('open')) {
                    event.target.classList.remove('outer-shadow','hover-in-shadow');
                    event.target.classList.add('inner-shadow', 'active');
                    hideNavMenu();
                } else {
                    let navItems = navMenu.querySelectorAll('.link-item');
                    navItems.forEach(item => {
                        if(hash === item.hash) {
                           item.classList.remove('outer-shadow','hover-in-shadow');
                           item.classList.add('inner-shadow', 'active');
                        }
                    });
                    fadeOutEffect();
                }
                // Add hash to url
                window.location.hash = hash;
            }
        }
    });

})();

// About Section
(() => {
    const aboutSection = document.querySelector('.about-section');
    const aboutTabs = aboutSection.querySelector('.about-tabs');

    aboutTabs.addEventListener('click', (event) => {
        const item = event.target;
        if(item.classList.contains('tab-item') && !item.classList.contains('active')) {
            const dataTarget = item.dataset.target;
            // Deactive existing active item-tab
            aboutTabs.querySelector('.active').classList.remove('outer-shadow', 'active');
            // Active new item-tab
            item.classList.add('outer-shadow', 'active');
            // Deactive existing active tab-content
            aboutSection.querySelector('.tab-content.active').classList.remove('active');
            // Active new tab-content
            aboutSection.querySelector(dataTarget).classList.add('active');
        }
    });

}) ();
// End About Section

// Start Portfolio Section
function bodyScrollToggle() {
    document.body.classList.toggle('hide-scroll-y');
}
(() => {
    const filterContainer = document.querySelector('.portfolio-filter');
    const portfolioItemsContainer = document.querySelector('.portfolio-items');
    const portfolioItems = portfolioItemsContainer.querySelectorAll('.portfolio-item');
    const popup = document.querySelector('.portfolio-popup');
    const prevBtn = popup.querySelector('.prev-btn');
    const nextBtn = popup.querySelector('.next-btn');
    const closeBtn = popup.querySelector('.popup-close-btn');
    const projectDetailsContainer = popup.querySelector('.popup-details');
    const projectDetailsBtn = popup.querySelector('.popup-project-details-btn');

    let itemIndex, slideIndex, screenShots;

    // Filter portfolio items
    filterContainer.addEventListener('click', event => {
        let targetItem = event.target;
        if(targetItem.classList.contains('filter-item') && !targetItem.classList.contains('active')) {
            // Deactive existing active filter item
            filterContainer.querySelector('.active').classList.remove('active', 'outer-shadow');
            // Active new filter item
            targetItem.classList.add('active', 'outer-shadow');
            const target = targetItem.dataset.target;
            portfolioItems.forEach((item) => {
                const category = item.dataset.category;
                if(category === target || target === 'all') {
                    item.classList.add('show');
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                    item.classList.remove('show');
                }
            });
        }
    });

    portfolioItemsContainer.addEventListener('click', (event) => {
        if(event.target.closest('.portfolio-item-inner')) {
            const portfolioItem = event.target.closest('.portfolio-item-inner').parentElement;
            itemIndex = Array.from(portfolioItems).indexOf(portfolioItem);
            screenShots = portfolioItems[itemIndex].querySelector('.portfolio-item-img img').dataset.screenshots;
            // Convert screenshots to array
            screenShots = screenShots.replace(/\s/g,'').split(',');
            if(screenShots.length === 1) {
                nextBtn.style.display = 'none';
                prevBtn.style.display = 'none';
            } else {
                nextBtn.style.display = 'block';
                prevBtn.style.display = 'block';
            }
            slideIndex = 0;
            popupToggle();
            popupSlideShow();
            popupDetails();
        }
    });

    closeBtn.addEventListener('click', () => {
        popupToggle();
        if(projectDetailsContainer.classList.contains('active')) {
         popupDetailsToggle();
        }
    });

    function popupToggle() {
        popup.classList.toggle('open');
        bodyScrollToggle();
    }

    function popupSlideShow() {
        const imgSrc = screenShots[slideIndex];
        const popupImg = popup.querySelector('.popup-img');
        // Active loader until the popupImg loaded
        popup.querySelector('.popup-preloader').classList.add('active');
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            // Deactive loader
            popup.querySelector('.popup-preloader').classList.remove('active');
        };
        popup.querySelector('.popup-counter').innerHTML = (slideIndex + 1) + ' of ' + screenShots.length;
    }

    nextBtn.addEventListener('click', () => {
        if(slideIndex === screenShots.length - 1) {
            slideIndex = 0;
        } else {
            slideIndex++;
        }
        popupSlideShow();
    });

    prevBtn.addEventListener('click', () => {
        if(slideIndex === 0) {
            slideIndex = screenShots.length - 1;
        } else {
            slideIndex--;
        }
        popupSlideShow();
    });

    projectDetailsBtn.addEventListener('click', () => {
        popupDetailsToggle();
    });
    function popupDetailsToggle() {
        if(projectDetailsContainer.classList.contains('active')) {
            projectDetailsBtn.querySelector('i').classList.remove('fa-minus');
            projectDetailsBtn.querySelector('i').classList.add('fa-plus');
            projectDetailsContainer.classList.remove('active');
            projectDetailsContainer.style.maxHeight = '0px';
        } else {
            projectDetailsBtn.querySelector('i').classList.remove('fa-plus');
            projectDetailsBtn.querySelector('i').classList.add('fa-minus');
            projectDetailsContainer.classList.add('active');
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + 'px';
            popup.scrollTo(0, projectDetailsContainer.offsetTop);
        }
    }
    function popupDetails() {
        // Project detail not exist
        if(!portfolioItems[itemIndex].querySelector('.portfolio-item-details')) {
            projectDetailsBtn.style.display = 'none';
            return;
        }
        projectDetailsBtn.style.display = 'block';
        // get project details
        const details = portfolioItems[itemIndex].querySelector('.portfolio-item-details').innerHTML;
        const title = portfolioItems[itemIndex].querySelector('.portfolio-item-title').innerHTML;
        const category = portfolioItems[itemIndex].dataset.category;
        // Set project detail popup
        popup.querySelector('.popup-project-details').innerHTML = details;
        popup.querySelector('.popup-title h2').innerHTML = title;
        popup.querySelector('.popup-project-category').innerHTML = category;
    }

})();
// End Portfolio Section

// Start Feedback Slider
(() => {
    const sliderContainer = document.querySelector('.feedback-slider-container');
    const slides = sliderContainer.querySelectorAll('.feedback-item');
    const sliderWidth = sliderContainer.offsetWidth;
    const prevBtn = document.querySelector('.feedback-slider-nav .prev');
    const nextBtn = document.querySelector('.feedback-slider-nav .next');
    let activeSlide = sliderContainer.querySelector('.feedback-item.active');
    let slideIndex = Array.from(slides).indexOf(activeSlide);

    // Set width for sliderContainer
    sliderContainer.style.width = sliderWidth * slides.length +'px';

    // Set width for all slides
    slides.forEach(slide => {
        slide.style.width = sliderWidth +'px';
    });

    prevBtn.addEventListener('click', () => {
        if(slideIndex === 0) {
            slideIndex = slides.length - 1;
        } else {
            slideIndex--;
        }
        slider();
    });

    nextBtn.addEventListener('click', () => {
        if(slideIndex === slides.length - 1) {
            slideIndex = 0;
        } else {
            slideIndex++;
        }
        slider();
    });

    function slider() {
        // Deactive existing active Slide
        sliderContainer.querySelector('.feedback-item.active').classList.remove('active');
        // Active new Slide
        slides[slideIndex].classList.add('active');
        sliderContainer.style.marginLeft = - (sliderWidth * slideIndex) + 'px';

    }

})();
// End Feedback slider

// Hide all section except active section
(() => {
    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
        if(!section.classList.contains('active')) {
            section.classList.add('hide');
        }
    })
})();

// Preloader 
window.addEventListener('load', () => {
    document.querySelector('.preloader').classList.add('fade-out');
    setTimeout(() => {
        document.querySelector('.preloader').style.display = 'none';
    }, 600);
})