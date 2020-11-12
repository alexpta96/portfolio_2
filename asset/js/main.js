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